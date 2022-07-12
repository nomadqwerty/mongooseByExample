const fs = require('fs')
let pass = fs.readFileSync('./DBquery/password.txt')
console.log(pass.toString())