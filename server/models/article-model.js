const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Article = new Schema(
    {
        headline: String,
        author: String,
        date: Date,
        publication: String,
        dateline: String,
        volume_number: mongoose.Types.Decimal128,
        volume: String,
        url: String,
        ocr_text: String
    },
    { timestamps: true }
)

Article.index(
    { 
        headline: "text",
        publication: "text",
        dateline: "text",
        author: "text",
        ocr_text: "text"
    },
    {
        name: "FullTextIndex",
        weights: {
            headline: 20,
            publication: 10,
            dateline: 10,
            author: 5,
            ocr_text: 1
        }
        
    }
);

Article.index(
    { 
        headline: 1,
        publication: 1,
        volume: 1,
    },
    {
        unique: true 
    }
);

module.exports = mongoose.model('Article', Article)