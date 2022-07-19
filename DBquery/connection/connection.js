// Buffering. Monggoos lets us use our models without being connect to mongo dataBase
// to disable buffuerCommands. specify bufferCommands:false in schema options
const {Schema, default: mongoose} = require('mongoose')

const aSchema = new Schema({
    name:String
},{bufferCommands:false})

// this can also be done globally: use for other options
mongoose.set('bufferCommands',false)

// if buffer is turned off, also set autoCreate to false.
// then use model.createCollection() to create collection

// mongoose connection errors
// ther are two types of connections errors in mongoose.
// 1. error on intial connection. if the first attempt at connecting to mongoDB fails. mongoose emits an error evnet. and doesnt attempt to reconnect.

// handle connection errors with the tryCatchblock for a async func of .cathc() for promise
mongoose.connect('notAconnectionString').catch(err=>{
    console.log(err.message)
})



mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})