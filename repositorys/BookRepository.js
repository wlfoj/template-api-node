const {BookModel} = require("../model/BookModel");


class BookRepository{
	/**
	 * 
	 * @param {{name, numberOfpages}} book 
	 */
	static async saveBook(book){
		var tt = await BookModel.create(book);   
		return tt;
	}


	/**
	 * 
	 * @returns {Array<{ name: string, numberOfpages: number }>}
	 */
	static async getbooks(){
		var tt = await BookModel.findAll()
		return tt;
	}
	
	/**
	 * 
	 * @param {number} id 
	 * @returns 
	 */
	static async findBookById(id){
		var tt = await BookModel.findByPk(id);
		return tt;
	}


	/**
	 * 
	 * @param {number} id 
	 * @returns {number} - O numero de elementos deletados
	 */
	static async deleteBookById(id){
		var tt = await BookModel.destroy({
			where: {
				id: id
			}
		})
		return tt;
	}


	/**
	 * 
	 * @param {{name, numberOfpages}} book 
	 * @param {number} id 
	 */
	static async updateBook(book, id){
		var tt =  await BookModel.update(
			{ name: book.name, numberOfpages: book.numberOfpages },
			{ where: { id: id } }
		);
		return tt;
	}
}






module.exports = {
    BookRepository
}