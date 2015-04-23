app.config(function ($stateProvider) {    
    $stateProvider.state('shirt', {
        url: '/shirt/:id',
        templateUrl: 'js/common/directives/shirt/shirt.template.html',
        // controller: 'ShirtController'
    });
});