const {BookModel, UserModel} = require("../models");



exports.getAllUsers = async(req , res) => {
   
    const users = await UserModel.find()

    if(users.length == 0)
    {
        return res.status(404).json({
            success : false,
            message : "No  Book Found :-(  "
        })
    }

    return res.status(200).json({
        success : true,
        data : users
    })

}




exports.getSingleUserById = async(req, res) => {
  const {id}  = req.params;
  const user = await UserModel.findbyId(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not Found",
    });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
}




exports.createNewUser = async(req, res) => {
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

  await UserModel.create(data);
  const allUsers = await UserModel.find();

  //books.push({ id, name, surname, email, subscriptionType, subscriptionDate });
  return res.status(201).json({
    success: true,
    data: allUsers
  })

}



exports.updateUserById = async (req, res) => {
  const {id} = req.params;
  const {data} = req.body;

  // const book = books.find((each) => each.id == id);

  const updateUser = await UserModel.findOneAndUpdate({ _id: id }, data, {
    new: true
  })

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
    data: updateUser,
  });
};


