//CONFIGURANDO O BANCO DE DADOS

const mysql = require('mysql'); //IMPORTANDO MYSQL

//CONFIGURANDO UMA CONEXÃO COM O BANCO DE DADOS
const db = mysql.createConnection({
    hots: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'pizzaria'
}); //PREENCHER DE ACORDO COM O SEU BANCO DE DADOS

//TESTAR A CONEXÃO COM MYSQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL', err);
    } else {
        console.log('Conctado ao MySQL');
    }
});

module.exports = db;
//AQUI DECLARAMOS QUE ESTA CONSTRUÇÃO SERA UM MODULO E QUE IREMOS EXPORTAR PARA SER USADO. SEQUIR INDEX.
