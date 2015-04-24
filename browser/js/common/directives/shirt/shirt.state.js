app.config(function ($stateProvider) {    
    $stateProvider
	    .state('shirt', {
	        url: '/shirt/:id',
	        templateUrl: 'js/common/directives/shirt/shirt.template.html',
	        // controller: 'ShirtController'
	    })
	    .state('edit-shirt', {
	    	url: '/shirt/:id/edit',
	    	templateUrl: 'js/common/directives/shirt/shirt.edit.html',
	    })
});