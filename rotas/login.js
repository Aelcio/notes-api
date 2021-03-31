const { Router } = require('express');
const router = Router();
const { login } = require('../controller/controleusuario');

router.post('/', async (req, res) => {
    try{
        const { email, senha } = req.body;

        const token = await login(email, senha);

        if (token) {
            res.send({ token });
        } else {
            res.status(401).send( { error : 'Login ou Senha inválidos' });
        }  
    }catch (error){
        res.status(500).send( { error });
    }
});

module.exports = router;