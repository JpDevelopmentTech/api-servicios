var express = require('express')
var router = express.Router()
const ServiceController = require('../controllers/service-controller')
const verifyToken = require('../middlewares/auth')

router.post('/', ServiceController.create)
router.get('/recommended/:id', ServiceController.getRecommendedServices)
router.post('/postulate', verifyToken ,ServiceController.postulateService)
router.get('/user/:id',ServiceController.getServicesByUser)
router.get('/:id',ServiceController.getServicesById)
router.post('/contract',ServiceController.contract)



module.exports = router