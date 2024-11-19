const express=require("express");
const router=express.Router();
const User=require("../models/user.js")
const Wrapasyc=require("../utils/Wrapasyc.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js")
const usercontroller=require("../controllers/user.js")

router.get("/signup",usercontroller.getsignup);

router.post("/signup",Wrapasyc(usercontroller.postsignup));



router.get("/login",usercontroller.getlogin)


router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),
    usercontroller.postlogin
)


router.get("/logout",usercontroller.userlogout)


module.exports=router;