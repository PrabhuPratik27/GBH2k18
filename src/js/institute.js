App={
	web3Provider: null,
	contracts: {},
	account: '0x0',

	init: async function(){


		return await App.initWeb3();
	},

	initWeb3: function() {

		if (typeof web3 !== 'undefined') {
    	// If a web3 instance is already provided by Meta Mask.
    		App.web3Provider = web3.currentProvider;
    		web3 = new Web3(web3.currentProvider);
  		} else {
  	    // Specify default instance if no web3 instance provided
      		App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      		web3 = new Web3(App.web3Provider);
    	}
    		return App.initContract();
	},

	initContract: function() {
    	$.getJSON("IDMS.json", function (IDMS) {
	      	App.contracts.IDMS = TruffleContract(IDMS);
	      	App.contracts.IDMS.setProvider(App.web3Provider);
	      
	     	 // App.listenForEvents();

	      	return App.render();
    	});
  	},

  	render: function() {
  		var IDMSinstance;
  		var loader=$("#loader");
  		var content=$("#content");

  		loader.show();
  		content.hide();

  		web3.eth.getCoinbase( function (err,account) {
  			if(err==null)
  				App.account = account;
  		})

  		App.contracts.IDMS.deployed().then( function (instance) {
  			IDMSinstance = instance;
  			return IDMSinstance.studentsCount();
  		}).then( function (sCount) {
  			var studentContainer = $("StudentContainer");
  			studentContainer.empty();

  			//Render the front end
  			for (var i=1; i<=sCount;i++){
  				IDMSinstance.getStudent(i).then(function (student) {
  					var type = student[0];
  					var name = student[1];
  					var dob = student[2];
  					var email = student[3];
  					var phone = student[4];
  					var marks = student[5];
  					var isVerified = student[6];
  				

  				if(isVerified == true){
  					var StudentTemplate="<tr>\
  					<td>"+name+"</td>"+
  					"<td>"+dob+"</td>"+
  					"<td>"+email+"</td>"+
  					"<td>"+phone+"</td>"+
  					"<td>"+marks+"</td>";

  					studentContainer.append(StudentTemplate);
  				}

  				});
  			}
  		});

  		loader.hide();
  		content.show();
  		}
  	};

  	$(function() {
  $(window).load(function() {
    App.init();
  });

});

