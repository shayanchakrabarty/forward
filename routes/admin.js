var router = require('express').Router();
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');
//include the auth
var auth = require('../config/auth');
var isAdmin = auth.isAdmin;

var About = require('../models/about');
var Testimonial = require('../models/testimonial');

// Get All Testimonial 
router.get('/testimonials', (req, res, next) => {
  Testimonial.find({}, (err, testimonials) => {
    if(err) {
      return console.log(err);
    }
    //res.json(testimonials);
    res.render('admin/testimonial_list', {
      testimonials: testimonials,
      title: 'All Testimonial'
    });
  });
});

// Get Edit Testimonial 
router.get('/edit-testimonial/:id', (req, res, next) => {
  Testimonial.findOne({ _id: req.params.id }, (err, testimonial) => {
    if(err) return console.log(err);

    res.render('admin/edit_testimonial', {
      title: "Edit Testimonial",
      testimonial: testimonial
    });
  });
});


// Post Edit Testimonial
router.post('/edit-testimonial/:id', (req, res, next) => {
  
  req.checkBody('testimonial_person_name', 'Please Provide Testimonial Person Name').notEmpty();
  req.checkBody('testimonial_date', 'Please Provide Date').notEmpty();
  req.checkBody('testimonial_content', 'Please provide Content').notEmpty();

  var name = req.body.testimonial_person_name;
  var date = req.body.testimonial_date;
  var content = req.body.testimonial_content;

  var id = req.params.id;

  var errors = req.validationErrors();

  if(errors) {
    Testimonial.findOne({ _id: id }, (err, testimonial) => {
      if(err) return console.log(err);

      res.render('admin/edit_testimonial', {
        errors: errors,
        title: "Edit Testimonial",
        testimonial: testimonial
      });
    });
  } else {
    Testimonial.findOne({ _id: id }, (err, testimonial) => {
      if(err) return console.log(err);

      testimonial.testimonial_person_name = name;
      testimonial.testimonial_date = date;
      testimonial.testimonial_content = content;

        testimonial.save((err) => {
        if(err) {
          return console.log(err);
        }

        req.flash('success', 'Testimonial is updated Successfully');
        res.redirect('/admin/testimonials');
      });

    });


  }
});

// Delete Testimonial 
router.get('/delete-testimonial/:id', function (req, res) {
  Testimonial.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) { res.send(err); }

    req.flash('success', 'Testimonial deleted!');
    res.redirect('/admin/testimonials/');
  });
});


// Post Add Testimonial
router.post('/add-testimonial', (req, res, next) => {
  req.checkBody('testimonial_person_name', 'Please Provide Testimonial Person Name').notEmpty();
  req.checkBody('testimonial_date', 'Please Provide Date').notEmpty();
  req.checkBody('testimonial_content', 'Please provide Content').notEmpty();


  var errors = req.validationErrors();

  if(errors) {
    res.render('admin/add_testimonial', {
      errors: errors,
      title: 'Add Testimonial'
    });
  } else {
    var testData = {
      testimonial_person_name: req.body.testimonial_person_name,
      testimonial_date: req.body.testimonial_date,
      testimonial_content: req.body.testimonial_content
    };
    var testiinsert = new Testimonial(testData);

    testiinsert.save((err) => {
      if(err) {
        return console.log(err);
      }

      req.flash('success', 'Testimonial is inserted Successfully');
      res.redirect('/admin/testimonials');
    });
  }
});

// Get Add Testimonial 
router.get('/add-testimonial', (req, res, next) => {
  res.render('admin/add_testimonial', { title: 'Add Testimonial' });
});


// about post route
router.post('/about', (req, res, next) => {
  var bannerImage = typeof req.files.banner_image !== "undefined" ? req.files.banner_image.name : "";
  var whyForwardImage = typeof req.files.why_forward_image !== "undefined" ? req.files.why_forward_image.name : "";
  req.checkBody('banner_content', 'Provide Banner Content').notEmpty();
  req.checkBody('about_title', 'Provide About Title').notEmpty();
  req.checkBody('about_content', 'Provide About Content').notEmpty();
  req.checkBody('meet_team_heading', 'Provide Meet Team Heading').notEmpty();
  req.checkBody('why_forward_heading', 'Provide Provide Why Forward Heading').notEmpty();
  req.checkBody('why_forward_content', 'Provide Why Forward Content').notEmpty();
  req.checkBody('testimonial_title', 'Provide Testimonial Title').notEmpty();
  req.checkBody('image', 'You must upload an image').isImage(bannerImage);


  var bannerContent = req.body.banner_content;
  var aboutTitle = req.body.about_title;
  var aboutContent = req.body.about_content;
  var meetTeamHeading = req.body.meet_team_heading;
  var whyForwardHeading = req.body.why_forward_heading;
  var whyForwardContent = req.body.why_forward_content;
  var testimonialTitle = req.body.testimonial_title;

  var errors = req.validationErrors(); 

  if(errors) {
    res.render('admin/about', {
      title: 'About Page',
      errors: errors
    });
  } else {
    var aboutpost = new About({
      banner_content: bannerContent,
      banner_image: bannerImage,
      about_title: aboutTitle,
      about_content: aboutContent,
      meet_team_heading: meetTeamHeading,
      why_forward_heading: whyForwardHeading,
      why_forward_content: whyForwardContent,
      testimonial_title: testimonialTitle,
      why_forward_image: whyForwardImage
    });

    aboutpost.save((err) => {
      if(err) {
        console.log(err);
      }

      if(bannerImage != '') {
        var bannerImage1 = req.files.banner_image;
        var path = 'public/uploads/'+ bannerImage;

        bannerImage1.mv(path, (err) => {
          return console.log(err);
        });
      }

      if(whyForwardImage != '') {
        var whyForwardImage1 = req.files.why_forward_image;
        var path1 = 'public/uploads/'+ whyForwardImage;

        whyForwardImage1.mv(path1, (err) => {
          return console.log(err);
        });
      }

      req.flash('success', 'About Content Added Successfully');

      res.redirect('/admin/about');
    });
  }


});
 
router.get('/dashboard', isAdmin, (req, res) => {
  res.render('admin/dashboard', { title: 'Welcome Admin Panel' });
});

router.get('/home', (req, res, next) => {
  res.render('admin/home', { title: 'Home Page' });
});
router.get('/about', (req, res, next) => {
  About.findOne({_id: '5c4102aaa4e4261658933e6d'}, (err, allaboutdata) => {
    if(err) return console.log(err);

    res.render('admin/about', { 
      title: 'About Page',
      aboutData: allaboutdata
    });
  });
  
});

router.get('/slider', (req, res, next) => {
  res.render('admin/slider', { title: 'Home Slider' });
});

module.exports = router;