app.factory('ShirtFactory', function($http){
	return {
		getShirts: function (category){

			var queryParams = {};
			if(category) queryParams.category = category;

			return $http.get('/api/products', {params:queryParams}).then(function(response){
				return response.data;
			});	
		},
		shirts: "test",
		
		getShirt: function(id){
			// console.log('this',this.products);
			return $http.get('/api/products/'+id).then(fulfilled,rejected);

			function fulfilled(shirt){
				// console.log('shirt+reviews',shirt);
				console.log(shirt);
				return shirt.data;
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

		},

		createShirt: function(newShirt){
			return $http.post('/api/products', newShirt).then(function(shirt){
				return shirt;
			}, function(error){
				console.log(error);

			});

		},

		formatShirt: function(shirt){
			return {
				_id: shirt._id,
				size: shirt.size,
				name: shirt.name,
				quantity: shirt.quantity,
				description: shirt.description
			};
		},
		getSearch: function(term){
			console.log("found getsearch2 text", term);
			return $http.get('/api/products/search',{params:{term:term}}).then(fulfilled,rejected);

			function fulfilled(shirt){
				// console.log('shirt+reviews',shirt);
				//console.log(shirt);
				return shirt.data;
			}

			function rejected(error){
				console.log(error);
			}
		}
	};
});


//instead of getShirts, we store the shirts for use by other modules
