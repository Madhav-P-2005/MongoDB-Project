// Rather than importing these particular files which are in models :- 1) book-model.js and 2) user-model.js
const UserModel = require("./user-model")
const BookModel = require("./book-model")
const {model} = require("mongoose")

// const userModel = require("./user-model")
// Rather than inheriting these two files just use index.js 



module.exports = {UserModel , BookModel}