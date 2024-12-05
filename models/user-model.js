const { MongoGCPError } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Schema to be inherited here
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    // issuedBook is not a simple one its a foreign key . Its an object which is refering to the table
    issuedBook: {
      type: mongoose.Schema.Types.ObjectId,
      // which table you are refering
      ref: "book",
      required: false

      // Its an optional one so required is not necessary
      // required: true,
    },
    returnDate: {
      type: String,
      required: false
    },
    subscriptionType: {
      type: String,
      required: true
    },
    subscriptionDate: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User ", userSchema);
