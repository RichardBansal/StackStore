//ORDERS: Seeding from gulp seedDBs

//TODO: You need todix this for future testing (especially before you merge the the branch to development - test against development before hand)

//NOTES: connection, seed, tests
// console.log("here");
var dbURI = "mongodb://localhost:27017/testingOrdersDB_test";
var clearDB = require("mocha-mongoose")(dbURI);

var sinon = require("sinon");
var expect = require("chai").expect;
var mongoose = require("mongoose");
var seedFn = require("./order.seed.js").seedFn;

require("../../../server/db/models/order");
require("../../../server/db/models/product");
require("../../../server/db/models/user");

var Orders = mongoose.model("Order");
var Products = mongoose.model("Product");
var Users = mongoose.model("User");
var q = require("q");

describe("Order model", function () {

    beforeEach("Establish DB connection", function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach("Clear test database", function (done) {
        clearDB(done);
        // done();
    });

    it("should exist", function () {
        expect(Orders).to.be.a("function");
    });

    describe("Making orders only", function() {
        var exampleOrder1 = {
            purchaseDate: "2014-05-23",
            status: "unfullfilled",
        };

        var exampleOrder2 = {
            purchaseDate: "2013-12-25",
            status: "fullfilled"
        };
        

        beforeEach("Create the example order", function (done) {
            Orders.create(exampleOrder1, exampleOrder2, function(err, exampleOrder1, exampleOrder2) {
                if (err) throw err;
                else {
                    done();
                }
            });
        });

        afterEach("Clear test database", function (done) {
            Orders.find({}, function(err, orders) {
                //console.log(orders);
                // clearDB(done);
                done();
            });
        });

        it("can save a new order", function (done) {
            new Orders({purchaseDate: "2015-04-15"}).save(done);
        });


        it("can save a new order with various properties", function(done) {
            Orders.findOne({purchaseDate: "2014-05-23"}, function(err, order) {
                expect(err).to.not.exist;
                expect(order.status).to.equal("unfullfilled");
                done();
            });
        });

        it("can save two or more orders, and they can be listed", function(done) {
            Orders.find({}, function(err, orders) {
                expect(err).to.not.exist;
                expect(orders).to.have.length(2);
                done();
            });
        });

    });

    describe("Testing orders with users and products defined", function() {
        // var count = 0;

        beforeEach("Establish DB connection", function (done) {
            if (mongoose.connection.db) {
                return done();
            }
            
            mongoose.connect(dbURI, done);
        });

        beforeEach("Seed the database", function (done) {
            seedFn().then(done);
        });

        afterEach("Clear test database", function (done) {
            clearDB(done);
            // done();
        });

        it("order belongs to user", function(done){
            Orders.find({}).exec().then(fulfilled,rejected);

            function fulfilled(orders){

                function produceOrders(){
                    orderArrPromises = []

                    orders.forEach(function(order){
                        orderArrPromises.push(findUser(order._id));
                    });

                    return orderArrPromises;
                }

                function findUser(orderId){
                    return Users.findOne(
                        {
                            orders : 
                                {
                                $elemMatch :
                                    {
                                        $eq: orderId
                                    }
                                }
                        }).exec()
                };

                q.all(produceOrders())
                    .then(foundUsers,rejected)

                function foundUsers(users){
                    // console.log(users.length,orders.length);
                    // if(users.length = orders.length)
                    expect(users.length).to.equal(orders.length);
                    done();
                };

                function rejected(error){
                   console.log("error",error);
                }
            }

            function rejected(error){
                console.log(error);
            }
        });

        it("order must contain line items that capture price", function(done){
            setTimeout(function(){
                Orders.find({}).exec().then(fulfilled, rejected)},0);

            function fulfilled(orders){
                function productsPrice(){
                    // console.log('orders',orders);
                    //assuming you only have one product per order (for the tests currently)
                    return orders.every(function(order){
                        return (order.products[0].price !== undefined);
                    });
                }
                expect(productsPrice()).to.equal(true);
                done();
            }

            function rejected(error){
                console.log(error);
            }
        });

        it("the order shall keep the current price, and not capture future price changes", function(done){
            // console.log(Orders.find({}));
            setTimeout(function(){
                Orders.find({}).exec().then(fulfilled, rejected)
            },0);

            function fulfilled(order){
                // console.log('order',order);
                //only one product
                product = order[0].products[0];
                // console.log('product',product);
                
                //TODO ERROR EXISTS HERE
                setTimeout(function(){
                    Products.findOne({"_id":product.product}).exec()
                    .then(productFound);
                },0);


                function productFound(product){
                    product.price = 9990;
                    return product.save(function(err,data){
                        // console.log('productFound', data, order);
                        expect(order[0].determineTotal()).to.not.equal(product.price);
                        done();
                    });
                }
            }

            function rejected(error){
                console.log(error);
            }
        });
    });
});
