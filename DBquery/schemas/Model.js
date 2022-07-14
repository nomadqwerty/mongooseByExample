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
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },{methods:{
    funct(){
        return mongoose.model('Test').find({name:this.name},cb)
    }
}})


// schema are basically useless on there own. to make use of a schema we need to convert them to Models.
// use mongoose.model(ModelName, schema)
// keep in mind model is of the type function not object
const Test = mongoose.model('Test',TestSchema)
const Doc = new Test()
// default _id properties are inserted in the schemas
// console.log(TestSchema.path('_id'))
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
    // console.log(typeof Doc)
    
    
    // we can overwrite mongoose id with our costum ids but be careful
    
    // //////document methods
    // instance methods can be added in to the schema object as the second parameter ie. new Schema({name:String},{methods: functName(){}})
    // or nameOfSchema.methods.functName = function(){do something}
    // console.log(TestSchema.methods)
    // all instances of the schema will inherit the schema instance methods
    // console.log(Test.methods)

    // virtual fields are properties of the object that we can get and set but its never persisted to the db 
    let personSchema = new Schema({name:{
        first:String,
        last:String
    }})
    
    const Person = mongoose.model('Person', personSchema)

    
    const dave = new Person({name:{first:'dave',last:'mike'}})

    // virtual fields are not pesisted
    // add virtual fields like so 
    personSchema.virtual('fullName').get(function(){
        return this.name.first + ' ' + this.name.last
    })
    
    // console.log(dave.fullName)


    // Aliases. Aliases are a particular type of virtual where the getter and setter seamlessly get and set another property. This is handy for saving network bandwidth, so you can convert a short property name stored in the database into a longer name for code readability.

    const humanSchema = new Schema({n:{
        type:String,
        alias:'name'
    }})

    const Man = mongoose.model('Man', humanSchema)

    const john = new Man({name:'john'})
    console.log(john)

    // options