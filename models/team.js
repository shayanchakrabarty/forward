var mongoose = require('mongoose');

var TeamSchema = mongoose.Schema({
  member_name_en: { type: String },
  member_name_cn: { type: String },
  member_image: { type: String, default: null },
  member_content: { type: String },
  member_linkedin_link: { type: String },
  member_email: { type: String },
  member_phone: { type: String },
});

var Team = module.exports = mongoose.model('Team', TeamSchema);