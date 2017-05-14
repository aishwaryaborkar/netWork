angular.module('ProfileCtrl', ['DataService', 'ngFileUpload', 'ngImgCrop', 'ui.bootstrap'])


.controller('ProfileController', function($scope, $rootScope, dataService, Upload, $timeout) {
    console.log('ProfileController loaded[]');
	toastr.success('Welcome to netWork!');


	$scope.modalHeader = ''
	$scope.editBody = ''
	var editField = '';
	var summaryHolder = ''
		
	$scope.user = {
		userId: "581ff07eda0427b81de36544",
		name: "JC",
		company: "Thomson Reuters - FindLaw",
		jobTitle: "Software Consultant",
		summary: ["User summary goes here", "no special format here","just plain text/paragraph format"],
		education: 
			[
				{degree: "BS", field:"Software Engineering", gpa:"3.62", graduationDate: "Fall 2017",schoolName: "San Jose State University", details:"some extra details of achievements during school, sports, clubs, competitions etc"},
				{degree: "AA", field:"Systems Programming", gpa:"3.25", graduationDate: "Spring 2015",schoolName: "De Anza College"}
			],
		experience:
			[
				{company:"Rito", location:"home", jobTitle:"Troll",duration: "Sept 2011 - Present", monthsTally: "5 Yrs 8 Mos", responsibility:"be TEEMO", details:"Do what teemo do best..."},
				{company:"Thomson Reuters", location:"Sunnyvale", jobTitle:"Software Engineer", duration: "May 2016 - Present", monthsTally: "1 Yr", responsibility:"Front End developer", details:"additional details regarding scope of work and etc goes here."},
				{company:"Levi Strauss & Co.", location:"San Francisco", jobTitle:"IT Intern", duration: "June 2009 - Sept 2009", monthsTally: "3 Mos", responsibility:"busy worker"}
			],
		skills: 
			[
				{skillName:"ReactJS",skillLevel:"60", endorsement:10},
			 	{skillName:"AngularJS",skillLevel:"80", endorsement:7},
				{skillName:"Spring",skillLevel:"90", endorsement:0}
			],
		achievements:
			[
				{name:"Microsoft Certified Professional ", type: "certificate", details:"gotta catch them all", date: "Dec 2016"}
			]
	}

	$scope.sortBy = function(column){
		console.log(column);
		$scope.lastSort = column

		switch(column){
			case 'endorse':
				$scope.user.skills.sort(function(a,b) {
  					if (a.endorsement > b.endorsement)
    					return -1;
  					if (a.endorsement < b.endorsement)
    					return 1;
  					return 0;
				});
			break;
			case 'name':
				$scope.user.skills.sort(function(a,b) {
  					if (a.skillName < b.skillName)
    					return -1;
  					if (a.skillName > b.skillName)
    					return 1;
  					return 0;
				});
			break;
			case 'skill level':
				$scope.user.skills.sort(function(a,b) {
  					if (a.skillLevel > b.skillLevel)
    					return -1;
  					if (a.skillLevel < b.skillLevel)
    					return 1;
  					return 0;
				});
			break;
			default:
		}
	}
	
	$scope.imgURL = 'http://localhost:8080/api/userImage/' + $scope.user.userId;
	
	$scope.profileImageClick = function(){
		$scope.modalHeader = 'Profile Header'
		var aBody = []
		aBody.push({name: $scope.user.name,
					company: $scope.user.company,
					jobTitle: $scope.user.jobTitle

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
				"userId" : "581ff07eda0427b81de36544",
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
				"userId" : "581ff07eda0427b81de36544",
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
				"userId" : "581ff07eda0427b81de36544",
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
				"userId" : "581ff07eda0427b81de36544",
				"skills": skillsInfo
			}
			$scope.user.skills = $scope.editBody
		}
		if(editField == 'pfHeader'){
			var params = {
				"userId" : "581ff07eda0427b81de36544",
				"name": $scope.editBody[0].name,
				"jobTitle": $scope.editBody[0].jobTitle,
				"company": $scope.editBody[0].company
			}
			$scope.user.name = $scope.editBody[0].name
			$scope.user.jobTitle = $scope.editBody[0].jobTitle
			$scope.user.company = $scope.editBody[0].company
		}	

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
			if("581ff07eda0427b81de36544" == data[i]._id){
				alreadyReq = true
			}
		}
	});

	dataService.getConnection(visitUserId).then(function(data){
		console.log(data)

		for(var i = 0; i < data.length; i++){
			if("581ff07eda0427b81de36544" == data[i]._id){
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
			dataService.requestConnection({userId:"581ff07eda0427b81de36544",connectionId:visitUserId})
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