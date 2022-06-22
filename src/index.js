//Rotas
const express = require('express');
//Json
const bodyParse = require('body-parser');

//Instacia do express
const app = express();


//Parametrização do Json
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));

//criar rota 
app.get('/',(req, resp) => {
    resp.send('OK');
});
app.listen(3000);