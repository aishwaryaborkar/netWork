angular.module('SearchController', ['DataService']).controller('SearchController', function($scope, $rootScope, $http, dataService) {

	$scope.results = [];
	$scope.email = '';
	$scope.name = '';
    $scope.company = '';
    $scope.jobtitle = '';
    $scope.skill = '';
    $scope.schoolName = '';
    $scope.graduationDate = '';
    $scope.description = '';
    $scope.mysearch = '';


    $scope.clearFields = function() {
    	$scope.email = '';
        $scope.name = '';
        $scope.company = '';
        $scope.jobtitle = '';
        $scope.skill = '';
    	$scope.schoolName = '';
   		$scope.graduationDate = '';
    	$scope.description = '';
        $scope.mysearch = '';
		$scope.results = [];
	};
	

	function myFunction() {
    	document.getElementById("myDropdown").classList.toggle("show");
	}
	
	
	function isEmpty( obj ) {
		console.log("in isEmpty()");
		for ( var prop in obj ) { 
			if ( obj[prop] !== "" && obj.hasOwnProperty( prop )) { return false; }
		}
		return true;
	}
	

	
    $scope.handleSubmit = function() {
		//compile info into an searchObject for api
		var searchCriteria = {};
		searchCriteria.email = $scope.email;
		searchCriteria.name = $scope.name;
		searchCriteria.company = $scope.company;
		searchCriteria.jobTitle = $scope.jobtitle;
		searchCriteria.skill = $scope.skill;
		searchCriteria.schoolName = $scope.schoolName;
		searchCriteria.graduationDate = $scope.graduationDate;
		searchCriteria.description = $scope.description;
		
		if(isEmpty(searchCriteria)){
			$scope.error = "search fields cannot be left empty";
			alert("cannot leave fields empty");
		}else{
			dataService.performSearch(searchCriteria).then(function(data){
				if ((data.resultList).length == 0) {
					$scope.mysearch = 'No Matches Found';
				} else {
					$scope.mysearch = 'Search Results: ' + (data.resultList).length;
				}
				
				$scope.results = [];			
				var i = 0;
				for (i = 0; i < (data.resultList).length ;i++) {
					var obj = { id: data.resultList[i].id,
								name: data.resultList[i].name,
								jobTitle: data.resultList[i].jobTitle,
								company: data.resultList[i].company};
					$scope.results.push(obj);
				}
			});
		}
	}
});