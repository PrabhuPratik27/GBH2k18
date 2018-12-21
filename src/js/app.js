App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  contracts: {},

  init: async function() {
    // Load pets.
    // $.getJSON('../pets.json', function(data) {
    //   var petsRow = $('#petsRow');
    //   var petTemplate = $('#petTemplate');

    //   for (i = 0; i < data.length; i ++) {
    //     petTemplate.find('.panel-title').text(data[i].name);
    //     petTemplate.find('img').attr('src', data[i].picture);
    //     petTemplate.find('.pet-breed').text(data[i].breed);
    //     petTemplate.find('.pet-age').text(data[i].age);
    //     petTemplate.find('.pet-location').text(data[i].location);
    //     petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

    //     petsRow.append(petTemplate.html());
    //   }
    // });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // TODO: refactor conditional
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
  // listenForEvents: function () {
  //   App.contracts.IDMS.deployed().then(function (instance) {
      
  //   })
  // },
  render: function () {
    var IDMSinstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    //Load Account Data
    web3.eth.getCoinbase(function (err, account) {
      if (err == null){
        App.account == account;
        //TO-DO 
      }
    })

    App.contracts.IDMS.deployed().then(function (instance) {
      IDMSinstance = instance;
      return IDMSinstance.RecruiterCount();
    }).then(function(rCount){
      var recruitersContainer = $('#recruitersContainer');
      recruitersContainer.empty();
    
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
