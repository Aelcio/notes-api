const jwt = require('jsonwebtoken');
const { secret } = require('../config/security');

module.exports = (req, res, next ) => {
    const token = req.headers['x-access-token'];

    if(token) res.status(400).send({ erro : 'Token não informado'});

    jwt.verify(token, secret, (error, decode) => {
        if(error) return res.status(500).send(error);

        next();
    });
};