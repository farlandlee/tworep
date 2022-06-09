const express = require('express')

const ArticleCtrl = require('../controllers/article-ctrl')

const router = express.Router()

router.get('/:id', ArticleCtrl.getArticleById)
router.get('/', ArticleCtrl.getArticles)
router.get('/query/:query', ArticleCtrl.getArticlesByQuery)
router.get('/indexes', ArticleCtrl.getArticleIndexes)
router.get('/publications', ArticleCtrl.getUniquePublications)

module.exports = router