const { request, response } = require('express')
const ServiceModel = require('../models/service')
const AffiliateModel = require('../models/affiliate')
const { default: mongoose } = require('mongoose')


const ServiceController = {
    create: async (req = request, res = response) => {
        try {
            const service = req.body
            const serviceCreate = await ServiceModel.create(service)

            if (!serviceCreate) {
                return res.status(200).json({
                    msg: 'Error al crear el servicio ',
                    error: true
                })
            }

            return res.status(200).json({
                msg: 'Servicio postulado con exito',
                error: false,
                data: serviceCreate
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true
            })
        }
    },

    getRecommendedServices: async (req = request, res = response) => {
        try {
            const { id } = req.params

            const affiliateFound = await AffiliateModel.findById(id)

            if (!affiliateFound) {
                return res.status(200).json({
                    msg: 'Afiliado no encontrado',
                    error: true
                })
            }

            const jobsAfilliate = affiliateFound.jobs

            const serviceFound = await ServiceModel.find({
                jobs: {
                    $in: jobsAfilliate
                }
            }).populate(['property', 'owner'])


            return res.status(200).json({
                msg: 'Servicios recomendados traidos exitosamente ',
                error: false,
                data: serviceFound
            })

        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true
            })
        }
    },

    postulateService: async (req = request, res = response) => {
        try {
            const { id } = req.body

            const serviceFound = await ServiceModel.findOneAndUpdate({
                _id: id
            }, {
                $push: {
                    postulates: mongoose.Types.ObjectId(req.id)
                }
            },
                {
                    new: true
                }
            )

            if (!serviceFound) {
                return res.status(200).json({
                    msg: 'No se pudo hacer la postulacion al servicio',
                    error: true,
                })
            }

            return res.status(200).json({
                msg: 'El usuario se ha postulado exitosamente',
                error: false,
                data: serviceFound
            })

        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true,
            })
        }
    },

    getServicesByUser:  async (req = request, res = response) => {
        try {
            const {id} = req.params

            const servicesFound = await ServiceModel.find({
                owner: id
            }).populate('property')

            if(!servicesFound){
                return res.status(200).json({
                    msg: 'No hay servicios creados por el usuario',
                    error: true,
                })
            }

            return res.status(200).json({
                msg: 'Servicios traidos con exito',
                error: false,
                data: servicesFound
            })

        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true,
            })
        }
    },

    getServicesById: async (req = request, res = response) => {
        try {
            const {id} = req.params

            const serviceFound = await ServiceModel.findById(id).populate('postulates')

            if(!serviceFound){
                return res.status(200).json({
                    msg: 'No se encuentra el servicio',
                    error: true,
                })
            }

            return res.status(200).json({
                msg: 'Servicio encontrado con exito',
                error: false,
                data: serviceFound
            })

        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true,
            })
        }
    }
}

module.exports = ServiceController