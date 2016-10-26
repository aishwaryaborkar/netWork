var express = require('express');
var router = express.Router();
var serviceFulfiller = require('./services/ServiceFulfiller');
 
// routes
router.get('/testService', testService);
 
module.exports = router;
 
function testService(req, res) {
	console.log("IN TEST SERVICE CALL");
	
	var data = serviceFulfiller.testService();		
	res.status(200).json(data);
	
    serviceFulfiller.testService()
        .then(function(data) {
            res.sendStatus(200).json(data);
			
        })
        .catch(function (err) {
            res.status(400).send(err);
    });
}