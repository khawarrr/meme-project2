const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String 
}, {
  timestamps: true
});

const memeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  mpaaRating: String,
//   cast: [{type: Schema.Types.ObjectId, ref: 'Performer'}],
  reviews: [reviewSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Meme', memeSchema);