var express = require('express')
var router = express.Router()
const AffiliateController = require('../controllers/affiliate-controller')

router.post('/', AffiliateController.create)

module.exports = router