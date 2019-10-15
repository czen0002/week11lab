//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();

app.listen(8080);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/movie")));

mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

// connect to mongoose

// create an instance of MongoDB client
// const MongoClient = mongodb.MongoClient;
// define the location of the server and its port number
// const url = "mongodb://" + process.argv[2] + ":27017/movies";
// console.log("Connecting to MongoDB Server=" + url);

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
//     if (err) {
//         console.log("Err ", err);
//     } else {
//         console.log("Connected successfully to server");
//     }
// })

//Configuring Endpoints
//Actor RESTFul endpoionts 
// get actors acting in at least 2 movies
//app.get('/actors2', actors.getAllMovies);
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
//task2
app.delete('/actors/:id', actors.deleteOne);
//task3
app.put('/actors/:id/:movieid', actors.removeMovie);



//Movie RESTFul  endpoints
app.put('/movies/:year1', movies.deleteMovies);
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
//task1
app.delete('/movies/:id', movies.deleteOne);
//task4
app.put('/movies/:id/:actorid', movies.removeActor);
//task5
app.post('/movies/:id/actors', movies.addActor);
//task6
app.get('/movies/:year1/:year2', movies.getMoviesPeriod);
