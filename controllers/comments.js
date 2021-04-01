const Meme = require('../models/meme');

module.exports = {
  create,
  delete: deleteComment
};

function deleteComment(req, res, next) {
  Meme.findOne({'comments._id': req.params.id}).then(function(meme) {
    const comment = meme.comments.id(req.params.id);
    // ensure that the comment was created by the logged in user
    if (!comment.user.equals(req.user._id)) return res.redirect('/memes');
    comment.remove();
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
    // Add the user-centric info to req.body (the new comment)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    
    meme.comments.push(req.body);
    meme.save(function(err) {
    
      res.redirect(`/memes/${meme._id}`);
    });
  });
}