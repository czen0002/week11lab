var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {

    getAll: function (req, res) {
        Movie.find().populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },


    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    
    deleteOne: function(req, res){
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },


    removeActor: function(req, res){
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            // get the actors array
            let i = 0;
            let actors = movie.actors;  
            while (i < actors.length) {
                if (actors[i]==req.params.actorid) {
                    actors.splice(i,1);
                    break;
                }
                i++;
            }
            movie.save(function (err) {
                if (err) return res.status(500).json(err);

                res.json(movie);
            });

        });
    },


    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },


    getMoviesPeriod: function(req, res) {
        let year1 = req.params.year1;
        let year2 = req.params.year2;
        let query = {$and: [{year: {$gte:year2}}, {year: {$lte:year1}}]};

        Movie.find(query, function(err, movies){
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();
            
            res.json(movies);
        });
    },

    deleteMovies: function(req, res) {
        let year1 = req.params.year1;
        let query = {year: {$lt:year1}};
        Movie.find(query, function(err, movies){
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();
            let i = 0;
            let newid;
            while (i < movies.length) {
                newid = movies[i]._id;
                Movie.findOneAndRemove({ _id: newid}, function (err) {
                    if (err) return res.status(400).json(err);
                });
                i++;
            }
            res.json(movies);
        });
    }
};