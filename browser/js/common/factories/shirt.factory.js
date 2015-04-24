app.factory('ShirtFactory', function($http){
	return {
		getShirts: function (){
			return $http.get('/api/products').then(function(shirts){
				return shirts.data;
			},function(error){
				console.log(error);
			});
		},
		shirts: "test",
		getShirt: function(id){
			// console.log('this',this.products);
			return $http.get('/api/products/'+id).then(fulfilled,rejected);

			function fulfilled(shirt){
				// console.log('shirt+reviews',shirt);
				return shirt;
			}

			function rejected(error){
				console.log(error);
				//ASK: Error Handling on Client
			}
			// var shirts = this.products;
			// return shirts.filter(function(shirt){
				// console.log('shirt',shirt);
				// return shirt._id === id;
			// });
		},
		updateShirt: function(id,shirt){
			console.log('shirt',shirt);
			return $http.put('/api/products/edit/'+id,shirt).then(fulfilled,rejected);

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

//instead of getShirts, we store the shirts for use by other modules