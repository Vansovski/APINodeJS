//Rotas
const express = require("express");
//Json
const bodyParse = require("body-parser");
//Banco de Dados
const db = require("./dataBase/index");
//Sequelize
const seq = require("./dataBase/seq");

//Models
const Usuario = require("./Model/Usuario");

//Instacia do express
const app = express();

//Parametrização do Json
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

require('./controller/authController')(app);


//Porta de escuta
let PORTA = 3000;

//Run do Servidor
app.listen(3000, () => {
  console.log("Servidor vivo %PORT%".replace("%PORT%", PORTA));
});

//EndPoint 
app.get("/", (req, resp) => {
  resp.json({"saida":"OK"});
});