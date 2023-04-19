const NotificationModel = require('../models/notification')

const NotificationService = {
    sendNotification : async (idSend, title, redirect, type ) => {
        try {
            const notification = await NotificationModel.create({
                title,
                redirect,
                send: idSend,
                type: type
            })

            if(notification  == null){
                return false
            }

            return true


        } catch (error) {
            return false
        }
    }
}

module.exports = NotificationService