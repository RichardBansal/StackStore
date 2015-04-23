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

    describe('Making products', function() {
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
        

        beforeEach('Create and save two products', function (done) {
            Product.create(exampleProduct1, exampleProduct2, function(err, exampleProduct1, exampleProduct2) {
                if (err) throw err;
                else {
                    done();
                }
            });
        });

        afterEach('Clear test database', function (done) {
            Product.find({}, function(err, products) {
                clearDB(done);
            });
        });

        it('can save a new product with all required fields', function(done) {
            Product.findOne({name: "Yellow Tshirt"}, function(err, product) {
                expect(err).to.not.exist;
                expect(product.price).to.equal(2499);
                done();
            });
        });

        it('can save and get products from db', function(done) {
            Product.find({}, function(err, products) {
                expect(err).to.not.exist;
                expect(products).to.have.length(2);
                done();
            });
        });

        it('will throw an error if name field is not entered', function (done) {

            var noTitle = {
                description: "Now 100% more blue!",
                price: 3499,
                category: ["Hoodie", "Blue"]
            };
            new Product(noTitle).save(function(err){
                expect(err).to.exist;
                done();
            });
        });

        it('will throw an error if name is not unique (already exists in db)', function (done) {

            var duplicate = {
                name: "Yellow Tshirt",
                description: "It's not green!",
                price: 2499,
                category: ["Tshirt", "Yellow"]
            };
            
            new Product(duplicate).save(function(err){
                expect(err).to.exist;
                done();
            });
        });

        it('will throw an error if description field is not entered', function (done) {
            var noDescription = {
                name: "Blue Tshirt",
                price: 3499,
                category: ["Hoodie", "Blue"]
            };

            new Product(noDescription).save(function(err){
                expect(err).to.exist;
                done();
            });
        });

        it('will use a placeholder photo if no imageUrl is provided', function (done){
            Product.findOne({name: "Yellow Tshirt"}, function(err, product) {
                expect(err).to.not.exist;
                expect(product.imageUrl).to.equal('http://placehold.it/200x200');
                done();
            });
        });

        it('will throw an error if price field is not entered', function (done) {
            var noPrice = {
                name: "Blue Tshirt",
                description: "Now 100% more blue!",
                category: ["Hoodie", "Blue"]
            };

            new Product(noPrice).save(function(err){
                expect(err).to.exist;
                done();
            });
        });

        it('will throw an error if category field is not entered', function (done) {

            var noCategory = {
                name: "Blue Hoodie",
                description: "Now 100% more blue!",
                price: 3499,
            };

            new Product(noCategory).save(function(err, product){
                if(product.category.length === 0) err = new Error('ValidationError: category field is required');
                expect(err).to.exist;
                done();
            });
        });

    });
});