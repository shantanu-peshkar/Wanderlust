const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionoptions={
    secret:"mysuperSecretstring",
        resave:false,
        saveUninitialized :true,
    
}
app.use(session(sessionoptions));
app.use(flash());


app.get("/register",(req,res)=>{
    let{name="anonymous"}=req.query;
    req.session.name=name;
    req.flash("success","user registered successful")
    res.redirect("/hello")
});

app.get("/hello",(req,res)=>{
    res.locals.messages=req.flash("success")
   res.render("page.ejs",{name:req.session.name})
})

// app.get("/recount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`you sent a request ${req.session.count}times`);
// })
// app.get("/test",(req,res)=>{
//     res.send("test successfull");
// });
app.listen(3000,()=>{
    console .log("server is listening to 3000")
})