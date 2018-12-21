pragma solidity ^0.4.19;

/// TYPE 1- STUDENT , 2 - Recruiter 3 - institute


contract IDMS{
	struct studentProfile{
		//string username;
		uint Type;
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
		
		addStudent(0,"vinayak","abcdefgh","1-1-2000","abc@xyz.com","1234567890",0x0,100,false);
		addRecruiter(1,"my","code","Hekko",9192929299,"xyz@abc.com");
		addInstitute(2,"vjti","abcdefgh","1234567890","mumbai");
	}

	function addStudent(uint Type,string _name, string _password, string _dob, string _email, string _phone,
			 address _institute, uint _marks, bool _isVerified) public {
		studentsCount++;
		students[studentsCount/*msg.sender*/]=
			studentProfile(Type,_name,  _password, _dob, _email, _phone, _institute, _marks, _isVerified);
	}

	function setVerified(uint _id) public{
		/*some checking or manually calling this function to set the value below as true */
		students[_id/*msg.sender*/].isVerified=true;
	}

	//----------------------------------------------------------------------------------------------------------------------------
	struct Recruit {
		uint Type;
		string username;
		string password;
		string OrganisationName;
		uint256 Contact;
		string OrganisationMail;
	}

	//address RecruiterAddress;
	
	uint public RecruiterCount;
	mapping(/*RecruiterAddress*/uint=>Recruit) public RecruiterId;
	
	//uint public recruitersStudentsCount;
	//mapping(uint /*recruiters (adddress)*/ => studentProfile	) recruitersStudents;

	function addRecruiter(uint Type,string username,string password,string _name,uint256 _contact,string _organisationname) public{
		RecruiterCount++;
		RecruiterId[/*msg.sender*/RecruiterCount] = Recruit(Type,username,password,_name,_contact,_organisationname);
	}

	function getDetails() public view returns(uint,string,string,string,uint256,string){
		return(RecruiterId[1].Type,RecruiterId[1].username,RecruiterId[1].password,RecruiterId[1].OrganisationName,RecruiterId[1].Contact,RecruiterId[1].OrganisationMail);
	}

	uint public recruitersStudentsCount;
	mapping(uint/*recruiter address*/ => uint[] /*student address*/) public recruitersStudents;

	function getRecruitersStudents(uint _rid, uint _itr) public view returns(uint/*student address*/){
		return recruitersStudents[_rid][_itr];
	}

	function setRecruiterStudents(uint _rid, uint _sid) public {
		recruitersStudents[_rid].push(_sid);
	}

	function getRecruitersStudentsCount (uint _rid) public view returns(uint) {
		return recruitersStudents[_rid].length;
	}
	

	// function getRecruitersStudentsCount(uint _rId)public view returns(uint){
	// 	return recruitersStudents[_rId].length;
	// }

	// function getRecruitersStudents(uint _rId, uint _i) public view 
	// returns(uint , string , string , string , string , string ,address , uint ,bool ) {
	// 	studentProfile s=recruitersStudents[_rId ][_i];
		
	// 	//return (s[0],s[1],s[2],s[3],s[4],s[5],s[6],s[7],s[8]);
	// 			.Type,
	// 			recruitersStudents[_rId ][_i].name,
	// 			recruitersStudents[_rId ][_i].password,
	// 			recruitersStudents[_rId ][_i].dob,
	// 			recruitersStudents[_rId ][_i].email,
	// 			recruitersStudents[_rId ][_i].phone,
	// 			recruitersStudents[_rId ][_i].institute,
	// 			recruitersStudents[_rId ][_i].marks,
	// 			recruitersStudents[_rId ][_i].isVerified
				
	// 		);
	// }

	// function setRecruiterStudents(uint _rId, uint _sId){
	// 	recruitersStudents[_rId].push(students[_sId/*msg.sender*/]);

	// }

	//----------------------------------------------------------------------------------------------------------------------------
		


	struct InstituteStr{
		uint Type;
		string instituteName;
		string password;
		string phone; 
		string addressInstitute;
	}

	uint public instituteCount;
	mapping(/*institute Address (address)*/uint=>InstituteStr) public institutes;

	
	function addInstitute(uint Type,string _instituteName, string _password, string phone, string _addressInstitute) public {
		instituteCount++;
		institutes[/*msg.sender*/instituteCount] 
			= InstituteStr(Type,_instituteName, _password, phone, _addressInstitute );	
	}
}