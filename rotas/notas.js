//const express = require('express');
//const router = express.Router();

const { Router } = require('express');
const router = Router();
const controller = require('../controller/controlenotas');

router.get('/', (req, res) => {
    const notas = controller.getNotas();

    res.send(notas);
});

router.post('/', (req, res) => {
    const notas = controller.postNotas();
    
    res.send(notas);
});

router.put('/', (req, res) => {
    const notas = controller.putNotas();
    
    res.send(notas);
});

router.delete('/', (req, res) => {
    const notas = controller.deleteNotas();
    
    res.send(notas);
});

module.exports = router;