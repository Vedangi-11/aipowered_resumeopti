const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  skills: { 
    type: [String], 
    required: true 
  },
  salary:{
    type:Number
  },
  companyName:{
    type:String,
    required:true
  },
  companyLogo:{
    type:String,
    required:true
  },
  location:{
    type:String
  },
  email:{
    type:String
  },
  status:{
    type:Boolean,
    default: true
  }
});
module.exports = mongoose.model('Job', jobSchema);
