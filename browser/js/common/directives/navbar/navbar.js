'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.standardItems = [
                { label: 'Home', state: 'home' }
            ];
            scope.loggedOutItems = [
                { label: 'Create Account', state: 'createAccount'},
                { label: 'Shopping Cart', state: 'cart' }
            ];
            scope.loggedInItems = [
                { label: 'My Account', state: 'account'},
                { label: 'Shopping Cart', state: 'cart' }
            ];
            scope.adminItems = [
                { label: 'My Account', state: 'account'},
                { label: 'Admin Dashboard', state: 'admin'}
            ];// { label: 'Admin Dashboard', state: 'admin', admin: true}
        
            // scope.adminItems=[
            //     { label: 'Admin Dashboard', state: 'admin', admin: true}
            // ];

            scope.user = null;

            scope.isLoggedIn = function () {
                //scope.items[1]={ label: 'My Account', state: 'account', auth: true};
                return AuthService.isAuthenticated();
            };

            scope.isAdmin = function() {
                return AuthService.isAdmin();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            // if(scope.isLoggedIn()){
            //     scope.items[1]={ label: 'My Account', state: 'account', auth: true};
            //     scope.digest();
            // }

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});