const { Router } = require('express');
const router = Router();
const controller = require('../controller/controletag');

router.get('/:id?', async (req, res) => {
    const { id } = req.params;

    const tag = await controller.list(id);

    res.send(tag);
});

/*
router.post('/', async (req, res) => {
    try{
        const { body } = req;

        const tag =  await controller.save(body);
  
        res.send(tag);    
       
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

*/

router.delete('/:notaId/:id', async (req, res) => {
    try {
        const { notaId, id } = req.params;

        await controller.remove(notaId, id);

        res.send(`Tag ${ id } excluída com sucesso! `)

    } catch ( error ) {
        res.status(500).send({ error });
    }
});

module.exports = router;
