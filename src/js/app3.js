App.contracts.IDMS.deployed().then(function (instance) {
IDMSinstance = instance;
return IDMSinstance.RecruiterCount();
}).then(function(rCount){
	var recruitersContainer = $('#recruitersContainer');
	recruitersContainer.empty();var len_r;
	IDMSinstance.getRecruitersStudentsCount(App.account).then(function(len){
		len_r=len;
	});
	var type_user_inst;
	IDMSinstance.GetUsers(App.account).then(function(type_user){
		type_user_inst=type_user;
	});
	if(type_user_inst==2){
		for(var i=1;i<=len_r;i++){
			IDMSinstance.getRecruitersStudents(App.account,i).then(function(student){
				IDMSinstance.getStudent(student).then(function(s_type, name, dob, email, phone, marks, isVerified ){
					var recruiterTemplate="<tr><td>"+name+"</td>"+
					 "<td>"+dob+"</td>"+
					 "<td>"+email+"</td>"+
					 "<td>"+phone+"</td>"+
					 "<td>"+marks+"</td> </tr>";
					recruitersContainer.append(recruiterTemplate);
				});
			}
		}
	} else if (type_user_inst==1){
		//Render recruiter card
		for (var i = 1; i<= rCount; i++){
			IDMSinstance.getDetails(i).then(function(recruiter){
				var type = recruiter[0];
				var username = recruiter[1];
				var org_name = recruiter[3];
				var contact = recruiter[4];
				var mail = recruiter[5];

				var recruiterTemplate = "<div class=\"col-xs-4 col-sm-4 col-md-4 nopad text-center\">\
				<label class=\"image-checkbox\">\
				<img class=\"img-responsive\" src=\"images/portfolio-1.jpg\" />\
				<div class=\"desc\"><br>\
				<h3>"+org_name+"</h3>"+
				"<p>"+contact+"</p><br>"+
				"<p>"+mail+"</p><br>"+
				"</div><input type=\"checkbox\" name=\"image[]\" value=\"\" />"+
				"<i class=\"fa fa-check hidden\"></i> </label> </div>";
				recruitersContainer.append(recruiterTemplate);
			});
		}
	}

	
	
});