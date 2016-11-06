angular.module('ProfileController', ['DataService']).controller('ProfileController', function($scope, $rootScope, dataService) {
    console.log('ProfileController loaded[]');
	toastr.success('Welcome to netWork!');

	$scope.modalHeader = ''
	console.log($rootScope.userId);
	$scope.addButton = function(){
		// window.location.href = "/forum";
	};

	$scope.summaryClick = function(){
		$scope.modalHeader = 'Summary'
	};

	$scope.eduClick = function(){
		$scope.modalHeader = 'Education'
	};

	$scope.expClick = function(){
		$scope.modalHeader = 'Experience'
	};

	$scope.skillsClick = function(){
		$scope.modalHeader = 'Skills'
	};

	dataService.getProfile({'userId': $rootScope.userId}).then(function(data){
		console.log(data);
	});
});