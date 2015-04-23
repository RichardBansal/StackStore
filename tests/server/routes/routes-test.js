require('../../../server/db/models/user');
var User = require('mongoose').model('User');
require('../../../server/db/models/order');
var Order = require('mongoose').model('Order');
var supertest = require('supertest');
var app = require('../../../server/app/index');
var agent = supertest.agent(app);
var expect = require('chai').expect;

describe('/accounts', function() {

  var newUser = {
    name: "Bob J.",
    addressBilling: "55 Hanover",
    addressShipping: "56 Wall St.",
    phoneNumber: "555-555-5555",
    accountType: "user",
    email: "bob2@excite.com",
    password: "password"
  };

  var badUser = {
    name: "Bob J.",
    addressBilling: "55 Hanover",
    addressShipping: "56 Wall St.",
    phoneNumber: "555-555-5555",
    accountType: "user",
    email: "bobexcite",
    password: "password"
  };

  var newOrder =  {
      purchaseDate: "2015-04-20",
      status: "unfullfilled"
  };

  // make sure it gets something from the root
  describe('POST /api/accounts/create', function() {
    it('should get 200 on sucessful creation', function(done) {
      agent
        .post('/api/accounts/create')
        .send(newUser)
        .expect(200, done);
    });

    it('should get 400 on failed creation', function(done) {
      agent
        .post('/api/accounts/create')
        .send(badUser)
        .expect(400, done);
    });
  });

  describe('GET /api/accounts/details', function() {

    beforeEach(function(done) {
      var new_user = new User(newUser);
      new_user.save();
      var new_order = new Order(newOrder);
      new_order.save(function(err, order){
        User.findOne({name:"Bob J."}).exec().then(fulfilled, rejected);

        function fulfilled(user){
          user.orders.push(order._id);
        }

        function rejected(error){
          console.log(error);
        }
      });
      
      done();
    });

    it('should send back email and orders', function(done){

      agent
        .post('/login')
        .send({
          email: "bob2@excite.com",
          password: "password"
          })
        .expect(200, done); 
      // agent
      //   .get('/api/accounts/details')
      //   .expect(200, done);

      }); 
});

  // // getting a specific wiki page
  // describe('GET /wiki/:title', function() {
  //   it("should get 404 on page that doesn't exist", function(done) {
  //     agent
  //       .get('/wiki/something_that_hasnt_been_made')
  //       .expect(404, done);
  //   });
  //   it('should get 200 on page that does exist', function(done) {
  //     agent
  //       .get('/wiki/Anolis_carolinensis')
  //       .expect(200, done);
  //   });
  // });

  // // getting pages with a certain tag — a result, maybe of an empty page
  // describe('GET /wiki/tags/:tag', function() {
  //   it('should get 200', function(done) {
  //     agent
  //       .get('/wiki/tags/anyTagRegardlessOfIfItsGivenToAnyPageYet')
  //       .expect(200, done);
  //   });
  // });

  // // getting similar pages
  // describe('GET /wiki/:title/similar', function(done) {
  //   it("should get 404 for page that doesn't exist", function(done) {
  //     agent
  //       .get('/wiki/doesnt_exist')
  //       .expect(404, done);
  //   });
  //   it('should get 200 for similar page', function(done) {
  //     agent
  //       .get('/wiki/Anolis_carolinensis/similar')
  //       .expect(200, done);
  //   });
  // });

  // // the Edit Page page
  // describe('GET /wiki/:title/edit', function() {
  //   it("should get 404 for page that doesn't exist", function(done) {
  //     agent
  //       .get('/wiki/non_existent/edit')
  //       .expect(404, done);
  //   });
  //   it('should get 200 for a page that can be edited', function(done) {
  //     agent
  //       .get('/wiki/Anolis_carolinensis/edit')
  //       .expect(200, done);
  //   });
  // });

  // // the Add a Page page
  // describe('GET /add', function() {
  //   it('should get 200', function(done) {
  //     agent
  //       .get('/add')
  //       .expect(200, done);
  //   });
  // });

  // // editing a page
  // describe('POST /wiki/:title/edit', function() {
  //   it("should get 404 for page that doesn't exist", function(done) {
  //     agent
  //       .post('/wiki/totally_not_there/edit')
  //       .send({
  //         title: 'A valid title',
  //         body: 'A valid body',
  //         tags: ['aTag']
  //       })
  //       .expect(404, done);
  //   });
  //   it('should update db', function(done) {
  //     agent
  //       .post('/wiki/Anolis_carolinensis/edit')
  //       // HTTP posts have a `body` on the request; this whole object is the body. The body-parser module turns this into req.body.title and req.body.body.
  //       .send({
  //         body: 'An updated article about the green anole.',
  //         tags: 'green,carolina,anole'
  //       })
  //       .end(function(err, response) {
  //         Page.findOne({
  //           title: 'Anolis carolinensis'
  //         }, function(err, page) {
  //           expect(page.body).to.equal('An updated article about the green anole.');
  //           expect(page.tags).to.have.lengthOf(3);
  //           done();
  //         });
  //       });
  //   });
  // });

  // // adding an article
  // describe('POST /add/submit', function() {
  //   it('should create in db', function(done) {
  //     agent
  //       .post('/add/submit')
  //       .send({
  //         title: 'The',
  //         body: 'A new article, or maybe a very old one.',
  //         tags: 'grammar,humor'
  //       })
  //       .end(function(err, response) {
  //         Page.find({
  //           title: 'The'
  //         }, function(err, pages) {
  //           expect(pages).to.have.lengthOf(1);
  //           done();
  //         });
  //       });
  //   });
  // });

});