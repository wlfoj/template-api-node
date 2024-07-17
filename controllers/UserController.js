const express = require('express');
const {userByebye, userHello, autenticateuser} = require('../services/UserService');
const {generateToken, middlewareVerifyToken} = require("../infra/jsonWebToken");


const router = express.Router();



router.get('/', (req, res) => {
  var res_msg = userByebye();
  res.send(res_msg);
});

// ====== Rota que obtem um token json
router.post('/auth', (req, res) => {
	// Retirando os campos da requisição
	const { username, password } = req.body;

	// Se for um usuário válido
	if (autenticateuser(username, password)){
		const token = generateToken(username);
		return res.status(200).json({ token: token, userId: username });
	}
	else{
		return res.status(401).json({ message: 'Credenciais inválidas' });
	}
});


// ===== rota protegida, só consegue usar se tem token válido (única rota protegida em todo)
router.get('/protegida', middlewareVerifyToken, (req, res) => {
	console.log("Entrei na requisição protegida")
	var res_msg = userByebye();
	//faz algo aqui
	res.send(res_msg);
});



module.exports = router;