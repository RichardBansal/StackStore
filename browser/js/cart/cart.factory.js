app.factory('CartFactory', function($http){
	return{
		completeOrder: function(order){
			console.log('factory',order);
			// var newItemsObj = {}
			// order.items.forEach(function{item}{
				
			// });

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
	}
});