app.factory('UserFactory', function($http) {
	return {
		updateUser: function(id, user) {
			console.log("In user factory: ", user);
			return $http.put('/api/account/edit', user).then(fulfilled, rejected);

			function fulfilled(response){
				//console.log(response);

				if (response.status === 200){
					return true;
				} else {
					return false;
				}
			}
			function rejected(error){
				console.log(error);
			}


		}
	};
});