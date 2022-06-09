const express = require('express')
const router = express.Router()

const EmailCtrl = require('../controllers/email-ctrl')

router.post( '/', EmailCtrl.sendEmail )

module.exports = router