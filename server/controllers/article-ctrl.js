const Article = require('../models/article-model')

getArticleById = async (req, res) => {
    await Article.findOne(
        { _id: req.params.id },
        {
            headline: 1,
            author: 1,
            date: 1,
            publication: 1,
            dateline: 1,
            volume_number: 1,
            volume: 1,
            url: 1
        },
        (err, article) => {
        if (err) {
            return res.status(400).json({ success: false, error: err, article: null })
        }

        if (!article) {
            return res
                .status(404)
                .json({ success: false, error: `Article not found`, article: null })
        }
        return res.status(200).json({ success: true, article: article, error: null })
    }).catch(err => console.log(err))
}

getArticlesByQuery = (req, res) => {
    let formData = req.params.query
    let decodedData = decodeURIComponent(formData)
    let pairs = decodedData.slice().split('&')
    let result = {}
    pairs.forEach(function(pair) {
        pair = pair.split('=')
        result[pair[0]] = decodeURIComponent(pair[1] || '')
    })
    let searchObject = JSON.parse(JSON.stringify(result))

    let search = {}
    if( 
        typeof searchObject.endDate !== 'undefined' && 
        typeof searchObject.startDate !== 'undefined' && 
        searchObject.endDate !== '' && 
        searchObject.startDate !== ''
    ) {
        search.date = { $gte: searchObject.startDate, $lte: searchObject.endDate }
    }
    else if(typeof searchObject.endDate !== 'undefined' && searchObject.endDate !== '') {
        search.date = { $lte: searchObject.endDate }
    }
    else if(typeof searchObject.startDate !== 'undefined' && searchObject.startDate !== '') {
        search.date = { $gte: searchObject.startDate }
    }

    if(typeof searchObject.publication !== 'undefined' && searchObject.publication !== '') {
        search.publication = searchObject.publication
    }

    if(typeof searchObject.volume_number !== 'undefined' && searchObject.volume_number !== '') {
        search.volume_number = parseFloat(searchObject.volume_number)
    }
    let negatives = ''
    let positives = ''
    if(typeof searchObject.includes !== 'undefined' && searchObject.includes !== '') {
        // this makes the search search for ALL search words, i.e., searching for `Nixon lodge` will result in only articles that include both Nixon AND Lodge
        // phrase match code will allow double quotes to be used to match an exact phrase
        let s = searchObject.includes;
        // console.log(s)

        // this replaces smart double quotes (curly) with straight double quotes
        s = s.replace(/[\u201C\u201D]/g, '"')
        // console.log(s)
        // phrase will be an array or null
        let phrase = s.match(/"([^"]+)"/)

        if(Array.isArray(phrase)) {
            phrase = phrase[0]
            s = s.replace(phrase, '')
            phrase = `${phrase} `
        }
        else {
            phrase = '';
        }
 
        positives = phrase + s.trim().split(/\s+/).map(kw => {
            return kw !== ''? `"${kw}"` : ''
        }).join(' ')
    }
    if(typeof searchObject.excludes !== 'undefined' && searchObject.excludes !== '') {
        negatives = ' -' + searchObject.excludes.trim().split(' ').join(' -')
    }
    if(positives !== '' || negatives !== '') {
        let text = positives + negatives;
        search.$text = { $search : text }
    }

    //return res.status(200).json({ success: true, data: search })
    if(typeof search.$text !== 'undefined') {
        Article.find(
            search, 
            'headline author date publication dateline volume volume_number url',
            { score : { $meta : "textScore" } }
        )
        .sort({ date: 'desc' })
        .exec(function(err, articles) {
            if (err) {
                return res.status(400).json({ success: false, error: err, articles: [] })
            }
            if (!articles.length) {
                let message = `No articles found for your search.`;
                if(typeof searchObject.includes !== 'undefined' && searchObject.includes !== '') {
                    message = `No articles found for ${searchObject.includes}` 
                }
                return res
                    .status(200)
                    .json({ success: true, message: message, articles: [] })
            }
            return res.status(200).json({ success: true, articles: articles, message: '' })
        })
    }
    else {
        Article.find(
            search, 
            '_id headline author date publication dateline volume'
        )
        .sort({ date: 'desc' })
        .exec(function(err, articles) {
            if (err) {
                return res.status(400).json({ success: false, error: err, articles: [] })
            }
            if (!articles.length) {
                return res
                    .status(200)
                    .json({ success: true, message: `No articles found for your search parameters.`, articles: [] })
            }
            return res.status(200).json({ success: true, articles: articles, message: '' })
        })
    }
    
}

getUniquePublications = async (req,res) => {
    await Article.find({},'publication').distinct('publication', (error, publications) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json(publications)
    })
}

getArticleIndexes = async (req, res) => {
    await Article.listIndexes( (err, indexes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!indexes.length) {
            return res
                .status(404)
                .json({ success: false, error: `No indexes found.` })
        }
        return res.status(200).json({ success: true, data: indexes })
    }).catch(err => console.log(err))
}

getArticles = async (req, res) => {
    await Article.find({}, (err, articles) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!articles.length) {
            return res
                .status(404)
                .json({ success: false, error: `No articles found.` })
        }
        return res.status(200).json({ success: true, data: articles })
    }).catch(err => console.log(err))
}

module.exports = {
    getArticlesByQuery,
    getArticles,
    getArticleById,
    getArticleIndexes,
    getUniquePublications
}