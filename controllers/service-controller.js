const {request, response} = require('express')
const ServiceModel = require('../models/service')
const AffiliateModel = require('../models/affiliate')


const ServiceController = {
    create: async (req= request, res= response) => {
        try {
            const service = req.body
            const serviceCreate = await ServiceModel.create(service)

            if(!serviceCreate){
                return res.status(200).json({
                    msg:'Error al crear el servicio ',
                    error: true
                })
            }

            return res.status(200).json({
                msg:'Servicio postulado con exito',
                error: false,
                data: serviceCreate
            })
        } catch (error) {
            return res.status(500).json({
                msg:'Error en el servidor ' + error,
                error: true
            })
        }
    },

    getRecommendedServices:async  (req= request, res= response) => {
        try {
            const {id} = req.params

            const affiliateFound = await AffiliateModel.findById(id)

            if(!affiliateFound){
                return res.status(200).json({
                    msg:'Afiliado no encontrado',
                    error: true
                })
            }
            
            const jobsAfilliate = affiliateFound.jobs

            const serviceFound = await ServiceModel.find({
                jobs:{
                    $in: jobsAfilliate
                }
            }).populate(['property', 'owner'])
            

            return res.status(200).json({
                msg:'Servicios recomendados traidos exitosamente ',
                error: false,
                data: serviceFound
            })

        } catch (error) {
            return res.status(500).json({
                msg:'Error en el servidor ' + error,
                error: true
            })
        }
    }
}

module.exports = ServiceController