const { CheckList } = require('../models');
const controller = {};

controller.list = async (id = null) => {
    let result = [];

    if(id) {
        result = await CheckList.findByPk(id);
    } else {
        result = await CheckList.findAll();
    }
    return result;
};

controller.save = async (checklist) => {
    return await CheckList.create(checklist);
};


controller.edit = async (id, checklist) =>{
   return await CheckList.update(checklist, {
       where: { id },
   });
};


controller.remove = async (id) =>{
    return await CheckList.destroy( { where: { id } });
}

module.exports = controller;