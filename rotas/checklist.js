const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.send('Consultando Checklist');
});

router.post('/', function(req, res){
    res.send('Incluindo Checklist');
});

router.put('/', function(req, res){
    res.send('Atualizando Checklist');
});

router.delete('/', function(req, res){
    res.send('Deletando Checklist');
});

module.exports = router;