var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/stock');

var Stock = mongoose.model('Stock');

describe('Stock model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Stock).to.be.a('function');
    });

    describe('Making users', function() {
        var exampleStock1 = {
            size: "M",
            quantity: 14
        };

        var exampleStock2 = {
            size: "L",
            quantity: 9
        };
        

        beforeEach('Create the example user', function (done) {
            Stock.create(exampleStock1, exampleStock2, function(err, exampleStock1, exampleStock2) {
                if (err) throw err;
                else {
                    done();
                }
            });
        });

        afterEach('Clear test database', function (done) {
            Stock.find({}, function(err, stocks) {
                //console.log(stocks);
                clearDB(done);
            });
        });

        it('can save a new stock', function (done) {
            new Stock({size: "S"}).save(done);
        });


        it('can save a new stock with various properties', function(done) {
            Stock.findOne({size: "M"}, function(err, stock) {
                expect(err).to.not.exist;
                expect(stock.quantity).to.equal(14);
                done();
            });
        });

        it('can save two or more stocks, and they can be listed', function(done) {
            Stock.find({}, function(err, stocks) {
                expect(err).to.not.exist;
                expect(stocks).to.have.length(2);
                done();
            });
        });
    });
});