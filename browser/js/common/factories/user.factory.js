app.factory('UserFactory', function($http) {
	return {
		updateUser: function(id, user) {
			return $http.put('/api/user/edit/' + id, user).then(fulfilled, rejected);

			function fulfilled(response){
				console.log(response);
				//return
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