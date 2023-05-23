const moongose = require('mongoose')

const CualificationSchema = new moongose.Schema({
    to: {
        type: moongose.Types.ObjectId,
        required: true
    },
    message: {
        type: Text,
        required: true
    },
    qualification: {
        type: Number,
        required: true
    },
    from: {
        type: moongose.Types.ObjectId,
        required: true
    }
    
},
{
    timestamps: true
})

module.exports = moongose.model('Cualification', CualificationSchema)