var express = require('express')
var router = express.Router()
const ServiceController = require('../controllers/service-controller')
const verifyToken = require('../middlewares/auth')

router.post('/', ServiceController.create)
router.get('/recommended/:id', ServiceController.getRecommendedServices)
//DATOS PARA ENVIAR
//:id = Id del afiliado
router.post('/postulate', verifyToken ,ServiceController.postulateService)
//DATOS PARA ENVIAR POR EL BODY
//id = id del afiliado
router.get('/user/:id',ServiceController.getServicesByUser)
router.get('/:id',ServiceController.getServicesById)
router.get('/contractor/:id',ServiceController.getServicesByContractor)
router.post('/contract',ServiceController.contract)
router.post('/start',ServiceController.start)
router.get('/picture/:name', ServiceController.getPictureService)
router.put('/service/:id/status/:status', ServiceController.changeStatus)


//ENDPOINT PARA TRAER LOS SERVICIOS DEL AFILIADO


module.exports = router






