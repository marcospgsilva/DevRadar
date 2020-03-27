const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb+srv://mpdev:021113@cluster0-shwpf.mongodb.net/devradar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)


// Metodos HTTP: GET, POST, PUT, DELETE

// TIPOS DE PARÂMETROS:

// QUERY PARAMS: req.query (filtros, ordenação, paginação)
// ROUTE PARAMS: req.params (idenfificar um recurso na alteração ou remoção)
// BODY: req.body (Dados para criação ou alteração de um registro)