/**
 * Created by rtio on 2014/11/13.
 */
define(['jquery','am.sessionUtil','am.cookie','Login','selector','am.searchUtil','am.amCommonFunc','usrOpt',
    'am.planViewMgr','fineuploader','datatables.bootstrap','datatables','bootstrap','ready!'],
    function($,sessionUtil,ck,login,select,searchUtil,commonFunc,up,pvm,fn){
    function getLoginInUserId(){ 
        var userid='111';
        require('Login',function(login){
            if(login.isLogin)
                userid=login.loginId
        });
        return userid
    }
    var planSummaryVM = {};
//    var usrId = "111";
    var usrId = login.loginId;
    var planSummaryMode = avalon.define("planSummary",function(vm){
        _vm = vm;
        vm.spacetest = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        vm.planCheckAll = false;
        vm.draftCheckAll = false;
        vm.CDVisible = false;
        vm.getImportViewOrNot = false;
        vm.importView = false;
        vm.exportCheckAll = false;
        vm.exportAsOneFile = "";
        vm.saveAsOneFile = "";
        vm.isDataTableInit = false;
        vm.importProjectName = '';
        vm.importProjectId = '';
        vm.showPacketId = "";
        vm.taskTmpl = {};
        vm.capitalOption = 0;
        vm.projectControllerName = '';//导入主计划是检测是否分配了项目负责人姓名
        vm.projectControllerId = '';//导入主计划是检测是否分配了项目负责人Id
        vm.planTitleNum = 0;//计划列表表头数量
        vm.movePlan = {};//记录要进行移动的计划或者工作包
        vm.selectedPlan = {};
        vm.selectedPackage = {};//任务查看时选中的工作包
        vm.modifyWBSPlans = [];//记录修改了WBS的plan
        vm.planSummaryTabName = ""
        /*排序所需数据
        * */

        vm.modeView = {
            planList:true,
            planning:false,
            taskList:true,
            planWaitingList:true,
            planWaitingReleaseList:false,
            planChangeApplyList:false,
            planChangeApproveList:false,
            planChangeApprovedList:false,
            packageWaitingDecomposeList:false,
            taskWaitingFeedbackList:false
        };
        vm.siderBar = [
            {item:'新增计划',href:'javascript:void(0)',class:'nav-header',color:'',left:'0px',mode:'planNewHome',toggle:'',target:'',visible:true},
            {item:'计划编制',href:'javascript:void(0)',class:'',color:'',left:'30px',mode:'planning_pNH',toggle:'',target:'',visible:true},
            {item:'计划导入',href:'#importPro',class:'',color:'',left:'30px',mode:'importPro',toggle:'modal',target:'#importPro',visible:true},
            {item:'计划导出',href:'#exportPro',class:'',color:'',left:'30px',mode:'exportPro',toggle:'modal',target:'#exportPro',visible:true},
            {item:'计划变更',href:'javascript:void(0)',class:'nav-header',color:'',left:'0px',mode:'planChangeHome',toggle:'',target:'',visible:true},
            {item:'变更申请',href:'javascript:void(0)',class:'',color:'',left:'30px',mode:'changeApply_pCH',toggle:'',target:'',visible:true},
            {item:'变更审批',href:'javascript:void(0)',class:'',color:'',left:'30px',mode:'changeApprove_pCH',toggle:'',target:'',visible:true},
            {item:'变更实施',href:'javascript:void(0)',class:'',color:'',left:'30px',mode:'changeImplement_pCH',toggle:'',target:'',visible:true},
            {item:'工作包分解',href:'javascript:void(0)',class:'nav-header',color:'',left:'0px',mode:'packageDecompose',toggle:'',target:'',visible:true},
            {item:'任务反馈',href:'javascript:void(0)',class:'nav-header',color:'',left:'0px',mode:'taskFeedback',toggle:'',target:'',visible:true},
            {item:'计划查看',href:'javascript:void(0)',class:'nav-header',color:'',left:'0px',mode:'planCheck',toggle:'',target:'',visible:true},
            /*{item:'报表统计',href:'#!/am/planStatistics',class:'nav-header',color:'',left:'0px',mode:'',toggle:'',target:'',visible:true},*/
        ];
        vm.mode = {};
        vm.modeCur = -1;
        vm.modeViewKey = ["planList","taskList","planWaitingList","packageWaitingDecomposeList",
            "planWaitingReleaseList", "planChangeApplyList", "taskWaitingFeedbackList",
            "planChangeApproveList", "planChangeApprovedList"];
        vm.e2c = {
//            planName:"计划名称",
            planController:"计划负责人",
            planDeadlineDate:"截止日期",
            planFinishDate:"完成时间",
            planStartDate:"开始时间",
            controlDepartment:"所属部门",
            planSource:"来源",
            state:"状态",
            remainingDuration:"剩余时间",
            cashSubject:"现金主体",
            cashReal:"实际现金",
            cashSource:"资金来源",
            cashFlow:"现金流",
            budget:"预算",
            completePercentage:"完成比",
            projectName:"项目名称",
            taskWeight:"任务权重"
        };
        vm.titleOptDefault = {
            wbs:true,
            actionId:true
        };
        vm.threshold = 50;
        vm.filter={
            reportName:"",
            column:"",
            values:[],
            org_values:[],
            filtered_values:[]
        };
        vm.modalName = "filter_plan";
        vm.radio = {
            'planWaitingRelease':false,
            'planChangeApply':false,
            'planChangeApprove':false,
            'planChangeApproved':false,
            'planWaitingReleaseAcc':0,
            'planChangeApplyAcc':0,
            'planChangeApproveAcc':0,
            'planChangeApprovedAcc':0
        };
        vm.package = {}
        vm.data = {
            planWaitingRelease:{
                pageSize:10,
                original_reports:[],
                allReports:{},
                task_reports:[],
                reports:[],
                curReports:[],
                will2Release:{},
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            planChangeApply:{
                pageSize:10,
                original_reports:[],
                allReports:{},
                task_reports:[],
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            planChangeApprove:{
                pageSize:10,
                original_reports:[],
                allReports:{},
                task_reports:[],
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            planChangeApproved:{
                pageSize:10,
                original_reports:[],
                allReports:{},
                task_reports:[],
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            plan:{
                pageSize:10,
                original_reports:[],
                task_reports:[],
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            task:{
                pageSize:10,
                original_reports:[],
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            packageWaitingDecompose:{
                pageSize:10,
                original_reports:[],
                allReports:{},
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            taskWaitingFeedback:{
                pageSize:10,
                original_reports:[],
                allReports:{},
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            planWaiting:{
                pageSize:5,
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            project:{
                pageSize:5,
                reports:[],
                projectName2Project:{},
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            projectExport:{
                pageSize:5,
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            },
            projectImport:{
                pageSize:5,
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                filted:false,
                filterNum:0
            }
        };
        vm.title = {
            planTitle:[],
            taskTitle:[],
            planWaitingTitle:[]
        };

        vm.prePage = function(term){//翻页设置：前一页
            if (vm.data[term]['indexPage'] > 0) {
                vm.data[term]['indexPage']--;
                vm.data[term]['curReports'] =
                    vm.data[term]['search_filter_reports'].slice(vm.data[term]['indexPage']*vm.data[term]['pageSize'],
                            vm.data[term]['indexPage']*vm.data[term]['pageSize']+vm.data[term]['pageSize']);
            }
        };
        vm.nextPage = function(term){//翻页设置：后一页
            var height = $("#accordion-element-"+term+"List").height();
            if (vm.data[term]['indexPage']+1 < vm.data[term]['pageNum']) {
                vm.data[term]['indexPage'] ++;
                vm.data[term]['curReports'] =
                    vm.data[term]['search_filter_reports'].slice(vm.data[term]['indexPage']*vm.data[term]['pageSize'],
                            vm.data[term]['indexPage']*vm.data[term]['pageSize']+vm.data[term]['pageSize']);
            }
            if(vm.data[term]['indexPage']+1==vm.data[term]['pageNum']){
                $("#accordion-element-"+term+"List").height(height);
            }
        };
        vm.setPageSize = function(term,sid,aid){//设置每页显示
            vm.data[term]['pageSize'] = parseInt($("#"+sid).val());
            vm.data[term]['curReports']   = vm.data[term]['search_filter_reports'].slice(0, vm.data[term]['pageSize']);
            vm.data[term]['pageNum'] = Math.ceil(vm.data[term]['search_filter_reports'].length / vm.data[term]['pageSize']);
            vm.data[term]['indexPage'] = 0;
            aid!=''?$("#"+aid).css('height','auto').height():null;
        };
        vm.changeShrinkExpandImg = function(id){
            commonFunc.changeShrinkExpandImg(id);
        };
        vm.LRShrink = function(cid,pid,ciid){
            if(cid == "planList") {
                if ($("#" + ciid).attr("class") == "icon-chevron-left") {
                    vm.modeView[pid] = true;
                    $("#" + ciid).attr("class","icon-chevron-right")
                }else{
                    vm.modeView[pid] = false;
                    $("#" + ciid).attr("class","icon-chevron-left")
                }
            }else{
                if ($("#" + ciid).attr("class") == "icon-chevron-left") {
                    vm.modeView[pid] = false;
                    $("#" + ciid).attr("class","icon-chevron-right")
                }else{
                    vm.modeView[pid] = true;
                    $("#" + ciid).attr("class","icon-chevron-left")
                }
            }
        };
        vm.changePlanExpandShrink = function(cl,el){
            $("."+cl).attr("src")=="img/planExpand.png"?$("."+cl).attr("src","img/planShrink.png"):
                $("."+cl).attr("src","img/planExpand.png");
            //保证高度不变
            var height = $("#accordion-element-planList").height();

            //将原来的数组进行重置
            var planDGrid = [];
            var planDGrid_original = vm.data['plan']['original_reports'];
            if( $("."+cl).attr("src") == "img/planExpand.png"){//收
                for(var i=0;i<planDGrid_original.length;i++){
                    if(planDGrid_original[i].planCode==el.planCode){
                        planDGrid_original[i].imgSrc = "img/planExpand.png";
                        for(var j=i+1;j<planDGrid_original.length
                            && planDGrid_original[j].level > el.level;j++) {
                            planDGrid_original[j].visible = false
                        }
                    }
                }
            }else{//放
                for(var i= 0;i<planDGrid_original.length;i++){
                    if(planDGrid_original[i].planCode==el.planCode){
                        planDGrid_original[i].imgSrc = "img/planShrink.png"
                    }
                    if(planDGrid_original[i].parentPlanCode==el.planCode){
                        planDGrid_original[i].visible = true;
                        if(planDGrid_original[i].imgSrc=="img/planShrink.png"){
                            i=vm.expandThis(i+1,planDGrid_original[i].planCode)-1
                        }
                    }
                }
            }
            //将可见的数据放入curReports中
            planDGrid_original.forEach(function(e){
                if(e.visible){
                    planDGrid.push(e)
                }
            });
            vm.data['plan']['reports'] = planDGrid;
            /*//PlanList分页设置
            vm.data['plan']['curReports']   = planDGrid.slice(vm.data['plan']['indexPage']*vm.data['plan']['pageSize'],
                    vm.data['plan']['indexPage']*vm.data['plan']['pageSize']+vm.data['plan']['pageSize']);
            vm.data['plan']['pageNum'] = Math.ceil(planDGrid.length / vm.data['plan']['pageSize']);*/
            /*//保证高度不变
            if($("."+cl).attr("src")=="img/planShrink.png") {
                $("#accordion-element-planList").css('height', 'auto').height();
            }
            else {
                $("#accordion-element-planList").height(height)
            }*/
        };
        vm.expandThis = function(index,planCode){
            var rIndex = index;
            for(var i=index;i<vm.data['plan']['original_reports'].length;i++){
                if(vm.data['plan']['original_reports'][i].parentPlanCode==planCode) {
                    vm.data['plan']['original_reports'][i].visible = true;
                    if(vm.data['plan']['original_reports'][i].imgSrc=="img/planShrink.png"){
                        i = vm.expandThis(i+1,vm.data['plan']['original_reports'][i].planCode)-1
                    }
                    rIndex = i
                }
            }
            return rIndex+1
        };
        vm.openUsrSetWindow = function(term){//打开设置窗口
            up.setData(term, vm.title[term + 'Title']);
            $('#UsrOpt').modal('show')
        };
        vm.loadPlans = function(project,sid){
            var projectName = "";
            if(project=="null"){
                projectName = $("#select-shortcuts-myProject").val()
            }else{
                projectName = project.projectName
            }
            //================初始化radio================//
            vm.data['project']['reports'].forEach(function(el){
                if(el.projectName!=projectName){
                    el.text = false;
                    el.selected = ""
                }else {
                    el.text = true;
                    el.selected = "selected";
                    $("#select-shortcuts-myProject").val(projectName)
                }
            });
            //设置项目分页
            var start = vm.data['project']['indexPage'] * vm.data['project']['pageSize'];
            var end = vm.data['project']['indexPage'] * vm.data['project']['pageSize'] + vm.data['project']['pageSize'];
            vm.data['project']['curReports'] = vm.data['project']['reports'].slice(start, end);
            var usrId = login.loginId;
            //===============清空plan数据==============//
            vm.data['plan']['curReports'] = [];
            vm.data['plan']['reports'] = [];
            vm.data['plan']['task_reports'] = [];
            vm.data['plan']['search_filter_reports'] = [];
            vm.data['plan']['original_reports'] = [];
            vm.data['plan']['pageNum'] = 0;
            vm.data['plan']['indexPage'] = 0;
            vm.package = []
            //===============获取该项目相关的所有计划和任务=============//
            /*获取待分解工作包*/
            var pwDecomp = vm.data['packageWaitingDecompose']['allReports'][projectName]
            vm.data['packageWaitingDecompose']['reports'] = pwDecomp
            vm.data['packageWaitingDecompose']['search_filter_reports'] = pwDecomp
            vm.data['packageWaitingDecompose']['curReports'] = pwDecomp.slice(0, vm.data['packageWaitingDecompose']['pageSize']);
            vm.data['packageWaitingDecompose']['pageNum'] = Math.ceil(pwDecomp.length / vm.data['packageWaitingDecompose']['pageSize']);
            /*获取待反馈任务*/
            var twFeedback = pwDecomp = vm.data['taskWaitingFeedback']['allReports'][projectName]
            vm.data['taskWaitingFeedback']['reports'] = twFeedback
            vm.data['taskWaitingFeedback']['search_filter_reports'] = twFeedback
            vm.data['taskWaitingFeedback']['curReports'] = twFeedback.slice(0, vm.data['taskWaitingFeedback']['pageSize']);
            vm.data['taskWaitingFeedback']['pageNum'] = Math.ceil(twFeedback.length / vm.data['taskWaitingFeedback']['pageSize']);
            sessionUtil.getAllPlansTasks(usrId,'',function(data){
                data = vm.data['project']['projectName2Project'][projectName]
                //分离计划和任务
                var pdata = [];
                var tdata = [];
                var packageCode2value = []
                var tPackage = []
                data.forEach(function(el){
                    if(el.isTask){
                        tdata.push(el)
                        /*提取工作包中的任务*/
                        if(vm.package[el.parentPlanCode]==undefined){
                            vm.package[el.parentPlanCode] = []
                        }
                        vm.package[el.parentPlanCode].push(el)
                    }else{
                        pdata.push(el)
                        if(el.leaf){
                            packageCode2value[el.planCode] = el
                        }
                    }
                });
                /*获取排好序的工作包目录和工作包*/
                var sortedPdata = []
                var wbsToRecords = {}
                for(var i=0;i<pdata.length;i++){
                    wbsToRecords[pdata[i].wbs] = pdata[i]
                }
                var cur = "1"
                var limitAcc = pdata.length*3
                while(sortedPdata.length!=pdata.length && limitAcc>0){
                    if(wbsToRecords[cur]!=undefined) {
                        sortedPdata.push(wbsToRecords[cur])
                        cur = cur +  ".1"
                    }else{
                        cur = cur.substr(0,cur.lastIndexOf("."))
                        var lpp = cur.lastIndexOf(".")
                        var index = parseInt(cur.substr(lpp+1,cur.length - lpp - 1))+1
                        cur = cur.substr(0,lpp)
                        cur = cur + "." + index.toString()
                    }
                    limitAcc--
                }
                vm.data['plan']['reports'] = sortedPdata;
                vm.data['plan']['search_filter_reports'] = sortedPdata;
                vm.data['plan']['original_reports'] = sortedPdata;
                vm.data['plan']['task_reports'] = tdata;
                vm.data['plan']['curReports'] = pdata.slice(0, vm.data['plan']['pageSize']);
                vm.data['plan']['pageNum'] = Math.ceil(pdata.length / vm.data['plan']['pageSize']);
            })
            $("#"+sid).val(vm.data['plan']['pageSize'])
            //清空task列表中的数据
            vm.data['task']['reports'] = [];
            vm.data['task']['curReports'] = [];
            vm.data['task']['indexPage'] = 0;
//            vm.data['task']['pageSize'] = 5
            vm.data['task']['pageNum'] = 0;
            //===============获取该项目相关的“待发布项”=============//
            vm.data['planWaitingRelease']['reports'] = vm.data['planWaitingRelease']['allReports'][project.projectName]
            //===============获取该项目相关的“我的变更申请”=============//
            vm.data['planChangeApply']['reports'] = vm.data['planChangeApply']['allReports'][project.projectName]
            //===============获取该项目相关的“变更审批”=============//
            vm.data['planChangeApprove']['reports'] = vm.data['planChangeApprove']['allReports'][project.projectName]
            //===============获取该项目相关的“已批准变更”=============//
            vm.data['planChangeApproved']['reports'] = vm.data['planChangeApproved']['allReports'][project.projectName]
            //设置cookie
            ck.cookie.set("projectName",projectName)
        };
        vm.loadTasks = function(plan){
            vm.showPacketId = plan.planCode;
            //初始化radio
            var tmpPlanRep = vm.data['plan']['reports']
            for(var i=0;i<tmpPlanRep.length && vm.selectedPackage!=undefined;i++){
                if(tmpPlanRep[i].planCode==vm.selectedPackage.planCode){
                    tmpPlanRep[i].text = false
                    break;
                }
            }
            vm.selectedPackage = plan

            vm.data['task']['reports'] = [];
            vm.data['task']['curReports'] = [];
            vm.data['task']['pageNum'] = 0;
            var tdata = vm.package[plan.planCode]==undefined?[]:vm.package[plan.planCode];
            //设置筛选数据
            vm.data['task']['reports'] = tdata;
            vm.data['task']['search_filter_reports'] = tdata;
            //设置任务分页
            vm.data['task']['curReports'] = tdata.slice(vm.data['task']['indexPage']*vm.data['task']['pageSize'],
                    vm.data['task']['indexPage']*vm.data['task']['pageSize']+vm.data['task']['pageSize']);
            vm.data['task']['pageNum'] = Math.ceil(tdata.length / vm.data['task']['pageSize'])
        };
        vm.loadPlan = function (pl) {
//            if(pl.remark == "草稿")
//                window.location.hash='#!/am/plan/' + pl.planCode + '/'+(pl.isActionItem=="true"?'newAction':'newPlan')+'/#'+avalon.param(pl);
            if(pl.leaf!=1) {
                require(['am.cookie'],function(amCookie){
                    var planAuditorId = amCookie.cookie.get("planAuditorId");
                    var planCreatorId = amCookie.cookie.get("planCreatorId");
                    planCreatorId = pl.planCreatorId;
                    if(planAuditorId == undefined || planCreatorId == undefined){
                        sessionUtil.getCAId(pl.parentPlanCode,function(data){
                            planAuditorId = data;
                        });
                    }
                    window.location.href = '#!/am/plan/' + pl.planCode;
                });
            }else if(pl.isTask!=undefined && pl.isTask==1){
                window.location.href = '#!/am/task/' + pl.planCode;
            }else{
                window.location.href = '#!/am/taskDecompose/'+pl.planCode+"/"+pl.planName;
            }
        };
        vm.selectAll = function(item){
            vm.data[item]['reports'].forEach(function (el) {
                el.text = vm.radio[item]
            });
            if(vm.radio[item]) {
                vm.radio[item + 'Acc'] = vm.data[item]['reports'].length
            }else{
                vm.radio[item + 'Acc'] = 0
            }
        };
        vm.selectOne = function(item,text,report){
            if(!text) {
                vm.radio[item] = text;
                vm.radio[item+'Acc']--
                delete vm.data[item]['will2Release'][report.planKey]
            }else{
                vm.radio[item + 'Acc']++;
                vm.data[item]['will2Release'][report.planKey] = report
                if(vm.radio[item+'Acc']==vm.data[item]['reports'].length){
                    vm.radio[item] = true
                }
            }
        };
        vm.initExportProject = function(){
            //初始化计划导出对话框
            vm.importProjectName = '';
            vm.importProjectId = '';
            vm.projectControllerName = '';
            vm.projectControllerId = '';
            //数据清零
            vm.data['projectExport']['reports'] = [];
            vm.data['projectExport']['curReports'] = [];
            vm.data['projectExport']['indexPage'] = 0;
            //获取所有项目
            sessionUtil.getRoleByEmployee(login.loginId,function(roleInfo){
                //================初始化权限信息=================//
                var role_map = {};
                for(var i=0;i<roleInfo.length;i++){
                    var val_proName = roleInfo[i].projectName;
                    var val_roleId = roleInfo[i].roleId;
                    if(role_map[val_proName]!=undefined && role_map[val_proName]!=null){
                        if(val_roleId=="3"){
                            role_map[val_proName] = val_roleId
                        }
                    }else if(val_roleId=="3"){
                        role_map[val_proName] = val_roleId
                    }
                }
//                    var proGrids = eval('('+ data +')');
                var proGrids = vm.data['project']['reports'];
                //初始化项目导出列表数据
                var proExportData = [];
                proGrids.forEach(function(el){
                    if(role_map[el.projectName]=="3"){
                        el.selected = false;
                        proExportData.push(el)
                    }
                });
                //设置分页
                vm.data['projectExport']['reports'] = proExportData;
                vm.data['projectExport']['search_filter_reports'] = proExportData;
                vm.data['projectExport']['curReports'] = proExportData.slice(0, vm.data['projectExport']['pageSize']);
                vm.data['projectExport']['pageNum'] = Math.ceil(proExportData.length / vm.data['projectExport']['pageSize'])
            })
        };
        vm.initImportProject = function(){
            //初始化导入对话框
            vm.data['projectImport']['reports'] = [];
            vm.data['projectImport']['curReports'] = [];
            vm.data['projectImport']['indexPage'] = 0;
            vm.importProjectId = '';
            //获取所有项目
            sessionUtil.getRoleByEmployee(login.loginId,function(roleInfo){
                //================初始化权限信息=================//
                var role_map = {};
                for(var i=0;i<roleInfo.length;i++){
                    var val_proName = roleInfo[i].projectName;
                    var val_roleId = roleInfo[i].roleId;
                    if(role_map[val_proName]!=undefined && role_map[val_proName]!=null){
                        if(val_roleId=="3"){
                            role_map[val_proName] = val_roleId
                        }
                    }else if(val_roleId=="3"){
                        role_map[val_proName] = val_roleId
                    }
                }
                var proGrids = vm.data['project']['reports'];
                //初始化项目导出列表数据
                var proImportData = [];
                proGrids.forEach(function(el){
                    if(role_map[el.projectName]=="3"){
                        el.selected = false;
                        proImportData.push(el)
                    }
                });
                //设置分页
                vm.data['projectImport']['reports'] = proImportData;
                vm.data['projectImport']['search_filter_reports'] = proImportData;
                vm.data['projectImport']['curReports'] = proImportData.slice(0, vm.data['projectImport']['pageSize']);
                vm.data['projectImport']['pageNum'] = Math.ceil(proImportData.length / vm.data['projectImport']['pageSize'])
            })
        };
        vm.selectImportPro = function(project){
            vm.data['projectImport']['reports'].forEach(function(el){
                if(el.selected) {
                    if (el.projectId != project.projectId) {
                        el.selected=false
                    }
                }
            });
            vm.data['projectImport']['curReports'] =
                vm.data['projectImport']['reports'].slice(vm.data['projectImport']['indexPage']*
                    vm.data['projectImport']['pageSize'], vm.data['projectImport']['pageSize']);
            vm.importProjectId = project.projectId
        };
        vm.exportProject = function(projectName){//计划导出
            vm.data['projectExport']['curReports'].forEach(function(el){
                if(el.projectName==projectName) {
                    el.downloadstr="正在生成主计划...";
                }
            });
            $.post(
                'am/exportMainProject',
                {projectName:projectName},
                function(data){
                    if(data==null) {
                        vm.data['projectExport']['curReports'].forEach(function(el){
                            if(el.projectName==projectName) {
                                el.disable = true;
                                el.downloadHref = "am\\"+projectName + ".xls";
                                el.downloadstr="下载";
                            }
                        });
                        alert("导出成功!");
                    }
                    else
                        alert("导出失败！\n"+"错误信息："+data);
                    vm.data['projectExport']['curReports'] = vm.data['projectExport']['curReports'];
//                    $('#exportPro').modal("hide");
                }
            )
        };
        vm.selectPath = function(el,index){
            //采用打开文件的方式获取路径
            /*$('#file').click();
            setTimeout(function() {el.exportPath = $('#file').val();}, 2000);*/
            try {

                var Message = "Please select the folder path.";  //选择框提示信息
                var Shell = new ActiveXObject("Shell.Application");
                var Folder = Shell.BrowseForFolder(0, Message, 0x0040, 0x0011); //起始目录为：我的电脑
//                var Folder = Shell.BrowseForFolder(0, Message, 0x4000,0x0021); //起始目录为：我的电脑
//                var Folder = Shell.BrowseForFolder(0,Message,0); //起始目录为：桌面
                if (Folder != null) {
                    Folder = Folder.items();  // 返回 FolderItems 对象
                    Folder = Folder.item();  // 返回 Folderitem 对象
                    Folder = Folder.Path;   // 返回路径
                    if (Folder.charAt(Folder.length - 1) != "\\") {
                        Folder = Folder + "\\";
                    }
                    el.exportPath = Folder+el.projectName+".xls";
                }
            } catch (e) {
                alert(e.message);
            }
        };
        vm.initEmployeeSelector= function(modalSelector) {
            select.types['managerSelectForPlanStatistics'].onSelect = function (row) {
                avalon.log(row);
                vm.projectControllerName = row.employeeName;
                vm.projectControllerId = row.employeeId;
            };
            $(modalSelector).modal('show');
            select.init('managerSelectForPlanStatistics')

        };
        vm.releaseAction = function(item,reports){
            for(var key in reports) {
                var rep=reports[key]
                var prmObj=pvm.openReport(rep.planKey,null,rep,false)
                prmObj.releasePlanWithParameter(rep)
                //更新Reports.
                if(rep.planState == 2) {
                    for (var i = 0; i < vm.data[item]['reports'].length; i++) {
                        var rrep = vm.data[item]['reports'][i]
                        if (rrep.planKey == rep.planKey) {
                            vm.data[item]['reports'].splice(i, 1)
                            i--
                        }
                    }
                }
            }
            //刷新curReports.
            vm.data[item]['curReports'] = vm.data[item]['reports'].slice(vm.data[item]['indexPage']*vm.data[item]['pageSize'],
                vm.data[item]['indexPage']*vm.data[item]['pageSize']+vm.data[item]['pageSize']);
            vm.data[item]['pageNum'] = Math.ceil(vm.data[item]['reports'].length / vm.data[item]['pageSize'])
        };
        //==================计划编制==================//
        vm.selectOnePlan = function(plan){
            var eClass = "row" + plan.planCode;
            if(vm.siderBar[vm.modeCur] != undefined &&
                vm.siderBar[vm.modeCur]['mode'] == 'planning_pNH'){
                var bgColor = $('.' + eClass).css('background-color');
                if(bgColor == 'rgb(176, 190, 217)') {
                    $('.' + eClass).css('background-color', '');
                    vm.selectedPlan = {}
                }else{
                    $('.' + eClass).css('background-color', '#b0bed9');
                    $('.row' + vm.selectedPlan.planCode).css('background-color', '');
                    vm.selectedPlan = plan
                }
                vm.movePlan = plan
            }
        };
        vm.shiftPlan = function(item){
            /*移动工作包目录*//*
            var tplanReports = vm.data['plan']['original_reports']
            var preIndex = -1
            var curIndex = -1
            var nextIndex = -1
            var nnextIndex = -1
            *//*找到要交换的元素索引*//*
            for(var i=0;i<tplanReports.length;i++){
                if(tplanReports[i].planCode==vm.selectedPlan.planCode){
                    curIndex = i
                    while(++i<tplanReports.length && tplanReports[i].level>vm.selectedPlan.level);
                    nextIndex = i
                    if(nextIndex==tplanReports.length) break;
                    if(tplanReports[nextIndex].level != vm.selectedPlan.level) break;
                    while(++i<tplanReports.length && tplanReports[i].level>vm.selectedPlan.level);
                    nnextIndex = i
                    break;
                }
                if(tplanReports[i].level==vm.selectedPlan.level){
                    preIndex = i
                }
            }
            *//*生成新序列子数组*//*
            var changeArray = []
            var curArray = []
            var newArray = []
            if(item=='up'){
                if(preIndex==-1) return;
                changeArray = tplanReports.slice(preIndex,curIndex)
                curArray = tplanReports.slice(curIndex,nextIndex)
                $(".row"+tplanReports[curIndex].planCode).css("background-color",'')
            }else{
                if(nnextIndex==-1) return;
                changeArray = tplanReports.slice(nextIndex,nnextIndex)
                curArray = tplanReports.slice(curIndex,nextIndex)
                $(".row"+tplanReports[curIndex].planCode).css("background-color",'')
            }
            var cWBSPre = changeArray[0].wbs
            var curWBSPre = curArray[0].wbs
            //更改新序列中的wbs
            changeArray.forEach(function(el){
                el.wbs = curWBSPre + el.wbs.substr(curWBSPre.length,el.wbs.length)
            })
            curArray.forEach(function(el){
                el.wbs = cWBSPre + el.wbs.substr(cWBSPre.length,el.wbs.length)
            })
            //删除并添加新的子序列
            var index = 0
            if(item=='up') {
                newArray = curArray.concat(changeArray)
                tplanReports.splice(preIndex,newArray.length)
                index = preIndex
            }else{
                newArray = changeArray.concat(curArray)
                tplanReports.splice(curIndex,newArray.length)
                index = curIndex
            }
            for(var j= 0;j<newArray.length;j++,index++){
                tplanReports.splice(index,0,newArray[j])
            }
            var eClass = ""
            if(item=='up'){
                vm.selectedPlan = tplanReports[preIndex]
                eClass = "row"+vm.selectedPlan.planCode
            }else{
                vm.selectedPlan = tplanReports[nnextIndex-curArray.length]
                eClass = "row"+vm.selectedPlan.planCode
            }
            var newPlanReports = []
            tplanReports.forEach(function(el){
                if(el.visible){
                    newPlanReports.push(el)
                }
            })
            vm.data['plan']['reports'] = newPlanReports
            $('.'+eClass).css("background-color",'#b0bed9')
            return;*/
            if(!vm.selectedPlan.leaf) return;
            /*移动工作包*/
            var planReports = vm.data['plan']['reports']
            for(var i=0;i<planReports.length;i++){
                if(planReports[i].planCode==vm.selectedPlan.planCode){
                    var curIndex = i
                    var changeIndex = 0
                    if(item=='up') {
                        if (i - 1 < 0) return;
                        if(planReports[i-1].level != planReports[i].level || !planReports[i-1].leaf) break;
                        changeIndex = i-1
                    }else{
                        if(i+1==planReports.length) return;
                        if(planReports[i+1].level != planReports[i].level || !planReports[i+1].leaf) break;
                        changeIndex = i+1
                    }
                    var tmp = {}
                    var wbsCur = planReports[curIndex].wbs
                    var wbsChange = planReports[changeIndex].wbs
                    var classCur = 'row'+planReports[curIndex].planCode
                    var classChange = 'row'+planReports[changeIndex].planCode
                    $('.'+classCur).css('background-color', '')
                    $('.'+classChange).css('background-color', '#b0bed9')
                    avalon.mix(true,tmp,planReports[changeIndex])
                    avalon.mix(true,planReports[changeIndex],planReports[curIndex])
                    planReports[changeIndex].wbs = wbsChange
                    avalon.mix(true,planReports[curIndex],tmp)
                    planReports[curIndex].wbs = wbsCur
                    vm.selectedPlan = planReports[changeIndex]

                    sessionUtil.updatePlan({
                        'planCode':planReports[curIndex].planCode,
                        'wbs':planReports[curIndex].wbs
                    })
                    sessionUtil.updatePlan({
                        'planCode':planReports[changeIndex].planCode,
                        'wbs':planReports[changeIndex].wbs
                    })
                    break;
                }
            }
        }
        //==================转换模式==================//
        vm.changeMode = function(mode,item){
            //格式化数据
            if(vm.selectedPlan != {}) {
                $('.row' + vm.selectedPlan.planCode).css('background-color', '')
                vm.selectedPlan = {}
            }
            if(mode=='importPro'){
                vm.initImportProject();
                return;
            }
            if(mode=='exportPro'){
                vm.initExportProject();
                return;
            }
            //改变tabName
            require(['UIMainFrame','ready!'],function(main){
                main.tabs[main.currentIndex].tabName = item
            });
            if(mode=='') return;
            var display = {};
            if(vm.modeCur != -1) {
                vm.siderBar[vm.modeCur]['color'] = ''
            }
            vm.modeCur = vm.mode[mode];
            vm.siderBar[vm.modeCur]['color'] = 'red';
            switch (mode){
                case 'planNewHome':{
                    display.planList = true;
                    display.planWaitingReleaseList = true
                }
                    break;
                case 'planning_pNH':{
                    display.planList = true;
                    display.planning = true
                }
                    break;
                case 'planChangeHome':{
                    display.planList = true;
                    display.planChangeApplyList = true
                }
                    break;
                case 'changeApply_pCH':{
                    display.planList = true
                }
                    break;
                case 'changeApprove_pCH':{
                    display.planList = true;
                    display.planChangeApproveList = true
                }
                    break;
                case 'changeImplement_pCH':{
                    display.planList = true;
                    display.planChangeApprovedList = true
                }
                    break;
                case 'planCheck':{
                    display.planList = true
                }
                    break;
                case 'packageDecompose':{
                    display.packageWaitingDecomposeList = true
                    display.planList = true
                }
                    break;
                case 'taskFeedback':{
                    display.taskWaitingFeedbackList = true
                    display.planList = true
                    display.taskList = true
                }
                    break;
            }
            window.location.href = '#!/am/sub';
            for(var key in vm.modeView){
                if (key.indexOf("plan") == -1 && key.indexOf("task") == -1 && key.indexOf("package") == -1) continue;
                if(display[key] == true){
                    vm.modeView[key] = true
                }else {
                    vm.modeView[key] = false
                }
            }
        };
        //==================实现筛选==================//
        vm.filterConfig=function(reportName,column){
            vm.filter.org_values = [];
            vm.filter.reportName = reportName;
            vm.filter.column = column;
            for(var i=0;i<vm.data[reportName]['reports'].length;i++){
                if(!vm.verify_in(vm.data[reportName]['reports'][i][column],vm.filter.org_values,'name')){
                    var tmp = {};
                    tmp.enabled = vm.verify_in(vm.data[reportName]['reports'][i][column], vm.data[reportName].search_filter_reports, column) ? true : false;
//                    tmp.enabled = true
                    tmp.name = vm.data[reportName]['reports'][i][column];
                    vm.filter.org_values.push(tmp)
                }
            }
            vm.filter = vm.filter;
            $('#'+vm.modalName).modal('show')
        };
        vm.verify_in = function(key,array,column){
            for(var i=0;i<array.length;i++){
                if(key==array[i][column]){
                    return true;
                }
            }
            return false;
        };
        vm.executeFilter=function(){
            vm.filter.values = [];
            var orgORsearch = false;
            for(var i=0;i<vm.filter.org_values.size();i++){
                if(vm.filter.org_values[i].enabled){
                    vm.filter.values.push(vm.filter.org_values[i].name);
                    if(!vm.verify_in(vm.filter.org_values[i].name,vm.data[vm.filter.reportName].search_filter_reports,vm.filter.column)){
                        orgORsearch=true
                    }
                }
            }
            vm.data[vm.filter.reportName].search_filter_reports=searchUtil.filter(
                orgORsearch ? vm.data[vm.filter.reportName].reports : vm.data[vm.filter.reportName].search_filter_reports, vm.filter.column, vm.filter.values);
            vm.refreshReports(vm.filter.reportName);
            //判断是否进行了筛选，若进行了筛选则取消树形结构
            if(vm.filter.values.length!=vm.filter.org_values.length)
                vm.data[vm.filter.reportName]['filted'] = true;
            else vm.data[vm.filter.reportName]['filted'] = false;
            $('#'+vm.modalName).modal('hide')
        };
        vm.refreshReports=function(reportName){
            if(reportName=='groupMembers'){
                vm.orderByDict(reportName, 'employeeName', 1);
                var back = 0;
                for(var i=0;i<vm.data[reportName].search_filter_reports.size();i++){
                    if(i!=0&&vm.data[reportName].search_filter_reports[i].roleId==2){
                        while(vm.data[reportName].search_filter_reports[back].roleId==2){
                            back++;
                            if(back==i) break
                        }
                        if(back>=i){
                            continue
                        }
                        var tmp = vm.data[reportName].search_filter_reports[i];
                        vm.data[reportName].search_filter_reports[i] = vm.data[reportName].search_filter_reports[back];
                        vm.data[reportName].search_filter_reports[back] = tmp;
                        back++
                    }
                }
            }
            //设置分页
//            vm.data[reportName]['reports'] = vm.data[reportName].search_filter_reports
            vm.data[reportName]["curReports"] = vm.data[reportName].search_filter_reports.slice(0, vm.data[reportName]['pageSize']);
            vm.data[reportName]['pageNum'] = Math.ceil(vm.data[reportName].search_filter_reports.length / vm.data[reportName]['pageSize']);
            vm.data[reportName]['indexPage']=0;
            vm.data[reportName]['filterNum']= vm.data[reportName].search_filter_reports.size()
        };
        vm.selALL = function(check){
            for(var i=0;i<vm.filter.org_values.size();i++){
                vm.filter.org_values[i].enabled=check?true:false
            }
        };
        //==================实现排序==================//
        vm.orderByDict = function(type, column, order) {
            vm.data[type]['reports'] = searchUtil.orderByDict(vm.data[type]['reports'], column, order);
            vm.data[type]['curReports'] = vm.data[type]['reports'].slice(vm.data[type]['indexPage']*vm.data[type]['pageSize'],
                    vm.data[type]['indexPage']*vm.data[type]['pageSize']+vm.data[type]['pageSize']);
        };
        vm.orderByNumber = function(type, column, order) {
            vm.data[type]['reports'] = searchUtil.orderByNumber(vm.data[type]['reports'], column, order);
            vm.data[type]['curReports'] = vm.data[type]['reports'].slice(vm.data[type]['indexPage']*vm.data[type]['pageSize'],
                    vm.data[type]['indexPage']*vm.data[type]['pageSize']+vm.data[type]['pageSize']);
        };

        /***********************************新建工作包**********************************/
        vm.buttonActionRouter = function (op) {
            var data = vm.selectedPlan;
            if (data) {
                var addAtSameLevel = false;
                if (data.leaf && data.isTask == false)
                    addAtSameLevel = true;
                else if (data.leaf == false && data.isTask == false)
                    addAtSameLevel = false;
                else
                    return;

                switch (op) {
                    case 'NewPackageDir':
                        window.location.href = "#!/am/plan/新工作包目录/new/#" +
                        "projectId=" + data.projectId +
                        "&projectName=" + data.projectName +
                        "&planCreatorId=" + data.planCreatorId +
                        "&planControllerId=" + data.planControllerId +
                        "&planController=" + data.planController +
                        "&planAuditorId=" + data.planAuditorId +
                        "&parentKey=" + (addAtSameLevel ? data.parentKey : data.planKey) +
                        "&parentPlanCode=" + (addAtSameLevel ? data.parentPlanCode : data.planCode) +
                        "&level=" + (data.level + 1) +
                        "&leaf=0";
                        break;
                    case 'NewPackage':
                        window.location.href = "#!/am/plan/新工作包/new/#" +
                        "projectId=" + data.projectId +
                        "&projectName=" + data.projectName +
                        "&planAuditorId=" + data.planAuditorId +
                        "&planCreatorId=" + data.planControllerId +
                        "&parentPlanCode=" + (addAtSameLevel ? data.parentPlanCode : data.planCode) +
                        "&parentKey=" + (addAtSameLevel ? data.parentKey : data.planKey) +
                        "&level=" + (data.level + 1) +
                        "&leaf=1";
                        break;
                }
            }
        }
    });

    function formatWaitings(data){
        //初始化计划任务
        var level = new Array(10)//定义层数为10的wbs
        for(var i=0;i<level.length;i++)
            level[i]=1
        var baseSpace = "&nbsp;&nbsp;&nbsp;&nbsp;";
        var d = new Date();
        var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        for(var u=0;u<data.length; u++) {
            data[u].planFinishDate = data[u].planFinishDate.split(" ")[0];
            data[u].planStartDate = data[u].planStartDate.split(" ")[0];
            data[u].planDeadlineDate = data[u].planDeadlineDate.split(" ")[0];
            data[u].planIssuedDate = data[u].planIssuedDate.split(" ")[0];
            data[u].text = false;
            data[u].visible = true;
            //=================设置状态================//
            data[u].planState = data[u].planStateCode;
            sessionUtil.amSetState('plan',data[u])
        }
        return data
    }
    function formatPlanChange(data){
        data.forEach(function(el){
            el.visible = true;
            el.planState = el.planStateCode;
            sessionUtil.amSetState('plan', el);
            if(el.planStartDate != undefined) {
                el.planStartDate = el.planStartDate.split(" ")[0]
            }
            if(el.planFinishDate != undefined) {
                el.planFinishDate = el.planFinishDate.split(" ")[0]
            }
        })
    }
    function formatPlanPackage(data){
        //初始化计划任务
        var level = new Array(10)//定义层数为10的wbs
        for(var i=0;i<level.length;i++)
            level[i]=1
        var baseSpace = "&nbsp;&nbsp;&nbsp;&nbsp;";
        var d = new Date();
        var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        for(var u=0;u<data.length; u++) {
            data[u].planFinishDate = data[u].planFinishDate.split(" ")[0];
            data[u].planStartDate = data[u].planStartDate.split(" ")[0];
            data[u].planDeadlineDate = data[u].planDeadlineDate.split(" ")[0];
            data[u].planIssuedDate = data[u].planIssuedDate.split(" ")[0];
            data[u].text = false;
            data[u].visible = true;
            //=================设置状态================//
            data[u].planState = data[u].planStateCode;
            sessionUtil.amSetState('plan', data[u]);
            //=================对计划进行层级处理================//
            var spaceSize = parseInt(data[u].planCode.split(" ")[0]);
            data[u].space = "";
            for(var i=0;i<spaceSize;i++) {
                data[u].space += baseSpace
            }
            data[u].planCode.split(" ")[1] == undefined ? null : data[u].planCode = data[u].planCode.split(" ")[1];
            /*//获取wbs
            data[u].wbs = ""
            for(var i=0;i<data[u].level;i++){
                i!=data[u].level-1?data[u].wbs += (level[i]+"."):data[u].wbs+= level[i]
            }
            if(u+1<data.length){
                if(data[u+1].level == data[u].level)//如果下一个数据和当前数据在同一层，该层的数值加一
                    level[data[u+1].level-1]++
                else if(data[u+1].level < data[u].level) {//如果下一层的数据层级小于当前层级，将比下一层级高的数值置为1
                    for (var i = data[u+1].level; i < data[u].level;i++){
                        level[i]=1
                    }
                    level[data[u+1].level-1]++
                }
            }*/
            //判别类型
            if(data[u].isTask==true){
                data[u].type = "任务"
            }else if(data[u].leaf==true){
                data[u].type = "工作包"
            }else{
                data[u].type = "计划"
            }
            data[u].visible = true;
            //调整图片显示
            if(data[u].isTask || data[u].leaf)
                data[u].imgSrc = "";
            else {
                if(u+1<data.length){
                    if(data[u+1].level>data[u].level)
                        data[u].imgSrc = "img/planShrink.png";
                    else data[u].imgSrc = ""
                }else{
                    data[u].imgSrc = ""
                }
            }
        }
        return data
    }

    planSummaryVM.init = function(){
        //===================== 初始化数据 ===================//
        usrId = login.loginId;
        var planManagementToShow = {'planList': true, 'taskList': true, 'planWaitingList': true};
        for(var i=0;i<planSummaryMode.modeViewKey.length;i++){
            var key = planSummaryMode.modeViewKey[i];
            if(planManagementToShow[key]==undefined){
                planSummaryMode.modeView[key] = false
            }else planSummaryMode.modeView[key] = true
        }
        //数据清零
        sessionUtil.amRefresh(planSummaryMode);
        var usrId = login.loginId;
        //======================= 初始化侧边栏颜色 ========================//
        if(planSummaryMode.modeCur != -1) {
            planSummaryMode.siderBar[planSummaryMode.modeCur]['color'] = ''
        }
        //======================= 初始化模式 ========================//
        var siderBar = planSummaryMode.siderBar;
        var mode = planSummaryMode.mode;
        planSummaryMode.modeCur = -1;
        for(var i=0;i<siderBar.length;i++){
            mode[siderBar[i].mode] = i
        }
        var modeViewTemplate = {
            planList:true,
            planning:false,
            taskList:true,
            planWaitingList:true,
            planWaitingReleaseList:false,
            planChangeApplyList:false,
            planChangeApproveList:false,
            planChangeApprovedList:false
        };
        for(var key in modeViewTemplate){
            planSummaryMode.modeView[key] = modeViewTemplate[key]
        }
        //======================= 获取项目 ========================//
        sessionUtil.getProjects(usrId,function(data){
            var proGrids = [];
            var selectedProName = "";
            planSummaryMode.data['project']['reports'].forEach(function(el){
                if(el.text == true){
                    selectedProName = el.projectName
                }
            });
            //---------- 获取数据 ----------//
            if(data=="[]") {
                sessionUtil.getProjectsByProName(usrId, function (data) {
                    proGrids = eval('('+ data +')');
                });
            }
            else{
                proGrids = eval('('+ data +')');
            }
            //---------- 格式化数据  ----------//
            for(var u in proGrids){
                if(proGrids[u].projectName == selectedProName){
                    proGrids[u].text = true
                }else {
                    proGrids[u].text = false;
                }
            }
            //添加‘全部’
            var tmp = {};
            if(planSummaryMode.data['plan']['reports'].length == 0) {
                tmp = {'text': true, 'projectName': '全部'}
            }else{
                tmp = {'text': false, 'projectName': '全部'}
            }
            proGrids.push(tmp);
            planSummaryMode.data['project']['reports'] = proGrids;
            //设置项目分页
            var pageSize = planSummaryMode.data['project']['pageSize'];
            planSummaryMode.data['project']['curReports'] = proGrids.slice(0, pageSize);
            planSummaryMode.data['project']['pageNum'] = Math.ceil(proGrids.length / pageSize)
            //=======================获取待分解工作包和待反馈任务===================//
            var tmpPWRary = []
            var tmpTWFary = []
            var tmpALLPro = []
            var pAcc = 0
            planSummaryMode.data['packageWaitingDecompose']['allReports']["全部"] = []
            planSummaryMode.data['taskWaitingFeedback']['allReports']["全部"] = []
            for(var i=0;i<planSummaryMode.data['project']['reports'].length;i++){
                sessionUtil.getAllPlansTasks(usrId,planSummaryMode.data['project']['reports'][i].projectName,function(data){
                    var projectName = ""
                    if(data.length>0){
                        projectName = data[0].projectName
                    }else projectName = "全部"
                    data = formatPlanPackage(data);
                    //分离计划和任务
                    var pdata = [];
                    var tdata = [];
                    var packageCode2value = []
                    var tPackage = []
                    data.forEach(function(el){
                        if(el.isTask){
                            tdata.push(el)
                            /*提取工作包中的任务*/
                            if(planSummaryMode.package[el.parentPlanCode]==undefined){
                             planSummaryMode.package[el.parentPlanCode] = []
                             }
                            planSummaryMode.package[el.parentPlanCode].push(el)
                        }else{
                            pdata.push(el)
                            if(el.leaf){
                                packageCode2value[el.planCode] = el
                            }
                        }
                    });
                    /*获取排好序的工作包目录和工作包*/
                    var sortedPdata = []
                    var wbsToRecords = {}
                    for(var i=0;i<pdata.length;i++){
                        wbsToRecords[pdata[i].wbs] = pdata[i]
                    }
                    var cur = "1"
                    var limitAcc = pdata.length*3
                    while(sortedPdata.length!=pdata.length && limitAcc>0){
                        if(wbsToRecords[cur]!=undefined) {
                            sortedPdata.push(wbsToRecords[cur])
                            cur = cur +  ".1"
                        }else{
                            cur = cur.substr(0,cur.lastIndexOf("."))
                            var lpp = cur.lastIndexOf(".")
                            var index = parseInt(cur.substr(lpp+1,cur.length - lpp - 1))+1
                            cur = cur.substr(0,lpp)
                            cur = cur + "." + index.toString()
                        }
                        limitAcc--
                    }

                    /*获取待分解工作包*/
                    //获取有序的工作包序列
                    sortedPdata.forEach(function(el){
                        if(el.leaf){
                            tPackage.push(el)
                        }
                    })
                    var pwDecomp = []
                    tPackage.forEach(function(el){
                        if (planSummaryMode.package[el.planCode] == undefined) {
                            pwDecomp.push(packageCode2value[el.planCode])
                        }
                    })
                    tmpPWRary = tmpPWRary.concat(pwDecomp)
                    planSummaryMode.data['packageWaitingDecompose']['allReports'][projectName] = {}
                    planSummaryMode.data['packageWaitingDecompose']['allReports'][projectName] = pwDecomp
                    /*获取待反馈任务*/
                    var twFeedback = []
                    tdata.forEach(function(el){
                        if(el.planStateCode==3){
                            twFeedback.push(el)
                        }
                    })
                    tmpTWFary.concat(twFeedback)
                    planSummaryMode.data['taskWaitingFeedback']['allReports'][projectName] = {}
                    planSummaryMode.data['taskWaitingFeedback']['allReports'][projectName] = twFeedback
                    /*获取项目名称到项目的映射*/
                    tmpALLPro.concat(data)
                    planSummaryMode.data['project']['projectName2Project'][projectName] = data
                    pAcc++
                    if(pAcc == planSummaryMode.data['project']['reports'].length){
                        //获取“全部”项目
                        planSummaryMode.data['project']['projectName2Project']["全部"] = tmpALLPro
                        //待分解工作包分页设置
                        planSummaryMode.data['packageWaitingDecompose']['allReports']["全部"] = tmpPWRary
                        planSummaryMode.data['packageWaitingDecompose']['reports'] = tmpPWRary
                        planSummaryMode.data['packageWaitingDecompose']['search_filter_reports'] = tmpPWRary
                        planSummaryMode.data['packageWaitingDecompose']['curReports'] = tmpPWRary.slice(0, planSummaryMode.data['packageWaitingDecompose']['pageSize']);
                        planSummaryMode.data['packageWaitingDecompose']['pageNum'] = Math.ceil(tmpPWRary.length / planSummaryMode.data['packageWaitingDecompose']['pageSize']);
                        //待反馈任务分页设置
                        planSummaryMode.data['taskWaitingFeedback']['allReports']["全部"] = tmpTWFary
                        planSummaryMode.data['taskWaitingFeedback']['reports'] = tmpTWFary
                        planSummaryMode.data['taskWaitingFeedback']['search_filter_reports'] = tmpTWFary
                        planSummaryMode.data['taskWaitingFeedback']['curReports'] = tmpTWFary.slice(0, planSummaryMode.data['taskWaitingFeedback']['pageSize']);
                        planSummaryMode.data['taskWaitingFeedback']['pageNum'] = Math.ceil(tmpTWFary.length / planSummaryMode.data['taskWaitingFeedback']['pageSize']);
                    }
                });
            }
        });
        //===================获取待办事项====================//
        sessionUtil.getUsrPlanOpt(usrId,function(opt){
            var ss = opt.split(" ");
            var opts = [];
            ss.forEach(function(el){
                opts.push(eval('('+el+')'))
            });
            sessionUtil.getWaitingTask(usrId,function(data){
                //设置表头属性
                var paraOpt = {
                    opt:{},
                    title:[],
                    e2c:planSummaryMode.e2c,
                    defaultOpt:planSummaryMode.titleOptDefault,
                    sum:0
                };
                //设置合法化参数
                var isLegalPara = {
                    title:[],
                    threshold:planSummaryMode.threshold,
                    sum:0
                };
                //重置表头属性
                var count = 0;
                for(var key in planSummaryMode.title){
                    if (key.indexOf('Title') == -1) continue;
                    planSummaryMode.title[key] = [];
                    paraOpt.opt = opts[count++]//在此按照固定顺序进行赋值(plan，task，planWaiting)
                    paraOpt.title = planSummaryMode.title[key];
                    paraOpt.sum = 0;
                    //格式化表头数据
                    sessionUtil.formatUsrOpt(paraOpt);
                    //判断标题是否合法，若不合法进行重新设置
                    isLegalPara.title = planSummaryMode.title[key];
                    isLegalPara.sum = paraOpt.sum;
                    var titleNum = sessionUtil.isLegalOrSetOpt(isLegalPara);
                    if(key == "planTitle"){
                        planSummaryMode.planTitleNum = titleNum
                    }
                };
                //处理待办数据
                data = formatWaitings(data);
                planSummaryMode.data['planWaiting']['reports'] = data;
                planSummaryMode.data['planWaiting']['search_filter_reports'] = data;
                //设置待办事项分页
                planSummaryMode.data['planWaiting']['pageSize'] = 5;
                planSummaryMode.data['planWaiting']['curReports'] = data.slice(0, 5);
                planSummaryMode.data['planWaiting']['pageNum'] = Math.ceil(data.length / 5);
                //获取待发布项
                data.forEach(function(ele){
                    if(ele.state == "未发布"){
                        planSummaryMode.data['planWaitingRelease']['reports'].push(ele)
                    }
                });
                //获取每个项目的待发布项
                planSummaryMode.data['planWaitingRelease']['reports'].forEach(function(el){
                    if(planSummaryMode.data['planWaitingRelease']['allReports'][el.projectName]==undefined){
                        planSummaryMode.data['planWaitingRelease']['allReports'][el.projectName] = []
                    }
                    planSummaryMode.data['planWaitingRelease']['allReports'][el.projectName].push(el)
                })
                planSummaryMode.data['planWaitingRelease']['search_filter_reports'] = planSummaryMode.data['planWaitingRelease']['reports'];
                planSummaryMode.data['planWaitingRelease']['will2Release'] = {}
                w2 = planSummaryMode.data['planWaitingRelease']['will2Release']
                for(var key in w2){
                    delete w2[key]
                }
                //待发布项分页设置
                planSummaryMode.data['planWaitingRelease']['pageSize'] = 10;
                planSummaryMode.data['planWaitingRelease']['curReports'] = planSummaryMode.data['planWaitingRelease']['reports'].slice(0, 10);
                planSummaryMode.data['planWaitingRelease']['pageNum'] = Math.ceil(planSummaryMode.data['planWaitingRelease']['reports'].length / 10)
            })
        });
        //===================获取我的变更申请====================//
        sessionUtil.getPlansWithApply("getApply",usrId,function(data){
            formatPlanChange(data);
            planSummaryMode.data['planChangeApply']['reports'] = data;
            //获取每个项目的“我的变更申请”
            data.forEach(function(el){
                if(planSummaryMode.data['planChangeApply']['allReports'][el.projectName]==undefined){
                    planSummaryMode.data['planChangeApply']['allReports'][el.projectName] = []
                }
                planSummaryMode.data['planChangeApply']['allReports'][el.projectName].push(el)
            })
            planSummaryMode.radio['planChangeApply'] = data.length;
            //设置分页
            planSummaryMode.data['planChangeApply']['curReports'] = data.slice(0, 10);
            planSummaryMode.data['planChangeApply']['pageNum'] = Math.ceil(data.length / 10)
        });
        //===================  获取变更审批  ====================//
        sessionUtil.getPlansWithApply("getApplyToAudit",usrId,function(data){
            formatPlanChange(data);
            planSummaryMode.data['planChangeApprove']['reports'] = data;
            //获取每个项目的“变更审批”
            data.forEach(function(el){
                if(planSummaryMode.data['planChangeApprove']['allReports'][el.projectName]==undefined){
                    planSummaryMode.data['planChangeApprove']['allReports'][el.projectName] = []
                }
                planSummaryMode.data['planChangeApprove']['allReports'][el.projectName].push(el)
            })
            planSummaryMode.radio['planChangeApprove'] = data.length;
            //设置分页
            planSummaryMode.data['planChangeApprove']['curReports'] = data.slice(0, 10);
            planSummaryMode.data['planChangeApprove']['pageNum'] = Math.ceil(data.length / 10)
        });
        //===================获取已批准的变更====================//
        sessionUtil.getPlansWithApply("getApplyAudited",usrId,function(data){
            formatPlanChange(data);
            planSummaryMode.data['planChangeApproved']['reports'] = data;
            //获取每个项目的“已批准的变更”
            data.forEach(function(el){
                if(planSummaryMode.data['planChangeApproved']['allReports'][el.projectName]==undefined){
                    planSummaryMode.data['planChangeApproved']['allReports'][el.projectName] = []
                }
                planSummaryMode.data['planChangeApproved']['allReports'][el.projectName].push(el)
            })
            planSummaryMode.radio['planChangeApproved'] = data.length;
            //设置分页
            planSummaryMode.data['planChangeApproved']['curReports'] = data.slice(0, 10);
            planSummaryMode.data['planChangeApproved']['pageNum'] = Math.ceil(data.length / 10)
        });
        //=======================设置主计划导入导出权限========================//
        sessionUtil.getRoleByEmployee(login.loginId,function(roleInfo){
            //初始化权限信息
            var role_map = {};
            for(var i=0;i<roleInfo.length;i++){
                var val_proName = roleInfo[i].projectName;
                var val_roleId = roleInfo[i].roleId;
                if(val_roleId=="3"){
                    planSummaryMode.importView = true;
                }
            }
        });
        planSummaryMode.siderBar[2].color = planSummaryMode.importView?'':'#999999';
        // Animation after page loading
        setTimeout(function() {
            $('.panel').slideDown( "slow" );
        }, 500);
        $('#exportPro').modal("hide");
        return true;
//        avalon.scan();
    };
    $('#exportPro').on('hidden.bs.modal', function () {
        $('#exportPro').click();
    });
    avalon.mix(planSummaryVM,{psMode:planSummaryMode});
    return planSummaryVM;
    });