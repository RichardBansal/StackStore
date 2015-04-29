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

function generatePrice(){

     var max = 5000;
     var min = 1000;
    
    return Math.random() * (max - min) + min;

}

var products = [
    {
        name: "I Win!",
        description: "Zena Styling.",
        price: generatePrice(),
        category: ["School shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/11Feog5PTumNnq.gif",
        stock: generateStock()
    },
    {
        name: "No! God!",
        description: "The Office.",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/12XMGIWtrHBl5e.gif",
        stock: generateStock()
    },
    {
        name: "MI-What?",
        description: "Mission Impossible...What?",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/3o85xky3bBsb8fysZG.gif",
        stock: generateStock()
    },
    {
        name: "Head Shake",
        description: "...?",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/3oEduSjq9BxP0ysJwc.gif",
        stock: generateStock()
    },
    {
        name: "Eye Rolling",
        description: "Yup.",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/3oEduULmVplmGtWNmE.gif",
        stock: generateStock()
    },
    {
        name: "Selfying",
        description: "Selfy Giphy!",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/3oEdv7XWaqQNOG4xwY.gif",
        stock: generateStock()
    },
    {
        name: "Obama Nod",
        description: "Obama'ing",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/47QR49DIvzXXO.gif",
        stock: generateStock()
    },
    {
        name: "U Mad?",
        description: "Cup of U Mad tea!",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/5MSPQODSIJa6c.gif",
        stock: generateStock()
    },
    {
        name: "Ooooooohhh",
        description: "For the wrestling fans out there",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/cbG9wtoO8QScw.gif",
        stock: generateStock()
    },
    {
        name: "Dolphin Boss!",
        description: "Dophin is laughing at you",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/cRq8TJsIKmQRG.gif",
        stock: generateStock()
    },
    {
        name: "Homer",
        description: "Being Homer!",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/Cz6TlrRVVyv9S.gif",
        stock: generateStock()
    },
    {
        name: "Coder Crazy",
        description: "Is this you?",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/fQZX2aoRC1Tqw.gif",
        stock: generateStock()
    },
    {
        name: "Good Luck",
        description: "Good Luck",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/IUjaKjjPPbGaQ.gif",
        stock: generateStock()
    },
    {
        name: "Amateur Hour",
        description: "..",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/N5PsztQSjkYMw.gif",
        stock: generateStock()
    },
    {
        name: "Ardnold Noodle Time",
        description: "..",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/NcryYnXliztss.gif",
        stock: generateStock()
    },
    {//
        name: "The Carlton",
        description: ".Dance!.",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/pa37AAGzKXoek.gif",
        stock: generateStock()
    },
    {//
        name: "Your heart",
        description: "....",
        price: generatePrice(),
        category: ["People shirts", "Tshirts"],
        imageUrl: "http://storage.googleapis.com/1503stackstore/shirts/pnMafc5UmFKc8.gif",
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