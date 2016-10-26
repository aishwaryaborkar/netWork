var mongoose = require('mongoose');

module.exports = mongoose.model('Forum', 
	{
		title : String,
		ownerName : String,
		date : String,
		description : String,
		type : String,
		comments : [{ ownerName : String,
					  date : String,
					  description : String,}]
	}
});
