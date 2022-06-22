//Banco de Dados
const db = require("../../dataBase/seq");
const Sequelize = require('sequelize');


//Modelo Usuario
const Usuario = db.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        require: true
    },
    email: {
        type: Sequelize.STRING,
        lowercase: true
    },
    senha: {
        type: Sequelize.STRING
    }
})

//Criação da tabela
Usuario.sync();

module.exports = Usuario;
