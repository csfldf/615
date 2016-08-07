/**
 * Created by rtio on 2014/11/9.
 */
/**
 * Created by FeiyuLab on 2014/9/24 0024.
 */
define(["mmRequest", "utils", 'permissionMgr','am.cookie','am.amDatabase'], function (avalon, utils, pm, av,db) {
    var prM = window['prM'] = {};
    var planReports = {};//{reportId:reportVM}
    var planCookie = av.cookie;

    var uiRulesOrigin = pm.getOrigin("planReport");
    var uiRulesAddtional = pm.getAddtions("planReport");
    //planReport公用函数，提取出来以节约内存
    var common = {
        /**
         * 从本地JSON加载report数据
         * @param data
         */
        loadData: function (vm, data) {
            console.log(data);
            if (typeof data == 'object') {
                avalon.mix(vm.report, data);
            }
        },
        /**
         * 从Server获得指定ID的report数据，onSuccess：成功回调
         * @param reportId
         * @param onSuccess
         * @returns {boolean}
         */
        load: function (vm, reportId, onSuccess) {
            if (typeof reportId == 'string') {
                avalon.getJSON('../am/get.action?planCode=' + reportId, function (data) {
                    vm.loadData(data);
                    if (typeof onSuccess == 'function')
                        onSuccess()
                    return true;
                });
            }
            return false;
        },
        save: function (vm, isDraft) {
            var data = vm.$model.report;
            isDraft == false ? avalon.post('../am/addPlan?planCode=' + vm.report.planSerialNumber, data)
                : avalon.post('../am/addDraft?planCode=' + vm.report.planSerialNumber, data);

        },
        _isAllDateValid: function (vm) {
            var flag = utils.date.isDateString(vm.report.planIssuedDate) && utils.date.isDateString(vm.report.planStartDate) &&
                utils.date.isDateString(vm.report.planDeadlineDate);
            return flag;
        },
        _isReportValid: function (vm) {
            var form = document.getElementById(vm.$formId);
            //html5验证方法
            var flag = form.checkValidity ? form.checkValidity() : (!!vm.report.planCategory && !!vm.report.planSerialNumber && !!vm.report.planCode && !!vm.report.planName &&
                common._isAllDateValid(vm) && !!vm.report.planSource && !!vm.report.planController && !!vm.report.planState && !!vm.report.planUpdateDescription);
            return flag;
        },
        /*===========================planReport权限控制=========================================*/
        _changeUIRules: function (vm, mode) {
            if (uiRulesAddtional.hasOwnProperty(mode)) {
                avalon.mix(vm.$uiDisplay, uiRulesAddtional[mode]['display']);
                avalon.mix(vm.$uiEnable, uiRulesAddtional[mode]['enable'])
            }
        }
    }

    /**
     * 创建新的planreport VM
     * @param reportId
     * @returns {*}
     * @private
     */
    var _newVm = function (reportId) {
        if (typeof reportId != 'string' && typeof reportId != 'number') {
            return null;
        }
        else {
            reportId += '';
        }
        var new$uiDisplay = avalon.mix({}, uiRulesOrigin),
            new$uiEnable = avalon.mix({}, uiRulesOrigin);

        var setUiEnable = function(){
            var userID = window.document.getElementById("loginName").innerHTML;
            userID = userID.split('<')[0];
            var usrPermission = db.getPermission(userID);
            if(usrPermission > 3){
                for(var u in new$uiEnable){
                    new$uiEnable[u] = false;
                }
                new$uiEnable.planState = true;
                new$uiEnable.planUpdateDescription = true;
                new$uiEnable.buttonSubmit = true;
            }
        }
        setUiEnable();

        var tmpvm = planReports[reportId] = avalon.define("planReport" + reportId, function (vm) {
            vm.$reportId = '';
            vm.$formId = 'planForm';
            vm.$planCategoryTmpl = [
                {id: 1, text: 'C919', children: [
                    {id: 11, text: 'C919一级-1', children: [
                        {id: 111, text: 'C919二级-1'},
                        {id: 112, text: 'C919二级-2'}
                    ]},
                    {id: 11, text: 'C919一级-2', children: [
                        {id: 111, text: 'C919二级-3'},
                        {id: 112, text: 'C919二级-4'}
                    ]}
                ]},
                {id: 2, text: 'C818', children: [
                    {id: 21, text: 'C818一级-1', children: [
                        {id: 211, text: 'C919二级-1'},
                        {id: 212, text: 'C919二级-2'}
                    ]},
                    {id: 21, text: 'C818一级-2', children: [
                        {id: 221, text: 'C919二级-3'},
                        {id: 222, text: 'C919二级-4'}
                    ]}
                ]}
            ]
            vm.planCategorys = [
                [],
                [],
                []
            ];
            vm.planCategoryChanged = function () {

            }
            //表单项
            var tmplan = planCookie.get('test');
            tmplan = eval('(' + tmplan + ')');
            vm.report = { planCategory: 1, planSerialNumber: tmplan.planSerialNumber, planCode: tmplan.planCode,
                planName: tmplan.planName, planIssuedDate: tmplan.planIssuedDate, planStartDate: tmplan.planStartDate,
                planDeadlineDate: tmplan.planDeadlineDate, planSource: tmplan.planSource, planController: tmplan.planController,
                planState: tmplan.planStateCode, planUpdateDescription: ''};
            var dayNum = utils.date.dateDiff(vm.report.planDeadlineDate, new Date());
            vm.planRemainingDate = dayNum>0?dayNum:0;

//            alert(vm.report.planState);
            vm.$planStateTmpl = [
                {value: 'auditing', text: '待审核'},
                {value: 'processing', text: '待执行'},
                {value: 'accepted', text: '已接受'},
                {value: 'done', text: '已完成'}
            ];
            /**
             * data-include-loaded：模板加载后，scan（）前执行，替换ms-controller为相应的reportID
             * @param tmpl
             * @returns {XML|string|void|*}
             */
            vm.tmplLoaded = function (tmpl) {
                avalon.log('正在修改report' + vm.$reportId + '模板');
                tmpl = utils.tmpl.clearUselessHtml(tmpl);
                tmpl = tmpl.replace(/(ms-important=")[\S]+(")/, 'ms-important="planReport' + vm.$reportId + '"');
                return tmpl;
            }
            vm.submit = function (isDraft) {
                var canSubmit = isDraft ? true : common._isReportValid(vm)
                canSubmit && common.save(vm, isDraft);
            }
            /**
             * UI显示和使能，默认全为真
             * @type {{planCategory: boolean, planSerialNumber: boolean, planCode: boolean, planName: boolean, planIssuedDate: boolean, planStartDate: boolean, planDeadlineDate: boolean, planSource: boolean, planController: boolean, planState: boolean, planUpdateDescription: boolean, areaPlanOutput: boolean, areaPlanRemainingDate: boolean, buttonSubmit: boolean, buttonSubmitDraft: boolean, buttonDelete: boolean}}
             */
            vm.$uiDisplay = new$uiDisplay;
            vm.$uiEnable = new$uiEnable;


            return vm;
        });
        //监视数据变化
        tmpvm.report.$watch("planDeadlineDate", function (newValue, oldValue) {
            var daynum = utils.date.dateDiff(newValue, new Date());
            if (!isNaN(daynum))
                tmpvm.planRemainingDate = daynum;
            else
                tmpvm.planDeadlineDate = oldValue;
        });

        //最后向Vm注入的数据
        tmpvm.$formId += reportId;//唯一化UI上的formId
        tmpvm.$reportId = reportId;//保存reportID
        return tmpvm;
    }
    var _getVm = function (reportId) {
        if (typeof reportId == 'string' || typeof reportId == 'number') {
            reportId += '';
            var report;
            (report = planReports[reportId]) || (report = avalon.vmodels['planReport' + reportId]);
            return report;
        }
    }
    var _delVm = function (reportId) {
        if (typeof reportId == 'string' || typeof reportId == 'number') {
            reportId += '';
            delete _getVm(reportId);
        }
    }

    /**
     * 打开一个空的report
     * @param reportId
     * @returns {*}
     */
    var newReport = function (reportId) {
        var report;
        (report = _getVm(reportId)) || (report = _newVm(reportId));
        return report;
    }
    /**
     * 打开一个report并load远程数据
     * @param reportId
     * @param onSuccess
     * @returns {*}
     */
    var openReport = function (reportId, onSuccess) {
        var tmpvm = _getVm(reportId);
        tmpvm == undefined && (tmpvm = _newVm(reportId));
        common.load(tmpvm, reportId, onSuccess)
        return tmpvm;
    }
    /**
     * 删除一个report
     * @param reportId
     */
    var closeReport = function (reportId) {
        return _delVm(reportId + '')
    }


    avalon.mix(prM, {planReports: planReports, common: common, newReport: newReport, _getVm: _getVm,
        _delVm: _delVm, _newVm: _newVm, openReport: openReport, closeReport: closeReport});
    return prM;
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
