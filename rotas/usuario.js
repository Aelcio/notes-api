const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.json([{
        nome: 'Aelcio',
        email: 'aelciosrmacedo@gmail.com'
    }]);
});

router.post('/', function(req, res){
    res.send('Incluindo usuário');
});

router.put('/', function(req, res){
    res.send('Atualizando usuário');
});

router.delete('/', function(req, res){
    res.send('Deletando usuário');
});

module.exports = router;