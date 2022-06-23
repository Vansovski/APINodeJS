//Rotas
const express = require("express");
//Json
const bodyParse = require("body-parser");
//Banco de Dados
const db = require("./dataBase/index");
//Sequelize
const seq = require("./dataBase/seq");

//Models
const Usuario = require("./app/models/Usuario");
const Projeto = require('./app/models/Projeto');
const Tarefa = require('./app/models/Tarefa');

//Instacia do express
const app = express();

//Parametrização do Json
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

//Passando app para todos Controller
require('./app/controller/index')(app);

//Porta de escuta
let PORTA = 3030;

//Run do Servidor
app.listen(PORTA, () => {
  console.log("Servidor vivo %PORT%".replace("%PORT%", PORTA));
});

//EndPoint 
app.get("/", (req, resp) => {
  resp.json({"saida":"OK"});
});