angular.module('ConnectionController', []).controller('ConnectionController', function($scope,$rootScope, $location, $http, dataService) {
 $scope.heading = "Friends";
 
 $scope.sendRequest = function(){	 
 }
 

 
 $scope.req={}

 dataService.getPendingConnection(sessionStorage.getItem('userId')).then( function(pendingConnections){
	    
	    $scope.queryResult = [];
	    
	    
	    console.log("In dataService promise function before: " + pendingConnections);
	    
	    var i = 0;
	    for (i = 0; i < pendingConnections.length ;i++) {
	        var obj = { _id: pendingConnections[i]._id,
	                    name: pendingConnections[i].name,
	                    jobTitle: pendingConnections[i].jobTitle,
	                    company:pendingConnections[i].company};
	        $scope.queryResult.push(obj);
	    }
	});
 
 //approveConnection
 
 $scope.approveConnection = function(connection) {
	    
	 	console.log(connection);

	 	dataService.approveConnection(sessionStorage.getItem('userId'), connection._id).then( function(updatedRequests){
	 		console.log(updatedRequests);

	 		$scope.queryResult = [];
	 	   
	 	    var i = 0;
	 	    for (i = 0; i < updatedRequests.length ;i++) {
	 	        var obj = { _id: updatedRequests[i]._id,
	 	                    name: updatedRequests[i].name,
	 	                    jobTitle: updatedRequests[i].jobTitle,
	 	                    company: updatedRequests[i].company};
	 	        $scope.queryResult.push(obj);
	 	    }		 		
	 	});
	    dataService.approveConnection(connection._id, sessionStorage.getItem('userId')); 
	 };
	 
//approve connection ends here
 

	 
	 
//declineConnection
	 
   $scope.declineConnection = function(connection) {
		    
		 	console.log(connection);

		 	dataService.declineConnection(sessionStorage.getItem('userId'), connection._id).then( function(requestList){
		 		console.log(requestList);

		 		$scope.queryResult = [];
		 	   
		 	    var i = 0;
		 	    for (i = 0; i < requestList.length ;i++) {
		 	        var obj = { _id: requestList[i]._id,
		 	                    name: requestList[i].name,
		 	                    jobTitle:requestList[i].jobTitle,
		 	                    company: requestList[i].company};
		 	        $scope.queryResult.push(obj);
		 	    }	
		 		
		 		
		 		
		 	});
		     
	};
		 
//decline connection ends here
	 
	 
	 
	 
	 
 
 
 $scope.search = {}
 $scope.searchBy = '$'
	dataService.getConnection(sessionStorage.getItem('userId')).then( function(connections){
    
    $scope.connectionResult = [];
    
     
    
    console.log("In dataService promise function before: " + connections);
    
    var i = 0;
    for (i = 0; i < connections.length ;i++) {
        var obj = { _id: connections[i]._id,
                    name: connections[i].name,
                    jobTitle: connections[i].jobTitle,
                    company:connections[i].company};
        $scope.connectionResult.push(obj);
    }
});

 //view profile
	$scope.visitProfile = function(connection){
		console.log(connection._id);
		$location.path('/viewprofile/' + connection._id);
	}

 
 
 //remove connection
 $scope.removeConnection = function(connection) {
	    
 	console.log(connection);

 	dataService.removeConnection(sessionStorage.getItem('userId'), connection._id).then( function(updatedList){
 		console.log(updatedList);

 	    $scope.connectionResult = [];
 	   
 	    var i = 0;
 	    for (i = 0; i < updatedList.length ;i++) {
 	        var obj = { _id: updatedList[i]._id,
 	                    name: updatedList[i].name,
 	                    jobTitle: updatedList[i].jobTitle,
 	                    company: updatedList[i].company};
 	        $scope.connectionResult.push(obj);
 	    }	
 		
 		
 		
 	});
 	dataService.removeConnection(connection._id, sessionStorage.getItem('userId'));
 	
 };
 
 






 
});