const {Schema,mongoose, models} = require('mongoose')

// mongoose models are provided with  certain methods for helping with CRUD ops

// queries are executed using callbacks for async ops.
// the .then() is available because queries return promises

// executing queries with callbacks.
// in callback execution. we set the filter object as a json doc.
// {'name':'john'} - this is a filter to query the db for the name john.
const sch = new Schema({name:'string'})
const Model = mongoose.model('Model',sch)
// const person = Model.find({'name':'john'},(err,data)=>{
//     console.log(data)
// // })

// queries arent actually promises