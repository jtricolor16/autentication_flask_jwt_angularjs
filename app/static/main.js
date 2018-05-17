(function () {
  'use strict';

	angular.module('DemoApp', ['ngRoute', 'ngStorage'])


	angular.module('DemoApp').run(function($rootScope, $location, $http, $localStorage){
		var blockedRoutesUserNotFound=['/home', '/update']
		var url=$location.path().substr($location.path().indexOf('/'), $location.path().length)
		
		//if($localStorage.activeUser){
		//	$http.defaults.headers.common.Authorization = 'Bearer ' + angular.fromJson($localStorage.activeUser).token
		//}

		$rootScope.$on('$locationChangeStart', function (){
			if($localStorage.activeUser == undefined && blockedRoutesUserNotFound.lastIndexOf(url) != -1){
				$location.path('/');
			}
			if($localStorage.activeUser != undefined && url=="/"){
				$location.path('/home');
			}
		})
	})

}());