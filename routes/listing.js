const express=require("express");
const router=express.Router();
const Wrapasyc=require("../utils/Wrapasyc.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {isloggedIn,isOwner}= require("../middleware.js")

const listingController=require("../controllers/listing.js");
const multer=require("multer");
const {storage}=require("../cloudconfig.js")
const upload=multer({storage})



const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body)
    
    if(error){
      throw new ExpressError(400, error.details[0].message);
    }else{
        next();
    }
}

router.route("/")
.get(Wrapasyc(listingController.index))
.post(isloggedIn,upload.single('listing[image][url]'),validateListing,
  Wrapasyc(listingController.creatlisting));



//new route
router.get("/new",isloggedIn,listingController.renderNewForm);

  router.route("/:id")
  .get(Wrapasyc(listingController.showlisting))
  .put(isloggedIn,upload.single('listing[image][url]'),validateListing,
    isOwner,
       Wrapasyc(listingController.updatelisting))
  .delete(isloggedIn,isOwner, Wrapasyc(listingController.deletelisting));

  
  

  // Edit route
  router.get("/:id/edit",isloggedIn,isOwner,Wrapasyc(listingController.editlisting));


 
  
  
  
  module.exports=router;