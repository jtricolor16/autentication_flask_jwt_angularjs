(function(){

	'use strict';

	angular.module('DemoApp').controller('HomeController', function($scope, $log, $http, $rootScope, $location, $localStorage){

		self=this;

		self.user = undefined;

		self.setUser = function(){
			if($localStorage.activeUser){
				self.user = angular.fromJson($localStorage.activeUser).user
			}
		}

		self.setUser()

		self.redirect_to_update=function(){
			$location.path('/update')
		}

		self.logout = function(){
			$http.post('/logout').
			success(function(results){
				delete $localStorage.activeUser;
				$http.defaults.headers.common.Authorization = '';
				$location.path('/')
			}).
			error(function(error){
				if(error.message==="Token is invalid!" || error.message==="Token is missing!")
					delete $localStorage.activeUser;
					$http.defaults.headers.common.Authorization = '';
					$location.path('/')
				$log.log(error)
			})
			
		}

		self.delete_user = function(){
			$http.delete('/delete_user/' + self.user.id).
			success(function(results){
				$log.log(results);
				delete $localStorage.activeUser;
				self.message='success';
    			//$location.path('/');
			})
			.error(function(results){
				$log.log(results);
    			self.message='error';
			})
		}


	});
}());	