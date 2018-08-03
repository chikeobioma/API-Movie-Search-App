var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home"); 
});


app.get("/searchResult", function(req, res){
  var keyword = req.query.keyword;
  var url = "http://www.omdbapi.com/?s="+keyword+"&apikey=thewdb"
  request( url, function(error, response, body){
    if (!error && response.statusCode == 200){
      var searchResult = JSON.parse(body);
    if ( searchResult.Search === undefined) {
      res.render("errorPage");
    } 
      res.render("searchResult", {searchResult: searchResult});
    } 
    else {
        console.log("Something went wrong");
        console.log(error);
    }
  });
});

app.listen(8080, '0.0.0.0', function(){
    console.log("The movie search app is now running...");
});

//OR

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("The app is now running...");
// });


// var express = require("express");
// var app = express();
// var request = require("request");
// var bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({extended: true}));

// app.set("view engine", "ejs");

// app.post("/searchResult", function(req, res){
//    var result = req.body.keyword;  
//    var url = "http://www.omdbapi.com/?s="+keyword+"&apikey=thewdb"
//    request( url, function(error, response, body){
//     if(!error && response.statusCode == 200){
//         var searchResult = JSON.parse(body);
//         if ( searchResult.Search === undefined) {
//               res.render("errorPage");
//             }
//     res.render("searchResult", {searchResult: searchResult});
//     } 
//     else {
//         console.log("Something went wrong");
//         console.log(error);
//     }
//   });
// });

// app.get("/", function(req, res){
//   res.render("home"); 
// });

// app.get("/searchResult", function(req, res){
//     res.render("searchResult");
// });


// app.listen(8080, '0.0.0.0', function(){
//     console.log("The movie search app is now running...");
// })