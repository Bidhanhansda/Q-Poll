const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
    ID:{
        type:String,
        
    }
})


const PollSchema = new mongoose.Schema({
question:{
    type:String,
    required:[true, "cannot be blank"]
},
option1:{
    type:String,
    required:[true, "cannot be blank"]
},
option2:{
    type:String,
    required:[true, "cannot be blank"]
},
option3:{
    type:String,
    required:[true, "cannot be blank"]
},
option4:{
    type:String,
    required:[true, "cannot be blank"]
},
vote1:[VoterSchema],
vote2:[VoterSchema],
vote3:[VoterSchema],
vote4:[VoterSchema],
totalVote:[VoterSchema],
sender:Object,
from:Object,
socketid:String,
time:String,
date:String,
to:String,
})

const Poll = mongoose.model("Poll",PollSchema);

module.exports = Poll;