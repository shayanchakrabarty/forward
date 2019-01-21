var router = require('express').Router();

var Testimonial = require('../models/testimonial');
var Team = require('../models/team');
var About = require('../models/about');
var Slider = require('../models/slider');
var Contact = require('../models/contact');

//post contact us
router.post('/contact-us', (req, res, next) => {
  req.checkBody('contact_name', 'Provide Name').notEmpty();
  req.checkBody('contact_phone', 'Provide Phone').notEmpty();
  req.checkBody('contact_message', 'Provide Message').notEmpty();

  var errors = req.validationErrors();

    if(errors) {
        Slider.find({}, (err, slider) => {
          if(err) return console.log(err);

          res.render('frontend/home', {
            title: 'home page',
            slider: slider,
            errors: errors
          });
        });

    } else {

      var contact = new Contact({
        contact_name: req.body.contact_name,
        contact_phone: req.body.contact_phone,
        contact_message: req.body.contact_message
      });

      contact.save((err) => {
        if(err) return console.log(err);

        req.flash('success', 'Thanks For Contracting');

        res.redirect('/');

      });
    }
});

// Get All Testimonial 
router.get('/about', (req, res, next) => {
  About.findOne({ _id: '5c4307606fb7d2169ccd042e' }, (err, aboutData) => {
    Testimonial.find({}, (err, testimonials) => {
      Team.find({}, (err, teams) => {
        if(err) {
         return console.log(err);
        }
          //res.json(aboutData);
          res.render('frontend/about', {
            title: 'Forward: Our Story | Why Forward',
            aboutData: aboutData,
            teams: teams,
            testimonials: testimonials
        });
      });
    });
  });

});


router.get('/', (req, res) => {
  Testimonial.find({}, (err, testimonials) => {
    Slider.find({}, (err, slider) => {
      if(err) return console.log(err);

      res.render('frontend/home', {
        title: 'home page',
        slider: slider,
        testimonials: testimonials
      });
    });
  });


});


module.exports = router;