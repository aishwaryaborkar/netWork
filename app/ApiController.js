var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var serviceFulfiller = require('./services/ServiceFulfiller');
var pathExists = require('path-exists');
var mongoose = require('mongoose');
var chatMsgSchema = require('./models/ChatMessage.js');
var ChatMessage = mongoose.model('ChatMessage', chatMsgSchema);





//===========================================
//IMAGE UPLOAD API.....
//===========================================
router.post('/uploadProfileImage/:id', function(req, res) {
	console.log(req);
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/profileImage/' + req.params.id + '.png');
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

router.get('/userImage/:id', function (req, res) {
	var profileDir = __dirname.concat('/profileImage/').concat(req.params.id).concat('.png');
	var defaultDir = __dirname.concat('/profileImage/').concat('default').concat('.png');
	var path = require('path'); 

	if(pathExists.sync(profileDir)){
		res.sendfile(path.resolve(profileDir));
	}else{
		res.sendfile(path.resolve(defaultDir));
	} 
    
}); 


 
//===========================================
//LOGIN or REGISTRATION RELATED SERVICES.....
//===========================================
router.post('/login', function(req, res){
	console.log("login service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.checkLoginCredential(req.body).then(
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

router.post('/validateEmail', function(req, res){
	console.log("validateEmail service requested: " + JSON.stringify(req.body));
	serviceFulfiller.validateEmail(req.body).then( function(result){
		if(result === null){
			res.status(200).json({message:"OK"});
		}else{
			res.status(200).json({error: "Email already in use"});
		}
	});
});

router.post('/getAccount', function(req, res){
	console.log("validateEmail service requested: " + JSON.stringify(req.body));
	serviceFulfiller.getAccount(req.body).then( function(result){
		if(result !== null){
			res.status(200).json(result);
		}else{
			res.status(200).json({error: "Account Does Not Exist..."});
		}
	});
});

router.post('/resetPassword', function(req, res){
	console.log("resetPassword service requested: " + JSON.stringify(req.body));
	
	serviceFulfiller.checkSecurityAnswer(req.body).then(function(result){
		if(result == null){
			res.status(200).json({error: "Wrong Security Answer.."});
		}
		serviceFulfiller.resetPassword(req.body).then( function(result){
			res.status(200).json(result);
		});
		
	})
	
});

router.post('/createAccount', function(req, res){
	console.log("createAccount service requested: " + JSON.stringify(req.body));
	serviceFulfiller.createAccount(req.body).then( function(accountResult){ 
		// finished with creatingAccount, will need to createProfile
		serviceFulfiller.createProfile(req.body, accountResult._id).then(function(profileResult){
			res.status(200).json({message:"OK"});
			})
		})
	

});
 
//===========================================
//PROFILE RELATED SERVICES.....
//===========================================
router.post('/getProfileById', function(req, res){
	console.log("getProfileById service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.getProfileById(req.body.userId).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

router.post('/updateProfileInfo', function(req, res){
	console.log("updateProfileInfo service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.updateProfileInfo(req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

router.post('/getConnection', function(req, res){
	console.log("getConnections service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.getConnection(req.body.userId).then(function(result){
		serviceFulfiller.getProfileList(result.connections).then(function(data){
			res.status(200).json(data);
			});
			
		},
		function(result){
			console.log(JSON.stringify(result));
	});
});

router.post('/removeConnection' , function(req, res){
	console.log("removeConnection service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.getConnection(req.body.userId).then(function(userConnection){
		serviceFulfiller.removeConnection(req.body.userId, userConnection.connections, req.body.connectionId).then(function(connectionList){		
			serviceFulfiller.getProfileList(connectionList).then(function(data){
				res.status(200).json(data);
				});
		})
	});
});


router.post('/getPendingConnection', function(req, res){
	console.log("getPendingConnections service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.getPendingConnection(req.body.userId).then(function(result){
		serviceFulfiller.getProfileList(result.pendingConnections).then(function(data){
			res.status(200).json(data);
			});
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

router.post('/approveConnection' , function(req, res){
	console.log("approveConnection service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.getBothConnections(req.body.userId).then(function(userConnection){
		serviceFulfiller.approveConnection(req.body.userId, userConnection, req.body.connectionId).then(function(connectionList){		
			serviceFulfiller.getProfileList(connectionList).then(function(data){
				res.status(200).json(data);
				});
		})
	});
});


router.post('/declineConnection' , function(req, res){
	console.log("declineConnection service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.getPendingConnection(req.body.userId).then(function(userConnection){
		serviceFulfiller.declineConnection(req.body.userId, userConnection.pendingConnections, req.body.connectionId).then(function(connectionList){		
			serviceFulfiller.getProfileList(connectionList).then(function(data){
				res.status(200).json(data);
				});
		})
	});
});

router.post('/requestConnection', function(req, res){
	console.log("requestConnection service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.getPendingConnection(req.body.connectionId).then(function(userConnection){
		serviceFulfiller.addConnection(req.body.userId, userConnection.pendingConnections, req.body.connectionId).then(function(data){		
			res.status(200).json(data);
		})
	});
});

router.post('/search', function(req, res){
	console.log("search service requested : " + JSON.stringify(req.body));
	
	if((req.body).hasOwnProperty("email")){	
		serviceFulfiller.performUserSearch(req.body).then(function(result){
			serviceFulfiller.getProfileById(result._id).then(function(result){
				var data = {};
				if(result.length == 0){
					data.message = "No Search Result";
				}else{
					data.message = "OK";
				}	
					data.resultList = [result];
				res.status(200).json(data);
			});
		},
		function(err){
			console.error(err);
		});
	}else{
		
		var skillQuery = req.body.skills;
		delete req.body.skills;
		var educationQuery = req.body.education;
		delete req.body.education;
		
		serviceFulfiller.performProfileSearch(req.body).then(function(result){
		
			//basic search is done....
			if(skillQuery == undefined && educationQuery == undefined){
				var data = {};
				if(result.length == 0){
					data.message = "No Search Result";
				}else{
					data.message = "OK";
				}	
				data.resultList = result;
				res.status(200).json(data);
			}else{
				//premium filtering service requested
				console.log("performing premium filter");
				
				var finalResult = result;
				//perform filter by education
				if(educationQuery != undefined){
					console.log("check education query");
					finalResult = finalResult.filter(function(profileObj){
						var keepData = false;
						var profileEdu = profileObj.education
						var numHits = 0;
						profileEdu.forEach(function(eduEntry){	
							educationQuery.forEach(function(edu){		
								if(eduEntry.schoolName.toLowerCase() == edu.schoolName.toLowerCase()){
										numHits++
									} 
							})
							//if all skills input matches, then we keep data
							if(educationQuery.length == numHits){
								keepData = true;
							}
						})
						return keepData;
					});
				}
				
				if(skillQuery != undefined){
				//have skill query
					finalResult = finalResult.filter(function(profileObj){
						var keepData = false;
						var profileSkills = profileObj.skills
						var numHits = 0;
						console.log(profileSkills);
						profileSkills.forEach(function(skillEntry){	
							skillQuery.forEach(function(skill){	
								console.log(skillEntry.skillName + "<::>" + skill.skillName);
								console.log(skillEntry.skillLevel + "<::>" + skill.skillLevel);
								if(skillEntry.skillName.toLowerCase() == skill.skillName.toLowerCase() && 
									skillEntry.skillLevel >= skill.skillLevel){
										numHits++
									} 
							})
							console.log(numHits);
							//if all skills input matches, then we keep data
							if(skillQuery.length == numHits){
								keepData = true;
							}
						})
						return keepData;
					});
				}	
				var data = {};
				if(finalResult.length == 0){
					data.message = "No Search Result";
				}else{
					data.message = "OK";
				}	
				data.resultList = finalResult;
				res.status(200).json(data);
			}
		},
		function(result){
			console.log(JSON.stringify(result));
		});
	}
});

//===========================================
//FORUM RELATED SERVICES.....
//===========================================
router.get('/getForumList/:ownerId?', function(req, res){
	console.log("forum service requested : request for forum list");	
	serviceFulfiller.getForumList(req.params.ownerId).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
}); 

router.post('/getForumById', function(req, res){
	console.log("getForumById service requested : " + JSON.stringify(req.body));
	
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
	console.log("createForum service requested" + JSON.stringify(req.body));
	serviceFulfiller.getNameById(req.body.ownerId).then(function(userName){
		var newForum = req.body;
		newForum.forumOwnerName = userName.name;
		serviceFulfiller.createForumPost(newForum).then(
			function(result){
				res.status(200).json(result);
			},
			function(result){
				console.log(JSON.stringify(result));
		});	
	});
});

router.post('/updateForum', function(req, res){
	console.log("updateForum service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.updateForum(req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});



//===========================================
//MESSAGE RELATED SERVICE....
//===========================================

router.post("/saveChatMessage/", function (req, res) {
	var chatMsg = new ChatMessage({
		fromUserId: req.body.id,
		toUserName: req.body.name,
		msgContent: req.body.content,
	});
	chatMsg.save(function (error, result) {
		if (error)
			return res.status(400).json(error);
		else {
			console.log("/saveChatMessage/", JSON.stringify(result));
			return res.status(200).json(JSON.stringify(result));
		}
	});
});

router.get("/getAllChatMessage", function (req, res) {
	ChatMessage.find({}, function (err, result) {
		if (err)
			return res.status(400).json(err);
		else
			return res.status(200).json(result);
	});
});

router.post("/getHistoryChatMsg", function (req, res) {
	var fronUserId = req.body.fromUserId;
	var toUserName = req.body.toUserName;
	console.log("getHistoryChatMsg: fromUserId = %s, toUserName = %s", fronUserId, toUserName);
	ChatMessage.find({fromUserId: fronUserId, toUserName: toUserName}, function (err, result) {
		if (err)
			return res.status(400).json(err);
		else
			return res.status(200).json(result);
	});
});

router.get('/listUsers', function(req, res){
	var id = req.query.id;
	console.log(req.query.id);
	console.log('list user ' + id);
	serviceFulfiller.getAllUsers(id, function(result) {
		console.log('list users in listusers');
		console.log(result);
		/*
	    var data = [];
	    data = result;
	    
		if(result.length == 0){
			data.push({
				name: 'jack'
			});
		} else {
            data = result;
		}	*/
		res.status(200).json(result);
	},
	function(result){
		console.log(JSON.stringify(result));
	});
});

module.exports = router;
 


