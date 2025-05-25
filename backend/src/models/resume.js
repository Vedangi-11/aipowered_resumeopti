const mongoose = require('mongoose');
const resumeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  skills: [String]});
const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
