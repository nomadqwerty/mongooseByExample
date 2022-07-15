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
// console.log(testSchema.path('name').instance)

// schemaTypes are just config objs for mongoose. 
// types of valid schemaTypes
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

// console.log(modelInstance)


// when defining schemas 'type' is a special property. when mongoose sees a nested object with a type property, it knows that it means the type of data the field requires. mongoose doesnt see type as an object named type.
const birthSchema = new mongoose.Schema({
    name:{
        type:String
    },
    nested:{
        pob:{type:String},
        dob:{type:Date},
        age:{type:Number}
    }
})

// You can declare a schema type using the type directly, or an object with a type property.

// schemaType Options {}
// this is used to specify more options to configure the field or path or properties.
// lets use it for a name schema
// by using lowercase option we always convert strings to lowercase before saving
const nameSchema = new mongoose.Schema({
    name:{
        type:String,
        lowercase:true
    }
})

// more schematype options 
// required: Boolean, sets the field or prop to be requied. it must be filled.
// default: sets a default value for fields. should of type.
// ie updated:{type:Date,default:Date.now()}
// select: boolean. used to hide or show fields if queried
// validate: f(N), use to validate input.
// ie: validate:f(n){check value}
// get: define costum getters, f(n)
// set: define costum setters, f(n)
// immutable: boolean, prevent updating path after creation.
// transform: f(n) called internally by mongoose when we convert doc to json or to object. doc.toJSON() JSON.stringify()
// indexes: Bool, whether to set index on the field
// unique: Bool, whether to set unique on the field

// some special options for specific Schematypes
/////// String.
//// lowercase: boolean, whether to always call .toLowerCase() on the value
//// uppercase: boolean, whether to always call .toUpperCase() on the value
//// trim: boolean, whether to always call .trim() on the value
//// match: RegExp, creates a validator that checks if the value matches the given regular expression
//// enum: Array, creates a validator that checks if the value is in the given array.
//// minLength: Number, creates a validator that checks if the value length is not less than the given number
//// maxLength: Number, creates a validator that checks if the value length is not greater than the given number
//// populate: Object, sets default populate options 

// ///////
// Number:-

// min: Number, creates a validator that checks if the value is greater than or equal to the given minimum.
// max: Number, creates a validator that checks if the value is less than or equal to the given maximum.
// enum: Array, creates a validator that checks if the value is strictly equal to one of the values in the given array.
// populate: Object, sets default populate options


///////////
// Date:-

// min: Date, creates a validator that checks if the value is greater than or equal to the given minimum.
// max: Date, creates a validator that checks if the value is less than or equal to the given maximum.
// expires: Number or String, creates a TTL index with the value expressed in seconds.

/////////
// ObjectId:-
// populate: Object, sets default populate options


// usageNotes
// STrings
//To declare a path as a string, you may use either the String global constructor or the string 'String'.
let strSchema = new mongoose.Schema({
    name:'String',
    school:String
})
let StringModel = mongoose.model('StringModel',strSchema)
let name = new StringModel()
// the name will convert all vals passed to string dataType before save
name.name = 'dave'
// console.log(name)

// Number
// To declare a path as a number, you may use either the Number global constructor or the string 'Number'.
const numSchema = new mongoose.Schema({
    age:Number,
    yearOfBirth:'Number'
})
let NumModel = mongoose.model('NumModel',numSchema)
let age = new NumModel({
    age:23,
    yearOfBirth:'dave'
})
// console.log(age.yearOfBirth)
// this age field only accepts Numbers and booleans. true is 1 fasle is 0
// strings arent saved, nor null or undefined if passed in a field of type number
// NaN, strings that cast to NaN, arrays, and objects that don't have a valueOf() function will all result in a CastError once validated, meaning that it will not throw on initialization, only when validated.

//Dates
// fields of date type accept dates and numbers. not str or bools
let dateSch = new mongoose.Schema({
    due:Date,
    deadLine:'Date'
})
let Dte = mongoose.model('Dte',dateSch)

let submit = new Dte({
    due:Date.now(),
    deadLine:1
})
// console.log(submit)

// buffer
// To declare a path as a Buffer, you may use either the Buffer global constructor or the string 'Buffer'. buffer fields accept buffer. but can also pass in str and nums so be carefull

let bufferSchema = new mongoose.Schema({
    buf:Buffer,
    buf2:Buffer,
})
let Buff = mongoose.model('Buff',bufferSchema)

let bff = new Buff({
    buf:Buffer.alloc(5),
    buf2:'buffer'
})

// console.log(bff)

// mixed
// An "anything goes" SchemaType. Mongoose will not do any casting on mixed paths. You can define a mixed path using Schema.Types.Mixed or by passing an empty object literal. The following are equivalent.
let mixedSchema = new mongoose.Schema({
    value:Object,
    thing:{},
    any:mongoose.Schema.Types.Mixed,
    anyValOfAnyThing: mongoose.Mixed
})
let MixedModel = mongoose.model('Mixedmodel',mixedSchema)
let mixedDoc = new MixedModel({
    value:[{val:'one'}],
    thing:[1,'one'],
    any: Symbol('$$'),
    anyValOfAnyThing:{p:[new Map([['i','j']])]}
})
// console.log(mixedDoc)
// Since Mixed is a schema-less type, you can change the value to anything else you like, but Mongoose loses the ability to auto detect and save those changes. To tell Mongoose that the value of a Mixed type has changed, you need to call doc.markModified(path), passing the path to the Mixed type you just changed.

// ObjectIds
//An ObjectId is a special type typically used for unique identifiers. Here's how you declare a schema with a path driver that is an ObjectId:

const carSchema = new mongoose.Schema({ driver: mongoose.ObjectId });

// ObjectId is a class, and ObjectIds are objects. However, they are often represented as strings. When you convert an ObjectId to a string using toString(), you get a 24-character hexadecimal string:

const Car = mongoose.model('Car', carSchema);

const car = new Car();
car.driver = new mongoose.Types.ObjectId();

typeof car.driver; // 'object'
car.driver instanceof mongoose.Types.ObjectId; // true

car.driver.toString(); // Something like "5e1a0651741b255ddda996c4"

console.log(new mongoose.Types.ObjectId())

// Boolean
// Booleans in Mongoose are plain JavaScript booleans. By default, Mongoose casts the below values to true:
// true
// 'true'
// 1
// '1'
// 'yes'

// Mongoose casts the below values to false:
// false
// 'false'
// 0
// '0'
// 'no'
// Any other value causes a CastError. You can modify what values Mongoose converts to true or false using the convertToTrue and convertToFalse properties, which are JavaScript sets.

const M = mongoose.model('Test', new mongoose.Schema({ b: Boolean }));
console.log(new M({ b: 'nay' }).b); // undefined

// Set { false, 'false', 0, '0', 'no' }
console.log(mongoose.Schema.Types.Boolean.convertToFalse);

mongoose.Schema.Types.Boolean.convertToFalse.add('nay');
console.log(new M({ b: 'nay' }).b); // false
