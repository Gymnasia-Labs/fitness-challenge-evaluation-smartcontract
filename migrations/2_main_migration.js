const Challenger = artifacts.require("Challenger");
const ChallengeManager = artifacts.require("ChallengeManager");
const MinTimeEvaluation = artifacts.require("MinTimeEvaluation");
// const APIConsumer = artifacts.require("APIConsumer");

module.exports = function (deployer) {
  deployer
    .deploy(ChallengeManager)
    .then(function () {
      return deployer.deploy(Challenger, ChallengeManager.address);
    })
    .then(function () {
      return deployer.deploy(MinTimeEvaluation, ChallengeManager.address);
    })
  // .then(function () {
  //   return deployer.deploy(APIConsumer);
  // });
};
