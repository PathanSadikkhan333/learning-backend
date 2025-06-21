import mongoose,{Schema, SchemaTypeOptions} from "mongoose";

const tweetSchema = new Schema({
    content: {
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestapms:true})

export const tweet = mongoose.model("Tweet",tweetSchema)