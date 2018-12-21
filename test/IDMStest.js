var IDMS = artifacts.require("./IDMS.sol");

contract("IDMS", function(accounts) {
  var electionInstance;

  it("initializes with 1 student", function() {
    return IDMS.deployed().then(function(instance) {
      return instance.studentsCount();
    }).then(function(count) {
      assert.equal(count, 1);
    });
  });

  it("it initializes the students with the correct values", function() {
    return IDMS.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.students(1);
    }).then(function(student) {
      assert.equal(student[0], 0, "type of the student ");
      assert.equal(student[1], "vinayak", "contains the correct name");
      assert.equal(student[2], "abcdefgh", "contains the correct pass");
      assert.equal(student[3], "1-1-2000", "contains the dob");
      assert.equal(student[4], "abc@xyz.com", "contains the email");
      assert.equal(student[5], "1234567890", "contains the phone");
      assert.equal(student[6], 0x0, "contains the correct institute addr");
      assert.equal(student[7], 100, "contains the marks");
      assert.equal(student[8], false, "contains the verification value");

      return electionInstance.students(1);
    });
  });
});


contract("Recruiter", function(accounts) {
  var electionInstance;

  it("initializes with 1 Recruiter", function() {
    return IDMS.deployed().then(function(instance) {
      return instance.RecruiterCount();
    }).then(function(count) {
      assert.equal(count, 1);   /// count === 1 count,1 correct number initialized
    });
  });

  it("it initializes the Recruiter with the correct values", function() {
    return IDMS.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.RecruiterId(1);
    }).then(function(student) {
      assert.equal(student[0], 1, "is the type of Recruiter");
      assert.equal(student[1], "my", "contains the username name");
      assert.equal(student[2], "code", "contains the correct pass");
      assert.equal(student[3], "Hekko", "contains the correct organisation name");
      assert.equal(student[4], 9192929299, "contains contact no");
      assert.equal(student[5], "xyz@abc.com", "contains the mail");
      
      

      return electionInstance.RecruiterId(1);
    });
  });
});