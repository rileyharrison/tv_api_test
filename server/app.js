var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/kappa_movies_api_app');
mongoose.model("Movies", new Schema({"Title" : String, "Runtime" : String, "Rated" : String, "Actors" : String, "Plot": String}));
var Movie = mongoose.model("Movies");

app.get("/movie", function(req,res){
    Movie.find({}, function(err, data){
        if(err){
          console.log(err);
        }

        res.send(data);
    });
});

app.post("/movie", function(req,res){
    console.log(req.body);

    var addedMovie = new Movie({"Title" : req.body.Title, "Runtime" : req.body.Runtime, "Rated" : req.body.Rated, "Actors" : req.body.Actors, "Plot": req.body.Plot});
    addedMovie.save(function(err, data){
        if(err){
          console.log(err);
        }

        res.send(data);
    });


});

app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "/public/", file));
});

app.listen(app.get("port"), function(){
    console.log("Listening");
});

module.exports = app;
