const { number } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    Comment:String,
    rating:{
        type:Number,
        min:1,max:5
    },
    CreatedAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
});

module.exports=mongoose.model("Review",reviewSchema)
