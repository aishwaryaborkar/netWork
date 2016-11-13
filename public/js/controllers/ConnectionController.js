angular.module('ConnectionController', []).controller('ConnectionController', function($scope,$rootScope, $http, dataService) {
 $scope.heading = "Friends";
 
 $scope.sendRequest = function(){	 
 }
 
 
 $scope.req={}
 var queryResult=
		[{
			name:"Tom Lee",
			jobTitle:"Software Engineer",
			company:"Cisco"
		},
		{
			img: "./images/connection/man1.png",
			name:"William John",
			jobTitle:"Software Consultant",
			company:"Ebay"
		},
		{
			name:"Tina Parker",
			jobTitle:"Software Developer",
			company:"Amazon"
		}];
 $scope.queryResult;

 dataService.getPendingConnection($rootScope.userId).then( function(pendingConnections){
	    
	    $scope.queryResult = [];
	    
	    
	    console.log("In dataService promise function before: " + pendingConnections);
	    
	    var i = 0;
	    for (i = 0; i < pendingConnections.length ;i++) {
	        var obj = { id: pendingConnections[i].id,
	                    name: pendingConnections[i].name,
	                    jobTitle: pendingConnections[i].jobTitle,
	                    company:pendingConnections[i].company};
	        $scope.queryResult.push(obj);
	    }
	});
 
 
 
 
 
 $scope.search = {}
 $scope.searchBy = '$'
	 
	 
 
 var connectionResult=
     [{ 
         name:"Stacy Wong",
         jobTitle:"Software Engineer",
         company:"net[work]"
     },
     {    
         name:"Jonathan Chen",
         jobTitle:"Software Consultant",
         company:"Thomson Reuters"
     },
     {
         name:"Ash Borkar",
         jobTitle:"Software Developer",
         company:"Visa"
     }];
 	$scope.connectionResult;
 	

	dataService.getConnection($rootScope.userId).then( function(connections){
    
    $scope.connectionResult = [];
    
    // need something to show you cant have it empty   
    
    console.log("In dataService promise function before: " + connections);
    
    var i = 0;
    for (i = 0; i < connections.length ;i++) {
        var obj = { id: connections[i].id,
                    name: connections[i].name,
                    jobTitle: connections[i].jobTitle,
                    company:connections[i].company};
        $scope.connectionResult.push(obj);
    }
});








 
});