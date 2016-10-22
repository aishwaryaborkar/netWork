angular.module('DataService', []).factory('dataService', ['$http', function($http, $q) {

	var urlBase = 'http://localhost:8080/api';
    var dataService = {};

		dataService.testService = testService;
		
        return dataService;
 
		function testService(){
			return $http({
						method: 'GET',
						url: urlBase + '/testService'
			}).then(handleSuccess, handleError);
		}
 
        //if http success...
        function handleSuccess(res) {
        	console.log(JSON.stringify(res.data));
            return res.data;
        }
 
		//if http fails
        function handleError(res) {
            return $q.reject(res.data);
        }
	
    return dataService;
}]);