var express = require('express')
var router = express.Router()
const ServiceController = require('../controllers/service-controller')
const verifyToken = require('../middlewares/auth')

router.post('/', ServiceController.create)
router.get('/recommended/:id', ServiceController.getRecommendedServices)
router.post('/postulate', verifyToken ,ServiceController.postulateService)
router.get('/user/:id',ServiceController.getServicesByUser)
router.get('/:id',ServiceController.getServicesById)
router.get('/contractor/:id',ServiceController.getServicesByContractor)
router.post('/contract',ServiceController.contract)


//ENDPOINT PARA TRAER LOS SERVICIOS DEL AFILIADO


module.exports = router






