const moongose = require('mongoose')

const AffiliateSchema = new moongose.Schema({
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
        required: true,
        unique: true    },
    country_work:{
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String, 
        required: true
    },
    status:{
        type: String,
        default: 'ACTIVE'
    },
    jobs: {
        type: Array,
        required: true
    },
    calificate: {
        type: Number,
        default: 0
    },
    
},
{
    timestamps: true
})

module.exports = moongose.model('Affiliate', AffiliateSchema)