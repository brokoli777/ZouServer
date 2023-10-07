import express , { Request, Response, NextFunction }from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from './routes/UserRoutes.js'
import videoRoutes from './routes/VideoRoutes.js'
import commentRoutes from './routes/CommentRoutes.js'
import authenticationRoutes from './routes/AuthenticationRoutes.js'
import cookieParser from "cookie-parser"

export interface ExpressRequest extends Request {
    user: any
}
export interface ExpressResponse extends Response {
    body:any
}

const app = express();
dotenv.config();

const connect = () => {
 mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MONGODB")
 }).catch((err)=>{console.error("Error connecting to MongoDB:", err);});
}

app.use(cookieParser())
app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth",authenticationRoutes);

interface Error {
    status?: number;
    message?:any;
}

app.use((err: Error,req: Request,res: Response, next:NextFunction)=>{
    const status:number = err.status || 500;
    const message = err.message || "Index.ts: Something went Wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.listen(8800,()=>{
    connect()
    console.log("Connected! ")
})