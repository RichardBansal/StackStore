app.factory('CartFactory', function($http, $q){
	return{
		completeOrder: function(order, total){
			// console.log('factory',order);
			var productArr = [];

			order.products.forEach(function(item){
				var parentObj = {};
				var product = {};
				for(var prop in item){
				
					if(prop !== "size" && prop !== "quantity" && prop !== 'price'){
						if(prop === "_id"){
							product[prop] = item[prop];
						}
						
					} else {
						parentObj[prop] = item[prop];
					}

				}
				parentObj.product = product;
				
				productArr.push(parentObj);
			});

			order.products = productArr;
			order.totalCost = total;
			console.log("order",order);

			return $http.post('/api/orders',order);
			// .then(fulfilled, rejected);

			function fulfilled(response){
				console.log(response);
				if(response.status === 200){
					return true;
				} else {
					return false;
				}
			}

			function rejected(error){
				console.log(error);
			//ASK: Error Handling on Client
			}
		},


		totalPrice: function(products){
			var total = 0;
			products.forEach(function(item){
				total += (item.price/100 * item.quantity);
			});
			return total;
		},
		//TODO: Function is not working
		getCurrentPrice: function(products){
			console.log('products',products);
			var productsPromiseArr = [];
			products.forEach(function(product){
				productsPromiseArr.push($http.get('/api/products/'+product._id+'/price'));
			});

			return productsPromiseArr;

			function fulfilled(prices){

				console.log('prices',prices);
				products.forEach(function(product, index){
					product.price = prices[index].data;
				});
				console.log(products);
				return products;
			}

			function rejected(error){
				console.log(error);
			}
		}
	};
});