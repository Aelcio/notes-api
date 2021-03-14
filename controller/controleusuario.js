const { Usuario } = require('../models');
const controller = {};

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
