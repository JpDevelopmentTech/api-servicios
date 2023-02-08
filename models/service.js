const moongose = require('mongoose')


const ServiceSchema = new moongose.Schema({
    property: {
        type: moongose.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    jobs:{
        type: Array,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
       type: moongose.Types.ObjectId,
       required: true,
       ref: 'User'
    },
    status: {
        type: String,
        default: 'POSTULATE'
    },
    date: {
        type: String,
        required: true
    },
    postulates: {
        type: Array,
        default: [],
        ref: 'Affiliate'
    }

},
{
    timestamps: true
})

module.exports = moongose.model('Service', ServiceSchema)