app.factory('AdminFactory', function($http){
	return {
		getOrders: function(){
			return $http.get('/api/orders');
		}
	};
});