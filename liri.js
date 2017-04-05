//initialize variables and Node module
var twitter = require('twitter');
var request = require('request');
var spotify = require('spotify');
var twitKey = require("./key.js").twitterKeys;
var request = require("request");
var fs = require("fs");
var command = process.argv[2];
var userInput = process.argv.splice(3).join(" ");
var client = new twitter(twitKey);

// check the first argument and depending on the input, execute specific functions
switch (command) {
  case "my-tweets":
    tweets();
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

function tweets() {
  //log input to log.tex
  fs.appendFile("log.txt", "//" + command, function(err) {

  if (err) {
    return console.log(err);
  }

  console.log("log.txt was updated!");
  console.log("////////////////////////////////////////////////")

  });

	var params = {screen_name: "@MarcosLee1",count: 14}
	client.get("statuses/user_timeline", params, function(err, data, response){
		if (!err) {
      for(var i = 0; i < 14; i++) {
        console.log(JSON.stringify("Tweet #" + (1 + i) + " " + data[i].text, null, 2));
      }
  	}
	})
}
function spotifySong(input) {
  //log input to log.tex
  var userLog = " //" + command + ", " + userInput;
  fs.appendFile("log.txt", userLog, function(err) {

  if (err) {
    return console.log(err);
  }

  console.log("log.txt was updated!");
  console.log("////////////////////////////////////////////////")

  });
	spotify.search({ type: 'track', query: input, limit: 1}, function(err, data) {
    //check if track exist by looking at the length of found items.
    var itemList = data.tracks.items.length;
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
      // if item list is greather than 0, use user input to provide data,
	    if (itemList > 0) {
      console.log("Artist(s) name: " + data.tracks.items[0].artists[0].name);
      console.log("Song name: " + data.tracks.items[0].name);
      console.log("preview link: " + data.tracks.items[0].preview_url);
      console.log("Album name: " + data.tracks.items[0].album.name);
	  	}
      // if item list is less than 0, use pre defined query.
      else {
        spotify.search({ type: 'track', query: "The Sign, Ace of Base", limit: 1}, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        }
        else {
          console.log("Artist(s) name: " + data.tracks.items[0].artists[0].name);
          console.log("Song name: " + data.tracks.items[0].name);
          console.log("preview link: " + data.tracks.items[0].preview_url);
          console.log("Album name: " + data.tracks.items[0].album.name);
        }

        });
      }
	});
}
function movieSearch(input) {
  //log input to log.tex
  var userLog = " //" + command + ", " + userInput;
  fs.appendFile("log.txt", userLog, function(err) {

  if (err) {
    return console.log(err);
  }

  console.log("log.txt was updated!");
  console.log("////////////////////////////////////////////////")

  });
  request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200 && body.length > 100) {
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Country where the movie was produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("Rotten Tomatoes Raing: " + JSON.parse(body).Ratings[1].Value);
    }
    //if a incorrect movie title is input, body length will be lower than 100, if so search for mr.nobdy.
    else if(!error && response.statusCode === 200 && body.length < 100) {
      request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&r=json", function(error, response, body) {
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Country where the movie was produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("Rotten Tomatoes Raing: " + JSON.parse(body).Ratings[1].Value);

      });

    }
  });
}
function random() {

  fs.appendFile("log.txt", "/" + command, function(err) {

  if (err) {
    return console.log(err);
  }

  console.log("log.txt was updated!");
  console.log("////////////////////////////////////////////////")

  });
  fs.readFile("random.txt", "utf8", function(error, data) {
  var dataArr = data.split(",");
  spotifySong(dataArr[1]);
});
}