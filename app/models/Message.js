var mongoose = require('mongoose');

module.exports = mongoose.Schema( 
	{
		participant : [{ _id : String,
						 name: String}],
		messageBody : [{ name : String,
						 text : String,
						 date : String}]
	}
);
