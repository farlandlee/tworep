const mongoose = require('mongoose')
const db = require('../db')
const fs = require('fs')
  
// User model 
const User = require('../models/user-model');

let rawdata = fs.readFileSync('./users.json')
let users = JSON.parse(rawdata)
  
// Function call 
User.insertMany(
    users
).then(function(result){ 
    console.log(result)  // Success 
}).catch(function(error){ 
    console.log(error)      // Failure 
})