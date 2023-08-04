const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "cannot be blank"]
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:[true, "cannot be blank"],
        index:true,
        validate:[isEmail, "Invalid Email"]
    },
    password:{
        type:String,
        required:[true, "cannot be blank"]
    },
    picture:{
        type:String
    },
    newMessage:{
        type:Object,
        default:{}
    },
    newPole:{
        type:Object,
        default:{}
    },
    status:{
        type:String,
        default:"offline"
    }
},{minimize:false});


UserSchema.pre("save",function (next){
    const user = this;
    if(!user.isModified("password")) return next();

    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next(err);

        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
})


UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

UserSchema.statics.findByCredentials = async function (email,password){
    const user = await User.findOne({email});
    if(!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("Invalid email or password")
    return user
}


const User = mongoose.model("User", UserSchema);

module.exports = User ;