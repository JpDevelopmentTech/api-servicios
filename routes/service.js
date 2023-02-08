var express = require('express')
var router = express.Router()
const ServiceController = require('../controllers/service-controller')

router.post('/', ServiceController.create)
router.get('/recommended/:id', ServiceController.getRecommendedServices)
module.exports = router