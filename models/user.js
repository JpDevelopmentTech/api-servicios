const moongose = require('mongoose')

const UserSchema = new moongose.Schema({
    name:{
        type: String,
        required: true
    },
    first_surname:{
        type: String,
        required: true
    },
    second_surname:{
        type: String,
        required: true
    },
    
    num_identification:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    status:{
        type: String,
        default: 'ACTIVE'
    },
    telephone: {
        type: String,
        required: true
    },
},
{
    timestamps: true
})

module.exports = moongose.model('User', UserSchema)