/**
 * Created by Administrator on 2015/10/14.
 */
/**
 * Created by PC on 2015/5/17.
 * 项目定义模块
 */
define(["mmRequest", "am.sessionUtil","am.searchUtil","Login","UIMainFrame"],
    function (avalon, utils,searchUtil,login,uiMF) {
        var model=avalon.define("prj_maintain",function(vm) {
            vm.privilege={};
            //vm.prjList=[];
            vm.prjTypes=[
                {id:1,name:'类型项目'},
                {id:2,name:'市场项目'},
                {id:3,name:'预研项目'},
                {id:4,name:'内部项目'}
            ];
//        vm.employees=[];
//        vm.projects=[]
//        vm.prjList=[];
            vm.prjDetail={};
            vm.allSel=false;
            vm.detailSel=false;
            vm.createPrjSel=false;
            vm.empListSel=false;
            vm.grpMaintainSel=false;
            vm.grpSel=false;
            vm.emplistSel=false;
            vm.modalName='filterModal'+'prj_maintain'
            vm.modalBtn=vm.modalName+'_close_btn'
            vm.fastAccessConfig={header:'快速访问',submenu:[{text:'计划查看',href:'#'},{text:'报表统计',href:'#'},{text:'行动项查看',href:'#'},
                {text:'大事记',href:'#!/am/comm_mgm/1/'},{text:'项目简报',href:'#!/am/comm_mgm/2/'},{text:'会议记录',href:'#!/am/comm_mgm/3/'},{text:'项目公告',href:'#!/am/comm_mgm/4/'}]}
            vm.data= {
                employees:{
                    pageSize: 5,
                    original_reports: [],
                    search_filter_reports: [],
                    curReports: [],
                    indexPage: 0,
                    pageNum: 0,
                    totalNum:0,
                    filterNum:0
                },
                projects:{
                    pageSize: 5,
                    original_reports: [],
                    search_filter_reports: [],
                    curReports: [],
                    indexPage: 0,
                    pageNum: 0,
                    totalNum:0,
                    filterNum:0
                },
                prjList:{
                    pageSize: 5,
                    original_reports: [],
                    search_filter_reports: [],
                    curReports: [],
                    indexPage: 0,
                    pageNum: 0,
                    totalNum:0,
                    filterNum:0
                },
                groupMembers:{
                    pageSize: 5,
                    original_reports: [],
                    search_filter_reports: [],
                    curReports: [],
                    indexPage: 0,
                    pageNum: 0,
                    totalNum:0,
                    filterNum:0
                }
            }
            vm.init_data=function(reportName,contents){
                vm.data[reportName].original_reports=contents
                vm.data[reportName].totalNum=vm.data[reportName].original_reports.size()
                vm.data[reportName].search_filter_reports=vm.data[reportName].original_reports
                vm.refreshReports(reportName)
            }
            vm.init=function(){
//            utils.getPrivilege(login.loginId,function(data){
//                vm.privilege=data;
//            });
                uiMF.clearSider()
                utils.getEmpList(function(data){
                    vm.init_data('employees',data);
                })
                utils.getAllProject(function(data){
                    vm.init_data('prjList',data)
                    vm.init_data('projects',data)
                    vm.allSel=true;
                    vm.detailSel=false;
                    vm.createPrjSel=false;
                    vm.empListSel=false;
                    vm.grpMaintainSel=false;
                    vm.grpSel=false;
                });
            }
            vm.showEmpList=function(){
                vm.emplistSel = true
            }
            /////////////////////////////////////////////////////权限管理
            vm.grpMaintainAuth=""


            /////////////////////////////////////////////////////页面逻辑
            vm.showPrj=function(){
                vm.selPrjNum=""
                vm.init();
            }
            vm.crtPrj=function(){
                if(login.loginName.search("部门领导")!=-1||login.loginId=='MVP') {
                    vm.selPrjNum = ""
                    uiMF.clearSider();
                    vm.allSel = false;
                    vm.detailSel = false;
                    vm.grpMaintainSel = false;
                    vm.grpSel = false;
                    vm.emplistSel = false
                    vm.createPrjSel = true;
                    vm.empListSel = false;
                    vm.createPrj = {};
                    vm.createPrj.manager = [];
                    vm.createPrj.insLeader = [];
                    vm.createPrj.depLeader = [];
                    vm.createPrj.prjLeader = [];
                    vm.tmpDepLeader = [];
                    vm.tmpInsLeader = [];
                    vm.tmpManager = [];
                    vm.tmpPrjLeader = [];
                }else{
                    alert("没有权限")
                }
            }
            vm.maintainPrj=function(){
                vm.selPrjNum=""
                vm.grpMaintainSel=false;
                vm.allSel=false;
                vm.detailSel=false;
                vm.createPrjSel=false;
                vm.empListSel=false;
                vm.grpSel=false;
                vm.emplistSel = false
                uiMF.prjMaintain();
            }
            vm.detail=function(prjId){
                vm.prjDetail=getPrjByPrjId(prjId);
                vm.detailSel=true;
            }
            vm.selPrjNum=""
            vm.selectOnePrj=function(el){
                vm.selPrjNum=el.projectId
                for(var i=0;i<vm.fastAccessConfig.submenu.size();i++){
                    vm.fastAccessConfig.submenu[i].href+=vm.selPrjNum
                }
                setTimeout(function() {
                    uiMF.fastAccess();
                }, 300);
                vm.detail(el.projectId)
            }
            //////////////////////////////////////选择员工Modal
            vm.selectType="";
            vm.tmpInsLeader=[];
            vm.tmpDepLeader=[];
            vm.tmpPrjLeader=[];
            vm.tmpManager=[];
            vm.pickman=function(id){

                vm.selectType=id;
                vm.empListSel=true;
                vm.refreshReports("employees")
            }
            vm.addOneSelectMan=function(tmpEmp){
                //var index=getIndexByEmpId(tmpEmp.employeeNumber);
                //vm.curEmps.splice(index,1);
                switch (vm.selectType){
                    case 1:
                        if(checkDuplicate(tmpEmp.employeeNumber,vm.tmpInsLeader)){
                            alert("该员工已被选择");
                        }else{
                            vm.tmpInsLeader.push(tmpEmp);
                        }
                        break;
                    case 2:
                        if(checkDuplicate(tmpEmp.employeeNumber,vm.tmpDepLeader)){
                            alert("该员工已被选择");
                        }else{
                            vm.tmpDepLeader.push(tmpEmp);
                        }
                        break;
                    case 3:
                        if(checkDuplicate(tmpEmp.employeeNumber,vm.tmpPrjLeader)){
                            alert("该员工已被选择");
                        }else{
                            vm.tmpPrjLeader.push(tmpEmp);
                        }
                        break;
                    case 4:
                        if(checkDuplicate(tmpEmp.employeeNumber,vm.tmpManager)){
                            alert("该员工已被选择");
                        }else{
                            vm.tmpManager.push(tmpEmp);
                        }
                        break;
                    default :break;
                }
            }
            vm.removePickedMan=function(type,empId){
                switch (type){
                    case 1:vm.tmpInsLeader.splice(getIndexFromLeaderByEmpId(vm.tmpInsLeader,empId),1);break;
                    case 2:vm.tmpDepLeader.splice(getIndexFromLeaderByEmpId(vm.tmpDepLeader,empId),1);break;
                    case 3:vm.tmpPrjLeader.splice(getIndexFromLeaderByEmpId(vm.tmpPrjLeader,empId),1);break;
                    case 4:vm.tmpManager.splice(getIndexFromLeaderByEmpId(vm.tmpManager,empId),1);break;
                    default :break;
                }
            }

            /////////////////////////////////////创建项目
            vm.createPrj={};
            vm.createAprj=function(){
                if(vm.checkTimeLine()) {
                    if (!vm.createPrj.prjTypeId) {
                        vm.createPrj.prjTypeId = vm.prjTypes[0].id
                        vm.createPrj.prjType = vm.prjTypes[0].name
                    }
                    vm.createPrj.insLeader = vm.tmpInsLeader;
                    vm.createPrj.depLeader = vm.tmpDepLeader;
                    vm.createPrj.prjLeader = vm.tmpPrjLeader;
                    vm.createPrj.manager = vm.tmpManager;
                    var d = new Date();
                    vm.createPrj.projectId = "PRJ" + d.getFullYear() + d.getMonth() + d.getDay() + d.getTime() % 10000000;
                    for (var i = 0; i < vm.prjTypes.size(); i++) {
                        if (vm.prjTypes[i].id == vm.createPrj.prjTypeId) {
                            vm.createPrj.prjType = vm.prjTypes[i].name;
                            break;
                        }
                    }
                    var insLeader = "";
                    for (var i = 0; i < vm.tmpInsLeader.size(); i++) {
                        insLeader += (insLeader == "" ? vm.tmpInsLeader[i].employeeNumber : ('##' + vm.tmpInsLeader[i].employeeNumber));
                    }
                    var depLeader = "";
                    for (var i = 0; i < vm.tmpDepLeader.size(); i++) {
                        depLeader += (depLeader == "" ? vm.tmpDepLeader[i].employeeNumber : ('##' + vm.tmpDepLeader[i].employeeNumber));
                    }
                    var prjLeader = "";
                    for (var i = 0; i < vm.tmpInsLeader.size(); i++) {
                        prjLeader += (prjLeader == "" ? vm.tmpPrjLeader[i].employeeNumber : ('##' + vm.tmpPrjLeader[i].employeeNumber));
                    }
                    var manager = "";
                    for (var i = 0; i < vm.tmpManager.size(); i++) {
                        manager += (manager == "" ? vm.tmpManager[i].employeeNumber : ('##' + vm.tmpManager[i].employeeNumber));
                    }
                    $.post(
                        'am/addOneProject',
                        {
                            projectId: vm.createPrj.projectId,
                            projectName: vm.createPrj.projectName,
                            startDate: vm.createPrj.startDate,
                            endDate: vm.createPrj.endDate,
                            prjShortName: vm.createPrj.prjShortName,
                            prjType: vm.createPrj.prjType,
                            prjTypeId: vm.createPrj.prjTypeId,
                            prjSubId: vm.createPrj.prjSubId,
                            contractId: vm.createPrj.contractId,
                            inBudget: vm.createPrj.inBudget,
                            outBudget: vm.createPrj.outBudget,
                            insLeader: insLeader,
                            depLeader: depLeader,
                            prjLeader: prjLeader,
                            manager: manager
                        },
                        function (data) {
                            if (data.msg == 'success') {
                                vm.data.prjList.search_filter_reports.push(vm.createPrj);
                                vm.createPrj = {};
                                vm.showPrj();
                                vm.refreshReports('projects')
                                vm.refreshReports('prjList')
                            }
                        }
                    )
                }else{
                    alert("结束时间不能小于开始时间！")
                }
            }
            /////////////////////////////////////项目团队维护
            vm.selectedPrj={};
            //vm.selectedPrj={prjId:1,projectName:'C919综合管理平台',prjShortName:'C919',prjTypeId:'1',prjType:'型号项目',prjSubId:'PRJ001',contractId:'CTR001',startDate:'2015-01-05',endDate:'2015-02-08',inBudget:'8000',outBudget:'20000',deleteMark:false,manager:[{employeeNumber:1,employeeName:'项目经理一'},{employeeNumber:2,employeeName:'项目经理二'}],insLeader:[{employeeNumber:3,employeeName:'所领导一'}],depLeader:[{employeeNumber:4,employeeName:'部门领导一'}],prjLeader:[{employeeNumber:5,employeeName:'项目领导一'}]};
            vm.firstGmpMembers=[];
            vm.secondGmpMembers=[];

            vm.selectedFirstGrp={};
            vm.selectedSecondGrp={};
            vm.selectedGroupName="";
            vm.selectedGroup={};
            vm.groupMemberChecked="";
            vm.empInfo={};
            vm.roles=[
                {roleId:1,roleName:'组员'},
                {roleId:2,roleName:'组长'}
            ]
            vm.createGroup={};
            vm.selOnePrj=function(prjId){
                vm.selectedPrj=getOnePrjByPrjId(prjId);
                setTimeout(function(){
                    //ajax do something
                },200);
                vm.grpMaintainSel=true;
            }
            vm.selOneFirstGrp=function(grp,grpId){
                utils.getGrpMembers(grp.groupId,function(data){
                    vm.init_data('groupMembers',data)
                    vm.refreshReports('employees')
                    vm.selectedPrj=getOnePrjByPrjId(grp.projectId);
                    vm.selectedGroupName=grp.groupName;
                    vm.selectedGroup=grp;
                    vm.selectedFirstGrp=grp;

                    vm.grpSel = true;
                    vm.emplistSel = false
                })
            }
            vm.selOneSecondGrp=function(grp,grpId){
                utils.getGrpMembers(grp.groupId,function(data) {
                    vm.init_data('groupMembers',data)
                    vm.refreshReports('employees')
                    vm.selectedPrj=getOnePrjByPrjId(grp.projectId);
                    vm.selectedGroupName = grp.groupName;
                    vm.selectedGroup=grp;;
                    vm.selectedSecondGrp = grp;
                    vm.grpSel = true;
                    vm.emplistSel = false
                })
            }
            vm.selPrjAdd={}
            vm.selFirstGrpAdd={}
            vm.firstOrSecond=true;
            vm.addFirstGrp=function(prj){
                utils.checkAuth(login.loginId,prj.projectId,'grpMaintain_op',function(data){
                    if(data.success){
                        vm.createGroup={};
                        vm.firstOrSecond=true;
                        vm.selPrjAdd=prj;
                        $('#groupModal').modal("show");
                    }else{
                        alert("没有权限")
                    }
                })

            }
            vm.addSecondGrp=function(grp){
                utils.checkAuth(login.loginId,grp.projectId,'grpMaintain_op',function(data){
                    if(data.success){
                        vm.createGroup={};
                        vm.firstOrSecond=false;
                        vm.selFirstGrpAdd=grp;
                        $('#groupModal').modal("show");
                    }else{
                        alert("没有权限")
                    }
                })

            }
            vm.addOneGroup=function(){
                var grp = {};
                grp.groupName = vm.createGroup.groupName;
                grp.leaderId = vm.createGroup.leaderId ? vm.createGroup.leaderId : vm.data.employees.original_reports[0].employeeNumber
                grp.groupLeaderName = getEmpNameById(grp.leaderId);
                if(vm.firstOrSecond) {
                    utils.checkAuth(login.loginId, vm.selPrjAdd.projectId, 'grpMaintain_op', function (data) {
                        if (data.success) {
                            grp.projectId = vm.selPrjAdd.projectId;
                            grp.projectName = getPrjByPrjId(vm.selPrjAdd.projectId).projectName
                            grp.type = "first";
                            utils.addFirstGrp(grp, function (data) {
                                if (data.msg == "success") {
                                    grp.groupId = data.grpID;
                                    alert("添加专业组成功")
                                    vm.selPrjAdd.groups.push(grp)
                                    vm.refreshReports('projects')
                                    $('#groupModal').modal("hide");
//                                utils.getAllProject(function(data){
//                                    vm.init_data('prjList',data)
//                                    vm.init_data('projects',data)
//                                    $('#groupModal').modal("hide");
//                                });
                                } else {
                                    alert("error");
                                }
                            })
                        }else{
                            alert("没有权限")
                        }
                    })
                }
                else{
                    utils.checkAuth(login.loginId, vm.selFirstGrpAdd.projectId, 'grpMaintain_op', function (data) {
                        if (data.success) {
                            grp.projectId=vm.selFirstGrpAdd.projectId
                            grp.projectName=getPrjByPrjId(vm.selFirstGrpAdd.projectId).projectName
                            grp.type="second";
                            grp.parentId=vm.selFirstGrpAdd.groupId;
                            utils.addFirstGrp(grp,function(data){
                                if(data.msg=="success"){
                                    grp.groupId=data.grpID;
                                    if(!vm.selFirstGrpAdd.subGroups){
                                        vm.selFirstGrpAdd.subGroups=[];
                                    }
                                    alert("添加二级团队成功")
                                    vm.selFirstGrpAdd.subGroups.push(grp)
                                    vm.refreshReports('projects')
                                    $('#groupModal').modal("hide");
//                                utils.getAllProject(function(data){
//                                    vm.init_data('prjList',data)
//                                    vm.init_data('projects',data)
//                                    $('#groupModal').modal("hide");
//                                });
                                }else{
                                    alert("error");
                                }
                            })
                        }
                        else{
                            alert("没有权限")
                        }
                    })
                }
            }
            vm.delFirstGrp=function(grp){
                utils.checkAuth(login.loginId,grp.projectId,'grpMaintain_op',function(data){
                    if(data.success){
                        var r = confirm("确认要删除吗?");
                        if (r == true) {
                            utils.delGrp(grp.groupId,function(data){
                                if(data.msg=="success"){
                                    var prj = getOnePrjByPrjId(grp.projectId);
                                    for (var i = 0; i < prj.groups.size(); i++) {
                                        if (prj.groups[i].groupId == grp.groupId) {
                                            prj.groups.splice(i, 1);
                                            break;
                                        }
                                    }
                                    vm.refreshReports('projects')
                                    vm.grpSel=false
                                    vm.emplistSel = false
                                    vm.grpMaintainSel=false
                                }else{
                                    alert("删除错误")
                                }
                            })
                        }
                    }else{
                        alert("没有权限")
                    }
                })

            }
            vm.delSecondGrp=function(grp){
                utils.checkAuth(login.loginId,grp.projectId,'grpMaintain_op',function(data){
                    if(data.success){
                        var r = confirm("确认要删除吗?");
                        if (r == true) {
                            utils.delGrp(grp.groupId,function(data){
                                if(data.msg=="success"){
                                    var prj=getOnePrjByPrjId(grp.projectId);
                                    for(var i=0;i<prj.groups.size();i++){
                                        if(prj.groups[i].groupId==grp.parentId){
                                            for(var j=0;j<prj.groups[i].subGroups.size();j++){
                                                if(prj.groups[i].subGroups[j].groupId==grp.groupId){
                                                    prj.groups[i].subGroups.splice(j,1);
                                                    break;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                    vm.refreshReports('projects')
                                    vm.grpSel=false
                                    vm.emplistSel = false
                                }else{
                                    alert("删除错误")
                                }
                            })
                        }
                    }else{
                        alert("没有权限")
                    }
                })

            }
            vm.addOneGrpMember=function(emp){
                utils.checkAuth(login.loginId,vm.selectedGroup.projectId,'grpMaintain_op',function(data){
                    if(data.success){
                        if(checkDuplicate2(emp.employeeNumber,vm.data.groupMembers.search_filter_reports)){
                            alert("一个小组中员工不可重复");
                        }else {
                            var tmp = {};
                            tmp.roleId = 1;
                            tmp.roleName = "组员";
                            tmp.employeeId = emp.employeeNumber;
                            tmp.employeeName = emp.employeeName;
                            tmp.projectId = vm.selectedGroup.projectId;
                            tmp.groupId = vm.selectedGroup.groupId;
                            utils.addGrpMember(tmp, function (data) {
                                if (data.msg == "success") {
                                    utils.getGrpMembers(vm.selectedGroup.groupId,function(data) {
                                        vm.init_data('groupMembers',data)
                                    })
                                }
                            });
                        }
                    }else{
                        alert("没有权限")
                    }
                })

            }
            vm.selectGroupMember=function(ob){
                vm.groupMemberChecked = ob.roleKey;

            }
            vm.modifyMemberINFO=function(){
                utils.checkAuth(login.loginId,vm.selectedGroup.projectId,'grpMaintain_op',function(data){
                    if(data.success){
                        if(vm.groupMemberChecked==""){
                            alert("请选择要修改的组员");
                        }else {
                            vm.empInfo = getGroupMemberByRoleKey(vm.groupMemberChecked);
                            vm.empInfo = vm.empInfo
                            setTimeout(function(){
                                vm.groupMemberChecked=""
                                $('#groupMemberModal').modal('show');
                            },300)
                        }
                    }else{
                        alert("没有权限")
                    }
                })
            }
            vm.modifyGmpInfo=function(){
                utils.checkAuth(login.loginId,vm.selectedGroup.projectId,'grpMaintain_op',function(data){
                    if(data.success){
                        if(!vm.empInfo.roleId){
                            vm.empInfo.roleId=vm.roles[0].roleId
                        }
                        var check=false;
                        if(vm.empInfo.roleId==1){
                            for(var i=0;i<vm.data.groupMembers.search_filter_reports.size();i++){
                                if(vm.empInfo.roleKey!=vm.data.groupMembers.search_filter_reports[i].roleKey&&vm.data.groupMembers.search_filter_reports[i].roleId==2){
                                    check=true;
                                }
                            }
                        }else{
                            check=true
                        }
                        if(check) {
                            utils.changeRole(vm.empInfo.roleKey, vm.empInfo.roleId, function (data) {
                                if (data.msg == "success") {
                                    utils.getGrpMembers(vm.selectedGroup.groupId,function(data) {
                                        vm.init_data('groupMembers', data)
                                        vm.refreshReports('employees')
                                    })
                                } else {
                                    alert("failed");
                                }
                            })
                            vm.empInfo={}
                            $('#groupMemberModal').modal('hide');
                        }else{
                            alert("一个组必须有一个组长")
                        }
                    }else{
                        alert("没有权限")
                    }
                })
            }
            vm.delGmp=function(){
                utils.checkAuth(login.loginId,vm.selectedGroup.projectId,'grpMaintain_op',function(data){
                    if(data.success){
                        var check=false;
                        if(getGroupMemberByRoleKey(vm.groupMemberChecked).roleId==2){
                            for(var i=0;i<vm.data.groupMembers.search_filter_reports.size();i++){
                                if(vm.groupMemberChecked!=vm.data.groupMembers.search_filter_reports[i].roleKey&&vm.data.groupMembers.search_filter_reports[i].roleId==2){
                                    check=true;
                                }
                            }
                        }else{
                            check=true
                        }
                        if(check) {
                            var r = confirm("确认要删除吗?");
                            if (r == true) {
                                utils.delGmp(vm.groupMemberChecked, function (data) {
                                    if (data.msg == "success") {
                                        utils.getGrpMembers(vm.selectedGroup.groupId, function (data) {
                                            vm.init_data('groupMembers', data)
                                            vm.refreshReports('employees')
                                        })
                                    } else {
                                        alert("failed")
                                    }

                                })
                            }
                        }else{
                            alert("无法删除组长")
                        }
                    }else{
                        alert("没有权限")
                    }
                })


            }
            ////////////////////////////////////////////////////图标转换
            vm.changeMessageImg = function(){
                $("#imgMessage_overview").attr("src")=="img/expand.png"?$("#imgMessage_overview").attr("src","img/shrink.png"):
                    $("#imgMessage_overview").attr("src","img/expand.png");
            };
            vm.changeMessageImg_crt=function(){
                $("#imgMessage_crt").attr("src")=="img/expand.png"?$("#imgMessage_crt").attr("src","img/shrink.png"):
                    $("#imgMessage_crt").attr("src","img/expand.png");
            }
            vm.changeMessageImg_empList=function(){
                $("#imgMessage_empList").attr("src")=="img/expand.png"?$("#imgMessage_empList").attr("src","img/shrink.png"):
                    $("#imgMessage_empList").attr("src","img/expand.png");
            }
            vm.changeMessageImg_firstGrp=function(){
                $("#imgMessage_firstGrp").attr("src")=="img/expand.png"?$("#imgMessage_firstGrp").attr("src","img/shrink.png"):
                    $("#imgMessage_firstGrp").attr("src","img/expand.png");
            }
            vm.changeMessageImg_grpMember=function(){
                $("#imgMessage_grpMember").attr("src")=="img/expand.png"?$("#imgMessage_grpMember").attr("src","img/shrink.png"):
                    $("#imgMessage_grpMember").attr("src","img/expand.png");
            }
            vm.changeMessageImg_empListMaintain=function(){
                $("#imgMessage_empListMaintain").attr("src")=="img/expand.png"?$("#imgMessage_empListMaintain").attr("src","img/shrink.png"):
                    $("#imgMessage_empListMaintain").attr("src","img/expand.png");
            }

            /////////////////////////////////////显示
            vm.refreshReports=function(reportName){
                if(reportName=='groupMembers'){
                    vm.orderByDict(reportName,'employeeName',1)
                    var back=0
                    for(var i=0;i<vm.data[reportName].search_filter_reports.size();i++){
                        if(i!=0&&vm.data[reportName].search_filter_reports[i].roleId==2){
                            while(vm.data[reportName].search_filter_reports[back].roleId==2){
                                back++
                                if(back==i) break
                            }
                            if(back>=i){
                                continue
                            }
                            var tmp=vm.data[reportName].search_filter_reports[i]
                            vm.data[reportName].search_filter_reports[i]=vm.data[reportName].search_filter_reports[back]
                            vm.data[reportName].search_filter_reports[back]=tmp
                            back++
                        }
                    }
                }
                vm.data[reportName].curReports=vm.data[reportName].search_filter_reports.slice(0,vm.data[reportName].pageSize)
                vm.data[reportName].pageNum=Math.ceil(vm.data[reportName].search_filter_reports.length / vm.data[reportName].pageSize)
                vm.data[reportName].indexPage=0;
                vm.data[reportName].filterNum= vm.data[reportName].search_filter_reports.size()
            }
            /////////////////////////////////////排序分页
            vm.orderByDict = function(reportName,column,order){
                vm.data[reportName].search_filter_reports=searchUtil.orderByChinese(vm.data[reportName].search_filter_reports,column,order)
                vm.data[reportName].curReports=vm.data[reportName].search_filter_reports.slice(0,vm.data[reportName].pageSize)
                vm.data[reportName].indexPage=0;
            }
            vm.nextPage = function(reportName){
                if(vm.data[reportName].indexPage+1<vm.data[reportName].pageNum){
                    vm.data[reportName].indexPage++
                    vm.data[reportName].curReports=vm.data[reportName].search_filter_reports.slice(
                            vm.data[reportName].indexPage*vm.data[reportName].pageSize,
                            vm.data[reportName].indexPage*vm.data[reportName].pageSize+vm.data[reportName].pageSize)
                }
            }
            vm.prePage = function(reportName){
                if(vm.data[reportName].indexPage>0){
                    vm.data[reportName].indexPage--
                    vm.data[reportName].curReports=vm.data[reportName].search_filter_reports.slice(
                            vm.data[reportName].indexPage*vm.data[reportName].pageSize,
                            vm.data[reportName].indexPage*vm.data[reportName].pageSize+vm.data[reportName].pageSize)
                }
            }
            vm.setPagesMessage = function(reportName){
                vm.data[reportName].pageSize=parseInt(vm.data[reportName].pageSize)
                vm.refreshReports(reportName)
            }
            ////////////////////////////////////////////////////筛选
            vm.reset=function(reportName){
                vm.data[reportName].search_filter_reports=vm.data[reportName].original_reports
                vm.refreshReports(reportName)
            }
            vm.filter={
                reportName:"",
                column:"",
                values:[],
                org_values:[],
                filtered_values:[]
            }
            vm.filterConfig=function(reportName,column){
                vm.filter.org_values=[]
                vm.filter.reportName=reportName
                vm.filter.column=column
                for(var i=0;i<vm.data[reportName].original_reports.size();i++){
                    if(!verify_in(vm.data[reportName].original_reports[i][column],vm.filter.org_values,'name')){
                        var tmp=new Object()
                        tmp.enabled=verify_in(vm.data[reportName].original_reports[i][column],vm.data[reportName].search_filter_reports,column)?true:false
                        tmp.name=vm.data[reportName].original_reports[i][column]
                        vm.filter.org_values.push(tmp)
                    }
                }
                $('#'+vm.modalName).modal('show')
            }
            vm.selALL=function(check){
                for(var i=0;i<vm.filter.org_values.size();i++){
                    vm.filter.org_values[i].enabled=check?true:false
                }
            }
            vm.executeFilter=function(){
                vm.filter.values=[]
                var orgORsearch=false
                for(var i=0;i<vm.filter.org_values.size();i++){
                    if(vm.filter.org_values[i].enabled){
                        vm.filter.values.push(vm.filter.org_values[i].name)
                        if(!verify_in(vm.filter.org_values[i].name,vm.data[vm.filter.reportName].search_filter_reports,vm.filter.column)){
                            orgORsearch=true
                        }
                    }
                }
                vm.data[vm.filter.reportName].search_filter_reports=searchUtil.filter(
                    orgORsearch?vm.data[vm.filter.reportName].original_reports:vm.data[vm.filter.reportName].search_filter_reports,vm.filter.column,vm.filter.values)
                vm.refreshReports(vm.filter.reportName)
                $('#'+vm.modalName).modal('hide')
            }

            vm.checkTimeLine=function(){
                var beginDate=vm.createPrj.startDate
                var endDate=vm.createPrj.endDate
                var d1 = new Date(beginDate.replace(/\-/g, "\/"));
                var d2 = new Date(endDate.replace(/\-/g, "\/"));

                if(beginDate!=""&&endDate!=""&&d1 >=d2)
                {
                    alert("结束时间不能小于开始时间！");
                    return false;
                }
                return true

            }
        })
        verify_in=function(key,array,column){
            for(var i=0;i<array.size();i++){
                if(key==array[i][column]){
                    return true;
                }
            }
            return false;
        }
        getEmpNameById=function(empId){
            for(var i=0;i<model.data.employees.search_filter_reports.size();i++){
                if(empId==model.data.employees.search_filter_reports[i].employeeNumber){
                    return model.data.employees.search_filter_reports[i].employeeName;
                }
            }
        }
        getOnePrjByPrjId=function(prjId){
            for(var i=0;i<model.data.projects.search_filter_reports.length;i++){
                if(model.data.projects.search_filter_reports[i].projectId==prjId){
                    return model.data.projects.search_filter_reports[i];
                }
            }
        }
        getPrjByPrjId=function(prjId){
            for(var i=0;i<model.data.prjList.search_filter_reports.length;i++){
                if(model.data.prjList.search_filter_reports[i].projectId==prjId){
                    return model.data.prjList.search_filter_reports[i];
                }
            }
        }
        getIndexByEmpId=function(empId){
            for(var i=0;i<model.curEmps.length;i++){
                if(model.curEmps[i].employeeNumber==empId){
                    return i;
                }
            }
        }
        getIndexFromLeaderByEmpId=function(leader,empId){
            for(var i=0;i<leader.length;i++){
                if(leader[i].employeeNumber==empId){
                    return i;
                }
            }
        }
        checkDuplicate=function(id,array){
            for(var i=0;i<array.size();i++){
                if(array[i].employeeNumber==id){
                    return true;
                }
            }
            return false;
        }
        checkDuplicate2=function(id,array){
            for(var i=0;i<array.size();i++){
                if(array[i].employeeId==id){
                    return true;
                }
            }
            return false;
        }
        getGroupMemberByRoleKey=function(roleKey){
            for(var i=0;i<model.data['groupMembers'].search_filter_reports.length;i++){
                if(model.data['groupMembers'].search_filter_reports[i].roleKey==roleKey){
                    return model.data['groupMembers'].search_filter_reports[i];
                }
            }
        }
        getGroupMemberIndex=function(roleKey){
            for(var i=0;i<model.data['groupMembers'].search_filter_reports.length;i++){
                if(model.data['groupMembers'].search_filter_reports[i].roleKey==roleKey){
                    return i;
                }
            }
        }
        $('#'+model.modalName).on('hidden.bs.modal', function () {
            $('#'+model.modalBtn).click();
        })
        $('#groupMemberModal').on('hidden.bs.modal', function () {
            $('#groupMember_close_btn').click();
        })
        $('#groupModal').on('hidden.bs.modal', function () {
            $('#group_close_btn').click();
        })
        return model
//    $('#pickManModal').on('hidden.bs.modal', function () {
//        $('#pickman_close_btn').click();
//    })
    })
