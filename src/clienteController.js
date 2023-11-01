const db = require('./db'); //IMPORTANDO O NOSSO MODULO DE CONEXÃO COM O BANCO.

const Joi = require('joi');
//JOI - valida se esta estrutura de dados atende a uma avaliação criada no banco, impedindo que o erro passe por aqui e chegue até o banco.

//Validação dos dados
const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    nome: Joi.string().required(),
    endereco: Joi.string().required(),
    bairro: Joi.string().required(),
    complemento: Joi.string().required(),
    cep: Joi.string().required(),
    telefone: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
});

//lista todos os clientes
// query acessa o objeto de querstring da requisição

exports.listarClientes = (req, res) => {

    db.query('SELECT * FROM cliente', (err, result) => {
        if (err) {
            console.error('ERRO ao buscar clientes:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json(result)
    });
};

//Buscar um unico cliente por cpf
exports.buscarCliente = (req, res) => {

    const { cpf } = req.params; //req.params acessa os parametro 


    db.query('SELECT * FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        };
        if (result.length == 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
            return;
        };
        res.json(result[0]); // Retorna o primeiro cliente encontrado (deve ser unico)
    });
};

//ADICIONAR UM NOVO CLIENTE

exports.adicionarCliente = (req, res) => {
    const { cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha } = req.body; // req.body acessa objeto do corpo da requisição que foi recebido.

    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha }); //clienteSchema aqui utilizamos o joi para verificar os dados recebidos e garantir a integridade para só depois adicionar no banco.

    if (error) {
        res.status(400).json({ error: 'Dados de cliente inválidos' });
        return;
    }


    const novoCliente = {
        cpf,
        nome,
        endereco,
        bairro,
        complemento,
        cep,
        telefone,
        email,
        senha
    };

    db.query('INSERT INTO cliente SET ?', novoCliente, (err, result) => {

        if (err) {
            console.error('Error ao adicionar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        };
        res; json({ message: 'Cliente Adiconado com Sucesso' });
    });
};

//ATUALIZAR UM CLIENTE
exports.atualizarCliente = (req, res) => {
    const { cpf } = req.params; //Chave primaria (cpf)
    const { nome, endereco, bairro, complemento, cep, telefone, email, senha } = req.body; //Corpo da atualização

    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha });

    if (error) {
        res.status(400).json({ error: 'Dados de cliente inválidos' });
        return;
    };


    const clienteAtualizado = {
        cpf,
        nome,
        endereco,
        bairro,
        complemento,
        cep,
        telefone,
        email,
    };

    db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtualizado, cpf], (err, result) => {
        if (err) {
            console.error('Error ao adicionar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        };
        res.json({ message: 'Cliente atualizado com sucesso' });
    });
};

//DELETE UM CLIENTE
exports.deletarCliente = (req, res) => {
    const { cpf } = req.params;
    db.query('DELETE FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro so deletar cliente', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Cliente deletado com sucesso' });
    });
};