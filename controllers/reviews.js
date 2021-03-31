const Meme = require('../models/meme');

module.exports = {
  create,
  delete: deleteReview
};

function deleteReview(req, res, next) {
  Meme.findOne({'reviews._id': req.params.id}).then(function(meme) {
    const review = meme.reviews.id(req.params.id);
    // ensure that the review was created by the logged in user
    if (!review.user.equals(req.user._id)) return res.redirect('/memes');
    review.remove();
    meme.save().then(function() {
      res.redirect(`/memes/${meme._id}`);
    }).catch(function(err) {
      // Let express display an error
      return next(err);
      // Another option
      // res.redirect(`/memes/${meme._id}`);
    });
  });
}

function create(req, res) {
  Meme.findById(req.params.id, function(err, meme) {
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    
    meme.reviews.push(req.body);
    meme.save(function(err) {
      res.redirect(`/memes/${meme._id}`);
    });
  });
}