const db = require('./db'); //IMPORTANDO O NOSSO MODULO DE CONEXÃO COM O BANCO.

const Joi = require('joi');

const produtoSchema = Joi.object({
    id: Joi.string().required(),
    nome_produto: Joi.string().required(),
    descrição: Joi.string().required(),
    valor: Joi.string().required(),
    imagem: Joi.string().required(),
});

exports.listarProdutos = (req, res) => {
    db.query('SELECT * FROM produto', (err, result) => {
        if (err) {
            console.error('ERRO ao listar produtos:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json(result)
    });
};

exports.buscarProduto = (req, res) => {

    const { id } = req.params;

    db.query('SELECT * FROM produto WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        };
        if (result.length == 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        };
        res.json(result[0]);
    });
};

exports.adicionarProduto = (req, res) => {
    const { id, nome_produto, descrição, valor, imagem } = req.body;

    const { error } = produtoSchema.validate({ id, nome_produto, descrição, valor, imagem });
    if (error) {
        res.status(400).json({ error: 'Dados do produto inválidos' });
        return;
    };
    const novoProduto = {
        id,
        nome_produto,
        descrição,
        valor,
        imagem
    };
    db.query('INSERT INTO produto SET ?', novoProduto, (err, result) => {
        if (err) {
            console.error('Error ao adicionar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        };

        res.json({ message: 'Produto Adiconado com Sucesso' });

    });
};

exports.atualizarProduto = (req, res) => {
    const { id } = req.params;
    const { nome_produto, descrição, valor, imagem } = req.body;

    const { error } = produtoSchema.validate({ id, nome_produto, descrição, valor, imagem });
    if (error) {
        res.status(400).json({ error: 'Dados do produto inválidos' });
        return;
    };
    const produtoAtualizado = {
        id,
        nome_produto,
        descrição,
        valor,
        imagem
    };
    db.query('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado, id], (err, result) => {
        if (err) {
            console.error('Error ao adicionar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        };
        res.json({ message: 'Produto atualizado com sucesso' });
    });
};
exports.deletarProduto = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM produto WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro so deletar produto', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        };
        res.json({ message: 'Produto deletado com sucesso' }); 
    });
};