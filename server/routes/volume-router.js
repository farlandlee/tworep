const express = require('express')

const VolumeCtrl = require('../controllers/volume-ctrl')

const router = express.Router()

router.get('/', VolumeCtrl.getVolumes)

module.exports = router