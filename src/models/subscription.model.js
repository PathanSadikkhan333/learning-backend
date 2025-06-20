import mongoose, {schema} from "mongoose"

const subscriptionSchema = new Schema({
    subscriber:{
       
    },
    channel:{
       type:schema.types.ObjectId, //the one to whom the user is subscribing
        subscribing,
        ref:"users"
    }
},{timestamps:true})






export const Subscription = mongoose.model("Subscription",subscriptionSchema)