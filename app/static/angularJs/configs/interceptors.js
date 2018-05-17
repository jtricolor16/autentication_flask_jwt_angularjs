(function(){

	'use strict';	

	angular.module('DemoApp').config(function($httpProvider) {
	    $httpProvider.interceptors.push('BearerAuthInterceptor');
	})

}())	