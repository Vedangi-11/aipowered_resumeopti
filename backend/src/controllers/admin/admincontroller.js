const Admin = require("../../models/admin");

const registerAdmin=async()=>{

    const already=await Admin.find();
    if(already.length!==0) return console.log(already);

    const data={
        email:process.env.ADMIN_EMAIL,
        password:process.env.ADMIN_PASSWORD
    };

    const insertadmin=new Admin(data);
    const response=await insertadmin.save();
    console.log(response);
}
const adminlogin=async(req,res)=>{
    try{
        const ifvalidEmail=await Admin.find({email:req.body.email});
        
        if(ifvalidEmail.length===0) return res.status(400).json({message:"invalid admin email"});
        if(ifvalidEmail[0].password!==req.body.password) return res.status(400).json({message:"invalid password"});

        res.status(200).json({message:"admin log in",data:ifvalidEmail});
    }
    catch(error){
        console.log9(error);
        res.status(500).json({message:"internal server error"});
    }
}
module.exports={registerAdmin,adminlogin}