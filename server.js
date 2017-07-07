const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Guitar = require("./models/Guitar");
const app = express();
const port = process.env.PORT || 7000;
const dbURL = "mongodb://localhost:27017/mongoose";

app.use(bodyParser.urlencoded({ extended: false }));
app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");
app.use(express.static("./public"));



mongoose.connect(dbURL).then(function(err, db) {
  if (err) {
    console.log("error", err);
  }
  console.log("Connected to MOONGOOSE DB.");
});


app.get("/", (req, res) =>{
    Guitar.find()
    .then(foundGuitar => {
      res.render("index", {guitar: foundGuitar});
    })
    .catch(err => {
      res.status(500).send(err);
    });
})

app.post("/newguitar", (req, res) =>{
    let guitardata = req.body;
    console.log(guitardata);
    let newguitar = new Guitar(guitardata);
    console.log("new guitar:" ,newguitar);

    newguitar
    .save()
    .then(savedguitar => {
        return res.redirect("/");
    
})
    .catch(err =>{
        res.status(500).send(err);
    });
})


app.listen(port, ()=>{
    console.log("Now running on port", port);
})