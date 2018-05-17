(function(){

	'use strict';

	angular.module('DemoApp').controller('mainController', function($rootScope, $location, $localStorage){
			
		self=this;
		self.user = undefined;

		self.setUser = function(){
			if($localStorage.activeUser){
				self.user = angular.fromJson($localStorage.activeUser).user;
			}
		}
		self.setUser()
		self.home = function(){
	   		if($localStorage.activeUser)
	   			$location.path('/home');
	   		else
	   			$location.path('/');
	   	}
	})
	
}())	