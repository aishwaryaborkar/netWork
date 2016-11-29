
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		
		// about page
		.when('/aboutus', {
			templateUrl: 'views/aboutus.html'
		})
		
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		
		.when('/recoveraccount', {
			templateUrl: 'views/Recovery.html',
			controller: 'RecoveryController'
		})
		
		.when('/createaccount', {
			templateUrl: 'views/Registration.html',
			controller: 'RegistrationController'
		})
		
		.when('/search', {
			templateUrl: 'views/Search.html',
			controller: 'SearchController'
		})
		
		.when('/profile', {
			templateUrl: 'views/Profile.html',
			controller: 'ProfileController'
		})
		
		.when('/viewprofile/:userId', {
			templateUrl: 'views/PublicProfile.html',
			controller: 'PublicProfileController'
		})
		
		.when('/message', {
			templateUrl: 'views/Message.html',
			controller: 'MessageController'
		})
		
		.when('/forum/:ownerId?', {
			templateUrl: 'views/Forum.html',
			controller: 'ForumController'
		})

		.when('/forumTopic/:_id', {
			templateUrl: 'views/ForumTopic.html',
			controller: 'ForumTopicController'
		})

		.when('/createForum', {
			templateUrl: 'views/CreateForum.html',
			controller: 'ForumController'
		})
		
		.when('/connection', {
			templateUrl: 'views/Connection.html',
			controller: 'ConnectionController'
		});

	$locationProvider.html5Mode(true);
}]);