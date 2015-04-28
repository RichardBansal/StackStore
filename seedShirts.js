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
        imageUrl: "https://lh5.googleusercontent.com/tkXm8nOuF_EsmPENMKfOUInLWqS392ae4HFXJSVHl_R2oY0QshhJIJsjMeV2ph8Vs0GlkQ=s190",
        stock: generateStock()
    },
    {
        name: "No! God!",
        description: "The Office.",
        price: 3799,
        category: ["People shirts", "Tshirts"],
        imageUrl: "https://lh6.googleusercontent.com/2oM4-caD9-aHhMkTrXfbJxGE64IajR-XLtaMP8q5k0ncdFsLvxR2w1FBygDv4UKh4JvJkw=s190",
        stock: generateStock()
    },
    {
        name: "MI-What?",
        description: "Mission Impossible...What?",
        price: 3409,
        category: ["People shirts", "Tshirts"],
        imageUrl: "https://lh5.googleusercontent.com/yD6PQPZc0mKaR6LxyoAayvJG4jYm7fwMnOUTO1C47yKj_Rh9LZ7gMQsBvs4GF7zBc4ew6w=s190",
        stock: generateStock()
    },
    {
        name: "Head Shake",
        description: "...?",
        price: 3099,
        category: ["People shirts", "Tshirts"],
        imageUrl: "https://lh6.googleusercontent.com/48kRwQGkHRFsUS1RDaea5t4YRccYAU9-rXy2YDYz6UM2i93ohmVY8c3SG1oSYmOZPOLWHQ=s190",
        stock: generateStock()
    },
    {
        name: "Eye Rolling",
        description: "Yup.",
        price: 3199,
        category: ["People shirts", "Tshirts"],
        imageUrl: "https://lh5.googleusercontent.com/OdF6XwBiCo3Odjvm-j-SvLfb6TjwjeTJyLaDeW0-m4i51T-b44cqIOOCkuOJyt2IkSm0Zg=s190",
        stock: generateStock()
    },
    {
        name: "Selfying",
        description: "Selfy Giphy!",
        price: 2599,
        category: ["People shirts", "Tshirts"],
        imageUrl: "https://lh4.googleusercontent.com/6DvHubuJCq8B0VvQ3o8-HPxFggx65VXQohrNG0aCq9gpYkUJLGn5DC4mh_eCqER_XhVERA=s190",
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