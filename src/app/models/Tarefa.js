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
   },
   completa:{
       type: Sequelize.BOOLEAN,
       default: false
   }

});


Projeto.hasMany(Tarefa,{onDelete: 'CASCADE'});
Tarefa.belongsTo(Projeto);

User.hasMany(Tarefa,{onDelete: 'CASCADE'});
Tarefa.belongsTo(User);



//Criação da tabela
Tarefa.sync({force: true});

module.exports = Tarefa;
