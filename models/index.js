const { Sequelize, DataTypes } = require ('sequelize');
const _Usuario = require('./modelousuario');
const _Nota = require('./modelonotas');
const _Tag = require('./modelotag');
const _CheckList = require('./modelochecklist');
const database = {};

const options = {
    username: 'postgres',
    password: '11092014',
    database: 'notas',
    host: 'localhost',
    dialect: 'postgres'
};

const sequelize = new Sequelize(options);
sequelize
    .authenticate()
    .then(() => console.log(`Conectado com o banco de dados ${options.database} realizada com sucesso!`))
    .catch((err) => console.log(`Falha ao conectar ao banco ${options.database}: ${err}`));

    let Usuario = _Usuario(sequelize, DataTypes);   
    let Nota = _Nota(sequelize, DataTypes);
    let Tag = _Tag(sequelize, DataTypes);
    let CheckList = _CheckList(sequelize, DataTypes);

    database['Usuario'] = Usuario;
    database['Nota'] = Nota;
    database['Tag'] = Tag;
    database['CheckList'] = CheckList;

    for(const key in database){
        if(database[key].associate) database[key].associate(database);
    }

    

database.sequelize = sequelize;

module.exports = database;