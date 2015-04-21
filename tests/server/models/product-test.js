var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/product');

var Product = mongoose.model('Product');

describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    describe('Making users', function() {
        var exampleProduct1 = {
            name: "Yellow Tshirt",
            description: "It's not green!",
            price: 2499,
            category: ["Tshirt", "Yellow"]
        };

        var exampleProduct2 = {
            name: "Green Hoodie",
            description: "Now with 100% more hood!",
            price: 3499,
            category: ["Hoodie", "Green"]
        };
        

        beforeEach('Create the example user', function (done) {
            Product.create(exampleProduct1, exampleProduct2, function(err, exampleProduct1, exampleProduct2) {
                if (err) throw err;
                else {
                    done();
                }
            });
        });

        afterEach('Clear test database', function (done) {
            Product.find({}, function(err, products) {
                //console.log(products);
                clearDB(done);
            });
        });

        it('can save a new product', function (done) {
            new Product({name: "Turtleneck"}).save(done);
        });


        it('can save a new product with various properties', function(done) {
            Product.findOne({name: "Yellow Tshirt"}, function(err, product) {
                expect(err).to.not.exist;
                expect(product.price).to.equal(2499);
                done();
            });
        });

        it('can save two or more products, and they can be listed', function(done) {
            Product.find({}, function(err, products) {
                expect(err).to.not.exist;
                expect(products).to.have.length(2);
                done();
            });
        });
    });
});