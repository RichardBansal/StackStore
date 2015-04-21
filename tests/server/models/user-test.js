var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');

var User = mongoose.model('User');

describe('User model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(User).to.be.a('function');
    });

    describe('Making users', function() {
        var exampleUser1 = {
            name: "Scarlett O.",
            addressBilling: "555 Hanover",
            addressShipping: "444 Hanover",
            phoneNumber: "123-456-1234",
            accountType: "user",
            email: "scarlett@gwtw.com",
            password: "illneverbehungryagain"
        };

        var exampleUser2 = {
            name: "Rhett B.",
            addressBilling: "504 Broadway",
            addressShipping: "777 Hanover",
            phoneNumber: "123-456-9876",
            accountType: "user",
            email: "rhett@gwtw.com",
            password: "franklymydearidontgiveadamn"  
        };

        beforeEach('Create the example user', function (done) {
            User.create(exampleUser1, exampleUser2, function(err, exampleUser1, exampleUser2) {
                if (err) throw err;
                else {
                    //console.log("Example users created.");
                    done();
                }
            });
        });

        // beforeEach('Create the example user', function (done) {
        //     new User(exampleUser2).save(done);
        // });

        afterEach('Clear test database', function (done) {
            clearDB(done);
        });

        it('can save a new user', function (done) {
            new User({name: "Scarlet"}).save(done);
        });


        it('can save a new user with various properties', function(done) {
            User.findOne({name: "Scarlett O."}, function(err, user) {
                expect(err).to.not.exist;
                expect(user.email).to.equal('scarlett@gwtw.com');
                done();
            });
        });

        it('can save two or more users, and they can be listed', function(done) {
            User.find({}, function(err, users) {
                expect(err).to.not.exist;
                expect(users).to.have.length(2);
                done();
            });
        });
    });


    describe('password encryption', function () {

        describe('generateSalt method', function () {

            it('should exist', function () {
                expect(User.generateSalt).to.be.a('function');
            });

            it('should return a random string basically', function () {
                expect(User.generateSalt()).to.be.a('string');
            });

        });

        describe('encryptPassword', function () {

            var cryptoStub;
            var hashUpdateSpy;
            var hashDigestStub;
            beforeEach(function () {

                cryptoStub = sinon.stub(require('crypto'), 'createHash');

                hashUpdateSpy = sinon.spy();
                hashDigestStub = sinon.stub();

                cryptoStub.returns({
                    update: hashUpdateSpy,
                    digest: hashDigestStub
                });

            });

            afterEach(function () {
                cryptoStub.restore();
            });

            it('should exist', function () {
                expect(User.encryptPassword).to.be.a('function');
            });

            it('should call crypto.createHash with "sha1"', function () {
                User.encryptPassword('asldkjf', 'asd08uf2j');
                expect(cryptoStub.calledWith('sha1')).to.be.ok;
            });

            it('should call hash.update with the first and second argument', function () {

                var pass = 'testing';
                var salt = '1093jf10j23ej===12j';

                User.encryptPassword(pass, salt);

                expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
                expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);

            });

            it('should call hash.digest with hex and return the result', function () {

                var x = {};
                hashDigestStub.returns(x);

                var e = User.encryptPassword('sdlkfj', 'asldkjflksf');

                expect(hashDigestStub.calledWith('hex')).to.be.ok;
                expect(e).to.be.equal(x);

            });

        });

        describe('on creation', function () {

            var encryptSpy;
            var saltSpy;

            var createUser = function () {
                return User.create({ email: 'obama@gmail.com', password: 'potus' });
            };

            beforeEach(function () {
                encryptSpy = sinon.spy(User, 'encryptPassword');
                saltSpy = sinon.spy(User, 'generateSalt');
            });

            afterEach(function () {
                encryptSpy.restore();
                saltSpy.restore();
            });

            it('should call User.encryptPassword with the given password and generated salt', function (done) {
                createUser().then(function () {
                    var generatedSalt = saltSpy.getCall(0).returnValue;
                    expect(encryptSpy.calledWith('potus', generatedSalt)).to.be.ok;
                    done();
                });
            });

            it('should set user.salt to the generated salt', function (done) {
               createUser().then(function (user) {
                   var generatedSalt = saltSpy.getCall(0).returnValue;
                   expect(user.salt).to.be.equal(generatedSalt);
                   done();
               });
            });

            it('should set user.password to the encrypted password', function () {
                createUser().then(function (user) {
                    var createdPassword = encryptSpy.getCall(0).returnValue;
                    expect(user.password).to.be.equal(createdPassword);
                    done();
                });
            });

        });

    });

});