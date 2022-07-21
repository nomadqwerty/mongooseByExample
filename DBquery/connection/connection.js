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
// 2. error after intilial connection.

// handle connection errors with the tryCatchblock for a async func of .cathc() for promise
mongoose.connect('notAconnectionString').catch(err=>{
    console.log(err.message)
})


/// attach a lstener to connection to listen for errors after initial connection

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

//////////////
// connection options
// the connect() method accepts an options object. some options are specified by mongoose by default. like bufferCommands, user/pass, autoIndex, dbName

// other options to tune mongoose.
// ie
let options = {
    autoIndex:false,
    maxPoolSize:10,
    minPoolSize:5,
    serverSelectionTimeOutMs:5000,
}

// mongoose.connect('uri',options)


///////////////
// mongoose error handling
// mongoose error back
// the connect() also accepts a callback to handle err. this also returns a promise
mongoose.connect('connectString',options,(err)=>{
    console.log(err.message)
})
// or
mongoose.connect('connectstring',options).then(()=>{console.log('connected')}).catch(err=>{console.log(err.message)})

