const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

const verifySuperAdmin = async (req, res, next) => {
    const token  = req.headers['authorization'].split(" ")[1]

    if(!token){
        return res.status(401).json({
            msg: 'No se envio ningun token',
            error: true
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.id = decoded.id

        const userFound = await UserModel.findById(req.id)

        if(!userFound){
            return res.status(404).json({
                msg: 'Usuario no encontrado',
                error: true
            })
        }

        if(userFound.rol != 'SUPER-ADMIN'){
            return res.status(401).json({
                msg: 'Usuario no autorizado',
                error: true
            })
        }else{
            next()
        }
    } catch (error) {
        return res.status(401).json({
            msg: 'Usuario no autorizado',
            error: true
        })
    }
}

module.exports = verifySuperAdmin