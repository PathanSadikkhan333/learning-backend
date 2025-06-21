import mongoose,{Schema} from "mongoose";


const likeSchema =new Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:"video"
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:"tweet"
        
    },
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
     
    }
    
},{timestamps:ture})

export const like = mongoose.model("like",likeSchema)