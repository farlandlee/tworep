const fs = require('fs')
const mongoose = require('mongoose')
const db = require('../db')
const Article = require('../models/article-model')
const glob = require("glob")

Article.deleteMany({}).then(() => { 
  console.log('deleted')  // Success 

  glob("./json/*.json", {}, (err, files) => {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    if(files.length) {
      files.map((file) => {
        let rawdata = fs.readFileSync(file)
        let articles = JSON.parse(rawdata)
        Article.insertMany(
          articles
        ).then( (result) => { 
          console.log(`${file} added: `,result.length)  // Success 
        }).catch( (error) => { 
          console.log(error)      // Failure 
        })
      })
    }
  })

})

