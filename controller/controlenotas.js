const { Nota, CheckList, Tag, sequelize} = require('../models');
const controller = {};

/*controller.list = async (id = null) => {
    let result = [];

    if(id) {
        result = await Nota.findByPk(id);
        
    } else {
        result = await Nota.findAll();   
    }
    return result;
};*/

controller.getById = async (id) => { 
    return await Nota.findOne({
        where: {
            id,
        },
        include: [
            {
                model: CheckList,
                //as: 'checklists',
            },   
            {
                model: Tag,   
                //as: 'tags',
            },
        ]
    });
};

controller.getByUsuarioId = async (usuarioId, tagName = null) => {  
    let where = null;
    let required = false;

     if( tagName ) {
        where = { nome: tagName};
        required = true;
     }
    
    return await Nota.findAll({
        where: {
            usuarioId
        },
        include: [
            {
                model: CheckList,
                //as: 'checklists',
            },   
            {
                model: Tag,   
                where,
                required, 
                //as: 'tags',
            },
        ]
    });
};

controller.save = async ({ usuarioId, titulo = null, descricao = null, checklists = [], tags = []}) => {
   const transaction = await sequelize.transaction();

    try{
        const notaSalva = await Nota.create({
            usuarioId,
            titulo,
            descricao,
         }, {
            transaction,
         });

         const checklistsSalvos = [];
         
         if(checklists > 0) {
         for(const checklist of checklists) {
             checklist = {...checklist, notaId: notaSalva.id};

             const checklistSalvo = await CheckList.create(checklist, {
                 transaction,
             });

             checklistsSalvos.push(checklistSalvo);
         }
        }
         
         const tagSalvas = [];
        if(tags > 0) {
         for(const tagt of tags) {
             tag = {...tag, notaId: notaSalva.id };  
            const tagSalva = await tag.create(tag, {
                transaction,
            });

            tagSalvas.push(tagSalva);  
         }    
        }

        notaSalva = { ...notaSalva, checklists: checklistsSalvos, tags: tagSalvas};
         
         await transaction.commit();   
        
         return notaSalva;
    } catch (error){
        await transaction.rollback();  
    }
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
