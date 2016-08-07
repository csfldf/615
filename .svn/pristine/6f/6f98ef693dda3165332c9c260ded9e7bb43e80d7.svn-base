/**
 * Created by rtio on 2015/5/19.
 */
define(['jquery','am.sessionUtil','Login','am.amCommonFunc','am.cookie','utils','selector','UIMainFrame','am.planSummary',
        'datatables.bootstrap','datatables','bootstrap','ready!'],
    function($,sessionUtil,login,commonFunc,amCookie,utils,select,main,ps){
    var taskDecomposeVM =window['taskDecompose']= {}
    var taskPackages = {}
    var packetId = ""

    var funcSharer = (function () {
        var vm,
            publicMethods = {
                setPages:function(){
                    vm.pageSize = parseInt($("#select-task").val());
                    vm.curTaskReport   = vm.taskReport.slice(0, vm.pageSize);
                    vm.pagesTask = Math.ceil(vm.taskReport.length / vm.pageSize);
                    vm.indexTaskReportPage = 0;
                    $("#decomposeTask").css('height','auto').height();
                },
                addTask:function(){
                    //对新添加的任务进行深拷贝
                    var tmpTask = new Object()
                    for(var tmp in vm.taskPackage)
                        tmpTask[tmp] = vm.taskPackage[tmp]
                    vm.taskReport.push(tmpTask);
                    //配置新任务的属性
                    var d = new Date();
                    var year = d.getFullYear()
                    var month = (d.getMonth()+1)<10?"0"+(d.getMonth()+1): d.getMonth()+1
                    var date = (d.getDate()+1)<10?"0"+(d.getDate()): d.getDate()
                    var now = year+"-"+month+"-"+date;//当前时间
                    var newTask = vm.taskReport[vm.taskReport.length-1]
                    //======================初始化新任务=====================//
                    newTask.level++
                    newTask.parentPlanCode = vm.taskPackage.planCode
                    newTask.parentKey = newTask.planKey
                    newTask.planCode = "task"+Date.now()
                    newTask.planStartDate = now//将任务的实际开始时间设置为当前时间
                    newTask.planIssuedDate = now
                    newTask.planDeadlineDate = ""
                    newTask.planFinishDate = ""
                    newTask.planController = ""
                    newTask.planControllerId = ""
                    newTask.planAuditorId = vm.taskPackage.planControllerId
                    newTask.planCreator = ""
                    newTask.planCreatorId = login.loginId
                    newTask.planStateCode = 2
                    newTask.deleteMark = 0
                    newTask.isAdd = true    //标记任务是否是新添加的,即是分解之前没有的
                    newTask.isTask = 1
                    newTask.wbs = newTask.wbs+".x"
                    //重新初始化表格
                    var height = 0;
                    vm.pagesTask = Math.ceil(vm.taskReport.length / vm.pageSize);
                    if(vm.indexTaskReportPage+1!=vm.pagesTask) {
                        height = $("#decomposeTask").height();
                        $("#decomposeTask").height(height)
                    }
                    vm.indexTaskReportPage = vm.pagesTask-1
                    vm.curTaskReport = vm.taskReport.slice(vm.indexTaskReportPage*vm.pageSize, vm.indexTaskReportPage*vm.pageSize+vm.pageSize);
                    //将要写入数据库的新任务加入write2DBTasks中
                    vm.write2DBTasks.push(newTask)
                },
                deleteTask:function(task){
                    var index = 0;
                    var flag = true;
                    //将数据删除更新到planSummary的task
                    for(var i=0;i<vm.taskReport.length && flag;i++){
                        if(vm.taskReport[i].planCode==task.planCode){
                            flag=false;
                            index  = i;
                        }
                    }
                    vm.taskReport.splice(index,1);
                    //重新初始化表格
                    vm.pagesTask = Math.ceil(vm.taskReport.length / vm.pageSize);
                    vm.curTaskReport = vm.taskReport.slice(vm.indexTaskReportPage*vm.pageSize, vm.indexTaskReportPage*vm.pageSize+vm.pageSize);

                    vm.deletedPages += (vm.deletedPages.length == 0 ? task.planCode : ("," + task.planCode));
                    vm.deleteTaskAcc++

                    //将删除的任务从上传到数据库的数据中剔除
                    for(var i=0;i<vm.write2DBTasks.length;i++){
                        if(vm.write2DBTasks[i].planCode==task.planCode){
                            vm.write2DBTasks.splice(i,1)
                            i=vm.write2DBTasks.length
                        }
                    }
                },
                releaseTask:function(){//任务发布
                    var totalTaskWeight = 0
                    var flag = true
                    //合法性检查
                    for(var i=0;i<vm.taskReport.length && flag;i++){
                        if(vm.taskReport[i].planIssuedDate=="" || vm.taskReport[i].planDeadlineDate==""){
                            flag = false
                            alert("有未设置开始或结束日期的任务，请仔细检查！！！")
                            return
                        }
                        if(vm.taskReport[i].planController=="" || vm.taskReport[i].planControllerId==""){
                            flag = false
                            alert("每一任务必须有一个明确的负责人，请仔细检查！！！")
                            return
                        }
                        totalTaskWeight += parseInt(vm.taskReport[i].taskWeight)
                    }
                    if(totalTaskWeight!=100&&vm.write2DBTasks.length!=0){
                        alert("所有子任务的权重之和必须为100,请仔细检查！！！")
                        return
                        flag = false
                    }
                    if(flag){
                        var isShowInfo = false
                        //======================数据初始化========================//
                        var taskReports = avalon.vmodels["planSummary"].data['task']['reports']
                        var planTaskReports = avalon.vmodels["planSummary"].data['plan']['task_reports']
                        vm.write2DBTasks = sessionUtil.setTaskState(vm.write2DBTasks)
                        //删除任务
                        var delTasks = vm.deletedPages.split(",")
                        var delTasks_map = new Object()
                        delTasks.forEach(function(el){
                            delTasks_map[el]=1;
                        })
                        for(var i=0;i<planTaskReports.length;i++){
                            if(delTasks_map[planTaskReports[i].planCode]==1){
                                planTaskReports.splice(i,1)
                                i--
                            }
                        }
                        //=======================从数据库中删除任务======================//
                        sessionUtil.deleteTasks(vm.deletedPages, function (data) {
                            if(!isShowInfo){
                                isShowInfo = true
                                alert("任务提交成功！！！")
                            }
                        })
                        vm.deletedPages = ""
                        vm.deleteTaskAcc = 0
                        /*添加任务*/
                        //=======================更新planSummary中plan的task_reports中的数据======================//
                        for(var i=0;i<vm.write2DBTasks.length;i++){
                            if(vm.write2DBTasks[i].isAdd==true){//如果是新添加的任务,则直接加入
                                planTaskReports.push(vm.write2DBTasks[i])
                            }else {//如果不是，则先将原来的删除，再加入
                                for (var j = 0; j < planTaskReports.length; j++) {
                                    if(planTaskReports[j].planCode==vm.write2DBTasks[i].planCode){
                                        planTaskReports.splice(j,1)
                                        planTaskReports.push(vm.write2DBTasks[i])
                                        j = planTaskReports.length
                                    }
                                }
                            }
                        }
                        //==================是否将任务添加到planSummary的task中=================//
                        var count=1
                        vm.taskReport.forEach(function(el){//更新WBS
                            el.wbs = el.wbs.substr(0,el.wbs.length-1)+count
                            count++
                        })
                        if(ps.psMode.showPacketId!=""&&ps.psMode.showPacketId==packetId){
                            avalon.vmodels["planSummary"].data['task']['reports'] = vm.taskReport
                            //刷新数据
                            sessionUtil.refresh('task',ps.psMode,'accordion-element-taskList')
                        }
                        //================将任务提交到数据库=================//
                        var count=vm.write2DBTasks.length
                        for(var i=0;i<vm.write2DBTasks.length;i++) {
                            sessionUtil.addTasks(vm.write2DBTasks[i],function(data){
                                count--
                                if(count==0&&!isShowInfo){
                                    isShowInfo = true
                                    alert("任务提交成功！！！")
                                }
                            })
                            //将任务添加到通知
                            var tmp = new Object();
                            tmp.MessageType = "任务通知"
                            tmp.MessageContent = vm.write2DBTasks[i].taskContent
                            tmp.MessageSource = vm.write2DBTasks[i].projectName
                            var d = new Date();
                            var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                            tmp.MessageDate = now;
                            tmp.employeeId = vm.write2DBTasks[i].planControllerId
                            sessionUtil.addMessages(tmp,function(data){//添加通知
                            })
                            vm.write2DBTasks.splice(i,1)
                            i--
                        }
                    }
                },
                dateLegalityJudge:function(type,el){
                    if(el.planIssuedDate!="" && el.planDeadlineDate!="") {
                        if(sessionUtil.DateDiff(el.planIssuedDate,vm.taskPackage.planIssuedDate)<0){
                            alert("输入的日期不合法!!!\n任务的开始日期不能早于工作包开始日期!!!")
                            el[type] = ""
                            vm.curTaskReport = vm.curTaskReport
                            return
                        }
                        if(sessionUtil.DateDiff(el.planIssuedDate,vm.taskPackage.planDeadlineDate)>=0){
                            alert("输入的日期不合法!!!\n任务开始日期不能晚于等于工作包截止日期!!!")
                            el[type] = ""
                            vm.curTaskReport = vm.curTaskReport
                            return
                        }
                        if(sessionUtil.DateDiff(el.planDeadlineDate,vm.taskPackage.planDeadlineDate)>0){
                            alert("输入的日期不合法!!!\n任务的截止日期不能晚于工作包截止日期!!!")
                            el[type] = ""
                            vm.curTaskReport = vm.curTaskReport
                            return
                        }
                        if(sessionUtil.DateDiff(el.planDeadlineDate,vm.taskPackage.planIssuedDate) < 0){
                            alert("输入的日期不合法!!!\n任务截止日期不能早于等于工作包开始日期!!!")
                            el[type] = ""
                            vm.curTaskReport = vm.curTaskReport
                            return
                        }
                        if (sessionUtil.DateDiff(el.planIssuedDate, el.planDeadlineDate) >= 0){
                            alert("输入的日期不合法!!!\n任务开始日期不能晚于等于结束日期!!!")
                            el[type] = ""
                            vm.curTaskReport = vm.curTaskReport
                            return
                        }
                        //将修改过的任务添加到write2DBTasks中
                        el.planStartDate = el.planIssuedDate//将任务的实际开始时间设置为选定的时间
                        vm.addWrite2DBTask(el)

                    }
                },
                weightLegalityJudge:function(data){
                    var restWeight = 0
                    vm.taskReport.forEach(function(el){
                        if(el.taskWeight!=undefined&&el.taskWeight!=null&&!isNaN(el.taskWeight)&&el.taskWeight!="")
                            restWeight += parseInt(el.taskWeight)
                    })
                    if(restWeight > 100){
                        alert("子任务的权重之和不能超过100%！！！")
                        vm.totalWeight = restWeight - data.taskWeight
                        data.taskWeight = 0
                        vm.curTaskReport = vm.curTaskReport
                    }
                    else {//将修改过的任务添加到write2DBTasks中
                        vm.addWrite2DBTask(data)
                        vm.totalWeight = restWeight
                    }
                },
                taskContentLegalityJudge:function(task){
                    if(task.taskContent.length > 200){
                        alert("输入的任务内容不能超过200字！！！")
                        task.taskContent = task.taskContent.substr(0,200)
                        vm.curTaskReport = vm.curTaskReport
                    }
                    //将修改过的任务添加到write2DBTasks中
                    vm.addWrite2DBTask(task)
                },
                addWrite2DBTask:function(task){
                    var hasThisTask = false;
                    for (var i = 0; i < vm.write2DBTasks.length && !hasThisTask; i++) {
                        if (vm.write2DBTasks[i].planCode == task.planCode) {
                            hasThisTask = true
                        }
                    }
                    if (!hasThisTask) {
                        //存入的时候只进行浅拷贝
                        vm.write2DBTasks.push(task)
                    }
                },
                expandContent:function(id){
                    $("."+id).css('height','120px').height();
                    $("."+id).css('position','absolute').position();
                    $("."+id).css('z-index',9999);
                },
                shrinkContent:function(id){
                    $("."+id).css('height','20px').height()
                    $("."+id).css('position','').position()
                },
                initEmployeeSelector: function (modalSelector,data) {
                     vm.taskContainer = data
                     select.data['project']['id'] = vm.taskPackage.projectId
                     select.types['employeeSelectForTaskDecompose'].onSelect = function (row) {
                         avalon.log(row)
                         vm.taskContainer.planController = row.employeeName
                         vm.taskContainer.planControllerId = row.employeeNumber
                         vm.addWrite2DBTask(vm.taskContainer)
                         vm.curTaskReport = vm.curTaskReport//just for refresh the data
                     }
                     $(modalSelector).modal('show')
                     select.init('employeeSelectForTaskDecompose',null,vm.taskPackage)
                 },
                closeTaskDecomposeTab:function($event){
                    if(vm.write2DBTasks.length!=0){
                        var truthBeTold = window.confirm("有修改的任务，在提交之前是否确定要退出，若退出则所作修改将不会被保留！！！")
                        if(truthBeTold)
                            main.closeThisTab($event)
                    }else main.closeThisTab($event)
                },
                toPackageView:function(){
                    window.location.href = '#!/am/package/' + vm.packageId;
                },
                tmplLoaded: function (tmpl) {
                    avalon.log('正在修改report' + vm.$taskID + '模板');
                    tmpl = utils.tmpl.clearUselessHtml(tmpl);
                    tmpl = tmpl.replace(/(ms-important=")[\S]+(")/, 'ms-important="task' + vm.$taskID + '"');
//                    $("#taskDecompose").attr("ms-important","task"+vm.$taskID);
//                    var tmp = $("#taskDecompose").attr("ms-important");
                    return tmpl;
                },
                executeCallback: function (callbackName) {
                    var func = callbacks[callbackName]
                    if (avalon.type(func) == "function") {
                        avalon.log("execute Callback " + callbackName)
                        func(vm)
                    }
                }
            }

        var executer = function (localVM, methodName) {
            return function () {
                var methodCalled = publicMethods[methodName];
                if (methodCalled) {
                    vm = localVM;
                    return methodCalled.apply(vm, arguments);
                }
            }
        }
        executer.publicMethods=publicMethods;
        return executer;
    })()

    function _newVM(taskID,taskVMID) {
        var projectName = amCookie.cookie.get("projectName");
        /*sessionUtil.getPlan(taskID,projectName,function(data){
            task.taskPackage = data;
        })*/
        var task = taskPackages[taskVMID] = avalon.define("task"+taskVMID, function(vm) {
            vm.packageId = taskID
            vm.$taskID = taskVMID
            vm.taskReport =[]
            //要写入数据库的Tasks
            vm.write2DBTasks = []
            vm.write2DBMessages = []
            vm.planController = "zhaoyao"
            vm.totalWeight = 0
            //taskPackage;任务的一些属性来源于它们的工作包，将这些属性放在模板taskPackage中
            vm.taskPackage = {};
            // page index
            vm.indexTaskReportPage  = 0;
            //page subscript
            vm.curTaskReport = [];
            //page count
            vm.pagesTask = 0;
            //deleted pages
            vm.deletedPages=""
            vm.deleteTaskAcc=0
            //page Size
            vm.pageSize = 5;
            // increase page number
            vm.nextTaskReportPage = function() {
                if (vm.indexTaskReportPage+1 < vm.pagesTask) {
                    var height = $("#decomposeTask").height();
                    vm.indexTaskReportPage ++;
                    vm.curTaskReport = vm.taskReport.slice(vm.indexTaskReportPage*vm.pageSize, vm.indexTaskReportPage*vm.pageSize+vm.pageSize);
                    if(vm.indexTaskReportPage+1==vm.pagesTask){
                        $("#decomposeTask").height(height);
                    }
                }

            };
            vm.preTaskReportPage = function() {
                if (vm.indexTaskReportPage > 0) {
                    vm.indexTaskReportPage --;
                    vm.curTaskReport = vm.taskReport.slice(vm.indexTaskReportPage*vm.pageSize, vm.indexTaskReportPage*vm.pageSize+vm.pageSize);
                }
            };
            /*****************************实例公用函数*********************************/
            for(var key in funcSharer.publicMethods)
                vm[key]=funcSharer(vm, key);
            return vm;
        })
        //====================获取任务所在工作包==================//
        var flag = false
        var psData = ps.psMode.data['plan']['reports']
        for(var i=0;i<psData.length;i++){
            if(psData[i].planCode==taskID){
                flag = true
                task.taskPackage = psData[i]
                i=psData.length
            }
        }
        if(!flag){
            $.post(
                'am/get',
                {planCode:taskID},
                function(data){
                    task.taskPackage = data
                }
            )
        }
        //====================获取任务包中的任务==================//
        packetId = taskID
        var data = avalon.vmodels["planSummary"].data['plan']['task_reports']
        for(var i=0;i<data.length;i++){
            if(data[i].parentPlanCode==taskID) {
                //只保留日期中的年、月、日
                data[i].planIssuedDate = data[i].planIssuedDate.split(" ")[0]
                data[i].planDeadlineDate = data[i].planDeadlineDate.split(" ")[0]
                if (!data[i].leaf) {
                    data.splice(i, 1)
                    i--
                }
                task.totalWeight += parseInt(data[i].taskWeight)
                //对查看的任务进行深拷贝
                var nb = new Object()
                for(var key in data[i]){
                    nb[key] = data[i][key]
                }
                task.taskReport.push(nb);
            }
        }
        //设置分页
        task.curTaskReport   = task.taskReport.slice(0, task.pageSize);
        task.pagesTask = Math.ceil(task.taskReport.length / task.pageSize);
        // Animation after page loading
        setTimeout(function() {
            $('.panel').slideDown( "slow" );
        }, 500);
        return task;
    }
    taskDecomposeVM.openTask = function (taskID) {
        var newtaskID = taskID + '_at_' + Date.now()
        var taskVM = _newVM(taskID,newtaskID);
        return taskVM;
    }
//    avalon.scan();
    avalon.mix(taskDecomposeVM,{taskPackages:taskPackages})
    return taskDecomposeVM;
})