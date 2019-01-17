var mongoose = require('mongoose');

var TestimonialSchema = mongoose.Schema({
  testimonial_person_name: { type: String },
  testimonial_date: { type: String },
  testimonial_content: { type: String }
});

var Testimonial = module.exports = mongoose.model('Testimonial', TestimonialSchema);