angular.module('DataService', []).factory('dataService', ['$http', function($http, $q) {

	var urlBase = 'http://localhost:8080/api';
	$http.defaults.headers.post["Content-Type"] = 'application/JSON';
    var dataService = {};

	dataService.testService = testService;
	dataService.getForumList = getForumList;
	dataService.performLoginOperation = performLoginOperation;
	dataService.performSearch = performSearch;
	dataService.getProfile = getProfile;
	
	return dataService;	
  
 
	function testService(){
		return $http({
				method: 'GET',
				url: urlBase + '/testService'
		}).then(
			function(res) { //what to on on success call
				console.log(JSON.stringify(res.data));
				return res.data;
			},
			function(res) { //what to do on failed call
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
		});
	}

	function testForumService(){
		return $http({
				method: 'GET',
				url: urlBase + '/testForumService'
		}).then(
			function(res) { //what to on on success call
				console.log(JSON.stringify(res.data));
				return res.data;
			},
			function(res) { //what to do on failed call
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
		});
	}

	function getForumList(){
				return $http({
				method: 'GET',
				url: urlBase + '/getForumList'
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});

	}

	function getForumById(forumId){

	}

	function createForum(forumData){


	}



		
	function performLoginOperation(userIn, passIn){ 
		return $http({
				method: 'POST',
				url: urlBase + '/login',
				data: {email : userIn,
						password : passIn}
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}
	
	function performSearch(searchCriteria){ 
		console.log(searchCriteria);
		return $http({
				method: 'POST',
				url: urlBase + '/search',
				data: searchCriteria
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body.data;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}
    
	function getProfile(profileID){ 
		console.log(profileID);
		return $http({
				method: 'POST',
				url: urlBase + '/getProfileById',
				data: profileID
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body.data;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}
	
}]);