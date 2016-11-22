var mongoose = require('mongoose');

module.exports = mongoose.Schema( 
	{	
        fromUserId: String,
        toUserName: String,
        msgContent: String,
        time      : { type: Date, default: Date.now }    
	}
);