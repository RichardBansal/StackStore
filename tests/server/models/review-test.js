var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/review');
require('../../../server/db/models/user');

var Review = mongoose.model('Review');
var User = mongoose.model('User');

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

    describe('Making reviews', function() {
        // make dummy orders
        var text1 = "Paleo distillery tousled, vegan Wes Anderson put a bird on it before they sold out fap four loko kogi farm-to-table. Heirloom cray biodiesel ethical. Hella organic Bushwick heirloom plaid mixtape, cronut whatever 8-bit sartorial chillwave fashion axe four dollar toast. Mixtape lomo banjo squid ennui. Bitters vinyl heirloom, hashtag seitan lomo beard cliche wayfarers hella four loko asymmetrical umami direct trade bespoke. Paleo bitters sartorial pug viral Schlitz Portland asymmetrical. Heirloom Pitchfork messenger bag, mlkshk McSweeney's Brooklyn meditation fanny pack dreamcatcher quinoa selfies before they sold out.";
        var text2 = "Ugh +1 brunch butcher cold-pressed fixie, freegan Shoreditch Pitchfork cornhole bitters four dollar toast. Carles ugh trust fund whatever pork belly. Master cleanse vinyl tofu, mustache heirloom farm-to-table typewriter jean shorts. Bushwick Etsy Brooklyn dreamcatcher, tofu Marfa gastropub ennui. Jean shorts skateboard cred typewriter. Fingerstache umami disrupt, keffiyeh tilde bitters Carles mixtape Austin meggings ennui Pinterest yr. Mlkshk polaroid brunch bicycle rights tote bag, Bushwick kitsch skateboard biodiesel Vice next level occupy ugh hella.";
        
        var exampleReview1 = {
            stars: 5,
            text: text1
        };

        var exampleReview2 = {
            stars: 1,
            text: text2
        };

        var exampleUser1 = {
            name: "Brad H.",
            addressBilling: "555 Hanover",
            addressShipping: "987 Broadway",
            phoneNumber: "123-345-3124",
            accountType: "user",
            email: "brad@gmail.com",
            password: "imbrad"
        };
        
        beforeEach('Create the example user', function (done) {
            User.create(exampleUser1, function(err, exampleUser1) {
                if (err) throw err;
                else {
                    done();
                }
            });
        });

        beforeEach('Create the example review', function (done) {
            Review.create(exampleReview1, exampleReview2, function(err, exampleReview1, exampleReview2) {
                if (err) throw err;
                else {
                    User.findOne({name: "Brad H."}, function(err, user) {
                        exampleReview1.user = user._id;
                        
                        exampleReview1.save(function(err){
                            if (err) throw err;
                            done();
                        });
                    });
                }
            });
        });        

        afterEach('Clear test database', function (done) {
            Review.find({}, function(err, reviews) {
                //console.log(reviews);
                clearDB(done);
            });
        });

        describe('Save validation errors', function() {
            it('will not save a new review without required fields', function (done) {
                new Review({text: "Bad review!"}).save(function (err) {
                    expect(err).to.exist;
                    done();
                });
            });

            it('will not save a new review with too few stars', function (done) {
                new Review({text: "Bad review!", stars: 0}).save(function (err) {
                    expect(err).to.exist;
                    done();
                });
            });        

            it('will not save a new review with too many stars', function (done) {
                new Review({text: "Bad review!", stars: 6}).save(function (err) {
                    expect(err).to.exist;
                    done();
                });
            });

            it('will not save a new review with less than n characters', function (done) {
                new Review({text: "Bad review!", stars: 4}).save(function (err) {
                    expect(err).to.exist;
                    done();
                });
            });
        });

        describe('Save success cases', function() {
            it('can save a new review', function (done) {
                new Review({stars: 3, text: text1}).save(done);
            });

            it('can save a new review with various properties', function(done) {
                Review.findOne({stars: 5}, function(err, review) {
                    expect(err).to.not.exist;
                    expect(review.text).to.equal(text1);
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
       
        describe('User association', function() {
            it('has a user author associated with the review', function (done) {
               Review.findOne({stars: 5}, function(err, review) {
                    expect(review.user).to.exist;
                    done();
                }); 
            });
        });
    });
    
});