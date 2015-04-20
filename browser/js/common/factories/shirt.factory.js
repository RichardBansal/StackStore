app.factory('ShirtFactory', function($http){
	return {
		getShirts: function (){
			return $http('/getShirts').then(function(shirts){
				return shirts;
			},function(error){
				console.log(error);
			});
		}
	};
});