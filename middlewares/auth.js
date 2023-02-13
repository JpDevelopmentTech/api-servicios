const jwt = require('jsonwebtoken')
const {request, response } = require('express')

const verifyToken = (req = request, res = response, next  ) => {
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
        next()
    } catch (error) {
        return res.status(401).json({
            msg: 'Usuario no autorizado',
            error: true
        })
    }

}

module.exports = verifyToken 