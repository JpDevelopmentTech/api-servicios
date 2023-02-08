var express = require('express')
var router = express.Router()
const UserController = require('../controllers/user-controller')

router.post('/',  UserController.create )
router.post('/auth' , UserController.login )

module.exports = router