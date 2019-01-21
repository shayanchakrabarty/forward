var router = require('express').Router();
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');
//include the auth
var auth = require('../config/auth');
var isAdmin = auth.isAdmin;

var About = require('../models/about');
var Testimonial = require('../models/testimonial');
var Team = require('../models/team');
var Slider = require('../models/slider');


// Edit Add Slider
router.post('/edit-slider/:id', (req, res, next) => {

  var sliderFirstText = req.body.slider_first_text;
  var sliderSecondText = req.body.slider_second_text;
  var sliderThirdText = req.body.slider_third_text;

  var id = req.params.id;

  var errors = req.validationErrors(); 

  if(errors) {
    Slider.findOne({ _id: id }, (err, slider) => {
      if(err) { console.log(err); }

      res.render('admin/edit_slider', {
        title: 'Add Slider',
        errors: errors,
        slider: slider
      });
    });

  } else {

    Slider.findOne({ _id: id }, (err, slider) => {

        slider.slider_first_text = sliderFirstText;
        slider.slider_second_text = sliderSecondText;
        slider.slider_third_text = sliderThirdText;

        slider.save((err) => {
          if(err) {
            console.log(err);
          }

          req.flash('success', 'Slider Updated Successfully');
         
          res.redirect('/admin/sliders');
        });
      });
    }
});


// Get Edit Team 
router.get('/edit-slider/:id', (req, res, next) => {
  Slider.findOne({ _id: req.params.id }, (err, slider) => {
    if(err) return console.log(err);

    res.render('admin/edit_slider', {
      title: "Edit Slider",
      slider: slider
    });
  });
});


// Delete Slide
router.get('/delete-slider/:id', function (req, res) {
  Slider.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) { res.send(err); }

    req.flash('success', 'Slide deleted!');
    res.redirect('/admin/sliders/');
  });
});

// Post Add Slider
router.post('/add-slider', (req, res, next) => {

  var sliderFirstText = req.body.slider_first_text;
  var sliderSecondText = req.body.slider_second_text;
  var sliderThirdText = req.body.slider_third_text;

  var errors = req.validationErrors(); 

  if(errors) {
    res.render('admin/add_slider', {
      title: 'Add Slider',
      errors: errors
    });
  } else {

    var addSlide = new Slider({
      slider_first_text: sliderFirstText,
      slider_second_text: sliderSecondText,
      slider_third_text: sliderThirdText
    });


      addSlide.save((err) => {
        if(err) {
          console.log(err);
        }

        req.flash('success', 'Slider Added Successfully');
       
        res.redirect('/admin/sliders');
      });
    }
});



// Get Add Slider 
router.get('/add-slider', (req, res, next) => {
  res.render('admin/add_slider', { title: 'Add Slider' });
});


// Get All Sliders
router.get('/sliders', (req, res, next) => {
  Slider.find({}, (err, sliders) => {
    if(err) {
      return console.log(err);
    }
    //res.json(testimonials);
    res.render('admin/slider_list', {
      sliders: sliders,
      title: 'All Sliders'
    });
  });
});

// Get Edit Team 
router.get('/edit-team/:id', (req, res, next) => {
  Team.findOne({ _id: req.params.id }, (err, team) => {
    if(err) return console.log(err);

    res.render('admin/edit_team', {
      title: "Edit Team Member",
      team: team
    });
  });
});


// Post Edit Team
router.post('/edit-team/:id', (req, res, next) => {
  
  var memberImage = typeof req.files.member_image !== "undefined" ? req.files.member_image.name : "";
  req.checkBody('member_name_en', 'Provide Member Name').notEmpty();
  req.checkBody('member_content', 'Provide Member Content').notEmpty();
  req.checkBody('member_linkedin_link', 'Provide LinkedIn Link').notEmpty();
  req.checkBody('member_email', 'Provide Email in correct format').notEmpty().isEmail();
  req.checkBody('member_phone', 'Provide Phone').notEmpty();
  //req.checkBody('image', 'You must upload an image').isImage(memberImage);

  var memberNameEn = req.body.member_name_en;
  var memberNameCn = req.body.member_name_cn;
  var memberContent = req.body.member_content;
  var memberLinkedinLink = req.body.member_linkedin_link;
  var memberEmail = req.body.member_email;
  var memberPhone = req.body.member_phone;

  var memberImageOld = req.body.member_image_old_img;

  var id = req.params.id;

  var errors = req.validationErrors();

  if(errors) {
    Team.findOne({ _id: id }, (err, team) => {
      if(err) return console.log(err);

      res.render('admin/edit_team', {
        errors: errors,
        title: "Edit Team Member",
        team: team
      });
    });
  } else {
    Team.findOne({ _id: id }, (err, team) => {
      if(err) return console.log(err);

      team.member_name_en = memberNameEn;
      team.member_name_cn = memberNameCn;
      team.member_content = memberContent;
      team.member_linkedin_link = memberLinkedinLink;
      team.member_email = memberEmail;
      team.member_phone = memberPhone;
      if(memberImage == "") {
        team.member_image = memberImageOld;
      } else {
        team.member_image = memberImage;
      }

        team.save((err) => {
        if(err) {
          return console.log(err);
        }

        if(memberImage != '') {
            var memberImage1 = req.files.member_image;
            var path = 'public/uploads/'+ memberImage;
            memberImage1.mv(path, (err) => {
              return console.log(err);
          });
        }

        req.flash('success', 'Team Member is updated Successfully');
        res.redirect('/admin/teams');
      });

    });


  }
});


// Delete Team
router.get('/delete-team/:id', function (req, res) {
  Team.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) { res.send(err); }

    req.flash('success', 'Team Member deleted!');
    res.redirect('/admin/teams/');
  });
});



// Post Add Team
router.post('/add-team', (req, res, next) => {
  var memberImage = typeof req.files.member_image !== "undefined" ? req.files.member_image.name : "";
  req.checkBody('member_name_en', 'Provide Member Name').notEmpty();
  req.checkBody('member_content', 'Provide Member Content').notEmpty();
  req.checkBody('member_linkedin_link', 'Provide LinkedIn Link').notEmpty();
  req.checkBody('member_email', 'Provide Email in correct format').notEmpty().isEmail();
  req.checkBody('member_phone', 'Provide Phone').notEmpty();
  //req.checkBody('image', 'You must upload an image').isImage(memberImage);


  var memberNameEn = req.body.member_name_en;
  var memberNameCn = req.body.member_name_cn;
  var memberContent = req.body.member_content;
  var memberLinkedinLink = req.body.member_linkedin_link;
  var memberEmail = req.body.member_email;
  var memberPhone = req.body.member_phone;

  var errors = req.validationErrors(); 

  if(errors) {
    res.render('admin/add_team', {
      title: 'Add Member',
      errors: errors
    });
  } else {

    var addTeam = new Team({
      member_name_en: memberNameEn,
      member_name_cn: memberNameCn,
      member_image: memberImage,
      member_content: memberContent,
      member_linkedin_link: memberLinkedinLink,
      member_email: memberEmail,
      member_phone: memberPhone
    });


      addTeam.save((err) => {
        if(err) {
          console.log(err);
        }

        if(memberImage != '') {
          var memberImage1 = req.files.member_image;
          var path = 'public/uploads/'+ memberImage;

          memberImage1.mv(path, (err) => {
            return console.log(err);
          });
        }

        req.flash('success', 'Member Added Successfully');
       
        res.redirect('/admin/teams');
      });
    }
});

//// Get Add Team 
router.get('/add-team', (req, res, next) => {
  res.render('admin/add_team', { title: 'Add Member' });
});



// Get All Team Members 
router.get('/teams', (req, res, next) => {
  Team.find({}, (err, teams) => {
    if(err) {
      return console.log(err);
    }
    //res.json(testimonials);
    res.render('admin/team_list', {
      teams: teams,
      title: 'All Members'
    });
  });
});


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
  //req.checkBody('image', 'You must upload an image').isImage(bannerImage);


  var bannerContent = req.body.banner_content;
  var aboutTitle = req.body.about_title;
  var aboutContent = req.body.about_content;
  var meetTeamHeading = req.body.meet_team_heading;
  var whyForwardHeading = req.body.why_forward_heading;
  var whyForwardContent = req.body.why_forward_content;
  var testimonialTitle = req.body.testimonial_title;
  var id = req.body.edit_id;

  var bannerOldImg = req.body.banner_image_old_img;
  var whyForwardOldImg = req.body.why_forward_image_old_img;

  var errors = req.validationErrors(); 

  if(errors) {
    res.render('admin/about', {
      title: 'About Page',
      errors: errors,
      aboutBanContent: bannerContent,
      aboutBanImg: bannerOldImg,
      aboutTitle: aboutTitle,
      aboutContent: aboutContent,
      aboutTeamHeading: meetTeamHeading,
      aboutWhyHeading: whyForwardHeading,
      aboutWhyContent: whyForwardContent,
      aboutWhyImg: whyForwardOldImg,
      aboutTest: testimonialTitle,
      id: id
    });
  } else {
/*    var aboutpost = new About({
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
*/
    About.findById({ _id: id }, (err, aboutpost) => {
      if(err) return console.log(err);

      aboutpost.banner_content = bannerContent;
      aboutpost.about_title = aboutTitle;
      aboutpost.about_content = aboutContent;
      aboutpost.meet_team_heading = meetTeamHeading;
      aboutpost.why_forward_heading = whyForwardHeading;
      aboutpost.why_forward_content = whyForwardContent;
      aboutpost.testimonial_title = testimonialTitle;
      if(bannerImage == "") {
        aboutpost.banner_image = bannerOldImg;
      } else {
        aboutpost.banner_image = bannerImage;
      }

      if(whyForwardImage == "") {
        aboutpost.why_forward_image = whyForwardOldImg;
      } else {
        aboutpost.why_forward_image = whyForwardImage;
      }

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
  var id = '5c4307606fb7d2169ccd042e';
  About.findOne({_id: id }, (err, allaboutdata) => {
    if(err) return console.log(err);

    res.render('admin/about', { 
      id: id,
      title: 'About Page',
      aboutBanContent: allaboutdata.banner_content,
      aboutBanImg: allaboutdata.banner_image,
      aboutTitle: allaboutdata.about_title,
      aboutContent: allaboutdata.about_content,
      aboutTeamHeading: allaboutdata.meet_team_heading,
      aboutWhyHeading: allaboutdata.why_forward_heading,
      aboutWhyContent: allaboutdata.why_forward_content,
      aboutWhyImg: allaboutdata.why_forward_image,
      aboutTest: allaboutdata.testimonial_title

    });
  });
  
});

router.get('/slider', (req, res, next) => {
  res.render('admin/slider', { title: 'Home Slider' });
});

module.exports = router;