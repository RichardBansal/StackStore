app.directive('shirts', function(ShirtFactory){
    return {
        restrict: 'E',
        templateUrl:'js/common/directives/shirts/shirts.html',
        // link: function(scope){
        //     scope.shirts = ShirtFactory.getShirts();
        // }
    };
});