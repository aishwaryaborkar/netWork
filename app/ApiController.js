var express = require('express');
var router = express.Router();
var serviceFulfiller = require('./services/ServiceFulfiller');
 
// routes

router.get('/testService', function(req, res) {
	console.log("in testService call");
	var data = serviceFulfiller.testService();		
	res.status(200).json(data);
});

router.get('/testForumService', function(req, res) {
	console.log("in testForumService call");
	var data = serviceFulfiller.testForumService();		
	res.status(200).json(data);
});

router.get('/testConnectionService', function(req, res){
	console.log("in testConnectionService call");
	var data = serviceFulfiller.testConnectionService();		
	res.status(200).json(data);
});

router.get('/testPendingConnectionService', function(req, res){
	console.log("in testPendingConnectionService call");
	var data = serviceFulfiller.testPendingConnectionService();		
	res.status(200).json(data);
});

router.get('/testProfileService', function(req, res){
	console.log("in testProfileService call");
	var data = serviceFulfiller.testProfileService();		
	res.status(200).json(data);
});
 
module.exports = router;
 


