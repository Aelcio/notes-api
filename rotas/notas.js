const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.send('Consultando Notas');
});

router.post('/', function(req, res){
    res.send('Incluindo Notas');
});

router.put('/', function(req, res){
    res.send('Atualizando Notas');
});

router.delete('/', function(req, res){
    res.send('Deletando Notas');
});

module.exports = router;