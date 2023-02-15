const {request , response} = require('express')
const PropertyModel = require('../models/property')

const PropertyController = {
    create: async (req = request, res = response) => {
        try {
            const property = req.body

            const propertyCreated = await PropertyModel.create(property)

            if(!propertyCreated){
                return res.status(200).json({
                    msg: 'La propiedad no pudo ser creada',
                    error: true,
                })
            }

            return res.status(200).json({
                msg: 'La propiedad ha sido creada con exito',
                error: false,
                data: propertyCreated
            })

        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: false
            })
        }
    }   
}

module.exports = PropertyController