const ChallengeManager = artifacts.require("ChallengeManager");

module.exports = function (deployer) {
  deployer.deploy(ChallengeManager);
};
