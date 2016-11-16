angular.module('ProfileController', ['DataService', 'ngFileUpload']).controller('ProfileController', function($scope, $rootScope, dataService, Upload) {
    console.log('ProfileController loaded[]');
	toastr.success('Welcome to netWork!');

	$scope.modalHeader = ''
	$scope.editBody = ''
	$scope.user = []
	dataService.getProfile({'userId': $rootScope.userId}).then(function(data){
		console.log(data);
		$scope.user = data;
	});

	console.log($rootScope.userId);
	$scope.addButton = function(){
		// window.location.href = "/forum";
	};

	$scope.summaryClick = function(){
		$scope.modalHeader = 'Summary'
		$scope.editBody = $scope.user.summary
	};

	$scope.eduClick = function(){
		$scope.modalHeader = 'Education'
		$scope.editBody = $scope.user.education
	};

	$scope.expClick = function(){
		$scope.modalHeader = 'Experience'
		$scope.editBody = $scope.user.experience
	};

	$scope.skillsClick = function(){
		$scope.modalHeader = 'Skills'
		$scope.editBody = $scope.user.skills
	};


});