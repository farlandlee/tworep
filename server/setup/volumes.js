const mongoose = require('mongoose')
const fs = require('fs')
const db = require('../db')
  
// Volume model 
const Volume = require('../models/volume-model')

let rawdata = fs.readFileSync('./volumes.json')
let volumes = JSON.parse(rawdata)

Volume.deleteMany({})
.then(function(result){ 
    console.log('deleted')  // Success 
    // Function call 
    Volume.insertMany(
        volumes
    ).then(function(result){ 
        console.log('added ',result.length)  // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    })
}).catch(function(error){ 
    console.log(error)      // Failure 
}).finally(function() {
    mongoose.connection.close()
});

