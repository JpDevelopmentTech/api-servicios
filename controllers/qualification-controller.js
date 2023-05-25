const { request, response } = require('express')
const QualificationModel = require('../models/qualification')

const QualificationController = {
    create: async (req = request, res = response) => {
        try {
            const qualification = req.body
            const qualificationCreated = await QualificationModel.create(qualification)
            if(!qualificationCreated){
                return res.status(200).json({
                    msg: 'Error al crear la calificacion',
                    error: true
                })
            }

            return res.status(200).json({
                msg: 'La calificacion ha sido creada con exito',
                error: false,
                data: qualificationCreated
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true
            })
        }
    }
}

module.exports = QualificationController