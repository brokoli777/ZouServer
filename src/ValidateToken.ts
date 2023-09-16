import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { createError } from "./Error.js"
import { ExpressRequest } from "./index.js"


export function ValidateToken(req: ExpressRequest,res: Response, next: NextFunction) {
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401,"User not Authenticated"))
    }
    else{
        jwt.verify(token, process.env.JWT, (err:any,user:any)=>{
            if(err) return next (createError(403, "Token is not valid!"));
            req.user = user;
            next()
        })
    }
}

export default ValidateToken