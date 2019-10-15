const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {

    getAll: function (req, res) {
        Actor.find().populate('movies').exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();

        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },


    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            res.json(actor);

        });
    },

    // lab8 task2 modify here
    deleteOne: function (req, res) {
        Actor.findOne({_id: req.params.id}).exec(function(err, actor){
            if (err){
                return res.status(400).json(err);
            }
            if (!actor) {
                return res.status(404).json();
            }
            // get the actors movie array
            let i = 0;
            let movieId;
            let movies = actor.movies;
            // remove all movies one by one
            while (i < movies.length) {
                movieId = movies[i];
                Movie.findOneAndRemove({ _id: movieId }, function (err) {
                    if (err) return res.status(400).json(err);
        
                    res.json();
                });
                i++;
            }
        })
        // then remove the actor
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },


    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(actor);
                });
            })
        });
    },


    removeMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            // get the movies array
            let i = 0;
            let movies = actor.movies;  
            while (i < movies.length) {
                if (movies[i]==req.params.movieid) {
                    movies.splice(i,1);
                    break;
                }
                i++;
            }
            actor.save(function (err) {
                if (err) return res.status(500).json(err);

                res.json(actor);
            });

        });
    },

    // getAllMovies: function(req, res) {
    //     let query = {$nor: [
    //         {movies: {$exists: false}},
    //         {movies: {$size: 0}},
    //         {movies: {$size: 1}}
    //     ]};       
    //     Actor.find(query).exec(function (err, actors) {
    //         if (err) {
    //             return res.status(404).json(err);
    //         } else {
    //             res.json(actors);
    //         }
    //     });
    // }
};