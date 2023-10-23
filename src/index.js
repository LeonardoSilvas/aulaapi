//criação o index.js
//criação de uma aplicação express
const express = require('express');//IMPORTANDO EXPRESS

const path = require ('path'); //IMPORTANDO PATH
//O PATH RETORNA O CAMINHO DE FORMA DINAMICA

const app = express ();
// O APP IRA RECEBER O EXPRESS E TODAS SUAS DEPENDENCIAS

const router = express.Router();
//ISSO PERMITE QUE A GENTE CRIE DIFERENTES URls E ENDPOINTs PARA QUE O FROTEND POSSA FAZER CHAMADAS 
router.get ("/", (req, res) => {
res.sendFile(path.join(__dirname + '/pages/home.html'))//JOIN = JUNTAR 
});
//AQUI DEFINIMOS NOSSA ROTA PARA O ARQUIVO HTML USADO O PATH PARA SEMPRE RETORNAR DINAMICAMENTE O QUE VEM ANTES DA "/pages/home.html"
//TUDO QUE SE ENCONTRA DEPOIS DA BARRA '/' SERÃO NOSSA ROTAS.

app.use(router); //CHAMAR 
//APÓS DECLARAR NOSSAS ROTAS, AQUI FALAMOS PARA NOSSO APP USAR ELAS COMO REFERENCIA

app.listen(3333, ()=>{           //LISTEN = ESCUTAR 
    console.log('Servidor Liso');
});
//AQUI DEFINIMOS QUEM IRA ESCUTAR NOSSO CHAMADO E NOS RESPONDER 

app.get('/hello', (request, reply)=>{
 console.log('Get funcionando');
 reply.send({ message:'hello world!!' });
});
//DENTRO DO GET JA DEFINIMOS UMA FUNÇÃO ANONIMA CALLBACK QUE RECEBE UMA REQUISIÇÃO COM O REQUEST E QUE RETORNA UMA REPOSTA COM O REPLY

app.get('/usuario', (req, res)=>{
console.log('Get usuario funcionando');
res.send({ usuario: 'leo'});
});