//Banco de Dados
const db = require("../../dataBase/seq");
const Sequelize = require('sequelize');
const Projeto = require('./Projeto');
const User = require('./Usuario');


//Modelo Tarefa
const Tarefa = db.define('tarefa', {
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


Projeto.hasMany(Tarefa);
Tarefa.belongsTo(Projeto);

User.hasMany(Tarefa);
Tarefa.belongsTo(User);



//Criação da tabela
Tarefa.sync({force: true});

module.exports = Projeto;
