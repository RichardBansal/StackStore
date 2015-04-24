app.factory('ShirtFactory', function($http){
	return {
		getShirts: function (){
			return $http.get('/api/products').then(function(shirts){
				return shirts.data;
			},function(error){
				console.log(error);
			});
		},

		createShirt: function(newShirt){
			return $http.post('/api/products', newShirt).then(function(shirt){
				return shirt;
			}, function(error){
				console.log(error);

			});

		}
	};
});