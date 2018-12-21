pragma solidity ^0.4.19;
contract Student {

	/*getter and setter methods are yet to be added as required later*/
	struct studentProfile{
		//string username;
		string name;
		string password;
		string dob;
		string email;
		string phone;
		address institute;
		uint marks;

		/* verification info */
		bool isVerified;
	}

	/*student address to their account*/

	/*mapping(address => studentProfile) public students;*/
	mapping(uint => studentProfile) public students;

	uint public studentsCount;

	constructor() public {
		studentsCount=0;
		addStudent("vinayak","abcdefgh","1-1-2000","abc@xyz.com","1234567890",0x0,100,false);
	}

	function addStudent(string _name, string _password, string _dob, string _email, string _phone,
			 address _institute, uint _marks, bool _isVerified) public {
		studentsCount++;
		students[studentsCount/*msg.sender*/]=
			studentProfile(_name,  _password, _dob, _email, _phone, _institute, _marks, _isVerified);
	}

	function setVerified(uint _id){
		/*some checking or manually calling this function to set the value below as true */
		students[_id/*msg.sender*/].isVerified=true;
	}

}

contract Recruiter {

	struct Recruit {
		string username;
		string password;
		string OrganisationName;
		uint256 Contact;
		string OrganisationMail;
	}

	//address RecruiterAddress;
	
	uint public RecruiterCount;
	mapping(/*RecruiterAddress*/uint=>Recruit) public RecruiterId;
	
	function Recruiter () {
		addRecruiter("my","code","Hekko",9192929299,"xyz@abc.com");
	}

	function addRecruiter(string username,string password,string _name,uint256 _contact,string _organisationname) public{
		RecruiterCount++;
		RecruiterId[/*msg.sender*/RecruiterCount] = Recruit(username,password,_name,_contact,_organisationname);
	}

	function getDetails() public view returns(string,string,string,uint256,string){
		return(RecruiterId[1].username,RecruiterId[1].password,RecruiterId[1].OrganisationName,RecruiterId[1].Contact,RecruiterId[1].OrganisationMail);
	}
}

contract Institute{

	struct InstituteStr{
		string instituteName;
		string password;
		string phone;
		string addressInstitute;
	}

	uint public instituteCount;
	mapping(/*institute Address (address)*/uint=>InstituteStr) public institutes;

	constructor() public{
		addInstitute("vjti","abcdefgh","1234567890","mumbai");
	}

	function addInstitute(string _instituteName, string _password, string phone, string _addressInstitute) public {
		instituteCount++;
		institutes[/*msg.sender*/instituteCount] 
			= InstituteStr(_instituteName, _password, phone, _addressInstitute );	
	}
}