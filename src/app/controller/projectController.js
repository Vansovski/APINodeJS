const express = require('express');

const router = express.Router();

const autMiddleware = require('../middlewares/auth');

const Projeto = require('../models/Projeto');
const Tarefa = require('../models/Tarefa');

router.use(autMiddleware);

//Obter Projetos
router.get('/',async (req, resp) => {
    try {
       const projetos = await Projeto.findAll();
       return resp.status(200).send(projetos);
        
    } catch (error) {
        console.log(error);
        resp.status(400).send({error:'Erro ao buscar Projetos'})
    }
});

//Criar projeto
router.post('/',async (req, resp) => {
    try {

    const projeto = await Projeto.create(req.body);
    return resp.status(200).send(projeto);

    } catch (error) {
        console.log(error);
        resp.status(400).send({error:'Erro ao criar Projeto'})
    }
});

//Obter projeto por Id
router.get('/:projetoId',async (req, resp) => {
    try {
        const {projetoId} = req.params;

        const projeto = await Projeto.findOne({where:{id:projetoId}});
        if(!projeto)
        {
            return resp.status(400).send({messge:'Não encontrado'});
        }
        return resp.status(200).send(projeto);
    
        } catch (error) {
            console.log(error);
            resp.status(400).send({error:'Erro ao Obter Projeto!'})
        }
});

//Atualiza projeto
router.put('/:projetoId',async (req, resp) => {
    try {
        const {projetoId} = req.params;

        const projeto = await Projeto.findOne({where:{id:projetoId}});
        if(!projeto)
        {
            return resp.status(400).send('Projeto Não Existe!');
        }

        const{titulo, descricao} = req.body;

        //Operação no BD
        await Projeto.update( {titulo:titulo, descricao: descricao}, { where: { id: projetoId } });
        return resp.status(200).send({messge:'Atualizado com Sucesso!'});
    
        } catch (error) {
            console.log(error);
            resp.status(400).send({error:'Erro ao Atualizar Projeto!'});
        }
});

//Deleta projeto
router.delete('/:projetoId',async (req, resp) => {

    try {
        const {projetoId} = req.params;

        const projeto = await Projeto.findOne({where:{id:projetoId}});
        if(!projeto)
        {
            return resp.status(400).send({messge:'Não encontrado'});
        }
        projeto.destroy();
        return resp.status(200).send('Deletado');
    
        } catch (error) {
            console.log(error);
            resp.status(400).send({error:'Erro ao Obter Projeto!'})
        }
    resp.send({ok:true, Id: req.userId});
});

//Rota de Entrada 
module.exports = (app) => app.use("/projects", router);

