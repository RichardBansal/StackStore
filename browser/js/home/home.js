'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
    		controller:'ShirtsController',
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});