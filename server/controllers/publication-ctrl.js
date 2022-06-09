const Article = require('../models/article-model')

getUniquePublications = async (req,res) => {
    await Article.find({},'publication').distinct('publication', (err, publications) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json(publications)
    })
}

module.exports = {
    getUniquePublications
}