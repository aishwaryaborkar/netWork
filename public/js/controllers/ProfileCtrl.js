angular.module('ProfileCtrl', ['DataService', 'ngFileUpload'])


.controller('ProfileController', function($scope, $rootScope, dataService, Upload) {
    console.log('ProfileController loaded[]');
	toastr.success('Welcome to netWork!');
	var curUser = sessionStorage.getItem('userId');

	$scope.modalHeader = ''
	$scope.editBody = ''
	$scope.user = []
	var editField = '';
	dataService.getProfile({'userId': curUser}).then(function(data){
		$scope.user = data.name;
		sessionStorage.setItem('userName', $scope.user);
		console.log(data)
	});
	$scope.imgURL = 'https://www.colourbox.com/preview/3603416-portrait-of-a-professional-business-executive.jpg'
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
		$scope.editBody = $.extend(true,{},$scope.user.skills)
		editField = 'skills'
	};

	$scope.minusClick = function(index){
		var newBody = [];
		for(var key in $scope.editBody){
			if(key != index){
				var obj = $scope.editBody[key]
				newBody.push(obj)
			}
		}
		$scope.editBody = newBody;
	}

	$scope.plusClick = function(index){
		var newBody = [];

		for(var key in $scope.editBody){
			var obj = $scope.editBody[key]
			newBody.push(obj)
		}
		var newObj = {}
		newBody.push(newObj)
		$scope.editBody = newBody;
	}

	$scope.update = function(){

		if(editField == 'summary'){
			var params = {
				"userId" : $rootScope.userId,
				"summary": $scope.editBody
			}
			$scope.user.summary = $scope.editBody
		}
		if(editField == 'education'){
			var educationInfo = []
			for(var key in $scope.editBody){
				var obj = $scope.editBody[key]
				delete obj._id
				delete obj.$$hashKey
				educationInfo.push(obj)
			}
			var params = {
				"userId" : $rootScope.userId,
				"education": educationInfo
			}
			$scope.user.education = $scope.editBody
		}
		if(editField == 'experience'){
			var experienceInfo = []
			for(var key in $scope.editBody){
				var obj = $scope.editBody[key]
				delete obj._id
				delete obj.$$hashKey
				experienceInfo.push(obj)
			}
			var params = {
				"userId" : $rootScope.userId,
				"experience": experienceInfo
			}
			$scope.user.experience = $scope.editBody
		}
		if(editField == 'skills'){
			var skillsInfo = []
			for(var key in $scope.editBody){
				var obj = $scope.editBody[key]
				delete obj._id
				delete obj.$$hashKey
				skillsInfo.push(obj)
			}
			var params = {
				"userId" : $rootScope.userId,
				"skills": skillsInfo
			}
			$scope.user.skills = $scope.editBody
		}	
		// var params = {
		// 	userId: "581ff07eda0427b81de36544",
		// 	education: [
		// 	{
		// 		description: "Ranked #1 (in reverse order)",
		// 		graduationDate: "Class of 2016",
		// 		schoolName: "Space Camp Test"	
		// 	},
		// 	{
		// 		description: "Ranked #1 (in reverse order)",
		// 		graduationDate: "Class of 2016",
		// 		schoolName: "SJSU"	
		// 	}
		// 	]
		// }
		console.log(params)
		dataService.updateProfile(params).then(function(data){
			console.log(params)
			console.log('ok');
		});
	}

	$scope.close = function(){
		console.log($scope.user)
	}
})

.controller('PublicProfileController', function($scope, $routeParams, dataService, Upload) {
	var visitUserId = $routeParams.userId;
	var curUser = sessionStorage.getItem('userId');
	console.log(curUser);
	dataService.getProfile({'userId': visitUserId}).then(function(data){
		console.log(data);
		$scope.user = data;
		//$scope.allowRequest = ((data.connections).includes(curUser) || (data.pendingConnections).includes(curUser));
	});
	
	$scope.testing = function(){
		console.log("IN DUMMY TEST CLICKER");
	}
	
	$scope.requestConnection = function(){
		console.log("in requesting connection");
		dataService.requestConnection({userId:curUser,connectionId:visitUserId});
		$scope.allowRequest = false;
	}
});