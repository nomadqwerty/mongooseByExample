// // models are constructors compiled from a schema definition
// // models are like classes. so to use them we make instances of them.
// // model instances are called Documents.


// // compile a model.
// let {Schema, default: mongoose} = require('mongoose')

// let aSchema = new Schema({
//     name:String,
// })

// const A_Model = mongoose.model('A_Model',aSchema)

// // the 1st param is for the sigular name of the collection of your models
// // the A_Model the name of the a_models in the DB(mongoose turns the name to lowercase and plural)

// // the .model method makes a copy of the schema. so before using .model() ensure the schema is built completely.

// // instancees of models are documents. save docs to the db with the save method.
// // model instance
// const a_Doc = new A_Model({
//     name:'this is a Doc'
// })

// // save method is available on documents.
// a_Doc.save((err)=>{
//     console.log(err.message)
// })

// // or call the create method on the model.
// A_Model.create({name:'anoda obj'},(err)=>{
//     console.log(err)
// })

// // to create many docs use insertMany()
// A_Model.insertMany([{name:'many'},{name:'docs'}],(err)=>{
//     console.log(err)
// })

// // to delete a doc. use deleteOne({filter}), deleteMany({}). 
// // method on the model object.
// // 
// A_Model.deleteOne({name:'anoda obj'},(err)=>{})

// // update a doc.
// // use .updateOne 


