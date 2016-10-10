var isUserLoggedIn = true;
var username = "abc@gmail.com"
var password = "password"

angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.isLoggedIn = validateLogin("abc@gmail.com","password");	
	
	
	

});

function validateLogin(userIn, passIn){
	return (userIn == username && passIn == password);
}

