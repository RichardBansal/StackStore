var app = require('../../../server/app/index');
var Products = require('mongoose').model('Product');

var supertest = require('supertest');
var agent = supertest.agent(app);
var expect = require('chai').expect;


require('../../../server/db/models/product');

describe('Product Routes', function(){

	describe('GET /api/products', function(){
		//seed database

		beforeEach("Seed Database with Products", function(done){
			product = {
			            name: "FSA T",
			            description: "Tshirt with FSA lettering.",
			            price: 2999,
			            category: ["School shirts", "Tshirts"]
				      };
			Products.create(product, function(err,createdProduct){
				product = createdProduct.toJSON();
				done();
			});
		});

		it("/api/products/ should return a 200 response ", function(done){
			agent
				.get('/api/products/')
				.expect(200, done);
		});

		xit("TODO: /api/products/ should return product(s) in response", function(done){
			
			var isCorrectProduct = function(res){
				// res.body.should.have.property(product);
				console.log('res.body', res.body);
				// console.log('product', product);
				// res.body[0].name.should.be("FSA T");
				// return res.body[0].name === 'FSA T';
				return res.body[0].name;
			};

			agent
				.get('/api/products/')
				.expect([product])
				.expect(200,done)
		});
		
		it("should return products for a random api url", function(done){
			agent
				.get('/api/products/random')
				.expect(200, done);
		});

	});


});