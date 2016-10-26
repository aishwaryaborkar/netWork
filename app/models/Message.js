var mongoose = require('mongoose');

module.exports = mongoose.model('Message', 
	{
		participant : [{ _id : String}]
		messageBody : [{ _id : String, text : String, date : String}]
	}
});
