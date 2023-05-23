var express = require('express')
var router = express.Router()
const QualificationController = require('../controllers/qualification-controller')

router.post('/',  QualificationController.create ) 
module.exports = router