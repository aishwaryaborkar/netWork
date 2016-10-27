
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'MainController'
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
			// controller: 'SearchController'
			controller: 'ProfileController'
		})
		
		.when('/message', {
			templateUrl: 'views/Message.html',
			controller: 'SearchController'
		})
		
		.when('/forum', {
			templateUrl: 'views/Forum.html',
			controller: 'ForumController'
		})

		.when('/forumTopic', {
			templateUrl: 'views/ForumTopic.html',
			controller: 'ForumController'
		})
		
		.when('/connection', {
			templateUrl: 'views/Connection.html',
			controller: 'ConnectionController'
		});

	$locationProvider.html5Mode(true);
}]);