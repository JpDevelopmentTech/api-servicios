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
        } catch (error) {

        }
    }
}

module.exports = QualificationController