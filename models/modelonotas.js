//const { CheckList } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Nota = sequelize.define(
        'nota',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull : false,
                primaryKey: true,
                autoIncrement: true
            },
            usuarioId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            titulo: {
                type: DataTypes.STRING,
                allowNull: true
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: true
            },
            criadoEm: {
                type: DataTypes.DATE,
                allowNull: false
            },
            atualizadoEm: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: 'nota',
            timestamps: false
        }        
    )

   // Nota.hasMany(CheckList, {as: 'checklists', foreignKey: 'notaId'});
    //Nota.hasMany(Tag, {as: 'tags', foreignKey: 'notaId'});
    //Nota.belongsTo(Usuario, {as: 'usuario', foreignKey: 'usuarioId'});

    Nota.associate = function(models) {
        this.hasMany(models.CheckList, {foreignKey: 'notaId'}); 
        this.hasMany(models.Tag, {foreignKey: 'notaId'});  
        this.belongsTo(models.Usuario, {foreignkey: 'usuarioId'});    
    }  
    
    return Nota;
};
