angular.module('SearchController', ['DataService']).controller('SearchController', function($scope, $http, dataService) {	
	var vm = this;
	
	this.results = [{"name":"JC","jobTitle":"Software Consultant","company":"Thomson Reuters"}];
	$scope.results = [{"name":"JC","jobTitle":"Software Consultant","company":"Thomson Reuters"}];
    this.handleSubmit = function() {
        dataService.testService().then(function (searchResult) {
           vm.results = searchResult; 
        });
		angular.copy(this.results, $scope.results);
    }
	
	/*vm.handleSubmit = function(){
        $http.get('/api/testService').then(function (res){
            vm.results = res.data;
            console.log(JSON.stringify(res.data));
        }, function (err){
            console.log(err);
        })
    };*/
});