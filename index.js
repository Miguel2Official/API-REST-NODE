
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


app.use(express.json());

const empleados = [
    { id: 1, nombre: 'Juan', cedula: '12345', edad: 30, telefono: '123-456-7890', eps: 'EPS1' },
    { id: 2, nombre: 'María', cedula: '54321', edad: 25, telefono: '987-654-3210', eps: 'EPS2' },
    { id: 3, nombre: 'Pedro', cedula: '67890', edad: 35, telefono: '555-555-5555', eps: 'EPS3' },
];

app.get('/', (req, res) => {
    res.send('Mi Node.js API');
});

app.get('/api/empleados', (req, res) => {
    res.send(empleados);
});

app.get('/api/empleados/:id', (req, res) => {
    const empleado = empleados.find(e => e.id === parseInt(req.params.id));
    if (!empleado) return res.status(404).send('Empleado no encontrado');
    else res.send(empleado);
});

app.post('/api/empleados', (req, res) => {
    const empleado = {
        id: empleados.length + 1,
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        edad: parseInt(req.body.edad),
        telefono: req.body.telefono,
        eps: req.body.eps
    };

    empleados.push(empleado);
    res.send(empleado);
});

app.delete('/api/empleados/:id', (req, res) => {
    const empleado = empleados.find(e => e.id === parseInt(req.params.id));
    if (!empleado) return res.status(404).send('Empleado no encontrado');

    const index = empleados.indexOf(empleado);
    empleados.splice(index, 1);
    
    res.sendStatus(204); 
});

const puerto = process.env.PUERTO || 80;
app.listen(puerto, () => {
    console.log('Escuchando en el puerto:', puerto);
});

