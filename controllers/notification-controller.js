const { request, response } = require("express");
const NotificationModel = require('../models/notification')

const NotificationController = {
    getNotificationsById : async (req, request, res = response) => {
        try {
            const {id} = req.params

            const notifications = await NotificationModel.find({
                send: id
            })

            if(notifications == null){
                return res.status(200).json({
                    msg: 'Este usuario no tiene notificaciones',
                    error: true
                })
            }

            return res.status(200).json({
                msg: 'Notificaciones encontradas con exito',
                error: false,
                data: notifications
            })
            
        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true
            })
        }
    }
}

module.exports = NotificationController