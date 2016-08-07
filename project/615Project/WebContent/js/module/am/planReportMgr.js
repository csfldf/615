/**
 * Created by FeiyuLab on 2014/9/24 0024.
 */
"use strict";
define(["mmRequest", "utils", 'jquery','permissionMgr','selector'], function (avalon, utils,$, pm,select) {
    var prM = window['prM'] = {},
        planReports = {},//{reportId:reportVM}
        uiRulesOrigin = pm.getOrigin("planReport"),
        uiRulesAddtional = pm.getAddtions("planReport")

    function getLoginInUserId(){
        var userid='111'
        require('Login',function(login){
            if(login.isLogin)
                userid=login.loginId
        })
        return userid
    }
    var emtpyReportTemplate = {isActionItem: true, modifyType: "",back:false,isOpEnd:false,projectId:'',
            planControllerId:'',
            planAuditorId:'',planCreatorId:'',employeeId:'',
            parentPlanCode: '', planSerialNumber: '', planCode: '', planName: '', planIssuedDate: '',planDeadlineDate: '',
            planStartDate: '', planFinishDate:'', planSource: '', planController: '',
            planState: -1, planUpdateDescription: '',
            planOutputExisited: []},
        reportStateTemplate = [
            {value: 0, text: '新建'},
            {value: 1, text: '待审核'},
            {value: 2, text: '待执行'},
            {value: 3, text: '执行中'},
            {value: 4, text: '已完成'}
        ]

    var privileges={sync:false,canNew:false,canDelete:false,canBack:false,canAudit:false,canSubmit:false}
    setPrivilege()
    /**
     * 设置权限
     * @param planCode
     * @param controllerId
     * @param planVM
     */
    function setPrivilege(planCode,controllerId,planVM){
        if(planVM){
            avalon.mix(planVM.uiDisplay,{buttonSubmit: false,buttonBack:false,buttonDelete:false})
        }
        if(privileges.sync==false){
            if(avalon.vmodels["loginVM"].isLogin){
                avalon.getJSON('am/getOnesAmPrivilege',function(data){
                    privileges.canNew=data.addTask || data.addPlan || false
                    privileges.canBack=data.rollbackTask || false
                    privileges.canAudit=data.auditTask || false
                    privileges.canSubmit=data.doTask || false
                    privileges.canDelete=data.deleteTask || false
                    privileges.sync=true
                    setVMDisplay()
                })
            }
            /////////////
           // privileges.sync=true
        }
        privileges.sync && setVMDisplay()
        function setVMDisplay(){
            if((planVM && planVM.report.planState==0)
                ||(planVM && planVM.report.planState>=1)){
                if(planVM.report.planState==0 && privileges.canNew){
                    avalon.mix(planVM.uiDisplay,{buttonSubmit:true})
                }
                if(planVM.report.planState>=1 && privileges.canDelete){
                    avalon.mix(planVM.uiDisplay,{buttonDelete:true})
                }
                if(planVM.report.planState==1 && privileges.canAudit){
                    avalon.mix(planVM.uiDisplay,{buttonSubmit:true,buttonBack:true})
                }
                if(planVM.report.planState>=2 && planVM.report.planState <=3 && privileges.canSubmit){
                    avalon.mix(planVM.uiDisplay,{buttonSubmit:true})
                }
                if(planVM.report.planState>=2 && planVM.report.planState<=4 && privileges.canSubmit && privileges.canBack){
                    avalon.mix(planVM.uiDisplay,{buttonSubmit:true,buttonBack:true})
                }
            }
        }

    }
    prM.privilegrs=privileges
    prM.setPrivilege=setPrivilege
    /******************************planReport公用函数(public/private),用闭包在实例间共享********************************/
    var funcSharer = (function () {
        var vm,
            publicMethods = {
                initEmployeeSelector: function (modalSelector) {
                    select.types['employeeSelectForPlanStatistics'].onSelect = function (row) {
                        avalon.log(row)
                        vm.report.planController = row.employeeName
                        vm.report.planControllerId = row.employeeNumber
                    }
                    $(modalSelector).modal('show')
                    select.init('employeeSelectForPlanStatistics')

                },
                deleteOutput:function(href,op,element){
                  avalon.getJSON(href,function(state){
                      if(state.success){
                          avalon.type(op)=="function" && op();
                      }
                      else
                        alert('删除失败')
                  })
                },
                /**
                 * 从本地JSON加载report数据
                 * @param data
                 */
                loadData: function (data,remoteMode) {
                    console.log(data);
                    remoteMode
                        ?_mixFromServerJson(vm.report, data)
                        :avalon.mix(vm.report, data);
                },
                /**
                 * 从Server获得指定ID的report数据，onSuccess：成功回调
                 * @param reportId
                 * @param onSuccess
                 * @returns {boolean}
                 */
                load: function (reportId, onSuccess) {
                    if (typeof reportId == 'string') {
                        avalon.getJSON('am/get.action?planCode=' + reportId, function (data) {
                            avalon.log(data)
                            if (typeof onSuccess == 'function') {
                                onSuccess()
                                vm.executeCallback("onLoadSuccess")
                            }
                            _mixFromServerJson(vm.report, data)
                            setPrivilege(vm.report.planCode,vm.report.employeeId,vm)
                            return true;
                        });
                    }
                    return false;
                },
                edit:function($event){
                    if(vm.report.modifyType=="update"){
                        switch (vm.report.planState){
                            case 4:
                                vm.uiEnable.planFinishDate=true
                                vm.uiEnable.planController=true
                                vm.uiDisplay.buttonControllerSelect=true
                                break
                            case 2:
                                vm.uiEnable.planStartDate=true
                                break
                            default :


                        }
                    }
                },
                /**
                 * 保存行动项或其草稿
                 * @param isDraft
                 */
                submit: function (action, $event) {
                    var isDraft = action=="save"?true:false;
                    var canSubmit = isDraft ? true : _isReportValid(vm)
                    if (canSubmit) {
                        if(isDraft && vm.report.planCode=="") {
                            alert('必须填写 综合任务代码');
                            return false;
                        }
                        ($event) && $event.preventDefault();
                        if (vm.report.planState!=2
                            && confirm("确定要提交/回退 " + vm.report.planCode + " 吗?") === false)
                            return;
                        var data=avalon.mix({},vm.report.$model)
                        delete data.planOutputExisited
                        ////////////////////////////////
                        data.projectId = data.projectId || '2'
                        //data.employeeId = "111"
                        switch (vm.report.planState){
                            case 0:
                                data.nextEmployeeId=vm.report.planAuditorId+''||''
                                data.prevEmployeeId=''
                                break
                            case 1:
                                data.nextEmployeeId=vm.report.planControllerId+''||''
                                data.prevEmployeeId=vm.report.planCreatorId+'' ||''
                                break
                            case 2:
                                data.nextEmployeeId=vm.report.planControllerId+''||''
                                data.prevEmployeeId=vm.report.planAuditorId+''||''
                                break
                            case 3:
                                data.nextEmployeeId=vm.report.planAuditorId+''||''
                                data.prevEmployeeId=vm.report.planControllerId+''||''
                                break
                            case 4:
                                data.nextEmployeeId=''
                                data.prevEmployeeId=vm.report.planControllerId+''||''
                                break
                        }
                        ///////////////////////////////////
                        if(action=="submit") {
                            if (vm.report.planState == 3)
                                data.planFinishDate = utils.date.getCurrentDate()
                            else if(vm.report.planState ==2)
                                data.planStartDate = utils.date.getCurrentDate()

                            data.employeeId=data.nextEmployeeId

                            data.planState = data.planState <= 3 ? data.planState + 1 : data.planState
                            data.back=false;
                        }
                        else if(action =="back") {

                            data.employeeId=data.prevEmployeeId

                            data.planState = data.planState > 0 ? data.planState - 1 : data.planState
                            data.back = true
                        }
                        if (isDraft === false){

                            avalon.post('am/savePlan.action', data, function (resp) {
                                resp= $.parseJSON(resp)
                                if (resp.success){
                                    if(vm.report.planState==0)
                                        vm.$reportId=data.planCode
                                    vm.load(vm.$reportId,function(){

                                        if(data.planState==3 && vm.report.planState==2){
                                            vm.report.planState=-1
                                            vm.report.isOpEnd=false
                                            vm.report.planState=3
                                            setPrivilege(null,null,vm)
                                        }else
                                            vm.report.isOpEnd=true
                                    })
                                    vm.executeCallback("onSubmitSuccess")

                                    alert('提交成功')
                                }
                                else{
                                    alert('提交失败')
                                }
                            })
                        }
                        else
                            avalon.post('am/savePlanScript.action',
                                {planCode:data.planCode,planScript: JSON.stringify(data), employeeId: getLoginInUserId()}, function (resp) {
                                    resp= $.parseJSON(resp)
                                    if (resp.success)
                                        alert('保存成功')
                                    else
                                        alert('保存失败')
                                });
                    }
                },
                /**
                 * 删除自身的报告
                 */
                deleteSelf: function () {
                    confirm("确定要终止 " + vm.report.planCode + " 吗?") &&
                    avalon.getJSON('am/del.action', {planCode: vm.report.planCode},function(data){
                        if(data.success){
                            alert('终止成功')
                        }
                        else{
                            alert('终止失败')
                        }
                    });
                },
                /**
                 * 删除草稿自身
                 */
                deleteDraftSelf:function(){
                    confirm("确定要删除 " + vm.report.planCode + " 草稿吗?") &&
                    avalon.getJSON('am/delPlanScript.action',
                        {employeeId:getLoginInUserId(),planCode: vm.report.planCode},function(data){
                        if(data.success){
                            alert('删除草稿成功')
                        }
                        else{
                            alert('删除草稿失败')
                        }
                    });
                },
                /**
                 * 清空report
                 */
                clear: function () {
                    avalon.mix(true, vm.report, emtpyReportTemplate);
                },
                /**
                 * planReport模块共用的html模板修饰函数
                 * @param tmpl
                 * @returns {XML|string|void|*}
                 */
                tmplLoaded: function (tmpl) {
                    avalon.log('正在修改report' + vm.$reportId + '模板');
                    tmpl = utils.tmpl.clearUselessHtml(tmpl);
                    tmpl = tmpl.replace(/(ms-important=")[\S]+(")/, 'ms-important="planReport' + vm.$reportId + '"');
                    return tmpl;
                },
                /**
                 * 根据权限模式改变UI的visible和disable状态
                 * @param mode
                 * @private
                 */
                changeUIRules: function (mode) {
                    if (uiRulesAddtional.hasOwnProperty(mode)) {
                        vm.report.modifyType = mode;
                        avalon.mix(vm.uiDisplay,uiRulesAddtional[mode]['display']);
                        avalon.mix(vm.uiEnable,uiRulesAddtional[mode]['enable'])
                    }
                },
                /**
                 * 关闭当前Report的Tab
                 * @param $evnet
                 */
                closeReportTab:function($evnet){
                    require(['UIMainFrame'], function (main) {
                        main.closeThisTab($evnet)
                    })
                },
                executeCallback: function (callbackName) {
                    var func = callbacks[callbackName]
                    if (avalon.type(func) == "function") {
                        avalon.log("execute Callback " + callbackName)
                        func(vm)
                    }
                }
            }
        function _mixFromServerJson(report,remoteJson){
            report.employeeId = remoteJson.employeeId
            report.employeeName = remoteJson.employeeName
            report.planCreatorId=remoteJson.planCreatorId
            report.planAuditorId=remoteJson.planAuditorId

            report.back = remoteJson.back || false
            report.projectId = remoteJson.projectId
            report.parentPlanCode=remoteJson.parentPlanCode
            report.planSerialNumber=remoteJson.planSerialNumber
            report.planCode=remoteJson.planCode
            report.planDeadlineDate=(remoteJson.planDeadlineDate||'').split(" ")[0]
            report.planIssuedDate=(remoteJson.planIssuedDate||'').split(" ")[0]
            report.planStartDate=(remoteJson.planStartDate||'').split(" ")[0]
            report.planFinishDate=(remoteJson.planFinishDate||'').split(" ")[0]
            report.planName=remoteJson.planName;
            report.planSource=remoteJson.planSource
            report.planUpdateDescription=remoteJson.planUpdateDescription
            report.planController=remoteJson.planController
            report.planControllerId=remoteJson.planControllerId
            report.planOutputExisited.clear()
            remoteJson.planOutput.forEach(function(one){
                report.planOutputExisited.push({
                    name: one.fileName,
                    downloadHref: one.fileHref || 'javascript:void(0)',
                    deleteHref: one.fileDelHref || 'javascript:void(0)',
                    uploadDate: (one.uploadDateString || '').split(" ")[0]
                })
            })
            report.planState=parseInt(remoteJson.planStateCode+'')
        }
        function _isAllDateValid() {
            var flag = utils.date.isDateString(vm.report.planIssuedDate) && utils.date.isDateString(vm.report.planStartDate) &&
                utils.date.isDateString(vm.report.planDeadlineDate);
            return flag;
        }
        function _isReportValid() {
            var form = document.getElementById(vm.$formId);
            //html5验证方法
            var flag = form.checkValidity ? form.checkValidity() : (vm.report.planCategory && vm.report.planSerialNumber && vm.report.planCode && vm.report.planName &&
                _isAllDateValid(vm) && vm.report.planSource && vm.report.planController && vm.report.planState && vm.report.planUpdateDescription);
            return !!flag;
        }

        var callbacks = {
            onSubmitSuccess: avalon.noop,
            onLoadSuccess: avalon.noop
        }
        function mixCallbacks(callbacksObj) {
            if (avalon.type(callbacksObj) == "object")
                avalon.mix(callbacks, callbacksObj)
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
        avalon.mix(prM, {mixCallbacks:mixCallbacks})
        executer.publicMethods=publicMethods;
        return executer;
    })();
    /**
     * 创建新的planreport VM
     * @param reportId
     * @returns {*}
     * @private
     */
    function _newVm(reportId) {
        if (typeof reportId != 'string' && typeof reportId != 'number') return null;
        else reportId += '';
        var new$uiDisplay = avalon.mix({}, uiRulesOrigin),
            new$uiEnable = avalon.mix({}, uiRulesOrigin);
        var report = planReports[reportId] = avalon.define("planReport" + reportId, function (vm) {
            vm.$reportId = reportId;//唯一化UI上的formId
            vm.$formId = 'planForm' + reportId;
            vm.$planStateTmpl = reportStateTemplate;
            //表单项
            vm.report = avalon.mix({}, emtpyReportTemplate);
            vm.planRemainingDate = 0;
            vm.uiDisplay = new$uiDisplay;
            vm.uiEnable = new$uiEnable;
            /*****************************实例公用函数**********************************************************/
            for(var key in funcSharer.publicMethods)
                vm[key]=funcSharer(vm, key);
            return vm;
        });
        //监视数据变化
        report.report.$watch("planDeadlineDate", function (newValue, oldValue) {
            var daynum = utils.date.dateDiff(newValue, utils.date.getCurrentDate());
            if (!isNaN(daynum))
                report.planRemainingDate = daynum;
            else
                report.planDeadlineDate = oldValue;
        });
        report.report.$watch("planState",function(newValue,oldValue){
            if(report.report.isOpEnd==false && (report.report.modifyType=="update"||report.report.modifyType=="new")) {
                avalon.mix(report.uiEnable, {buttonSubmit: true, buttonBack: true, buttonDelete:true,buttonEdit:true,
                    buttonSubmitDraft: true, buttonDeleteDraft: true})
                //avalon.mix(report.uiDisplay,{buttonSubmitDraft:true,buttonDeleteDraft:true})
                switch (newValue) {
                    case 0:
                        var tempType=report.report.modifyType
                        report.changeUIRules("new")
                        report.report.modifyType=tempType
                        privileges.canNew && avalon.mix(report.uiEnable,pm.getFinal("planReport","new",'enable'))
                        avalon.mix(report.uiEnable, {buttonSubmit: true, buttonBack: false, buttonSubmitDraft: true, buttonDeleteDraft: true})
                        break;
                    case 1:
                        avalon.mix(report.uiEnable,pm.getFinal("planReport","update",'enable'))
                        avalon.mix(report.uiEnable, {buttonSubmit: true, buttonBack: true, buttonSubmitDraft: false, buttonDeleteDraft: false})
                        avalon.mix(report.uiDisplay,{areaPlanOutput:false})
                        avalon.mix(report.uiDisplay,{buttonSubmitDraft:false,buttonDeleteDraft:false})
                        break;
                    case 2:
                        avalon.mix(report.uiEnable,pm.getFinal("planReport","update",'enable'))
                        avalon.mix(report.uiEnable, {buttonSubmit: true, buttonBack: true, buttonSubmitDraft: false, buttonDeleteDraft: false})
                        if (confirm("您已阅览此行动项/计划，是否将状态转入 执行中 ？")){
                            report.submit("submit")
                        }
                        avalon.mix(report.uiDisplay,{buttonSubmitDraft:false,buttonDeleteDraft:false})
                        break;
                    case 3:
                        avalon.mix(report.uiEnable,pm.getFinal("planReport","update",'enable'))
                        avalon.mix(report.uiEnable, {buttonSubmit: true, buttonBack: true, buttonSubmitDraft: false, buttonDeleteDraft: false})
                        avalon.mix(report.uiDisplay,{buttonSubmitDraft:false,buttonDeleteDraft:false})
                        break;
                    case 4:
                        avalon.mix(report.uiEnable,pm.getFinal("planReport","update",'enable'))
                        avalon.mix(report.uiEnable, {buttonSubmit: false, buttonBack: true, buttonSubmitDraft: false, buttonDeleteDraft: false})
                        avalon.mix(report.uiDisplay,{areaUploader:false})
                        avalon.mix(report.uiDisplay,{buttonSubmitDraft:false,buttonDeleteDraft:false})
                        break;

                }
            }
        })
        report.report.$watch("isOpEnd",function(newValue){
            if(newValue===true)
                avalon.mix(report.uiEnable,{buttonSubmit: false, buttonBack:false,buttonSubmitDraft: false, buttonDelete: false})


        })
        return report;
    }
    function _getVm(reportId) {
        if (typeof reportId == 'string' || typeof reportId == 'number') {
            var report = planReports[reportId + ''] || avalon.vmodels['planReport' + reportId + ''];
            return report;
        }
    }
    function _delVm(reportId) {
        if (typeof reportId == 'string' || typeof reportId == 'number') {
            delete planReports[reportId + ''];
            delete avalon.vmodels["planReport"+reportId]
        }
    }
    function validMixObj(mixobj){
        function validBoolean(obj,variArr){
            variArr=variArr instanceof Array?variArr:[variArr]
            variArr.forEach(function(one){
                if(avalon.type(obj[one])=="string"){
                    switch (obj[one]){
                        case "true":
                            obj[one] = true;break;
                        case "false":
                            obj[one] = false;break;
                    }
                }
            })

        }
        validBoolean(mixobj,["back","isOpEnd","isActionItem"])
        return mixobj

    }
    /**
     * 创建一个空的report,分为行动项和计划
     * @param reportId
     * @param isActionItem
     * @returns {*}
     */
    var newReport = function (reportId, isActionItem,mixObj) {
        var report = _newVm(reportId + '_at_' + Date.now());
        report.report.isActionItem = isActionItem !== undefined ? isActionItem : true;
        report.report.planState = 0;
        //如状态是新建，自动填入启动日期
        report.report.planIssuedDate=utils.date.getCurrentDate();
        avalon.type(mixObj) === "object" && avalon.mix(report.report, validMixObj(mixObj));
        setPrivilege(null,null,report)
        return report;
    }
    var getReport = function (reportId) {
        var report = _getVm(reportId);
        return report;
    }
    /**
     * 打开一个report并load远程数据
     * @param reportId
     * @param onSuccess
     * @returns {*}
     */
    var openReport = function (reportId, onSuccess,mixObj) {
        var report = _getVm(reportId) || _newVm(reportId);
        report.load(reportId, onSuccess)
        avalon.mix(report.report,mixObj)
        return report;
    }
    var deleteReport = function (reportId) {

    }
    /**
     * 关闭一个report
     * @param reportId
     */
    var closeReport = function (reportId) {
        return _delVm(reportId + '')
    }
    avalon.mix(prM, {planReports: planReports, newReport: newReport, getReport: getReport,
        openReport: openReport, closeReport: closeReport});
    return prM;
    function upperFirstLetter(str) {
        return str.replace(/^[a-z]{1}/g, function(mat) {
            return mat.toUpperCase()
        })
    }
})
/**
 * 2014.10.15:add:根据new，update，change改变UI的显示和使能
 *                  _changeUIRules：改变mode，uiRulesOrigin：源设置，全为true，uiRulesAddtional：覆盖原设置
 *                  ！！未来规则应该从权限模块获得
 * 2014.10.16:update:_isReportValid,html5验证
 *           :add:newReport，_getVm，_delVm
 *           :update:重构了部分结构
 * 2014.10.26:fix:将uiRules改为动态获取后，然后添加到vm中后运行报错：
 *                      warning:evaluator of [$uiDisplay.planUpdateDescription] throws error!
 *                原因：scanAttr -> executeBindings -> bindingHandlers[data.type]()
 *                      -> parseExprProxy -> addAssign 中 scope.hasOwnProperty(prop)为false
 *
 *                              function hasOwnProperty(name) {
 *                                   return name in vmodel.$model
 *                               }
 *                       当在vm define外添加属性(该属性由函数生成，因此不能直接放在vm中，会执行两次）时，
 *                                                      $modal中并不存在该属性，因此parse表达式出错
 *
 *                 解决方案：Warning：因为$XXX这种变量框架不会设置getter和setter，所以不能通过先在avalon.define时定义空的$XXX，
 *                               然后在vm外设置vm.$XXX=newValue来同步$modal中
 *                         1.要新增$XXX这种变量直接在vm外部使用vm.$XXX=vm.$modal.$XXX=newValue来定义
 *                      ☆ 2.avalon.define前用临时变量存函数生成的值，然后在avalon.define中赋值进去
 *                         3.在vm中使用函数返回值赋值，有执行两次的性能损失
 * 2014.10.26:practice：$formId在vm和$model中不一致，但是在DOM中调用的是vm中的值，逻辑正确
 *                          原因：解析表达式时，通过hasOwnProperty（即在$model中）判断变量是否存在，取值还是在vm中取
 * 2014.11.14:add:使用闭包使实例共享方法
 *
 * 2014。12.16:hint:Js '003'|''=3
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
