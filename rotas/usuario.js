//const express = require('express');
//const router = express.Router();

const { Router } = require('express');
const router = Router();
const controller = require('../controller/controleusuario');
const conectabd = require('../models');

router.get('/', (req, res) => {
    const usuarios = controller.getUsuarios();

    res.send(usuarios);
});

router.post('/', (req, res) => {
    const usuarios = controller.postUsuarios();
    res.send(usuarios);
});

router.put('/', (req, res) => {
    const usuarios = controller.putUsuarios();
    res.send(usuarios);
});

router.delete('/', (req, res) => {
    const usuarios = controller.deleteUsuarios();
    res.send(usuarios);
});

module.exports = router;