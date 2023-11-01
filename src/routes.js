const express = require('express');//IMPORTANDO EXPRESS

const path = require('path');
//O PATH RETORNA O CAMINHO DE FORMA DINAMICA
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))//JOIN = JUNTAR 
}); 
//AQUI DEFINIMOS NOSSA ROTA PARA O ARQUIVO HTML USADO O PATH PARA SEMPRE RETORNAR DINAMICAMENTE O QUE VEM ANTES DA "/pages/home.html"
//TUDO QUE SE ENCONTRA DEPOIS DA BARRA '/' SERÃO NOSSA ROTAS.

const clienteController = require ('./clienteController');
//CHAMANDO O ARQUIVO QUE CONTROLA O CLIENTE

//ROTAS PARA CLIENTES
router.get('/clientes', clienteController.listarClientes);
//Buscar Clientes
router.get('/clientes/:cpf', clienteController.buscarCliente);

//POST: Aceita criar algum objeto do sercidor.
router.post('/clientes', clienteController.adicionarCliente);

//PUT: Aceita substituir algum objeto do servidor.
//PATCH: Aceita alterar algum objeto do servidor.
router.patch('/clientes/:cpf', clienteController.atualizarCliente);

//DELETE: informa por meio do URL o objeto a ser deletado.
router.delete('/cliente/:cpf', clienteController.deletarCliente);

//ROTAS PARA PRODUTOS
const produtoController = require ('./produtoController');
router.get('/produto/', produtoController.listarProdutos);

router.get('/produto/:id', produtoController.buscarProduto);

router.post('/produto/:id', produtoController.adicionarProduto);

router.patch('/produto/:id', produtoController.atualizarProduto);

router.delete('/produto/:id', produtoController.deletarProduto);

module.exports = router;