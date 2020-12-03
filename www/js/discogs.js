var Discogs = require('disconnect').Client;

var db = new Discogs().database();
db.getRelease(176126, function (err, data) {
    console.log(data);
});

var dis = new Discogs('VinylBase/1.0');

var col = new Discogs().user().collection();
col.getReleases('USER_NAME', 0, { page: 2, per_page: 75 }, function (err, data) {
    console.log(data);
});

var db = new Discogs().database();
db.getRelease(1)
    .then(function (release) {
        return db.getArtist(release.artists[0].id);
    })
    .then(function (artist) {
        console.log(artist.name);
    });

// Set the output format to HTML
var dis = new Discogs().setConfig({ outputFormat: 'html' });

// Authenticate by user token
var dis = new Discogs({ userToken: 'https://api.discogs.com/oauth/request_token' });

// Authenticate by consumer key and secret
var dis = new Discogs({
    consumerKey: 'ReVcIzWrrGpoBMyUEqsk',
    consumerSecret: 'YSuLODqrRDTUZittwrchuchSMQpbLrcZb'
});

var dis = new Discogs('MyUserAgent/1.0', { userToken: 'https://api.discogs.com/oauth/request_token' });

const Album = new Schema({
    title: String,
    discogId: Number,
    artists: [Schema.Types.Mixed],
    thumb: String,
    country: String,
    formats: [Schema.Types.Mixed],
    genres: [Schema.Types.Mixed],
    images: [Schema.Types.Mixed],
    labels: [Schema.Types.Mixed],
    notes: String,
    released: String,
    styles: [String],
    tracklist: [Schema.Types.Mixed],
    year: Number,
});
