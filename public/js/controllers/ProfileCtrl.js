angular.module('ProfileCtrl', ['DataService', 'ngFileUpload', 'ngImgCrop', 'ui.bootstrap'])


.controller('ProfileController', function($scope, $rootScope, dataService, Upload, $timeout) {
    console.log('ProfileController loaded[]');
	toastr.success('Welcome to netWork!');
	var curUser = sessionStorage.getItem('userId');

	$scope.modalHeader = ''
	$scope.editBody = ''
	$scope.user = []
	var editField = '';
	var summaryHolder = ''
	dataService.getProfile({'userId': curUser}).then(function(data){
		$scope.user = data;
		sessionStorage.setItem('userName', data.name);
		console.log(data)
		summaryHolder = $scope.user.summary.slice(0);
		$scope.user.summary = $scope.user.summary.split("\n")
	});
	
	$scope.imgURL = 'http://localhost:8080/api/userImage/' + curUser;
	
	$scope.profileImageClick = function(){
		$scope.modalHeader = 'Profile Header'
		var aBody = []
		aBody.push({name: $scope.user.name.slice(0),
					company: $scope.user.company.slice(0),
					jobTitle: $scope.user.jobTitle.slice(0)

			})
		$scope.editBody = aBody
		editField = 'pfHeader'
	};

	$scope.value = 60
	$scope.myStyle = function(x) {
		console.log(x.skillLevel)
		$scope.value = x.skillLevel
		return {width: $scope.value + '%'};
	} 



	$scope.summaryClick = function(){
		$scope.modalHeader = 'Summary'
		$scope.editBody = summaryHolder.slice(0)
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
				"userId" : curUser,
				"summary": $scope.editBody
			}
			summaryHolder = $scope.editBody;
			$scope.user.summary = $scope.editBody.split("\n")
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
				"userId" : curUser,
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
				"userId" : curUser,
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
				"userId" : curUser,
				"skills": skillsInfo
			}
			$scope.user.skills = $scope.editBody
		}
		if(editField == 'pfHeader'){
			var params = {
				"userId" : curUser,
				"name": $scope.editBody[0].name,
				"jobTitle": $scope.editBody[0].jobTitle,
				"company": $scope.editBody[0].company
			}
			$scope.user.name = $scope.editBody[0].name
			$scope.user.jobTitle = $scope.editBody[0].jobTitle
			$scope.user.company = $scope.editBody[0].company
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

		// var params = {
		// 	userId: "581ff07eda0427b81de36544",
		// 	name: 'Navjot Bola',
		// 	jobTitle: 'Software Developer',
		// 	company: 'net[Work]'
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
	$scope.imgURL = 'http://localhost:8080/api/userImage/' + visitUserId;
	dataService.getProfile({'userId': visitUserId}).then(function(data){
		console.log(data);
		$scope.user = data;
		//$scope.allowRequest = ((data.connections).includes(curUser) || (data.pendingConnections).includes(curUser));
	});
	var alreadyReq = false

	dataService.getPendingConnection(visitUserId).then(function(data){
		console.log(data)
		$scope.thisUsersConnections = data;

		for(var i = 0; i < data.length; i++){
			if(curUser == data[i]._id){
				alreadyReq = true
			}
		}
	});

	dataService.getConnection(visitUserId).then(function(data){
		console.log(data)

		for(var i = 0; i < data.length; i++){
			if(curUser == data[i]._id){
				alreadyReq = true
			}
		}
	});

	$scope.myStyle = function(x) {
		console.log(x.skillLevel)
		$scope.value = x.skillLevel
		return {width: $scope.value + '%'};
	} 


	$scope.testing = function(){
		console.log("IN DUMMY TEST CLICKER");
	}
	
	$scope.requestConnection = function(){
		$scope.thisUsersConnections = [];

		if(!alreadyReq){
			dataService.requestConnection({userId:curUser,connectionId:visitUserId})
			toastr.success('Connection requested')
		}
		else{
			toastr.error('Connection already requested')
		}
		$scope.allowRequest = false;

	}

	$scope.forumButton = function(){
		window.location.href = "/forum";
	};
});