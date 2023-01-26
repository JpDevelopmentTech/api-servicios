var express = require('express')
var router = express.Router()
const UserController = require('../controllers/user-controller')
const auth = require('../middlewares/auth')
const verifySuperAdmin = require('../middlewares/verifySuperAdmin')

router.post('/', verifySuperAdmin, UserController.create )
router.post('/auth' , UserController.login )

module.exports = router