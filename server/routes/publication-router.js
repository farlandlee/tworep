const express = require('express')

const PublicationCtrl = require('../controllers/publication-ctrl')

const router = express.Router()

router.get('/', PublicationCtrl.getUniquePublications)

module.exports = router