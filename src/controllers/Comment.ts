import { NextFunction } from 'express';
import { ExpressRequest, ExpressResponse } from "../index.js"
import Comment from "../schema/CommentSchema.js"
import Video from '../schema/VideoSchema.js'
import { CreateError } from '../Error.js';

export function AddComment(req: ExpressRequest,res: ExpressResponse, next: NextFunction){

    Video.findById(req.body.videoID).then((TempVideo)=>{
        if(!TempVideo) return next(CreateError(403,"You can only add comment to existing videos"))
        else{
            const TempComment = new Comment({userID: req.user.id, ...req.body})
            TempComment.save().then(() => {
                res.status(200).json("New Comment Added")
            }
            ).catch((err) => {
                next(err)
            })
        }
    })

}

export function DeleteComment(req: ExpressRequest,res: ExpressResponse, next: NextFunction){

    Comment.findById(req.params.id).then((UserComment) => {
        //console.log("HEyyyy")
        if(!UserComment) return next(CreateError(403,"Comment does not exist"))
        else if (req.user.id === UserComment.userID){
            Comment.findByIdAndDelete(req.params.id).then(() => {
                res.status(200).json("Comment Deleted")
            })
            console.log("Hello")
        }
        else{
            return next(CreateError(403,"You can only delete your own comments"))
        }   
    }
    ).catch((err) => {
        next(err)
    })
}

export function GetComments(req: ExpressRequest,res: ExpressResponse, next: NextFunction){
    Comment.find({videoID: req.params.videoID}).then((Comments) => {
        res.status(200).json(Comments)
    }
    ).catch((err) => {
        next(err)
    })
}

