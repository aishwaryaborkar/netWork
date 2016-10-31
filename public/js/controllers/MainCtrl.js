angular.module('MainCtrl', ['DataService'])
.controller('MainController', function($scope, $rootScope, $location) {
	this.isLoggedIn = function(){
		return $rootScope.isUserLoggedIn;
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

.controller('LoginController', function($scope, $rootScope, $location, $q, dataService) {
	
	$scope.validateLogin = function(userIn, passIn){		
		dataService.performLoginOperation(userIn.$viewValue, passIn.$viewValue).then( function(body){
			console.log(body)
			console.log(JSON.stringify(body.data));
			if(body.data.message !== undefined && body.data.message === "OK"){
				$rootScope.isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn');
				$location.path('/profile'); // path not hash
			}else{
				$rootScope.isUserLoggedIn = false;
				$rootScope.showError = true;
				//need to show error
				//clearfield
			}
		

		});
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
