app.factory('ShirtFactory', function($http){
	return {
		getShirts: function (category){

			var queryParams = {};
			if(category) queryParams.category = category;

			return $http.get('/api/products', {params:queryParams}).then(function(response){
				return response.data;
			});	
		},
	};
});