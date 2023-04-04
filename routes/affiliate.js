var express = require('express')
var router = express.Router()
const AffiliateController = require('../controllers/affiliate-controller')

router.post('/', AffiliateController.create)
router.post('/auth', AffiliateController.login)
// DATOS PARA ENVIAR 
// body = email, password

router.get('/:id', AffiliateController.getAffiliateById)
// DATOS PARA ENVIAR 
// :id = Id del afiliado

module.exports = router


//BASE URL API = https://api-servicios-dev.up.railway.app/api/ + /{schema}/ + /{endpoint} (Se encuentran arriba)/

