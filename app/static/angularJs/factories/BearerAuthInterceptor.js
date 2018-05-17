angular.module('DemoApp').factory('BearerAuthInterceptor', function ($window, $localStorage, $q, $location) {
	    return {
	        request: function(config) {
	            config.headers = config.headers || {};
	            if ($localStorage.activeUser) {
	              // may also use sessionStorage
	                config.headers.Authorization = 'Bearer ' + angular.fromJson($localStorage.activeUser).token;
	            }
	            return config || $q.when(config);
	        },
	        response: function(response) {
	            if (response.status === 401 || response.status === 403) {
	                //  Redirect user to login page / signup Page.
	                $location.path("/");
	            }
	            return response || $q.when(response);
	        }
	    };
	});