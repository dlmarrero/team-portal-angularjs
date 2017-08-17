"use strict";function preventClickDirective(){function e(e,a,r){"#"===r.href&&a.on("click",function(e){e.preventDefault()})}return{restrict:"E",link:e}}function bootstrapCollapseDirective(){function e(e,a,r){"collapse"==r.toggle&&a.attr("href","javascript;;").attr("data-target",r.href.replace("index.html",""))}return{restrict:"E",link:e}}function navigationDirective(){function e(e,a,r){a.hasClass("nav-dropdown-toggle")&&angular.element("body").width()>782?a.on("click",function(){angular.element("body").hasClass("compact-nav")||a.parent().toggleClass("open").find(".open").removeClass("open")}):a.hasClass("nav-dropdown-toggle")&&angular.element("body").width()<783&&a.on("click",function(){a.parent().toggleClass("open").find(".open").removeClass("open")})}return{restrict:"E",link:e}}function sidebarNavDynamicResizeDirective(e,a){function r(a,r,t){if(r.hasClass("sidebar-nav")&&angular.element("body").hasClass("fixed-nav")){var o=angular.element(window).height();a.$watch(function(){var e=angular.element("header").outerHeight();angular.element("body").hasClass("sidebar-off-canvas")?r.css("height",o):r.css("height",o-e)}),angular.element(e).bind("resize",function(){var e=angular.element(window).height(),a=angular.element("header").outerHeight(),t=angular.element(".sidebar-header").outerHeight(),o=angular.element(".sidebar-footer").outerHeight();angular.element("body").hasClass("sidebar-off-canvas")?r.css("height",e-t-o):r.css("height",e-a-t-o)})}}return{restrict:"E",link:r}}function layoutToggleDirective(e){function a(e,a,r){a.on("click",function(){a.hasClass("sidebar-toggler")&&angular.element("body").toggleClass("sidebar-hidden"),a.hasClass("aside-menu-toggler")&&angular.element("body").toggleClass("aside-menu-hidden")})}return{restrict:"E",link:a}}function collapseMenuTogglerDirective(){function e(e,a,r){a.on("click",function(){a.hasClass("navbar-toggler")&&!a.hasClass("layout-toggler")&&angular.element("body").toggleClass("sidebar-mobile-show")})}return{restrict:"E",link:e}}function bootstrapCarouselDirective(){function e(e,a,r){"carousel"==r.ride&&a.find("a").each(function(){$(this).attr("data-target",$(this).attr("href").replace("index.html","")).attr("href","javascript;;")})}return{restrict:"E",link:e}}function bootstrapTooltipsPopoversDirective(){function e(e,a,r){"tooltip"==r.toggle&&angular.element(a).tooltip(),"popover"==r.toggle&&angular.element(a).popover()}return{restrict:"A",link:e}}function bootstrapTabsDirective(){function e(e,a,r){a.click(function(e){e.preventDefault(),angular.element(a).tab("show")})}return{restrict:"A",link:e}}function cardCollapseDirective(){function e(e,a,r){if("collapse"==r.toggle&&a.parent().hasClass("card-actions")){a.parent().parent().parent().find(".card-block").hasClass("in")&&a.find("i").addClass("r180");var t="collapse-"+Math.floor(1e9*Math.random()+1);a.attr("data-target","#"+t),a.parent().parent().parent().find(".card-block").attr("id",t),a.on("click",function(){a.find("i").toggleClass("r180")})}}return{restrict:"E",link:e}}function LineCtrl(e){e.labels=["January","February","March","April","May","June","July"],e.series=["Series A","Series B"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]]}function BarCtrl(e){e.labels=["2006","2007","2008","2009","2010","2011","2012"],e.series=["Series A","Series B"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]]}function DoughnutCtrl(e){e.labels=["Download Sales","In-Store Sales","Mail-Order Sales"],e.data=[300,500,100]}function RadarCtrl(e){e.labels=["Eating","Drinking","Sleeping","Designing","Coding","Cycling","Running"],e.data=[[65,59,90,81,56,55,40],[28,48,40,19,96,27,100]]}function PieCtrl(e){e.labels=["Download Sales","In-Store Sales","Mail-Order Sales"],e.data=[300,500,100]}function PolarAreaCtrl(e){e.labels=["Download Sales","In-Store Sales","Mail-Order Sales","Tele Sales","Corporate Sales"],e.data=[300,500,100,40,120]}function trafficDemoCtrl(e){function a(e,a){return Math.floor(Math.random()*(a-e+1)+e)}for(var r=[],t=[],o=[],n=0;n<=27;n++)r.push(a(50,200)),t.push(a(80,100)),o.push(65);e.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Thursday","Wednesday","Thursday","Friday","Saturday","Sunday"],e.series=["Current","Previous","BEP"],e.data=[r,t,o],e.colors=[{backgroundColor:convertHex(brandInfo,10),borderColor:brandInfo,pointHoverBackgroundColor:"#fff"},{backgroundColor:"transparent",borderColor:brandSuccess,pointHoverBackgroundColor:"#fff"},{backgroundColor:"transparent",borderColor:brandDanger,pointHoverBackgroundColor:"#fff",borderWidth:1,borderDash:[8,5]}],e.options={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{drawOnChartArea:!1},ticks:{callback:function(e){return e.charAt(0)}}}],yAxes:[{ticks:{beginAtZero:!0,maxTicksLimit:5,stepSize:Math.ceil(50),max:250}}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}function dateRangeCtrl(e){e.date={startDate:moment().subtract(5,"days"),endDate:moment()},e.opts={drops:"down",opens:"left",ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract(1,"days"),moment().subtract(1,"days")],"Last 7 days":[moment().subtract(7,"days"),moment()],"Last 30 days":[moment().subtract(30,"days"),moment()],"This month":[moment().startOf("month"),moment().endOf("month")]}},e.$watch("date",function(e){},!1)}function socialBoxCtrl(e){e.labels=["January","February","March","April","May","June","July"],e.data1=[[65,59,84,84,51,55,40]],e.data2=[[1,13,9,17,34,41,38]],e.data3=[[78,81,80,45,34,12,40]],e.data4=[[35,23,56,22,97,23,64]],e.colors=[{backgroundColor:"rgba(255,255,255,.1)",borderColor:"rgba(255,255,255,.55)",pointHoverBackgroundColor:"#fff"}],e.options={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}function sparklineChartCtrl(e){e.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],e.data1=[[65,59,84,84,51,55,40]],e.data2=[[1,13,9,17,34,41,38]],e.data3=[[78,81,80,45,34,12,40]],e.data4=[[35,23,56,22,97,23,64]],e.default=[{backgroundColor:"transparent",borderColor:"#d1d4d7"}],e.primary=[{backgroundColor:"transparent",borderColor:brandPrimary}],e.info=[{backgroundColor:"transparent",borderColor:brandInfo}],e.danger=[{backgroundColor:"transparent",borderColor:brandDanger}],e.warning=[{backgroundColor:"transparent",borderColor:brandWarning}],e.success=[{backgroundColor:"transparent",borderColor:brandSuccess}],e.options={scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}function horizontalBarsCtrl(e){e.data=[{day:"Monday",new:34,recurring:78},{day:"Tuesday",new:56,recurring:94},{day:"Wednesday",new:12,recurring:67},{day:"Thursday",new:43,recurring:91},{day:"Friday",new:22,recurring:73},{day:"Saturday",new:53,recurring:82},{day:"Sunday",new:9,recurring:69}]}function horizontalBarsType2Ctrl(e){e.gender=[{title:"Male",icon:"icon-user",value:43},{title:"Female",icon:"icon-user-female",value:37}],e.source=[{title:"Organic Search",icon:"icon-globe",value:191235,percent:56},{title:"Facebook",icon:"icon-social-facebook",value:51223,percent:15},{title:"Twitter",icon:"icon-social-twitter",value:37564,percent:11},{title:"LinkedIn",icon:"icon-social-linkedin",value:27319,percent:8}]}function usersTableCtrl(e,a){e.users=[{avatar:"1.jpg",status:"active",name:"Yiorgos Avraamu",new:!0,registered:"Jan 1, 2015",country:"USA",flag:"USA.png",usage:"50",period:"Jun 11, 2015 - Jul 10, 2015",payment:"mastercard",activity:"10 sec ago",satisfaction:"48"},{avatar:"2.jpg",status:"busy",name:"Avram Tarasios",new:!1,registered:"Jan 1, 2015",country:"Brazil",flag:"Brazil.png",usage:"10",period:"Jun 11, 2015 - Jul 10, 2015",payment:"visa",activity:"5 minutes ago",satisfaction:"61"},{avatar:"3.jpg",status:"away",name:"Quintin Ed",new:!0,registered:"Jan 1, 2015",country:"India",flag:"India.png",usage:"74",period:"Jun 11, 2015 - Jul 10, 2015",payment:"stripe",activity:"1 hour ago",satisfaction:"33"},{avatar:"4.jpg",status:"offline",name:"Enéas Kwadwo",new:!0,registered:"Jan 1, 2015",country:"France",flag:"France.png",usage:"98",period:"Jun 11, 2015 - Jul 10, 2015",payment:"paypal",activity:"Last month",satisfaction:"23"},{avatar:"5.jpg",status:"active",name:"Agapetus Tadeáš",new:!0,registered:"Jan 1, 2015",country:"Spain",flag:"Spain.png",usage:"22",period:"Jun 11, 2015 - Jul 10, 2015",payment:"google",activity:"Last week",satisfaction:"78"},{avatar:"6.jpg",status:"busy",name:"Friderik Dávid",new:!0,registered:"Jan 1, 2015",country:"Poland",flag:"Poland.png",usage:"43",period:"Jun 11, 2015 - Jul 10, 2015",payment:"amex",activity:"Yesterday",satisfaction:"11"}]}function clientsTableCtrl(e,a){e.users=[{avatar:"1.jpg",status:"active",name:"Yiorgos Avraamu",registered:"Jan 1, 2015",activity:"10 sec ago",transactions:189,comments:72},{avatar:"2.jpg",status:"busy",name:"Avram Tarasios",registered:"Jan 1, 2015",activity:"5 minutes ago",transactions:156,comments:76},{avatar:"3.jpg",status:"away",name:"Quintin Ed",registered:"Jan 1, 2015",activity:"1 hour ago",transactions:189,comments:72},{avatar:"4.jpg",status:"offline",name:"Enéas Kwadwo",registered:"Jan 1, 2015",activity:"Last month",transactions:189,comments:72},{avatar:"5.jpg",status:"active",name:"Agapetus Tadeáš",registered:"Jan 1, 2015",activity:"Last week",transactions:189,comments:72},{avatar:"6.jpg",status:"busy",name:"Friderik Dávid",registered:"Jan 1, 2015",activity:"Yesterday",transactions:189,comments:72}]}function random(e,a){return Math.floor(Math.random()*(a-e+1)+e)}function barChartCtrl(e){for(var a=[],r=[],t=[],o=[],n=0;n<=16;n++)a.push("1"),r.push(random(40,100)),t.push(random(20,100)),o.push(random(60,100));e.labels=a,e.data=[r],e.data1=[t],e.data2=[o],e.options={showScale:!1,scaleFontSize:0,scaleShowGridLines:!1,barStrokeWidth:0,barBackground:"rgba(221, 224, 229, 1)"},e.colors=[{backgroundColor:brandInfo,borderColor:"rgba(0,0,0,1)",highlightFill:"#818a91",pointborderColor:"#000"}]}function convertHex(e,a){return e=e.replace("#",""),r=parseInt(e.substring(0,2),16),g=parseInt(e.substring(2,4),16),b=parseInt(e.substring(4,6),16),result="rgba("+r+","+g+","+b+","+a/100+")",result}function cardChartCtrl1(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[65,59,84,84,51,55,40]],e.colors=[{backgroundColor:brandPrimary,borderColor:"rgba(255,255,255,.55)"}],e.options={maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,e.data[0])-5,max:Math.max.apply(Math,e.data[0])+5}}]},elements:{line:{borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}}}function cardChartCtrl2(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[1,18,9,17,34,22,11]],e.colors=[{backgroundColor:brandInfo,borderColor:"rgba(255,255,255,.55)"}],e.options={maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,e.data[0])-5,max:Math.max.apply(Math,e.data[0])+5}}]},elements:{line:{tension:1e-5,borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}}}function cardChartCtrl3(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[78,81,80,45,34,12,40]],e.data4=[[35,23,56,22,97,23,64]],e.colors=[{backgroundColor:"rgba(255,255,255,.2)",borderColor:"rgba(255,255,255,.55)"}],e.options={maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{line:{borderWidth:2},point:{radius:0,hitRadius:10,hoverRadius:4}}}}function random(e,a){return Math.floor(Math.random()*(a-e+1)+e)}function cardChartCtrl4(e){for(var a=[],r=[],t=2e3;t<=2016;t++)a.push(t),r.push(random(40,100));e.labels=a,e.data=[r],e.colors=[{backgroundColor:"rgba(255,255,255,.3)",borderWidth:0}],e.options={maintainAspectRatio:!1,scales:{xAxes:[{display:!1,barPercentage:.6}],yAxes:[{display:!1}]}}}function cardChartCtrl5(e){for(var a=[],r=[],t=0;t<=15;t++)a.push(t),r.push(random(40,100));e.labels=a,e.data=[r],e.colors=[{backgroundColor:brandPrimary,borderColor:"transparent",borderWidth:1}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]}}}function cardChartCtrl6(e){for(var a=[],r=[],t=0;t<=15;t++)a.push(t),r.push(random(40,100));e.labels=a,e.data=[r],e.colors=[{backgroundColor:brandDanger,borderColor:"transparent",borderWidth:1}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]}}}function cardChartCtrl7(e){for(var a=[],r=[],t=0;t<=15;t++)a.push(t),r.push(random(40,100));e.labels=a,e.data=[r],e.colors=[{backgroundColor:brandSuccess,borderColor:"transparent",borderWidth:1}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]}}}function cardChartCtrl8(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[65,59,84,84,51,55,40]],e.colors=[{backgroundColor:"transparent",borderColor:brandInfo}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1,points:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0}}}}function cardChartCtrl9(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[65,59,84,84,51,55,40]],e.colors=[{backgroundColor:"transparent",borderColor:brandSuccess}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1,points:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0}}}}function cardChartCtrl10(e){e.labels=["January","February","March","April","May","June","July"],e.data=[[65,59,84,84,51,55,40]],e.colors=[{backgroundColor:"transparent",borderColor:brandWarning}],e.options={responsive:!1,maintainAspectRatio:!1,scales:{xAxes:[{display:!1,points:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0}}}}function cardChartCtrl11(e){e.labels=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e.data=[[4,18,9,17,34,22,11,3,15,12,18,9]],e.colors=[{backgroundColor:"transparent",borderColor:"rgba(255,255,255,.55)"}],e.options={maintainAspectRatio:!1,scales:{xAxes:[{display:!1,points:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0}}},e.colors2=[{backgroundColor:"rgba(0,0,0,.2)",borderWidth:0}],e.options2={maintainAspectRatio:!1,scales:{xAxes:[{display:!1,barPercentage:.6}],yAxes:[{display:!1,ticks:{beginAtZero:!0}}]}}}function cardChartCtrl12(e){e.labels=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],e.data=[[75,59,94,104,151,155,240]],e.colors=[{backgroundColor:"transparent",borderColor:grayLighter,pointBackgroundColor:"#fff",borderWidth:3}],e.options={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{point:{radius:4,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}function cardChartCtrl13(e){e.labels=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e.data=[[31e3,34e3,27e3,24e3,28e3,42500,42e3,3e4,35500,35500,41500,41600]],e.colors=[{backgroundColor:"transparent",borderColor:"#fff",pointBackgroundColor:brandPrimary}],e.options={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{drawOnChartArea:!1,color:"transparent",zeroLineColor:"transparent"},ticks:{fontColor:"#fff",maxTicksLimit:3,maxRotation:0}}],yAxes:[{gridLines:{color:"rgba(255,255,255,.2)",zeroLineColor:"rgba(255,255,255,.2)"},ticks:{maxTicksLimit:10,stepSize:Math.ceil(4500),max:45e3,fontColor:"#fff",callback:function(e){return"$"+e}}}]},elements:{point:{radius:4,borderWidth:2,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}},e.labels2=["US","PL","GB","DE","NL","CA","FI","RU","AU","N/A"],e.data2=[[35,14,10,8,6,6,5,4,3,9]],e.colors2=[{backgroundColor:brandSuccess,borderWidth:0}],e.options2={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{maxRotation:0},barPercentage:.6}],yAxes:[{display:!1,ticks:{beginAtZero:!0}}]}}}function dataSvc(e,a,r){function t(){return e(u+"/api/account/users").query()}function o(){if(p.isAuth)return e(u+"/api/account?username=:username")}function n(){return e(u+"/api/account/user/:id",null,{update:{method:"PUT"}})}function s(){return e(u+"/api/roles/ManageUsersInRole")}function i(){return e(u+"/api/roles").query()}function l(a){return e(u+"/api/todos?SailorId=:sailorId").query({sailorId:a})}function c(){return e(u+"/api/todos/:todoId",null,{update:{method:"PUT"}})}function d(){return e(u+"/api/Pocs/:id",null,{update:{method:"PUT"}})}var u="http://localhost:5000",p=a.authentication;return r.log("auth",p),{getUsers:t,getCurUser:o,manageUser:n,addRole:s,getRoles:i,getToDos:l,manageToDos:c,managePocs:d}}function profileCtrl(e,a,r,t){function o(){t.log("newData:",e.newData),s.update({id:e.userData.id},e.newData,function(r){e.userData=a.getCurUser().get({username:n.userName})}),e.enableEdit=!1}var n=r.authentication,s=a.manageUser();e.enableEdit=!1,e.userData=a.getCurUser().get({username:n.userName},function(a){e.newData=a}),e.updateProfile=o}function indexCtrl(e,a,r){function t(){r.logOut(),e.path("/dashboard")}var o=this;o.authentication=r.authentication,o.logOut=t,o.userData=a.getCurUser().get({username:o.authentication.userName})}function pocsCtrl(e,a,r,t,o,n){var s=a.managePocs();e.pocs=s.query(),e.showEdit=!1,e.toggleEdit=function(a){e.showEdit=!0,e.update=a,t.hash("pocs"),n()},e.saveUpdate=function(a){s.update({id:a.id},a),e.showEdit=!1,e.update={}},e.deletePoc=function(a){s.delete({id:a}).$promise.then(function(a){e.pocs=s.query()}),e.update={},e.showEdit=!1},e.showAdd=!1,e.addPoc=function(a){s.save(a),e.pocs=s.query(),e.newPoc={},e.showAdd=!1}}function toDoCtrl(e,a,r,t){function o(){c.newToDo.sailorId=c.userData.id,l.save(c.newToDo,function(e){c.toDos.push(e),c.newToDo={},c.newToDo.priority="low",r.document.getElementById("toDoItem").focus()})}function n(e){l.delete({id:e},function(e){c.toDos=a.getToDos(c.userData.id)})}function s(){c.showAdd=!c.showAdd}var i=e.authentication,l=a.manageToDos(),c=this;c.newToDo={},c.showAdd=!1,c.userData=a.getCurUser().get({username:i.userName},function(e){c.toDos=e.toDos}),c.addToDo=o,c.delToDo=n,c.toggleAdd=s}function sailorDetsCtrl(e,a,r,t){function o(){t.addRole().save({id:e.addedRole,enrolledUser:e.sailor.id},function(){e.sailor=i.get({id:r.id}),e.addedRole=""})}function n(){i.delete({id:r.id},function(e){a.transitionTo("app.reports.roster",{},{reload:!0})})}function s(){i.update({id:r.id},e.newSailor,function(a){e.enableEdit=!1,e.sailor=e.newSailor})}var i=t.manageUser();e.addedRole="",e.enableEdit=!1,e.roles=t.getRoles(),e.sailor=i.get({id:r.id},function(a){e.newSailor=a}),e.addRole=o,e.deleteUser=n,e.updateUser=s}pocsCtrl.$inject=["$scope","dataSvc","$window","$location","$resource","$anchorScroll"];var brandPrimary="#20a8d8",brandSuccess="#4dbd74",brandInfo="#63c2de",brandWarning="#f8cb00",brandDanger="#f86c6b",grayDark="#2a2c36",gray="#55595c",grayLight="#818a91",grayLighter="#d1d4d7",grayLightest="#f8f9fa";angular.module("app",["ui.router","oc.lazyLoad","ncy-angular-breadcrumb","angular-loading-bar","ngResource","LocalStorageModule"]).config(["$httpProvider",function(e){e.interceptors.push("authInterceptorService")}]).config(["cfpLoadingBarProvider",function(e){e.includeSpinner=!1,e.latencyThreshold=1}]).run(["$rootScope","$state","$stateParams",function(e,a,r){return e.$on("$stateChangeSuccess",function(){document.body.scrollTop=document.documentElement.scrollTop=0}),e.$state=a,e.$stateParams=r}]).run(["authService",function(e){e.fillAuthData()}]).directive("removeModal",["$document",function(e){return{restrict:"A",link:function(a,r,t){r.bind("click",function(){e[0].body.classList.remove("modal-open"),angular.element(e[0].getElementsByClassName("modal-backdrop")).remove(),angular.element(e[0].getElementsByClassName("modal")).remove()})}}}]).filter("milDate",["$filter",function(e){var a=e("date");return function(e){return a(e,"dd MMM yyyy")}}]),angular.module("app").directive("a",preventClickDirective).directive("a",bootstrapCollapseDirective).directive("a",navigationDirective).directive("button",layoutToggleDirective).directive("a",layoutToggleDirective).directive("button",collapseMenuTogglerDirective).directive("div",bootstrapCarouselDirective).directive("toggle",bootstrapTooltipsPopoversDirective).directive("tab",bootstrapTabsDirective).directive("button",cardCollapseDirective),sidebarNavDynamicResizeDirective.$inject=["$window","$timeout"],layoutToggleDirective.$inject=["$interval"],angular.module("app").config(["$stateProvider","$urlRouterProvider","$ocLazyLoadProvider","$breadcrumbProvider",function(e,a,r,t){a.otherwise("/dashboard"),r.config({debug:!0}),t.setOptions({prefixStateName:"app.main",includeAbstract:!0,template:'<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'}),e.state("app",{abstract:!0,templateUrl:"views/common/layouts/full.html",ncyBreadcrumb:{label:"Root",skip:!0},resolve:{loadCSS:["$ocLazyLoad",function(e){return e.load([{serie:!0,name:"Font Awesome",files:["css/font-awesome.min.css"]},{serie:!0,name:"Simple Line Icons",files:["css/simple-line-icons.css"]}])}],loadPlugin:["$ocLazyLoad",function(e){return e.load([{serie:!0,name:"chart.js",files:["bower_components/chart.js/dist/Chart.min.js","bower_components/angular-chart.js/dist/angular-chart.min.js"]}])}]}}).state("app.main",{url:"/dashboard",templateUrl:"views/main.html",ncyBreadcrumb:{label:"Home"},params:{subtitle:"Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit"},resolve:{loadPlugin:["$ocLazyLoad",function(e){return e.load([{serie:!0,name:"chart.js",files:["bower_components/chart.js/dist/Chart.min.js","bower_components/angular-chart.js/dist/angular-chart.min.js"]}])}],loadMyCtrl:["$ocLazyLoad",function(e){return e.load({files:["js/controllers/main.js"]})}]}}).state("appSimple",{abstract:!0,templateUrl:"views/common/layouts/simple.html",resolve:{loadPlugin:["$ocLazyLoad",function(e){return e.load([{serie:!0,name:"Font Awesome",files:["css/font-awesome.min.css"]},{serie:!0,name:"Simple Line Icons",files:["css/simple-line-icons.css"]}])}]}}).state("appSimple.login",{url:"/simplogin",templateUrl:"views/pages/login.html"}).state("appSimple.register",{url:"/simpregister",templateUrl:"views/pages/register.html",controller:"registerController"}).state("appSimple.404",{url:"/404",templateUrl:"views/pages/404.html"}).state("appSimple.500",{url:"/500",templateUrl:"views/pages/500.html"}).state("app.login",{url:"/login",templateUrl:"views/accounts/login.html",controller:"loginController",ncyBreadcrumb:{label:"Login"}}).state("app.register",{url:"/register",templateUrl:"views/accounts/register.html",controller:"registerController",ncyBreadcrumb:{label:"Register"}}).state("app.reports",{url:"/reports",templateUrl:"views/reports/reports.html",ncyBreadcrumb:{label:"Reports"}}).state("app.reports.roster",{url:"/roster",templateUrl:"views/reports/roster/roster.html",controller:"rosterController",ncyBreadcrumb:{label:"Alpha Roster"}}).state("app.reports.roster.sailorDetails",{url:"/details/:id",templateUrl:"views/reports/roster/sailorDetails.html",controller:"sailorDetsCtrl",ncyBreadcrumb:{label:"Sailor Details"}}).state("app.profile",{url:"/profile",templateUrl:"views/accounts/profile.html",controller:"profileCtrl",ncyBreadcrumb:{label:"Your Profile"}})}]),angular.module("app").controller("LineCtrl",LineCtrl).controller("BarCtrl",BarCtrl).controller("DoughnutCtrl",DoughnutCtrl).controller("RadarCtrl",RadarCtrl).controller("PieCtrl",PieCtrl).controller("PolarAreaCtrl",PolarAreaCtrl),LineCtrl.$inject=["$scope"],BarCtrl.$inject=["$scope"],DoughnutCtrl.$inject=["$scope"],RadarCtrl.$inject=["$scope"],PieCtrl.$inject=["$scope"],PolarAreaCtrl.$inject=["$scope"],angular.module("app").controller("trafficDemoCtrl",trafficDemoCtrl).controller("socialBoxCtrl",socialBoxCtrl).controller("sparklineChartCtrl",sparklineChartCtrl).controller("barChartCtrl",barChartCtrl).controller("horizontalBarsCtrl",horizontalBarsCtrl).controller("horizontalBarsType2Ctrl",horizontalBarsType2Ctrl).controller("usersTableCtrl",usersTableCtrl),trafficDemoCtrl.$inject=["$scope"],dateRangeCtrl.$inject=["$scope"],socialBoxCtrl.$inject=["$scope"],sparklineChartCtrl.$inject=["$scope"],horizontalBarsCtrl.$inject=["$scope"],horizontalBarsType2Ctrl.$inject=["$scope"],usersTableCtrl.$inject=["$scope","$timeout"],clientsTableCtrl.$inject=["$scope","$timeout"],barChartCtrl.$inject=["$scope"],angular.module("app").controller("cardChartCtrl1",cardChartCtrl1).controller("cardChartCtrl2",cardChartCtrl2).controller("cardChartCtrl3",cardChartCtrl3).controller("cardChartCtrl4",cardChartCtrl4).controller("cardChartCtrl5",cardChartCtrl5).controller("cardChartCtrl6",cardChartCtrl6).controller("cardChartCtrl7",cardChartCtrl7).controller("cardChartCtrl8",cardChartCtrl8).controller("cardChartCtrl9",cardChartCtrl9).controller("cardChartCtrl10",cardChartCtrl10).controller("cardChartCtrl11",cardChartCtrl11).controller("cardChartCtrl12",cardChartCtrl12).controller("cardChartCtrl13",cardChartCtrl13),cardChartCtrl1.$inject=["$scope"],cardChartCtrl2.$inject=["$scope"],cardChartCtrl3.$inject=["$scope"],cardChartCtrl4.$inject=["$scope"],cardChartCtrl5.$inject=["$scope"],cardChartCtrl6.$inject=["$scope"],cardChartCtrl7.$inject=["$scope"],cardChartCtrl8.$inject=["$scope"],cardChartCtrl9.$inject=["$scope"],cardChartCtrl10.$inject=["$scope"],cardChartCtrl11.$inject=["$scope"],cardChartCtrl12.$inject=["$scope"],cardChartCtrl13.$inject=["$scope"],angular.module("app").config(["$stateProvider","$urlRouterProvider","$ocLazyLoadProvider","$breadcrumbProvider",function(e,a,r,t){e.state("app.icons",{url:"/icons",abstract:!0,template:"<ui-view></ui-view>",ncyBreadcrumb:{label:"Icons"}}).state("app.icons.fontawesome",{url:"/font-awesome",templateUrl:"views/icons/font-awesome.html",ncyBreadcrumb:{label:"Font Awesome"}}).state("app.icons.simplelineicons",{url:"/simple-line-icons",templateUrl:"views/icons/simple-line-icons.html",ncyBreadcrumb:{label:"Simple Line Icons"}}).state("app.components",{url:"/components",abstract:!0,template:"<ui-view></ui-view>",ncyBreadcrumb:{label:"Components"}}).state("app.components.buttons",{url:"/buttons",templateUrl:"views/components/buttons.html",ncyBreadcrumb:{label:"Buttons"}}).state("app.components.social-buttons",{url:"/social-buttons",templateUrl:"views/components/social-buttons.html",ncyBreadcrumb:{label:"Social Buttons"}}).state("app.components.cards",{url:"/cards",templateUrl:"views/components/cards.html",ncyBreadcrumb:{label:"Cards"}}).state("app.components.forms",{url:"/forms",templateUrl:"views/components/forms.html",ncyBreadcrumb:{label:"Forms"}}).state("app.components.switches",{url:"/switches",templateUrl:"views/components/switches.html",ncyBreadcrumb:{label:"Switches"}}).state("app.components.tables",{url:"/tables",templateUrl:"views/components/tables.html",ncyBreadcrumb:{label:"Tables"}}).state("app.forms",{url:"/forms",templateUrl:"views/forms.html",ncyBreadcrumb:{label:"Forms"},resolve:{loadPlugin:["$ocLazyLoad",function(e){return e.load([{serie:!0,files:["js/libs/moment.min.js"]},{serie:!0,files:["js/libs/daterangepicker.min.js","js/libs/angular-daterangepicker.min.js"]},{files:["js/libs/mask.min.js"]},{files:["js/libs/select.min.js"]}])}],loadMyCtrl:["$ocLazyLoad",function(e){return e.load({files:["js/controllers/forms.js"]})}]}}).state("app.widgets",{url:"/widgets",templateUrl:"views/widgets.html",ncyBreadcrumb:{label:"Widgets"},resolve:{loadMyCtrl:["$ocLazyLoad",function(e){return e.load({files:["js/controllers/widgets.js"]})}]}}).state("app.charts",{url:"/charts",templateUrl:"views/charts.html",ncyBreadcrumb:{label:"Charts"},resolve:{loadMyCtrl:["$ocLazyLoad",function(e){return e.load({files:["js/controllers/charts.js"]})}]}})}]),angular.module("app").factory("authService",["$http","$q","localStorageService","$log","$window","$location","$state",function(e,a,r,t,o,n,s){var i={},l={isAuth:!1,userName:""},c=function(a){return u(),e.post("http://localhost:5000/api/account/register",a).then(function(e){return e})},d=function(t){var o="grant_type=password&username="+t.userName+"&password="+t.password,n=a.defer();return e.post("http://localhost:5000/token",o,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){r.set("authorizationData",{token:e.data.access_token,userName:t.userName}),l.isAuth=!0,l.userName=t.userName,n.resolve(e)},function(e,a){u(),n.reject(e)}),n.promise},u=function(){r.remove("authorizationData"),l.isAuth=!1,l.userName="",s.reload()},p=function(){var e=r.get("authorizationData");e&&(l.isAuth=!0,l.userName=e.userName)};return i.saveRegistration=c,i.login=d,i.logOut=u,i.fillAuthData=p,i.authentication=l,i}]),angular.module("app").factory("authInterceptorService",["$q","$location","localStorageService","$window","$state",function(e,a,r,t,o){var n={},s=function(e){e.headers=e.headers||{};var a=r.get("authorizationData");return a&&(e.headers.Authorization="Bearer "+a.token),e},i=function(a){return 401===a.status&&(t.alert("You are not authorized to visit this page.  Please log in with sufficient credentials."),o.transitionTo("app.login",{},{reload:!0})),e.reject(a)};return n.request=s,n.responseError=i,n}]),angular.module("app").factory("dataSvc",dataSvc),dataSvc.$inject=["$resource","authService","$log"],angular.module("app").controller("loginController",["$scope","$location","authService","$state",function(e,a,r,t){e.loginData={userName:"",password:""},e.message="",e.login=function(){r.login(e.loginData).then(function(e){t.transitionTo("app.main",{},{reload:!0})},function(a){e.message=a.data.error_description})}}]),angular.module("app").controller("profileCtrl",profileCtrl),profileCtrl.$inject=["$scope","dataSvc","authService","$log"],angular.module("app").controller("registerController",["$scope","$location","$timeout","authService","$log","$state",function(e,a,r,t,o,n){if(e.savedSuccessfully=!1,e.message="",e.registration={password:"",confirmPassword:"",rate:"",rank:"",firstName:"",lastName:"",email:"",adsd:"",eaos:"",prd:"",reportDate:"",rankDate:"",blueBadge:!1,destUIC:"",destCommand:""},e.getRank=function(a){switch(a.slice(-3)){case"ENS":e.registration.rank="O1";break;case"TJG":e.registration.rank="O2";break;case"SR":e.registration.rank="E1";break;case"SA":e.registration.rank="E2";break;case"SN":e.registration.rank="E3"}switch(a.slice(-2)){case"SR":e.registration.rank="E1";break;case"SA":e.registration.rank="E2";break;case"SN":e.registration.rank="E3";break;case"CS":e.registration.rank="E8";break;case"CM":e.registration.rank="E9";break;case"LT":e.registration.rank="O3"}switch(a[a.length-1]){case"3":e.registration.rank="E4";break;case"2":e.registration.rank="E5";break;case"1":e.registration.rank="E6";break;case"C":e.registration.rank="E7"}},e.passwordStrength=function(a){/^(.{6,})/.test(a)?e.hasSix=!0:e.hasSix=!1,/[a-z]/.test(a)?e.hasLower=!0:e.hasLower=!1,/[A-Z]/.test(a)?e.hasUpper=!0:e.hasUpper=!1,/\d/.test(a)?e.hasDigit=!0:e.hasDigit=!1,/[^A-Za-z0-9]/.test(a)?e.hasSpecial=!0:e.hasSpecial=!1,a||(e.hasSix=!1,e.hasLower=!1,e.hasUper=!1,e.hasDigit=!1,e.hasSpecial=!1),e.validatePassword=function(a){e.hasSix&&e.hasLower&&e.hasUpper&&e.hasDigit&&e.hasSpecial?e.validPassword=!0:e.validPassword=!1,e.validPassword&&(e.showPwRules=!1)}},e.registration.firstName&&e.registration.lastName)return!0;e.signUp=function(){t.saveRegistration(e.registration).then(function(a){e.savedSuccessfully=!0,e.message="Registration succssful!  Logging you in...",s()},function(a){var r=[]
;for(var t in a.data.modelState)for(var o=0;o<a.data.modelState[t].length;o++)r.push(a.data.modelState[t][o]);e.message="Failed to register user. "+r.join(" ")})};var s=function(){var a=r(function(){r.cancel(a),e.loginData={userName:e.registration.firstName+"."+e.registration.lastName,password:e.registration.password},t.login(e.loginData).then(function(e){n.transitionTo("app.main",{},{reload:!0})},function(a){e.message=a.data.error_description})},2e3)}}]),angular.module("app").controller("indexCtrl",indexCtrl),indexCtrl.$inject=["$location","dataSvc","authService"],angular.module("app").controller("pocsCtrl",pocsCtrl),pocsCtrl.$inject.$anchorScroll,angular.module("app").controller("toDoCtrl",toDoCtrl),toDoCtrl.$inject=["authService","dataSvc","$window","$log"],angular.module("app").controller("rosterController",["$scope","dataSvc","$log",function(e,a,r){e.sailors=a.getUsers(),e.showRate=!0,e.showRank=!1,e.showName=!0,e.showEmail=!1,e.showAddress=!1,e.showPhone=!0,e.showRankDate=!1,e.showAdsd=!0,e.showPrd=!0,e.showEaos=!0,e.showReportDate=!0,e.showBlueBadge=!1,e.showDestUic=!1,e.showDestCommand=!1,e.showPortalRoles=!1,e.presetOpt="",e.setPreset=function(a){switch(a){case"recall":e.showRate=!0,e.showRank=!1,e.showName=!0,e.showEmail=!0,e.showAddress=!0,e.showPhone=!0,e.showRankDate=!1,e.showAdsd=!1,e.showPrd=!1,e.showEaos=!1,e.showReportDate=!1,e.showBlueBadge=!1,e.showDestUic=!1,e.showDestCommand=!1,e.showPortalRoles=!1;break;case"admin":e.showRate=!0,e.showRank=!1,e.showName=!0,e.showEmail=!1,e.showAddress=!1,e.showPhone=!1,e.showRankDate=!0,e.showAdsd=!0,e.showPrd=!0,e.showEaos=!0,e.showReportDate=!0,e.showBlueBadge=!1,e.showDestUic=!1,e.showDestCommand=!1,e.showPortalRoles=!1;break;case"destination":e.showRate=!0,e.showRank=!1,e.showName=!0,e.showEmail=!1,e.showAddress=!1,e.showPhone=!1,e.showRankDate=!1,e.showAdsd=!1,e.showPrd=!1,e.showEaos=!1,e.showReportDate=!0,e.showBlueBadge=!0,e.showDestUic=!0,e.showDestCommand=!0,e.showPortalRoles=!1}},e.propertyName=["rate","lastName"],e.reverse=!1,e.sortBy=function(a){e.reverse=e.propertyName===a&&!e.reverse,e.propertyName=a}}]),angular.module("app").controller("sailorDetsCtrl",sailorDetsCtrl),sailorDetsCtrl.$inject=["$scope","$state","$stateParams","dataSvc"];