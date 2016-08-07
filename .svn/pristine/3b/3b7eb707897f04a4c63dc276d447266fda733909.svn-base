/**
 * Created by rtio on 2014/11/10.
 */
define(function(){
    alert('coming into zhaoyao login')
    loginModel=avalon.define("loginVM",function(vm){
        vm.isLogin=false;
        vm.loginINFO={};
        vm.loginName="用户";
        vm.$formId="loginForm";
        vm.login=function(){
            var form = document.getElementById(vm.$formId);
            var formJson = avalon.serialize(form);
            $.post('am/login',formJson,function back(data){
                if(data.msg=="success"){
                    alert("登陆成功");
                    vm.isLogin=true;
                    vm.loginName=vm.loginINFO.username;
                    $('#loginModal').modal('hide');
                }else
                {
                    alert("登录失败");
                }
            });
        }
        vm.logOut=function(){
            vm.loginName="用户";
            vm.isLogin=false;
        }
    })
    return loginModel;
})