var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/order');

var Order = mongoose.model('Order');

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe('Making users', function() {
        var exampleOrder1 = {
            purchaseDate: "2014-05-23",
            status: "unfullfilled",
        };

        var exampleOrder2 = {
            purchaseDate: "2013-12-25",
            status: "fullfilled"
        };
        

        beforeEach('Create the example user', function (done) {
            Order.create(exampleOrder1, exampleOrder2, function(err, exampleOrder1, exampleOrder2) {
                if (err) throw err;
                else {
                    done();
                }
            });
        });

        afterEach('Clear test database', function (done) {
            Order.find({}, function(err, orders) {
                //console.log(orders);
                clearDB(done);
            });
        });

        it('can save a new order', function (done) {
            new Order({purchaseDate: "2015-04-15"}).save(done);
        });


        it('can save a new order with various properties', function(done) {
            Order.findOne({purchaseDate: "2014-05-23"}, function(err, order) {
                expect(err).to.not.exist;
                expect(order.status).to.equal('unfullfilled');
                done();
            });
        });

        it('can save two or more orders, and they can be listed', function(done) {
            Order.find({}, function(err, orders) {
                expect(err).to.not.exist;
                expect(orders).to.have.length(2);
                done();
            });
        });
    });
});