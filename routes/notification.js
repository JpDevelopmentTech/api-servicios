var express = require('express')
var router = express.Router()
const NotificationController = require('../controllers/notification-controller')

router.get('/:id', NotificationController.getNotificationsById)
router.put('/:id', NotificationController.changeRead)

module.exports = router