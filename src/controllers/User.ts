import { NextFunction } from 'express';
import { ExpressRequest, ExpressResponse } from "../index.js"
import User from "../schema/UserSchema.js"
import Video, { IVideo } from '../schema/VideoSchema.js';
import { CreateError } from '../Error.js';
import { runInNewContext } from 'vm';



export const Update = async (req: ExpressRequest,res: ExpressResponse, next: NextFunction) =>{
    // console.log(`paramsID:${req.params.id}, userID:${JSON.stringify(req.user)}`)
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body // res?
            })
            res.status(200).json(updatedUser)
        }
        catch(err){
            next(err)

        }
    }
    else{

        return next(CreateError(403,"Not authorised to update another ID account"))
    }
}

export const Delete = (req: ExpressRequest,res: ExpressResponse, next: NextFunction) =>{
    DeleteUser(req,res).then(() => {res.status(200).json("User has been updated")}).catch((err)=>{return next(new Error(err))})
}

const DeleteUser = (req: ExpressRequest,res: ExpressResponse) =>{
    return new Promise<void>((resolve,reject)=>{
        if(req.params.id === req.user.id){
            User.findByIdAndDelete(req.params.id).then(()=>{
                res.status(200).json("User has been deleted");
                resolve();
            }).catch((err)=>{
                reject("You can only delete your account");
            })
        }
    })
}

export const GetInfo = async (req: ExpressRequest,res: ExpressResponse, next: NextFunction) =>{
   try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
        // console.log("yo"+user)
   } catch (error) {
        next(error);
   }
}



export const Subscribe = async (req: ExpressRequest,res: ExpressResponse, next: NextFunction) =>{
    console.log("hey")
    try {
        await User.findByIdAndUpdate(req.user.id, {$push: {subscribedUsers:req.params.id}});
        console.log("yooo")
        await User.findByIdAndUpdate(req.params.id, {$inc: {subscribers:1}});
        res.status(200).json("Succesful Subscription");
   } catch (error) {
        next(error);
   }
}

export const Unsubscribe = async (req: ExpressRequest,res: ExpressResponse, next: NextFunction) =>{
    try {
        await User.findById(req.user.id, {$pull: {subscribedUsers:req.params.id}});
        await User.findByIdAndUpdate(req.params.id, {$inc: {subscribers:-1}});
        res.status(200).json("Succesful Unsubscription");
   } catch (error) {
        next(error);
   }
}

export const Like = (req: ExpressRequest,res: ExpressResponse, next: NextFunction) =>{
    // Video.findByIdAndUpdate(req.params.id, {$inc: {likes:1}}, {new:true}).then((UpdatedVideo:any)=>{
    //     res.status(200).json(UpdatedVideo);
    // })

    Video.updateOne({_id: req.params.video}, {$push: {likes: req.user.id}, $pull: { dislikes: req.user.id }})
    .then(()=>{res.status(200).json("Liked Video")}).catch((err)=>{next(err)})
}

export const Dislike = (req: ExpressRequest,res: ExpressResponse, next: NextFunction) =>{
    // Video.findByIdAndUpdate(req.params.id, {$inc: {likes:-1}}, {new:true}).then((UpdatedVideo:any)=>{
    //     res.status(200).json(UpdatedVideo);
    // })
    console.log("boi")
    Video.updateOne({_id: req.params.video}, {$pull: {likes: req.user.id}, $push: { dislikes: req.user.id }})
    .then(()=>{res.status(200).json("Disliked Video")}).catch((err)=>{next(err)})
}

