var mongoose = require("mongoose");

require("../../../server/db/models/order");
require("../../../server/db/models/product");
require("../../../server/db/models/user");

var Orders = mongoose.model('Order');
var Products = mongoose.model('Product');
var Users = mongoose.model('User');
var q = require('q');

var users = [
        {
            name: "Bob J.",
            addressBilling: "55 Hanover",
            addressShipping: "56 Wall St.",
            phoneNumber: "555-555-5555",
            accountType: "user",
            email: "bob@excite.com",
            password: "password"
        },
        {
            name: "Anne B.",
            addressBilling: "506 Broadway",
            addressShipping: "303 W 16th",
            phoneNumber: "123-456-7890",
            accountType: "user",
            email: "anne@gmail.com",
            password: "woof"
        }
    ];    

    var products = [
        {
            name: "FSA T",
            description: "Tshirt with FSA lettering.",
            price: 2999,
            category: ["School shirts", "Tshirts"]
        },
        {
            name: "Nimit T",
            description: "Tshirt rocking an image of Nimit.",
            price: 3499,
            category: ["People shirts", "Tshirts"]
        }
    ];

    var orders = [
        {
            purchaseDate: "2015-04-20",
            status: "unfullfilled"
        },
        {
            purchaseDate: "2015-04-16",
            status: "fullfilled"
        }
    ];    

    // var stocks = [
    //     {
    //         size: "M",
    //         quantity: 10
    //     },
    //     {
    //         size: "L",
    //         quantity: 6
    //     }
    // ];

    // var reviews = [
    //     {
    //         stars: 5,
    //         text: "Best shirt on the friggin' planet!"
    //     },
    //     {
    //         stars: 3,
    //         text: "It's ok, but I've had better."
    //     }
    //];

// function saveAsync()

// method

function seedFn(){
    
	var promise =
		q.all([
		        Users.create(users),
		        Products.create(products),
		        Orders.create(orders)])
	            // Stock.create(stocks),
	            // Review.create(reviews)]);
	  	.then(function() {
	        return q.all([
	            Users.find().exec(), 
	            Orders.find().exec(),
	            Products.find().exec(),
	            // Stock.find().exec(),
	            // Review.find().exec()
	            ]);
	    }).then(function (userAndOrderData) {
	        // console.log("*******",userAndOrderData);
	        var users=userAndOrderData[0];
	        var orders = userAndOrderData[1];
	        var products=userAndOrderData[2];
	        // var stock=userAndOrderData[3];
	        // var reviews=userAndOrderData[4];
	        return q.all([
	            Users.findOne({name: "Anne B."}).exec().then(function(user) {
	                user.orders.push(orders[0]);
	                // user.save();
	                // return user;
	                return user.saveAsync();
	            }),
	            Users.findOne({name: "Bob J."}).exec().then(function(user) {
	                user.orders.push(orders[1]);
	                // return Q.ninvoke(redisClient, "get", "user:1:id");

	                // user.save();
	                // return q.ninvoke.save(user);
	                // return user;
	                return user.saveAsync();
	            }),
	            Orders.findOne({purchaseDate: "2015-04-20"}).exec().then(function(order) {
	                order.products.push({quantity: 1, product:products[0],price:products[0].price});
	                // order.save();
	                // return q.ninvoke.save(order);
	                return order.saveAsync();
	            }),
	            Orders.findOne({purchaseDate: "2015-04-16"}).exec().then(function(order) {
	                order.products.push({quantity: 1, product:products[1],price:products[1].price});
	                // order.save();
	                // return order;
	                // return q.ninvoke.save(order);
	                return order.saveAsync();
	            }),
	            // Product.findOne({name: "FSA T"}).exec().then(function(product) {
	            //     product.stock.push(stock[0]);
	            //     product.reviews.push(reviews[0]);
	            //     product.save();
	            //     return product;
	            // }),
	            // Product.findOne({name: "Nimit T"}).exec().then(function(product) {
	            //     product.stock.push(stock[1]);
	            //     product.reviews.push(reviews[1]);
	            //     product.save();
	            //     return product;
	            // }),
	            // Review.findOne({stars: 5}).exec().then(function(review) {
	            //     review.user=users[0]._id;
	            //     review.save();
	            //     return review;
	            // }),
	            // Review.findOne({stars:3}).exec().then(function(review) {
	            //     review.user=users[1]._id;
	            //     review.save();
	            //     return review;
	            // }) 
	        ]);
	    }).then(function (userData) {
	        // console.log(userData);
	    }).catch(function (err) {
	        console.error('catch',err);
	    });
	return promise;
}

module.exports = {
	seedFn: seedFn
}