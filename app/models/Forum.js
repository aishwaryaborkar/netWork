var mongoose = require('mongoose');

module.exports = mongoose.Schema(  
	{
		title : String,
		ownerId : String,
		forumOwnerName : String,
		date : String,
		description : String,
		comments: [{ ownerId : String,
					 commentOwnerName : String,
					  date : String,
					  description : String,
					  reply : [{ ownerId : String,
								 replyOwnerName : String,
								 date : String,
								 description : String}]
					}]
	}
);
