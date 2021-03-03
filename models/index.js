const { Sequelize } = require ('sequelize');
const database = {};

const options = {
    username: 'postgres',
    password: '11092014',
    database: 'notes',
    host: 'localhost',
    dialect: 'postgres'
};

const sequelize = new Sequelize(options);
sequelize
    .authenticate()
    .then(() => console.log(`Conectado com o banco de dados ${options.database} realizada com sucesso!`))
    .catch((err) => console.log(`Falha ao conectar ao banco ${options.database}: ${err}`));

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;