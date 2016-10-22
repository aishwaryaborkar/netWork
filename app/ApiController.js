var express = require('express');
var router = express.Router();
var serviceFulfiller = require('./services/ServiceFulFiller');
 
// routes
router.get('/testService', testService);
 
module.exports = router;
 
function testService(req, res) {
	console.log("IN TESTSERVICE CALL");
	var data = [{
				name:"Stacy Wong",
				jobTitle:"Software Engineer",
				company:"net[work]"
			},
			{
				name:"Ash Borkar",
				jobTitle:"Software Developer",
				company:"Visa"
			}];
	res.status(200).json(data);
	
    /*serviceFulfiller.testService()
        .then(function () {
            res.sendStatus(200);
			
        })
        .catch(function (err) {
            res.status(400).send(err);
        });*/
}