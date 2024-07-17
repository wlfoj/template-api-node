// Imports para uso do json web token
const jwt = require('jsonwebtoken');
// const { SECRET_KEY } = require('../infra/config'); 

const SECRET_KEY = 'meu-segredo-seguro';
/**
 * 
 * @param {strin} userKey - A chave particular od usuário usada para gerar o token, normalmente o nome do usuário
 * @returns {string} O token gerado, com validade de 1 hora 
 */
function generateToken(userKey){
    return jwt.sign({ userKey }, SECRET_KEY, { expiresIn: '1h' });
}


function getUserNameFromToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(`O usuário é = ${decoded.userKey}`)
        return decoded.userKey; // Retorna o userName do payload
    } catch (error) {
        console.error('Token inválido:', error);
        return null;
    }
}

/** Middleware para verificação de token
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function middlewareVerifyToken(req, res, next) {
    console.log("Entrei no middleware para verificar o token")
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    // Remover "Bearer " do token
    const bearerToken = token.split(' ')[1];

    jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        console.log(`Recebi ${decoded.toString()}`)
        req.user = decoded; // Armazenar dados decodificados do token na requisição
        next(); // Chama a próxima função middleware/rota
    });
}


module.exports = {
    generateToken,
    middlewareVerifyToken,
    getUserNameFromToken
}