import { Request, Response, NextFunction } from 'express';
import { ExpressRequest, ExpressResponse } from "../index.js"
import User from "../schema/UserSchema.js"
import { createError } from '../Error.js';


export const Update = async (req: ExpressRequest,res: ExpressResponse, next: NextFunction) =>{
    if(req.params.id === req.user.ID){
        try{
            console.log("entered here");
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:res.body // res?
            })
            res.status(200).json(updatedUser)
        }
        catch(err){
            next(err)
            console.log("hey");
        }
    }
    else{
        console.log("test");
        return next(createError(403,"Not authorised to update another ID account"))
    }
}

export const Delete = (req: ExpressRequest,res: ExpressResponse, next: NextFunction) =>{
    return new Promise<void>((resolve,reject)=>{
        if(req.params.id === req.user.id){
            User.findByIdAndDelete(req.params.id).then(()=>{
                res.status(200).json("User has been deleted");
                resolve();
            }).catch((err)=>{
                reject();
            })
        }
    })
}

// export const GetInfo =(req: Request,res: Response, next: NextFunction) =>{

// }

// export const Subscribe =(req: Request,res: Response, next: NextFunction) =>{

// }

// export const Unsubscribe =(req: Request,res: Response, next: NextFunction) =>{

// }

// export const Like =(req: Request,res: Response, next: NextFunction) =>{

// }

// export const Dislike =(req: Request,res: Response, next: NextFunction) =>{

// }

