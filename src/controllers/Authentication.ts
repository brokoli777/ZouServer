import express, { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv"
import bcrypt from "bcryptjs";
import User from '../schema/UserSchema.js';
import { CreateError } from '../Error.js';
import jwt from "jsonwebtoken";

export const signin = async(req: Request,res: Response, next:NextFunction) =>{
    // console.log(req.body)
    try {
        const user = await User.findOne({name:req.body.name})
        if(!user){next(CreateError(404, "User not found"))}

        if(! await bcrypt.compare(req.body.password,user.password))
            return next(CreateError(400, "Wrong Password"));


        const {password, ...others} = (user as any)._doc;
        const token = jwt.sign({id:user._id}, process.env.SECRETKEY)
        res.cookie("access_token", token,{
            httpOnly:true
        }).status(200).json(others);

    } catch (error) {
        next(error);
    }
}

export const signup = async(req: Request,res: Response, next:NextFunction) =>{
    // console.log(req.body)
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash});

        await newUser.save();
        res.status(200).send("New User Created!");
    } catch (error) {
        next(error);
    }
}

export const googleAuthentication = async(req: Request,res: Response, next:NextFunction) =>{

    try {
        const user = await User.findOne({email:req.body.email})

        if(user){
            const token = jwt.sign({id:user._id}, process.env.SECRETKEY);
            res.cookie("access_token", token,{
                httpOnly:true
            }).status(200).json((user as any)._doc);
        }
        else{
            const newUser = new User({
                ...req.body,
                channelImg: req.body.photoURL,
                fromGoogle:true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({id:savedUser._id}, process.env.SECRETKEY);
            res.cookie("access_token", token,{
                httpOnly:true
            }).status(200).json((savedUser as any)._doc);
        }


    } catch (error) {
        next(error);
    }
}

