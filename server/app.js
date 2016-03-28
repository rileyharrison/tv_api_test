var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var connectionString = '';
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// if (process.env.DATABASE_URL){
//     connectionString = 'mongodb://<dbuser>:<dbpassword>@ds025379.mlab.com:25379/heroku_20jvr463'
// } else {
//     connectionString = 'mongodb://localhost/tv_shows_app';
// }
console.log("process.env.mongoloaburi", process.env.MONGOHQ_URL);

// connectionString = 'mongodb://localhost/tv_shows_app';
connectionString = 'mongodb://heroku_20jvr463:fs2nv7d4q15bm0kmb4v93bfhgh@ds025379.mlab.com:25379/heroku_20jvr463';

mongoose.connect(connectionString);

// mongoose.connect('mongodb://localhost/tv_shows_app');

//mongodb://<dbuser>:<dbpassword>@ds025379.mlab.com:25379/heroku_20jvr463

mongoose.model("Shows", new Schema({"Name" : String, "Premiered" : String, "Summary" : String, "Image" : String}));
var Show = mongoose.model("Shows");

app.get("/movie", function(req,res){
    Show.find({}, function(err, data){
        if(err){
          console.log(err);
        }

        res.send(data);
    });
});

app.post("/movie", function(req,res){
    console.log(req.body);

    var addedMovie = new Show({"Name" : req.body.Name, "Premiered" : req.body.Premiered, "Summary" : req.body.Summary, "Image" : req.body.Image });
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
