app.factory('AdminFactory', function($http){
	return {
		getOrders: function(orderId){
			var queryParams = {};
			if(orderId) queryParams.orderId = orderId;

			// if(orderId) orderId = {};
			return $http.get('/api/orders', {params:queryParams});
		}
	};
});