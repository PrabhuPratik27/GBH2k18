var acc, web3, web3Provider;
if (typeof web3 !== 'undefined') {
	// If a web3 instance is already provided by Meta Mask.
	web3Provider = web3.currentProvider;
	web3 = new Web3(web3.currentProvider);
} else {
	// Specify default instance if no web3 instance provided
	App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
	web3 = new Web3(App.web3Provider);
}
web3.eth.getCoinbase(function (err, account) {
	if (err == null){
		acc== account;
		//TO-DO 
	}
});

$(document).ready(function () {
	var loader = $('#loader');
	var content = $('#content');

	loader.hide();
	content.show();
});
var config = {
	apiKey: "AIzaSyAyn0SHrnSlYhoXwfVsz9VRT5I_OKv3BQk",
	authDomain: "idms-15a37.firebaseapp.com",
	databaseURL: "https://idms-15a37.firebaseio.com",
	projectId: "idms-15a37",
	storageBucket: "idms-15a37.appspot.com",
	messagingSenderId: "292949127130"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
var name,dob,email,phone,cgpa,cgpa1;
function onSubmit(){
	name=$("#username").val();
	dob=$("#dob").val();
	email=$("#email").val();
	phone=$("#phone").val();
	cgpa1=$("#cgpa").val();
	cgpa=parseInt(cgpa1, 10);
	writeStudentData(acc, name, dob, email, phone, cgpa);
}
function writeStudentData(acc, name, dob, email, phone, cgpa) {

	var postData = {
		name: name,
		dob: dob,
		email: email,
		phone: phone,
		marks: cgpa,
		isVerified: false
	};

	var newPostKey = database.ref().child('students').push().key;
	var updates = {};
  	updates['/students/' + newPostKey] = postData;
	return database.ref().update(updates);
}