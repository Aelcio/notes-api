const { Router } = require('express');

const router = Router();

const controller = require('../controller/default')
const conectabd = require('../models/');
const { Usuario } = require('../models')

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

module.exports = router;