const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { secret } = require('../config/security.json');
const controller = {};

controller.login = async (email, senha) => {
    //try{
        const usuario = await Usuario.findOne({ where : { email } });

        if (usuario.senha != senha) return false;

        return jwt.sign({ id: usuario.id }, secret, {
            expiresIn: '24h'
        });
   // }catch ( error ) {
        //console.log(error);
        //throw new Error( error);
    //}
};

controller.list = async (id = null) => {
    let result = [];

    if(id) {
        result = await Usuario.findByPk(id);
    } else {
        result = await Usuario.findAll();
    }
    return result;
};

controller.save = async (usuario) => {
    return await Usuario.create(usuario);
};


controller.edit = async (id, usuario) =>{
   return await Usuario.update(usuario, {
       where: { id },
   });
};


controller.remove = async (id) =>{
    return await Usuario.destroy( { where: { id } });
}

module.exports = controller;
