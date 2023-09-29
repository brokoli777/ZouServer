import mongoose from "mongoose";

export interface IVideo extends Document {
    userID: string;
    title: string;
    description: string;
    videoURL: string;
    views: number;
    tags: string[];
    likes: string[];
    dislikes: string[];
    createdAt: Date;
    updatedAt: Date;
  }



const VideoSchema = new mongoose.Schema<IVideo>({
    userID:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    videoURL:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    tags:{
        type:[String],
        default:[]
    },
    likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    }

},{timestamps:true});

export default mongoose.model<IVideo>("Video", VideoSchema)