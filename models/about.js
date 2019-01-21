var mongoose = require('mongoose');

var AboutSchema = mongoose.Schema({
  banner_content: {
    type: String
  },
  banner_image: {
    type: String,
    default : null
  },
  about_title: {
    type: String
  },
  about_content: {
    type: String
  },
  meet_team_heading: {
    type: String
  },
  why_forward_heading: {
    type: String
  },
  why_forward_content: {
    type: String
  },
  why_forward_image: {
    type: String,
    default: null
  },
  testimonial_title: {
    type: String
  }
});

var About = module.exports = mongoose.model('About', AboutSchema);