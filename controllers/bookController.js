const bookController = (Book) => {
  
  const getBooks = async (req, res) => {
    const { query } = req;
    const response = await Book.find(query);
    res.json(response);
}

  const postBooks = async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
}

  const getBookById = async (req, res) => {
    const { params } = req;
    const response = await Book.findById(params.bookId);
    res.json(response);   
}

  const getBookByName = async (req, res) =>{
    const { params } = req;
    const response = await Book.findByName({params});
    res.json(response);
  };

  const getBookByAuthor = async (req, res) =>{
    const { params } = req;
    const response = await Book.findByAuthor({params});
    res.json(response);
  };

  const putBooks = async (req, res) => {
    const { body } = req;
    const response = await Book.updateOne({
        _id: req.params.bookId
    }, {
        $set: {
            title: body.title,
            genre: body.genre,
            author: body.author,
            read: body.read
        }
    })
    res.json(response);
  }
    const deleteBookById = 
      async (req, res) => {
        try {
            await Book.findByIdAndDelete(req.params.bookId);
            return res.status(202).json("libro eliminado");
          } catch (err) {
            res.status(404).json("libro no encontrado");
          }
    }

  return { getBooks, postBooks, getBookById, putBooks, deleteBookById, getBookByName, getBookByAuthor };
}

module.exports = bookController;