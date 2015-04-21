app.directive('createAccount', function($http){
	return {
		restrict: 'E',
		templateUrl: 'js/create-account/form.html',
		link: function(scope){
			scope.user = {
				name: "",
				addressBilling: "",
				addressShipping: "",
				phoneNumber: "",
				email: "",
				password: ""
			};

			scope.createAccount = function (){
				//TODO: what happens after users create an account
					$http.post('/api/accounts/create', scope.user);
			};
		}
	};
});