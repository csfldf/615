/**
 * Created by FeiyuLab on 2014/9/24 0024.
 * actionController 行动项负责人
 * actionAuditor    行动项目录审核人
 * actionApprover   行动项目录批准人
 */
"use strict";
define(["mmRequest", "utils", 'jquery', 'permissionMgr', 'selector', 'authorityMgr', 'simpleFSM', 'am.sessionUtil'],
    function (avalon, utils, $, pm, select, auth, FSM, sessionUtil) {
    var prM = window['prM'] = {},
        planReports = {},//{reportId:reportVM}
        uiRulesOrigin = pm.getOrigin("actionView"),
        uiRulesAddtional = pm.getAddtions("actionView")

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
            isActionItem: true,
            modifyType: "",
            back: false,
            isOpEnd: false,
            projectId: null,
            planRemainingDate: null,
            level: 2,
            leaf: 1,
            //新的属性
            actionAuditorId: null,
            actionApproverId: null,
            parentActionId: null,
            actionId: null,
            actionType: null,
            actionName: null,
            actionContent: null,
            actionDeadlineDate: null,
            actionFinishDate: null,
            actionState: 0,
            actionResource: null,
            controllerDepartment: null,
            controllerDepartmentId: null,
            actionController: null,
            actionControllerId: null,
            actionOutputExisted: [],
            remark: null,
            employeeId: null
        },
        reportStateTemplate = [
            {value: 0, text: '新建'},
            {value: 1, text: '未发布'},
            {value: 2, text: '执行中'},
            {value: 3, text: '待行动项目录负责人审核'},
            {value: 4, text: '待行动项目录批准人批准'},
            {value: 5, text: '已完成'}
        ]

    //FSM 2015.6.25
    FSM.create({
        inital: '新建',
        events: [
            {name: 'newAction', from: '新建', to: '未发布'},
            {name: 'saveActionAgain', from: '未发布', to: '未发布'},
            {name: 'releaseAction', from: '未发布', to: '执行中'},
            {name: 'auditAction0to1', from: '执行中', to: '待审批1'},
            {name: 'auditAction1to0', from: '待审批1', to: '执行中'},
            {name: 'auditAction1to2', from: '待审批1', to: '待审批2'},
            {name: 'auditAction2to1', from: '待审批2', to: '待审批1'},
            {name: 'finishAction', from: '待审批2', to: '已完成'}
        ],
        callbacks: {
            //权限检查，字段正确性检查，发出subumit请求，接受结果，决定是否继续下一步
            onbeforenewAction: function (event, form, to, data) {
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                auth.assert(vm.$model.report.actionControllerId, report.$model.projectId, '反馈行动项', function (args) {
                    //success
                    var temp = {}
                    avalon.mix(temp, report.$model)
                    temp.actionState = 1
                    temp.back = false
                    delNull(temp)
                    avalon.post('am/saveAction.action', temp, function (resp) {
                        resp = $.parseJSON(resp)
                        if (resp.success) {
                            report.actionState = 1
                            report.isOpEnd = true
                            report.back = false

                            alert('提交成功')

                            vm.$fsm.transition()
                        }
                        else {
                            alert('提交失败')
                            actionfsm.cancel()
                        }
                    })

                }, null, function (args) {
                    //fail
                    alert('没有权限操作')
                    actionfsm.cancel()

                })
                return FSM.ASYNC
            },
            //成功
            onnewAction: function (event, form, to, data) {
                alert('已新建')
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                //report.actionState=1
                vm.changeUIRules("beforeRelease")
            },
            onbeforesaveActionAgain: function (event, form, to, data) {
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.actionState = 1
                temp.back = false
                delNull(temp)
                avalon.post('am/saveAction.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.actionState = 1
                        report.isOpEnd = true
                        report.back = false

                        alert('提交成功')

                        vm.$fsm.transition()
                    }
                    else {
                        alert('提交失败')
                        actionfsm.cancel()
                    }
                })

                return FSM.ASYNC
            },
            //成功
            onsaveActionAgain: function (event, form, to, data) {
                alert('已保存')
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                //report.actionState=1
                vm.changeUIRules("beforeRelease")
            },
            onbeforereleaseAction: function (event, form, to, data) {
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.actionState = 2
                temp.back = false
                delNull(temp)
                avalon.post('am/saveAction.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.actionState = 2
                        report.isOpEnd = true
                        report.back = false

                        alert('提交成功')

                        vm.$fsm.transition()
                        //发送通知
                        sessionUtil.addMessages({
                            MessageType: '行动项发布',
                            MessageContent: report.$model.actionId,
                            MessageSource: report.$model.projectId,
                            MessageDate: utils.date.getCurrentDate(),
                            employeeId: report.$model.actionControllerId
                        }, function (data) {
                        })
                    }
                    else {
                        alert('提交失败')
                        actionfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            //成功
            onreleaseAction: function (event, form, to, data) {
                alert('已发布行动项')
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                //report.actionState=2
                vm.changeUIRules("released")
            },

            onbeforeauditAction0to1: function (event, form, to, data) {
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.actionState = 3
                temp.back = false
                temp.actionFinishDate = utils.date.getCurrentDate()
                delNull(temp)
                avalon.post('am/saveAction.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.actionState = 3
                        report.isOpEnd = true
                        report.back = false
                        report.actionFinishDate = utils.date.getCurrentDate()

                        alert('提交成功')

                        actionfsm.transition()
                        //发送通知
                        sessionUtil.addMessages({
                            MessageType: '行动项发布',
                            MessageContent: report.$model.actionId,
                            MessageSource: report.$model.projectId,
                            MessageDate: utils.date.getCurrentDate(),
                            employeeId: report.$model.actionAuditorId
                        }, function (data) {
                        })
                        //通知刷新
                        sessionUtil.refreshPsAs('action', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        actionfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            onauditAction0to1: function (event, form, to, data) {
                alert('已发起行动项目录审核人审批')
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                vm.changeUIRules("waitForAudit")
            },
            onbeforeauditAction1to0: function (event, form, to, data) {
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.actionState = 2
                temp.nextEmployeeId = temp.actionAuditorId
                temp.back = true
                temp.actionFinishDate = null
                delNull(temp)
                avalon.post('am/saveAction.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.actionState = 2
                        report.back = true
                        report.isOpEnd = true
                        report.actionFinishDate = null
                        
                        alert('提交成功')

                        actionfsm.transition()
                        //发送通知
                        sessionUtil.addMessages({
                            MessageType: '行动项审批被驳回',
                            MessageContent: report.$model.actionId,
                            MessageSource: report.$model.projectId,
                            MessageDate: utils.date.getCurrentDate(),
                            employeeId: report.$model.actionControllerId
                        }, function (data) {
                        })
                        //通知刷新
                        sessionUtil.refreshPsAs('action', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        actionfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            onauditAction1to0: function (event, form, to, data) {
                alert('已行动项目录审核人拒绝审批')
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                vm.changeUIRules("released")
            },
            onbeforeauditAction1to2: function (event, form, to, data) {
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.actionState = 4
                temp.back = false
                delNull(temp)
                avalon.post('am/saveAction.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.actionState = 4
                        report.isOpEnd = true
                        report.back = false

                        alert('提交成功')

                        actionfsm.transition()
                        //通知刷新
                        sessionUtil.refreshPsAs('action', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        actionfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            onauditAction1to2: function (event, form, to, data) {
                alert('已发起行动项目录批准人批准')
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                vm.changeUIRules("waitForApprove")
            },
            onbeforeauditAction2to1: function (event, form, to, data) {
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.actionState = 3
                temp.back = true
                temp.actionFinishDate = null
                delNull(temp)
                avalon.post('am/saveAction.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.actionState = 3
                        report.isOpEnd = true
                        report.back = true
                        report.actionFinishDate = null

                        alert('提交成功')

                        actionfsm.transition()
                        //通知刷新
                        sessionUtil.refreshPsAs('action', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        actionfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },

            onauditAction2to1: function (event, form, to, data) {
                alert('行动项目录批准人拒绝批准')
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                vm.changeUIRules("waitForAudit")
            },
            onbeforefinishAction: function (event, form, to, data) {
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                var temp = {}
                avalon.mix(temp, report.$model)
                temp.actionState = 5
                temp.back = false
                delNull(temp)
                avalon.post('am/saveAction.action', temp, function (resp) {
                    resp = $.parseJSON(resp)
                    if (resp.success) {
                        report.actionState = 5
                        report.isOpEnd = true
                        report.back = false

                        alert('提交成功')

                        actionfsm.transition()
                        //通知刷新
                        sessionUtil.refreshPsAs('action', 'update', temp)
                    }
                    else {
                        alert('提交失败')
                        actionfsm.cancel()
                    }
                })
                return FSM.ASYNC
            },
            onfinishAction: function (event, form, to, data) {
                alert('已完成')
                var report = data.report, actionfsm = data.fsm, vm = data.vm
                vm.changeUIRules("finished")
            }
        }
    }, 'actionFSM')
    /******************************planReport公用函数(public/private),用闭包在实例间共享********************************/
    var funcSharer = (function () {
        var vm,
            publicMethods = {
                initEmployeeSelector: function (modalSelector) {
                    select.types['controllerSelectForAction'].onSelect = function (row) {
                        avalon.log(row)
                        vm.report.actionController = row.employeeName
                        vm.report.actionControllerId = row.employeeNumber
                    }
                    $(modalSelector).modal('show')
                    select.init('controllerSelectForAction')

                },
                initDepartmentSelector: function (modalSelector) {
                    select.types['departmentSelectForAction'].onSelect = function (row) {
                        avalon.log(row)
                        vm.report.controlDepartment = row.name
                        vm.report.controlDepartmentId = row.id
                    }
                    $(modalSelector).modal('show')
                    select.init('departmentSelectForAction')
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
                        avalon.getJSON('am/getAction.action?actionId=' + reportId, function (data) {
                            avalon.log(data)
                            if (typeof onSuccess == 'function') {
                                onSuccess()
                                vm.executeCallback("onLoadSuccess")
                            }
                            _mixFromServerJson(vm.report, data)
                            vm.$fsm.current = getFSMStateFromPlanState(vm.$model.report.actionState) || vm.$fsm.current
                            vm.refreshUIViewByAuth()
                            return true;
                        });
                    }
                    return false;
                },
                refreshUIViewByAuth: function () {
                    auth.multiActionOpAuthAssert('当前登录用户', vm.report.$model.projectId, function () {
                        if (getLoginInUserId() != vm.$model.report.actionControllerId) {
                            vm.uiDisplay.actionOutputDeleteArea = false
                            alert('注意：当前登录用户没有权限删除成果物')
                        }
                    }, null, function () {
                        alert('当前登录用户没有下列任意权限：增加行动项，发布行动项，删除行动项')
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
                        if (!notASubmit && confirm("确定要提交 " + vm.report.actionId + " 吗?") === false)
                            return;
                        var data = avalon.mix({}, vm.report.$model)
                        switch (action) {
                            case 'New':
                                auth.assert(vm.$model.report.actionControllerId, vm.$model.report.projectId, '新建行动项', function () {
                                    vm.$fsm.newAction({report: vm.report, fsm: vm.$fsm, vm: vm});
                                }, null, function () {
                                    alert('当前登录用户没有下列权限，访问拒绝：新建行动项')
                                })
                                break;
                            case 'SaveAgain':
                                if (getLoginInUserId() == vm.$model.report.actionAuditorId)
                                    vm.$fsm.saveActionAgain({report: vm.report, fsm: vm.$fsm, vm: vm});
                                else
                                    alert('当前用户不是此行动项指定的目录审核人')
                                break;
                            case 'Release':
                                if (getLoginInUserId() == vm.$model.report.actionAuditorId)
                                    vm.$fsm.releaseAction({report: vm.report, fsm: vm.$fsm, vm: vm});
                                else
                                    alert('当前用户不是此行动项指定的目录审核人')
                                break;
                            case 'Audit12':
                                //判断当前角色是否是行动项负责人
                                if (vm.report.actionControllerId == getLoginInUserId()) {
                                    vm.$fsm.auditAction0to1({report: vm.report, fsm: vm.$fsm, vm: vm});
                                } else {
                                    alert('当前用户不是此行动项指定的负责人')
                                }
                                break;
                            case 'Audit21':
                                //判断当前角色是否是目录负责人
                                if (vm.report.actionAuditorId == getLoginInUserId()) {
                                    vm.$fsm.auditAction1to0({report: vm.report, fsm: vm.$fsm, vm: vm});
                                } else {
                                    alert('当前用户不是此行动项指定的目录审核人')
                                }
                                break;
                            case 'Audit23':
                                //判断当前角色是否是目录负责人
                                if (vm.report.actionAuditorId == getLoginInUserId()) {
                                    vm.$fsm.auditAction1to2({report: vm.report, fsm: vm.$fsm, vm: vm});
                                } else {
                                    alert('当前用户不是此行动项指定的目录审核人')
                                }
                                break;
                            case 'Audit32':
                                //判断当前角色是否是目录批准人
                                if (vm.report.actionApproverId == getLoginInUserId()) {
                                    vm.$fsm.auditAction2to1({report: vm.report, fsm: vm.$fsm, vm: vm});
                                } else {
                                    alert('当前用户不是此行动项指定的目录批准人')
                                }
                                break;
                            case 'Audit34':
                                //判断当前角色是否是目录批准人
                                if (vm.report.actionApproverId == getLoginInUserId()) {
                                    vm.$fsm.finishAction({report: vm.report, fsm: vm.$fsm, vm: vm});
                                } else {
                                    alert('当前用户不是此行动项指定的目录批准人')
                                }
                                break;
                            //下面是状态无关
                            case 'Delete':
                                if (getLoginInUserId() == vm.report.actionAuditorId) {
                                    vm.deleteSelf(function () {
                                        vm.changeUIRules("view")
                                    })
                                } else {
                                    alert('当前用户不是此行动项指定的目录审核人，无法删除')
                                }
                                break;
                            case 'SavePlan':

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
                    return confirm("确定要删除 " + vm.report.actionId + " 吗?") &&
                        avalon.getJSON('am/delAction.action', {actionId: vm.report.actionId}, function (data) {
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
                 * 删除草稿自身
                 */
                deleteDraftSelf: function () {
                    confirm("确定要删除 " + vm.report.actionId + " 草稿吗?") &&
                    avalon.getJSON('am/delPlanScript.action',
                        {employeeId: getLoginInUserId(), actionId: vm.report.actionId}, function (data) {
                            if (data.success) {
                                alert('删除草稿成功')
                            }
                            else {
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
                    tmpl = tmpl.replace(/(ms-important=")[\S]+(")/, 'ms-important="actionReport' + vm.$reportId + '"');
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

        function getFSMStateFromPlanState(planstate) {
            var id = getLoginInUserId()
            vm.changeUIRules('view')
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
                    return '执行中'
                    break;
                case 3:
                    vm.changeUIRules('waitForAudit')
                    return '待审批1'
                    break;
                case 4:
                    vm.changeUIRules('waitForApprove')
                    return '待审批2'
                    break;
                case 5:
                    vm.changeUIRules('finished')
                    return '已完成'
                    break;
                default:
                    return null
                    break;
            }
        }

        function _mixFromServerJson(report, remoteJson) {
            report.employeeId = remoteJson.employeeId
            //report.employeeName = remoteJson.employeeName
            report.actionApproverId = remoteJson.actionApproverId
            report.actionAuditorId = remoteJson.actionAuditorId

            report.leaf = remoteJson.leaf
            report.level = remoteJson.level

            report.controllerDepartment = remoteJson.controllerDepartment
            report.controllerDepartmentId = remoteJson.controllerDepartmentId
            report.level = remoteJson.level
            report.isActionItem = remoteJson.leaf

            report.back = remoteJson.back || false
            report.projectId = remoteJson.projectId
            report.parentActionId = remoteJson.parentActionId
            report.actionId = remoteJson.actionId
            report.actionDeadlineDate = (remoteJson.actionDeadlineDate || '').split(" ")[0]
            report.actionFinishDate = (remoteJson.actionFinishDate || '').split(" ")[0]
            report.actionName = remoteJson.actionName;
            report.actionContent = remoteJson.actionContent
            report.actionResource = remoteJson.actionResource
            report.actionType = remoteJson.actionType
            report.remark = remoteJson.remark
            report.actionController = remoteJson.actionController
            report.actionControllerId = remoteJson.actionControllerId

            report.actionOutputExisted = report.actionOutputExisted || []
            report.actionOutputExisted.clear()

            avalon.type(remoteJson.planOutput) == "array" &&
            remoteJson.planOutput.forEach(function (one) {
                report.actionOutputExisted.push({
                    name: one.fileName,
                    downloadHref: one.fileHref || 'javascript:void(0)',
                    deleteHref: one.fileDelHref || 'javascript:void(0)',
                    uploadDate: (one.uploadDateString || '').split(" ")[0]
                })
            })
            report.actionState = parseInt(remoteJson.actionState + '')
        }

        function _isAllDateValid() {
            var flag = utils.date.isDateString(vm.report.actionFinishDate) &&
                utils.date.isDateString(vm.report.actionDeadlineDate);
            return flag;
        }

        function _isReportValid() {
            var form = document.getElementById(vm.$formId);
            //html5验证方法
            var flag = form.checkValidity ? form.checkValidity() : ( vm.report.actionId && vm.report.actionName &&
            _isAllDateValid(vm) && vm.report.actionResource && vm.report.actionController && vm.report.actionState );
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
        var report = planReports[reportId] = avalon.define("actionReport" + reportId, function (vm) {
            vm.$reportId = reportId;//唯一化UI上的formId
            vm.$formId = 'actionForm' + reportId;
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
            vm.$fsm = FSM.create('actionFSM')
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
            var report = planReports[reportId + ''] || avalon.vmodels['planReport' + reportId + ''];
            return report;
        }
    }

    function _delVm(reportId) {
        if (typeof reportId == 'string' || typeof reportId == 'number') {
            delete planReports[reportId + ''];
            delete avalon.vmodels["planReport" + reportId]
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
     * 创建一个空的report,分为行动项和计划
     * @param reportId
     * @param isActionItem
     * @returns {*}
     */
    var newReport = function (reportId, isActionItem, mixObj) {
        var report = _newVm(reportId + '_at_' + Date.now());
        report.report.isActionItem = isActionItem !== undefined ? isActionItem : true;
        report.report.actionState = 0;
        report.$fsm.current = '新建'
        avalon.type(mixObj) === "object" && avalon.mix(report.report, validMixObj(mixObj));
        //如状态是新建，自动填入启动日期
        //report.report.planIssuedDate=utils.date.getCurrentDate();
        report.report.actionId = 'action' + Date.now()
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
