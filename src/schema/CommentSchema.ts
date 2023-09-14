import mongoose from "mongoose";
const VideoSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true,
    },
    videoID:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },


},{timestamps:true});

export default mongoose.model("Video", VideoSchema)