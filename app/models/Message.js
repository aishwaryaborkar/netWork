var mongoose = require('mongoose');

module.exports = mongoose.Schema( 
	{
		participant : [{ _id : String}],
		messageBody : [{ _id : String, text : String, date : String}]
	}
);
