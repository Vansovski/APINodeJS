const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');


module.exports = (req, resp, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader)
    {
        return resp.status(401).send({error:'token não informado!'});
    }

    const parts = authHeader.split(' ');


    if(!parts.length === 2)
    {
        return resp.status(401).send({error:'Token error!'});
    }   

    const[ scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
    {
        return resp.status(401).send({error: 'Token malformatado!'});        
    }
    
    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err) return resp.status(401).send({error: 'Token Invalido'})
    
        req.userId = decoded.id;
        return next();
    
    });

};