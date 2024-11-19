
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

console.log(process.env.SECRET);


const express=require("express");
const methodOverride = require("method-override");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const ejsMate=require("ejs-mate");
const Wrapasyc=require("./utils/Wrapasyc.js");
const ExpressError = require("./utils/ExpressError.js");
const session=require("express-session")
const flash=require("connect-flash");
const passport= require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const Listing=require("./models/listing.js");


const listings=require("./routes/listing.js");
const  reviews=require("./routes/review.js");
const  user=require("./routes/user.js")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

app.get("/",(req,res)=>{
    res.send("hi iam root");
})

main()
.then(()=>{
    console.log("connent to DB");
}).catch(err=>{
    console.log(err)
});



async function main(){
mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}






const sessionoption={
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7 *24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true

    }
};


app.use(session(sessionoption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for flash
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
    next();
})




  
//passport
// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"delta-student",
//     });
//     let registeredUser=await User.register(fakeUser,"helloworld"); //register is a method in which we pass two value user schema and password
//     res.send(registeredUser);
// })


app.use("/listings",listings);

app.use("/listings/:id/reviews",reviews);

app.use("/",user)






app.all("*",(req,res)=>{
    next(new ExpressError(404,"page not found"))
})

app.use((err,req,res,next)=>{
    let{StatusCode=500,message="something went Wrong"}=err;
    // res.status(StatusCode).send(message);
    res.render("error.ejs",{message});
});



app.listen(8080,()=>{
   console.log("server is listening to port 8080") 
})