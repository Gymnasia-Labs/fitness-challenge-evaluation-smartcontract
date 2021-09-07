const ChallengeManager = artifacts.require("ChallengeManager");
const Challenger = artifacts.require("Challenger");

module.exports = function(deployer) {
  deployer.deploy(Challenger);
};
