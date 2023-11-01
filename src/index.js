//criação o index.js
//criação de uma aplicação express
const express = require('express');//IMPORTANDO EXPRESS

const path = require ('path'); //IMPORTANDO PATH
//O PATH RETORNA O CAMINHO DE FORMA DINAMICA

//****CONFIGURAÇÃO DO BANCO DE DADOS MySQL***** 
const db = require('./db'); //IMPORTANDO O NOSSO MODULO DE CONEXÃO COM O BANCO.

const app = express ();
// O APP IRA RECEBER O EXPRESS E TODAS SUAS DEPENDENCIAS

//CONFIGURAÇÃO DAS ROTAS
const routes = require('./routes');

//ISSO PERMITE QUE A GENTE CRIE DIFERENTES URls E ENDPOINTs PARA QUE O FROTEND POSSA FAZER CHAMADAS 

app.use(express.json());// AQUI TRANSFORMAMOS OS DADOS QUE CHEGAM COMO BINARIO EM JSON

app.use('/', routes); //CHAMAR 
//APÓS DECLARAR NOSSAS ROTAS, AQUI FALAMOS PARA NOSSO APP USAR ELAS COMO REFERENCIA

app.listen(3333, ()=>{           //LISTEN = ESCUTAR 
    console.log('Servidor Liso');
});
//AQUI DEFINIMOS QUEM IRA ESCUTAR NOSSO CHAMADO E NOS RESPONDER 
