(function(){
    
    'use strict';

    angular.module('DemoApp').controller('LoginController', function($log, $http, $rootScope, $location, $localStorage){
    	
        self=this;
        self.user={};
        self.message=false;	

    	self.login = function(){
        	$http.post('/login', self.user).
        	success(function(results){
        		$log.log(results);
        		$localStorage.activeUser=angular.toJson(results)
        		//$http.defaults.headers.common.Authorization = 'Bearer ' + angular.fromJson($localStorage.activeUser).token
        		$location.path('/home')
        		//$window.location.href = '/home/' + $rootScope.activeUser.id;
        	}).
        	error(function(results){
        		$log.log(results);
        		self.message=true;
        	})

       	};

       	self.register = function(){
       		$location.path('/register')
       	}

    });

}());    