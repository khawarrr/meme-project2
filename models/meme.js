const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String 
}, {
  timestamps: true
});

const memeSchema = new Schema({
  // title: {
  //   type: String,
  //   required: true
  // },
  category: {
    type: String,
    enum: ["Gaming", "GA", "Covid"]
  },
  image: String,

  user: {type: Schema.Types.ObjectId, ref: 'User'},

  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Meme', memeSchema);