const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mundiale', 'tester', "1234", {
    host: 'localhost',
    dialect: 'postgres', // ou 'postgres' para PostgreSQL
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão ao MySQL estabelecida com sucesso.');
        await sequelize.sync();
        console.log("Tabelas criadas no banco")
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
