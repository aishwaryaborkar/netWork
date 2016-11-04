var express = require('express');
var router = express.Router();
var serviceFulfiller = require('./services/ServiceFulfiller');

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

router.get('/testMessageService', function(req, res){
	console.log("in testMessageService call");
	var data = serviceFulfiller.testMessageService();		
	res.status(200).json(data);
}); 
 
//===========================================
//LOGIN or REGISTRATION RELATED SERVICES.....
//===========================================
router.post('/login', function(req, res){
	console.log("login service requested : " + req.body.email);
	console.log("login service requested : " + req.body.password);
	
	serviceFulfiller.checkLoginCredential(req.body)
		.then(
		function(result){
			var data = {};
			console.log("in promise in apiController");
			if(result === null){
				console.log("no result");
				data.error = "Error. Login Failed";
				res.status(200).json(data);
			}
			data.message = "OK";
			data.userInfo = result;
			res.status(200).json(data);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});
 
//===========================================
//PROFILE RELATED SERVICES.....
//===========================================
router.post('/getProfileById', function(req, res){
	console.log("getProfileById service requested : " + req.body);
	
	serviceFulfiller.getProfileById(req.body._id).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

router.post('/search', function(req, res){
	console.log("search service requested : " + JSON.stringify(req.body));
	serviceFulfiller.performSearch(req.body)
		.then(
		function(result){
			var data = {};
			if(result.length == 0){
				data.message = "No Search Result";
			}else{
				data.message = "OK";
			}	
			
			data.resultList = result;
			res.status(200).json(data);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

//===========================================
//FORUM RELATED SERVICES.....
//===========================================
router.get('/getForumList', function(req, res){
	console.log("forum service requested : request for forum list");
	
	serviceFulfiller.getForumList().then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
}); 

router.post('/getForumById', function(req, res){
	console.log("getForumById service requested : " + req.body);
	
	serviceFulfiller.getForumById(req.body._id).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
}); 

router.get('/getPopularForum', function(req,res){
	console.log("getPopularPost service requested");
}); 

router.post('/createForum', function(req, res){
	console.log("createForum service requested");
	serviceFulfiller.createForumPost(req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

module.exports = router;
 


