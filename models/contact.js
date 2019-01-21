var mongoose = require('mongoose');

var ContactSchema = mongoose.Schema({
  contact_name: { type: String },
  contact_phone: { type: String },
  contact_message: { type: String}
});

var Contact = module.exports = mongoose.model('Contact', ContactSchema);