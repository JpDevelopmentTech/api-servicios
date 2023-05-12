const { request, response } = require('express')
const ServiceModel = require('../models/service')
const AffiliateModel = require('../models/affiliate')
const { default: mongoose } = require('mongoose')
const NotificationService = require('../services/sendNotification')
const notification = require('../models/notification')
const { getFileURL } = require('../services/s3')


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
                },
                status: 'POSTULATE'
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
            ).populate('owner')



            const title = 'Un nuevo afiliado ha sido postulado a tu servicio'
            const redirect = '/anna/myservices/' + serviceFound._id
            const type = 'postulate'

            const notification = await NotificationService.sendNotification(
                serviceFound.owner._id, title, redirect, type
            )

            console.log(notification)

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

    getPictureService: async (req = request, res = response) => {
        try {
            const { name } = req.params

            const response = await getFileURL(name)

            res.status(200).json({
                url: response
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true
            })
        }
    }, 

    getServicesById: async (req = request, res = response) => {
        try {
            const {id} = req.params

            const serviceFound = await ServiceModel.findById(id).populate(['postulates', 'property'])

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
    },

    getServicesByContractor: async (req = request, res =  response) => {
        try {
            const {id} = req.params

            const services = await ServiceModel.find({
                contractor: id 
            })

            if(services == null){
                return res.status(200).json({
                    msg: 'No hay servicios de este afiliado',
                    error: true
                })
            }
            
            return res.status(200).json({
                msg: 'Servicios traidos con exito',
                error: false,
                data: services
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor '+ error,
                error: true
            })
        }
    },
    start: async (req = request, res = response) => {
        try {
            const {idService} = req.body
            const service =  await ServiceModel.findByIdAndUpdate(idService,{
                status: 'IN CURSE'
            })
            if(!service){
                return res.status(200).json({
                    msg: 'No existe el servicio',
                    error: true
                })
            }

            return res.status(200).json({
                msg:'Servicio empezado con exito',
                error: false,
                data: service
            })
        } catch (error) {
            return res.status(200).json({
                msg: 'Error en el servidor '+ error,
                error: true
            })
        }
    },
    
    contract: async (req = request, res = response) =>{
        try {
            const {idAffiliate, idService} = req.body

            const affiliateFound = await AffiliateModel.findById(idAffiliate)
            if(!affiliateFound){
                return res.status(200).json({
                    msg: 'El afiliado no existe',
                    error: true
                })
            }

            const serviceFound = await ServiceModel.findOneAndUpdate({
                _id: idService
            },{
                contractor: idAffiliate,
                status: 'CONTRACT'
            }, 
            {
                new: true
            })

            const title = 'Has sido contratado para un servicio'
            const redirect = '/servicios'
            const type = 'contract'

            const notification = await NotificationService.sendNotification(
                idAffiliate, title, redirect, type
            )

            console.log(notification)

            if(!serviceFound){
                return res.status(200).json({
                    msg: 'El servicio no existe',
                    error: true
                })
            }

            return res.status(200).json({
                msg: 'Ha sido contratado el usuario con exito',
                data: serviceFound,
                error: false
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