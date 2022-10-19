const express = require("express");
require("dotenv").config();

const fs = require('fs');

const Contenedor = require('./entregable1310.js');

let cont = new Contenedor('./productos.txt');

const app = express();

app.get('/', (_req, res) => {

    res.send("Hola mundo");

});

app.get('/productos', async (_req, res) => {

    try {

        const allProducts = await cont.getAll();
        
        res.status(200).send( allProducts );

    } catch (error) {
        
        res.status(500).json({

            success: false,
            error: error.message

        });

    }

});

app.get('/productoRandom', async (_req, res) => {

    try {

        const allProducts = await cont.getAll();
        
        const randomNum = Math.floor(Math.random() * ( allProducts.length ));

        res.status(200).send( allProducts[ randomNum ] );

    } catch (error) {
        
        res.status(500).json({

            success: false,
            error: error.message

        });

    }

});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {

    console.info( `Server up on port ${PORT}` );

});

server.on('error', error => console.error(error));