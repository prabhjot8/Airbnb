const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to DB ");
}).catch((err)=>{
    console .log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("Hi, I'm root");
});


//INDEX ROUTE
app.get("/listings",async(req,res)=>{
    let allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});


// NEW ROUTE
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});


// SHOW ROUTE
app.get("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
});

// CREATE ROUTE
app.post("/listings",async(req,res)=>{
    // let{title,description,price,image,location,country}=req.body;
    // let listing=req.body.listing;
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    // console.log(listing);
    res.redirect("/listings");
});


// EDIT ROUTE
app.get("/listings/:id/edit",async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
});

// UPDATE ROUTE
app.put("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    // console.log(req);
    // console.log({...req.body});
    console.log({...req.body.listing});
    res.redirect(`/listings/${id}`);
});


// DELETE/ DESTROY ROUTE
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});


// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"by the beach",
//         price:12000,
//         location:"Nerul,Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful testing");
// });


app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});