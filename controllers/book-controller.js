const {BookModel,UserModel} = require("../models");

// If you have thousands of api will to add on to line no 14 or this module its not a proper way so we dont use it .
exports.getAllBooks = async(req, res) => {
  // async functionality is required as there may be some delay in connectivity
  const books = await BookModel.find();
  if (books.length == 0) {
    return res.status(400).json({
      success: false,
      message: "No book is found",
    });
  }

  res.status(200).json({
    success: true,
    data: books,
  });
};



exports.getSingleBookById = async (req, res) => {
  const {id} = req.params;
  const book = await BookModel.findbyId(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not Found",
    });
  }

  return res.status(200).json({
    success: true,
    data: book,
  });
};




exports.addNewBook = async(req, res) =>{
  //router.post("/", (req, res) => {
  // const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
  const {data} = req.body;

  //const book = users.find((each) => each.id == id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Please enter the data to add the book",
    })
  }

  await BookModel.create(data)
  const allBooks = await BookModel.find();

  //books.push({ id, name, surname, email, subscriptionType, subscriptionDate });
  return res.status(201).json({
    success: true,
    data: allBooks,
  })
}


exports.updateBookbyId = async(req , res) =>{
      const {id} = req.params;
      const {data} = req.body;

      // const book = books.find((each) => each.id == id);

      const updateBook = await BookModel.findOneAndUpdate({_id:id} , data, {new : true})

      // Not required 
    //   if (!book) {
    //     return res.status(404).json({
    //       success: false,
    //       message: "User not found for the given id ",
    //     });
    //   }

      
       // Not requird

    //   const updatedbook = books.map((each) => {
    //     if (each.id == id) {
    //       // Spread Operator
    //       return {
    //         ...each,
    //         ...data,
    //       };
    //     }

    //     return each; // return the instance
    //   });

      return res.status(200).json({
        success: true,
        data: updateBook
      })
}


// If you have thousands of api  to add on to line no 14 or this module its not a proper way so we dont use it .
// module.exports = {getAllBooks , getSingleBookById}
