const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  songs: [
    {
      song: {
        type: Schema.Types.ObjectId,
        ref: 'song'
      }
    }
  ]
})

module.exports = Playlist = mongoose.model('playlist', SongSchema);