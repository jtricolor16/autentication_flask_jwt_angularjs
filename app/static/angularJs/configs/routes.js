(function(){

	'use strict';

	angular.module('DemoApp').config(function($routeProvider, $locationProvider) {
	    
		$locationProvider.html5Mode({
  			enabled: true,
  			requireBase: false
		});


	    $routeProvider
	    .when("/home", {
	        templateUrl : "/static/pages/home.html",
	        controller: 'HomeController',
	        controllerAs: 'hc'
	    })

	    .when("/register", {
	        templateUrl : "/static/pages/registro.html",
	        controller: 'RegisterController',
	        controllerAs: 'rc'
	    })
	    .when("/update", {
	    	templateUrl : "/static/pages/registro.html",
	        controller: 'RegisterController',
	        controllerAs: 'rc'
	    })

	    .when("/", {
	        templateUrl : "/static/pages/login.html",
	        controller: 'LoginController',
	        controllerAs: 'lc'
	    });
	});
	
}())	