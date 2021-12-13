const express = require('express');
const Contenedor = require('./contenedor');

const app = express();
const PORT = process.env.PORT || 8080;
const contenedor = new Contenedor('./productos.txt');

//middlewares
app.use(express.json())
app.use(express.urlencoded())


//rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la tienda de productos');
});

app.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll();
    res.json(productos);
});

app.get('/productoRandom', async (req, res) => {
    const productos = await contenedor.getAll();
    const producto = productos[Math.floor(Math.random() * productos.length)];
    res.json(producto);
});


const connectedServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

connectedServer.on('error', (err) => {
   console.log(err); 
});
