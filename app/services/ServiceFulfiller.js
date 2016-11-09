var service = {};

service.resultSet = []; 
 
//account related service
service.checkLoginCredential = checkLoginCredential;
service.createAccount = createAccount;

//profile related service
service.createProfile = createProfile;
service.getProfileById = getProfileById;
service.getProfileList = getProfileList;
service.updateProfileInfo = updateProfileInfo;
service.getBothConnections = getBothConnections;
service.getConnection = getConnection;
service.removeConnection = removeConnection;
service.getPendingConnection = getPendingConnection;
service.approveConnection = approveConnection;
service.declineConnection = declineConnection;
service.performUserSearch = performUserSearch;
service.performProfileSearch = performProfileSearch;
 
//forum related service
service.getForumList = getForumList;
service.getForumById = getForumById;
service.createForumPost = createForumPost;

//message related service
 
 
//to be deleted testService calls 
service.testForumService = testForumService;
service.testConnectionService = testConnectionService;
service.testPendingConnectionService = testPendingConnectionService;
service.testProfileService = testProfileService;
service.testMessageService = testMessageService;
 
module.exports = service;


/* CREATING USER ACCOUNT -> THEN CREATE PROFILE (REGISTRATION PROCESS)
var profileSchema = require('./app/models/Profile.js');
var personProfile = mongoose.model('Profile', profileSchema);

var userSchema = require('./app/models/User.js');
var user = mongoose.model('User', userSchema);
			
var createUser = new user({
				email : "admin",
				password : "password"
			});			
createUser.save(function (err, createUser) {
  if (err) 
	  return console.error(err);
  else
	  return console.log("INSERTED DATA INTO DB");
});

user.find({email: /admin/}, function(err, result){
	console.log(result);
	var createProfile = new personProfile({
				_id : result[0]._id,
				name : "admin",
				jobTitle : "admin",
				company : "net[Work]",
				summary : ".",
				education : ".",
				experience : [],
				skills : []
			});
	createProfile.save(function (err, createProfile) {
		if (err) 
			return console.error(err);
		else
			return console.log("INSERTED DATA INTO DB");			

	});
});

ABOVE ARE SAMPLES ON BASIC DB INSERTION, first get a document schema using predefine JSON in each model js file.
base on the schema, create an object and pass in the correct value for each field.
save the object into db
*/





var mongoose = require('mongoose');
var db = mongoose.connection;

var userSchema = require('../models/User.js');
var user = mongoose.model('Users', userSchema);

var profileSchema = require('../models/Profile.js');
var profile = mongoose.model('Profiles', profileSchema);

var forumSchema = require('../models/Forum.js');
var forum = mongoose.model('Forums', forumSchema);

var messageSchema = require('../models/Message.js');



//===========================================
//ACCOUNT RELATED SERVICES.....
//===========================================
function createAccount(accountInfo){
	//var user = mongoose.model('Users', userSchema);
	var newUser = new user({
		email : accountInfo.email,
		password : accountInfo.password,
		premium : accountInfo.premium
	});
	
	newUser.save(function(err, result){
		if(err) return console.error(err);
		return console.log(result);
	});
	
	return user.findOne({email: accountInfo.email},function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

function checkLoginCredential(loginInfo){
	var data = JSON.stringify(loginInfo);
	console.log("IN CHECK LOGIN CREDENTIAL : " + data);
	//var user = mongoose.model('Users', userSchema);
	return user.findOne({email: loginInfo.email, password: loginInfo.password}, '_id premium',function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

//===========================================
//PROFILE RELATED SERVICES...................
//===========================================
function testProfileService(){
	return 	{
				name : "Ash Borkar",
				jobTitle : "Project Manager",
				company : "net[Work]",
				summary : "HI!",
				education : "SJSU Class of 2017",
				experience : [{jobTitle : "President", company : "SWE", responsibility : "BE THE BOSS"},
							  {jobTitle : "Intern", company : "Visa", responsibility : "anything and everything"}],
				skills : [{skillName : "Java", skillLevel : 100},
						  {skillname : "Angular", skillLevel : 50}]
			}
}

function testConnectionService(){
		return [{id: 1,name:"JC v1",jobTitle:"Software Consultant",company:"Thomson Reuters"},
				{id: 2,name:"Stacy Wong",jobTitle:"Software Engineer",company:"net[work]"}];
}

function testPendingConnectionService(){
		return [{id: 3,name:"Ash Borkar",jobTitle:"Software Developer",company:"Visa"}];
}

function createProfile(reqData, userId){
	console.log("IN createProfile service: "  + reqData.name + "," + userId);
	//var profile = mongoose.model('Profiles', profileSchema);
	var newProfile = new profile({
				_id : userId,
				name : reqData.name,
				jobTitle : "",
				company : "",
				summary : "",
				education : [],
				experience : [],
				skills : []
			});
	return newProfile.save(function (err, result) {
		if (err) return console.error(err);
		return console.log(result);			
	});
}

function getProfileById(userId){
	console.log("IN getProfileById : " + userId);
	return profile.findById(userId, function(err, result){
		if(err) return console.error(err);
		console.log(result);		
		return result;
	});
}

function getProfileList(userIds){
	console.log("IN getProfileList : " + userIds);
	return profile.find({_id: {$in:userIds}},'_id name jobTitle company', function(err, result){
		if(err) return console.error(err)
		console.log(result);
	});
}

function updateProfileInfo(basicProfile){
	var data = JSON.stringify(basicProfile);
	console.log("IN updateBasicProfile: " + data);

	var query = {_id:basicProfile.userId};
	delete basicProfile.userId;
	profile.update(query, {$set: basicProfile}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});
	return Promise.resolve({message:"OK"});
}

function getBothConnections(userId){
	console.log("IN getConnection : " + JSON.stringify(userId));
	return profile.findById(userId,'connections pendingConnections', function(err, result){
		if(err) return console.error(err);
		console.log(result.connections);
	});
}

function getConnection(userId){
	console.log("IN getConnection : " + JSON.stringify(userId));
	return profile.findById(userId,'connections', function(err, result){
		if(err) return console.error(err);
		console.log(result.connections);
	});
}

function removeConnection(userId, connectionList, connectionId){
	console.log("IN removeConnection : " + connectionList + " : " + connectionId);
	
	var query = { _id : userId}
	var newConnectionsList = connectionList.filter(function(element){
		return element != connectionId;
	});

	var newData = {connections : newConnectionsList};
	profile.update(query, {$set : newData}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});

	return Promise.resolve(newConnectionsList);
}
	

function getPendingConnection(userId){
	console.log("IN getPendingConnection : " + JSON.stringify(userId));
	var profile = mongoose.model('Profiles', profileSchema);
	return profile.findById(userId,'pendingConnections', function(err, result){
		if(err) return console.error(err);
		console.log(result);
	});
}

function approveConnection(userId, connectionLists, connectionId){
	console.log("IN approveConnection : " + connectionLists + " : " + connectionId);
	
	var connections = connectionLists.connections;
	var pendingConnections = connectionLists.pendingConnections;
	
	console.log("connections " + connections + ":: pendingConnections " + pendingConnections );
	
	var query = { _id : userId}
	
	var newPendingConnections = pendingConnections.filter(function(element){
		return element != connectionId;
	});
	
	connections.push(connectionId);

	var newData = {connections : connections, pendingConnections : newPendingConnections};
	profile.update(query, {$set : newData}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});
	
	

	return Promise.resolve(newPendingConnections);	
}

function declineConnection(userId, connectionList, connectionId){
	console.log("IN declineConnection : " + connectionList + " : " + connectionId);
	
	var query = { _id : userId}
	var newConnectionsList = connectionList.filter(function(element){
		return element != connectionId;
	});

	var newData = {pendingConnections : newConnectionsList};
	profile.update(query, {$set : newData}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});

	return Promise.resolve(newConnectionsList);
}

function performUserSearch(searchInfo){
	var user = mongoose.model('Users', userSchema);
	return user.findOne({email: searchInfo},function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

function performProfileSearch(searchInfo){
	var data = JSON.stringify(searchInfo);
	console.log("IN PERFORMPROFILESEARCH : " + data);
	
	var searchObj = {};
	Object.keys(searchInfo).forEach(function(key, index){
		if(searchInfo[key] !== ''){
			searchObj[key] = new RegExp(searchInfo[key], "g");
		}
	}); //so far it only works for normal properties. skills and experience currently not working
	var profile = mongoose.model('Profiles', profileSchema);
	return profile.find(searchObj, function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

//===========================================
//FORUM RELATED SERVICES.....................
//===========================================
function getForumList(){
	console.log("IN getForumList : requesting data from DB");
	var forum = mongoose.model('Forums', forumSchema);
	return forum.find( {}, '_id title forumOwnerId forumOwnerName date description',function(err, result){
		if(err) return console.error(err);
		console.log(result);		
		return result;
	});	
}

function getForumById(forumId){
	console.log("IN getForumById : " + forumId);
	var forum = mongoose.model('Forums', forumSchema);
	return forum.findById(forumId, function(err, result){
		if(err) return console.error(err);
		console.log(result);		
		return result;
	});	
}

function createForumPost(forumData){
	console.log("IN createForumPost : " + forumData);
	
	//create the forum object`
	var createForum = new forum(forumData);
	
	//saving the forum object
	return createForum.save(function (err, createForum) {
		if (err) 
			return console.error(err);
		else
			return {message:"OK"};
	});
}

function testForumService(){
	return [{title: "LinkedIn or LinkedOut?", 
				ownerName: "Stacy Wong", //58123f3d1cdd73d423e93971
				date: "July 27, 2016", 
				description:"Default content",
				comments : [{ ownerName : "JC",
								date : "October 26, 2016",
								description : "#1troll strikes with some spams",
								reply : [{ replyOnwer : "Stacy Wong",
											date : "October 26, 2016",
											description : "OMG..."}]},
							{ ownerName : "JC",
								date : "October 26, 2016",
								description : "some more spams",
								reply : [{ replyOnwer : "Stacy Wong",
											date : "October 26, 2016",
											description : "STAHP"}]},
							{ ownerName : "JC",
								date : "October 26, 2016",
								description : "and a bit more than some more spams"}]}, 
			{title: "MEAN Stack, Play Nice", 
				ownerName: "Jonathan Chen", 
				date: "August 18, 2016", 
				description:"Default content"}, 
			{title: "My Reaction to React.js", 
				ownerName: "Aishwarya Borkar", 
				date: "October 5, 2016", 
				description:"Default content"}, 
			{
				title: "Big Data, Big Problems", 
				ownerName: "Anna Meng", 
				date: "October 12, 2016", 
				description:"Default content"}]; 
}

//===========================================
//MESSAGE RELATED SERVICES...................
//===========================================
function testMessageService(){
	return [{participant : [{ _id : '581b810b2376ffc83959ec11',
								 name: 'admin'},
								 { _id : '58159b516d7744982fb036d4',
								 name: 'JC'}],
			  messageBody : [{ Name : 'admin',
								 text : 'Hello World...',
								 date : 'Nov 3, 2016 11:07:00 PM'},
								{Name : 'admin',
								 text : '...?',
								 date : 'Nov 3, 2016 11:08:00 PM'}]
			},
			{participant : [{ _id : '581b810b2376ffc83959ec11',
								 name: 'admin'},
								 { _id : '58123f3d1cdd73d423e93971',
								 name: 'Stacy'}],
			 messageBody : [{ Name : 'Stacy',
								 text : 'TEEMO!',
								 date : 'Nov 2, 2016 11:09:00 AM'},
								{Name : 'admin',
								 text : 'wrong person!',
								 date : 'Nov 2, 2016 11:10:00 AM'}]
			}]
}