const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

//"string de conexão" 
const DBSOURCE = "nodeAPI.db";


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      //Erro de abertura do db
      console.error(err.message);
      throw err;
    }else{
        console.log('Conexão com db SQLite');
    }
});

module.exports = db;