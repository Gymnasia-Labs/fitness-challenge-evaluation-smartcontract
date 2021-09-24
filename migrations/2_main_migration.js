const ChallengeManager = artifacts.require("ChallengeManager");
const Challenger = artifacts.require("Challenger");
const MinSingleTimeEvaluation = artifacts.require("MinSingleTimeEvaluation");

module.exports = function(deployer) {
  deployer
    .deploy(ChallengeManager)
    .then(function() {
      return deployer.deploy(Challenger, ChallengeManager.address);
    })
    .then(function() {
      return deployer.deploy(MinSingleTimeEvaluation, ChallengeManager.address);
    });
};
