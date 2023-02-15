var express = require('express')
var router = express.Router()
const AffiliateController = require('../controllers/affiliate-controller')

router.post('/', AffiliateController.create)
router.post('/auth', AffiliateController.login)
router.get('/:id', AffiliateController.getAffiliateById)
module.exports = router