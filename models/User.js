const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema (like columns in spreadsheet)
//"new" instantiates an object
//Defining each column (name, email, etc) and their properties
const UserSchema = new Schema({
  //columns in table
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    requred: false //(default, no need to specify)
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//Instead of exporting just blueprint (UserSchema), export creation of what blueprint is for (table/document)
//Create new variable called User and ask mongoose to make a model of UserSchema called users
//User refers to this actual table in MongoDB
module.exports = User = mongoose.model('users', UserSchema);
