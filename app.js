var path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, 'environments', process.env.NODE_ENV.trim() + '.env')
})
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DB_URI).then(() => {
    console.log('----> CONEXION EXITOSA A LA BASE DE DATOS DE SERVICIOS DOMESTICOS')
}).catch(error => {
    console.log('ERROR CONECTANDOSE EN LA BASE DE DATOS MOTIVO ----> ', error)
})

var app = express();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/user', require('./routes/user'))
app.use('/api/affiliate', require('./routes/affiliate'))
app.use('/api/service', require('./routes/service'))
app.use('/api/property', require('./routes/property'))
app.use('/api/notification', require('./routes/notification'))
app.use('/api/qualification', require('./routes/qualification'))


module.exports = app;
