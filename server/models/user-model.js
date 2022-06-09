const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        name: { type: String, unique: true },
        password: { type: String } 
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', User)