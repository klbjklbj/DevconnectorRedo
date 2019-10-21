const express = require("express");
const mongoose = require("mongoose");
const users = require('./routes/api/users');
const profile=require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser=require('body-parser');
const app = express(); //creating instance of express


// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = 7000;
app.listen(port, () => console.log(`Server running on port ${port}`));
