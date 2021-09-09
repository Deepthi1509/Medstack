const  exp=require('express')
const app=exp();
const port=8080
app.listen(port,()=>console.log(`server listening on ${port}`))
const path=require("path")

//connect angular to express server 
app.use(exp.static(path.join(__dirname,'./dist/angular')))

//import mongoclient
const mc=require("mongodb").MongoClient;

//database cloud connection string 
const databaseurl="mongodb+srv://Deepthi:<Deepthi>@cluster0.v36bw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//connect to Db
mc.connect(databaseurl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("error in db connection=",err)
    }
    else{
        //get database object
        let meddb=client.db("medstack")

        //creating collection object
        medcol=meddb.collection("medicines")
        health=meddb.collection("healthcare")
        users=meddb.collection("users")
        cart=meddb.collection("cart")
        orders=meddb.collection("orders")
        app.set("userobj",users)
        app.set("medobj",medcol)
        app.set("healthobj",health)
        app.set("cartObj",cart)
        app.set("ordersobj",orders)
        console.log("database connection successfull")
    }
})

const userapi=require("./APIS/user-api")

app.use("/user",userapi)
