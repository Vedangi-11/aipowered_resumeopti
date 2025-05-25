const Job = require('../models/job');
const natural = require('natural');
const { computeSimilarity, computeOverlapScore } = require('../utils/similarityUtil');

const tokenizer = new natural.WordTokenizer();

function stemTokens(text) {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  return tokens.map(token => natural.PorterStemmer.stem(token));
}
function normalizeSkill(skill) {
  return natural.PorterStemmer.stem(skill.toLowerCase().replace(/[.-\s]/g, ''));
}
const recommendJobs = async (resumeText, jobTitle) => {
  const resumeStems = stemTokens(resumeText);
  const resumeSkillsNormalized = [...new Set(resumeStems)];
  const jobs = await Job.find({
    title: { $regex: jobTitle, $options: 'i' },
    status: true,
  });

  const scoredJobs = jobs.map((job) => {
    const jobSkillStems = job.skills.flatMap(skillStr =>
      skillStr.split(',').map(s => normalizeSkill(s.trim()))
    );


    const matchedSkills = jobSkillStems.filter(skill =>
      resumeSkillsNormalized.includes(skill)
    );

    const score = matchedSkills.length;
    const similarity = computeSimilarity(resumeSkillsNormalized, jobSkillStems);
    const overlapScore = computeOverlapScore(resumeSkillsNormalized, jobSkillStems);
    return {
      ...job._doc,
      matchCount: score,
      matchedSkills,
      similarity,
      overlapScore,
    };
  });


  // Filter only jobs with at least 1 skill match
  const filteredJobs = scoredJobs
    .filter(job => job.matchCount >= 1)
    .sort((a, b) => b.matchCount - a.matchCount);

  return filteredJobs;
};

module.exports = { recommendJobs };