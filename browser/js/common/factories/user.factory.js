app.factory('UserFactory', function($http) {
	return {
		updateUser: function(id, user) {
			//console.log("In user factory: ", user);
			
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
			
			return $http.put('/api/account/edit', user).then(fulfilled, rejected);
		},

		listUsers: function() {
			//console.log("in listUsers factory");

			function fulfilled(response){
				//console.log(response);

				if (response.status === 200){
					//console.log("In the factory if");
					return response;
				} else {
					return false;
				}
			}
			function rejected(error){
				console.log(error);
			}

			return $http.get('/api/account/all').then(fulfilled, rejected);
		},

		toggleAccountType: function(user) {
			console.log("User factory", user);
			return $http.put('/edit', user).then(fulfilled, rejected);
		}
	};
});