const { Tag } = require("../models");
const controller = {};

controller.list = async (id = null) => {
    let result = [];

    if(id) {
        result = await Tag.findByPk(id);
    } else {
        result = await Tag.findAll();
    }
    return result;
};

controller.save = async (tag) => {
    return await Tag.create(tag);
};


controller.edit = async (id, tag) =>{
   return await Tag.update(tag, {
       where: { id },
   });
};


controller.remove = async (notaId, id) =>{
    try{
        return await Tag.destroy( 
            { where: { 
                notaId,
                id
            } 
        });
    } catch(error){
        throw new Error(error);
    }
}

module.exports = controller;