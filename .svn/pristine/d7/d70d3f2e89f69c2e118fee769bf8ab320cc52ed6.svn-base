/**
 * Created by fanjiahua on 2014/10/21.
 */
define(['jquery','am.cookie','UIMainFrame'],function($,ck,main){
    loginModel=avalon.define("loginVM",function(vm){
        vm.privilege={};
        vm.loginPrivilege=[]
        vm.isLogin=false;
        vm.loginINFO={};
        vm.loginName="用户";
        vm.loginId="";
        vm.loginRoleId=""
        vm.$formId="loginForm";
        vm.getImportViewOrNot = false;
        vm.loginOrNot=function(){
            return vm.isLogin?true:false;
        }
        vm.login=function(){
            var form = document.getElementById(vm.$formId);
            var formJson = avalon.serialize(form);
            $.post('am/login',formJson,function back(data){

                if(data.msg=="success"){
                    alert("登录成功");
                    vm.isLogin=true;
                    //vm.loginName=vm.loginINFO.username;
                    vm.loginName=data.employeeName
                    vm.loginId=data.employeeNumber
                    vm.loginRoleId=data.roleId
                    $.post('am/getOnesAmPrivilege', {}, function back(data) {
                        vm.privilege=data;
                    })
                    ck.cookie.set("employeeID",vm.loginId);
                    $('#loginModal').modal('hide');
//                    for(var i=0;i<avalon.vmodels.length;i++){
//                        if(avalon.vmodels)
//                    }
                    require(["UIMainFrame","homePage",'am.sessionUtil'],function(main,hp,sessionUtil){
                        main.backToMainPage();
                        window.location.href="#!";
                        var tabConfig = {tabName: '首页', useHref: true, href: 'am/homePage.html'}
                        if(!hp.init()){
                            window.location.href = '#!';
                            return;
                        }
                        var tabid = main.addTab(tabConfig);
                        main.changeTab(tabid, {onRemove: function () {
                            if(hp.hpMode.deletedPages!="") {
                                sessionUtil.deleteMessage(hp.hpMode.deletedPages, function (data) {
                                    hp.hpMode.deletedPages = ""
                                })
                            }
                        }})
                    })
                }else
                {
                    alert("登录失败");
                    //vm.createCode();//刷新验证码
                }
            });
        }
        vm.logOut=function(){
            vm.loginName="用户";
            vm.isLogin=false;
            vm.loginId="";
            vm.getImportViewOrNot = false
            require("UIMainFrame",function(main){
                main.backToMainPage();
                main.navMenu.leftMenu[0].badge=0
                main.navMenu.leftMenu[2].badge=0
                main.navMenu.leftMenu[3].badge=0
                window.location.href="#!";
                //清空侧边栏
                main.clearSider()
                //清空tab注册函数
                for(var index in main.$tabChangeCallbacks){
                    main.$tabChangeCallbacks[parseInt(index)] = null
                }
            });
            //清空planSummary和actionSummary中的数据
            require(['am.planSummary','am.actionSummary','am.sessionUtil','ready!'],function(ps,as,sessionUtil){
                sessionUtil.amRefresh(ps.psMode)
                sessionUtil.amRefresh(as.asMode)
            })
        };
        vm.checkLogin=function(){
            $.post(
                'am/checkLogin',
                {},
                function(data){
                    if(data.success){
                        vm.isLogin=true;
                        vm.loginId=data.employeeNumber;
                        vm.loginName=data.employeeName;
                    }
                }
            )
        }
        ///////////////////验证码部分/////////////////////////
        vm.code=""; //在全局 定义验证码
        vm.createCode=function()
        {
            var code = "";
            var codeLength = 6;//验证码的长度
            //var checkCode = document.getElementById("checkCode");
            var selectChar = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//所有候选组成验证码的字符，当然也可以用中文的

            for(var i=0;i<codeLength;i++)
            {
                var charIndex = Math.floor(Math.random()*36);
                code +=selectChar[charIndex];
            }
//       alert(code);
            vm.code=code;
        }

        vm.validate=function ()
        {
            var inputCode = vm.loginINFO.verificationCode;;
            if(!inputCode)
            {
                alert("请输入验证码！");
                return false;
            }
            else if(inputCode != vm.code )
            {
                alert("验证码输入错误！");
                return false;
            }
            else
            {
                alert("^-^ OK");
                return true;
            }

        }
        //////////////////////////////////////////////
    })

    $('#loginModal').on('hidden.bs.modal', function () {
        $('#login_close_btn').click();
    })
    $('#loginModal').on('shown.bs.modal', function () {
        loginModel.createCode();
    })
    return loginModel;
})