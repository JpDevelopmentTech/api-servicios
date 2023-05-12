var express = require('express')
var router = express.Router()
const PropertyController = require('../controllers/property-controller')
const verifyToken = require('../middlewares/auth')

router.post('/', PropertyController.create)
router.get('/user/:id', PropertyController.getPropertiesByUser)
router.delete('/:id', PropertyController.delete)

module.exports = router