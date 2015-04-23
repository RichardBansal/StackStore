app.directive('shirt', function(ShirtFactory){
    return {
        restrict: 'E',
        templateUrl:'js/common/directives/shirt/shirt.html',
        link: function(scope){
            scope.shirts = ShirtFactory.getShirts().then(fulfilled, rejected);

            function fulfilled(products){
				scope.shirts = products;
			}

			function rejected(error){
				console.log(error);
			}
        }
    };
});

app.config(function ($stateProvider) {    
    $stateProvider.state('shirt', {
        url: '/shirt/:id',
        templateUrl: 'js/common/directives/shirt/shirt.html'
    });
});