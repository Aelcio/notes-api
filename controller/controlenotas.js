const { Nota, CheckList, Tag, sequelize } = require('../models');
const controller = {};

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

    if (tagName) {
        where = { nome: tagName };
        required = true;
    }

    return await Nota.findAll({
        where: {
            usuarioId
        },
        include: [
            {
                model: CheckList,
            },
            {
                model: Tag,
                where,
                required,
                
            },
        ]
    });
};

controller.save = async ({ usuarioId, titulo = null, descricao = null, checklists = [], tags = [] }) => {
    const transaction = await sequelize.transaction();

    //try {
        let { dataValues } = await Nota.create(
            {
                usuarioId,
                titulo,
                descricao,
            },
            {
                transaction,
            });

        let notaSalva = dataValues;

        const checklistsSalvos = [];

        if (checklists.length > 0) {
            for (let checklist of checklists) {

                checklist['notaId'] = notaSalva.id;

                const checklistSalvo = await CheckList.create(checklist, {
                    transaction,
                });

                checklistsSalvos.push(checklistSalvo);
            }
        }

        const tagSalvas = [];

        if (tags.length > 0) {
            for (let tag of tags) {

                tag['notaId'] = notaSalva.id;

                const tagSalva = await Tag.create(tag, {
                    transaction,
                });

                tagSalvas.push(tagSalva);
            }
        }

        notaSalva = { ...notaSalva, checklists: checklistsSalvos, tags: tagSalvas };
        console.log(notaSalva)
        await transaction.commit();

        return notaSalva;
    //} catch (error) {
        //await transaction.rollback();
    //}
};

//----------------------- Desafio PUT -------------------------------
// controller.edit = async (usuarioId, notaid, nota) => {

//     try {
//         controller.edit = async (usuarioId, id, { titulo = null, descricao = null, notas }) => {

//             const notaAtu = await Nota.update({ titulo, descricao }, {
//                 where: { usuarioId, id }
//             })

//         }
//     } catch (error) {
//         throw new (error);
//     }
// }
//--------------------------------------------------------------------

controller.edit = async ({ usuarioId, titulo = null, descricao = null, checklists = [], tags = [] }, id) => {
    const transaction = await sequelize.transaction();
  
    //try {
      await Nota.update(
        {
          usuarioId,
          titulo,
          descricao,
        },
        {
          where: { id },
          transaction,
        }
      );
  
      let { dataValues } = await Nota.findOne({ where: { id }, transaction });
      notaSalva = dataValues;
  
      let checklistsSalvos = [];
  
      if (checklists.length > 0) {
        for (let checklist of checklists) {
          checklist = { ...checklist, notaId: id };
          let checklistSalvo;
  
          if (checklist.id) {
            checklistSalvo = Object.assign({}, checklist);
  
            const checklistId = checklist.id;
            delete checklist.id;
  
            await CheckList.update(checklist, {
              where: {
                id: checklistId,
              },
              transaction,
            });
          } else {
            checklistSalvo = await Checklist.create(checklist, {
              transaction,
            });
          }
  
          checklistsSalvos.push(checklistSalvo);
        }
      }
  
      let tagsSalvas = [];
  
      if (tags.length > 0) {
        for (let tag of tags) {
          tag = { ...tag, notaId: id };
          let tagSalva;
  
          if (tag.id) {
            tagSalva = Object.assign({}, tag);
  
            const tagId = tag.id;
            delete tag.id;
  
            tagSalva = await Tag.update(tag, {
              where: {
                id: tagId,
              },
              transaction,
            });
          } else {
            tagSalva = await Tag.create(tag, {
              transaction,
            });
          }
  
          tagsSalvas = [...tagsSalvas, tagSalva];
        }
      }
  
      notaSalva = { ...notaSalva, checklists: checklistsSalvos, tags: tagsSalvas };
  
      console.log(notaSalva);
  
      await transaction.commit();
  
      return notaSalva;
   /// } catch (error) {
      //console.log(error);
      //await transaction.rollback();
    //}
  };

controller.remove = async (id) => {
    return await Nota.destroy({ where: { id } });
}


module.exports = controller;
