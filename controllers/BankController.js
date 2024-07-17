const express = require('express');
const {middlewareVerifyToken, getUserNameFromToken} = require("../infra/jsonWebToken");
const {RabbitMQ}= require("../infra/rabbitmq");
const BankService = require("../services/BankService");



const router = express.Router();


// Adicionando o verificador de token aqui em todas as rotas
router.use('/', middlewareVerifyToken);

// Obtem todos os livros
router.get('/', async (req, res) => {
	var r = await BankService.getAllBooks();
	return res.status(200).json({books: r});
});

// pega determinado livro
router.get('/:id', async (req, res) => {  
	const id = req.params.id;
	/// PARTE RABBIT ////////
	const bearerToken = req.headers['authorization'].split(' ')[1];
	const user = getUserNameFromToken(bearerToken);
	const msg = `O usuario ${user} buscou peloe livro de id=${id}`;
	RabbitMQ.sendMessage(msg);


	// Se for um parametro inválido
	if (isNaN(id)){
		return res.status(400).json({message: "O parametro GET deve ser um número"})
	} 

	// 
	var r = await BankService.findBookById(parseInt(id, 10));
	return res.status(200).json({book: r});
});

// cria um livro
router.post('/', async (req, res) => {
	const {name, numberOfpages} = req.body;
	// Se não tiver os campos
	if (!name || !numberOfpages){
		return res.status(400).send({message: "Os campos requeridos estão ausentes"})
	}
	// Cria uma especie de dto
	const bookDto = {name, numberOfpages};
	// Chama o serviço
	var book = await BankService.registerBook(bookDto);
	// verifico se criou para retornar uma resposta correta
	if (! book){
		return res.status(200).json({message: "O livro não pôde ser criado"});
	}
	else{
		return res.status(201).json({message: "O livro foi registrado com sucesso", book: book});
	}
});

// edita um livro
router.put('/:id', async (req, res) => {
	const {name, numberOfpages} = req.body;
	const id = req.params.id;
	// Se não tiver os campos
	if (!name || !numberOfpages){
		return res.status(400).send({message: "Os campos requeridos estão ausentes"})
	}
	// Cria uma especie de dto
	const bookDto = {name, numberOfpages};
	
	var r = await BankService.updateBookById(bookDto, parseInt(id, 10));
	if (r == 0){
		return res.status(404).json({message: "O livro não pôde ser atualizado ou ele não existe"});
	}
	else{
		return res.status(200).json({message: "O livro foi atualizado com sucesso"});
	}
});

// deleta um livro
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	
	// Se for um parametro inválido
	if (isNaN(id)){
		return res.status(400).json({message: "O parametro GET deve ser um número"})
	} 

	// 
	var r = await BankService.deleteBookById(parseInt(id, 10));
	if (r == 0){
		return res.status(404).json({message: "O livro não pôde ser deletado ou ele não existe"});
	}
	else{
		return res.status(200).json({message: "O livro foi deletado com sucesso"});
	}
	
});


module.exports = router;