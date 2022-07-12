// svhemas are like the blueprint for a documents in mongoose.
// it defines the shape of the doc
// import mongoose
const mongoose = require('mongoose')

// store schema object from mongoose in var
// do not call it. ie: .Schema()
const Schema = mongoose.Schema

// create new instance on schema
// svhema is basically an object
const TestSchema = new Schema({
    // The permitted SchemaTypes are:
    // String
    // Number
    // Date
    // Buffer
    // Boolean
    // Mixed
    // ObjectId
    // Array
    // Decimal128
    // Map

    // create properties in schema object and specify the accepted DataType/SchemaTypes
    title:String,
    date:Date,
    comments:[{body:String,time:{type:Date,default:Date.now()}}],
    // keys can also be POJO. Downside is they cant be validated
    meta:{
        // this is a POJO not a schema Type option
        vote:Number,
        fave:String
    },
    // use { to specify more schema options like validate,unique,type,required,default,select,enum etc}
    age:{
        type:Number,
        required:[true,'please include age']
    }
})


// schema are basically useless on there own. to make use of a schema we need to convert them to Models.
// use mongoose.model(ModelName, schema)
// keep in mind model is of the type function not object
const Test = mongoose.model('Test',TestSchema)
const Doc = new Test()
// default _id properties are inserted in the schemas
console.log(TestSchema.path('_id'))
//ie :- ObjectId {
//     path: '_id',
//     instance: 'ObjectID',
//     validators: [],
//     getters: [],
//     setters: [ [Function: resetId] ],
//     _presplitPath: [ '_id' ],
//     options: SchemaObjectIdOptions { auto: true, type: 'ObjectId' },
//     _index: null,
//     defaultValue: [Function: defaultId] { '$runBeforeSetters': true },
//     [Symbol(mongoose#schemaType)]: true       
//   }


// _id props are used to hold the object id number
// by default mongoose gives our models id numbers, of the schemaType ObectId
console.log(typeof Doc)


// we can overwrite mongoose id with our costum ids but be careful