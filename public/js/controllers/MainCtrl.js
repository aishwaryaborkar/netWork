angular.module('MainCtrl', ['DataService'])

.controller('MainController', function($scope, $rootScope, $location) {	

	$rootScope.isUserLoggedIn = (sessionStorage.getItem('loggedIn') == 'true');

	this.logout = function(){
		sessionStorage.setItem('loggedIn', false);
		$location.path('/');
	}
	
	this.loadRegistration = function(){
		$location.path('/createaccount');
	}
	
	this.goHome = function(){
		if($rootScope.isUserLoggedIn){
			$location.path('/profile');
		}else{
			$location.path('/');
		}
	}
})

.controller('LoginController', function($scope, $rootScope, $location, $q, dataService) {
	
	$scope.validateLogin = function(userIn, passIn){		
		dataService.performLoginOperation(userIn.$viewValue, passIn.$viewValue).then( function(body){
			console.log(JSON.stringify(body.data));
			if(body.data.message !== undefined && body.data.message === "OK"){
				console.log(body.data.userInfo);
				$rootScope.isUserLoggedIn = true;
				$rootScope.isPremium = body.data.userInfo.premium;
				$rootScope.userId = body.data.userInfo._id;
				$location.path('/profile'); // path not hash
				sessionStorage.setItem('loggedIn', true);
				sessionStorage.setItem('userId', body.data.userInfo._id);
				sessionStorage.setItem('isPremium', body.data.userInfo.premium);
			}else{
				$rootScope.isUserLoggedIn = false;
				toastr.error('Login credentials invalid.')
				console.log(body.data)
				//need to show error
				//clearfield
			}
		});
	};
})

.controller('RegistrationController', function($scope, $rootScope, $location, dataService) {
	
	$scope.sQuestionList = [{id:"0", question:"Who is your favorite villian"},
							{id:"1", question:"What is the first and last name of your first boyfriend or girlfriend?"},
							{id:"2", question:"Which phone number do you remember most from your childhood?"},
							{id:"3", question:"What was your favorite place to visit as a child?"},
							{id:"4", question:"Who is your favorite actor, musician, or artist?"},
							{id:"5", question:"What is the name of your favorite pet?"},
							{id:"6", question:"What high school did you attend?"},
							{id:"7", question:"What is the name of your first school?"},
							{id:"8", question:"What is your favorite movie?"},
							{id:"9", question:"What is your mother\'s maiden name?"},
							{id:"10", question:"What street did you grow up on?"},
							{id:"11", question:"What was the make of your first car?"},
							{id:"12", question:"When is your anniversary?"},
							{id:"13", question:"What is your favorite color?"},
							{id:"14", question:"What is your father's middle name?"},
							{id:"15", question:"What is the name of your first grade teacher?"},
							{id:"16", question:"What was your high school mascot?"},
							{id:"17", question:"Which is your favorite web browser?"}];
	$scope.defaultQuestion = $scope.sQuestionList[0];
	$scope.emailCheckerResult = '';
	$scope.emailFailed = true;
	$('#password').popover();
	
	$scope.createUserAccount = function(user){
		var newUser = user;
		newUser.name = user.firstName + " " + user.lastName;
		newUser.sQuestion = user.sQuestion.question; 
		delete newUser.firstName;
		delete newUser.lastName;
		
		dataService.createAccount(newUser).then(function(body){
			console.log(JSON.stringify(body.data));
			if(body.data.message !== undefined && body.data.message === "OK"){
				$location.path('/'); // path not hash
			}else{
				
			}
		})
		
		console.log(newUser);
	};
	
	$scope.validatePasswordConfirmation = function(pass, passConf){
		return (pass.$viewValue !== passConf.$viewValue);
	};
	
	$scope.resetChecker = function(){
		$scope.emailCheckerResult = '';
		$scope.emailFailed = true;
		$scope.mailChecker = '';
	};
	
	$scope.validateEmail = function(newEmail){
		console.log("attempting to validate email..." + newEmail.$viewValue);
		if(newEmail.$viewValue == undefined || newEmail.$viewValue == ''){
			$scope.emailCheckerResult = "Email cannot be blank."
			$scope.emailFailed = true;
		}else{
			dataService.validateEmail({email: newEmail.$viewValue}).then(function(body){
				if(body.data.message !== undefined && body.data.message === "OK"){
					$scope.emailCheckerResult = "email can be used.";
					$scope.emailFailed = false;
					$scope.mailChecker = 'pass';
				}else{
					$scope.emailCheckerResult = body.data.error;
					$scope.emailFailed = true;
				}
			});
		}
	}
})

.controller('RecoveryController', function($scope, $location, dataService) {
$scope.sQuestions = '';
$scope.verifyAccount = false;
$scope.accountError = '';
$scope.userAccount;

	$scope.accountLookup = function(data){
		dataService.getAccount(data).then(function(body){
			if(body.data.sQuestion !== undefined){
				$scope.userAccount = body.data._id;
				$scope.sQuestions = body.data.sQuestion + "?";
				$scope.verifyAccount = true;
			}else{
				$scope.accountError = body.data.error;
				$scope.verifyAccount = false;
			}
		})
		
	};
	
	$scope.resetPassword = function(accountInfo){
		accountInfo._id = $scope.userAccount;
		dataService.resetPassword(accountInfo).then(function(body){
			if(body.data.message !== undefined && body.data.message == "OK"){
				$location.path('/login');
			}else{
				$location.path('/recoveraccount');
			}
		})
	};
	
	$scope.validatePasswordConfirmation = function(pass, passConf){
		return (pass.$viewValue !== passConf.$viewValue);
	};


});

