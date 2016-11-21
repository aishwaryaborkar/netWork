angular.module('ProfileController', ['DataService', 'ngFileUpload'])


.controller('ProfileController', function($scope, $rootScope, dataService, Upload) {
    console.log('ProfileController loaded[]');
	toastr.success('Welcome to netWork!');

	$scope.modalHeader = ''
	$scope.editBody = ''
	$scope.user = []
	var editField = '';
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
		$scope.editBody = $scope.user.summary.slice(0)
		editField = 'summary'
	};

	$scope.eduClick = function(){
		$scope.modalHeader = 'Education'
		$scope.editBody = $.extend(true,{},$scope.user.education);
		editField = 'education'
	};

	$scope.expClick = function(){
		$scope.modalHeader = 'Experience'
		$scope.editBody = $.extend(true,{},$scope.user.experience)
		editField = 'experience'
	};

	$scope.skillsClick = function(){
		$scope.modalHeader = 'Skills'
		$scope.editBody = $scope.user.skills
		$scope.editField = 'skills'
	};

	$scope.update = function(){

		if(editField == 'summary'){
			var params = {
				"userId" : $rootScope.userId,
				"summary": $scope.editBody
			}
			$scope.user.summary = $scope.editBody
		}
		if(editField == 'education'){
			var params = {
				"userId" : $rootScope.userId,
				"education": $scope.editBody
			}
			$scope.user.education = $scope.editBody
		}
		if(editField == 'experience'){
			var params = {
				"userId" : $rootScope.userId,
				"experience": $scope.editBody
			}
			$scope.user.education = $scope.editBody
		}

		dataService.updateProfile(params).then(function(data){
			console.log(params)
			console.log('ok');
		});
	}

	$scope.close = function(){
		console.log($scope.user)
	}
});