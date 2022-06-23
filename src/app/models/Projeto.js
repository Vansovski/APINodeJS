//Banco de Dados
const db = require("../../dataBase/seq");
const Sequelize = require('sequelize');
const User = require('./Usuario');


//Modelo Projeto
const Projeto = db.define('projeto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        require: true
    },
   descricao:{
       type: Sequelize.STRING,
       allowNull: true
   },
   dataInit:{
       type: Sequelize.DATE,
       allowNull: true
   },
   dataFim:{
    type: Sequelize.DATE,
    allowNull: true
   }
});


User.hasMany(Projeto);

Projeto.belongsTo(User);



    //Criação da tabela
Projeto.sync({force: true});


module.exports = Projeto;
