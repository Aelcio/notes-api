const { Nota, CheckList, Tag, sequelize } = require('../models');
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

controller.save = async ({ usuarioId, titulo = null, descricao = null, checklists = [], tags = [] }) => {
    const transaction = await sequelize.transaction();

    try {
        let { dataValues }= await Nota.create(
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
                //checklist = { ...checklist, notaId: notaSalva.id };

                checklist[ 'notaId'] = notaSalva.id;

                const checklistSalvo = await CheckList.create(checklist, {
                    transaction,
                });

                checklistsSalvos.push(checklistSalvo);
            }
        }

        const tagSalvas = [];

        if (tags.length > 0) {
            for (let tag of tags) {

                //tag = { ...tag, notaId: notaSalva.id };

                tag[ 'notaId'] = notaSalva.id;

                const tagSalva = await Tag.create(tag, {
                    transaction,
                });

                tagSalvas.push(tagSalva);
            }
        }

        notaSalva = { ...notaSalva, checklists: checklistsSalvos, tags: tagSalvas };

        await transaction.commit();

        return notaSalva;
    } catch (error) {
        await transaction.rollback();
    }
};


controller.edit = async (id, nota) => {
    return await Nota.update(nota, {
        where: { id },
    });
};


controller.remove = async (id) => {
    return await Nota.destroy({ where: { id } });
}


module.exports = controller;
