const ChallengeManager = artifacts.require("ChallengeManager");
const Challenger = artifacts.require("Challenger");
const MaxTimeEvaluation = artifacts.require("MaxTimeEvaluation");

module.exports = function(deployer) {
  deployer
    .deploy(ChallengeManager)
    .then(function() {
      return deployer.deploy(Challenger, ChallengeManager.address);
    })
    .then(function() {
      return deployer.deploy(MaxTimeEvaluation);
    });
};
