/**
 * Created by fanjiahua on 2014/10/13.
 */
define(["mmRequest", "utils"], function (avalon, utils) {
    //var groupM = window['groupM'] = {};
        var grpInfovm=avalon.define("createGroup",function(vm){
            vm.projectID='';
            vm.group=[
                {
                    'groupId':'1',
                    'groupName':'硬件组',
                    'leader':'fanjiahua'
                },
                {
                    'groupId':'2',
                    'groupName':'CIT组',
                    'leader':'fanjiahua'
                },
                {
                    'groupId':'3',
                    'groupName':'软件组',
                    'leader':'fanjiahua'
                }
            ];
            vm.groups=[];
            vm.newGroup={};
            vm.$employeeTmpl = [
                {value: 1, text: 'fanjiahua'},
                {value: 2, text: 'yujiadong'},
                {value: 3, text: 'shenlingxuan'}
            ];
            vm.init=function(){
                vm.groups=[];
                $.post("am/getGroupsByProject",{'projectId':vm.projectID},function back(data){
                    vm.groups=data;
                })
                //$.get("../am/")
            };
            vm.new=function(){
                $.post('am/addOneGroup',{'groupName': vm.newGroup.groupName,'projectId':vm.$projectID},function back(data){
                    if(data.msg==success) {
                        alert("success");
                    }else{
                        alert("error");
                    }
                });
            };
            vm.remove=function(groupId){
                $.post('am/deleteOneProject',{'groupId': groupId},function back(data){
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
        return grpInfovm;
})