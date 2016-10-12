angular.module('RecoveryController', []).controller('RecoveryController', function($scope, $location) {

$scope.handleSubmit = function(){
	alert("Account Credential is send to the registered email.");
	$location.path('/');
};

$scope.changeView = function(view){
    $location.path(view); // path not hash
}

});
