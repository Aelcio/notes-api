const database = require(".");

module.exports = (sequelize, DataTypes) => {
    const Checklist = sequelize.define (
        'checklist',
        {
            id: {
                type: DataTypes.INTEGER,
                    allowNull : false,
                    primaryKey: true,
                    autoIncrement: true
    
            },
            notaId: {
                type: DataTypes.INTEGER,
                allowNull: false

            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false

            },
            concluida: {
                type: DataTypes.INTEGER,
                allowNull: 1
            }
        },
        {
            tableName: 'checklist',
            timestamps: false
        }       
    )

    //Checklist.belongsTo(Nota, { as: 'nota', foreignKey: 'notaId' });

    //database = (Checklist);

    Checklist.associate = function(models) {
        this.belongsTo(models.Nota, {foreignKey: 'notaId'});
    }
    
    return Checklist;
};