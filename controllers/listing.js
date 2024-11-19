
const Listing=require("../models/listing.js");
module.exports.index=async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index", { allListings }); 
  };


  module.exports.renderNewForm=(req,res)=>{
    
    res.render("listings/new.ejs");
};


module.exports.showlisting=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    if(!listing){
      req.flash("error","listing you requested for does not exist !");
      res.redirect("/listing");
    }
    res.render("listings/show.ejs",{listing})
}




module.exports.creatlisting=async(req,res,next)=>{
    //here we made instance of listing
     let url=req.file.path;
     let filename=req.file.filename;
    
      const newListing= new Listing(req.body.listing);//this short form in new.js we make this changes name="listing[location]" means square bracket
       newListing.owner=req.user._id;//this for when some one add listing owner name is seen
       newListing.image={url,filename}
        await  newListing.save();
        req.flash("success","new Listing Created!");
       res.redirect("/listings")
   
}


module.exports.editlisting=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
}


module.exports.updatelisting=async (req, res) => {

    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, req.body.listing);
    if( typeof req.file !== "undefined"){
    let url=req.file.path;
     let filename=req.file.filename;
     listing.image={url,filename};
     await listing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}


module.exports.deletelisting=async (req, res) => {
    let { id } = req.params;
 let deletedListing= await Listing.findByIdAndDelete(id);
 console.log(deletedListing)
 req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}

