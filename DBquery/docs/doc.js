///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Documents

// docs vs models
// these are two distinct classes. the Models class is a subclass of the document class.
// when we use the Model class we can create diff instance sof the class called documents

let {Schema, default: mongoose} = require('mongoose')

let aSchema = new Schema({
    name:String,
})

const A_Model = mongoose.model('A_Model',aSchema)

const docInstaceOfModel = new A_Model({name:'instance of model'})

console.log( docInstaceOfModel instanceof A_Model)
console.log(docInstaceOfModel instanceof mongoose.Model)
console.log(docInstaceOfModel instanceof mongoose.Document)

// retrieve doc using findOne or find or findById
// A_Model.find()

// update docs with save()
// once a doc is retrieved the fields can be updated then saved with the save() method. the save() returns a promise. if succesful the promise resolves to the document saved.
// if it fails it rejects with an error of DocnotFound

// validating 
// docs are casted and validated befor save.
// casting is when mongoose maps value to the specified types.
// and validates them, internally mongoose calls the validate() before saving
docInstaceOfModel.validate()

// overiting docs. docs can be overwritten by replacing all the fields in the doc.

// or with the doc.overwrite(), or Model.replaceOne({filterObj},{ObjToInsert})


//////////////////////////////////////////////////////////////////////////////////subDoc
// sub docs are docs nested within anoda doc. this means when designing a schema. we can also nest another schema within our schema
// mogoose accepts a single nested schema or an array of schema
const nestedSchema = new Schema({
    name:String,
})

const scheming = new Schema({
    title:String
})


const schems = new Schema({
    song:String
})

const parentSchema = ({
    nested:nestedSchema,
    arrayOfSchemes:[nestedSchema,scheming,schems]
})

const testMod = mongoose.model('testMod',parentSchema)
const nestMod1 = mongoose.model('testMod1',nestedSchema)
const schemMod2 = mongoose.model('testMod2',scheming)

const docss = new testMod({
    nested:new nestMod1({name:'nesto'}),
    arrayOfSchemes:[this.nested,new schemMod2({title:'array'})]
})

console.log(docss)
console.log(testMod)

// what is a subDoc?
// it is still a doc like another, it has a schema and a model and all the features that come with top level schemas