var Twitter = require('twitter');
var request = require('request');
var spotify = require('spotify');
var TwitKey = require("./key.js");
var command = process.argv[2];
var userInput = process.argv[3];


switch (command) {
  case "my-tweets":
    tweets(userInput);
    break;

  case "spotify-this-song":
    spotifySong(userInput);
    break;

  case "movie-this":
    movieSearch(userInput);
    break;

  case "do-what-it-says":
    random();
    break;
}

