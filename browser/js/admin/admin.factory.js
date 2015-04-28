app.factory('AdminFactory', function($http){
	return {
		getOrders: function(orderId){
			var queryParams = {};
			if(orderId) queryParams.orderId = orderId;

			// if(orderId) orderId = {};
			return $http.get('/api/orders', {params:queryParams});
		},
		updateOrder: function(id,status){
			// console.log(id, status);
			var body = {
				id: id,
				status: status
			};

			return $http.put('/api/orders',body);
		},

		listProducts: function() {
			return $http.get('/api/products');
		}
	};
});