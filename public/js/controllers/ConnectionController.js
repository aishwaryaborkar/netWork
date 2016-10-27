angular.module('ConnectionController', []).controller('ConnectionController', function($scope) {
 $scope.heading = "Friends";
 
 $scope.sendRequest = function(){
	 
 }
 
 
 var queryResult=
		[{
			name:"Tom Lee",
			jobTitle:"Software Engineer",
			Company:"Cisco"
		},
		{
			img: "./images/connection/man1.png",
			name:"William John",
			jobTitle:"Software Consultant",
			Company:"Ebay"
		},
		{
			name:"Tina Parker",
			jobTitle:"Software Developer",
			Company:"Amazon"
		}];
 $scope.pendingConnections=queryResult;
 
 
 
 
 var connectionResult=
		[{
			name:"Stacy Wong",
			jobTitle:"Software Engineer",
			Company:"net[work]"
		},
		{
			name:"Jonathan Chen",
			jobTitle:"Software Consultant",
			Company:"Thomson Reuters"
		},
		{
			name:"Ash Borkar",
			jobTitle:"Software Developer",
			Company:"Visa"
		}];
$scope.connections=connectionResult;
 
});