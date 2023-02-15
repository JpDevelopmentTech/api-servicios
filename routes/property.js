var express = require('express')
var router = express.Router()
const PropertyController = require('../controllers/property-controller')

router.post('/', PropertyController.create)

module.exports = router