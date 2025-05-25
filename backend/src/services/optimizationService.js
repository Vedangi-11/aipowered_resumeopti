const natural = require('natural');
const Job = require('../models/job');
const tokenizer = new natural.WordTokenizer();

function stemTokens(text) {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  return tokens.map(token => natural.PorterStemmer.stem(token));
}

const optimizationService = {
  generateOptimizationMessage: async (resumeText, requiredSkills) => {
    const resumeTokens = stemTokens(resumeText);
    const missingKeywords = requiredSkills.filter(skill => {
      const skillTokens = stemTokens(skill);
      return !skillTokens.every(token => resumeTokens.includes(token));
    });

    let message = 'Your resume is well-optimized!';
    if (missingKeywords.length > 0) {
      message = `Your resume could benefit from including the following skills: ${missingKeywords.join(', ')}`;
    }

    return message;
  },

  calculateScoreFromSkills: async (resumeText, requiredSkills) => {
    const resumeTokens = stemTokens(resumeText);
    const matchedCount = requiredSkills.reduce((count, skill) => {
      const skillTokens = stemTokens(skill);
      const isMatch = skillTokens.every(token => resumeTokens.includes(token));
      return isMatch ? count + 1 : count;
    }, 0);

    const score = requiredSkills.length > 0 ? (matchedCount / requiredSkills.length) * 5 : 0;
    return Math.round(score * 10) / 10;
  }
};

module.exports = optimizationService;

