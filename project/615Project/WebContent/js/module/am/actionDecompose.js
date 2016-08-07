/**
 * Created by Administrator on 2015/7/12.
 */
/**
 * Created by rtio on 2015/5/19.
 */
define(['jquery','am.sessionUtil','Login','am.amCommonFunc','am.cookie','utils','selector','UIMainFrame','am.actionSummary',
        'datatables.bootstrap','datatables','bootstrap','ready!'],
    function($,sessionUtil,login,commonFunc,amCookie,utils,select,main,as){
        var actionDecomposeVM =window['actionDecompose']= {}
        var actionPackages = {}
        var actionDirId = ""

        var funcSharer = (function () {
            var vm,
                publicMethods = {
                    setPages:function(){
                        vm.pageSize = parseInt($("#select-action").val());
                        vm.curActionReport   = vm.actionReport.slice(0, vm.pageSize);
                        vm.pagesAction = Math.ceil(vm.actionReport.length / vm.pageSize);
                        vm.indexActionReportPage = 0;
                        $("#decomposeAction").css('height','auto').height();
                    },
                    addAction:function(){
                        //对新添加的行动项进行深拷贝
                        var tmpAction = new Object()
                        for(var tmp in vm.actionTmpl)
                            tmpAction[tmp] = vm.actionTmpl[tmp]
                        vm.actionReport.push(tmpAction);
                        //配置新行动项的属性
                        var d = new Date();
                        var year = d.getFullYear()
                        var month = (d.getMonth()+1)<10?"0"+(d.getMonth()+1): d.getMonth()+1
                        var date = (d.getDate()+1)<10?"0"+(d.getDate()): d.getDate()
                        var now = year+"-"+month+"-"+date;//当前时间
                        var newAction = vm.actionReport[vm.actionReport.length-1]
                        newAction.level++
                        newAction.leaf = 1
                        newAction.parentActionId = newAction.actionId
                        newAction.actionKey = ""
                        newAction.parentKey = vm.actionTmpl.actionKey
                        newAction.actionId = "action"+Date.now()
                        newAction.actionStartDate = now
                        newAction.actionDeadlineDate = ""
                        newAction.actionFinishDate = ""
                        newAction.actionController = ""
                        newAction.actionControllerId = ""
                        newAction.actionState = 2
                        newAction.deleteMark = 0
                        newAction.isAdd = true    //标记行动项是否是新添加的,即是分解之前没有的
                        newAction.wbs = newAction.wbs+".x"
                        //重新初始化表格
                        var height = 0;
                        vm.pagesAction = Math.ceil(vm.actionReport.length / vm.pageSize);
                        if(vm.indexActionReportPage+1!=vm.pagesAction) {
                            height = $("#decomposeAction").height();
                            $("#decomposeAction").height(height)
                        }
                        vm.indexActionReportPage = vm.pagesAction-1
                        vm.curActionReport = vm.actionReport.slice(vm.indexActionReportPage*vm.pageSize, vm.indexActionReportPage*vm.pageSize+vm.pageSize);
                        //将要写入数据库的新行动项加入write2DBActions中
                        vm.write2DBActions.push(newAction)
                    },
                    deleteAction:function(action){
                        var index = 0;
                        var flag = true;
                        //将数据删除更新到planSummary的action
                        for(var i=0;i<vm.actionReport.length && flag;i++){
                            if(vm.actionReport[i].actionId==action.actionId){
                                flag=false;
                                index  = i;
                            }
                        }
                        vm.actionReport.splice(index,1);
                        //重新初始化表格
                        vm.pagesAction = Math.ceil(vm.actionReport.length / vm.pageSize);
                        vm.curActionReport = vm.actionReport.slice(vm.indexActionReportPage*vm.pageSize, vm.indexActionReportPage*vm.pageSize+vm.pageSize);

                        vm.deletedPages += (vm.deletedPages.length == 0 ? action.actionId : ("," + action.actionId));
                        vm.deleteActionAcc++

                        //将删除的行动项从上传到数据库的数据中剔除
                        for(var i=0;i<vm.write2DBActions.length;i++){
                            if(vm.write2DBActions[i].actionId==action.actionId){
                                vm.write2DBActions.splice(i,1)
                                i=vm.write2DBActions.length
                            }
                        }
                    },
                    releaseAction:function(){//行动项发布
                        var flag = true
                        //合法性检查
                        for(var i=0;i<vm.actionReport.length && flag;i++){
                            if(vm.actionReport[i].actionStartDate=="" || vm.actionReport[i].actionDeadlineDate==""){
                                flag = false
                                alert("有未设置开始或结束日期的行动项，请仔细检查！！！")
                                return
                            }
                            if(vm.actionReport[i].actionController=="" || vm.actionReport[i].actionControllerId==""){
                                flag = false
                                alert("每一行动项必须有一个明确的负责人，请仔细检查！！！")
                                return
                            }
                        }
                        if(flag){
                            var isShowInfo = false
                            //====================数据初始化==================//
                            var actionReports = as.asMode.data['action']['reports']
                            var actionDirReports = as.asMode.data['actionDir']['action_reports']
                            vm.write2DBActions  = sessionUtil.setActionState(vm.write2DBActions)//格式化行动项状态
                            //删除行动项
                            var delActions = vm.deletedPages.split(",")
                            var delActions_map = new Object()
                            delActions.forEach(function(el){
                                delActions_map[el]=1;
                            })
                            for(var i=0;i<actionDirReports.length;i++){
                                if(delActions_map[actionDirReports[i].actionId]==1){
                                    actionDirReports.splice(i,1)
                                    i--
                                }
                            }
                            //====================从数据库中删除行动项==================//
                            sessionUtil.deleteActions(vm.deletedPages, function (data) {
                                if(!isShowInfo){
                                    alert("行动项提交成功！！！")
                                    isShowInfo = true
                                }
                            })
                            vm.deletedPages = ""
                            vm.deleteActionAcc = 0
                            /*添加行动项*/
                            //===================更新actionSummary中action的action_reports中的数据================//
                            for(var i=0;i<vm.write2DBActions.length;i++){
                                if(vm.write2DBActions[i].isAdd==true){//如果是新添加的行动项,则直接加入
                                    actionDirReports.push(vm.write2DBActions[i])
                                }else {//如果不是，则先将原来的删除，再加入
                                    for (var j = 0; j < actionDirReports.length; j++) {
                                        if(actionDirReports[j].actionId==vm.write2DBActions[i].actionId){
                                            actionDirReports.splice(j,1)
                                            actionDirReports.push(vm.write2DBActions[i])
                                            j = actionDirReports.length
                                        }
                                    }
                                }
                            }
                            //====================是否将行动项添加到actionSummary的action中=====================//
                            var count=1
                            vm.actionReport.forEach(function(el){//更新WBS
                                el.wbs = el.wbs.substr(0,el.wbs.length-1)+count
                                count++
                            })
                            if(as.asMode.showActionDirId!=""&&as.asMode.showActionDirId==actionDirId){
                                as.asMode.data['action']['reports'] = vm.actionReport
                                //刷新数据
                                sessionUtil.refresh('action',as.asMode,'accordion-element-actionList')
                            }
                            //====================将数据写入数据库中==================//
                            var count=vm.write2DBActions.length
                            for(var i=0;i<vm.write2DBActions.length;i++) {
                                sessionUtil.addAction(vm.write2DBActions[i],function(data){
                                    count--
                                    if(count==0&&!isShowInfo){
                                        isShowInfo = true
                                        alert("行动项提交成功！！！")
                                    }
                                })
                                //将行动项添加到通知
                                var tmp = new Object();
                                tmp.MessageType = "行动项通知"
                                tmp.MessageContent = vm.write2DBActions[i].actionContent
                                tmp.MessageSource = vm.write2DBActions[i].projectName
                                var d = new Date();
                                var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                                tmp.MessageDate = now;
                                tmp.employeeId = vm.write2DBActions[i].actionControllerId
                                sessionUtil.addMessages(tmp,function(data){//添加通知
                                })
                                vm.write2DBActions.splice(i,1)
                                i--
                            }
                        }
                    },
                    dateLegalityJudge:function(type,el){
                        if(el.actionStartDate!="" && el.actionDeadlineDate!="") {
                            if(sessionUtil.DateDiff(el.actionStartDate,vm.actionTmpl.actionStartDate)<0){
                                alert("输入的日期不合法!!!\n行动项的开始日期不能早于行动项目录开始日期!!!")
                                el[type] = ""
                                vm.curActionReport = vm.curActionReport
                                return
                            }
                            if(sessionUtil.DateDiff(el.actionStartDate,vm.actionTmpl.actionDeadlineDate)>=0){
                                alert("输入的日期不合法!!!\n行动项开始日期不能晚于等于行动项目录截止日期!!!")
                                el[type] = ""
                                vm.curActionReport = vm.curActionReport
                                return
                            }
                            if(sessionUtil.DateDiff(el.actionDeadlineDate,vm.actionTmpl.actionDeadlineDate)>0){
                                alert("输入的日期不合法!!!\n行动项的截止日期不能晚于行动项目录截止日期!!!")
                                el[type] = ""
                                vm.curActionReport = vm.curActionReport
                                return
                            }
                            if(sessionUtil.DateDiff(el.actionDeadlineDate,vm.actionTmpl.actionStartDate) < 0){
                                alert("输入的日期不合法!!!\n行动项截止日期不能早于等于行动项目录开始日期!!!")
                                el[type] = ""
                                vm.curActionReport = vm.curActionReport
                                return
                            }
                            if (sessionUtil.DateDiff(el.actionStartDate, el.actionDeadlineDate) >= 0){
                                alert("输入的日期不合法!!!\n行动项开始日期不能晚于等于结束日期!!!")
                                el[type] = ""
                                vm.curActionReport = vm.curActionReport
                                return
                            }
                            //将修改过的行动项添加到write2DBTasks中
                            vm.addWrite2DBAction(el)

                        }
                    },
                    actionContentLegalityJudge:function(action){
                        if(action.actionContent.length > 200){
                            alert("输入的行动项内容不能超过200字！！！")
                            action.actionContent = action.actionContent.substr(0,200)
                            vm.curActionReport = vm.curActionReport
                        }
                        //将修改过的行动项添加到write2DBActions中
                        vm.addWrite2DBAction(action)
                    },
                    addWrite2DBAction:function(action){
                        var hasThisAction = false;
                        for (var i = 0; i < vm.write2DBActions.length && !hasThisAction; i++) {
                            if (vm.write2DBActions[i].actionId == action.actionId) {
                                hasThisAction = true
                            }
                        }
                        if (!hasThisAction) {
                            //存入的时候只进行浅拷贝
                            vm.write2DBActions.push(action)
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
                        vm.actionContainer = data
                        select.types['employeeSelectForActionCreate'].onSelect = function (row) {
                            avalon.log(row)
                            vm.actionContainer.actionController = row.employeeName
                            vm.actionContainer.actionControllerId = row.employeeNumber
                            vm.addWrite2DBAction(vm.actionContainer)
                            vm.curActionReport = vm.curActionReport//just for refresh the data
                        }
                        $(modalSelector).modal('show')
                        select.init('employeeSelectForActionCreate',null,vm.actionTmpl)
                    },
                    closeActionDecomposeTab:function($event){
                        if(vm.write2DBActions.length!=0){
                            var truthBeTold = window.confirm("有修改的行动项，在提交之前是否确定要退出，若退出则所作修改将不会被保留！！！")
                            if(truthBeTold)
                                main.closeThisTab($event)
                        }else main.closeThisTab($event)
                    },
                    toActionDirView:function(){
                        window.location.href = '#!/am/actionDir/' + vm.actionDirId;
                    },
                    tmplLoaded: function (tmpl) {
                        avalon.log('正在修改report' + vm.$actionID + '模板');
                        tmpl = utils.tmpl.clearUselessHtml(tmpl);
                        tmpl = tmpl.replace(/(ms-important=")[\S]+(")/, 'ms-important="action' + vm.$actionID + '"');
//                    $("#actionDecompose").attr("ms-important","action"+vm.$actionID);
//                    var tmp = $("#actionDecompose").attr("ms-important");
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

        function _newVM(actionID,actionVMID) {
            var projectName = amCookie.cookie.get("projectName");
            /*sessionUtil.getPlan(actionID,projectName,function(data){
             action.actionTmpl = data;
             })*/
            var action = actionPackages[actionVMID] = avalon.define("action"+actionVMID, function(vm) {
                /*vm.init = function(){
                 //get actions
                 var projectId = amCookie.cookie.get("projectId");
                 sessionUtil.getChildPlan(login.loginId,projectId,actionID,function(data){
                 vm.actionReport = data;
                 })
                 //设置分页
                 vm.curActionReport   = vm.actionReport.slice(0, vm.pageSize);
                 vm.pagesAction = Math.ceil(vm.actionReport.length / vm.pageSize);
                 }*/
                vm.actionDirId = actionID;
                vm.checkedAll = false
                vm.$actionID = actionVMID
                vm.actionReport =[]
                //要写入数据库的Actions
                vm.write2DBActions = []
                vm.write2DBMessages = []
                vm.actionController = "zhaoyao"
                vm.totalWeight = 0
                //actionTmpl;行动项的一些属性来源于它们的行动项目录，将这些属性放在模板actionTmpl中
                vm.actionTmpl = {};
                // page index
                vm.indexActionReportPage  = 0;
                //page subscript
                vm.curActionReport = [];
                //page count
                vm.pagesAction = 0;
                //deleted pages
                vm.deletedPages=""
                vm.deleteActionAcc=0
                //page Size
                vm.pageSize = 5;
                // increase page number
                vm.nextActionReportPage = function() {
                    if (vm.indexActionReportPage+1 < vm.pagesAction) {
                        var height = $("#decomposeAction").height();
                        vm.indexActionReportPage ++;
                        vm.curActionReport = vm.actionReport.slice(vm.indexActionReportPage*vm.pageSize, vm.indexActionReportPage*vm.pageSize+vm.pageSize);
                        if(vm.indexActionReportPage+1==vm.pagesAction){
                            $("#decomposeAction").height(height);
                        }
                    }

                };
                vm.preActionReportPage = function() {
                    if (vm.indexActionReportPage > 0) {
                        vm.indexActionReportPage --;
                        vm.curActionReport = vm.actionReport.slice(vm.indexActionReportPage*vm.pageSize, vm.indexActionReportPage*vm.pageSize+vm.pageSize);
                    }
                };
                vm.checkAll = function(){
                    vm.checkedAll = !vm.checkedAll
                    vm.actionReport.forEach(function(el){
                        el.checked = vm.checkedAll
                    })
                    //重置显示
                    vm.curActionReport   = vm.actionReport.slice(vm.indexActionReportPage*vm.pageSize,vm.indexActionReportPage*vm.pageSize+vm.pageSize);
                }
                /*****************************实例公用函数*********************************/
                for(var key in funcSharer.publicMethods)
                    vm[key]=funcSharer(vm, key);
                return vm;
            })
            //获取行动项所在目录
            var asData = as.asMode.data['actionDir']['reports']
            for(var i=0;i<asData.length;i++){
                if(asData[i].actionId==actionID){
                    action.actionTmpl = asData[i]
                    i=asData.length
                }
            }
            //获取行动项包中的行动项
            actionDirId = actionID
            var data = as.asMode.data['actionDir']['action_reports']
            for(var i=0;i<data.length;i++){
                if(data[i].parentActionId==actionID) {
                    //只保留日期中的年、月、日
                    data[i].actionStartDate = data[i].actionStartDate.split(" ")[0]
                    data[i].actionDeadlineDate = data[i].actionDeadlineDate.split(" ")[0]
                    if (!data[i].leaf) {
                        data.splice(i, 1)
                        i--
                    }
                    action.totalWeight += parseInt(data[i].actionWeight)
                    //对查看的行动项进行深拷贝
                    var nb = new Object()
                    for(var key in data[i]){
                        nb[key] = data[i][key]
                    }
                    action.actionReport.push(nb);
                }
            }
            //设置分页
            action.curActionReport   = action.actionReport.slice(0, action.pageSize);
            action.pagesAction = Math.ceil(action.actionReport.length / action.pageSize);
            // Animation after page loading
            setTimeout(function() {
                $('.panel').slideDown( "slow" );
            }, 500);
//        })
            return action;
        }
        actionDecomposeVM.openAction = function (actionID) {
            var newactionID = actionID + '_at_' + Date.now()
            var actionVM = _newVM(actionID,newactionID);
            return actionVM;
        }
        avalon.mix(actionDecomposeVM,{actionPackages:actionPackages})
        return actionDecomposeVM;
    })