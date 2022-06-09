const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Volume = new Schema(
    {
        volume: { type: String, unique: true },
        volume_number: { type: mongoose.Types.Decimal128, unique: true },
        filename: { type: String, unique: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Volume', Volume)