const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { nuevoCurso, getCursos, editCurso, deleteCurso } = require('./query')



app.listen(3000, () => console.log('Server on'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

// recibe los datos por body para ingresar un nuevo curso
app.post('/curso', async (req, res) =>{
    const { nombre, nivelTecnico, fechaInicio, duracion}  = req.body
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion)

    res.send(respuesta)
})

// envia los datos para ser vistos en la tabla
app.get('/cursos', async (req, res) =>{
     const respuesta = await getCursos();
     res.send(respuesta)
})

// actualización un dato en la base de datos 
app.put('/curso', async(req, res) =>{
    const { id, nombre, nivelTecnico, fechaInicio, duracion }  = req.body

    const respuesta = await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion)
    res.send(respuesta)
})

// elimina un registro de la base de datos 
app.delete('/curso/:id', async (req, res) =>{
    const { id } = req.params;
    const respuesta = await deleteCurso(id)
    respuesta > 0 
    ? res.send(`El curso con id ${id} fue elimminado con exito`)
    : res.send(`No existe un curso registrado con ese id`)
})