
const Job = require('../models/job');

const getJob = async (req, res) => {
  try {
    const j = await Job.find();
    res.status(200).json({data:j});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job roles' });
  }
};
const addJob = async (req, res) => {
  try {
    const data = req.body;
    if (req.files && req.files.companyLogo) {
      data.companyLogo = req.files.companyLogo[0].filename;
    }
    if (!data.companyLogo) {
      return res.status(400).json({ message: 'Company logo is required' });
    }
    data.status = data.status !== undefined ? JSON.parse(data.status) : true;
    const newJob = new Job(data);
    const response = await newJob.save();
    res.status(200).json({ message: 'Job added successfully', data: response });
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const deletejob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete job", error });
  }
}
const updatejob = async (req, res) => {
  try {
      const { title, description, skills, salary, companyName, location, email } = req.body;
      const updatedJob = await Job.findByIdAndUpdate(
          req.params.id,
          { title, description, skills, salary, companyName, location, email},
          { new: true }
      );
      if (!updatedJob) {
          return res.status(400).json({ message: "Job not found" });
      }
      res.status(200).json({ message: "Job updated successfully", data: updatedJob });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};
const updateJobStatus = async (req, res) => {
  try {
    const { jobId, status } = req.body;
    const updatedJob = await Job.findByIdAndUpdate(jobId, { status }, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error('Error in updateJobStatus:', error);
    res.status(500).json({ error: error.message });
  }
};
const jobid = async (req, res) => {
  try {
      const job = await Job.findById(req.params.id);
      if (!job) {
          return res.status(400).json({ message: "Invalid job ID" });
      }
      res.status(200).json({ message: "success", data: job });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};
const jobbytitle = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  try {
    const jobs = await Job.find({ title: { $regex: query, $options: 'i' } });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { addJob, getJob, deletejob, updatejob,updateJobStatus, jobid ,jobbytitle}