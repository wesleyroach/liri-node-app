var keys = require("./keys.js");
var spotify = require("spotify");
var omdb = require("omdb");

// add the ability to enter requests into the random.txt file. LIRI will read this request when
//  the user enters do-what-it-says into the node cli
// the doWhatItSays function will read the random.txt file, turn the request into an array and pass it as arguments
// into  the pick function

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) throw err;
    console.log(data);
    var dataArr = data.split(",");
    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};
// get the OMDB access and put it in a function
var getMovie = function(movieName) {
  omdb.search(movieName, function(err, movies) {
    if (err) {
      return console.error(err);
    }

    if (movies.length < 1) {
      return console.log("No movies were found!");
    }

    movies.forEach(function(movie) {
      console.log("%s (%d)", movie.title, movie.year);
    });

    // Saw (2004)
    // Saw II (2005)
    // Saw III (2006)
    // Saw IV (2007)
    // ...
  });

  omdb.get({ title: movieName }, true, function(err, movie) {
    if (err) {
      return console.error(err);
    }

    if (!movie) {
      return console.log("Movie not found!");
    }

    console.log("%s (%d) %d/10", movie.title, movie.year, movie.imdb.rating);
    console.log(movie.plot);

    // Saw (2004) 7.6/10
    // Two men wake up at opposite sides of a dirty, disused bathroom, chained
    // by their ankles to pipes. Between them lies...
  });
};

// the getMySpotify function is run when the  user types argv[2] spotify-this-song
//  the spotify.search function was taken directly from npm spotify package in the URL npmjs.com

var getArtistsNames = function(artist) {
  return artist.name;
};

var getMySpotify = function(songName) {
  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    // Do something with 'data'
    var songs = data.tracks.items;
    for (var i = 0; i < songs.length; i++) {
      console.log[i];
      console.log("artist(s): " + songs[i].artists.map[getArtistsNames]);
      console.log("song name: " + songs[i].name);
      console.log("preview song:  " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("-----------------------------");
    }
  });
};

// takes the arguments from the runThis function (which collects arguments from the user) and passes them
//into the pick function
// THEN, if spotify-this-song is entered it runs the  getMySpotify function above

var pick = function(caseData, functionData) {
  switch (caseData) {
    case "spotify-this-song":
      getMySpotify(functionData);
      break;
    case "movie-this":
      getMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI say what? Dont know that one");
  }
};
// capture arguments from the user
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};
// what the user enters is captured  below...where [2]  = spotify-this-song and [3] is the name of the song OR
// [2] = movie-this and [3] is the name of the movie
runThis(process.argv[2], process.argv[3]);
