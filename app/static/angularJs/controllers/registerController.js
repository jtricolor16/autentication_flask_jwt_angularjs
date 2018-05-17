(function(){
	
	'use strict';


	angular.module('DemoApp').controller('RegisterController', function($log, $http, $rootScope, $location, $localStorage){
		
		self=this;

		self.user = undefined;

		self.setUser = function(){
			if($localStorage.activeUser){
				self.user = angular.fromJson($localStorage.activeUser).user
			}
		}

		self.setUser()


		self.submit = function(){
			if($localStorage.activeUser==undefined){
				self.register_user();
			}else{
				self.update_user();
			}
		}


		self.register_user = function(){
			$http.post('/create_user', self.user).
    		success(function(results){
    			$log.log(results);
    			self.message='Success!'
    		}).
    		error(function(results){
    			$log.log(results);
    			self.message='Error!';
    		})
		}

		self.update_user = function(){
			$http.post('/update_user', self.user).
    		success(function(results){
    			var userTemp = angular.fromJson($localStorage.activeUser)
    			$log.log(results);
    			userTemp.user=results.user;
    			$localStorage.activeUser = angular.toJson(userTemp);
    			self.message='Success!'
    		}).
    		error(function(results){
    			$log.log(results);
    			self.user.password=undefined;
    			self.user.validate_password=undefined;
    			self.message='Error!';
    		})
		}
		
	});
}());