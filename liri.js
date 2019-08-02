require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var fs = require('fs');

var moment = require('moment'); 


//-----------------------------------BANDS IN TOWN-----------------------------//

var artist = process.argv[3];
//var artist = data.split(' ').join('');


axios
  //.get("https://rest.bandsintown.com/artists/sonvolt/events?app_id=codingbootcamp")
  .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")

  .then(function(response) {

    console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });


//-----------------------------------MOVIES-----------------------------//

var movieName = process.argv[2];

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

//console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title + 
    "\nRelease Year: " + response.data.Year + 
    "\nIMDB Rating: " + response.data.imdbRating + 
    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
    "\nProduced in: " + response.data.Country + 
    "\nLanguage: " + response.data.Language + 
    "\nPlot: " + response.data.Plot + 
    "\nActors: " + response.data.Actors);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

//-----------------------------------SONG / SPOTIFY-----------------------------//
 

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

console.log(spotify);

var song = process.argv[4];
console.log(song);




//--------------------------------------------------



//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.



    //Make it so liri.js can take in one of the following commands:
        //concert-this

            //node liri.js concert-this <artist/band name here>

            //This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

                //Name of the venue

                //Venue location

                //Date of the Event (use moment to format this as "MM/DD/YYYY")

        //spotify-this-song

            //node liri.js spotify-this-song '<song name here>'

            //This will show the following information about the song in your terminal/bash window

                //Artist(s)

                //The song's name

                //A preview link of the song from Spotify

                //The album that the song is from

                //If no song is provided then your program will default to "The Sign" by Ace of Base.

        //movie-this

            //node liri.js movie-this '<movie name here>'

            //This will output the following information to your terminal/bash window:

                    //* Title of the movie.
                    //* Year the movie came out.
                    //* IMDB Rating of the movie.
                    //* Rotten Tomatoes Rating of the movie.
                    //* Country where the movie was produced.
                    //* Language of the movie.
                    //* Plot of the movie.
                    //* Actors in the movie.
                //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

        //do-what-it-says
        
            //node liri.js do-what-it-says

                //Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        
            //It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
        
            //Edit the text in random.txt to test out the feature for movie-this and concert-this.
