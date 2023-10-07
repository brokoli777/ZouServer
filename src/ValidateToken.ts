import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { CreateError } from "./Error.js"
import { ExpressRequest } from "./index.js"


export function ValidateToken(req: ExpressRequest,res: Response, next: NextFunction) {
    const token = req.cookies.access_token
    if(!token){
        return next(CreateError(401,"User not Authenticated"))
    }
    else{
        jwt.verify(token, process.env.SECRETKEY, (err:any,user:any)=>{
            if(err) return next (CreateError(403, "Token is not valid!" + err));
            console.log("Helloj"+user)
            req.user = user;
            next()
        })
    }
}

export default ValidateToken