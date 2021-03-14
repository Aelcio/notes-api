//const express = require('express');
//const router = express.Router();

const { Router } = require('express');
const router = Router();
const controller = require('../controller/controleusuario');
const conectabd = require('../models/');

router.get('/:id?', async (req, res) => {
    const { id } = req.params;

    const usuarios = await controller.list(id);

    res.send(usuarios);
});

router.post('/', async (req, res) => {
    try{
        const { body } = req;

        const usuario =  await controller.save(body);
  
        res.send(usuario);    
        console.log(req.body);
    } catch (error) {
        res.status(500).send({ error });
    }

});

router.put('/:id', async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;

        await controller.edit(id, body);

        res.send(body);
    } catch (erro) {
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