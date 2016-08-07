/**
 * Created by rtio on 2014/11/13.
 */
define(['jquery'],function($){
    var sessionUtil = {};

    /*===========================privilege session================================================*/
    sessionUtil.getRoleByEmployee = function(employeeID,callback){
        $.post(
            'am/getRoleByEmployee',
            {employeeId:employeeID},
            function(data){
                callback(data)
            }
        )
    }
    /*===========================homePage session================================================*/
    sessionUtil.getMessage = function(employeeID,callback){
        $.post(
            'am/getMessage',
            {employeeId:employeeID},
            function(data){
                callback(data)
            }
        )
    };
    sessionUtil.getRemind = function(employeeID,callback){
        $.post(
            'am/getRemind',
            {employeeId:employeeID},
            function(data){
                callback(data)
            }
        )
    };
    sessionUtil.deleteMessage = function(messageIds,callback){
        $.post(
            'am/deleteMessage',
            {messageIds:messageIds},
            function(data){
                callback(data)
            }
        )
    }
    sessionUtil.addMessages = function(data,callback){
        $.post(
            'am/addMessages',
            {HttpMessage:JSON.stringify(data)},
            function(data){
                callback(data)
            }
        )
    }

    /*===========================plan session================================================*/
    sessionUtil.getTasks = function(planCode,projectName,callback){
        $.post(
            'am/getTasks',
            {planCode:planCode,projectName:projectName},
            function(data){
                callback(data)
            }
        )
    }
    sessionUtil.getPlan = function(planCode,projectId,callback){
        $.post(
            'am/getPlan',
            {planCode:planCode,projectId:projectId},
            function(data){
                callback(data)
            }
        )
    }
    sessionUtil.addTasks = function(data,callback){
        $.post(
            'am/addTasks',
            {HttpPlan:JSON.stringify(data)},
            function(data){
                callback(data)
            }
        )
    }
    sessionUtil.deleteTasks = function(taskIds,callback){
        $.post(
            'am/deleteTasks',
            {taskIds:taskIds},
            function(data){
                callback(data)
            }
        )
    }
    sessionUtil.getAllPlansTasks = function(employeeId,projectName,callback){
        $.post(
            'am/getAllPlansTasks',
            {employeeId:employeeId,projectName:projectName},
            function(data){
                callback(data)
            }
        )
    }
    sessionUtil.getWaitingTask = function(employeeId,callback){
        $.post(
            'am/getWaitingTasks',
            {employeeId:employeeId},
            function(data){
                callback(data)
            }
        )
    }
    sessionUtil.getUsrPlanOpt = function(employeeId,callback){
        $.post(
            'am/getUsrPlanOpt',
            {employeeId:employeeId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getPlansWithApply = function(checkType,employeeId,callback){
        $.post(
            'am/getPlansWithApply',
            {checkApplyType:checkType,employeeId:employeeId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.updatePlan = function(data){
        $.post(
            'am/updatePlan',
            {updatePlanData:JSON.stringify(data)},
            function(data){
            }
        )
    }
    /*===========================action session================================================*/
    sessionUtil.getUsrActions = function(employeeId,callback){
        $.post(
            'am/getUsrActions',
            {employeeId:employeeId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getUsrActionProjects = function(employeeId,callback){
        $.post(
            'am/getUsrActionProjects',
            {employeeId:employeeId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getUserProject = function(employeeId,callback){
        $.post(
            'am/getUserProject',
            {employeeId:employeeId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getUsrActionWaitings = function(employeeId,callback){
        $.post(
            'am/getUsrActionWaitings',
            {employeeId:employeeId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getProjectActions = function(projectId,callback){
        $.post(
            'am/getProjectActions',
            {projectId:projectId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getUsrActionOpt = function(employeeId,callback){
        $.post(
            'am/getUsrActionOpt',
            {employeeId:employeeId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.addAction = function(data,callback){
        $.post(
            'am/addAction',
            {HttpAction:JSON.stringify(data)},
            function(data){
                callback(data)
            }
        )
    }
    sessionUtil.deleteActions = function(actionIds,callback){
        $.post(
            'am/deleteActions',
            {actionIds:actionIds},
            function(data){
                callback(data)
            }
        )
    }
    sessionUtil.setActionDirState = function(data){
        var d = new Date();
        var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        for(var u=0;u<data.length;u++){
            data[u].actionFinishDate = data[u].actionFinishDate.split(" ")[0]
            data[u].actionStartDate = data[u].actionStartDate.split(" ")[0]
            data[u].actionDeadlineDate = data[u].actionDeadlineDate.split(" ")[0]
            data[u].text = false;
            data[u].visible = true;
            switch (data[u].actionState){
                case 0:
                    //新建
                    data[u].state = "新建";
                    break;
                case 1:
                    //未发布
                    data[u].state = "未发布";
                    break;
                case 2:
                    //已发布
                    data[u].state = "已发布";
                    break;
            }
            /*if (data[u].state == "已完成") {
                if(data[u].planFinishDate==""||data[u].planFinishDate==null||data[u].planFinishDate==undefined){
                    alert("内部错误！\n已完成任务的完成时间为空！")
                }else{
                    data[u].bg = "#00FF00";
                }
            } else if (sessionUtil.DateDiff(data[u].planDeadlineDate, now) > 3) {
                data[u].bg = "white";
            } else if (sessionUtil.DateDiff(data[u].planDeadlineDate, now) < 0) {//超期
                data[u].bg = "#ffaec9";//显示为红色
            } else {//快到期
                data[u].bg = "#ffff99";//显示为黄色
            }*/
        }
        return data
    }
    sessionUtil.setActionState = function(data){
        var d = new Date();
        var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        for(var u=0;u<data.length;u++){
            data[u].actionFinishDate = data[u].actionFinishDate.split(" ")[0]
            data[u].actionStartDate = data[u].actionStartDate.split(" ")[0]
            data[u].actionDeadlineDate = data[u].actionDeadlineDate.split(" ")[0]
            data[u].text = false;
            data[u].visible = true;
            switch (data[u].actionState){
                case 0:
                    //新建
                    data[u].state = "新建";
                    break;
                case 1:
                    //未发布
                    data[u].state = "未发布";
                    break;
                case 2:
                    //已发布
                    data[u].state = "执行中";
                    break;
                case 3:
                    //待行动项目录负责人审核
                    data[u].state = "执行中";
                    break;
                case 4:
                    //待行动项目录批准人批准
                    data[u].state = "执行中";
                    break;
                case 5:
                    //已发布
                    data[u].state = "已完成";
                    break;
            }
            if (data[u].state == "已完成") {
             if(data[u].actionFinishDate==""||data[u].actionFinishDate==null||data[u].actionFinishDate==undefined){
             alert("内部错误！\n已完成任务的完成时间为空！")
             }else{
                data[u].bg = "#00FF00";
             }
             } else if (sessionUtil.DateDiff(data[u].actionDeadlineDate, now) > 3) {
                data[u].bg = "white";
             } else if (sessionUtil.DateDiff(data[u].actionDeadlineDate, now) < 0) {//超期
                data[u].bg = "#ffaec9";//显示为红色
             } else {//快到期
                data[u].bg = "#ffff99";//显示为黄色
             }
        }
        return data
    }
    /*===========================system set session================================================*/
    sessionUtil.saveUsrOpt = function(employeeId,optionType,usrOpt,callback){
        $.post(
            'am/saveUsrOpt',
            {employeeId:employeeId,optionType:optionType,usrOpt:usrOpt},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.formatUsrOpt = function(parameters){
        for (var key in parameters.opt) {
            var tmpObj = {}
            tmpObj['key'] = key
            tmpObj['position'] = parameters.threshold
            if(parameters.e2c[key]!=undefined && parameters.e2c[key]!="") {//判断是否在显示选项中
                tmpObj['name'] = parameters.e2c[key]
                if((parameters.opt[key] != 0&&parameters.opt[key]!=undefined) || parameters.defaultOpt[key]) {
                    tmpObj['value'] = true
                    if(!parameters.defaultOpt[key]) {
                        tmpObj['position'] = parameters.sum
                        parameters.sum++
                    }
                }else tmpObj['value'] = false
                parameters.title.push(tmpObj)
            }
        }
    }
    sessionUtil.isLegalOrSetOpt = function(isLegalPara){
        var actionTitle = isLegalPara.title
        var actionWaitingTitle = isLegalPara.title
        /*if(isLegalPara.sum==0){
            for(var i=0;i<actionTitle.length&&i<isLegalPara.threshold;i++){
                actionTitle[i].value = true
                actionTitle[i].position = i
            }
        }else */
        if(isLegalPara.sum>isLegalPara.threshold){
            var tmpAcc = isLegalPara.sum
            for(var i=actionTitle.length-1;i>=0&&tmpAcc>isLegalPara.threshold;i--){
                if(actionTitle[i].value) {
                    actionTitle[i].value = false
                    actionTitle[i].position = isLegalPara.threshold
                    tmpAcc--
                }
            }
            return tmpAcc
        }
        return isLegalPara.sum
    }
    sessionUtil.amRefresh = function(vm){
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
        vm.taskTmpl = {}
        vm.capitalOption = 0;
        var initDataTable = false;
        vm.projectControllerName = '';//导入主计划是检测是否分配了项目负责人姓名
        vm.projectControllerId = '';//导入主计划是检测是否分配了项目负责人Id
        vm.planTitleNum = 0;//计划列表表头数量
        vm.movePlan = {};//记录要进行移动的计划或者工作包
        vm.selectedPlan = {};
        vm.selectedPackage = {};//任务查看时选中的工作包
        vm.modifyWBSPlans = [];//记录修改了WBS的plan
        vm.planSummaryTabName = ""
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

        var data = vm.data
        for(var key in data){
//            if(key == "plan") continue
            data[key]['reports'] = []
            data[key]['curReports'] = []
            data[key].original_reports = []
            data[key].task_reports = []
            data[key].action_reports = []
            data[key].search_filter_reports = []
            data[key].allReports = {}
            data[key]['pageNum'] = 0
            data[key]['indexPage'] = 0
            data[key].filted = false
            data[key]['filterNum'] = 0
        }
    }
    sessionUtil.refreshPsAs = function(t1,t2,ndata){
        /*
        * 刷新数据的操作：参数t1表示要操作的数据类型——是plan还是action，参数t2表示更新的类型——是delete操作还是update操作
        * ndata表示更新的数据
        * */
        require(['am.planSummary','am.actionSummary','ready!'],function(ps,as){
            if(t1!=undefined&&t1!=null&&t1!=""&&t2!=undefined&&t2!=null&&t2!=""){
                //================初始化设置=================//
                var fName = ''
                var ffName = ''
                var sName = ''
                var code = ''
                var data = []
                if(t1=="plan"){
                    fName = 'plan'
                    ffName = 'task_reports'
                    sName = 'task'
                    code = 'planCode'
                    data = ps.psMode.data
                }else if(t1=="action"){
                    fName = 'actionDir'
                    ffName = 'action_reports'
                    sName = 'action'
                    code = 'actionId'
                    data = as.asMode.data
                }
                //================更新数据=================//
                var tdata = data[fName][ffName]
                var ttdata = data[sName]['reports']
                var exitCode = 0
                for(var i=0;(i<tdata.length||i<ttdata.length)&&exitCode!=2;i++){
                    if(i<tdata.length&&tdata[i][code]==ndata[code]){
                        tdata.splice(i,1)
                        exitCode++
                    }
                    if(i<ttdata.length&&ttdata[i][code]==ndata[code]){
                        ttdata.splice(i,1)
                        exitCode++
                    }
                }
                if(t2=="update"){//如果是更新操作，将新数据加入
                    sessionUtil.amSetState(t1,ndata)
                    tdata.push(ndata)
                    ttdata.push(ndata)
                }
                //设置分页
                data[sName]['curReports'] = ttdata.slice(data[sName]['indexPage']*data[sName]['pageSize'],data[sName]['pageSize'])
                data[sName]['pageNum'] = Math.ceil(ttdata.length / data[sName]['pageSize'])
            }
        })
    }
    sessionUtil.amSetState = function(type,data){
        /*
        * 设置状态的函数，参数type表示要操作的数据类型——plan或是action，data表示要操作的数据
        * */
        if(type!=undefined&&type!=null&&type!=""){
            var d = new Date();
            var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
            data.visible = true
            if(type=="plan"){
                var completeCode = 0;
                if(!data.isTask&&!data.leaf){
                    switch(data.planState){
                        case 0:{data.state="新建";}break;
                        case 1:{data.state="未发布";}break;
                        case 2:{data.state="已发布";}break;
                        case 3:{data.state="等待项目经理审批(组长)";}break;
                        case 4:{data.state="等待项目领导审批(组长)";}break;
                        case 5:{data.state="等待项目领导审批(项目经理)";}break;
                        case 6:{data.state="已完成";}break;
                    }
                    completeCode = 6
                }else if(data.isTask){
                    switch(data.planState){
                        case 0:{data.state="新建";}break;
                        case 1:{data.state="未发布";}break;
                        case 2:{data.state="已发布";}break;
                        case 3:{data.state="执行中";}break;
                        case 4:{data.state="已完成";}break;
                    }
                    completeCode = 4
                }else{
                    switch(data.planState){
                        case 0:{data.state="新建";}break;
                        case 1:{data.state="未发布";}break;
                        case 2:{data.state="已发布";}break;
                        case 3:{data.state="已完成";}break;
                    }
                    completeCode = 3
                }
                if(data.planState==completeCode){//已完成
                    data.bg = "#00FF00"
                }else if(sessionUtil.DateDiff(data.planDeadlineDate,now)>3){//执行中
                    data.bg = "white";
                }else if(sessionUtil.DateDiff(data.planDeadlineDate,now)<0){//超期
                    data.bg = "#ffaec9";
                }else{//快到期
                    data.bg = "#ffff99";
                }
            }else if(type=='action'){
                var completeCode = 0;
                if(data.leaf){
                    switch(data.actionState){
                        case 0:{data.state="新建";}break;
                        case 1:{data.state="未发布";}break;
                        case 2:{data.state="执行中";}break;
                        case 3:{data.state="待行动项目录负责人审核";}break;
                        case 4:{data.state="待行动项目录批准人批准";}break;
                        case 5:{data.state="已完成";}break;
                    }
                    completeCode = 5
                }else{
                    switch(data.actionState){
                        case 0:{data.state="新建";}break;
                        case 1:{data.state="未发布";}break;
                        case 2:{data.state="已发布";}break;
                    }
                    completeCode = 3
                }
                if(data.actionState==completeCode){
                    data.bg = "#00FF00";
                }else if(sessionUtil.DateDiff(data.actionDeadlineDate,now)>3){
                    data.bg = "white";
                }else if(sessionUtil.DateDiff(data.actionDeadlineDate,now)<0){//超期
                    data.bg = "#ffaec9";
                }else{//快到期
                    data.bg = "#ffff99";
                }
            }
        }
    }

    /*=======================================plan session============================================*/
    sessionUtil.getAllProjects = function(callback){
        $.post(
            'am/getAllProjects',
            {},
            function(data){
                callback(data);
            }
        )
    };
    sessionUtil.getAllProject = function(callback){
        $.post(
            'am/getAllProject',
            {},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getProjectsCreatedByMe = function(callback){
        $.post(
            'am/getProjectsCreatedByMe',
            {},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.addOneProject = function(prj,callback){
        $.post(
            'am/addOneProject',
            prj,
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getProjects = function(employeeID,callback) {
        $.post(
            'am/getUsrProjects',
            {employeeId:employeeID},
            function(data) {
                callback(data);
            }
        );
    };
    sessionUtil.getProjectsByProName = function(employeeID,callback){
        $.post(
            'am/getUsrProjectsByProName',
            {employeeId:employeeID},
            function(data) {
                callback(data);
            }
        );
    };
    sessionUtil.getWProjects = function(employeeID,projectName,callback){
        $.post(
            'am/getUsrWPlans',
            {employeeId:employeeID,projectName:projectName},
            function(data){
                callback(data);
            }
        )
    };
    sessionUtil.getChildPlan = function(employeeId,projectId,planCode,callback){
        $.post(
            'am/getChildPlansByPC',
            {planCode:planCode,employeeId:employeeId,projectId:projectId},
            function(data){
                callback(data);
            }
        );
    };
    sessionUtil.getDrafts = function(employeeID,callback) {
        $.getJSON(
            'am/getPlanScripts',
            {employeeId:employeeID},
            function(data) {
            	var finalData=[]
            	avalon.each(data,function(i,value){
            		finalData.push(avalon.mix($.parseJSON(value.scriptContent),{scriptKey:value.scriptKey}))
            	})
                callback(finalData);
            }
        );
    };
    sessionUtil.getCAId = function(parentPlanCode,callback){
        $.post(
            'am/getCAId',
            {parentPlanCode:parentPlanCode},
            function(data){
                callback(data);
            }
        )
    };
    sessionUtil.getProTree = function(employeeID,projectID,callback){
        $.post(
            'am/getProTree',
            {employeeId:employeeID,projectName:projectID},
            function(data) {
                callback(data);
            }
        );
    };
    sessionUtil.getPrivilege = function(usrId,callback){
        $.post(
            'am/getUsrPrivilege',
            {employeeId:usrId},
            function(data){
                callback(data);
            }
        );
    };
    sessionUtil.getCreatorLevel = function(usrId,projectName,callback){
        $.post(
            'am/getCreatorLevel',
            {employeeId:usrId,projectName:projectName},
            function(data){
                callback(data);
            }
        )
    };
    sessionUtil.setDraftList = function(data){
        for(var i=0;i<data.length;i++){
            data[i].text = false;
            data[i].remark = "草稿";
            data[i].state = "新建";
            /*just for test*/
            data[i].visible = true;
        }
        avalon.vmodels["planSummary"].draftDGrid = data;
    };
    sessionUtil.setPlanAndPackageState = function(data){
        var d = new Date();
        var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        for(var u=0;u<data.length;u++){
            data.planFinishDate = data[u].planFinishDate.split(" ")[0]
            data[u].planStartDate = data[u].planStartDate.split(" ")[0]
            data[u].text = false;
            data[u].visible = true;
            data[u].planState = data[u].planStateCode
            sessionUtil.amSetState('plan',data[u])
            /*switch (data[u].planStateCode){
                case 0:
                    //新建
                    data[u].state = "执行中";
                    break;
                case 1:
                    //未发布
                    data[u].state = "执行中";
                    break;
                case 2:
                    //已发布
                    data[u].state = "执行中";
                    break;
                case 3:
                    //待项目经理审批
                    data[u].state = "执行中";
                    break;
                case 4:
                    //待部门领导审批
                    data[u].state = "执行中";
                    break;
                case 5:
                    data[u].state = "已完成";
                    break;
            }
            if (data[u].state == "已完成") {
                if(data[u].planFinishDate==""||data[u].planFinishDate==null||data[u].planFinishDate==undefined){
                    alert("内部错误！\n已完成任务的完成时间为空！")
                }else{
                    data[u].bg = "#00FF00";
                }
            } else if (sessionUtil.DateDiff(data[u].planDeadlineDate, now) > 3) {
                data[u].bg = "white";
            } else if (sessionUtil.DateDiff(data[u].planDeadlineDate, now) < 0) {//超期
                data[u].bg = "#ffaec9";//显示为红色
            } else {//快到期
                data[u].bg = "#ffff99";//显示为黄色
            }*/
        }
        return data
    }
    sessionUtil.setTaskState = function(data){
        var d = new Date();
        var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        for(var u=0;u<data.length;u++){
            data[u].remainingDuration = sessionUtil.DateDiff(data[u].planDeadlineDate,now)//初始化剩余时间
//            data[u].planStateCode = 0//初始化任务状态
            data[u].text = false;
            data[u].visible = true;
            data[u].planState = data[u].planStateCode
            sessionUtil.amSetState('plan',data[u])
        }
        return data;
    }
    /*===========================public function================================================*/
    sessionUtil.DateDiff = function(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式
        var  aDate,  oDate1,  oDate2,  iDays
        aDate  =  sDate1.split(" ")[0]
        aDate  =  aDate.split("-")
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
        aDate  =  sDate2.split(" ")[0]
        aDate  =  aDate.split("-")
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
        iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
        return  iDays
    }
    sessionUtil.refresh = function(type,VM,id){
        var data = VM.data
        //重排WBS
        var reports = data[type]['reports']
        var count=1
        reports.forEach(function(el){
            el.wbs = el.wbs.substr(0,el.wbs.length-1)+count
            count++
        })
        var oldSize = data[type]['curReports'].length
        data[type]['curReports'] = data[type]['reports'].slice(0,data[type]['pageSize'])
        data[type]['pageNum'] = Math.ceil(data[type]['reports'].length / data[type]['pageSize'])
        data[type]['indexPage'] = 0;
        var newSize = data[type]['curReports'].length
        if(newSize>oldSize){
            $("#"+id).css('height','auto').height()
        }
//        avalon.vmodels["planSummary"].data['task']['curReports']=avalon.vmodels["planSummary"].data['task']['curReports']
    }

    /*===========================project management session================================================*/
    sessionUtil.getPrjList=function(userId){
        $.post(
            'am/getPrjList',
            {employeeId:userId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getEmpList=function(callback){
        $.post(
            'am/getEmpList',
            {},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getGrpMembers=function(grpId,callback){
        $.post(
            'am/getRoleByGroup',
            {groupId:grpId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.addFirstGrp=function(grp,callback){
        $.post(
            'am/addOneGroup',
            grp,
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.addGrpMember=function(member,callback){
        $.post(
            'am/addGrpMember',
            member,
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.delGmp=function(roleKey,callback){
        $.post(
            'am/deleteOneRole',
            {roleKey:roleKey},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.delGrp=function(grpId,callback){
        $.post(
            'am/deleteOneGroup',
            {groupId:grpId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.changeRole=function(roleKey,roleId,callback){
        $.post(
            'am/changeOneRole',
            {roleKey:roleKey,roleId:roleId},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.addOneNotice=function(obj,callback){
        $.post(
            'am/addOneNotice',
            obj,
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getNoticeByEmp=function(callback){
        $.post(
            'am/getOnesNotice',
            {},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.publishNotice=function(id,callback){
        $.post(
            'am/publishNotice',
            {id:id},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.recallNotice=function(id,callback){
        $.post(
            'am/recallNotice',
            {id:id},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.checkLogin=function(callback){
        $.post(
            'am/checkLogin',
            {},
            function(data){
                callback(data);
            }
        )
    }
    sessionUtil.getOneEmployee=function(callback){
        $.post(
            'am/getOneEmployee',
            {},
            function(data){
                callback(data);
            }
        )
    }

    sessionUtil.addOrModifyEmp=function(emp,type,callback){
        $.post(
            'am/addOrModifyEmp',
            {
                employeeNumber:emp.employeeNumber,
                employeeName:emp.employeeName,
                employeeEmail:emp.employeeEmail,
                departmentId:emp.departmentId,
                departmentName:emp.departmentName,
                loginPassword:emp.loginPassword,
                major:emp.major,
                type:type
            },
            function(data){
                callback(data);
            }
        )
    }

    sessionUtil.getAllDep=function(callback){
        $.post(
            'am/getAllDep',
            {},
            function(data){
                callback(data)
            }
        )
    }

    sessionUtil.addOrModifyDep=function(dep,callback){
        $.post(
            'am/addOrModifyDep',
            {
                id:dep.id,
                name:dep.name,
                type:dep.type,
            },
            function(data){
                callback(data)
            }
        )
    }

    sessionUtil.deleteDep=function(id,callback){
        $.post(
            'am/deleteOneDep',
            {
                id:id,
            },
            function(data){
                callback(data)
            }
        )
    }

    sessionUtil.checkAuth=function(empId,prjId,action,callback){
        $.post(
            'am/authAssert',
            {
                empId:empId,
                prjId:prjId,
                action:action,
            },
            function(data){
                callback(data)
            }
        )
    }
    return sessionUtil
})