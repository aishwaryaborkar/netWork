var mongoose = require('mongoose');

module.exports = mongoose.Schema(  
	{
		title : String,
		forumOwner : String,
		date : String,
		description : String,
		comments : [{ commentOwner : String,
					  date : String,
					  description : String,
					  reply : [{ replyOwner : String,
								 date : String,
								 description : String}]
					}]
	}
);
