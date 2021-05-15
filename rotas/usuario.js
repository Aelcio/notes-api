//const express = require('express');
//const router = express.Router();

const { Router } = require('express');
const jwt = require('jsonwebtoken');

const router = Router();
//const controller = require('../controller/controleusuario');
const controller = require('../controller/default')
const conectabd = require('../models/');
const { Usuario } = require('../models')

router.get('/', async (req, res) => {
    const { token } = req;

    const { id } = jwt.decode(token);

    const usuarios = await controller.getById(Usuario, id);

    res.send(usuarios);
});

router.post('/', async (req, res) => {
    try{
        const { body } = req;

        const usuario =  await controller.save(Usuario, body);
  
        res.send(usuario);    
        console.log(req.body);
    } catch (error) {
        res.status(500).send({ error });
    }

});

router.put('/', async (req, res) => {
    try {
        const { body, token } = req;

        const { id } = jwt.decode(token);
        
        const usuario = await controller.edit(Usuario, body, id);

        res.send(usuario);
    } catch (error) {
        res.status(500).send({ error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await controller.remove(id);

        res.send(`Usuário ${ id } excluído com sucesso! `)

    } catch ( errro ) {
        res.status(500).send({ error });
    }
});



module.exports = router;