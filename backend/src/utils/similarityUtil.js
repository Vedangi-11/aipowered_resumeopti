function computeSimilarity(userSkills, jobSkills) {
  if (!userSkills.length || !jobSkills.length) return 0;

  const skillSet = Array.from(new Set([...userSkills, ...jobSkills]));

  const userVector = skillSet.map(skill => userSkills.includes(skill) ? 1 : 0);
  const jobVector = skillSet.map(skill => jobSkills.includes(skill) ? 1 : 0);

  const dotProduct = userVector.reduce((sum, val, i) => sum + val * jobVector[i], 0);
  const userMagnitude = Math.sqrt(userVector.reduce((sum, val) => sum + val ** 2, 0));
  const jobMagnitude = Math.sqrt(jobVector.reduce((sum, val) => sum + val ** 2, 0));

  const similarity = dotProduct / (userMagnitude * jobMagnitude || 1);
  return similarity;
}
function computeOverlapScore(userSkills, jobSkills) {
  const userSet = new Set(userSkills);
  const jobSet = new Set(jobSkills);

  const commonSkills = [...userSet].filter(skill => jobSet.has(skill));

  return commonSkills.length / jobSkills.length; // match % of job skills
}

module.exports = { computeSimilarity ,computeOverlapScore};
