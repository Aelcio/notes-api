//const express = require('express');
//const router = express.Router();

const { Router } = require('express');
const router = Router();
const controller = require('../controller/controlenotas');
const controllerNota = require('../controller/controlenotas');
const { Nota } = require('../models');

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const nota = await controllerNota.getById(id);

    res.send(nota);
});

router.get('/usuario/:usuarioId', async(req, res) => {      
    const { usuarioId} = req.params;
    const { tag } = req.query;

    const notas = await controllerNota.getByUsuarioId(usuarioId, tag);

    res.send(notas || [] );
});



router.post('/', async (req, res) => {
    try{
        const { body } = req;

        const nota =  await controllerNota.save(body);
  
        res.send(nota);    
       
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
    } catch (error) {
        res.status(500).send({ error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await controller.remove(id);

        res.send(`Nota ${ id } excluída com sucesso! `)

    } catch ( error ) {
        res.status(500).send({ error });
    }
});

module.exports = router;