var router = require('express').Router();

var Testimonial = require('../models/testimonial');


// Get All Testimonial 
router.get('/about', (req, res, next) => {
  Testimonial.find({}, (err, testimonials) => {
    if(err) {
      return console.log(err);
    }
    //res.json(testimonials);
    res.render('frontend/about', {
      testimonials: testimonials
    });
  });
});


router.get('/', (req, res) => {
  res.render('frontend/home', {
    title: 'home page'
  });
});

router.get('/about', (req, res) => {
  res.render('frontend/about', {
    title: 'about page'
  });
});

module.exports = router;