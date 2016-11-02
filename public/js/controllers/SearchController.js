angular.module('SearchController', ['DataService']).controller('SearchController', function($scope, $http, dataService) {	
	var temp = [{id:1, "name":"JC","jobTitle":"Software Consultant","company":"Thomson Reuters"}];
	$scope.testData = temp;
	
	$scope.isPremiumUser = sessionStorage.getItem('isPremiumUser');
	
	$scope.results = [];
	
    $scope.handleSubmit = function() {
		
		dataService.testService().then(	function(searchResult){

			console.log("In dataService promise function b4 cpy: " + JSON.stringify(searchResult));
			console.log("In dataService promise function b4 cpy: " + JSON.stringify($scope.results));
	
			$scope.results = [];
			
			
			console.log("In dataService promise function after  reset: " + JSON.stringify($scope.results));
			
			var i = 0;
			for (i = 0; i < searchResult.length ;i++) {
				var obj = { id: searchResult[i].id,
							name: searchResult[i].name,
							jobTitle: searchResult[i].jobTitle,
							company: searchResult[i].company};
				$scope.results.push(obj);
			}
			
			console.log("In dataService promise function after cpy: " + JSON.stringify(searchResult));
			console.log("In dataService promise function after cpy: " + JSON.stringify($scope.results));
			
		});
		
		//changing the temp value right under the search criteria for testing purpose....
		var newData = {id:$scope.testData.length, "name":"Ash","jobTitle":"President","company":"SWE"};
		$scope.testData.push(newData);
		console.log("In handleSubmit : " + JSON.stringify(temp));
	}
		
	
});