"use strict";function preventClickDirective(){function e(e,a,t){"#"===t.href&&a.on("click",function(e){e.preventDefault()})}return{restrict:"E",link:e}}function bootstrapCollapseDirective(){function e(e,a,t){"collapse"==t.toggle&&a.attr("href","javascript;;").attr("data-target",t.href.replace("index.html",""))}return{restrict:"E",link:e}}function navigationDirective(){function e(e,a,t){a.hasClass("nav-dropdown-toggle")&&angular.element("body").width()>782?a.on("click",function(){angular.element("body").hasClass("compact-nav")||a.parent().toggleClass("open").find(".open").removeClass("open")}):a.hasClass("nav-dropdown-toggle")&&angular.element("body").width()<783&&a.on("click",function(){a.parent().toggleClass("open").find(".open").removeClass("open")})}return{restrict:"E",link:e}}function sidebarNavDynamicResizeDirective(e,a){function t(a,t,r){if(t.hasClass("sidebar-nav")&&angular.element("body").hasClass("fixed-nav")){var o=angular.element(window).height();a.$watch(function(){var e=angular.element("header").outerHeight();angular.element("body").hasClass("sidebar-off-canvas")?t.css("height",o):t.css("height",o-e)}),angular.element(e).bind("resize",function(){var e=angular.element(window).height(),a=angular.element("header").outerHeight(),r=angular.element(".sidebar-header").outerHeight(),o=angular.element(".sidebar-footer").outerHeight();angular.element("body").hasClass("sidebar-off-canvas")?t.css("height",e-r-o):t.css("height",e-a-r-o)})}}return{restrict:"E",link:t}}function layoutToggleDirective(e){function a(e,a,t){a.on("click",function(){a.hasClass("sidebar-toggler")&&angular.element("body").toggleClass("sidebar-hidden"),a.hasClass("aside-menu-toggler")&&angular.element("body").toggleClass("aside-menu-hidden")})}return{restrict:"E",link:a}}function collapseMenuTogglerDirective(){function e(e,a,t){a.on("click",function(){a.hasClass("navbar-toggler")&&!a.hasClass("layout-toggler")&&angular.element("body").toggleClass("sidebar-mobile-show")})}return{restrict:"E",link:e}}function bootstrapCarouselDirective(){function e(e,a,t){"carousel"==t.ride&&a.find("a").each(function(){$(this).attr("data-target",$(this).attr("href").replace("index.html","")).attr("href","javascript;;")})}return{restrict:"E",link:e}}function bootstrapTooltipsPopoversDirective(){function e(e,a,t){"tooltip"==t.toggle&&angular.element(a).tooltip(),"popover"==t.toggle&&angular.element(a).popover()}return{restrict:"A",link:e}}function bootstrapTabsDirective(){function e(e,a,t){a.click(function(e){e.preventDefault(),angular.element(a).tab("show")})}return{restrict:"A",link:e}}function cardCollapseDirective(){function e(e,a,t){if("collapse"==t.toggle&&a.parent().hasClass("card-actions")){a.parent().parent().parent().find(".card-block").hasClass("in")&&a.find("i").addClass("r180");var r="collapse-"+Math.floor(1e9*Math.random()+1);a.attr("data-target","#"+r),a.parent().parent().parent().find(".card-block").attr("id",r),a.on("click",function(){a.find("i").toggleClass("r180")})}}return{restrict:"E",link:e}}function LineCtrl(e){e.labels=["January","February","March","April","May","June","July"],e.series=["Series A","Series B"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]]}function BarCtrl(e){e.labels=["2006","2007","2008","2009","2010","2011","2012"],e.series=["Series A","Series B"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]]}function DoughnutCtrl(e){e.labels=["Download Sales","In-Store Sales","Mail-Order Sales"],e.data=[300,500,100]}function RadarCtrl(e){e.labels=["Eating","Drinking","Sleeping","Designing","Coding","Cycling","Running"],e.data=[[65,59,90,81,56,55,40],[28,48,40,19,96,27,100]]}function PieCtrl(e){e.labels=["Download Sales","In-Store Sales","Mail-Order Sales"],e.data=[300,500,100]}function PolarAreaCtrl(e){e.labels=["Download Sales","In-Store Sales","Mail-Order Sales","Tele Sales","Corporate Sales"],e.data=[300,500,100,40,120]}function trafficDemoCtrl(e){function a(e,a){return Math.floor(Math.random()*(a-e+1)+e)}for(var t=[],r=[],o=[],n=0;n<=27;n++)t.push(a(50,200)),r.push(a(80,100)),o.push(65);e.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Thursday","Wednesday","Thursday","Friday","Saturday","Sunday"],e.series=["Current","Previous","BEP"],e.data=[t,r,o],e.colors=[{backgroundColor:convertHex(brandInfo,10),borderColor:brandInfo,pointHoverBackgroundColor:"#fff"},{backgroundColor:"transparent",borderColor:brandSuccess,pointHoverBackgroundColor:"#fff"},{backgroundColor:"transparent",borderColor:brandDanger,pointHoverBackgroundColor:"#fff",borderWidth:1,borderDash:[8,5]}],e.options={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{drawOnChartArea:!1},ticks:{callback:function(e){return e.charAt(0)}}}],yAxes:[{ticks:{beginAtZero:!0,maxTicksLimit:5,stepSize:Math.ceil(50),max:250}}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}function dateRangeCtrl(e){e.date={startDate:moment().subtract(5,"days"),endDate:moment()},e.opts={drops:"down",opens:"left",ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract(1,"days"),moment().subtract(1,"days")],"Last 7 days":[moment().subtract(7,"days"),moment()],"Last 30 days":[moment().subtract(30,"days"),moment()],"This month":[moment().startOf("month"),moment().endOf("month")]}},e.$watch("date",function(e){},!1)}function socialBoxCtrl(e){e.labels=["January","February","March","April","May","June","July"],e.data1=[[65,59,84,84,51,55,40]],e.data2=[[1,13,9,17,34,41,38]],e.data3=[[78,81,80,45,34,12,40]],e.data4=[[35,23,56,22,97,23,64]],e.colors=[{backgroundColor:"rgba(255,255,255,.1)",borderColor:"rgba(255,255,255,.55)",pointHoverBackgroundColor:"#fff"}],e.options={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}function sparklineChartCtrl(e){e.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],e.data1=[[65,59,84,84,51,55,40]],e.data2=[[1,13,9,17,34,41,38]],e.data3=[[78,81,80,45,34,12,40]],e.data4=[[35,23,56,22,97,23,64]],e.default=[{backgroundColor:"transparent",borderColor:"#d1d4d7"}],e.primary=[{backgroundColor:"transparent",borderColor:brandPrimary}],e.info=[{backgroundColor:"transparent",borderColor:brandInfo}],e.danger=[{backgroundColor:"transparent",borderColor:brandDanger}],e.warning=[{backgroundColor:"transparent",borderColor:brandWarning}],e.success=[{backgroundColor:"transparent",borderColor:brandSuccess}],e.options={scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}function horizontalBarsCtrl(e){e.data=[{day:"Monday",new:34,recurring:78},{day:"Tuesday",new:56,recurring:94},{day:"Wednesday",new:12,recurring:67},{day:"Thursday",new:43,recurring:91},{day:"Friday",new:22,recurring:73},{day:"Saturday",new:53,recurring:82},{day:"Sunday",new:9,recurring:69}]}function horizontalBarsType2Ctrl(e){e.gender=[{title:"Male",icon:"icon-user",value:43},{title:"Female",icon:"icon-user-female",value:37}],e.source=[{title:"Organic Search",icon:"icon-globe",value:191235,percent:56},{title:"Facebook",icon:"icon-social-facebook",value:51223,percent:15},{title:"Twitter",icon:"icon-social-twitter",value:37564,percent:11},{title:"LinkedIn",icon:"icon-social-linkedin",value:27319,percent:8}]}function usersTableCtrl(e,a){e.users=[{avatar:"1.jpg",status:"active",name:"Yiorgos Avraamu",new:!0,registered:"Jan 1, 2015",country:"USA",flag:"USA.png",usage:"50",period:"Jun 11, 2015 - Jul 10, 2015",payment:"mastercard",activity:"10 sec ago",satisfaction:"48"},{avatar:"2.jpg",status:"busy",name:"Avram Tarasios",new:!1,registered:"Jan 1, 2015",country:"Brazil",flag:"Brazil.png",usage:"10",period:"Jun 11, 2015 - Jul 10, 2015",payment:"visa",activity:"5 minutes ago",satisfaction:"61"},{avatar:"3.jpg",status:"away",name:"Quintin Ed",new:!0,registered:"Jan 1, 2015",country:"India",flag:"India.png",usage:"74",period:"Jun 11, 2015 - Jul 10, 2015",payment:"stripe",activity:"1 hour ago",satisfaction:"33"},{avatar:"4.jpg",status:"offline",name:"Enéas Kwadwo",new:!0,registered:"Jan 1, 2015",country:"France",flag:"France.png",usage:"98",period:"Jun 11, 2015 - Jul 10, 2015",payment:"paypal",activity:"Last month",satisfaction:"23"},{avatar:"5.jpg",status:"active",name:"Agapetus Tadeáš",new:!0,registered:"Jan 1, 2015",country:"Spain",flag:"Spain.png",usage:"22",period:"Jun 11, 2015 - Jul 10, 2015",payment:"google",activity:"Last week",satisfaction:"78"},{avatar:"6.jpg",status:"busy",name:"Friderik Dávid",new:!0,registered:"Jan 1, 2015",country:"Poland",flag:"Poland.png",usage:"43",period:"Jun 11, 2015 - Jul 10, 2015",payment:"amex",activity:"Yesterday",satisfaction:"11"}]}function clientsTableCtrl(e,a){e.users=[{avatar:"1.jpg",status:"active",name:"Yiorgos Avraamu",registered:"Jan 1, 2015",activity:"10 sec ago",transactions:189,comments:72},{avatar:"2.jpg",status:"busy",name:"Avram Tarasios",registered:"Jan 1, 2015",activity:"5 minutes ago",transactions:156,comments:76},{avatar:"3.jpg",status:"away",name:"Quintin Ed",registered:"Jan 1, 2015",activity:"1 hour ago",transactions:189,comments:72},{avatar:"4.jpg",status:"offline",name:"Enéas Kwadwo",registered:"Jan 1, 2015",activity:"Last month",transactions:189,comments:72},{avatar:"5.jpg",status:"active",name:"Agapetus Tadeáš",registered:"Jan 1, 2015",activity:"Last week",transactions:189,comments:72},{avatar:"6.jpg",status:"busy",name:"Friderik Dávid",registered:"Jan 1, 2015",activity:"Yesterday",transactions:189,comments:72}]}function random(e,a){return Math.floor(Math.random()*(a-e+1)+e)}function barChartCtrl(e){for(var a=[],t=[],r=[],o=[],n=0;n<=16;n++)a.push("1"),t.push(random(40,100)),r.push(random(20,100)),o.push(random(60,100));e.labels=a,e.data=[t],e.data1=[r],e.data2=[o],e.options={showScale:!1,scaleFontSize:0,scaleShowGridLines:!1,barStrokeWidth:0,barBackground:"rgba(221, 224, 229, 1)"},e.colors=[{backgroundColor:brandInfo,borderColor:"rgba(0,0,0,1)",highlightFill:"#818a91",pointborderColor:"#000"}]}function convertHex(e,a){return e=e.replace("#",""),r=parseInt(e.substring(0,2),16),g=parseInt(e.substring(2,4),16),b=parseInt(e.substring(4,6),16),result="rgba("+r+","+g+","+b+","+a/100+")",result}function cardChartCtrl1(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[65,59,84,84,51,55,40]],e.colors=[{backgroundColor:brandPrimary,borderColor:"rgba(255,255,255,.55)"}],e.options={maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,e.data[0])-5,max:Math.max.apply(Math,e.data[0])+5}}]},elements:{line:{borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}}}function cardChartCtrl2(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[1,18,9,17,34,22,11]],e.colors=[{backgroundColor:brandInfo,borderColor:"rgba(255,255,255,.55)"}],e.options={maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,e.data[0])-5,max:Math.max.apply(Math,e.data[0])+5}}]},elements:{line:{tension:1e-5,borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}}}function cardChartCtrl3(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[78,81,80,45,34,12,40]],e.data4=[[35,23,56,22,97,23,64]],e.colors=[{backgroundColor:"rgba(255,255,255,.2)",borderColor:"rgba(255,255,255,.55)"}],e.options={maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{line:{borderWidth:2},point:{radius:0,hitRadius:10,hoverRadius:4}}}}function random(e,a){return Math.floor(Math.random()*(a-e+1)+e)}function cardChartCtrl4(e){for(var a=[],t=[],r=2e3;r<=2016;r++)a.push(r),t.push(random(40,100));e.labels=a,e.data=[t],e.colors=[{backgroundColor:"rgba(255,255,255,.3)",borderWidth:0}],e.options={maintainAspectRatio:!1,scales:{xAxes:[{display:!1,barPercentage:.6}],yAxes:[{display:!1}]}}}function cardChartCtrl5(e){for(var a=[],t=[],r=0;r<=15;r++)a.push(r),t.push(random(40,100));e.labels=a,e.data=[t],e.colors=[{backgroundColor:brandPrimary,borderColor:"transparent",borderWidth:1}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]}}}function cardChartCtrl6(e){for(var a=[],t=[],r=0;r<=15;r++)a.push(r),t.push(random(40,100));e.labels=a,e.data=[t],e.colors=[{backgroundColor:brandDanger,borderColor:"transparent",borderWidth:1}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]}}}function cardChartCtrl7(e){for(var a=[],t=[],r=0;r<=15;r++)a.push(r),t.push(random(40,100));e.labels=a,e.data=[t],e.colors=[{backgroundColor:brandSuccess,borderColor:"transparent",borderWidth:1}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]}}}function cardChartCtrl8(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[65,59,84,84,51,55,40]],e.colors=[{backgroundColor:"transparent",borderColor:brandInfo}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1,points:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0}}}}function cardChartCtrl9(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[65,59,84,84,51,55,40]],e.colors=[{backgroundColor:"transparent",borderColor:brandSuccess}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1,points:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0}}}}function cardChartCtrl10(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[65,59,84,84,51,55,40]],e.colors=[{backgroundColor:"transparent",borderColor:brandWarning}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1,points:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0}}}}function cardChartCtrl11(e){e.labels=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e.data=[[4,18,9,17,34,22,11,3,15,12,18,9]],e.colors=[{backgroundColor:"transparent",borderColor:"rgba(255,255,255,.55)"}],e.options={maintainAspectRatio:!1,scales:{xAxes:[{display:!1,points:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0}}},e.colors2=[{backgroundColor:"rgba(0,0,0,.2)",borderWidth:0}],e.options2={maintainAspectRatio:!1,scales:{xAxes:[{display:!1,barPercentage:.6}],yAxes:[{display:!1,ticks:{beginAtZero:!0}}]}}}function cardChartCtrl12(e){e.labels=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],e.data=[[75,59,94,104,151,155,240]],e.colors=[{backgroundColor:"transparent",borderColor:grayLighter,pointBackgroundColor:"#fff",borderWidth:3}],e.options={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{point:{radius:4,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}function cardChartCtrl13(e){e.labels=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e.data=[[31e3,34e3,27e3,24e3,28e3,42500,42e3,3e4,35500,35500,41500,41600]],e.colors=[{backgroundColor:"transparent",borderColor:"#fff",pointBackgroundColor:brandPrimary}],e.options={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{drawOnChartArea:!1,color:"transparent",zeroLineColor:"transparent"},ticks:{fontColor:"#fff",maxTicksLimit:3,maxRotation:0}}],yAxes:[{gridLines:{color:"rgba(255,255,255,.2)",zeroLineColor:"rgba(255,255,255,.2)"},ticks:{maxTicksLimit:10,stepSize:Math.ceil(4500),max:45e3,fontColor:"#fff",callback:function(e){return"$"+e}}}]},elements:{point:{radius:4,borderWidth:2,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}},e.labels2=["US","PL","GB","DE","NL","CA","FI","RU","AU","N/A"],e.data2=[[35,14,10,8,6,6,5,4,3,9]],e.colors2=[{backgroundColor:brandSuccess,borderWidth:0}],e.options2={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{maxRotation:0},barPercentage:.6}],yAxes:[{display:!1,ticks:{beginAtZero:!0}}]}}}function dataSvc(e,a){function t(){return e(p+"/api/account/users").query()}function r(){if(m.isAuth)return e(p+"/api/account?username=:username")}function o(){return e(p+"/api/account/user/:id",null,{update:{method:"PUT"}})}function n(){return e(p+"/api/roles/ManageUsersInRole")}function s(){return e(p+"/api/roles").query()}function i(a){return e(p+"/api/todos?SailorId=:sailorId").query({sailorId:a})}function l(){return e(p+"/api/todos/:todoId",null,{update:{method:"PUT"}})}function c(){return e(p+"/api/Pocs/:id",null,{update:{method:"PUT"}})}function d(){return e(p+"/api/Projects/:id",null,{update:{method:"PUT"}})}function u(){return e(p+"/api/TeamMembers/:id",null,{update:{method:"PUT"}})}var p="http://localhost:5000",m=a.authentication;return{getUsers:t,getCurUser:r,manageUser:o,addRole:n,getRoles:s,getToDos:i,manageToDos:l,managePocs:c,manageProjs:d,manageTeam:u}}function loginCtrl(e,a,t,r){function o(){t.login(e.loginData).then(function(e){r.transitionTo("app.main",{},{reload:!0})},function(a){e.message=a.data.error_description})}e.login=o,e.loginData={},e.message=""}function profileCtrl(e,a,t,r){function o(){s.update({id:e.userData.id},e.newData,function(a){e.userData=a}),e.enableEdit=!1}var n=t.authentication,s=a.manageUser();e.enableEdit=!1,e.updateProfile=o,e.userData={},function(){n.isAuth?e.userData=a.getCurUser().get({username:n.userName},function(a){e.newData=a}):r.transitionTo("app.main")}()}function registerCtrl(e,a,t,r,o){function n(a){switch(a.slice(-3)){case"ENS":e.registration.rank="O1";break;case"TJG":e.registration.rank="O2";break;case"SR":e.registration.rank="E1";break;case"SA":e.registration.rank="E2";break;case"SN":e.registration.rank="E3"}switch(a.slice(-2)){case"SR":e.registration.rank="E1";break;case"SA":e.registration.rank="E2";break;case"SN":e.registration.rank="E3";break;case"CS":e.registration.rank="E8";break;case"CM":e.registration.rank="E9";break;case"LT":e.registration.rank="O3"}switch(a[a.length-1]){case"3":e.registration.rank="E4";break;case"2":e.registration.rank="E5";break;case"1":e.registration.rank="E6";break;case"C":e.registration.rank="E7"}}function s(a){/^(.{6,})/.test(a)?e.hasSix=!0:e.hasSix=!1,/[a-z]/.test(a)?e.hasLower=!0:e.hasLower=!1,/[A-Z]/.test(a)?e.hasUpper=!0:e.hasUpper=!1,/\d/.test(a)?e.hasDigit=!0:e.hasDigit=!1,/[^A-Za-z0-9]/.test(a)?e.hasSpecial=!0:e.hasSpecial=!1,a?i(a):(e.hasSix=!1,e.hasLower=!1,e.hasUper=!1,e.hasDigit=!1,e.hasSpecial=!1)}function i(a){e.hasSix&&e.hasLower&&e.hasUpper&&e.hasDigit&&e.hasSpecial?e.validPassword=!0:e.validPassword=!1,e.validPassword&&(e.showPwRules=!1)}function l(){r.saveRegistration(e.registration).then(function(a){e.savedSuccessfully=!0,e.message="Registration succssful!  Logging you in...",c()},function(a){var t=[];for(var r in a.data.modelState)for(var o=0;o<a.data.modelState[r].length;o++)t.push(a.data.modelState[r][o]);e.message="Failed to register user. "+t.join(" ")})}function c(){var a=t(function(){t.cancel(a),e.loginData={userName:e.registration.firstName+"."+e.registration.lastName,password:e.registration.password},r.login(e.loginData).then(function(e){o.transitionTo("app.main",{},{reload:!0})},function(a){e.message=a.data.error_description})},2e3)}e.getRank=n,e.message="",e.passwordStrength=s,e.registration={},e.registration.blueBadge=!1,e.savedSuccessfully=!1,e.signUp=l,e.startTimer=c,e.validatePassword=i}function navbarCtrl(e,a,t){function r(){t.logOut(),e.path("/dashboard")}var o=this;o.authentication=t.authentication,o.logOut=r,o.userData={},function(){o.authentication.isAuth&&(o.userData=a.getCurUser().get({username:o.authentication.userName}))}()}function pocsCtrl(e,a,t,r,o,n){function s(){e.pocs=u.query(),e.showAdd=!1,e.showEdit=!1,e.update={},e.newPoc={}}function i(e){u.save(e).$promise.then(function(){s()})}function l(e){u.delete({id:e}).$promise.then(function(){s()})}function c(e){u.update({id:e.id},e),s()}function d(a){e.showEdit=!0,e.update=a,r.hash("pocs"),n()}var u=a.managePocs();e.addPoc=i,e.deletePoc=l,e.pocs={},e.saveUpdate=c,e.toggleEdit=d,s()}function toDoCtrl(e,a,t){function r(){l.newToDo.sailorId=l.userData.id,i.save(l.newToDo,function(e){l.toDos.push(e),l.newToDo={},l.newToDo.priority="low",t.document.getElementById("toDoItem").focus()})}function o(e){i.delete({id:e},function(e){l.toDos=a.getToDos(l.userData.id)})}function n(){l.showAdd=!l.showAdd}var s=e.authentication,i=a.manageToDos(),l=this;l.authed=!1,l.newToDo={},l.toDos=[],l.userData={},l.showAdd=!1,l.addToDo=r,l.delToDo=o,l.toggleAdd=n,function(){s.isAuth&&(l.authed=!0,l.userData=a.getCurUser().get({username:s.userName},function(e){l.toDos=e.toDos}))}()}function rosterCtrl(e,a){function t(a){switch(a){case"recall":e.showRate=!0,e.showRank=!1,e.showName=!0,e.showEmail=!0,e.showAddress=!0,e.showPhone=!0,e.showRankDate=!1,e.showAdsd=!1,e.showPrd=!1,e.showEaos=!1,e.showReportDate=!1,e.showBlueBadge=!1,e.showDestUic=!1,e.showDestCommand=!1,e.showPortalRoles=!1;break;case"admin":e.showRate=!0,e.showRank=!1,e.showName=!0,e.showEmail=!1,e.showAddress=!1,e.showPhone=!1,e.showRankDate=!0,e.showAdsd=!0,e.showPrd=!0,e.showEaos=!0,e.showReportDate=!0,e.showBlueBadge=!1,e.showDestUic=!1,e.showDestCommand=!1,e.showPortalRoles=!1;break;case"destination":e.showRate=!0,e.showRank=!1,e.showName=!0,e.showEmail=!1,e.showAddress=!1,e.showPhone=!1,e.showRankDate=!1,e.showAdsd=!1,e.showPrd=!1,e.showEaos=!1,e.showReportDate=!0,e.showBlueBadge=!0,e.showDestUic=!0,e.showDestCommand=!0,e.showPortalRoles=!1}}function r(a){e.reverse=e.propertyName===a&&!e.reverse,e.propertyName=a}e.sailors=a.getUsers(),e.showRate=!0,e.showName=!0,e.showPhone=!0,e.showAdsd=!0,e.showPrd=!0,e.showEaos=!0,e.showReportDate=!0,e.showRank=!1,e.showEmail=!1,e.showAddress=!1,e.showRankDate=!1,e.showBlueBadge=!1,e.showDestUic=!1,e.showDestCommand=!1,e.showPortalRoles=!1,e.presetOpt="",e.setPreset=t,e.propertyName=["rate","lastName"],e.reverse=!1,e.sortBy=r}function sailorDetsCtrl(e,a,t,r){function o(){r.addRole().save({id:e.addedRole,enrolledUser:e.sailor.id},function(){e.sailor=i.get({id:t.id})}),e.addedRole=""}function n(){i.delete({id:t.id},function(){a.transitionTo("app.reports.roster",{},{reload:!0})})}function s(){i.update({id:t.id},e.newSailor,function(a){e.sailor=a}),e.enableEdit=!1}var i=r.manageUser();e.addedRole="",e.addRole=o,e.deleteUser=n,e.roles=r.getRoles(),e.sailor={},e.updateUser=s,function(){e.sailor=i.get({id:t.id},function(a){e.newSailor=a})}()}pocsCtrl.$inject=["$scope","dataSvc","$window","$location","$resource","$anchorScroll"];var brandPrimary="#20a8d8",brandSuccess="#4dbd74",brandInfo="#63c2de",brandWarning="#f8cb00",brandDanger="#f86c6b",grayDark="#2a2c36",gray="#55595c",grayLight="#818a91",grayLighter="#d1d4d7",grayLightest="#f8f9fa";angular.module("app",["ui.router","oc.lazyLoad","ncy-angular-breadcrumb","angular-loading-bar","ngResource","LocalStorageModule","ngAnimate","ui.bootstrap"]).config(["$httpProvider",function(e){e.interceptors.push("authInterceptorService")}]).config(["cfpLoadingBarProvider",function(e){e.includeSpinner=!1,e.latencyThreshold=1}]).run(["$rootScope","$state","$stateParams",function(e,a,t){return e.$on("$stateChangeSuccess",function(){document.body.scrollTop=document.documentElement.scrollTop=0}),e.$state=a,e.$stateParams=t}]).run(["authService",function(e){e.fillAuthData()}]).directive("removeModal",["$document",function(e){return{restrict:"A",link:function(a,t,r){t.bind("click",function(){e[0].body.classList.remove("modal-open"),angular.element(e[0].getElementsByClassName("modal-backdrop")).remove(),angular.element(e[0].getElementsByClassName("modal")).remove()})}}}]).filter("milDate",["$filter",function(e){var a=e("date");return function(e){return a(e,"dd MMM yyyy")}}]).filter("split",function(){return function(e){return e.split(",")}}),angular.module("app").directive("a",preventClickDirective).directive("a",bootstrapCollapseDirective).directive("a",navigationDirective).directive("button",layoutToggleDirective).directive("a",layoutToggleDirective).directive("button",collapseMenuTogglerDirective).directive("div",bootstrapCarouselDirective).directive("toggle",bootstrapTooltipsPopoversDirective).directive("tab",bootstrapTabsDirective).directive("button",cardCollapseDirective),sidebarNavDynamicResizeDirective.$inject=["$window","$timeout"],layoutToggleDirective.$inject=["$interval"],angular.module("app").config(["$stateProvider","$urlRouterProvider","$ocLazyLoadProvider","$breadcrumbProvider",function(e,a,t,r){a.otherwise("/dashboard"),t.config({debug:!0}),r.setOptions({prefixStateName:"app.main",includeAbstract:!0,template:'<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'}),e.state("app",{abstract:!0,templateUrl:"features/common/layouts/full.html",ncyBreadcrumb:{label:"Root",skip:!0},resolve:{loadCSS:["$ocLazyLoad",function(e){return e.load([{serie:!0,name:"Font Awesome",files:["css/font-awesome.min.css"]},{serie:!0,name:"Simple Line Icons",files:["css/simple-line-icons.css"]}])}],loadPlugin:["$ocLazyLoad",function(e){return e.load([{serie:!0,name:"chart.js",files:["bower_components/chart.js/dist/Chart.min.js","bower_components/angular-chart.js/dist/angular-chart.min.js"]}])}]}}).state("app.main",{url:"/dashboard",templateUrl:"views/main.html",ncyBreadcrumb:{label:"Home"},params:{subtitle:"Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit"},resolve:{loadPlugin:["$ocLazyLoad",function(e){return e.load([{serie:!0,name:"chart.js",files:["bower_components/chart.js/dist/Chart.min.js","bower_components/angular-chart.js/dist/angular-chart.min.js"]}])}],loadMyCtrl:["$ocLazyLoad",function(e){return e.load({files:["js/controllers/main.js"]})}]}}).state("appSimple",{abstract:!0,templateUrl:"features/common/layouts/simple.html",resolve:{loadPlugin:["$ocLazyLoad",function(e){return e.load([{serie:!0,name:"Font Awesome",files:["css/font-awesome.min.css"]},{serie:!0,name:"Simple Line Icons",files:["css/simple-line-icons.css"]}])}]}}).state("appSimple.login",{url:"/simplogin",templateUrl:"views/pages/login.html"}).state("appSimple.register",{url:"/simpregister",templateUrl:"views/pages/register.html",controller:"registerCtrl"}).state("appSimple.404",{url:"/404",templateUrl:"views/pages/404.html"}).state("appSimple.500",{url:"/500",templateUrl:"views/pages/500.html"}).state("app.login",{url:"/login",templateUrl:"features/accounts/login.html",controller:"loginCtrl",ncyBreadcrumb:{label:"Login"}}).state("app.register",{url:"/register",templateUrl:"features/accounts/register.html",controller:"registerCtrl",ncyBreadcrumb:{label:"Register"}}).state("app.reports",{url:"/reports",templateUrl:"features/reports/reports.html",ncyBreadcrumb:{label:"Reports"}}).state("app.reports.roster",{url:"/roster",templateUrl:"features/roster/roster.html",controller:"rosterCtrl",ncyBreadcrumb:{label:"Alpha Roster"}}).state("app.reports.roster.sailorDetails",{url:"/details/:id",templateUrl:"features/roster/sailorDetails.html",controller:"sailorDetsCtrl",ncyBreadcrumb:{label:"Sailor Details"}}).state("app.profile",{url:"/profile",templateUrl:"features/accounts/profile.html",controller:"profileCtrl",ncyBreadcrumb:{label:"Your Profile"}}).state("app.projects",{url:"/projects",templateUrl:"features/projects/projects.html",controller:"projectListCtrl",controllerAs:"projects",ncyBreadcrumb:{label:"Projects"}}).state("app.projects.new",{url:"/newproject",templateUrl:"features/projects/newproject.html",controller:"newProjectCtrl",controllerAs:"project",ncyBreadcrumb:{label:"New Project"}}).state("app.projects.details",{url:"/details/:id",templateUrl:"features/projects/projectDetails.html",controller:"projectDetsCtrl",ncyBreadcrumb:{label:"Details"}})}]),angular.module("app").controller("LineCtrl",LineCtrl).controller("BarCtrl",BarCtrl).controller("DoughnutCtrl",DoughnutCtrl).controller("RadarCtrl",RadarCtrl).controller("PieCtrl",PieCtrl).controller("PolarAreaCtrl",PolarAreaCtrl),LineCtrl.$inject=["$scope"],BarCtrl.$inject=["$scope"],DoughnutCtrl.$inject=["$scope"],RadarCtrl.$inject=["$scope"],PieCtrl.$inject=["$scope"],PolarAreaCtrl.$inject=["$scope"],angular.module("app").controller("trafficDemoCtrl",trafficDemoCtrl).controller("socialBoxCtrl",socialBoxCtrl).controller("sparklineChartCtrl",sparklineChartCtrl).controller("barChartCtrl",barChartCtrl).controller("horizontalBarsCtrl",horizontalBarsCtrl).controller("horizontalBarsType2Ctrl",horizontalBarsType2Ctrl).controller("usersTableCtrl",usersTableCtrl),trafficDemoCtrl.$inject=["$scope"],dateRangeCtrl.$inject=["$scope"],socialBoxCtrl.$inject=["$scope"],sparklineChartCtrl.$inject=["$scope"],horizontalBarsCtrl.$inject=["$scope"],horizontalBarsType2Ctrl.$inject=["$scope"],usersTableCtrl.$inject=["$scope","$timeout"],clientsTableCtrl.$inject=["$scope","$timeout"],barChartCtrl.$inject=["$scope"],angular.module("app").controller("cardChartCtrl1",cardChartCtrl1).controller("cardChartCtrl2",cardChartCtrl2).controller("cardChartCtrl3",cardChartCtrl3).controller("cardChartCtrl4",cardChartCtrl4).controller("cardChartCtrl5",cardChartCtrl5).controller("cardChartCtrl6",cardChartCtrl6).controller("cardChartCtrl7",cardChartCtrl7).controller("cardChartCtrl8",cardChartCtrl8).controller("cardChartCtrl9",cardChartCtrl9).controller("cardChartCtrl10",cardChartCtrl10).controller("cardChartCtrl11",cardChartCtrl11).controller("cardChartCtrl12",cardChartCtrl12).controller("cardChartCtrl13",cardChartCtrl13),cardChartCtrl1.$inject=["$scope"],cardChartCtrl2.$inject=["$scope"],cardChartCtrl3.$inject=["$scope"],cardChartCtrl4.$inject=["$scope"],cardChartCtrl5.$inject=["$scope"],cardChartCtrl6.$inject=["$scope"],cardChartCtrl7.$inject=["$scope"],cardChartCtrl8.$inject=["$scope"],cardChartCtrl9.$inject=["$scope"],cardChartCtrl10.$inject=["$scope"],cardChartCtrl11.$inject=["$scope"],cardChartCtrl12.$inject=["$scope"],cardChartCtrl13.$inject=["$scope"],angular.module("app").config(["$stateProvider","$urlRouterProvider","$ocLazyLoadProvider","$breadcrumbProvider",function(e,a,t,r){e.state("app.icons",{url:"/icons",abstract:!0,template:"<ui-view></ui-view>",ncyBreadcrumb:{label:"Icons"}}).state("app.icons.fontawesome",{url:"/font-awesome",templateUrl:"views/icons/font-awesome.html",ncyBreadcrumb:{label:"Font Awesome"}}).state("app.icons.simplelineicons",{url:"/simple-line-icons",templateUrl:"views/icons/simple-line-icons.html",ncyBreadcrumb:{label:"Simple Line Icons"}}).state("app.components",{url:"/components",abstract:!0,template:"<ui-view></ui-view>",ncyBreadcrumb:{label:"Components"}}).state("app.components.buttons",{url:"/buttons",templateUrl:"views/components/buttons.html",ncyBreadcrumb:{label:"Buttons"}}).state("app.components.social-buttons",{url:"/social-buttons",templateUrl:"views/components/social-buttons.html",ncyBreadcrumb:{label:"Social Buttons"}}).state("app.components.cards",{url:"/cards",templateUrl:"views/components/cards.html",ncyBreadcrumb:{label:"Cards"}}).state("app.components.forms",{url:"/forms",templateUrl:"views/components/forms.html",ncyBreadcrumb:{label:"Forms"}}).state("app.components.switches",{url:"/switches",templateUrl:"views/components/switches.html",ncyBreadcrumb:{label:"Switches"}}).state("app.components.tables",{url:"/tables",templateUrl:"views/components/tables.html",ncyBreadcrumb:{label:"Tables"}}).state("app.forms",{url:"/forms",templateUrl:"views/forms.html",ncyBreadcrumb:{label:"Forms"},resolve:{loadPlugin:["$ocLazyLoad",function(e){return e.load([{serie:!0,files:["js/libs/moment.min.js"]},{serie:!0,files:["js/libs/daterangepicker.min.js","js/libs/angular-daterangepicker.min.js"]},{files:["js/libs/mask.min.js"]},{files:["js/libs/select.min.js"]}])}],
loadMyCtrl:["$ocLazyLoad",function(e){return e.load({files:["js/controllers/forms.js"]})}]}}).state("app.widgets",{url:"/widgets",templateUrl:"views/widgets.html",ncyBreadcrumb:{label:"Widgets"},resolve:{loadMyCtrl:["$ocLazyLoad",function(e){return e.load({files:["js/controllers/widgets.js"]})}]}}).state("app.charts",{url:"/charts",templateUrl:"views/charts.html",ncyBreadcrumb:{label:"Charts"},resolve:{loadMyCtrl:["$ocLazyLoad",function(e){return e.load({files:["js/controllers/charts.js"]})}]}})}]),angular.module("app").factory("authService",["$http","$q","localStorageService","$window","$location","$state",function(e,a,t,r,o,n){var s={},i={isAuth:!1,userName:""},l=function(a){return d(),e.post("http://localhost:5000/api/account/register",a).then(function(e){return e})},c=function(r){var o="grant_type=password&username="+r.userName+"&password="+r.password,n=a.defer();return e.post("http://localhost:5000/token",o,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){t.set("authorizationData",{token:e.data.access_token,userName:r.userName}),i.isAuth=!0,i.userName=r.userName,n.resolve(e)},function(e,a){d(),n.reject(e)}),n.promise},d=function(){t.remove("authorizationData"),i.isAuth=!1,i.userName="",n.reload()},u=function(){var e=t.get("authorizationData");e&&(i.isAuth=!0,i.userName=e.userName)};return s.saveRegistration=l,s.login=c,s.logOut=d,s.fillAuthData=u,s.authentication=i,s}]),angular.module("app").factory("authInterceptorService",["$q","$location","localStorageService","$window","$state",function(e,a,t,r,o){var n={},s=function(e){e.headers=e.headers||{};var a=t.get("authorizationData");return a&&(e.headers.Authorization="Bearer "+a.token),e},i=function(a){return 401===a.status&&(r.alert("You are not authorized to visit this page.  Please log in with sufficient credentials."),o.transitionTo("app.login",{},{reload:!0})),e.reject(a)};return n.request=s,n.responseError=i,n}]),angular.module("app").factory("dataSvc",dataSvc),dataSvc.$inject=["$resource","authService"],angular.module("app").controller("loginCtrl",loginCtrl),loginCtrl.$inject=["$scope","$location","authService","$state"],angular.module("app").controller("profileCtrl",profileCtrl),profileCtrl.$inject=["$scope","dataSvc","authService","$state"],angular.module("app").controller("registerCtrl",registerCtrl),registerCtrl.$inject=["$scope","$location","$timeout","authService","$state"],angular.module("app").controller("navbarCtrl",navbarCtrl),navbarCtrl.$inject=["$location","dataSvc","authService"],angular.module("app").controller("pocsCtrl",pocsCtrl),pocsCtrl.$inject.$anchorScroll,angular.module("app").controller("toDoCtrl",toDoCtrl),toDoCtrl.$inject=["authService","dataSvc","$window"],function(){function e(e,a,t,r,o){function n(e){-1==d.categories.indexOf(e)&&(d.categories.push(e),d.addedCategory="",o.document.getElementById("newcategory").focus())}function s(e){var a=d.categories.indexOf(e);d.categories.splice(a,1)}function i(e){"other"==e?d.newCategory=!0:-1==d.categories.indexOf(e)?(d.categories.push(e),d.submittedCategory=""):(d.categories.pop(e),d.submittedCategory=""),d.addedCategory=""}function l(){d.new.categories="",angular.forEach(d.categories,function(e,a){a!==d.categories.length-1?d.new.categories=d.new.categories+e+",":d.new.categories=d.new.categories+e}),c.save(d.new,function(e){r.transitionTo("app.projects.details",{id:e.id},{reload:!0})})}var c=a.manageProjs(),d=this;d.categories=[],d.addCategory=n,d.removeCategory=s,d.submitCategory=i,d.new={},d.submit=l}e.$inject=["$scope","dataSvc","$log","$state","$window"],angular.module("app").controller("newProjectCtrl",e)}(),function(){function e(e,a,t,r){function o(e){t.log("add tm");var a={projectId:r.project.id,sailorId:e.id,userName:e.userName,rateName:e.rateName};i.save(a,function(){r.project.teamMembers=i.query({projectId:r.project.id},function(){r.selected=""})})}function n(e){t.log(e),i.delete({id:e},function(){r.project.teamMembers=i.query({projectId:r.project.id})})}var s=e.manageProjs(),i=e.manageTeam();r.addTeamMembers=o,r.delTeamMember=n,r.project={},r.chart=[],r.labels=["Complete","Incomplete"],r.users={},function(){r.addTeamMember=!1,r.project=s.get({id:a.id},function(e){r.complete=0,r.incomplete=0,angular.forEach(e.workItems,function(e){e.complete?r.complete+=1:r.incomplete+=1}),r.chart.push(r.complete),r.chart.push(r.incomplete)}),r.users=e.getUsers()}()}e.$inject=["dataSvc","$stateParams","$log","$scope"],angular.module("app").controller("projectDetsCtrl",e)}(),function(){function e(e,a,t,r,o){var n=a.manageProjs(),s=this;s.data={},s.newProject={},function(){s.data=n.query()}()}e.$inject=["$scope","dataSvc","$log","$uibModal","$document"],angular.module("app").controller("projectListCtrl",e)}(),function(){function e(){return{restrict:"E",templateUrl:"features/projects/projectlist.html"}}function a(){return{restrict:"E",templateUrl:"features/projects/tasklist.html"}}angular.module("app").directive("projectList",e).directive("taskList",a)}(),angular.module("app").controller("rosterCtrl",rosterCtrl),rosterCtrl.$inject=["$scope","dataSvc"],angular.module("app").controller("sailorDetsCtrl",sailorDetsCtrl),sailorDetsCtrl.$inject=["$scope","$state","$stateParams","dataSvc"];