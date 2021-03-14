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
    return Nota;
};
