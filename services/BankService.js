const {BookRepository} = require("../repositorys/BookRepository");


/**
 * 
 * @param {{name, numberOfpages}} bookDto 
 * @returns {{name, numberOfpages}} - O livro se criou ou null se falhou
 */
async function registerBook(bookDto){
	
    return BookRepository.saveBook(bookDto);
}


/**
 * 
 * @returns {Array<{ name: string, numberOfpages: number }>}
 */
async function getAllBooks(){
 return BookRepository.getbooks();
}



function findBookById(id){
	return BookRepository.findBookById(id);

}

function deleteBookById(id){
	return BookRepository.deleteBookById(id);

}

function updateBookById(book, id){

	return BookRepository.updateBook(book, id);
}


module.exports = {
    deleteBookById,
    findBookById,
    getAllBooks,
    registerBook,
    updateBookById
}