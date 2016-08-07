/**
 * Created by fanjiahua on 2014/11/10.
 */
define(["mmRequest", "utils"], function (avalon, utils) {
    var model=avalon.define("projectTree",function(vm)
    {
        //项目树，静态版本***************************************************
        vm.$opts = {expandAllAtFirst: false};
        vm.projectSel = "";
        vm.groupSel = "";
        vm.groupStyle = {};
        vm.projectStyle = {};
        vm.$formId="projectCreateForm";
        vm.projects=[];
        vm.project={};
        vm.grpSel=false;
        vm.groupId="";
        vm.groupName="";
        vm.selectProject = function (prjID) {
            if (vm.projectSel != prjID) {
                if (vm.projectSel != "") {
                    var sss = "project" + vm.projectSel;
                    document.getElementById(sss).style.backgroundColor = "white";
                }
                this.parentElement.style.backgroundColor = "cyan";
                vm.projectSel = prjID;

            } else {
                //this.parentElement.parentElement.style.backgroundColor="white";
            }
        }
        vm.create=function(){//创建新项目
            var form = document.getElementById(vm.$formId);
            var formJson = avalon.serialize(form);
            alert(vm.project.projectId);
            //avalon.post('am/addOneProject',{'projectName': vm.project.projectName,'projectId':vm.project.projectId,'manager':vm.project.manager},function back(data){
            avalon.post('am/addOneProject',formJson,function back(data){
                if(data.msg=="success") {
                    alert("success");
                    $.post('am/getAllProject',{},function back(data){
                        vm.projects=data;
                    })
                    $('#myModal').modal('hide');
                }else{
                    alert("error");
                }
            });
            $("#newProjectModal").modal("hide");
        }
        vm.delOneProject = function () {
            if (vm.projectSel == "") {
                alert("请选择一个项目");
            } else {
                var projectID = vm.projectSel;
                var r = confirm("确认要删除吗?");
                if (r == true) {
                    for (var i = 0; i < vm.projects.length; i++) {
                        if (vm.projects[i].projectId == projectID) {
                            vm.projects.splice(i, 1);
                            vm.projectSel = "";
                            break;
                        }
                    }
                }
                else {
                    alert("没有删除");
                }
            }
        }
        vm.pickGroup = function (grpID) {
                if (vm.groupSel != grpID) {

                    if (vm.groupSel != "") {
                        var sss = "group" + vm.groupSel;
                        document.getElementById(sss).style.backgroundColor = "white";
                    }
                    this.parentElement.parentElement.style.backgroundColor = "cyan";
                    vm.groupSel = grpID;
                    vm.groupName = vm.getGroupById(grpID).groupName;
                } else {
                    //this.parentElement.parentElement.style.backgroundColor="white";
                }
            require("am.projectMgr_new",function(prjMgr){
                prjMgr.grpSel = true;
                prjMgr.groupId = grpID;
                prjMgr.groupName = vm.getGroupById(grpID).groupName;
                prjMgr.init();
//                this.setAttribute("style", "font-weight:bold;");
//                this.setAttribute("background-color","rgba(10%,20%,30%,0.3);");
                avalon.scan();
            })
        };

        vm.newGroup = function () {
            require(['am.projectManager', 'UIMainFrame'], function (pgd, main) {
                pgd.$groupID = a;
                var tabConfig = {tabName: a, useHref: true, href: 'am/groupMember.html', tmplLoaded: function (tmpl) {
                    return tmpl;
                }};
                var tabid = main.addTab(tabConfig);
            })
        };
        vm.delOneGroup = function () {
            if (vm.groupSel == "") {
                alert("请选择一个专业组");
            } else {
                var groupID = vm.groupSel;
                var r = confirm("确认要删除吗?");
                if (r == true) {
                    for (var i = 0; i < vm.projects.length; i++) {
                        for (var j = 0; j < vm.projects[i].groups.length; j++) {
                            if (vm.projects[i].groups[j].groupId == groupID) {
                                vm.projects[i].groups.splice(j, 1);
                                vm.groupSel = "";
                                vm.grpSel = false;
                                break;
                            }
                        }
                    }
                }
                else {
                    alert("没有删除");
                }
            }
        }
        ///////*****************************************************************

        //新建小组Modal********************************
        vm.creatGroup={};
        vm.pidForGroup="";
        vm.addOneGroup=function(){
            var form=document.getElementById("newGroupForm");
            //form.projectId=vm.pidForGroup;
            var formjson=avalon.serialize(form);
            //formjson.projectId=vm.pidForGroup;
            formjson=formjson+"&projectId="+vm.pidForGroup;
            for(var i=0;i<vm.employees.length;i++){
                if(vm.employees[i].employeeNumber==vm.creatGroup.leaderId){
                    formjson=formjson+"&groupLeaderName="+vm.employees[i].employeeName;
                    break;
                }
            }
            $.post('am/addOneGroup',formjson,function back(data){
                if(data.msg=="success") {
                    alert("success");
                    $.post('am/getAllProject',{},function back(data){
                        vm.projects=data;
                    })
//                    for(var i=0;i<vm.projects.length;i++){
//                        if(vm.projects[i].projectId==vm.pidForGroup){
//                            vm.projects[i].groups.push(createGroup);
//                        }
//                    }
//                    avalon.scan();

                }else{
                    alert("error");
                }
            });
            $('#groupModal').modal("hide");
        }
        vm.showNewGroupModal=function(){
            if(vm.projectSel==""){
                alert("请选择一个项目");
            }else{
                var projectId=vm.projectSel;
                $('#groupModal').modal("show");
                vm.pidForGroup=projectId;
                vm.projectSel="";
            }
        }

        ///////////////////////////////////////////////

        vm.initProjects=function(){
            $.post('am/getAllProject',{},function back(data){
                vm.projects=data;
            })
        }
        vm.getGroupById=function(grpID){
            for(var i=0;i<vm.projects.length;i++){
                for(var j=0;j<vm.projects[i].groups.length;j++){
                    if(vm.projects[i].groups[j].groupId==grpID){
                        return vm.projects[i].groups[j];
                    }
                }
            }
        }

        return vm;
    })
    $('#newProjectModal').on('hidden.bs.modal', function () {
        $('#newProject_close_btn').click();
    })
    $('#groupModal').on('hidden.bs.modal', function () {
        $('#group_close_btn').click();
    })
    return model;
})