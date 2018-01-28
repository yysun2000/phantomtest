var phantom = require("phantom");
var sitepage = "https://www.hyundaihmall.com/front/cob/loginPup.do";
var sitepage2 = "https://www.hyundaihmall.com/";
var browser = phantom.create().then(function(ph){
  browser = ph;
  page1();
});

var page1 = function(){

  return browser.createPage(['--ignore-ssl-errors=true', '--load-images=true']).then(function(page){
    page.on("onLoadFinished",function(status){
      if(status=="success"){
        console.log(page)
        page.render("img/login.png");
        console.log("LOGIN : DONE!");
      }
    })

    page.open("https://www.hyundaihmall.com/front/cob/loginPup.do")
    .then(function(status){
      return page.property('content');
    })
    .then(function(contents){
      page.evaluate(function(){
        document.querySelector(".loginwrap .idway > input.loginbox").value = "yysun2000";
        document.querySelector(".loginwrap .pwdway > input.loginbox").value = "1qaz2wsx";
        memberLogin('ajax');
        return;
      }).then(function(){
        page2().then(page3);
      })
    })
  });
}
var page2 = function(){

  return browser.createPage().then(function(page){
    page.on("onLoadFinished",function(status){
      if(status=="success"){
        console.log("MAIN : DONE!");
        page.render("img/main.png");
      }
    })
    page.on("onClosing",function(){
      consloe.log("CLOSE");
    })

    page.open("https://www.hyundaihmall.com/")
    .then(function(status){
      page.property('viewportSize', {width: 1200, height: 600})
      return page.property('content');
    })
    .then(function(contents){
    })
  });
}
var page3 = function(){

  return browser.createPage().then(function(page){
    page.on("onLoadFinished",function(status){
      if(status=="success"){
        console.log("DETAIL : DONE!");
        page.render("img/order.png");
      }
    })
    page.on("onClosing",function(){
      consloe.log("CLOSE");
    })

    page.open("http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2034133480&sectId=427015")
    .then(function(status){
      page.property('viewportSize', {width: 1200, height: 600})
      return page.property('content');
    })
    .then(function(contents){
      page.evaluate(function(){
        buyDirect();

      }).then(function(){
        var _page = page;
        setTimeout(function(){
          var page = _page;
          _page.evaluate(function(){
            $(".payType #payType1").click();
  //          $(".paymentForm select[name='stlmCrdInf']").val('03|I||02').trigger('change');

            $(".paymentForm select[name='stlmCrdInf']").val('08|N|5|07').trigger('change');
            $("#agreeChk").click()
            order();
          }).then(function(){

            page.on("onLoadStarted",function(data){
              console.log(data);
            })
            page.on("onLoadFinished",function(data){
              console.log(data);
            })
            page.on("onClosing",function(data){
              console.log(data);
            })
            page.on("onInitialized",function(data){
              console.log(data);
            })
            page.on("onCallback",function(data){
              console.log(data);
            })
            page.on("onConsoleMessage",function(data){
              console.log(data);
            })
            page.on("onResourceReceived",function(data){
              console.log(data);
            })
            page.render("img/ordered.png");

            var p = page;/*
            page.switchToFrame("smpiFrame").then(function() {
              p.evaluate(function(){
                TabChoice('ACS');
                $("#cdNo1").val("1234");
                $("#cdNo2").val("1234");
                $("#cdNo3").val("1234");
                $("#cdNo4").val("1234");
                $("#cvcV").val("1234");

              }).then(function(){
                p.render("img/lottecard.png");
              })
                // now the context of `page` will be the iframe if frame name or position exists
            });*/
          })
        },3000);

      })
    })
  });
}

var page4 = function(){

  return browser.createPage().then(function(page){
    page.on("onLoadFinished",function(status){
      if(status=="success"){
        console.log("ORDER : DONE!");
        page.render("img/order.png");
      }
    })
    page.on("onClosing",function(){
      consloe.log("CLOSE");
    })

    page.open("https://www.hyundaihmall.com/front/oda/order.do")
    .then(function(status){
      page.property('viewportSize', {width: 1200, height: 600})
      return page.property('content');
    })
    .then(function(contents){
    })
  });
}
/*
page1.open(sitepage).then(function(status){
}).then(function(content){
  page1.on("onLoadFinished",function(status){
    if(status=="success"){
      page.render("img/login.png");
    }
  })
})
*/

/*
phantom.create().then(function(ph){
    _ph = ph;
    return _ph.createPage();
}).then(function(page){
    _page = page;
    _page.property('viewportSize', {width: 1200, height: 600})
    return _page.open(sitepage);
}).then(function(status){
    return _page.property('content')
}).then(function(content){
    _page.render("img/login.png");
    _page.evaluate(function(){
      document.querySelector(".loginwrap .idway > input.loginbox").value = "yysun2000";
      document.querySelector(".loginwrap .pwdway > input.loginbox").value = "1qaz2wsx";
      memberLogin('ajax');
    }).then(function(data){
      phOpen("https://www.hyundaihmall.com/",function(page){
        console.log("로그인 완료!");
        page.render("img/loginMain.png");
      })

      phOpen("http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2034133480&sectId=141253",function(page){
        page.render("img/productDetail.png");

        phOpen("https://www.hyundaihmall.com/front/oda/order.do",function(){
          _page.render("img/order.png");
        })
      })
    })

}).catch(function(e){
   console.log(e);
});


function phOpen(url,callback){
  _page.open(url)
  .then(function(){})
  .then(function(){
    callback(_page);
    _page.on("onLoadFinished",function(status){
      if(status=="success"){
      //  callback();

      }
    })
  })
}*/
