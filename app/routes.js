var User = require('../app/models/user.js');
var Meme = require('../app/models/meme.js');

module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('index.pug');
    });
    app.post('/earnedMeme', function(req, res){

        Meme.find({}, function(err, group){
                if(err)
                  throw err;  

              var earnedMeme = group[Math.floor(Math.random()*group.length)];
              console.log(earnedMeme);
              addedMemes = req.user.memes;
                addedMemes.push({
                  id : earnedMeme.id, 
                  name: earnedMeme.name, 
                  category: earnedMeme.type, 
                  image: earnedMeme.image, 
                  rarity: earnedMeme.rarity
                }) ;
                User.update({_id: req.user.id}, {
                  memes: addedMemes
                }, function(err, numberAffected, rawResponse) {
                   //handle it
                });
              res.redirect('/profile');
          });

    });
    app.get('/profile', isLoggedIn, function(req, res) {
      console.log(req.user._id);
            res.render('profile.pug', {
              user : req.user,
              memes: req.user.memes
          });
    });
    app.get('/play', function(req, res) {
        res.render('play.pug');
    });
    app.get('/addMeme', function(req, res){
        res.render('addmeme.pug')
    });
    app.post('/addMemer', function(req, res) {
        
              var newmeme = new Meme();
              newmeme.name = req.body.name;
              newmeme.rarity = req.body.rarity;
              newmeme.type = req.body.type;
              newmeme.image = req.body.image
              console.log(newmeme);
              newmeme.save(function(err, savedGroup) {
                if (err)
                  return handleError(err);
                if(savedGroup){
                    console.log("Group Saved")
                    console.log(savedGroup)
                }else{
                  console.log("Group not saved");
                }

        Meme.find({}, function(err, group){
                if(err)
                  throw err;
              console.log(group);
              })
                res.redirect('/addMeme');
              });
    });
    app.get('/play/:id', function(req, res) {
      var id = req.params.id;
      console.log(id);
        Meme.find({}, function(err, group){
                if(err)
                  throw err;
              })
      res.render('gameplay.pug', {type: id});
    });


    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

        app.get('/login', function(req, res) {
            res.render('login.pug', { message: req.flash('loginMessage') });
        });

        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/signup', function(req, res) {
            res.render('signup.pug', { message: req.flash('signupMessage') });
        });

        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

        app.get('/connect/local', function(req, res) {
            res.render('connect-local.pug', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

            // takes you to the group home page where you can join group or search for groups
            app.get('/group', isLoggedIn, function(req, res) {
               Group.find({}, function(err, group){
                if(err)
                  throw err;
                res.render('group.pug', {groups: group, user: req.user});
              })
            })

            app.get('/group/:id', function(req, res) {
              var id = req.params.id;
              //var group = req.params;
              //console.log(req.query.name);
              //console.log("A" + group);
              Group.findOne({
                '_id': id
              }, function(err, group){
                if(err)
                  throw err;
                res.render('group-home.pug', {group: group});
                console.log(group);
              })
            });


    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
