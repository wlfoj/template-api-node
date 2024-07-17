function userHello(name){
    return `Olá ${name}, bem vindo`;
}
function userByebye(){
    return "fim de carreira";
}


/**
 * Autentica um usuário com nome de usuário e senha.
 * 
 * @param {string} username - O nome de usuário do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {boolean} Retorna true se a autenticação for bem-sucedida, caso contrário, false.
 */
function autenticateuser(username, password){
      // Verificação simplificada de usuário e senha
    if (username === 'admin' && password === 'admin') {
    return true;
    }
    else{
        return false;
    }
}

module.exports = {
    userHello,
    userByebye,
    autenticateuser
};