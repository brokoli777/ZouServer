import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        unique:true,
    },
    subscribers:{
        type:Number,
        default:0,
    },
    subscribedUsers:{
        type:[String],
    },
    password:{
        type:String,
        required:true,
    },
    channelImg:{
        type:String,
    },

},{timestamps:true});

export default mongoose.model("User", UserSchema)