/**
 * Created by fanjiahua on 2014/11/3.
 */
define(["mmRequest", "am.sessionUtil","fracas.searchUtil"], function (avalon, utils,searchUtil) {

    var model=avalon.define("proMgr",function(vm){
        //项目创建Modal*******************
        vm.privilege={};
        vm.$formId="projectCreateForm";
        vm.projects=[];
        vm.project={};
        vm.create=function(){
            if(vm.privilege.addProject==true) {
                var form = document.getElementById(vm.$formId);
                var formJson = avalon.serialize(form);
                alert(vm.project.projectId);
                //avalon.post('am/addOneProject',{'projectName': vm.project.projectName,'projectId':vm.project.projectId,'manager':vm.project.manager},function back(data){
                avalon.post('am/addOneProject', formJson, function back(data) {
                    if (data.msg == "success") {
                        alert("success");
                        $.post('am/getAllProject', {}, function back(data) {
                            vm.projects = data;
                        })
                        //$('#myModal').modal('hide');
                    } else {
                        alert("error");
                    }
                });
                $("#newProjectModal").modal("hide");
            }else{
                alert("没有权限");
            }
        }

        //*****************************

        //项目管理主界面数据*************************
        vm.$employeeTmpl = [
            {value: 1, text: 'fanjiahua'},
            {value: 2, text: 'yujiadong'},
            {value: 3, text: 'shenlingxuan'}
        ];
        vm.$roleNameTmpl = [
            {value: 1, text: '普通员工'},
            {value: 2, text: '组长'},
            {value: 3, text: '设计师'}
        ];
        vm.grpSel=false;
        vm.roles=[];
        vm.groupId="";
        vm.groupName="";
        vm.employees=[];
        vm.empInfo={};
        vm.groupMembers=[];
        vm.selectedRoleId="";
        vm.groupMemberChecked="";
        vm.employeeCheckArray=[];
        vm.selectedRoleKey="";
        ////////////////////////////////
        vm.curEmps=[];
        vm.pagesEmp="";
        vm.indexEmp="";
        vm.curGmps=[];
        vm.pagesGmp="";
        vm.indexGmp="";
        vm.numPerPage="";
        vm.orderByDictEmp = function(contents, column, order) {
            vm.employees       = searchUtil.orderByDict(contents, column, order);
            vm.curEmps    = vm.employees.slice(0, vm.numPerPage);
            vm.indexEmp = 0;
        };
        vm.orderByDictGmp = function(contents, column, order) {
            vm.groupMembers       = searchUtil.orderByDict(contents, column, order);
            vm.curGmps    = vm.groupMembers.slice(0, vm.numPerPage);
            vm.indexEmp = 0;
        };
        vm.nextEmpPage = function() {
            if (vm.indexEmp+1 < vm.pagesEmp) {
                vm.indexEmp ++;
                vm.curEmps = vm.employees.slice(vm.indexEmp*vm.numPerPage, vm.indexEmp*vm.numPerPage+vm.numPerPage);
            }
        };
        vm.preEmpPage = function() {
            if (vm.indexEmp > 0) {
                vm.indexEmp --;
                vm.curEmps = vm.employees.slice(vm.indexEmp*vm.numPerPage, vm.indexEmp*vm.numPerPage+vm.numPerPage);
            }
        };
        vm.nextGmpPage = function() {
            if (vm.indexGmp+1 < vm.pagesGmp) {
                vm.indexGmp ++;
                vm.curGmps = vm.groupMembers.slice(vm.indexGmp*vm.numPerPage, vm.indexGmp*vm.numPerPage+vm.numPerPage);
            }
        };

        vm.preGmpPage = function() {
            if (vm.indexGmp > 0) {
                vm.indexGmp --;
                vm.curGmps = vm.groupMembers.slice(vm.indexGmp*vm.numPerPage, vm.indexGmp*vm.numPerPage+vm.numPerPage);
            }
        };
        ////////////////////////

        vm.addMembers=function(){
            //alert(vm.employeeCheckArray.length);
            //                    for(;j<vm.groupMembers.length;j++){
//                        if(vm.groupMembers[j].employeeName==vm.employees[i].employeeName){
//                            alert("组员重复:"+vm.employees[i].employeeName);
//                        }
//                    }
//                    if(j==vm.groupMembers.length) {
//                        vm.groupMembers.push({employeeId: vm.employees[i].employeeNumber, employeeName: vm.employees[i].employeeName, roleName: "组员"});
//                        vm.employees.splice(i,1);
//                    }
            //            for(i= 0;i<vm.employees.length;i++){
//                vm.employees[i].checked=false;
//            }
            if(!vm.employeeCheckArray){
                alert("请选择要添加的人员");
                return;
            }
            //var roles=[];
            var backdata=new Object();
            backdata.projectId=getProjectByGroupId(vm.groupId).projectId;
            //backdata.projectName=getProjectByGroupId(vm.groupId).projectName;
            backdata.groupId=vm.groupId;
            for(var i= 0;i<vm.employeeCheckArray.length;i++){
                var emp=vm.getEmployeeById(vm.employeeCheckArray[i]);
                //roles.push(emp);
                backdata.employeeId=emp.employeeNumber;
                $.post("am/addOneRole",backdata,function back(data){
                    if(data.msg=="success") {
                        alert("success");
                    }else{
                        alert("error");
                    }
                })
                vm.groupMembers.push({employeeId: emp.employeeNumber, employeeName: emp.employeeName, roleName: "组员"});
                var sss="employee"+emp.employeeNumber;
                var element=document.getElementById(sss);
                element.checked=false;
                element.parentElement.parentElement.setAttribute("bgColor","#FFFFFF");
            }
//            var returnData={};
//            returnData.newGrpMembers=roles;
//            returnData.projectId=getProjectByGroupId(vm.groupId).projectId;
//            returnData.projectName=getProjectByGroupId(vm.groupId).projectName;
//            returnData.groupId=vm.groupId;
//            //var jsonData=avalon.serialize();
//            avalon.post("am/addRoles",returnData,function back(data){
//                if(data.msg=="success") {
//                    alert("success");
//                }else{
//                    alert("error");
//                }
//            })
        }
        vm.modifyMemberINFO=function(){
            if(vm.groupMemberChecked==""){
                alert("请选择一个组员");
            }else {
                employeeId = vm.groupMemberChecked;
                for (var i = 0; i < vm.groupMembers.length; i++) {
                    if (vm.groupMembers[i].employeeId == employeeId) {
                        vm.empInfo = vm.groupMembers[i];
                        break;
                    }
                }
                for (i = 0; i < vm.roles.length; i++) {
                    if (vm.roles[i].roleName == vm.empInfo.roleName) {
                        vm.selectedRoleId = vm.roles[i].roleId;
                    }
                }
                $('#groupMemberModal').modal('show');
            }
        }
        vm.modify=function(){
            for(var i=0;i<vm.groupMembers.length;i++){
                if(vm.groupMembers[i].employeeId==vm.empInfo.employeeId){
                    vm.groupMembers[i].employeeName=vm.empInfo.employeeName;
                    for(var j=0;j<vm.roles.length;j++){
                        if(vm.roles[j].roleId==vm.selectedRoleId){
                            vm.groupMembers[i].roleName=vm.roles[j].roleName;
                        }
                    }
                }
            }
            var formjson=new Object();
            formjson.roleKey=vm.selectedRoleKey;
            formjson.roleId=vm.selectedRoleId;
            //xxx=avalon.serialize();
            $.post('am/changeOneRole',formjson,function back(data){
                if(data.msg=="success") {
                    alert("success");
                }else{
                    alert("error");
                }
            });
            $('#groupMemberModal').modal('hide');
        }
        vm.select=function(ob){
            //ob.checked=ob.checked?false:true;
            if(this.checked==true){
                this.parentElement.parentElement.setAttribute("bgColor","0099FF");
            }else{
                this.parentElement.parentElement.setAttribute("bgColor","#FFFFFF");
            }

        }
        vm.selectGroupMember=function(ob){
//            if(this.checked==true){
//                this.parentElement.parentElement.setAttribute("bgColor","0099FF")
//            }else{
//                this.parentElement.parentElement.setAttribute("bgColor","#FFFFFF")
//            }


                if(vm.groupMemberChecked!="")
                {
                    var grpMember=vm.getGroupMemberById(vm.groupMemberChecked);
                    if(vm.groupMemberChecked!=ob.employeeId||grpMember.roleName!=ob.roleName) {
                        var sss = "groupMember" + vm.groupMemberChecked + grpMember.roleName;
                        document.getElementById(sss).setAttribute("bgColor", "#FFFFFF");
                    }
                }
                this.parentElement.parentElement.setAttribute("bgColor","0099FF");
                vm.groupMemberChecked = ob.employeeId;
            vm.selectedRoleKey=ob.roleKey;

        }
        vm.del=function(){
            if(vm.groupMemberChecked==""){
                alert("请选择一个组员");
            }else {
                var empId = vm.groupMemberChecked;
                var r = confirm("确认要删除吗?");
                if (r == true) {
                    for (var i = 0; i < vm.groupMembers.length; i++) {
                        $.post("am/deleteOneRole",{"roleKey":vm.selectedRoleKey},function back(data){
                            if(data.msg=="success") {
                                alert("success");
                            }else{
                                alert("error");
                            }
                        })
                        if (empId == vm.groupMembers[i].employeeId) {
                            vm.groupMembers.splice(i, 1);
                            vm.groupMemberChecked = "";
                            vm.selectedRoleKey="";
                            break;
                        }
                    }
                }
                else {
                    alert("没有删除");
                }
            }
        }
        //初始化函数*********************************
        vm.initProjects=function(){
            $.post('am/getAllProject',{},function back(data){
                vm.projects=data;
            })
            $.post('am/getalluser', {}, function back(data) {
                vm.employees = data;
            })
            if(!!window.ActiveXObject || "ActiveXObject" in window ){//全系列判断IE，支持IE10
                require(['jquery','datepicker_zh_CN'],function($){
                    $("[name=startDate],[name=endDate]").datepicker({
                        format: "yyyy-mm-dd",
                        todayBtn: true,
                        clearBtn: true,
                        language: "zh-CN",
                        calendarWeeks: true,
                        autoclose: true,
                        todayHighlight: true
                    });
                })
            }
        }
        vm.init=function() {
//            $.post('am/getalluser', {}, function back(data) {
//                vm.employees = data;
//            })
            $.post('am/getRoleByGroup', {'groupId':vm.groupId}, function back(data) {
                vm.groupMembers = data;
                //vm.groupMemberCheckArray.push()
                vm.numPerPage = 8;
                vm.curGmps = vm.groupMembers.slice(0, vm.numPerPage);
                vm.pagesGmp = Math.ceil(vm.groupMembers.length / vm.numPerPage);
            })
            $.post('am/getAllRoleInfo', {}, function back(data) {
                vm.roles = data;
            })
            $.post('am/getalluser', {}, function back(data) {
                vm.employees = data;
                //vm.numPerPage = 8;
                vm.curEmps = vm.employees.slice(0, vm.numPerPage);
                vm.pagesEmp = Math.ceil(vm.employees.length / vm.numPerPage);
            })
            vm.groupMemberChecked="";
            vm.employeeCheckArray="";
            $('#newProjectModal').modal("hide");
            setTimeout(function() {
                $('.panel').slideDown( "slow" );
            }, 500);
        }
        vm.initTrees=function(){

        }
        //////////////////////////////////////////



        //项目树，静态版本***************************************************
            vm.$opts={expandAllAtFirst:false};
            vm.projectSel="";
            vm.groupSel="";
            vm.groupStyle={};
            vm.projectStyle={};

            vm.pickGroup=function(grpID){
                vm.grpSel=true;
                vm.groupId=grpID;

//                for(var i=0;i<vm.projects.length;i++){
//                    for(var j=0;j<vm.projects[i].groups.length;j++){
//                        if(vm.projects[i].groups[j].groupId==groupID){
//                            vm.groupName=vm.projects[i].groups[j].groupName;
//                            break;
//                        }
//                    }
//            }
                if(vm.groupSel!=grpID) {

                    if(vm.groupSel!="")
                    {
                        var sss="group"+vm.groupSel;
                        document.getElementById(sss).style.backgroundColor = "white";
                    }
                    this.parentElement.parentElement.style.backgroundColor = "cyan";
                    vm.groupSel = grpID;
                    vm.groupName = vm.getGroupById(grpID).groupName;
                }else{
                    //this.parentElement.parentElement.style.backgroundColor="white";
                }
                vm.init();
//                this.setAttribute("style", "font-weight:bold;");
//                this.setAttribute("background-color","rgba(10%,20%,30%,0.3);");
                avalon.scan();
            };
        vm.selectProject=function(prjID){
            if(vm.projectSel!=prjID) {
                if(vm.projectSel!="")
                {
                    var sss = "project" + vm.projectSel;
                    document.getElementById(sss).style.backgroundColor = "white";
                }
                this.parentElement.style.backgroundColor="cyan";
                vm.projectSel = prjID;

            }else{
                //this.parentElement.parentElement.style.backgroundColor="white";
            }
        }
//            vm.newGroup=function(){
//                require(['am.projectManager', 'UIMainFrame'], function (pgd, main) {
//                    pgd.$groupID=a;
//                    var tabConfig = {tabName: a, useHref: true, href: 'am/groupMember.html', tmplLoaded: function (tmpl) {
//                        return tmpl;
//                    }};
//                    var tabid = main.addTab(tabConfig);
//                })
//            };
        vm.delOneGroup=function(){
            if(vm.privilege.addGroup==true) {
                if (vm.groupSel == "") {
                    alert("请选择一个专业组");
                } else {
                    var groupID = vm.groupSel;
                    var r = confirm("确认要删除吗?");
                    if (r == true) {
                        for (var i = 0; i < vm.projects.length; i++) {
                            for (var j = 0; j < vm.projects[i].groups.length; j++) {
                                if (vm.projects[i].groups[j].groupId == groupID) {
                                    $.post("am/deleteOneGroup", {"groupId": vm.groupSel}, function back(data) {
                                        if (data.msg == "success") {
                                            alert("success");
                                        } else {
                                            alert("error");
                                        }
                                    })
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
            }else{
                alert("没有权限");
            }
        }
        vm.delOneProject=function(){
            if(vm.privilege.addProject==true) {
                if (vm.projectSel == "") {
                    alert("请选择一个项目");
                } else {
                    var projectID = vm.projectSel;
                    var r = confirm("确认要删除吗?");
                    if (r == true) {
                        for (var i = 0; i < vm.projects.length; i++) {
                            if (vm.projects[i].projectId == projectID) {
                                $.post("am/deleteOneProject", {"projectId": vm.projectSel}, function back(data) {
                                    if (data.msg == "success") {
                                        alert("success");
                                    } else {
                                        alert("error");
                                    }
                                })
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
            }else{
                alert("没有权限");
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
            if(vm.privilege.addGroup==true) {
                if (vm.projectSel == "") {
                    alert("请选择一个项目");
                } else {
                    var projectId = vm.projectSel;
                    $('#groupModal').modal("show");
                    vm.pidForGroup = projectId;
                    vm.projectSel = "";
                }
            }else{
                alert("没有权限");
            }
        }

        ///////////////////////////////////////////////


        //一些工具函数************************************************
        vm.getGroupById=function(grpID){
            for(var i=0;i<vm.projects.length;i++){
                for(var j=0;j<vm.projects[i].groups.length;j++){
                    if(vm.projects[i].groups[j].groupId==grpID){
                        return vm.projects[i].groups[j];
                    }
                }
            }
        }
        vm.getEmployeeById=function(empId){
            for(var i=0;i<vm.employees.length;i++){
                if(vm.employees[i].employeeNumber==empId){
                    return vm.employees[i];
                }
            }
        }
        vm.getGroupMemberById=function(grpMemberId){
            for(var i=0;i<vm.groupMembers.length;i++){
                if(vm.groupMembers[i].employeeId==grpMemberId){
                    return vm.groupMembers[i];
                }
            }
        }
        getProjectByGroupId=function(grpID){
            for(var i=0;i<vm.projects.length;i++){
                for(var j=0;j<vm.projects[i].groups.length;j++){
                    if(vm.projects[i].groups[j].groupId==grpID){
                        return vm.projects[i];
                    }
                }
            }
        }
        ///////////////////////////////////////////////////////////////

        /////项目组织树数据和函数**************************************




        ///////////////////////////////////////////////////////////////
        return vm;
    })


    $('#groupMemberModal').on('hidden.bs.modal', function () {
        $('#groupMember_close_btn').click();
    })
    $('#newProjectModal').on('hidden.bs.modal', function () {
        $('#newProject_close_btn').click();
    })
    $('#groupModal').on('hidden.bs.modal', function () {
        $('#group_close_btn').click();
    })

    return model;
})
