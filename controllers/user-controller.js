const UserModel = require('../models/user')
const PropertyModel = require('../models/property')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { request, response } = require('express')

const UserController = {
    create: async (req = request, res = response) => {

        try {


            const user = req.body

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(user.password, salt)


            const userCreate = await UserModel.create({
                name: user.name,
                first_surname: user.first_surname,
                second_surname: user.second_surname,
                num_identification: user.num_identification,
                email: user.email,
                telephone: user.telephone,
                password: hash,
            })


            if (!userCreate) {
                return res.json({
                    error: true,
                    msg: 'No se pudo crear el usuario'
                })
            }

            const propertyCreate = await PropertyModel.create({
                country: user.country,
                department: user.department,
                address: user.address,
                meters: user.meters,
                levels: user.levels,
                owner: userCreate._id,
                name: 'Propiedad principal'
            })


            if (!propertyCreate) {
                return res.json({
                    error: true,
                    msg: 'No se pudo crear la propiedad del usuario'
                })
            }

            return res.status(201).json({
                msg: 'Creado',
                data: {userCreate, propertyCreate},
                error: false
            })



        } catch (error) {
            return res.status(500).json({
                msg: 'Error en el servidor ' + error,
                error: true
            })
        }
    },

    login: async (req = request, res = response) => {
        try {
            const { email, password } = req.body

            const userFound = await UserModel.findOne({
                email: email
            })


            if (!userFound) {
                return res.status(200).json({
                    msg: 'Usuario no encontrado',
                    error: true
                })
            }

            const validateHash = bcrypt.compareSync(password, userFound.password)

            if (!validateHash) {
                return res.status(200).json({
                    msg: 'Contraseña incorrecta',
                    error: true
                })
            }

            const payload = {
                id: userFound._id
            }

            const options = {
                expiresIn: '3h'
            }

            const token = jwt.sign(payload, process.env.SECRET, options)

            return res.status(200).json({
                msg: 'Inicio de sesion correcto',
                data: {userFound, accessToken: token},
                error: false,

            })


        } catch (error) {

        }
    }
}

module.exports = UserController