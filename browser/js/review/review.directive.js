app.directive('review', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/review/review.directive.html',
		scope: {
			product: '@product'
		},
		controller: 'reviewController'
		//,//,
		// link: function(s,e,a){
		// 	console.log('scope', s);
		// }
	}
});