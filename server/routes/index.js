const routes = require('express').Router()
const articles = require('./article-router')
const volumes = require('./volume-router')
const publications = require('./publication-router')
const email = require('./email-router');

routes.use('/api/articles', articles)
routes.use('/api/volumes', volumes)
routes.use('/api/publications', publications)

routes.use('/send', email)

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' })
})

module.exports = routes