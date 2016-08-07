/**
 * Created by fanjiahua on 2014/10/23.
 */
define(["mmRequest", "utils"], function (avalon, utils) {
    //var groupM = window['groupM'] = {};
    var model=avalon.define("groupMemberList",function(vm){
        vm.$groupID='';
        vm.groupMember=[
            {
                'employeeId':'1',
                'employeeName':'张三',
                'roleName':'普通员工'
            },
            {
                'employeeId':'2',
                'employeeName':'李四',
                'roleName':'设计师'
            },
            {
                'employeeId':'3',
                'employeeName':'王五',
                'roleName':'组长'
            }
        ];
        vm.newMember={};
        vm.$roleNameTmpl = [
            {value: 1, text: '普通员工'},
            {value: 2, text: '组长'},
            {value: 3, text: '设计师'}
        ];
        vm.$employeeTmpl = [
            {value: 1, text: 'fanjiahua'},
            {value: 2, text: 'yujiadong'},
            {value: 3, text: 'shenlingxuan'}
        ];
        vm.new=function(){
            avalon.post('../am/addOneGroup',{'groupName': vm.newGroup.groupName,'projectId':vm.$projectID},function back(data){
                if(data.msg==success) {
                    alert("success");
                }else{
                    alert("error");
                }
            });
        };
        vm.remove=function(groupId){
            avalon.post('../am/deleteOneProject',{'groupId': groupId},function back(data){
                if(data.msg==success) {
                    alert("success");
                }else{
                    alert("error");
                }
            });
        };
        vm.selectOne=function(groupId){
            alert("groupId is "+groupId);
        };
        return vm;
    })
    return model;
})