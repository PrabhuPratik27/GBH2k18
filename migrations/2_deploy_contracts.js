var Student = artifacts.require("./Student.sol");
var Recruiter  = artifacts.require("./Recruiter.sol");
var Institute  = artifacts.require("./Institute.sol");

module.exports = function(deployer) {
  deployer.deploy(Student);
  deployer.deploy(Recruiter);
<<<<<<< HEAD
  deployer.deploy(Institute);
=======

>>>>>>> e5527428932282963ab17a4a01d9e7598eeaae58
};
 