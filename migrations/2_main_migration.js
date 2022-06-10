const Challenger = artifacts.require("Challenger");
const ChallengeManager = artifacts.require("ChallengeManager");
const MinTimeEvaluation = artifacts.require("MinTimeEvaluation");
const GymToken = artifacts.require("GymToken");
const ERC20Tester = artifacts.require("ERC20Tester");

// const APIConsumer = artifacts.require("APIConsumer");

module.exports = function (deployer) {
  deployer
    .deploy(ChallengeManager, "0x0d5900731140977cd80b7bd2dce9cec93f8a176b")
    .then(function () {
      return deployer.deploy(
        Challenger,
        ChallengeManager.address,
        "0xc2f3eb38ed66c5BD1982bbdb649559f70942bff4"
      );
    })
    .then(function () {
      return deployer.deploy(MinTimeEvaluation, ChallengeManager.address);
    })
    .then(function () {
      return deployer.deploy(GymToken, ChallengeManager.address);
    });
  // .then(function () {
  //   return deployer.deploy(APIConsumer);
  // });
  // deployer.deploy(ERC20Tester, "ERC20Tester", "ERC");
};
