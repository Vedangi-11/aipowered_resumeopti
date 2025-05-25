const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Import body-parser here
const resumeRoutes = require('./src/routes/ResumeRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const userroutes=require('./src/routes/userroutes');
const adminroutes=require('./src/routes/adminroutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/companylogo',express.static('src/uploads/companyLogo'))
async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://vedu:vedu2003@cluster0.zcosd2m.mongodb.net/resume?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to the database.");
    } catch (err) {
        console.error("Error connecting to the database: ", err);
    }
}

// Initialize the server asynchronously
async function initializeServer() {
    await connectToDatabase();

    app.use('/api/resume', resumeRoutes);
    app.use('/api/jobs', jobRoutes);
    app.use('/api/user',userroutes);
    app.use('/api/admin',adminroutes)
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

initializeServer();
