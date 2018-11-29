console.log('this is loaded');

exports.apiKeys = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
  OMDBid: process.env.OMDB_ID,
  BANDid: process.env.BAND_ID
};
