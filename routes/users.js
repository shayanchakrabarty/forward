var router = require('express').Router();
var passport = require('passport');

router.get('/login', (req, res, next) => {
  if (res.locals.user) res.redirect('/admin/dashboard');

  res.render('admin/login', {
    title: 'Admin Login'
  });
});

// Login post route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// router.post("/login", passport.authenticate('local',
//   {
//     failureRedirect: '/users/login',
//     failureFlash: true
//   }), function (req, res) {
//     if (req.body.remember) {
//       console.log(req.body.remember);
//       req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
//     } else {
//       req.session.cookie.expires = false; 
//     }
//     res.redirect('/admin/dashboard');
//   });

router.get('/logout', (req, res, next) => {
  req.logout();
  req.flash('success', 'You have Successfully Logout');
  res.redirect('/users/login');
});
module.exports = router;