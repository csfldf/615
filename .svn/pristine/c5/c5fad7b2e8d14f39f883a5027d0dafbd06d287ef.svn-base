/**
 * Created by FeiyuLab on 2014/9/24 0024.
 * planController 项目经理
 * planCreator 项目经理
 * planAuditor 项目领导
 */
"use strict";
define(["mmRequest", "utils", 'jquery', 'permissionMgr', 'selector', 'simpleFSM', 'authorityMgr', 'am.sessionUtil'],
    function (avalon, utils, $, pm, select, FSM, auth, sessionUtil) {
        var prM = window['prM'] = {},
            planReports = {},//{reportId:reportVM}
            uiRulesOrigin = pm.getOrigin("planView"),
            uiRulesAddtional = pm.getAddtions("planView");

        function getLoginInUserId() {
            var userid = null;
            require('Login', function (login) {
                if (login.isLogin)
                    userid = login.loginId
            });
            return userid
        }

        function getLoginInUserName() {
            var user = null;
            require('Login', function (login) {
                if (login.isLogin)
                    user = login.loginName
            });
            return user
        }

        var emtpyReportTemplate = {
                isActionItem: true, modifyType: null, back: false, isOpEnd: false,
                projectId: null, projectName: null,
                planControllerId: null, planController: null,
                planKey: null, parentKey: null, parentPlanCode: null,
                planAuditorId: null, planCreatorId: null, employeeId: null,
                planSerialNumber: null, planCode: null, planName: null,
                planIssuedDate: null, planDeadlineDate: null,
                planStartDate: null, planFinishDate: null, planSource: null,
                planState: 0, changeDetail: '', oldChangeDetail: '',

                planWBS: null, planWBSBefore: null, planWBSAfter: null,
                remainingHour: null, remainingPeriod: null, remainingDuration: null,
                spi: 0.0, completePercentage: 0.0,
                controlDepartment: null, controlDepartmentId: null,
                group: null, groupId: null,
                budget: 0.0, cashFlow: null, cashSource: null, cashSubject: null, cashReal: 0.0,
                leaf: true, isTask: 0, level: 0
            },
            reportStateTemplate = [
                {value: 0, text: '新建'},
                {value: 1, text: '未发布'},
                {value: 2, text: '已发布'},
                {value: 3, text: '组长请求/等待项目经理审批'},
                {value: 4, text: '组长请求/等待项目领导审批'},
                {value: 5, text: '项目经理请求/等待项目领导审批'},
                {value: 6, text: '已完成'}
            ];

        function appendChangeApplication(oldApp, op, changeContent) {
            var content = '';
            switch (op) {
                case 'apply':
                    content = '操作: ' + getLoginInUserName() + '(ID:'+getLoginInUserId()+')'+ '申请变更' + '\n';
                    content += '时间: '+(new Date()).toLocaleString()+'\n';
                    content += '内容: ' + (changeContent || '') + '\n';
                    break;
                case 'agree':
                    content = '操作: ' +getLoginInUserName() + '(ID:'+getLoginInUserId()+')'+ '操作变更' + '\n';
                    content += '时间: '+(new Date()).toLocaleString()+'\n';
                    content += '内容: 由 ' + (getLoginInUserName() || '') + '(ID:'+getLoginInUserId()+')'+ ' 通过。批示为 '+(changeContent || '')+'\n';
                    break;
                case 'disagree':
                    content = '操作: ' +getLoginInUserName() + '(ID:'+getLoginInUserId()+')'+ '操作变更' + '\n';
                    content += '时间: '+(new Date()).toLocaleString()+'\n';
                    content += '内容: 由 ' + (getLoginInUserName() || '') + '(ID:'+getLoginInUserId()+')'+ ' 否决。。批示为 '+(changeContent || '')+'\n';
                    break;
            }
            return  content + '\n' + (oldApp || '');
        }

        //FSM 2015.5.30
        FSM.create({
            initial: '新建',
            events: [
                {name: 'newPlan', from: '新建', to: '未发布'},
                {name: 'releasePlan', from: '未发布', to: '已发布'},
                {name: 'cancelReleasePlan', from: '已发布', to: '未发布'},
                {name: 'auditPlan0to1', from: '已发布', to: '待审批1'},
                {name: 'rejectPlan0to1', from: '待审批1', to: '已发布'},
                {name: 'auditPlan1to2', from: '待审批1', to: '待审批2'},
                {name: 'rejectPlan1to2', from: '待审批2', to: '待审批1'},
                {name: 'auditPlan0to2', from: '已发布', to: '待审批2'},
                {name: 'rejectPlan0to2', from: '待审批2', to: '已发布'},
                {name: 'auditPlan2to0', from: '待审批2', to: '已发布'},
                {name: 'finishPlan', from: '已发布', to: '已完成'}
            ],
            callbacks: {
                //权限检查，字段正确性检查，发出subumit请求，接受结果，决定是否继续下一步
                onbeforenewPlan: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    auth.authAssertByRole(vm.$model.report.planAuditorId, vm.report.$model.projectId,
                        'ProjectLeader', function (args) {
                            auth.authAssertByRole(vm.$model.report.planControllerId, vm.report.$model.projectId,
                                'Manager', function (args) {
                                    var temp = {};
                                    avalon.mix(temp, report.$model);
                                    temp.planState = 1;
                                    temp.planFinishDate = utils.date.getCurrentDate();
                                    delNull(temp);
                                    avalon.post('am/savePlan.action', temp, function (resp) {
                                        resp = $.parseJSON(resp);
                                        if (resp.success) {
                                            report.planState = 1;
                                            report.isOpEnd = true;
                                            report.planFinishDate = utils.date.getCurrentDate();

                                            alert('提交成功');
                                            vm.$fsm.transition()
                                        }
                                        else {
                                            alert('提交失败');
                                            planfsm.cancel()
                                        }
                                    })

                                }, null, function () {
                                    alert('该计划指定的计划负责人（项目经理）不符合角色定义');
                                    planfsm.cancel()
                                })
                        }, null, function () {
                            alert('该计划指定的项目领导不符合角色定义');
                            planfsm.cancel()
                        });
                    return FSM.ASYNC
                },
                //成功
                onnewPlan: function (event, form, to, data) {
                    alert('已新建');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    report.planState = 1;
                    //vm.changeUIRules("beforeRelease")
                    vm.load(report.$model.planCode)
                },
                onbeforereleasePlan: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    var temp = {};
                    avalon.mix(temp, report.$model);
                    temp.planState = 2;
                    temp.planStartDate = utils.date.getCurrentDate();
                    delNull(temp);
                    avalon.post('am/savePlan.action', temp, function (resp) {
                        resp = $.parseJSON(resp);
                        if (resp.success) {
                            report.planState = 2;
                            report.isOpEnd = true;
                            report.planStartDate = utils.date.getCurrentDate();

                            alert('提交成功');

                            planfsm.transition()
                        }
                        else {
                            alert('提交失败');
                            planfsm.cancel()
                        }
                    });
                    return FSM.ASYNC
                },
                onreleasePlan: function (event, form, to, data) {
                    alert('已发布');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    report.planState = 2;
                    //vm.changeUIRules("released")
                    vm.load(report.$model.planCode)
                },
                onbeforefinishPlan: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    var temp = {};
                    avalon.mix(temp, report.$model);
                    temp.planState = 6;
                    delNull(temp);
                    avalon.post('am/savePlan.action', temp, function (resp) {
                        resp = $.parseJSON(resp);
                        if (resp.success) {
                            report.planState = 6;
                            report.isOpEnd = true;

                            alert('提交成功');

                            planfsm.transition()
                        }
                        else {
                            alert('提交失败');
                            planfsm.cancel()
                        }
                    });
                    return FSM.ASYNC
                },
                onfinishPlan: function (event, form, to, data) {
                    alert('已完成');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    //vm.changeUIRules("finished")
                    vm.load(report.$model.planCode)
                },
                onbeforecancelReleasePlan: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    var temp = {};
                    avalon.mix(temp, report.$model);
                    temp.planState = 1;
                    temp.back = false;
                    temp.planStartDate = null;
                    delNull(temp);
                    avalon.post('am/savePlan.action', temp, function (resp) {
                        resp = $.parseJSON(resp);
                        if (resp.success) {
                            report.planState = 1;
                            report.isOpEnd = true;
                            report.back = true;
                            temp.planStartDate = null;

                            alert('提交成功');

                            planfsm.transition()
                        }
                        else {
                            alert('提交失败');
                            planfsm.cancel()
                        }
                    });
                    return FSM.ASYNC
                },
                oncancelReleasePlan: function (event, form, to, data) {
                    alert('已取消发布');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    //vm.changeUIRules("beforeRelease")
                    vm.load(report.$model.planCode)
                },
                onbeforeauditPlan0to1: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    var temp = {};
                    avalon.mix(temp, report.$model);
                    temp.planState = 3;
                    temp.back = false;
                    temp.changeDetail = appendChangeApplication(temp.oldChangeDetail,'apply',temp.changeDetail);
                    delNull(temp);
                    avalon.post('am/savePlan.action', temp, function (resp) {
                        resp = $.parseJSON(resp);
                        if (resp.success) {
                            report.planState = 3;
                            report.isOpEnd = true;
                            report.back = false;

                            alert('提交成功');

                            planfsm.transition()
                        }
                        else {
                            alert('提交失败');
                            planfsm.cancel()
                        }
                    });
                    return FSM.ASYNC
                },
                onauditPlan0to1: function (event, form, to, data) {
                    alert('已等待项目经理审批');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    //vm.changeUIRules("audit01")
                    vm.load(report.$model.planCode)
                },
                onbeforerejectPlan0to1: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    var temp = {};
                    avalon.mix(temp, report.$model);
                    temp.planState = 2;
                    temp.back = true;
                    temp.changeDetail = appendChangeApplication(temp.oldChangeDetail,'disagree',temp.changeDetail);
                    delNull(temp);
                    avalon.post('am/savePlan.action', temp, function (resp) {
                        resp = $.parseJSON(resp);
                        if (resp.success) {
                            report.planState = 2;
                            report.isOpEnd = true;
                            report.back = true;

                            alert('提交成功');

                            planfsm.transition()
                        }
                        else {
                            alert('提交失败');
                            planfsm.cancel()
                        }
                    });
                    return FSM.ASYNC
                },
                onrejectPlan0to1: function (event, form, to, data) {
                    alert('项目经理已拒绝审批');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    //vm.changeUIRules("released")
                    vm.load(report.$model.planCode)
                },
                onbeforeauditPlan1to2: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    var temp = {};
                    avalon.mix(temp, report.$model);
                    temp.planState = 4;
                    temp.back = false;
                    temp.changeDetail = appendChangeApplication(temp.oldChangeDetail,'agree',temp.changeDetail);
                    delNull(temp);
                    avalon.post('am/savePlan.action', temp, function (resp) {
                        resp = $.parseJSON(resp);
                        if (resp.success) {
                            report.planState = 4;
                            report.isOpEnd = true;
                            temp.back = false;

                            alert('提交成功');

                            planfsm.transition()
                        }
                        else {
                            alert('提交失败');
                            planfsm.cancel()
                        }
                    });
                    return FSM.ASYNC
                },
                onauditPlan1to2: function (event, form, to, data) {
                    alert('已等待项目领导审批2');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    //vm.changeUIRules("audit12")
                    vm.load(report.$model.planCode)
                },
                onbeforerejectPlan1to2: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    var temp = {};
                    avalon.mix(temp, report.$model);
                    temp.planState = 3;
                    temp.back = true;
                    delNull(temp);
                    temp.changeDetail = appendChangeApplication(temp.oldChangeDetail,'disagree',temp.changeDetail);
                    avalon.post('am/savePlan.action', temp, function (resp) {
                        resp = $.parseJSON(resp);
                        if (resp.success) {
                            report.planState = 3;
                            report.isOpEnd = true;
                            report.back = true;

                            alert('提交成功');

                            planfsm.transition()
                        }
                        else {
                            alert('提交失败');
                            planfsm.cancel()
                        }
                    });
                    return FSM.ASYNC
                },
                onrejectPlan1to2: function (event, form, to, data) {
                    alert('项目领导已拒绝审批2');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    //vm.changeUIRules("audit01")
                    vm.load(report.$model.planCode)
                },
                onbeforeauditPlan0to2: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    var temp = {};
                    avalon.mix(temp, report.$model);
                    temp.planState = 5;
                    temp.back = false;
                    temp.changeDetail = appendChangeApplication(temp.oldChangeDetail,'apply',temp.changeDetail);
                    delNull(temp);
                    avalon.post('am/savePlan.action', temp, function (resp) {
                        resp = $.parseJSON(resp);
                        if (resp.success) {
                            report.planState = 5;
                            report.isOpEnd = true;
                            report.back = false;

                            alert('提交成功');

                            planfsm.transition()
                        }
                        else {
                            alert('提交失败');
                            planfsm.cancel()
                        }
                    });
                    return FSM.ASYNC
                },
                onauditPlan0to2: function (event, form, to, data) {
                    alert('已等待项目领导审批1');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    //vm.changeUIRules("audit02")
                    vm.load(report.$model.planCode)
                },
                onbeforerejectPlan0to2: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    var temp = {};
                    avalon.mix(temp, report.$model);
                    temp.planState = 2;
                    temp.back = true;
                    temp.changeDetail = appendChangeApplication(temp.oldChangeDetail,'disagree',temp.changeDetail);
                    delNull(temp);
                    avalon.post('am/savePlan.action', temp, function (resp) {
                        resp = $.parseJSON(resp);
                        if (resp.success) {
                            report.planState = 2;
                            report.isOpEnd = true;
                            report.back = true;

                            alert('提交成功');

                            planfsm.transition()
                        }
                        else {
                            alert('提交失败');
                            planfsm.cancel()
                        }
                    });
                    return FSM.ASYNC
                },
                onrejectPlan0to2: function (event, form, to, data) {
                    alert('项目领导已拒绝审批1');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    //vm.changeUIRules("released")
                    vm.load(report.$model.planCode)
                },
                onbeforeauditPlan2to0: function (event, form, to, data) {
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    var temp = {};
                    avalon.mix(temp, report.$model);
                    temp.planState = 2;
                    temp.changeDetail = appendChangeApplication(temp.oldChangeDetail,'agree',temp.changeDetail);
                    delNull(temp);
                    avalon.post('am/savePlan.action', temp, function (resp) {
                        resp = $.parseJSON(resp);
                        if (resp.success) {
                            report.planState = 2;
                            report.isOpEnd = true;

                            alert('提交成功');

                            planfsm.transition()
                        }
                        else {
                            alert('提交失败');
                            planfsm.cancel()
                        }
                    });
                    return FSM.ASYNC
                },

                onauditPlan2to0: function (event, form, to, data) {
                    alert('项目领导已审批成功');
                    var report = data.report, planfsm = data.fsm, vm = data.vm;
                    //vm.changeUIRules("released")
                    vm.load(report.$model.planCode)
                }
            }
        }, 'planFSM', true);
        /******************************planReport公用函数(public/private),用闭包在实例间共享********************************/
        var funcSharer = (function () {
            var vm,
                publicMethods = {
                    initEmployeeSelector: function (modalSelector) {
                        select.types['employeeSelectForPlanView'].onSelect = function (row) {
                            avalon.log(row);
                            vm.report.planController = row.employeeName;
                            vm.report.planControllerId = row.employeeNumber;
                            vm.report.planCreatorId = row.employeeNumber
                        };
                        $(modalSelector).modal('show');
                        select.init('employeeSelectForPlanView', null, vm.$model.report)
                    },
                    initDepartmentSelector: function (modalSelector) {
                        select.types['departmentSelectForPlanView'].onSelect = function (row) {
                            avalon.log(row);
                            vm.report.controlDepartment = row.id;
                            vm.report.controlDepartmentId = row.name
                        };
                        $(modalSelector).modal('show');
                        select.init('departmentSelectForPlanView', null, vm.$model.report)
                    },
                    initGroupSelector: function (modalSelector) {
                        select.types['groupSelectForPlanView'].onSelect = function (row) {
                            avalon.log(row);
                            vm.report.group = row.groupName;
                            vm.report.groupId = row.groupId
                        };
                        $(modalSelector).modal('show');
                        select.init('groupSelectForPlanView')

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
                    load: function (reportId, onSuccess,mixObj,getDataFromRemote) {
                        if (typeof reportId == 'string' ) {
                            if(getDataFromRemote == true) {
                                avalon.getJSON('am/get.action?planCode=' + reportId, function (data) {
                                    avalon.log(data);
                                    if (typeof onSuccess == 'function') {
                                        onSuccess(vm);
                                        vm.executeCallback("onLoadSuccess")
                                    }
                                    _mixFromServerJson(vm.report, data);
                                })
                            }else if(avalon.type(mixObj)=='object') {
                                _mixFromServerJson(vm.report, mixObj);
                            }else
                                return false;
                            vm.report.changeDetail = ''
                            vm.$fsm.current = getFSMStateFromPlanState(vm.report.planState) || vm.$fsm.current;
                            vm.refreshButtonViewByAuth();
                            vm.refreshUIViewByAuth();
                            return true;
                        }
                        return false;
                    },
                    //11.12：按照最新的工作包/工作包目录定义
                    setAsPackage: function(){
                        vm.report.leaf = true;
                        vm.report.isTask = 0
                    },
                    setAsPackageDir: function(){
                        vm.report.leaf = false;
                        vm.report.isTask = 0
                    },
                    isPackage:function(){
                        return vm.report.leaf == true
                    },
                    refreshButtonViewByAuth:function() {
                        //auth12,auth02
                        if(((vm.$model.report.planState == 4 || vm.$model.report.planState == 5)
                            && vm.$model.report.planAuditorId != getLoginInUserId()) ||
                                //auth01
                            (vm.$model.report.planState == 3
                            && vm.$model.report.planControllerId != getLoginInUserId())
                        ){
                            vm.uiDisplay.buttonModifyAgree = vm.uiDisplay.buttonModifyReject = false
                        }
                    },
                    refreshUIViewByAuth: function () {
                        auth.multiOpAuthAssert('当前登录用户', vm.report.$model.projectId, function () {

                        }, null, function () {
                            alert('当前登录用户没有下列任意权限：增加计划，发布计划，变更计划，审核计划');
                            vm.changeUIRules("view")
                        }, null)
                    },
                    releasePlanWithParameter: function (report) {
                        if (getLoginInUserId() == report.planControllerId)
                            vm.$fsm.releasePlan({report: report, fsm: vm.$fsm, vm: vm});
                        else
                            alert('当前登录用户不是该计划 '+report.planName+' 的负责人');
                    },
                    /**
                     * 2015.6.5 submit路由器
                     * @param action
                     * @param $event
                     */
                    buttonActionRouter: function (action, $event, notASubmit) {
                        var canSubmit = _isReportValid(vm);
                        if (notASubmit || canSubmit) {
                            ($event) && $event.preventDefault();
                            if (!notASubmit && confirm("确定要提交 " + vm.report.planCode + " 吗?") === false)
                                return;
                            var data = avalon.mix({}, vm.report.$model);
                            switch (action) {
                                case 'New':
                                    auth.assert('当前登录用户', vm.report.$model.projectId, '新建计划', function (args) {
                                        vm.$fsm.newPlan({report: vm.report, fsm: vm.$fsm, vm: vm});
                                    }, null, function () {
                                        alert('当前登录用户没有下列权限，访问拒绝：新建计划')
                                    });
                                    break;
                                case 'Release':
                                    if (getLoginInUserId() == vm.$model.report.planControllerId)
                                        vm.$fsm.releasePlan({report: vm.report, fsm: vm.$fsm, vm: vm});
                                    else
                                        alert('当前登录用户不是该计划的负责人');
                                    break;
                                case 'ReleaseCancel':
                                    if (getLoginInUserId() == vm.$model.report.planControllerId)
                                        vm.$fsm.cancelReleasePlan({report: vm.report, fsm: vm.$fsm, vm: vm});
                                    else
                                        alert('登录用户不是该计划的负责人');
                                    break;
                                case 'ModifyApply':
                                    //判断当前角色选择01 or 12
                                    if(getLoginInUserId() == vm.$model.report.planControllerId){
                                        vm.$fsm.auditPlan0to2({report: vm.report, fsm: vm.$fsm, vm: vm});
                                    }else{
                                        auth.authAssertByRole('当前登录用户', vm.report.$model.projectId, 'TeamLeader', function () {
                                            vm.$fsm.auditPlan0to1({report: vm.report, fsm: vm.$fsm, vm: vm});
                                        }, null, function () {
                                            alert('登录用户的角色不是组长，拒绝访问')
                                        },function () {
                                            alert('登录用户的角色不是项目经理，拒绝访问')
                                        });
                                    }
                                    /*auth.authAssertByRole('当前登录用户', vm.report.$model.projectId, 'TeamLeader', function () {
                                        vm.$fsm.auditPlan0to1({report: vm.report, fsm: vm.$fsm, vm: vm});
                                    }, null, function () {
                                        auth.authAssertByRole('当前登录用户', vm.report.$model.projectId, 'Manager', function () {
                                            if (getLoginInUserId() == vm.$model.report.planControllerId)
                                                vm.$fsm.auditPlan0to2({report: vm.report, fsm: vm.$fsm, vm: vm});
                                            else
                                                alert('登录用户的角色不是项目经理，拒绝访问')
                                        }, null, function () {
                                            alert('登录用户的角色不是组长/项目经理，拒绝访问')
                                        }, null)
                                    });*/
                                    break;
                                case 'ModifyAgree':
                                    if (vm.report.planState == 3) {
                                        if (getLoginInUserId() == vm.$model.report.planControllerId)
                                            vm.$fsm.auditPlan1to2({report: vm.report, fsm: vm.$fsm, vm: vm});
                                        else
                                            alert('登录用户不是该计划的负责人')
                                    } else if (vm.report.planState == 5 || vm.report.planState == 4) {
                                        if (getLoginInUserId() == vm.$model.report.planAuditorId)
                                            vm.$fsm.auditPlan2to0({report: vm.report, fsm: vm.$fsm, vm: vm});
                                        else
                                            alert('登录用户不是该计划的指定的项目领导')
                                    }
                                    break;
                                case 'ModifyReject':
                                    if (vm.report.planState == 3) {
                                        if (getLoginInUserId() == vm.$model.report.planControllerId)
                                            vm.$fsm.rejectPlan0to1({report: vm.report, fsm: vm.$fsm, vm: vm});
                                        else
                                            alert('登录用户不是该计划的负责人')
                                    } else if (vm.report.planState == 4) {
                                        if (getLoginInUserId() == vm.$model.report.planAuditorId)
                                            vm.$fsm.rejectPlan1to2({report: vm.report, fsm: vm.$fsm, vm: vm});
                                        else
                                            alert('登录用户不是该计划的指定的项目领导')
                                    } else if (vm.report.planState == 5) {
                                        if (getLoginInUserId() == vm.$model.report.planAuditorId)
                                            vm.$fsm.rejectPlan0to2({report: vm.report, fsm: vm.$fsm, vm: vm});
                                        else
                                            alert('登录用户不是该计划的指定的项目领导')
                                    }
                                    //vm.$fsm.newPlan({report:vm.report,fsm:vm.$fsm,vm:vm});
                                    break;
                                case 'MarkFinished':
                                    if (getLoginInUserId() == vm.$model.report.planControllerId)
                                        vm.$fsm.finishPlan({report: vm.report, fsm: vm.$fsm, vm: vm});
                                    else
                                        alert('登录用户不是该计划的负责人');
                                    break;
                                //下面是状态无关
                                case 'Delete':
                                    if (getLoginInUserId() == vm.$model.report.planControllerId) {
                                        vm.deleteSelf(function () {
                                            vm.changeUIRules("view")
                                        })

                                    } else {
                                        alert('登录用户不是该计划的负责人，无法删除')
                                    }
                                    break;
                                case 'NewChildPlan':
                                    window.location.href = "#!/am/plan/新子计划/new/#" +
                                        "projectId=" + vm.report.$model.projectId +
                                        "&projectName=" + vm.report.$model.projectName +
                                        "&planCreatorId=" + vm.report.$model.planCreatorId +
                                        "&planControllerId=" + vm.report.$model.planControllerId +
                                        "&planController=" + vm.report.$model.planController +
                                        "&planAuditorId=" + vm.report.$model.planAuditorId +
                                        "&parentKey=" + vm.report.$model.planKey +
                                        "&parentPlanCode=" + vm.report.$model.planCode +
                                        "&level=" + (vm.report.$model.level + 1);
                                    break;
                                case 'NewPackage':
                                    window.location.href = "#!/am/package/新工作包/new/#" +
                                        "projectId=" + vm.report.$model.projectId +
                                        "&projectName=" + vm.report.$model.projectName +
                                        "&planAuditorId=" + vm.report.$model.planAuditorId +
                                        "&planCreatorId=" + vm.report.$model.planControllerId +
                                        "&parentPlanCode=" + vm.report.$model.planCode +
                                        "&parentKey=" + vm.report.$model.planKey +
                                        "&level=" + (vm.report.$model.level + 1);

                                    break;

                            }
                        } else {
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
                                    avalon.type(success) == "function" && success();
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
                        var func = callbacks[callbackName];
                        if (avalon.type(func) == "function") {
                            avalon.log("execute Callback " + callbackName);
                            func(vm)
                        }
                    }
                };

            function _mixFromServerJson(report, remoteJson) {
                report.employeeId = remoteJson.employeeId;
                report.projectId = remoteJson.projectId;
                report.projectName = remoteJson.projectName;
                report.employeeName = remoteJson.employeeName;
                report.planCreatorId = remoteJson.planCreatorId;
                report.planAuditorId = remoteJson.planAuditorId;

                report.back = remoteJson.back || false;

                report.planSerialNumber = remoteJson.planSerialNumber;
                report.planCode = remoteJson.planCode;
                report.planDeadlineDate = (remoteJson.planDeadlineDate || '').split(" ")[0];
                report.planIssuedDate = (remoteJson.planIssuedDate || '').split(" ")[0];
                report.planStartDate = (remoteJson.planStartDate || '').split(" ")[0];
                report.planFinishDate = (remoteJson.planFinishDate || '').split(" ")[0];
                report.planName = remoteJson.planName;
                report.planSource = remoteJson.planSource;
                report.oldChangeDetail = remoteJson.changeDetail || '';
                report.planController = remoteJson.planController;
                report.planControllerId = remoteJson.planControllerId;
                report.planState = parseInt(remoteJson.planStateCode + '');
                //新的列 at 2015.5.30
                report.budget = remoteJson.budget;
                report.cashFlow = remoteJson.cashFlow;
                report.cashReal = remoteJson.cashReal;
                report.cashSource = remoteJson.cashSource;
                report.cashSubject = remoteJson.cashSubject;
                report.completePercentage = remoteJson.completePercentage;
                report.controlDepartment = remoteJson.controlDepartment;
                report.controlDepartmentId = remoteJson.controlDepartmentId;
                report.group = remoteJson.groupName;
                report.groupId = remoteJson.groupId;
                report.planWBS = remoteJson.planWBS;
                report.planWBSAfter = remoteJson.planWBSAfter;
                report.planWBSBefore = remoteJson.planWBSBefore;
                report.remainingDuration = remoteJson.remainingDuration;
                report.remainingHour = remoteJson.remainingHour;
                report.remainingPeriod = remoteJson.remainingPeriod;
                report.spi = remoteJson.spi;

                report.level = remoteJson.level;
                report.parentPlanCode = remoteJson.parentPlanCode;
                report.parentKey = remoteJson.parentKey;
                report.planKey = remoteJson.planKey;
                report.leaf = remoteJson.leaf || false;
                report.isTask = remoteJson.isTask || false
            }

            function getFSMStateFromPlanState(planstate) {
                switch (planstate) {
                    case 0:
                        vm.changeUIRules('new');
                        return '新建';
                        break;
                    case 1:
                        vm.changeUIRules('beforeRelease');
                        return '未发布';
                        break;
                    case 2:
                        vm.changeUIRules('released');
                        return '已发布';
                        break;
                    case 3:
                        vm.changeUIRules('audit01');
                        return '待审批1';
                        break;
                    case 4:
                        vm.changeUIRules('audit12');
                        return '待审批2';
                        break;
                    case 5:
                        vm.changeUIRules('audit02');
                        return '待审批2';
                        break;
                    case 6:
                        vm.changeUIRules('finished');
                        return '已完成';
                        break;
                    default:
                        vm.changeUIRules('view');
                        return null;
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
            };

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
            };
            avalon.mix(prM, {mixCallbacks: mixCallbacks});
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
                for (var key in funcSharer.publicMethods)
                    vm[key] = funcSharer(vm, key);
                /*****************************创建FSM**********************************************************/
                vm.$fsm = FSM.create('planFSM');
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
            return report;
        }

        function delNull(mixobj) {
            if (avalon.type(mixobj) == "object") {
                for (var name in mixobj) {
                    if (mixobj[name] == null)
                        delete mixobj[name];
                }
            }
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
                variArr = variArr instanceof Array ? variArr : [variArr];
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

            validBoolean(mixobj, ["back", "isOpEnd", "isActionItem"]);
            return mixobj

        }

        /**
         * 创建一个空的report,分为行动项和计划
         * @param reportId
         * @param isActionItem
         * @returns {*}
         */
        var newReport = function (reportId, isActionItem, mixObj, useMyName) {
            var report = useMyName == true ? _newVm(reportId)
                : _newVm(reportId + '_at_' + Date.now());
            report.report.isActionItem = isActionItem !== undefined ? isActionItem : true;
            report.report.planState = 0;
            //如状态是新建，自动填入启动日期
            report.report.planIssuedDate = utils.date.getCurrentDate();
            avalon.type(mixObj) === "object" && avalon.mix(report.report, validMixObj(mixObj));
            report.report.planCode = 'plan' + Date.now();
            report.refreshUIViewByAuth();

            return report;
        };
        var getReport = function (reportId) {
            var report = _getVm(reportId);
            return report;
        };
        /**
         * 打开一个report并load远程数据
         * @param reportId
         * @param onSuccess
         * @returns {*}
         */
        var openReport = function (reportId, onSuccess, mixObj,getDataFromRemote) {
            var report = _getVm(reportId + '') || _newVm(reportId + '');
            report.load(reportId + '', onSuccess,mixObj,getDataFromRemote);
            return report;
        };
        var deleteReport = function (reportId) {

        };
        /**
         * 关闭一个report
         * @param reportId
         */
        var closeReport = function (reportId) {
            return _delVm(reportId + '')
        };
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
    });
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
