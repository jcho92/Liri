var axios = require("axios");
require("dotenv").config();
var keys = require("./keys.js");
const moment = require('moment')
var Spotify = require('node-spotify-api');
var fs = require("fs");


const date = moment()

function apiKeys(key) {
    this.key = key
}
var Spotify = require('node-spotify-api');
var spotifyKey = new apiKeys(keys.apiKeys);
var omdbkey = spotifyKey.key.OMDBid;
var bandkey = spotifyKey.key.BANDid;
// section for spotify key
var Key = spotifyKey.key.id;
var KeySecret = spotifyKey.key.secret;
var spotify = new Spotify({
    id: Key,
    secret: KeySecret
});

// spotify function
function spotifythis() {
    var queryName = process.argv[3];
    if (queryName == undefined) {
        spotify
            .search({ type: 'track', query: 'Ace of base' })
            .then(function (response) {
                console.log(response.tracks.items[0].name);
                console.log(response.tracks.items[0].album.name);
                console.log(response.tracks.items[0].artists[0].name);
                console.log(response.tracks.items[0].preview_url);
                var text = response.tracks.items[0].name
                fs.appendFile("log.txt", ",-" + text, function (err) {

                    // If an error was experienced we will log it.
                    if (err) {
                        console.log(err);
                    }

                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                        fs.readFile("log.txt", "utf8", function (error, data) {
                            if (error) {
                                return console.log(error);
                            }
                            console.log(data);
                            var dataArr = data.split(",");
                            console.log(dataArr);


                        })


                    }

                }
                )

            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        spotify
            .search({ type: 'track', query: queryName })
            .then(function (response) {
                console.log(response.tracks.items[0].name);
                console.log(response.tracks.items[0].album.name);
                console.log(response.tracks.items[0].artists[0].name);
                console.log(response.tracks.items[0].preview_url);
               var text = response.tracks.items[0].name
                fs.appendFile("log.txt", ",-" + text, function (err) {

                    // If an error was experienced we will log it.
                    if (err) {
                        console.log(err);
                    }

                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                        fs.readFile("log.txt", "utf8", function (error, data) {
                            if (error) {
                                return console.log(error);
                            }
                            console.log(data);
                            var dataArr = data.split(",");
                            console.log(dataArr);


                        })


                    }

                }
                )
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

var input = process.argv[2]

// function for OMDB

function OMDB() {
    var movieName = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdbkey;
    console.log(movieName)
    if (movieName == undefined) {
        queryUrl = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=" + omdbkey;
        console.log('have you seen mr.nobody');
        console.log('you should check it out');
        axios.get(queryUrl).then(
            function (response) {
                console.log('Title: ' + response.data.Title);
                console.log('dvd release date: ' + response.data.DVD)
                console.log('website: ' + response.data.Website)
                console.log('year: ' + response.data.Year)
                console.log('Country: ' + response.data.Country)
                console.log('imdbRating: ' + response.data.imdbRating)
                console.log('Ratings: ' + response.data.Ratings[1])
                console.log('Languange: ' + response.data.Language)
                console.log('Plot: ' + response.data.Plot)
                console.log('Actors: ' + response.data.Actors)
            }
        )

    } else {
        axios.get(queryUrl).then(
            function (response) {
                console.log('Title: ' + response.data.Title);
                console.log('dvd release date: ' + response.data.DVD)
                console.log('website: ' + response.data.Website)
                console.log('year: ' + response.data.Year)
                console.log('Country: ' + response.data.Country)
                console.log('imdbRating: ' + response.data.imdbRating)
                console.log('Ratings: ' + response.data.Ratings[1])
                console.log('Languange: ' + response.data.Language)
                console.log('Plot: ' + response.data.Plot)
                console.log('Actors: ' + response.data.Actors)
                var text = 'Title: ' + response.data.Title + ', ' + 'dvd release date: ' + response.data.DVD + ', ' + 'website: ' + response.data.Website + ', ' + 'year: ' + response.data.Year + ', ' + 'Country: ' + response.data.Country + ', ' + 'imdbRating: ' + response.data.imdbRating + ', ' + 'Ratings: ' + response.data.Ratings[1] + ', ' + 'Languange: ' + response.data.Language + ', ' + 'Plot: ' + response.data.Plot + ', ' + 'Actors: ' + response.data.Actors
                fs.appendFile("log.txt", ",-" + text, function (err) {

                    // If an error was experienced we will log it.
                    if (err) {
                        console.log(err);
                    }

                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                        fs.readFile("log.txt", "utf8", function (error, data) {
                            if (error) {
                                return console.log(error);
                            }
                            console.log(data);
                            var dataArr = data.split(",");
                            console.log(dataArr);


                        })


                    }

                }
                )
            })
    }
}



//function for bandsintown



function bandsintown() {
    var bandArtist = process.argv[3]
    var bandqueryURL = "https://rest.bandsintown.com/artists/" + bandArtist + "/events?app_id=" + bandkey
    axios.get(bandqueryURL).then(
        function (response) {
            for (i = 0; i < 5; i++) {
                console.log(response.data[i].venue.name)
                console.log(response.data[i].venue.city)
                console.log(response.data[i].venue.country)
                console.log(response.data[i].datetime)
                var date = moment(response.data[i].datetime).format("MM/DD/YYYY")
                console.log(date)
                var text = response.data[i].venue.name + ", " + response.data[i].venue.city + ", " + response.data[i].venue.country + ", " + date
                // fs.appendFile("log.txt", ",-" + text, function (err) {

                //     // If an error was experienced we will log it.
                //     if (err) {
                //         console.log(err);
                //     }

                //     // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                //     else {
                //         fs.readFile("log.txt", "utf8", function (error, data) {
                //             if (error) {
                //                 return console.log(error);
                //             }
                //             console.log(data);
                //             var dataArr = data.split(",");
                //             console.log(dataArr);


                //         })


                //     }

                // });
                // console.log("---------------");
                // fs.appendFile("log.txt", ",-" + text, function (err) {

                //     // If an error was experienced we will log it.
                //     if (err) {
                //         console.log(err);
                //     }

                //     // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                //     else {
                //         fs.readFile("log.txt", "utf8", function (error, data) {
                //             if (error) {
                //                 return console.log(error);
                //             }
                //            var dataArr = data.split(",");
                //             console.log(dataArr);

                        
                //         })


                //     }

                // });
            }


        }
    )
}
function dowhatitsays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        console.log(dataArr[0])
        console.log(dataArr[1])
        process.argv[2] = dataArr[0];
        process.argv[3] = dataArr[1];
        switch (process.argv[2]) {
            case 'concert-this':
                bandsintown();
                break;
            case 'spotify-this-song':
                spotifythis();
                break;
            case 'movie-this':
                OMDB();
                break;
            case 'do-what-it-says':
                dowhatitsays();
                break;
        }


    });
}

switch (input) {
    case 'concert-this':
        bandsintown();
        break;
    case 'spotify-this-song':
        spotifythis();
        break;
    case 'movie-this':
        OMDB();
        break;
    case 'do-what-it-says':
        dowhatitsays();
        break;
}

