angular.module('ProfileController', []).controller('ProfileController', function($scope) {
    console.log('ProfileController loaded[]');
	toastr.success('Welcome to netWork!');


	$scope.addButton = function(){
		// window.location.href = "/forum";
	}
});