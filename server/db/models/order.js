var mongoose = require('mongoose');
var Product = require('mongoose').model('User');

var q = require('q');

var OrderSchema = new mongoose.Schema({
    // personName: {type: String, required:true},
    //TODO: Update seedDB for billing/shipping address
    addressBilling: {type:String, required:true},
    addressShipping: {type:String,required:true},
    purchaseDate: {type: Date, default: Date.now, required: true},
    totalCost: {type: Number, min:0, default: 0, required: true},
    status: {type: String, default: "Open", required:true},
    products: { type:   [{
                            product: 
                                {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: 'Product'
                                },
                            quantity: Number,
                            size: String,
                            //current price paid
                            price: Number
                        }]
                }
                // required: true} //Issue with test
});

OrderSchema.methods.determineTotal = function(){
    var sum = 0;
    //total cost assuming order exists?!

    this.products.forEach(function(product){

        sum += product.price;
    });
    return sum;
};

OrderSchema.methods.saveAsync = function () {
    return q.ninvoke(this,'save');
};

mongoose.model('Order', OrderSchema);

// OrderSchema.methods.

// 55381e09a440b16897b9d1d5