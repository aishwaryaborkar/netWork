angular.module('MainCtrl', [])
.controller('MainController', function($scope, $rootScope, $location) {
	this.isLoggedIn = function(){
		return $rootScope.isUserLoggedIn
	};
	
	this.logout = function(){
		$rootScope.isUserLoggedIn = false;
		$location.path('/');
	}
	
	this.loadRegistration = function(){
		$location.path('/createaccount');
	}
	
	this.goHome = function(){
		if($rootScope.isUserLoggedIn){
			$location.path('/profile');
		}else{
			$location.path('/');
		}
	}
})
.controller('LoginController', function($scope, $rootScope, $location) {
	
	this.validateLogin = function(userIn, passIn){
		$rootScope.isUserLoggedIn = (userIn.$viewValue === 'admin' && passIn.$viewValue === 'password');

		if($rootScope.isUserLoggedIn){
			$location.path('/profile'); // path not hash
		}
	};
})
.controller('RegistrationController', function($scope, $rootScope, $location) {
	
	this.validateLogin = function(userIn, passIn){
		$rootScope.isUserLoggedIn = (userIn.$viewValue === 'admin' && passIn.$viewValue === 'password');

		if($rootScope.isUserLoggedIn){
			$location.path('/profile'); // path not hash
		}
	};
});
