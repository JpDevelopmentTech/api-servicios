const moongose = require('mongoose')

const PropertySchema = new moongose.Schema({
    title:{
        type: String,
        required: true
    },
    state: {

    },

    
},
{
    timestamps: true
})

module.exports = moongose.model('Property', PropertySchema)