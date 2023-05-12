const {request , response} = require('express')
const PropertyModel = require('../models/property')
const { uploadFile } = require('../services/s3')

const PropertyController = {
    create: async (req = request, res = response) => {
        try {
            const property = req.body

            const nameImage = property.name + property.owner
            const responseImage = await uploadFile(req.files.image, nameImage)

            const newProperty = {
                ...property,
                image:nameImage
            }

            const propertyCreated = await PropertyModel.create(newProperty)

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
    },

    delete: async (req = request, res = response) => {
        try {
            const {id} = req.params

            const deleteProperty = await PropertyModel.findByIdAndDelete(id)

            if(!deleteProperty){
                return res.status(200).json({
                    msg: 'Error al eliminar la propiedad',
                    error: true
                })
            }

            return res.status(200).json({
                msg: 'La propiedad se ha eliminado con exito',
                error: false,
                data: deleteProperty
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true,
            })
        }
    },

    getPropertiesByUser: async (req = request, res = response) => {
        try {

            const {id} = req.params

            const propertiesFound = await PropertyModel.find({
                owner: id
            })

            if(!propertiesFound){
                return res.status(200).json({
                    msg: 'No hay propiedades creadas',
                    error: true
                })
            }

            return res.status(200).json({
                msg: 'Propiedades traidas con exito',
                error: false,
                data: propertiesFound
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true
            })
        }
    }
}

module.exports = PropertyController