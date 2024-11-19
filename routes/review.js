const express=require("express");
const router=express.Router({mergeParams:true});
const Wrapasyc=require("../utils/Wrapasyc.js");
const ExpressError = require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isloggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/review.js");
const validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body)
  
  if(error){
    throw new ExpressError(400, error.message);
  }else{
      next();
  }
}


 //review
 //post route
 router.post("/",isloggedIn, validateReview ,Wrapasyc(reviewController.allreview));
    
    
    //delete route
    router.delete("/:reviewId",isloggedIn,isReviewAuthor,
        Wrapasyc(reviewController.deletereview)
    );

    module.exports=router;