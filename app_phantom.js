var phantom = require('node-phantom');

var sitepage = "https://www.hyundaihmall.com/front/cob/loginPup.do";
var phInstance = null;
var countdata = 0;
var log = function(data,data2,data3){
  if(data == "Sending NOOP command." || data == "Received NOOP command.") return;
  if(data!==undefined) console.log(data);
  if(data2!==undefined) console.log(data2);
};
var nolog = function() {};
var myPage;
phantom.create([],{ logLevel: 'info', logger: { info:log,warn: log, debug: log, error: log } })
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
	// use page
  page.onLoadFinished = function(data){
    countdata = 0;
    console.log("TEST");
    if(data == "success"){
      console.log("img/done"+countdata+".png");
      page.render("done"+countdata+".png");
    }
  }
      page.property('viewportSize', {width: 1200, height: 600})
      page.open(sitepage).then(function(){

        page.evaluate(function(){
          document.querySelector(".loginwrap .idway > input.loginbox").value = "yysun2000";
          document.querySelector(".loginwrap .pwdway > input.loginbox").value = "1qaz2wsx";
          memberLogin('ajax');
          return;
        })


      })

    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });
