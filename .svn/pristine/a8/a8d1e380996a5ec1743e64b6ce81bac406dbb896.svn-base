/**
 * Created by FeiyuLab on 2014/9/24 0024.
 * task planController 任务负责人
 *      planAuditor     工作包负责人
 *
 */
"use strict";
define(["mmRequest", "utils", 'jquery', 'permissionMgr', 'selector', 'simpleFSM', 'authorityMgr','am.sessionUtil'],
    function (avalon, utils, $, pm, select, FSM, auth,sessionUtil) {
    var prM = window['trM'] = {},
        planReports = {},//{reportId:reportVM}
        uiRulesOrigin = pm.getOrigin("taskView"),
        uiRulesAddtional = pm.getAddtions("taskView")

    function delNull(mixobj) {
        if (avalon.type(mixobj) == "object") {
            for (var name in mixobj) {
                if (mixobj[name] == null)
                    delete mixobj[name];
            }
        }
    }

    function getLoginInUserId() {
        var userid = '111'
        require('Login', function (login) {
            if (login.isLogin)
                userid = login.loginId
        })
        return userid
    }

    var emtpyReportTemplate = {
            isActionItem: true, modifyType: null, back: false, isOpEnd: false,
            projectId: null, projectName: null, parentPlanCode: null, parentKey: null,
            planControllerId: null,
            planAuditorId: null, planCreatorId: null, employeeId: null,
            planSerialNumber: null, planCode: null, planName: null,
            planIssuedDate: null, planDeadlineDate: null,
            planStartDate: null, planFinishDate: null, planSource: null, planController: null,
            planState: 0, changeDetail: null,

            planWBS: null, planWBSBefore: null, planWBSAfter: null,
            taskContent: null, taskWeight: 0.0,
            leaf: true, isTask: false, level: 0
        },

        reportStateTemplate = [
            {value: 0, text: '新建'},
            {value: 1, text: '未发布'},
            {value: 2, text: '已发布'},
            {value: 3, text: '未完成'},
            {value: 4, text: '已完成'}
        ]

    //FSM 2015.5.30
    FSM.create({
        initial: '新建',
        events: [
            {name: 'newPlan', from: '新建', to: '未发布'},
            {name: 'releasePlan', from: '未发布', to: '已发布'},
            {name: 'cancelReleasePlan', from: '已发布', to: '未发布'},
            {name: 'cancelReleasePlan', from: '未完成', to: '未发布'},
            {name: 'finishPlan', from: '已发布', to: '已完成'},
            {name: 'notFinishPlan', from: '已发布', to: '未完成'},
            {name: 'finishPlanOverdue', from: '未完成', to: '已完成'}
        ],
        callbacks: {
            //权限检查，字段正确性检查，发出subumit请求，接受结果，决定是否继续下一步
            onbeforenewPlan: function (event, form, to, data) {
                var report = data.report, planfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.planState = 1
                delNull(temp)
                avalon.post('am/savePlan.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.planState = 1
                        report.isOpEnd = true

                        alert('提交成功')

                        vm.$fsm.transition()
                        //通知刷新
                        sessionUtil.refreshPsAs('plan', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        planfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            //成功
            onnewPlan: function (event, form, to, data) {
                alert('已新建')
                var report = data.report, planfsm = data.fsm, vm = data.vm
                report.planState = 1
                vm.changeUIRules("beforeRelease")
            },
            onbeforereleasePlan: function (event, form, to, data) {
                var report = data.report, planfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.planState = 2
                delNull(temp)
                avalon.post('am/savePlan.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.planState = 2
                        report.isOpEnd = true

                        alert('提交成功')

                        planfsm.transition()
                        //发送通知
                        sessionUtil.addMessages({
                            MessageType: '任务发布',
                            MessageContent: report.$model.planCode,
                            MessageSource: report.$model.projectId,
                            MessageDate: utils.date.getCurrentDate(),
                            employeeId: report.$model.planControllerId
                        }, function (data) {
                        })
                        //通知刷新
                        sessionUtil.refreshPsAs('plan', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        planfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            onreleasePlan: function (event, form, to, data) {
                alert('已发布')
                var report = data.report, planfsm = data.fsm, vm = data.vm
                report.planState = 2
                vm.changeUIRules("released")
            },
            onbeforecancelReleasePlan: function (event, form, to, data) {
                var report = data.report, planfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.planState = 1
                delNull(temp)
                avalon.post('am/savePlan.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.planState = 1
                        report.isOpEnd = true

                        alert('提交成功')

                        planfsm.transition()
                        //发送通知
                        sessionUtil.addMessages({
                            MessageType: '任务取消发布',
                            MessageContent: report.$model.planCode,
                            MessageSource: report.$model.projectId,
                            MessageDate: utils.date.getCurrentDate(),
                            employeeId: report.$model.planControllerId
                        }, function (data) {
                        })
                        //通知刷新
                        sessionUtil.refreshPsAs('plan', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        planfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            oncancelReleasePlan: function (event, form, to, data) {
                alert('已取消发布')
                var report = data.report, planfsm = data.fsm, vm = data.vm
                vm.changeUIRules("beforeReleased")
            },
            onbeforefinishPlan: function (event, form, to, data) {
                var report = data.report, planfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.planState = 4
                temp.planFinishDate = utils.date.getCurrentDate()
                delNull(temp)
                avalon.post('am/savePlan.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.planState = 4
                        report.isOpEnd = true
                        report.planFinishDate = utils.date.getCurrentDate()

                        alert('提交成功')

                        planfsm.transition()
                        //通知刷新
                        sessionUtil.refreshPsAs('plan', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        planfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            onfinishPlan: function (event, form, to, data) {
                alert('已完成')
                var report = data.report, planfsm = data.fsm, vm = data.vm
                vm.changeUIRules("finished")
            },
            onbeforenotFinishPlan: function (event, form, to, data) {
                var report = data.report, planfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.planState = 3
                delNull(temp)
                avalon.post('am/savePlan.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.planState = 3
                        report.isOpEnd = true

                        alert('提交成功')

                        planfsm.transition()
                        //通知刷新
                        sessionUtil.refreshPsAs('plan', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        planfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            onnotFinishPlan: function (event, form, to, data) {
                alert('已未完成任务')
                var report = data.report, planfsm = data.fsm, vm = data.vm
                vm.changeUIRules("notFinished")
            },
            onbeforefinishPlanOverdue: function (event, form, to, data) {
                var report = data.report, planfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.planState = 4
                temp.planFinishDate = utils.date.getCurrentDate()
                delNull(temp)
                avalon.post('am/savePlan.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.planState = 4
                        report.isOpEnd = true
                        report.planFinishDate = utils.date.getCurrentDate()

                        alert('提交成功')

                        planfsm.transition()
                        //通知刷新
                        sessionUtil.refreshPsAs('plan', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        planfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            onfinishPlanOverdue: function (event, form, to, data) {
                alert('已超期完成任务')
                var report = data.report, planfsm = data.fsm, vm = data.vm
                vm.changeUIRules("finished")
            },


        }
    }, 'taskFSM', true)
    /******************************planReport公用函数(public/private),用闭包在实例间共享********************************/
    var funcSharer = (function () {
        var vm,
            publicMethods = {
                initEmployeeSelector: function (modalSelector) {
                    select.types['employeeSelectForTaskView'].onSelect = function (row) {
                        avalon.log(row)
                        vm.report.planController = row.employeeName
                        vm.report.planControllerId = row.employeeNumber
                    }
                    $(modalSelector).modal('show')
                    select.init('employeeSelectForTaskView', null, vm.$model.report)
                },
                deleteOutput: function (href, op, element) {
                    avalon.getJSON(href, function (state) {
                        if (state.success) {
                            avalon.type(op) == "function" && op();
                        }
                        else
                            alert('删除失败')
                    })
                },
                /**
                 * 从本地JSON加载report数据
                 * @param data
                 */
                loadData: function (data, remoteMode) {
                    console.log(data);
                    remoteMode
                        ? _mixFromServerJson(vm.report, data)
                        : avalon.mix(vm.report, data);
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
                            vm.$fsm.current = getFSMStateFromPlanState(vm.report.planState) || vm.$fsm.current
                            vm.refreshUIViewByAuth()
                            return true;
                        });
                    }
                    return false;
                },
                refreshUIViewByAuth: function () {
                    auth.multiTaskOpAuthAssert('当前登录用户', vm.report.$model.projectId, function () {

                    }, null, function () {
                        alert('当前登录用户没有下列任意权限：分解任务，发布任务，反馈任务')
                        vm.changeUIRules("view")
                    }, null)
                },
                /**
                 * 2015.6.5 submit路由器
                 * @param action
                 * @param $event
                 */
                buttonActionRouter: function (action, $event, notASubmit) {
                    var canSubmit = _isReportValid(vm)
                    if (notASubmit || canSubmit) {
                        ($event) && $event.preventDefault();
                        if (!notASubmit && confirm("确定要提交 " + vm.report.planCode + " 吗?") === false)
                            return;
                        var data = avalon.mix({}, vm.report.$model)
                        switch (action) {
                            case 'New':
                                if (getLoginInUserId() == vm.report.$model.planAuditorId)
                                    vm.$fsm.newPlan({report: vm.report, fsm: vm.$fsm, vm: vm});
                                else
                                    alert('登录用户不是任务指定的工作包负责人')
                                break;
                            case 'Release':
                                if (getLoginInUserId() == vm.report.$model.planAuditorId)
                                    vm.$fsm.releasePlan({report: vm.report, fsm: vm.$fsm, vm: vm});
                                else
                                    alert('登录用户不是任务指定的工作包负责人')
                                break;
                            case 'ReleaseCancel':
                                if (getLoginInUserId() == vm.report.$model.planAuditorId)
                                    vm.$fsm.cancelReleasePlan({report: vm.report, fsm: vm.$fsm, vm: vm});
                                else
                                    alert('登录用户不是任务指定的工作包负责人')
                                break;
                            case 'MarkNotFinished':
                                if (getLoginInUserId() == vm.report.$model.planControllerId)
                                    vm.$fsm.notFinishPlan({report: vm.report, fsm: vm.$fsm, vm: vm});
                                else
                                    alert('登录用户不是任务指定的负责人')
                                break;
                            case 'MarkFinishedOverdue':
                                if (getLoginInUserId() == vm.report.$model.planControllerId)
                                    vm.$fsm.finishPlanOverdue({report: vm.report, fsm: vm.$fsm, vm: vm})
                                else
                                    alert('登录用户不是任务指定的负责人')
                                break;
                            case 'MarkFinished':
                                if (getLoginInUserId() == vm.report.$model.planControllerId)
                                    vm.$fsm.finishPlan({report: vm.report, fsm: vm.$fsm, vm: vm});
                                else
                                    alert('登录用户不是任务指定的负责人')
                                break;
                            //下面是状态无关
                            case 'Delete':
                                if (getLoginInUserId() == vm.$model.report.planAuditorId) {
                                    vm.deleteSelf(function () {
                                        vm.changeUIRules("view")
                                    })
                                } else {
                                    alert('登录用户不是任务指定的工作包负责人，无法删除')
                                }
                                break;
                            case 'Change':
                                break;

                        }
                    }else{
                        alert('请完整填写必要信息')
                    }
                },
                /**
                 * 删除自身的报告
                 */
                deleteSelf: function (success) {
                    return confirm("确定要删除 " + vm.report.planCode + " 吗?") &&
                        avalon.getJSON('am/del.action', {planCode: vm.report.planCode}, function (data) {
                            if (data.success) {
                                avalon.type(success) == "function" && success()
                                alert('删除成功')
                            }
                            else {
                                alert('删除失败')
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
                    tmpl = tmpl.replace(/(ms-important=")[\S]+(")/, 'ms-important="taskReport' + vm.$reportId + '"');
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
                        avalon.mix(vm.uiDisplay, uiRulesAddtional[mode]['display']);
                        avalon.mix(vm.uiEnable, uiRulesAddtional[mode]['enable'])
                    }
                },
                /**
                 * 关闭当前Report的Tab
                 * @param $evnet
                 */
                closeReportTab: function ($evnet) {
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

        function _mixFromServerJson(report, remoteJson) {
            report.employeeId = remoteJson.employeeId
            report.employeeName = remoteJson.employeeName
            report.planCreatorId = remoteJson.planCreatorId
            report.planAuditorId = remoteJson.planAuditorId

            report.back = remoteJson.back || false
            report.projectId = remoteJson.projectId
            report.projectName = remoteJson.projectName
            report.parentPlanCode = remoteJson.parentPlanCode
            report.parentKey = remoteJson.parentKey
            report.planSerialNumber = remoteJson.planSerialNumber
            report.planCode = remoteJson.planCode
            report.planDeadlineDate = (remoteJson.planDeadlineDate || '').split(" ")[0]
            report.planIssuedDate = (remoteJson.planIssuedDate || '').split(" ")[0]
            report.planStartDate = (remoteJson.planStartDate || '').split(" ")[0]
            report.planFinishDate = (remoteJson.planFinishDate || '').split(" ")[0]
            report.planName = remoteJson.planName;
            report.planSource = remoteJson.planSource
            report.changeDetail = remoteJson.changeDetail
            report.planController = remoteJson.planController
            report.planControllerId = remoteJson.planControllerId

            report.planState = parseInt(remoteJson.planStateCode + '')
            //新的列 at 2015.5.30
            report.leaf = remoteJson.leaf || false
            report.isTask = remoteJson.isTask || false

            report.planWBS = remoteJson.planWBS
            report.planWBSAfter = remoteJson.planWBSAfter
            report.planWBSBefore = remoteJson.parentPlanCode

            report.taskContent = remoteJson.taskContent
            report.taskWeight = remoteJson.taskWeight

            report.level = remoteJson.level
        }

        function getFSMStateFromPlanState(planstate) {
            switch (planstate) {
                case 0:
                    vm.changeUIRules('new')
                    return '新建'
                    break;
                case 1:
                    vm.changeUIRules('beforeRelease')
                    return '未发布'
                    break;
                case 2:
                    vm.changeUIRules('released')
                    return '已发布'
                    break;
                case 3:
                    vm.changeUIRules('notFinished')
                    return '未完成'
                    break;
                case 4:
                    vm.changeUIRules('finished')
                    return '已完成'
                    break;
                default:
                    vm.changeUIRules('view')
                    return null
                    break;
            }
        }

        function _isAllDateValid() {
            var flag = utils.date.isDateString(vm.report.planIssuedDate) && utils.date.isDateString(vm.report.planStartDate) &&
                utils.date.isDateString(vm.report.planDeadlineDate);
            return flag;
        }

        function _isReportValid() {
            var form = document.getElementById(vm.$formId);
            //html5验证方法
            var flag = form.checkValidity ? form.checkValidity() :
                (vm.report.planCode
                && vm.report.planName &&
                _isAllDateValid(vm)
                && vm.report.planController && vm.report.planState);
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
        avalon.mix(prM, {mixCallbacks: mixCallbacks})
        executer.publicMethods = publicMethods;
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
        var report = planReports[reportId] = avalon.define("taskReport" + reportId, function (vm) {
            vm.$reportId = reportId;//唯一化UI上的formId
            vm.$formId = 'taskForm' + reportId;
            vm.$planStateTmpl = reportStateTemplate;
            //表单项
            vm.report = avalon.mix({}, emtpyReportTemplate);
            vm.planRemainingDate = 0;
            vm.uiDisplay = new$uiDisplay;
            vm.uiEnable = new$uiEnable;
            /*****************************实例公用函数**********************************************************/
            for (var key in funcSharer.publicMethods)
                vm[key] = funcSharer(vm, key);
            /*****************************创建FSM**********************************************************/
            vm.$fsm = FSM.create('taskFSM')
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
        report.report.$watch("isOpEnd", function (newValue) {
            if (newValue === true)
                avalon.mix(report.uiEnable, {
                    buttonSubmit: false,
                    buttonBack: false,
                    buttonSubmitDraft: false,
                    buttonDelete: false
                })


        })
        return report;
    }

    function _getVm(reportId) {
        if (typeof reportId == 'string' || typeof reportId == 'number') {
            var report = planReports[reportId + ''] || avalon.vmodels['taskReport' + reportId + ''];
            return report;
        }
    }

    function _delVm(reportId) {
        if (typeof reportId == 'string' || typeof reportId == 'number') {
            delete planReports[reportId + ''];
            delete avalon.vmodels["taskReport" + reportId]
        }
    }

    function validMixObj(mixobj) {
        function validBoolean(obj, variArr) {
            variArr = variArr instanceof Array ? variArr : [variArr]
            variArr.forEach(function (one) {
                if (avalon.type(obj[one]) == "string") {
                    switch (obj[one]) {
                        case "true":
                            obj[one] = true;
                            break;
                        case "false":
                            obj[one] = false;
                            break;
                    }
                }
            })

        }

        validBoolean(mixobj, ["back", "isOpEnd", "isActionItem"])
        return mixobj

    }

    /**
     * 创建一个空的report,分为行动项和任务
     * @param reportId
     * @param isActionItem
     * @returns {*}
     */
    var newReport = function (reportId, isActionItem, mixObj) {
        var report = _newVm(reportId + '_at_' + Date.now());
        report.report.isActionItem = isActionItem !== undefined ? isActionItem : true;
        report.report.planState = 0;
        //如状态是新建，自动填入启动日期
        report.report.planIssuedDate = utils.date.getCurrentDate();
        avalon.type(mixObj) === "object" && avalon.mix(report.report, validMixObj(mixObj));
        report.report.planCode = 'task' + Date.now()
        report.refreshUIViewByAuth()
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
    var openReport = function (reportId, onSuccess, mixObj) {
        var report = _getVm(reportId+'') || _newVm(reportId+'');
        report.load(reportId+'', onSuccess)
        avalon.mix(report.report, mixObj)
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
    avalon.mix(prM, {
        planReports: planReports, newReport: newReport, getReport: getReport,
        openReport: openReport, closeReport: closeReport
    });
    return prM;
    function upperFirstLetter(str) {
        return str.replace(/^[a-z]{1}/g, function (mat) {
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
