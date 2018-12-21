var Student = artifacts.require("./Student.sol");
var Recruiter  = artifacts.require("./Recruiter.sol");

module.exports = function(deployer) {
  deployer.deploy(Student);
  deployer.deploy(Recruiter);

};
 