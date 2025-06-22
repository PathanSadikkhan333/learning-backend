import mongoose from "mongoose"
import {video} from "../model/video.model.js"
import {like} from "../model/like.model.js"
import {subscription} from "../model/subscription.model.js"
import {Apierror} from "../utils/apierror.js"
import {Apiresponse} from "../utils/apiresponse.js"
import {asyncHandler, Asynchandler} from "../utils/asynchandler.js"

     // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

const getChannelStates = asyncHandler(async(req,res)=>{
    const video = await video.find({owner:userId});
    //calculate total views and likes
    const totalViews = Videos.reduce((sum,video)=>sum + (video.views ||0),0);
    const totalLikes= video.reduce((sum,video)=> sum + (video.likes.length || 0), 0); 
    const totalvideos = videos.length;

    //count no.of subscribes for this channel
    
})  
