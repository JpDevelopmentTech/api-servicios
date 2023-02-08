const {request, response} = require('express')
const AffiliateModel = require('../models/affiliate')
const bcrypt = require('bcrypt')

const AffiliateController = {
    create: async (req =  request, res = response) => {
        try {
            const affiliate = req.body

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(affiliate.password, salt)


            const affiliateCreate = await AffiliateModel.create({
                name: affiliate.name,
                first_surname: affiliate.first_surname,
                second_surname: affiliate.second_surname,
                num_identification: affiliate.num_identification,
                email: affiliate.email,
                country_work:affiliate.country_work,
                department: affiliate.department,
                address: affiliate.address,
                telephone: affiliate.telephone,
                age: affiliate.age,
                jobs: affiliate.jobs,
                password: hash,
            })

            if(!affiliateCreate){
                return res.status(200).json({
                    msg:'Error al crear un afiliado',
                    error: true
                })
            }

            return res.status(200).json({
                msg:'Afiliado creado con exito',
                error: false,
                data: affiliateCreate
            })

        } catch (error) {
            return res.status(500).json({
                msg:'Error en el servidor ' + error,
                error: true
            })
        }
    }
}

module.exports = AffiliateController