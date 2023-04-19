const moongose = require('mongoose')

const NotificationSchema = new moongose.Schema({
    title:{
        type: String,
        required: true
    },
    state: {
        type: String, 
        default: 'UNREAD'
    },
    send: {
        type: moongose.Types.ObjectId,
        required: true
    },
    redirect: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }

    
},
{
    timestamps: true
})

module.exports = moongose.model('Notification', NotificationSchema)