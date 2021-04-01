const Meme = require('../models/meme');

module.exports = {
    index,
    show,
    new: newMeme,
    create,
    delete: deleteMeme,
    edit,
    update,
    allMemes,

  };

//   function index(req, res) {
//     Meme.find({}, function(err, memes) {
//       res.render('/index', { title: 'All Memes', memes });
//     });
//   }

// find looks for a category that matches req.query.category

function index(req, res) {
    console.log(req.query.category);
    Meme.find({category: req.query.category}, function(err, memes) {
        res.render('memes/index', {title: req.query.category, memes });
        //memes/index
        // console.log(err);
    });
}

function allMemes(req, res) {
    Meme.find({}, function(err, memes) {
      res.render('memes/index', { title: 'All Memes', memes });
    });
  }

function create(req, res) {
    const meme = new Meme(req.body);
    // Assign the logged in user's id
    meme.user = req.user._id;
    meme.userName = req.user.name;
    meme.save(function(err) {
      if (err) return render('memes/new');
      // Probably want to go to newly added meme's show view
      res.redirect(`memes/${meme._id}`);
    });
  }

  function deleteMeme(req, res) {
    
    Meme.findByIdAndDelete(
      // Ensue that the meme was created by the logged in user
      req.params.id, function(err) {
        // Deleted meme, so must redirect to index

        res.redirect('/memes/all');
      }
    );
  }

  function edit(req, res) {
    Meme.findOne({_id: req.params.id, user: req.user._id}, function(err, meme) {
      if (err || !meme) return res.redirect('/memes');
      res.render('memes/edit', {meme});
    });
  }

  function update(req, res) {
    Meme.findOneAndUpdate(
      {_id: req.params.id, user: req.user._id},
      // update object with updated properties
      req.body,
      // options object with new: true to make sure updated doc is returned
      {new: true},
      function(err, meme) {
        if (err || !meme) return res.redirect('/memes');
        res.redirect(`memes/${meme._id}`);
      }
    );
  }

  function show(req, res) {
    Meme.findById(req.params.id, function(err, meme) {
        if (err) console.log(err);
        res.render('memes/show', {meme, title: 'Current Meme'});
        // { title: 'Meme Detail', meme}
       
    });
  }
  
  function newMeme(req, res) {
    res.render('memes/new', { title: 'Add Meme' });
  }
  
//   function create(req, res) {
//     // convert nowShowing's checkbox of nothing or "on" to boolean
//     req.body.nowShowing = !!req.body.nowShowing;
//     for (let key in req.body) {
//       if (req.body[key] === '') delete req.body[key];
//     }
//     const meme = new Meme(req.body);
//     meme.save(function(err) {
//       if (err) return res.redirect('/memes/new');
//       console.log(meme);
//       res.redirect(`/memes/${meme._id}`);
//     });
//   }
  