var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/review');

var Review = mongoose.model('Review');

describe('Review model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Review).to.be.a('function');
    });

    describe('Making users', function() {
        var exampleReview1 = {
            stars: 5,
            text: "Love it!"
        };

        var exampleReview2 = {
            stars: 1,
            text: "Boo!"
        };
        

        beforeEach('Create the example user', function (done) {
            Review.create(exampleReview1, exampleReview2, function(err, exampleReview1, exampleReview2) {
                if (err) throw err;
                else {
                    done();
                }
            });
        });

        afterEach('Clear test database', function (done) {
            Review.find({}, function(err, reviews) {
                //console.log(reviews);
                clearDB(done);
            });
        });

        it('can save a new review', function (done) {
            new Review({stars: 3}).save(done);
        });


        it('can save a new review with various properties', function(done) {
            Review.findOne({stars: 5}, function(err, review) {
                expect(err).to.not.exist;
                expect(review.text).to.equal('Love it!');
                done();
            });
        });

        it('can save two or more reviews, and they can be listed', function(done) {
            Review.find({}, function(err, reviews) {
                expect(err).to.not.exist;
                expect(reviews).to.have.length(2);
                done();
            });
        });
    });
});