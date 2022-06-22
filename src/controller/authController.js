const express = require("express");
const { route } = require("express/lib/application");

const User = require("../Model/Usuario");

const router = express.Router();


//Criação de Usuario
router.post("/register", async (req, resp) => {
  try {
    const user = await User.create(req.body);
    return resp.send({ user });
  } catch (error) {
    console.log(error);
    return resp.status(400).send({error: 'Falha no registro '});
  }
});


module.exports = app => app.use('/auth', router)
