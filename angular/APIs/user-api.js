//creating mini express
const exp=require('express')
const userapi=exp.Router(); //creates mini route 

//.env and email sending
require('dotenv').config();

const mailer = require("nodemailer");
userapi.use(exp.json())
//import mongoclient
const mc=require("mongodb").MongoClient;

//importing bcryptjs
const bcryptjs=require("bcryptjs")

//importing jsonwebtokens
const jwt=require("jsonwebtoken")

//importing express-aync-handler to handle errors
const expresserr=require("express-async-handler")


//adding users
userapi.post("/createuser",expresserr(async(req,res)=>{
    let colobj=req.app.get("userobj")
    let newuser=req.body

    console.log(newuser)
    let user = await colobj.findOne({email:newuser.email})
    if(user==null)
    {   //hashing the password
        let hashedPass= await bcryptjs.hash(newuser.password,7)

        //replace user's password with hashed password
        let user={"email":newuser.email,"name":newuser.username,"password":hashedPass}
       
        console.log(user)
        await colobj.insertOne(user)
        res.send({message:"user created"})
    }
    else{
        res.send({message:"account registered with this mail id already exists "})
    }
}))

//login using async await
userapi.post("/login",expresserr(async(req,res)=>{
    let colobj=req.app.get("userobj")
    let userobj=req.body
    //console.log(req.body)
    let user =await colobj.findOne({email:userobj.email})
    //console.log(user)
    if(user==null)
    {
        res.send({message:"no account with this mail id register to login"})
    }
    else{
        //compare password
        let r= await bcryptjs.compare(userobj.password,user.password)
        if(r==false)
        { 
            res.send({message:"INVALID PASSWORD"})}
        else{
            res.send({message:"success",username:user.name})
        }
    }
}))


//return health products according to category

userapi.get("/medicines/:name",expresserr(async(req,res)=>{
    let hlobj=req.app.get("medobj")
    let cat=req.params.name
    //console.log(cat)
    let products= await hlobj.find({type:cat}).toArray();
    //console.log(products)
    res.send({message:products,"type":cat})
}))

userapi.get("/health/:name",expresserr(async(req,res)=>{
    let hlobj=req.app.get("healthobj")
    let cat=req.params.name
    //console.log(cat)
    let products= await hlobj.find({type:cat}).toArray();
    //console.log(products)
    res.send({message:products,"type":cat})
}))


//add to cart route
userapi.post("/add-to-cart",expresserr(async(req,res)=>{
    let proObj=req.app.get("cartObj")
    let newobj=req.body
    let userProColObj=await proObj.findOne({name:newobj.name})
    if(userProColObj==null)
    {
        //create new obj and insert products into a list and add this obj to collection
        let products=[]
        products.push(newobj.productObj)
        let newobjtocol={name:newobj.name,email:newobj.email,cartProducts:products}
        await proObj.insertOne(newobjtocol)
        res.send({message:" product added to cart"})
    }
    else{
        //push new product to existing products array
        userProColObj.cartProducts.push(newobj.productObj)
        console.log(userProColObj)
        //update document
        await proObj.updateOne({name:newobj.name},{$set:{...userProColObj}})
        res.send({message:" product added to cart"})
    }
}))




//geetting products added to cart by user
userapi.get("/getCart/:username",expresserr(async(req,res)=>{
    let proObj=req.app.get("cartObj")
    let un=req.params.username
    //console.log(un)
    let cartObj=await proObj.findOne({name:un})
    if(cartObj==null)
    {
        res.send({message:"Cart empty"})
    }
    else{
        //console.log("in getacart",cartObj)
        res.send({message:cartObj})
    }
}))

//updating product using async and await
userapi.put("/updateProduct/:name",expresserr(async(req,res)=>
{let objcol=req.app.get("cartObj")
    let updated=req.body
    let product=await objcol.findOne({name:updated.name})
    if(product==null)
    {
        res.send(`no product with name ${updated.name} to update`)
    }
    else
    {
        await objcol.updateOne({name:updated.name},{$set:{...updated}})
        res.send({message:"cart updated"})
    }
}))



//mail confirmation after ordering

userapi.post('/orderConfirmation',expresserr(async(req,res)=>{
    //orders
    console.log("request came")
    let user=req.body
    console.log("in order user-api",user)
    let proObj=req.app.get("ordersobj")
    let userProColObj=await proObj.findOne({email:user.email})
    if(userProColObj==null)
    {
        //create new obj and insert products into a list and add this obj to collection
        let products=[]
        products=user.products
        let newobjtocol={email:user.email,orders:products,name:user.name}
        await proObj.insertOne(newobjtocol)
        res.send({message:"order confirmed,see profile for latest orders"})
        
    }
    else
    {   products=user.products
        let newobjtocol={email:user.email,orders:products,name:user.name}
        await proObj.updateOne({email:newobjtocol.email},{$set:{...newobjtocol}})
        res.send({message:"order confirmed,see profile for latest orders"})
    }

    //mail sending
    const transporter = mailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })
    
    let body={
        from:'medstack96@gmail.com',
        to:user.email,
        subject:'Order Confirmation',
        html:'<h1>Hello Customer, Thank You for chosing MedStack!</h1> <h3>This is a confirmation mail to let you know that your order has been successfully deployed.</h3> <h3>For further details please visit the profile page of our site.</h3> <h3>Stay safe and healthy!</h3>'
    }
    
    transporter.sendMail(body,(err,result)=>{
        if(err){
            console.log(err);
            return false;
        }
        console.log(result);
        
    })
    

    
    //res.send("order confirmed")
}))


userapi.get("/getOne/:id",expresserr(async(req,res)=>{
 
    let idPro=req.params.id
    let hlobj=req.app.get("medobj")
    console.log(idPro)
    let med=await hlobj.findOne({name:idPro})
    console.log(med)
    res.send(med)


}))

userapi.get("/getCare/:id",expresserr(async(req,res)=>{
 
    let idPro=req.params.id
    let hlobj=req.app.get("healthobj")
    console.log(idPro)
    let med=await hlobj.findOne({name:idPro})
    console.log(med)
    res.send(med)


}))


//geetting products added to cart by user
userapi.get("/getOrder/:email",expresserr(async(req,res)=>{
    let proObj=req.app.get("ordersobj")
    //console.log("orders getting ")
    let un=req.params.email
    //console.log(un)
    let cartObj=await proObj.findOne({email:un})
    if(cartObj==null)
    {
        res.send({message:"order empty"})
    }
    else{
        //console.log("in get orders",cartObj)
        res.send({message:cartObj})
    }
}))


//getting orders array

//geetting products added to cart by user
userapi.get("/onlyOrders/:email",expresserr(async(req,res)=>{
    let proObj=req.app.get("ordersobj")
    //console.log("orders getting ")
    let un=req.params.email
    //console.log(un)
    let cartObj=await proObj.findOne({email:un})
    if(cartObj==null)
    {
        res.send({message:"order empty"})
    }
    else{
        //console.log("in get orders",cartObj)
        res.send({message:cartObj.orders})
    }
}))

//export this object 
module.exports=userapi