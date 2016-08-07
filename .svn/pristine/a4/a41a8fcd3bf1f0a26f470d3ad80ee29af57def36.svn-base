/**
 * Created by fanjiahua on 2014/12/1.
 */
define(["mmRequest", "utils"], function (avalon, utils) {
    var model = avalon.define("privilegeMgr", function (vm) {
        vm.$temple=[{
            id:true,
            text:"允许"
        },{
            id:"",
            text:"禁止"
        }];

        vm.$formId="privilegeForm";
        vm.privileges=[];
        vm.privilegeModify={};
        vm.privilegeSelected="";
        vm.test=function(){
            alert("test");
        }
        vm.selectOne=function(roleId){
            vm.privilegeSelected=roleId;
        }
        vm.addOneRole=function(){
            $('#privilegeModal').modal("show");
        }
        vm.delOneRole=function(){
            if(vm.privilegeSelected==""){
                alert("请选择一个角色");
            }else{
                var r = confirm("确认要删除吗?");
                if (r == true) {
                    var xxx=getOneFromArray(vm.privilegeSelected);
                    vm.privileges.splice(xxx,1);
                    vm.privilegeSelected="";
                }
            }
        }
        vm.modifyOnePrivilege=function(){
            vm.privileges.push(vm.privilegeModify);
            $('#privilegeModal').modal("hide");
        }
        getOneFromArray=function(roleId){
            for(var i in vm.privileges){
                if(vm.privileges[i].roleId==roleId){
                    return i;
                }
            }
        }
        return vm;
    })
    avalon.scan();
    model.init=function(){
        $.post('am/getAllPrivileges', {}, function back(data) {
            model.privileges = data;
        })
        setTimeout(function() {
            $('.panel').slideDown( "slow" );
        }, 500);
    }
    model.checkPrivilege=function(){
//        $.post('am/getOnesAmPrivilege', {}, function back(data) {
//            if(data.addTask==true){
//                //console.log("")
//                alert("拥有权限");
//            }else{
//                alert("没有权限");
//            }
//        })
    }
    $('#privilegeModal').on('hidden.bs.modal', function () {
        $('#privilege_close_btn').click();
    })
    return model;
})