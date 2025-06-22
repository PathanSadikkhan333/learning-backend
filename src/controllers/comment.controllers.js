import mongoose from "mongoose"
import {comment} from "../models/comment.model.js"
import {Apierror} from "../utils/apierror.js"
import {Apiresponse} from "../utils/apiresponse.js"
import {asyncHandler, Asynchandler} from "../utils/asynchandler.js"

   // TODO: add a comment to a video
const getVideoComment =asyncHandler(async(req,res)=>{
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    if(!getVideoComment(videoId)){
       throw new Apiresponse(400,"invalid video id")
    }
  
  // Calculate how many comments to skip for pagination
  const skip =(Number(page)-1)*Number(limit);
  
  // Fetch the video by ID and populate the comments array
  const videoWithComment = await video.findById(videoId)// Find the video by id
  .select("comment") //Only select the comments field from the video document.
   .populate({
    path:"comments",// We tell Mongoose:
    options:{
        skip:skip,
        limit:Number(limit),
        sort:{createdAt:-1}
    },
    populate:{
      path:"owner",
      select:"user fullname avatar"
   }
   })
     // If no video is found with that ID, throw an error
     if(!videoWithComment){
      throw new Apiresponse(404,"video not found")
     }
     // If successful, return the comments with a 200 status
     return res.status(200).json(
        new Apiresponse(200,videoWithComment.comment,"comments fetched sucessfully")
     )
})

// TODO: add a comment to a video
const addComment = asyncHandler(async(req,res)=>{
    // Step 1: Extract videoId from the request parameters and comment text from request body
    const {videoId}=req.params
    const {text}=req.query
    // Step 2: Validate inputs
    if(!text){
        throw new Apiresponse(400,"comment text is required")
    }
    // Step 3: Create the comment object
    const comment = await comment.create({
        text,
        owner:req.user._id,
        user:videoId
})
 // Step 4: Push the comment into the video document's comments array
    await video.findByIdAndUpdate(videoId,{
        $push:{comments:comment._id}
    });
    // Step 5: Return success response
    return res.status(201).json(new Apiresponse(201,comment,"comment addedd successfully"))
 

})

 // TODO: update a comment
const updateComment = asyncHandler(async(req,res)=>{
    const {commentId}=req.params;
    const {text}=req.body;   
     // Step 2: Validate input
     if(!input){
        throw new Apierror(400,"update comment text is required");
     }
     // Step 3: Find the commen
     const comment = await findById(commentId)
     if(!comment){
        throw new Apierror(404,"comment not found");
     }
    // Step 4: Check if the current user is the owner of the comment
    if(String(comment.owner)!== string(req.user._id)){
        throw new Apierror(403,"u r not allowed to comment on this")
    }
    // Step 5: Update the text and save
    comment.text=text;
    await comment.save();
    // Step 6: Return success response
    return res.status(200).json(new Apiresponse(200,Comment,"comment updated successfully"))
})

// TODO: delete a comment
const deleteComment = asyncHandler(async(req,res)=>{
    const {commentId}=req.params
    // Step 2: Find the comment
    const comment= await comment.findById(commentId)
    if(!comment){
        throw new Apierror(404,"comment not found")
    }
    // Step 3: Check if the user is the owner of the comment
    if(string(comment.owner)!==string(req.user._id)){
        throw new Apierror(403,"u r not allowed to comment on this")
    }
    // Step 4: Remove the comment ID from the video's comments array
    await video.findByIdAndUpdate(comment.video,{
        $pull:{comments:comments._id}
    })
    // Step 5: Delete the comment from the collection
    await comment.deleteOne();
    
    // Step 6: Return success response
    return res.status(200).json(new Apiresponse(200,Comment,"comment deleted successfully"))
})



export {
    getVideoComment, 
     addComment,
    updateComment, 
    deleteComment
}