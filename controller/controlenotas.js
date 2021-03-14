const { Nota } = require('../models');
const controller = {};

controller.list = async (id = null) => {
    let result = [];

    if(id) {
        result = await Nota.findByPk(id);
        
    } else {
        result = await Nota.findAll();
    }
    return result;
};

controller.save = async (nota) => {
    return await Nota.create(nota);
};


controller.edit = async (id, nota) =>{
   return await Nota.update(nota, {
       where: { id },
   });
};


controller.remove = async (id) =>{
    return await Nota.destroy( { where: { id } });
}


module.exports = controller;
