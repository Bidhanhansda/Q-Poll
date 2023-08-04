const express = require("express");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const Poll = require("./models/Poll");

const rooms = ['general', 'tech', 'finance']

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);

require("./db/connection");


const server = require("http").createServer(app);

const port = 5001;

const io = require("socket.io")(server, {
    cors: {
        origin: `${process.env.CLIENT_URL}`,
        methods: ["*"]
    }
})



app.get("/rooms", (req, res) => {
    res.json(rooms);
})






io.on("connection", (socket) => {


    socket.on("new-user", async () => {
        const members = await User.find();
        // console.log(members)
        socket.emit("new-user", members)

    })



    



    socket.on("create-poll", (userId, question, option1, option2, option3, option4, time, todayDate, auth) => {
        let newPoll = new Poll({ sender: auth, from: userId, question, option1, option2, option3, option4, time, date: todayDate })

        newPoll.save();
    })


    socket.on("getMy-poll", (data) => {

        Poll.find({ from: data }).then((poll) => {
            socket.emit("my-pole", poll);

        })
    })


    // socket.on("get-poll", () => {
    //     Poll.find().then((data) => {
    //         socket.emit("poll-data", data);

    //     })
    // })
    ///////
    socket.on("join-poll", async () => {

        let polls = await Poll.find();
        socket.emit("get-pole", polls);

    })

    //////


    socket.on("get-members", () => {
        User.find().then((data) => {
            socket.emit("members", data);

        })
    })

    socket.on("voting", async (msgId, senderId, voterId, option) => {

        let poll = await Poll.findById(msgId);
        if (poll.from === voterId) {
            let msg = "You cannot vote on your poll"
            socket.emit("cannot-vote", msg)
        } else {
            let voterExsists = poll.totalVote.some((voter) => String(voter._id) === voterId)
            
            if (voterExsists) {
                let votedOnVote1 = poll.vote1.some((voter)=> String(voter._id) === voterId)
                let votedOnVote2 = poll.vote2.some((voter)=> String(voter._id) === voterId)
                let votedOnVote3 = poll.vote3.some((voter)=> String(voter._id) === voterId)
                let votedOnVote4 = poll.vote4.some((voter)=> String(voter._id) === voterId)

                if(votedOnVote1){
                    
                    let voterIndex =  poll.vote1.map((item)=>{
                        if(String(item._id) === voterId){
                            let idx = poll.vote1.indexOf(item)
                            return idx ;
                        }
                    
                    })
                    
                    if(voterIndex !== -1){
                        poll.vote1.splice(voterIndex,1);


                        if (poll.option1 === option) {
                            poll.vote1.push(voterId);
                        } else if (poll.option2 === option) {
                            poll.vote2.push(voterId);
                        } else if (poll.option3 === option) {
                            poll.vote3.push(voterId);
                        } else if (poll.option4 === option) {
                            poll.vote4.push(voterId);
                        }
                    }

                
                }else if(votedOnVote2){
                    let voterIndex =  poll.vote2.map((item)=>{
                        if(String(item._id) === voterId){
                            let idx = poll.vote2.indexOf(item)
                            return idx ;
                        }
                    
                    })
                    if(voterIndex !== -1){
                        poll.vote2.splice(voterIndex,1);


                        if (poll.option1 === option) {
                            poll.vote1.push(voterId);
                        } else if (poll.option2 === option) {
                            poll.vote2.push(voterId);
                        } else if (poll.option3 === option) {
                            poll.vote3.push(voterId);
                        } else if (poll.option4 === option) {
                            poll.vote4.push(voterId);
                        }
                    }
                }else if(votedOnVote3){
                    let voterIndex =  poll.vote3.map((item)=>{
                        if(String(item._id) === voterId){
                            let idx = poll.vote3.indexOf(item)
                            return idx ;
                        }
                    
                    })
                    if(voterIndex !== -1){
                        poll.vote3.splice(voterIndex,1);


                        if (poll.option1 === option) {
                            poll.vote1.push(voterId);
                        } else if (poll.option2 === option) {
                            poll.vote2.push(voterId);
                        } else if (poll.option3 === option) {
                            poll.vote3.push(voterId);
                        } else if (poll.option4 === option) {
                            poll.vote4.push(voterId);
                        }
                    }
                }else if(votedOnVote4){
                    let voterIndex =  poll.vote4.map((item)=>{
                        if(String(item._id) === voterId){
                            let idx = poll.vote4.indexOf(item)
                            return idx ;
                        }
                    
                    })
                    if(voterIndex !== -1){
                        poll.vote4.splice(voterIndex,1);


                        if (poll.option1 === option) {
                            poll.vote1.push(voterId);
                        } else if (poll.option2 === option) {
                            poll.vote2.push(voterId);
                        } else if (poll.option3 === option) {
                            poll.vote3.push(voterId);
                        } else if (poll.option4 === option) {
                            poll.vote4.push(voterId);
                        }
                    }
                }



            } else {
                poll.totalVote.push(voterId)
                if (poll.option1 === option) {
                    poll.vote1.push(voterId);
                } else if (poll.option2 === option) {
                    poll.vote2.push(voterId);
                } else if (poll.option3 === option) {
                    poll.vote3.push(voterId);
                } else if (poll.option4 === option) {
                    poll.vote4.push(voterId);
                }
            }

            let voteComplete = "You have voted"
        socket.emit("voted",voteComplete)
        }

        await poll.save();
        

    })











})







server.listen(port, () => {
    console.log("server is running on port ", port)
})




///test code

// socket.on("voting", async (msgId, senderId, voterId, option) => {

//     let poll = await Poll.findById(msgId);
//     if (poll.from === voterId) {
//         let msg = "You cannot vote on your poll"
//         socket.emit("cannot-vote", msg)
//     } else {
//         let voterExsists = poll.totalVote.some((voter) => String(voter._id) === voterId)
        
//         if (voterExsists) {
//             let votedOnVote1 = poll.vote1.some((voter)=> String(voter._id) === voterId)
//             let votedOnVote2 = poll.vote2.some((voter)=> String(voter._id) === voterId)
//             let votedOnVote3 = poll.vote3.some((voter)=> String(voter._id) === voterId)
//             let votedOnVote4 = poll.vote4.some((voter)=> String(voter._id) === voterId)

//             if(votedOnVote1){
                
//                 let voterIndex =  poll.vote1.map((item)=>{
//                     if(String(item._id) === voterId){
//                         let idx = poll.vote1.indexOf(item)
//                         return idx ;
//                     }
                
//                 })
                
//                 if(voterIndex !== -1){
//                     poll.vote1.splice(voterIndex,1);


//                     if (poll.option1 === option) {
//                         poll.vote1.push(voterId);
//                     } else if (poll.option2 === option) {
//                         poll.vote2.push(voterId);
//                     } else if (poll.option3 === option) {
//                         poll.vote3.push(voterId);
//                     } else if (poll.option4 === option) {
//                         poll.vote4.push(voterId);
//                     }
//                 }

            
//             }else if(votedOnVote2){
//                 let voterIndex = poll.vote2.indexOf(voterId)
//                 if(voterIndex !== -1){
//                     pole.vote2.splice(voterIndex,1);


//                     if (poll.option1 === option) {
//                         poll.vote1.push(voterId);
//                     } else if (poll.option2 === option) {
//                         poll.vote2.push(voterId);
//                     } else if (poll.option3 === option) {
//                         poll.vote3.push(voterId);
//                     } else if (poll.option4 === option) {
//                         poll.vote4.push(voterId);
//                     }
//                 }
//             }else if(votedOnVote3){
//                 let voterIndex = poll.vote3.indexOf(voterId)
//                 if(voterIndex !== -1){
//                     pole.vote3.splice(voterIndex,1);


//                     if (poll.option1 === option) {
//                         poll.vote1.push(voterId);
//                     } else if (poll.option2 === option) {
//                         poll.vote2.push(voterId);
//                     } else if (poll.option3 === option) {
//                         poll.vote3.push(voterId);
//                     } else if (poll.option4 === option) {
//                         poll.vote4.push(voterId);
//                     }
//                 }
//             }else if(votedOnVote4){
//                 let voterIndex = poll.vote4.indexOf(voterId)
//                 if(voterIndex !== -1){
//                     pole.vote4.splice(voterIndex,1);


//                     if (poll.option1 === option) {
//                         poll.vote1.push(voterId);
//                     } else if (poll.option2 === option) {
//                         poll.vote2.push(voterId);
//                     } else if (poll.option3 === option) {
//                         poll.vote3.push(voterId);
//                     } else if (poll.option4 === option) {
//                         poll.vote4.push(voterId);
//                     }
//                 }
//             }



//         } else {
//             poll.totalVote.push(voterId)
//             if (poll.option1 === option) {
//                 poll.vote1.push(voterId);
//             } else if (poll.option2 === option) {
//                 poll.vote2.push(voterId);
//             } else if (poll.option3 === option) {
//                 poll.vote3.push(voterId);
//             } else if (poll.option4 === option) {
//                 poll.vote4.push(voterId);
//             }
//         }
//     }

//     await poll.save();
//     let voteComplete = "You have voted"
//     socket.emit("voted",voteComplete)

// })