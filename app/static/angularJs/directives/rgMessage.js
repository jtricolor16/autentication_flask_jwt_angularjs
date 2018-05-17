(function(){
	
	'use strict';

	angular.module('DemoApp').directive("rgMessage", function(){


		return{
			templateUrl: '/static/pages/directive_view/message.html',
			restrict: 'AE',
			scope: {
				message: "@"
			}
		}
	})

}());	