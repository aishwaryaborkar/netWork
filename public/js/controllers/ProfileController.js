angular.module('ProfileController', ['DataService', 'ngFileUpload']).controller('ProfileController', function($scope, $rootScope, dataService, Upload) {
    console.log('ProfileController loaded[]');
	toastr.success('Welcome to netWork!');

	$scope.modalHeader = ''
	$scope.editBody = ''
	$scope.user = []
	$scope.OGUser = [];
	var editField = '';
	dataService.getProfile({'userId': $rootScope.userId}).then(function(data){
		console.log(data);
		$scope.user = data;
		$scope.OGUser = data;
		$scope.OGUser.splice()
	});

	console.log($rootScope.userId);
	$scope.addButton = function(){
		// window.location.href = "/forum";
	};

	$scope.summaryClick = function(){
		$scope.modalHeader = 'Summary'
		$scope.editBody = $scope.user.summary
		editField = 'summary'
	};

	$scope.eduClick = function(){
		$scope.modalHeader = 'Education'
		$scope.editBody = $scope.user.education
		console.log($scope.editBody)
		editField = 'education'
	};

	$scope.expClick = function(){
		$scope.modalHeader = 'Experience'
		$scope.editBody = $scope.user.experience
		// $scope.editField = 'experience'
	};

	$scope.skillsClick = function(){
		$scope.modalHeader = 'Skills'
		$scope.editBody = $scope.user.skills
		// $scope.editField = 'skills'
	};

	$scope.update = function(){
		console.log($scope.user)
		console.log($scope.OGUser)

		if(editField == 'summary'){
			var params = {
				"userId" : $rootScope.userId,
				"summary": $scope.editBody
			}
		}
		if(editField == 'education'){
			var params = {
				"userId" : $rootScope.userId,
				"education": $scope.editBody
			}
		}
		// dataService.updateProfile(params).then(function(data){
		// 	console.log('ok');
		// });
	}
});