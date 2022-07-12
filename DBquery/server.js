const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

// env vars set with dotenv
// const pathTo = path.join(__dirname,'/config.env')
// dotenv.config({path:pathTo})
let pass = fs.readFileSync('./password.txt')
try{}catch(err){console.log(err)}


const connectDB = async()=>{
    const DB = pass.toString()
    try{
        await mongoose.connect(DB,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('DB connected')
    }catch(err){
        console.log(err)
    }
}
connectDB()

