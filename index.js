const express = require("express");
const mongo = require("./services/mongo_db.js")
require('dotenv').config()
app = express();

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  }else{
    console.log("running successful in port ",process.env.PORT)
    mongo.set_connection()
  }
});
