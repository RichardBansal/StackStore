app.directive('shirts', function(ShirtFactory){
    return {
        restrict: 'E',
        templateUrl:'js/common/directives/shirts/shirts.html',
        link: function(scope){
            scope.shirts = ShirtFactory.getShirts().then(fulfilled, rejected);

            function fulfilled(products){
				scope.shirts = products;
                ShirtFactory
                ShirtFactory.shirts = {
                    products
                };
			}

			function rejected(error){
				console.log(error);
			}
        }
    };
});