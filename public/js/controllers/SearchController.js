angular.module('SearchController', []).controller('SearchController', function($scope) {

	var queryResult=
		[{
			name:"Stacy Wong",
			jobTitle:"Software Engineer",
			company:"net[work]"
		},
		{
			name:"Ash Borkar",
			jobTitle:"Software Developer",
			Company:"Visa"
		}];

	$scope.results = queryResult;
});