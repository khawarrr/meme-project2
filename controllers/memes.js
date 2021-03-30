const Meme = require('../models/meme');

module.exports = {
    index,
    // show,
    // new: newMeme,
    // create
  };

//   function index(req, res) {
//     Meme.find({}, function(err, memes) {
//       res.render('/index', { title: 'All Memes', memes });
//     });
//   }

function index(req, res) {
    Meme.find({}, function(err, memes) {
        res.render('index', { memes });
        // console.log(err);
    });
}


//   function show(req, res) {
//     Meme.findById(req.params.id)
//     .populate('cast').exec(function(err, meme) {
//       // Query for performers not already in this meme's cast array
//       Performer.find(
//         {_id: {$nin: meme.cast}},
//         function(err, performers) {
//           res.render('memes/show', { title: 'Meme Detail', meme, performers });
//         }
//       );
//     });
//   }
  
//   function newMeme(req, res) {
//     res.render('memes/new', { title: 'Add Meme' });
//   }
  
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
  