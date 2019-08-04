require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment'); 
var fs = require ("fs");
var category = process.argv[2];
var term = process.argv.slice(3).join(" ");
const chalk = require('chalk');


switch(category) {
    case "spotify-this":
        song();
        break;
    case "movie-this":
        movie();
        break;
    case "concert-this":
        concert();
        break;
        };
    
//-----------------------------------CONCERT / BANDS IN TOWN-----------------------------//
function concert() {
    var concertTerm = term.split(' ').join('+');
    var concertURL = "https://rest.bandsintown.com/artists/"+concertTerm+"/events?app_id=codingbootcamp";
    
    axios.get(concertURL).then(function(response) {
            var concertResponse = response.data;
            var concertData = [
            'Venue: ' + concertResponse[0].venue.name,
            'Location: ' + concertResponse[0].venue.city + ", " +concertResponse[0].venue.country,
            'Date: ' + moment(concertResponse[0].datetime).format('L')
        ].join('\n');
        console.log(chalk.cyan(concertData));
        })
}
//-----------------------------------SONG / SPOTIFY-----------------------------//
    
function song() {
    var songTerm = term.split(' ').join('+');
    var spotify = new Spotify(keys.spotify);    

    spotify.search({ type: 'track', query: songTerm, limit: 1}).then(function (response) {
        var tracks = response.tracks.items;
        tracks.forEach(function (track) {

        var artists = track.artists; 
        var artistsData = [];
            artists.forEach(function (artist) {
            artistsData = [
                artist.name
              ].join(' * ');
            });

            var trackData = [
                'Artist (s): ' + artistsData,
                'Song: ' + track.name,
                'Album: ' + track.album.name,
                track.preview_url ? 'Preview URL: ' + track.preview_url : 'Preview URL: ' + 'none provided'
              ].join('\n');
              console.log(chalk.blue(trackData));
            });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  //-----------------------------------MOVIES / OMDB-----------------------------//
function movie () {
    if (!term) {
      term = 'Mr. Nobody';
    }
    var movieName = term.split(' ').join('+');
    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        console.log(movieUrl);

    axios.get(movieUrl).then(function(response) {

        var movieData = [
        'Title: ' + response.data.Title,
        'Year: ' + response.data.Year,
        'IMDB Rating: ' + response.data.imdbRating,
        'Country: ' + response.data.Country,
        'Language(s): ' + response.data.Language,
        'Plot: ' + response.data.Plot,
        'Actors: ' + response.data.Actors
        ].join('\n');
        console.log(chalk.green(movieData));

})
};