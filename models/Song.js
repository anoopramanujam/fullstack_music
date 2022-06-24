const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: String,
  },
  playtime: {
    type: String,
  },
  artists: [
    {
      artist: {
        type: Schema.Types.ObjectId,
        ref: 'artist'
      }
    }
  ]
})

module.exports = Song = mongoose.model('song', SongSchema);