angular.module('MainCtrl', ['DataService'])
.controller('MainController', function($scope, $rootScope, $location) {	

	$rootScope.isUserLoggedIn = false;
	$rootScope.isPremiumUser = false;
	$rootScope.userId = "";

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
			console.log(JSON.stringify(body.data));
			if(body.data.message !== undefined && body.data.message === "OK"){
				console.log(body.data.userInfo);
				$rootScope.isUserLoggedIn = true;
				$rootScope.isPremium = body.data.userInfo.premium;
				$rootScope.userId = body.data.userInfo._id;
				$location.path('/profile'); // path not hash
			}else{
				$rootScope.isUserLoggedIn = false;
				console.log(body.data)
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
