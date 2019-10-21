const express = require("express");
const mongoose = require("mongoose");
const app = express(); //creating instance of express

//Db config
const db = require("./config/keys").mongoURI; //connection string
//connect to mongodb
mongoose
  .connect(db)
  //promise statement
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

//Create first route
//req=what user sends, res = what server sends back
app.get("/", (req, res) => res.send("hello"));
const port = 7000;
app.listen(port, () => console.log(`Server running on port ${port}`));
