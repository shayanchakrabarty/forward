var mongoose = require('mongoose');

var SliderSchema = mongoose.Schema({
  slider_first_text: { type: String },
  slider_second_text: { type: String },
  slider_third_text: { type: String }
});

var Slider = module.exports = mongoose.model('Slider', SliderSchema);