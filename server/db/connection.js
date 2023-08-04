const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery",false);

mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@cluster0.43297dg.mongodb.net/q_poll?retryWrites=true&w=majority`)
.catch((error)=>{console.log(error)})
.then(()=>{console.log("mongodb connected")});