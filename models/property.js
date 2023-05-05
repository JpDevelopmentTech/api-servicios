const moongose = require('mongoose')

const PropertySchema = new moongose.Schema({
    country:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    meters:{
        type: String,
        required: true
    },
    levels: {
        type: Number,
        required: true
    },
    owner: {
        type: moongose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

},
{
    timestamps: true
})

module.exports = moongose.model('Property', PropertySchema)