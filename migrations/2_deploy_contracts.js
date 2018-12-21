var Student = artifacts.require("./Student.sol");

module.exports = function(deployer) {
  deployer.deploy(Student);
};

var Recruiter  = artifacts.require("./Recruiter.sol");

module.exports = function(deployer) {
  deployer.deploy(Recruiter);
};
