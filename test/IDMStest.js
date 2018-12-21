var Student = artifacts.require("./Student.sol");

contract("Student", function(accounts) {
  var electionInstance;

  it("initializes with 1 student", function() {
    return Student.deployed().then(function(instance) {
      return instance.studentsCount();
    }).then(function(count) {
      assert.equal(count, 1);
    });
  });

  it("it initializes the students with the correct values", function() {
    return Student.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.students(1);
    }).then(function(student) {
      assert.equal(student[0], "vinayak", "contains the correct name");
      assert.equal(student[1], "abcdefgh", "contains the correct pass");
      assert.equal(student[2], 12, "contains the correct age");
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