var q = require('q');
var dbConnected = require('./server/db');
var User = require('mongoose').model('User');
var Product = require('mongoose').model('Product');
var Order = require('mongoose').model('Order');
var Stock = require('mongoose').model('Stock');
var Review = require('mongoose').model('Review');

function generateStock(){
	var stocks = [
	    {
	        size: "M",
	        quantity: Math.floor((Math.random() * 100) + 1)
	    },
	    {
	        size: "L",
	        quantity: Math.floor((Math.random() * 100) + 1)
	    },
	    {
	        size: "S",
	        quantity: Math.floor((Math.random() * 100) + 1)
	    },
	    {
	        size: "XS",
	        quantity: Math.floor((Math.random() * 100) + 1)
	    }];	
	return stocks;}

var products = [
    {
        name: "I Win!",
        description: "Zena Styling.",
        price: 7999,
        category: ["School shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/11Feog5PTumNnq.gif",
        stock: generateStock()
    },
    {
        name: "No! God!",
        description: "The Office.",
        price: 3799,
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/12XMGIWtrHBl5e.gif",
        stock: generateStock()
    },
    {
        name: "MI-What?",
        description: "Mission Impossible...What?",
        price: 3409,
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/3o85xky3bBsb8fysZG.gif",
        stock: generateStock()
    },
    {
        name: "Head Shake",
        description: "...?",
        price: 3099,
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/3oEduSjq9BxP0ysJwc.gif",
        stock: generateStock()
    },
    {
        name: "Eye Rolling",
        description: "Yup.",
        price: 3199,
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/3oEduULmVplmGtWNmE.gif",
        stock: generateStock()
    },
    {
        name: "Selfying",
        description: "Selfy Giphy!",
        price: 2599,
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/3oEdv7XWaqQNOG4xwY.gif",
        stock: generateStock()
    }];

function seedShirt(){
	dbConnected
		.then(addToDocument)
		.then(showCompleted)

	function addToDocument(){
		return Product.create(products)
	}

	function showCompleted(data){
		console.log(data);
		process.kill(0);
	}

} 

module.exports = seedShirt