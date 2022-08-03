const express = require("express");
const mongo = require("./services/mongo_db.js")
require('dotenv').config()
app = express();

const redis = require('./services/redis')


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get("/", (req, res) => {
  res.status(200).send("Welcome to root auth api services");
});

const v1_auth = require('./routes/v1/auth')
app.use("/v1",v1_auth)


app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  }else{
    console.log("running successful in port ",process.env.PORT)
    mongo.set_connection()
  }
});
