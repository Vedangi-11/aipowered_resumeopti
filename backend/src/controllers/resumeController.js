const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const multer = require('multer');
const Job = require('../models/job');

const optimizationService = require('../services/optimizationService');
const recommendationService = require('../services/recommendationService');
const storage = require('../middlewares/multer');

const upload = multer({ storage: storage('resumes') });

const uploadResume = async (req, res) => {
  try {
    const { jobTitle } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    // 1. Read the uploaded PDF file
    const filePath = path.join(__dirname, '..', 'uploads', 'resumes', req.file.filename);
    const resumeBuffer = fs.readFileSync(filePath);
    const resumeText = (await pdfParse(resumeBuffer)).text;

    // 2. Find jobs matching the job title (case-insensitive)
    const matchedJobs = await Job.find({ title: new RegExp(jobTitle, 'i'), status: true });

    if (!matchedJobs.length) {
      return res.status(404).json({ error: `No job found with title "${jobTitle}"` });
    }

    // 3. Extract unique required skills from the matched jobs
    const requiredSkills = [
      ...new Set(
        matchedJobs.flatMap(job =>
          job.skills.flatMap(skillString =>
            skillString
              .split(',')
              .map(s => s.trim().toLowerCase())
          )
        )
      )
    ];


    // 4. Generate optimization message and score
    const optimizationMessage = await optimizationService.generateOptimizationMessage(resumeText, requiredSkills);
    const score = await optimizationService.calculateScoreFromSkills(resumeText, requiredSkills);

    // 5. Use improved recommendation engine based on skill matching
    const recommendedJobs = await recommendationService.recommendJobs(resumeText, jobTitle);


    res.status(200).json({
      optimizationMessage,
      score,
      recommendedJobs
    });

  } catch (error) {
    console.error('Error in uploadResume:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  uploadResume,
  upload
};
