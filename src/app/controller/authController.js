const express = require("express");
const { route } = require("express/lib/application");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../config/auth.json");
const mailer = require("../../modules/mailer");

const crypto = require("crypto");

const User = require("../models/Usuario");
const Projeto = require("../models/Projeto");

const router = express.Router();

//Gerador de token
function generatorToken(params = {}) {
  return jwt.sign(params, auth.secret, {
    expiresIn: 86400,
  });
}

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
      return resp.status(400).send({
        error: "Já existe usuario com este email!",
        data: { userAlredy },
      });
    }
    const { senha } = req.body;
    //cripto da senha
    const hash = await bcrypt.hash(senha, 10);
    req.body.senha = hash;
    //Cria o usuario no banco de dados
    const user = await User.create(req.body);
    //Remove senha do retorno
    user.senha = undefined;
    //Retorno da API
    return resp.send({ user, token: generatorToken({ id: user.id }) });
  } catch (error) {
    //Falha de Cadastro
    console.log(error);
    return resp.status(400).send({ error: "Falha no registro " });
  }
});

//Rota de autenticação
router.post("/authenticate", async (req, resp) => {
  const { email, senha } = req.body;
  //Verifica se já existe cadastro
  const userAlredy = await User.findOne({ where: { email: email }, include: Projeto});
  if (!userAlredy || !(await bcrypt.compare(senha, userAlredy.senha))) {
    return resp.status(400).send("Corrija senha e/ou email!");
  }

  //Remove senha
  userAlredy.senha = undefined;

  resp.send({ userAlredy, token: generatorToken({ id: userAlredy.id }) });
});

//Esqueci minha senha
router.post("/forgot_pass", async (req, resp) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ where: { email: email } });
    //Usuario nao encotrado
    if (!user) {
      return resp.send({ error: "Usuario não encontrado!!" });
    }
    //Token de Atualização de senha
    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();

    now.setHours(now.getHours() + 1);

    //Operação no BD
    await User.update(
      { passwordResetToken: token, passwordResetExpires: now },
      { where: { id: user.id } }
    );

    console.log(token, now);

    mailer.sendMail(
      {
        to: email,
        from: "marcelo_vansovski@hotmail.com",
        template: "auth/authforgot",
        subject: "Recuperação de Senha",
        context: { token },
      },
      (err) => {
        if (err) {
          return resp.status(400).send({ error: "Erro ao enviar email!" });
        }

        return resp.status(200).send({ ok: "Novo token enviado" });
      }
    );
  } catch (error) {
    resp.status(400);
  }
});

//Resetar Senha
router.post("/resetPass", async (req, resp) => {
  //Desestruturação
  const { email, token, senha } = req.body;

  try {
    //Obtem o usuário
    const user = await User.findOne({
      where: { email: email },
      attributes: ["passwordResetToken", "passwordResetExpires"],
    });

    if (!user) {
      return resp.status(400).send({ message: "Usuario não existe!" });
    }

    if (token !== user.passwordResetToken) {
      return resp.status(400).send({ message: "Token Invalido!" });
    }

    const now = new Date();

    if (now > user.passwordResetExpires) {
      return resp.status(400).send({ message: "Token Expirado!" });
    }

    //cripto da senha
    const hash = await bcrypt.hash(senha, 10);

    //Operação no BD
    await User.update({ senha: hash }, { where: { email: email } });
    return resp.status(200).send(user);
  } catch (error) {
    console.log(error);
    resp.status(400).send({ error: "Erro ao Resetar senha!!" });
  }
});

module.exports = (app) => app.use("/auth", router);
