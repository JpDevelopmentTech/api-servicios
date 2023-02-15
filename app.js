require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DB_URI).then(() => {
    console.log('----> CONEXION EXITOSA A LA BASE DE DATOS DE SERVICIOS DOMESTICOS')
}).catch(error => {
    console.log('ERROR CONECTANDOSE EN LA BASE DE DATOS MOTIVO ----> ', error)
})

var app = express();

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


module.exports = app;
