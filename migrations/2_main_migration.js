const ChallengeManager = artifacts.require("ChallengeManager");
const Challenger = artifacts.require("Challenger");

module.exports = function(deployer) {
  var challengeManager;
  // deployer.deploy(Challenger);
  deployer
    .deploy(ChallengeManager)
    .then(function (instance) {
      challengeManager = instance;
      return deployer.deploy(Challenger, challengeManager.address);
    })
};
