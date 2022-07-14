const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    name:String,
    binary:Buffer,
    living:Boolean,
    update:{
        type:Date,
        default:Date.now()
    },
    age:{
        type:Number,
        min:18,
        max:200
    },
    mixed: mongoose.Schema.Types.Mixed,
    _someId: mongoose.Schema.Types.ObjectId,
    decimal:mongoose.Schema.Types.Decimal128,
    array:[],
    ofNumber:[Number],
    ofString:[String],
    ofDate:[Date],
    ofBuffer:[Buffer],
    ofBoolean:[Boolean],
    ofMixed:[mongoose.Schema.Types.Mixed],
    ofID:[mongoose.Schema.Types.ObjectId],
    ofArray:[[]],
    ofArrayofNumbers:[[Number]],
    nested:{
        stuff:{type:String,lowercase:true,trim:true}
    },
    map:Map,
    mapOfStr:{
        type:Map,
        of:String
    }

})

// think of schema as the configuration object for a Model
// then think of schematypes as configuration for fields or props
// schemaTypees says what type of data a field or prop accepts, if there are getter and setter and specifies the type.
console.log(testSchema.path('name').instance)

// schemaTypes are just config objs for mongoose. 
// types of valid schemaTypes
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
console.log(mongoose.Schema.Types.Mixed)
// ObjectId
// Array
// Decimal128
// Map
// Schema

const Model = mongoose.model('Model', testSchema)

const modelInstance = new Model({
    name:'Aso Rock',
    age:64,
    updated:new Date(),
    binary: Buffer.alloc(0),
    living:false,
    mixed:[{AnyThing:'i want'}],
    _anyId: new mongoose.Types.ObjectId,
    array:[1],
    ofNumber:[1],
    ofDate:[Date.now()],
    ofBuffer:[Buffer.alloc(1)],
    ofBoolean:[true],
    ofMixed:[{},[],'str',1],
    ofArray:[[],[]],
    ofArrayofNumbers:[[1],[2]],
    nested:{
        stuff:'Aso'
    },
    map:new Map([['key','val']]),
    
})

console.log(modelInstance)