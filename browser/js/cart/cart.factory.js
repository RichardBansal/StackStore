app.factory('CartFactory', function($http){
	return{
		completeOrder: function(order){
			// console.log('factory',order);
			var productArr = [];

			order.products.forEach(function(item){
				var parentObj = {};
				var product = {};
				for(var prop in item){
				
					if(prop !== "size" && prop !== "quantity"){
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


			return $http.post('/api/orders',order).then(fulfilled, rejected);

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
		}
	};
});