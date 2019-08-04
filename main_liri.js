require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);    
var axios = require("axios");
var moment = require('moment'); 
var fs=require ("fs");
var category = process.argv[2];
var term = process.argv.slice(3).join(" ");

switch(category) {
    case "spotify-this":
        song();
        break;
    case "movie-this":
        //movieURL = "http://www.ombdapi/com/?apikey=trilogy&t="+term+"&plot=short";
        movie();
        break;
    case "concert-this":
        concertURL = "https://rest.bandsintown.com/artists/"+term+"/events?app_id=codingbootcamp";
        concert();
        break;
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", (err, data) => {
        if(err) {
            console.log(err);
            return;
            };
    console.log(data);
    var dataOutput = data.split(",");
    search = dataOutput[1];

    switch (dataOutput[0]) {
        case "spotify-this":
        song();
        break;
        case "movie-this":
            movieURL = "http://www.ombdapi/com/?apikey=trilogy&t="+term+"&plot=short";
            movie();
            break;
        case "concert-this":
            concertURL = "https://rest.bandsintown.com/artists/"+term+"/events?app_id=codingbootcamp";
            concert();
            break;
            case "do-what-it-says": 
            fs.readFile("random.txt", "utf8", (err, data) => {
                if(err) {
                    console.log(err);
                    return;
                };
            });
            break;
            };
        });
    };
//-----------------------------------CONCERT / BANDS IN TOWN-----------------------------//
function concert() {
    axios.get(concertURL).then(function(response) {
        var jsonData = response.data;
        var concertData = [
            'Venue: ' + jsonData.venue.name,
            'Location: ' + jsonData.venue.city + ' ' + jsonData.venue.country,
            'Date: ' + moment(jsonData.datetime).format('L')
        ].join('\n');
        console.log(concertData);
        });
    }
//-----------------------------------SONG / SPOTIFY-----------------------------//
function song () {
    if (!term) {
      term = 'The Sign';
    }
    this.findSong = function (term) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: term, limit: 1}, function (err, restults) {
        if(err) {
            console.log("error: " + err);
            return;
        }
        var results = data.tracks.items;
        console.log(results[0].name);

    var trackData = [
        'Artist (s): ' + artist.name,
        'Song: ' + track.name,
        'Album: ' + track.album.name,
        track.preview_url ? 'Preview URL: ' + track.preview_url : 'Preview URL: ' + 'none provided'
      ].join('\n');
      console.log(trackData);

    }
    )
    console.log(results)
    }
  //-----------------------------------MOVIES / OMDB-----------------------------//
function movie () {
    if (!term) {
      term = 'Mr. Nobody';
    }
    var movieName = data.split(' ').join('+');
    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(movieUrl);

axios.get(movieUrl).then(function(response) {
    var movie = response.data;
    console.log(movie);
  })

    var movieData = [
      'Title: ' + movie.Title,
      'Year: ' + movie.Year,
      'IMDB Rating: ' + movie.imdbRating,
      'Rotten Tomatoes Rating: ' + movie.Ratings[1].Value,
      'Country: ' + movie.Country,
      'Language(s): ' + movie.Language,
      'Plot: ' + movie.Plot,
      'Actors: ' + movie.Actors
    ].join('\n');
    console.log(movieData);

};
};