const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.send('Consultando Tag');
});

router.post('/', function(req, res){
    res.send('Incluindo Tag');
});

router.put('/', function(req, res){
    res.send('Atualizando Tag');
});

router.delete('/', function(req, res){
    res.send('Deletando Tag');
});

module.exports = router;
