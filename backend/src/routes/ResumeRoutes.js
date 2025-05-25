const express = require('express');
const { uploadResume, upload } = require('../controllers/resumeController'); // Import the controller

const router = express.Router();

// Endpoint for uploading resumes
router.post('/process', upload.single('resume'), uploadResume); // Using 'upload' middleware

module.exports = router;