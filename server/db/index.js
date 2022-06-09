const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/tworeporters', {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB Connected')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db