var Student = artifacts.require("./Student.sol");
var Recruiter  = artifacts.require("./Recruiter.sol");
var Institute  = artifacts.require("./Institute.sol");

module.exports = function(deployer) {
  deployer.deploy(Student);
  deployer.deploy(Recruiter);
  deployer.deploy(Institute);
};
