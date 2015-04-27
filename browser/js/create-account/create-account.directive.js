app.directive('createAccount', function($http, $window){
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
				//accountType: "shopper"
			};

			scope.createAccount = function (){
				//TODO: what happens after users create an account
				$http.post('/api/account/create', scope.user);
			};

			scope.goToGoogle = function(){
				$window.location = '/auth/google'; 
			}
		}
	};
});