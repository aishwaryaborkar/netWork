angular.module('DataService', []).factory('dataService', ['$http', function($http, $q) {

	var urlBase = 'http://localhost:8080/api';
    var dataService = {};

	dataService.testService = testService;
	
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
				return $q.reject(res.data);
		});
	}
    
}]);