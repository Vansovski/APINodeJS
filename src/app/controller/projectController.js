const express = require('express');

const router = express.Router();

const autMiddleware = require('../middlewares/auth');

const Projeto = require('../models/Projeto');
const Tarefa = require('../models/Tarefa');

router.use(autMiddleware);

//Obter Projetos
router.get('/',(req, resp) => {
    resp.send({ok:true, Id: req.userId});
});

//Criar projeto
router.post('/',(req, resp) => {
    resp.send({ok:true, Id: req.userId});
});

//Obter projeto por Id
router.get('/:projetoId',(req, resp) => {
    resp.send({ok:true, Id: req.userId});
});

//Atualiza projeto
router.put('/',(req, resp) => {
    resp.send({ok:true, Id: req.userId});
});

//Deleta projeto
router.podeletest('/:projetoId',(req, resp) => {
    resp.send({ok:true, Id: req.userId});
});





module.exports = (app) => app.use("/projects", router);

