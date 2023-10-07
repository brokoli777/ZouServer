import { Request, Response, NextFunction } from 'express';
import { ExpressRequest, ExpressResponse } from "../index.js"
import Video, {IVideo} from '../schema/VideoSchema.js';
import { CreateError } from '../Error.js';
import User from "../schema/UserSchema.js"

export async function AddVideo (req:ExpressRequest,res:ExpressResponse, next:NextFunction) {

    try {
        const NewVideo = new Video({userID: req.user.id, ...req.body});
       const SavedVideo = await NewVideo.save()
       res.status(200).json(SavedVideo)
   } catch (error) {
        next(error);
   }
}

export async function UpdateVideo (req:ExpressRequest,res:ExpressResponse, next:NextFunction) {
    try {
       const UserVideo = await Video.findById(req.params.id)
       if(!UserVideo) return next(CreateError(404,"Video not found!"))
       if(req.user.id === UserVideo.userID){
            const UpdatedVideo = await Video.findByIdAndUpdate
            (req.params.id, {$set:req.body}, {new:true})
            res.status(200).json(UpdatedVideo)
       }
       else{
        return next(CreateError(403,"You can only update your videos"))
       }

    } catch (error) {
         next(error);
    }
}

export function DeleteVideo (req:ExpressRequest,res:ExpressResponse, next:NextFunction) {
    Video.findById(req.params.id).then((UserVideo: IVideo) => {
        if(!UserVideo) return next(CreateError(403,"You can only update your videos"))
        else if (req.user.id === UserVideo.userID){
            Video.findByIdAndDelete(req.params.id).then(()=>{
                res.status(200).json("Deleted Video Successfully")
            }).catch((err)=>{next(err)})
        }
    }
    ).catch((err) => {
        next(err)
    })
}

export function GetVideo (req:ExpressRequest,res:ExpressResponse, next:NextFunction) {
    Video.findById(req.params.id).then((UserVideo:IVideo) => {
        res.status(200).json(UserVideo)
    }
    ).catch((err) => {
        next(err)
    })
}

export function AddView (req:ExpressRequest,res:ExpressResponse, next:NextFunction) {
    Video.findByIdAndUpdate(req.params.id, {$inc:{views:1}}).then(() => {
        res.status(200).json("View has been increased by 1")
    }
    ).catch((err) => {
        next(err)
    })
}

export function Trending (req:ExpressRequest,res:ExpressResponse, next:NextFunction) {
    Video.aggregate([{
        $sort: {
          views: -1, // Sort by views in descending order (highest views first)
        },
      }]).then((Videos:any) => {
        res.status(200).json(Videos)
    }
    ).catch((err) => {
        next(err)
    })
}

export function Random (req:ExpressRequest,res:ExpressResponse, next:NextFunction) {
    Video.aggregate([{$sample:{size:50}}]).then((Videos:any) => {
        res.status(200).json(Videos)
    }
    ).catch((err) => {
        next(err)
    })
}

export function Sub (req:ExpressRequest,res:ExpressResponse, next:NextFunction) {
    User.findById(req.user.id).then(async (CurrentUser)=>{
        const SubscribedChannels = CurrentUser.subscribedUsers;
        console.log("boi"+SubscribedChannels)
        const List = await Promise.all(
            SubscribedChannels.map((ChannelID) =>{
                console.log("channelId"+ChannelID)
                return Video.find({userID: ChannelID})
            })
        )
        res.status(200).json(List.flat().sort((a:any, b:any) => b.createdAt - a.createdAt));

    }).catch((err) => {
        next(err)
    })
}

export function GetByTags (req:ExpressRequest,res:ExpressResponse, next:NextFunction) {
    const Query = (req.query.tags as string).split(",")
    // const VideoList: typeof Video[] = [];

    Video.find({tags:{$in:Query}}).limit(20).then((Videos:any) => {
        res.status(200).json(Videos)

    }
    ).catch((err) => {
        next(err)
    })
    // Query.forEach(element => {

    // });

}

export function Search (req:ExpressRequest,res:ExpressResponse, next:NextFunction) {
    // const Query = (req.query.tags as string).split(",")
    console.log(req.query.title)
    Video.find({title: {$regex: req.query.title, $options: "i"}}).limit(20).then((Videos:any) => {
        res.status(200).json(Videos)
    }
    ).catch((err) => {
        next(err)
    })
}
