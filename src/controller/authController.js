const express = require("express");
const { route } = require("express/lib/application");
const bcrypt = require('bcryptjs');

const User = require("../Model/Usuario");

const router = express.Router();

//Criação de Usuario
router.post("/register", async (req, resp) => {
  try {
    //Obtem email por desetruturação do body
    const { email } = req.body;
    //verifica se já existe email cadastrado
    const userAlredy = await User.findOne({ where: { email: email } });
    if (userAlredy === null) {
      console.log("Novo");
    } else {
      return resp.status(400).send({error:"Já existe usuario com este email!",
      data:{userAlredy}
    });
    }
    const {senha} = req.body;
    //cripto da senha 
    const hash = await bcrypt.hash(senha,10);
    req.body.senha = hash;
    //Cria o usuario no banco de dados
    const user = await User.create(req.body);
    //Remove senha do retorno
    //user.senha = undefined;
    //Retorno da API
    return resp.send({ user });
  } catch (error) {
    //Falha de Cadastro 
    console.log(error);
    return resp.status(400).send({ error: "Falha no registro " });
  }
});







module.exports = (app) => app.use("/auth", router);