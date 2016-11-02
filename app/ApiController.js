var express = require('express');
var router = express.Router();
var serviceFulfiller = require('./services/ServiceFulfiller');
 
// routes


//===========================================
//TESTING SERVICE FUNCTIONS TO BE DELETED....
//===========================================

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
 
 
//===========================================
//LOGIN or REGISTRATION RELATED SERVICES.....
//===========================================
router.post('/login', function(req, res){
	console.log("login service requested : " + req.body.email);
	console.log("login service requested : " + req.body.password);

	//hardcoded account access for dev/test only will be removed
	if(req.body.email === "admin" && req.body.password === "password"){
		data = {message:"OK"};
		res.status(200).json(data);
	}
	
	serviceFulfiller.checkLoginCredential(req.body)
		.then(
		function(result){
			console.log("in promise in apiController");
			if(result.length == 0){
				console.log("no result");
				data = {error:"Error. Login Failed"};
				res.status(200).json(data);
			}
			
			if(result[0].email == req.body.email && result[0].password == req.body.password){
				data = {message:"OK"};
			}		
			res.status(200).json(data);
		},
		function(result){
			console.log(JSON.stringify(result));
			
		});
});
 
 
 
module.exports = router;
 


