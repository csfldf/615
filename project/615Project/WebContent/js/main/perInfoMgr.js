/**
 * Created by Fan on 2015/6/29.
 */
define(["mmRequest", "am.sessionUtil","Login","UIMainFrame"], function (avalon, utils,login,uiMF) {

    var model = avalon.define("perInfoMgr", function (vm) {
        vm.newPwd1st=""
        vm.newPwd2nd=""
        vm.originPwd=""
        vm.checkOriginPwd=false
        vm.perInfo={};
        vm.editable=false;
        vm.init=function(){
            uiMF.clearSider();
            vm.editable=false;
            vm.checkOriginPwd=false
            utils.getOneEmployee(function(data){
                vm.perInfo=data;
            })
        }
        vm.enableEdit=function(){
            vm.editable=true;
            vm.editable=vm.editable;
        }
        vm.checkOrigin=function(){
            if(vm.originPwd==vm.perInfo.loginPassword){
                vm.checkOriginPwd=true;
            }else{
                alert("密码错误")
                vm.originPwd="";
            }
        }
        vm.checkNew=function(){
            if(vm.newPwd1st==vm.newPwd2nd){
                vm.perInfo.loginPassword=vm.newPwd1st
                utils.addOrModifyEmp(vm.perInfo,"modify",function(data){
                    if(data.msg=="success"){
                        alert("修改成功")
                        $('#pwdModal').modal("hide")
                        vm.checkOriginPwd=false;
                    }else{
                        alert("failed")
                    }
                })
            }else{
                alert("两次输入不同")
                vm.newPwd1st=""
                vm.newPwd2nd=""
            }
        }
        vm.saveMdf=function(){
            utils.addOrModifyEmp(vm.perInfo,"modify",function(data){
                if(data.msg=="success"){
                    alert("保存成功")
                    vm.editable=false;
                    vm.editable=vm.editable;
                    $('#pwdModal').modal("hide")
                }else{
                    alert("failed")
                }
            })
        }
    })
    $('#pwdModal').on('hidden.bs.modal', function () {
        $('pwdModal_close_btn').click();
    })
    return model;
})