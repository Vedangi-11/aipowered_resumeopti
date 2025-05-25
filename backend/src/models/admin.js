const mongoose=require('mongoose');

const adminSchema=mongoose.Schema({
    name:String,
    password: String,
    email: String,
});

const Admin=mongoose.model('admins',adminSchema);

module.exports=Admin;