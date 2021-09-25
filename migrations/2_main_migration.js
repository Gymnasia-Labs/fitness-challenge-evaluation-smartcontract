const ChallengeManager = artifacts.require("ChallengeManager");
const Challenger = artifacts.require("Challenger");
const MinTimeEvaluation = artifacts.require("MinTimeEvaluation");

module.exports = function (deployer) {
  deployer
    .deploy(ChallengeManager)
    .then(function () {
      return deployer.deploy(Challenger, ChallengeManager.address);
    })
    .then(function () {
      return deployer.deploy(MinTimeEvaluation, ChallengeManager.address);
    });
};
