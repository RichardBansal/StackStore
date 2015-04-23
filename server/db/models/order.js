var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    purchaseDate: {type: Date, default: Date.now, required: true},
    totalCost: {type: Number, min:0, default: 0, required: true},
    status: {type: String, default: "Open", required:true},
    products: { type:   [{
                            quantity: Number,
                            product: 
                                {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: 'Product'
                                },
                            price: Number
                        }]
                }
                // required: true} //Issue with test
});

OrderSchema.methods.determineTotal = function(){
    var sum = 0;
    this.products.forEach(function(product){
        sum += product.price;
    });
    return sum;
};

mongoose.model('Order', OrderSchema);

// OrderSchema.methods.

// 55381e09a440b16897b9d1d5