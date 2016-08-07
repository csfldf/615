/**
 * Created by jiadongy on 10/4/2014.
 */
"use strict"; 
define(['RouterManager', 'UIMainFrame','utils',"Login","am.sessionUtil"], function (rm, main,utils,loginVM,amUtil) {
    var configs = {};
/*    var hasInit = false;
    //AM模块的侧边栏初始化逻辑
    configs.amInitRules =
    {path: '/am', process: function (a) {
        if (!configs.hasInit) {
            UIMainFrame.addSidebar('amSidebar', amSidebarConfig, true);
            rm.addRules(amBusinessRules);
            configs.hasInit = true;
        }
        UIMainFrame.switchSidebar('amSidebar');
    }
    }*/
    
    /**
     * 处理report（plan和action链接）
     * @param reportId
     * @param reportOp
     */
    function reportProcessing(reportId, reportOp,reportDataToMix) {
        require(['am.planReportMgr'], function (prm) {
            var report,isActionItem=true,mixData
            reportDataToMix=reportDataToMix||'#'
            switch (reportOp){
                case "newPlan":
                    isActionItem=false;
                case "new":
                case "newAction":
                    mixData=avalon.unparam(reportDataToMix.substr(1)||'');
                    mixData.planCode=reportId;
                    report=prm.newReport(reportId,isActionItem,mixData);
                    report.changeUIRules("new");
                    break;
                case undefined:
                default :
                    report = prm.openReport(reportId,null,avalon.unparam(reportDataToMix.substr(1)||''));
                    report.changeUIRules(reportOp||"view");
            }

            var tabConfig = {tabName: reportId, useHref: true, href: 'am/plan_report.html',
                tmplLoaded: report.tmplLoaded}
            var tabid = main.addTab(tabConfig);
            report.$container = document.getElementById(main.$tabContentPrefix + tabid);
            main.changeTab(tabid, {onRemove: function () {
                //alert('onRemove:' + report.$reportId);
                prm.closeReport(report.$reportId);
            }})
        })
    }
    /**
     * 处理reportView（计划部分）
     * @param reportId
     * @param reportOp
     */
    function reportPlanViewProcessing(reportId, reportOp,reportDataToMix) {
        amUtil.checkLogin(
            function(data) {
                if (data.success) {
                    loginVM.isLogin = true;
                    loginVM.loginId = data.employeeNumber;
                    loginVM.loginName = data.employeeName;
                }
                if (loginVM.isLogin == true) {
                    require(['am.planViewMgr'], function (prm) {
                        var report,isActionItem=true,mixData
                        reportDataToMix=reportDataToMix||'#'
                        switch (reportOp){
                            case "newPlan":
                                isActionItem=false;
                            case "new":
                            case "newAction":
                                mixData=avalon.unparam(reportDataToMix.substr(1)||'');
                                mixData.planCode=reportId;
                                report=prm.newReport(reportId,isActionItem,mixData);
                                report.changeUIRules("new");
                                break;
                            case undefined:
                            default :
                                report = prm.openReport(reportId,null,avalon.unparam(reportDataToMix.substr(1)||''));
                                report.changeUIRules(reportOp||"view");
                        }

                        var tabConfig = {tabName: reportId, useHref: true, href: 'am/plan_view.html',
                            tmplLoaded: report.tmplLoaded}
                        var tabid = main.addTab(tabConfig);
                        report.$container = document.getElementById(main.$tabContentPrefix + tabid);
                        main.changeTab(tabid, {onRemove: function () {
                            //alert('onRemove:' + report.$reportId);
                            prm.closeReport(report.$reportId);
                        }})
                    })
                } else {
                    alert("请登录");
                }
            })

    }
    /**
     * 处理reportView（计划部分）
     * @param reportId
     * @param reportOp
     */
    function reportTaskViewProcessing(reportId, reportOp,reportDataToMix) {
        require(['am.taskViewMgr'], function (prm) {
            var report,isActionItem=true,mixData
            reportDataToMix=reportDataToMix||'#'
            switch (reportOp){
                case "newPlan":
                    isActionItem=false;
                case "new":
                case "newAction":
                    mixData=avalon.unparam(reportDataToMix.substr(1)||'');
                    mixData.planCode=reportId;
                    report=prm.newReport(reportId,isActionItem,mixData);
                    report.changeUIRules("new");
                    break;
                case undefined:
                default :
                    report = prm.openReport(reportId,null,avalon.unparam(reportDataToMix.substr(1)||''));
                    report.changeUIRules(reportOp||"view");
            }

            var tabConfig = {tabName: reportId, useHref: true, href: 'am/task_view.html',
                tmplLoaded: report.tmplLoaded}
            var tabid = main.addTab(tabConfig);
            report.$container = document.getElementById(main.$tabContentPrefix + tabid);
            main.changeTab(tabid, {onRemove: function () {
                //alert('onRemove:' + report.$reportId);
                prm.closeReport(report.$reportId);
            }})
        })
    }
    /**
     * 处理reportView（工作包部分）
     * @param reportId
     * @param reportOp
     */
    function reportPackageViewProcessing(reportId, reportOp,reportDataToMix) {
        require(['am.packageViewMgr'], function (prm) {
            var report,isActionItem=true,mixData
            reportDataToMix=reportDataToMix||'#'
            switch (reportOp){
                case "newPlan":
                    isActionItem=false;
                case "new":
                case "newAction":
                    mixData=avalon.unparam(reportDataToMix.substr(1)||'');
                    mixData.planCode=reportId;
                    report=prm.newReport(reportId,isActionItem,mixData);
                    report.changeUIRules("new");
                    break;
                case undefined:
                default :
                    report = prm.openReport(reportId,null,avalon.unparam(reportDataToMix.substr(1)||''));
                    report.changeUIRules(reportOp||"view");
            }

            var tabConfig = {tabName: reportId, useHref: true, href: 'am/package_view.html',
                tmplLoaded: report.tmplLoaded}
            var tabid = main.addTab(tabConfig);
            report.$container = document.getElementById(main.$tabContentPrefix + tabid);
            main.changeTab(tabid, {onRemove: function () {
                //alert('onRemove:' + report.$reportId);
                prm.closeReport(report.$reportId);
            }})
        })
    }
    /**
     * 处理reportView（计划部分）
     * @param reportId
     * @param reportOp
     */
    function reportActionViewProcessing(reportId, reportOp,reportDataToMix) {
        require(['am.actionViewMgr'], function (prm) {
            var report,isActionItem=true,mixData
            reportDataToMix=reportDataToMix||'#'
            switch (reportOp){
                case "newPlan":
                    isActionItem=false;
                case "new":
                case "newAction":
                    mixData=avalon.unparam(reportDataToMix.substr(1)||'');
                    mixData.actionId=reportId;
                    report=prm.newReport(reportId,isActionItem,mixData);
                    report.changeUIRules("new");
                    break;
                case undefined:
                default :
                    report = prm.openReport(reportId,null,avalon.unparam(reportDataToMix.substr(1)||''));
                    report.changeUIRules(reportOp||"view");
            }

            var tabConfig = {tabName: reportId, useHref: true, href: 'am/action_view.html',
                tmplLoaded: report.tmplLoaded}
            var tabid = main.addTab(tabConfig);
            report.$container = document.getElementById(main.$tabContentPrefix + tabid);
            main.changeTab(tabid, {onRemove: function () {
                //alert('onRemove:' + report.$reportId);
                prm.closeReport(report.$reportId);
            }})
        })
    }
    /**
     * 处理reportView（计划部分）
     * @param reportId
     * @param reportOp
     */
    function reportActionDirViewProcessing(reportId, reportOp, reportDataToMix) {
        require(['am.actionDirViewMgr'], function (prm) {
            var report, isActionItem = true, mixData
            reportDataToMix = reportDataToMix || '#'
            switch (reportOp) {
                case "newPlan":
                    isActionItem = false;
                case "new":
                case "newAction":
                    mixData = avalon.unparam(reportDataToMix.substr(1) || '');
                    mixData.actionId = reportId;
                    report = prm.newReport(reportId, isActionItem, mixData);
                    report.changeUIRules("new");
                    break;
                case undefined:
                default :
                    report = prm.openReport(reportId, null, avalon.unparam(reportDataToMix.substr(1) || ''));
                    report.changeUIRules(reportOp || "view");
            }

            var tabConfig = {
                tabName: reportId, useHref: true, href: 'am/actionDir_view.html',
                tmplLoaded: report.tmplLoaded
            }
            var tabid = main.addTab(tabConfig);
            report.$container = document.getElementById(main.$tabContentPrefix + tabid);
            main.changeTab(tabid, {
                onRemove: function () {
                    //alert('onRemove:' + report.$reportId);
                    prm.closeReport(report.$reportId);
                }
            })
        })
    }

    /**
     * 初始化
     */
    var init = function () {
        main.addSidebar('amSidebar', amSidebarConfig, true);
        rm.addRules(amBusinessRules);
        main.switchSidebar('amSidebar')

        //Tongji Sidebar
        main.addSidebar('amTongjiSidebar', amTongjiConfig, true);
    }
    var amBusinessRules = [
        /*===========================homePage Part================================================*/
        {path: '/homePage', process: function () {
            require(['homePage','Login','am.sessionUtil','ready!'],function(hp,login,sessionUtil) {
                main.switchSidebar('amSidebar');
                var tabConfig = {tabName: '首页', useHref: true, href: 'am/homePage.html'}
                if(!hp.init()){
                    window.location.href = '#!';
                    return;
                }
                var tabid = main.addTab(tabConfig);
                main.clearSider()
                main.registerTabChangeCallBack(main.currentIndex,null)
                main.changeTab(tabid, {onRemove: function () {
                    if(hp.hpMode.deletedPages!="") {
                        sessionUtil.deleteMessage(hp.hpMode.deletedPages, function (data) {
                            hp.hpMode.deletedPages = ""
                        })
                    }
                }})
            })
        }},
        /*===========================action Part================================================*/
        {path: '/action', process: function () {
            require(['am.actionSummary','Login','ready!'],function(as,login){
                /*验证是否已经登录
                 * */
                var userID = login.loginId;
                if(typeof userID == 'undefined' || userID == "用户" || userID == ''){
                    alert('请登录');
                    window.location.href = "#";
                    return;
                }
                main.fracasInit();
                main.switchSidebar('amSidebar');
                var tabConfig={tabName:'行动项管理主页',useHref:true,href:'am/action_list.html'};
                if(!as.init()){
                    window.location.href = '#!';
                    return;
                }
                var tabid = main.addTab(tabConfig);
                main.initSiderBarAction()
                main.registerTabChangeCallBack(main.currentIndex,main.initSiderBarAction)
                main.changeTab(tabid, {onRemove: function () {
                    amUtil.amRefresh(as.asMode.data)
                }})
            });
        }},
        {path:'/am/actionDecompose/:actionID',process:function(actionID){
            require(['am.actionDecompose'], function (actionDecompose) {
                var action = actionDecompose.openAction(actionID)
                var tabConfig={tabName:'行动项新建_'+actionID,useHref:true,href:'am/action_decompose.html',
                    tmplLoaded: action.tmplLoaded};
                main.addTab(tabConfig)
            })
        }},
        /*===========================plan Part================================================*/
        {path: '/am', process: function () {
            require(['am.planSummary','Login','ready!'],function(ps,login){
                /*验证是否已经登录
                 * */
                var userID = login.loginId;
                if(typeof userID == 'undefined' || userID == "用户" || userID == ''){
                    alert('请登录');
                    window.location.href = "#";
                    return;
                }
                main.fracasInit();
                main.switchSidebar('amSidebar');
                var tabConfig={tabName:'计划管理主页',useHref:true,href:'am/plan_list.html'};
                if(!ps.init()){
                    window.location.href = '#!';
                    return;
                }
                var tabid = main.addTab(tabConfig);
                ps.currentIndex = main.currentIndex;
                main.initSiderBarPlanMgr()
                main.registerTabChangeCallBack(main.currentIndex,main.initSiderBarPlanMgr)
                main.changeTab(tabid, {onRemove: function () {
                    amUtil.amRefresh(ps.psMode.data)
                }})
                avalon.scan()
            });
        }},
        {path:'/am/taskDecompose/:taskID/:packageName',process:function(taskID,packageName){
            require(['am.taskDecompose'], function (taskDecompose) {
                var task = taskDecompose.openTask(taskID)
                var tabConfig={tabName:'任务分解_'+packageName,useHref:true,href:'am/task_decompose.html',
                    tmplLoaded: task.tmplLoaded};
                main.addTab(tabConfig)
            })
        }},
        {path: '/am/plan_Report', process: function () {
            main.switchSidebar('amSidebar');
            var tabConfig={tabName:'计划查看',useHref:true,href:'am/plan_report.html'}
            main.addTab(tabConfig);
        }},
        /*===========================actionDirView Part================================================*/
        //操作一个planReport
        {path: '/am/actiondir/:planID', process: reportActionDirViewProcessing},
        {path: '/am/actiondir/:planID/:planOp', process: reportActionDirViewProcessing},
        {path: '/am/actiondir/:planID/:planOp/:mixData', process: reportActionDirViewProcessing},
        {path: '/am/actiondir/:planID/:planOp/:mixData/:callback', process: reportActionDirViewProcessing},
        /*===========================actionView Part================================================*/
        //操作一个planReport
        {path: '/am/action/:planID', process: reportActionViewProcessing},
        {path: '/am/action/:planID/:planOp', process: reportActionViewProcessing},
        {path: '/am/action/:planID/:planOp/:mixData', process: reportActionViewProcessing},
        {path: '/am/action/:planID/:planOp/:mixData/:callback', process: reportActionViewProcessing},
        /*===========================packageView Part================================================*/
        //操作一个planReport
        {path: '/am/package/:planID', process: reportPackageViewProcessing},
        {path: '/am/package/:planID/:planOp', process: reportPackageViewProcessing},
        {path: '/am/package/:planID/:planOp/:mixData', process: reportPackageViewProcessing},
        {path: '/am/package/:planID/:planOp/:mixData/:callback', process: reportPackageViewProcessing},
        /*===========================taskView Part================================================*/
        //操作一个planReport
        {path: '/am/task/:planID', process: reportTaskViewProcessing},
        {path: '/am/task/:planID/:planOp', process: reportTaskViewProcessing},
        {path: '/am/task/:planID/:planOp/:mixData', process: reportTaskViewProcessing},
        {path: '/am/task/:planID/:planOp/:mixData/:callback', process: reportTaskViewProcessing},
        /*===========================planView Part================================================*/
        //操作一个planReport
        {path: '/am/plan/:planID', process: reportPlanViewProcessing},
        {path: '/am/plan/:planID/:planOp', process: reportPlanViewProcessing},
        {path: '/am/plan/:planID/:planOp/:mixData', process: reportPlanViewProcessing},
        {path: '/am/plan/:planID/:planOp/:mixData/:callback', process: reportPlanViewProcessing},
        /*===========================planReport Part================================================*/
//        //操作一个planReport
//        {path: '/am/plan/:planID', process: reportProcessing},
//        {path: '/am/plan/:planID/:planOp', process: reportProcessing},
//        {path: '/am/plan/:planID/:planOp/:mixData', process: reportProcessing},
//        {path: '/am/plan/:planID/:planOp/:mixData/:callback', process: reportProcessing},
        //统计行动项
        {path: '/am/planStatistics',process:function(){
            amUtil.checkLogin(
                function(data) {
                    if (data.success) {
                        loginVM.isLogin = true;
                        loginVM.loginId = data.employeeNumber;
                        loginVM.loginName = data.employeeName;
                    }
                    if (loginVM.isLogin == true) {
                        require(['am.planStatisticsMgr'],function(ps){
                            var tabConfig = {
                                tabName: '报表统计', useHref: true, href: 'am/plan_statistics.html',
                                tmplLoaded: utils.tmpl.clearUselessHtml,
                                tmplRendered:function(){
                                    ps.vm.loaded = false
                                    ps.vm.init()
                                }}
                            var tabid = main.addTab(tabConfig)
                            main.changeTab(tabid, {onRemove: function () {
                                ps.vm.destroy()
                                main.showNormalSidebar = main.showOriginSidebar = false
                            }})
                            //Add Sidebar
                            main.showNormalSidebar = main.showOriginSidebar = true
                            main.addSidebar('amTongjiSidebar', amTongjiConfig, false);
                            main.switchSidebar('amTongjiSidebar')
                            main.registerTabChangeCallBack(main.currentIndex,function(){
                                main.clearSider()
                                main.switchSidebar('amTongjiSidebar')
                            })
                        })
                    } else {
                        alert("请登录");
                    }
                })
        }},
        {path: '/am/planStatistics/:mixData',process:function(mixString){
            amUtil.checkLogin(
                function(data) {
                    if (data.success) {
                        loginVM.isLogin = true;
                        loginVM.loginId = data.employeeNumber;
                        loginVM.loginName = data.employeeName;
                    }
                    if (loginVM.isLogin == true) {
                        require(['am.planStatisticsMgr','ready!'],function(ps){
                            ps.vm.init(mixString)
                        })
                    } else {
                        alert("请登录");
                    }
                })

        }},
        {path: '/am/planStatistics/select/:op',process:function(op){
            amUtil.checkLogin(
                function(data) {
                    if (data.success) {
                        loginVM.isLogin = true;
                        loginVM.loginId = data.employeeNumber;
                        loginVM.loginName = data.employeeName;
                    }
                    if (loginVM.isLogin == true) {
                        require(['am.planStatisticsMgr'],function(ps){
                            if (typeof main._getTabIndexByName("报表统计") != "undefined") {
                                ps.vm.loaded = false
                                ps.vm.init()
                                switch(op){
                                    case 'byProject':
                                        ps.vm.type='byProject'
                                        break;
                                    case 'byGroup':
                                        ps.vm.type='byGroup'
                                        break;
                                    case 'byEmployee':
                                        ps.vm.type='byEmployee'
                                        break;
                                    case 'byDepartment':
                                        ps.vm.type='byDepartment'
                                        break;
                                }
                            }else{
                                var tabConfig = {
                                    tabName: '报表统计', useHref: true, href: 'am/plan_statistics.html',
                                    tmplLoaded: utils.tmpl.clearUselessHtml,
                                    tmplRendered:function(){
                                        ps.vm.loaded = false
                                        ps.vm.init()
                                        switch(op){
                                            case 'byProject':
                                                ps.vm.type='byProject'
                                                break;
                                            case 'byGroup':
                                                ps.vm.type='byGroup'
                                                break;
                                            case 'byEmployee':
                                                ps.vm.type='byEmployee'
                                                break;
                                            case 'byDepartment':
                                                ps.vm.type='byDepartment'
                                                break;
                                        }
                                    }}
                                var tabid = main.addTab(tabConfig)
                                main.changeTab(tabid, {
                                    onRemove: function () {
                                        main.showNormalSidebar = main.showOriginSidebar = false
                                    }
                                })
                                //Add Sidebar
                                main.showNormalSidebar = main.showOriginSidebar = true
                                main.addSidebar('amTongjiSidebar', amTongjiConfig, false);
                                main.switchSidebar('amTongjiSidebar')
                                main.registerTabChangeCallBack(main.currentIndex, function () {
                                    main.clearSider()
                                    main.switchSidebar('amTongjiSidebar')
                                })
                            }
                        })
                    } else {
                        alert("请登录");
                    }
                })

        }},
        /*===========================docLibrary Part================================================*/
        {path:'/docLibrary',process:function(){
            amUtil.checkLogin(
                function(data) {
                    if (data.success) {
                        loginVM.isLogin = true;
                        loginVM.loginId = data.employeeNumber;
                        loginVM.loginName = data.employeeName;
                    }
                    if (loginVM.isLogin == true) {
                        require(['am.docLibrary','ready!'],function(docs){
                            var tabConfig = {tabName: '模板库', useHref: true, href: 'am/doc_library.html',
                                tmplLoaded: utils.tmpl.clearUselessHtml,
                                tmplRendered:function(){
                                    docs.init()
                                }}
                            var tabid = main.addTab(tabConfig)
                            main.changeTab(tabid, {onRemove: function () {}})

                        })
                    } else {
                        alert("请登录");
                    }
                })

        }},
        /*===========================================================================*/
        {path: '/am/prj_def', process: function () {

            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");//alert(a);
            amUtil.checkLogin(
                function(data){
                    if(data.success){
                        loginVM.isLogin=true;
                        loginVM.loginId=data.employeeNumber;
                        loginVM.loginName=data.employeeName;
                    }
                    if(loginVM.isLogin==true) {
                        require(['am.prjDef'], function (prjdef) {
                            //pgd.$groupID=a;
                            var tabConfig = {tabName: '项目概览', useHref: true, href: 'am/prj_def.html', tmplLoaded: function (tmpl) {
                                return tmpl;
                            }}
                            var tabid = main.addTab(tabConfig);
                            main.registerTabChangeCallBack(main.currentIndex,function(){
                                main.clearSider()
                                if(prjdef.selPrjNum) {
                                    main.fastAccessBar = true
                                }
                                else if(prjdef.grpMaintainSel){
                                    main.prjMaintainBar= true
                                }
                            })
                            //main.initSider();
                            prjdef.init();
                            //report.$container = document.getElementById(main.$tabContentPrefix + tabid);
                            main.changeTab(tabid, {onRemove: function () {
                                prjdef.grpMaintainSel=false;
                                main.clearSider()
                                main.fastAccessBar = false;
                                // window.location.href = "#!";
                            }})
                            //pcm.init();
                        })
                    }else{
                        alert("请登录");
                    }
                }
            )
        }},
        {path: '/am/prj_def/createPrj', process: function () {

            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");//alert(a);
            amUtil.checkLogin(
                function(data){
                    if(data.success){
                        loginVM.isLogin=true;
                        loginVM.loginId=data.employeeNumber;
                        loginVM.loginName=data.employeeName;
                    }
                    if(loginVM.isLogin==true) {
                        if(loginVM.loginName.search("部门领导")!=-1||loginVM.loginId=='MVP'||loginVM.loginRoleId==7||loginVM.loginRoleId==16) {
                            require(['am.prjCreate'], function (prjdef) {
                                //pgd.$groupID=a;
                                var tabConfig = {tabName: '项目创建', useHref: true, href: 'am/prj_create.html', tmplLoaded: function (tmpl) {
                                    return tmpl;
                                }}
                                var tabid = main.addTab(tabConfig);
                                main.registerTabChangeCallBack(main.currentIndex, function () {
                                    main.clearSider()
                                    if (prjdef.selPrjNum) {
                                        main.fastAccessBar = true
                                    }
                                    else if (prjdef.grpMaintainSel) {
                                        main.prjMaintainBar = true
                                    }
                                })
                                //main.initSider();
                                prjdef.init()
                                //report.$container = document.getElementById(main.$tabContentPrefix + tabid);
                                main.changeTab(tabid, {onRemove: function () {
                                    prjdef.grpMaintainSel = false;
                                    main.clearSider()
                                    main.fastAccessBar = false;
                                    // window.location.href = "#!";
                                }})
                                //pcm.init();
                            })
                        }else{
                            alert("没有权限")
                        }
                    }else{
                        alert("请登录");
                    }
                }
            )
        }},
        {path: '/am/prj_def/grpMaintain', process: function () {

            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");//alert(a);
            amUtil.checkLogin(
                function(data){
                    if(data.success){
                        loginVM.isLogin=true;
                        loginVM.loginId=data.employeeNumber;
                        loginVM.loginName=data.employeeName;
                    }
                    if(loginVM.isLogin==true) {
                        require(['am.prjMaintain'], function (prjdef) {
                            //pgd.$groupID=a;
                            var tabConfig = {tabName: '项目团队维护', useHref: true, href: 'am/prj_maintain.html', tmplLoaded: function (tmpl) {
                                return tmpl;
                            }}
                            var tabid = main.addTab(tabConfig);
                            main.registerTabChangeCallBack(main.currentIndex,function(){
                                main.clearSider()
                                if(prjdef.selPrjNum) {
                                    main.fastAccessBar = true
                                }
                                else if(prjdef.grpMaintainSel){
                                    main.prjMaintainBar= true
                                }
                            })
                            //main.initSider();
                            prjdef.init();
                            prjdef.maintainPrj()
                            //report.$container = document.getElementById(main.$tabContentPrefix + tabid);
                            main.changeTab(tabid, {onRemove: function () {
                                prjdef.grpMaintainSel=false;
                                main.clearSider()
                                main.fastAccessBar = false;
                                // window.location.href = "#!";
                            }})
                            //pcm.init();
                        })
                    }else{
                        alert("请登录");
                    }
                }
            )
        }},
        {path: '/am/metadataMgr', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            //alert(a);
            amUtil.checkLogin(
                function(data){
                    if(data.success){
                        loginVM.isLogin=true;
                        loginVM.loginId=data.employeeNumber;
                        loginVM.loginName=data.employeeName;
                    }
                    if(loginVM.isLogin==true) {
                        require(['am.metadataSummary'], function (pp) {
//                            $.post('am/getOnesAmPrivilege', {}, function back(data) {
//                                if ((data.deleteTask) == true) {
                                    //alert("拥有权限");
                                    var tabConfig = {tabName: '基础数据维护', useHref: true, href: 'am/metaDataMgr.html', tmplLoaded: function (tmpl) {
                                        return tmpl;
                                    }}
                                    var tabid = main.addTab(tabConfig);
                                    main.registerTabChangeCallBack(main.currentIndex,function(){
                                        main.clearSider()
                                        pp.init();
                                    })
                                    pp.init();
                                    //pgd.initProjects();

                                    //report.$container = document.getElementById(main.$tabContentPrefix + tabid);
                                    main.changeTab(tabid, {onRemove: function () {
                                        //main.projectManagementBar=false;
                                        // window.location.href="#!";
                                    }})
//                                } else {
//                                    alert("没有权限");
//                                }
//                            })
                        })
                    }
                    else{
                        alert("请登录");
                    }
                //pcm.init();
            })
        }},
        {path: '/am/comm_mgm/:id/:prjId', process: function (id,prjId) {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");//alert(a);
            amUtil.checkLogin(
                function(data) {
                    if (data.success) {
                        loginVM.isLogin = true;
                        loginVM.loginId = data.employeeNumber;
                        loginVM.loginName = data.employeeName;
                    }
                    if (loginVM.isLogin == true) {
                        require(['am.commMgr','am.msgDetail'], function (xx,yy) {
                            //pgd.$groupID=a;
                            xx.init();
                            switch(id){
                                case 1:var tabConfig = {tabName: '大事记', useHref: true, href: 'am/msgDetail.html', tmplLoaded: function (tmpl) {
                                    return tmpl;
                                }}
                                    break
                                case 2: var tabConfig = {tabName: '项目简报', useHref: true, href: 'am/msgDetail.html', tmplLoaded: function (tmpl) {
                                    return tmpl;
                                }}
                                    break
                                case 3:var tabConfig = {tabName: '会议纪要', useHref: true, href: 'am/msgDetail.html', tmplLoaded: function (tmpl) {
                                    return tmpl;
                                }}
                                    break
                                case 4:var tabConfig = {tabName: '项目公告', useHref: true, href: 'am/msgDetail.html', tmplLoaded: function (tmpl) {
                                    return tmpl;
                                }}
                                    break
                            }
                            var tabid = main.addTab(tabConfig);
                            yy.init(id)
                            main.initSider();
                            main.registerTabChangeCallBack(main.currentIndex,function(){
                                main.clearSider()
                                xx.init();
                            })
                            main.changeTab(tabid, {onRemove: function () {
                                main.commBar = false;
                                // window.location.href = "#!";
                            }})
                        })
                    } else {
                        alert("请登录");
                    }
                })
        }},
        {path: '/am/comm_mgm/', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");//alert(a);
            amUtil.checkLogin(
                function(data) {
                    if (data.success) {
                        loginVM.isLogin = true;
                        loginVM.loginId = data.employeeNumber;
                        loginVM.loginName = data.employeeName;
                    }
                    if (loginVM.isLogin == true) {
                        require(['am.commMgr'], function (xx) {
                            //pgd.$groupID=a;
                            var tabConfig = {tabName: '沟通管理', useHref: true, href: 'am/communicationMgr.html', tmplLoaded: function (tmpl) {
                                return tmpl;
                            }}
                            var tabid = main.addTab(tabConfig);
                            main.initSider();
                            main.registerTabChangeCallBack(main.currentIndex,function(){
                                main.clearSider()
                                xx.init();
                            })
                            xx.init();

                            //report.$container = document.getElementById(main.$tabContentPrefix + tabid);
                            main.changeTab(tabid, {onRemove: function () {
                                main.commBar = false;
                                // window.location.href = "#!";
                            }})
                            //pcm.init();
                        })
                    } else {
                        alert("请登录");
                    }
                })
        }},
        {path: '/perInfo', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");//alert(a);
            amUtil.checkLogin(
                function (data) {
                    if (data.success) {
                        loginVM.isLogin = true;
                        loginVM.loginId = data.employeeNumber;
                        loginVM.loginName = data.employeeName;
                    }
                    if (loginVM.isLogin == true) {
                        require(['perInfo'], function (xx) {
                            var tabConfig = {tabName: '个人信息管理', useHref: true, href: 'am/perInfo.html', tmplLoaded: function (tmpl) {
                                return tmpl;
                            }}
                            var tabid = main.addTab(tabConfig);
                            main.registerTabChangeCallBack(main.currentIndex, function () {
                                main.clearSider()
                            })
                            xx.init();
                            main.changeTab(tabid, {onRemove: function () {

                            }})
                        })
                    } else {
                        alert("请登录");
                    }
                })
            }
        },
        {path: '/am/employeeMgr', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            if(loginVM.loginId=='MVP'||loginVM.loginRoleId==16) {
                amUtil.checkLogin(
                    function (data) {
                        if (data.success) {
                            loginVM.isLogin = true;
                            loginVM.loginId = data.employeeNumber;
                            loginVM.loginName = data.employeeName;
                        }
                        if (loginVM.isLogin == true) {
                            require(['am.empMgr'], function (pp) {
                                var tabConfig = {tabName: '人员管理', useHref: true, href: 'am/employeeMgr.html', tmplLoaded: function (tmpl) {
                                    return tmpl;
                                }}
                                main.registerTabChangeCallBack(main.currentIndex, function () {
                                    //main.clearSider()
                                    pp.init()
                                })
                                var tabid = main.addTab(tabConfig);

                                pp.init();
                                avalon.scan();
                                main.changeTab(tabid, {onRemove: function () {
                                    main.clearSider()
                                }})
                            })
                        } else {
                            alert("请登录");
                        }
                    })
            }else{
                alert("没有权限");
            }
        }},
        {path: '/am/depMgr', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            if(loginVM.loginId=='MVP'||loginVM.loginRoleId==16) {
                amUtil.checkLogin(
                    function (data) {
                        if (data.success) {
                            loginVM.isLogin = true;
                            loginVM.loginId = data.employeeNumber;
                            loginVM.loginName = data.employeeName;
                        }
                        if (loginVM.isLogin == true) {
                            require(['am.depMgr'], function (pp) {
                                var tabConfig = {tabName: '部门管理', useHref: true, href: 'am/departmentMgr.html', tmplLoaded: function (tmpl) {
                                    return tmpl;
                                }}
                                main.registerTabChangeCallBack(main.currentIndex, function () {
                                    //main.clearSider()
                                    pp.init()
                                })
                                var tabid = main.addTab(tabConfig);
                                pp.init();
                                avalon.scan();
                                main.changeTab(tabid, {onRemove: function () {
                                    main.clearSider()
                                }})
                            })
                        } else {
                            alert("请登录");
                        }
                    })
            }else{
                alert("没有权限")
            }
        }},
        {path: '/am/privilegeMgr', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            amUtil.checkLogin(
                function(data) {
                    if (data.success) {
                        loginVM.isLogin = true;
                        loginVM.loginId = data.employeeNumber;
                        loginVM.loginName = data.employeeName;
                    }
                    if (loginVM.isLogin == true) {
                        require(['am.privilegeMgr'], function (pp) {
                            //pgd.$groupID=a;
                            var tabConfig = {tabName: '权限管理', useHref: true, href: 'am/privilegeMgr.html', tmplLoaded: function (tmpl) {
                                return tmpl;
                            }}
                            main.registerTabChangeCallBack(main.currentIndex,function(){
                                main.clearSider()
                                pp.init()
                            })
                            var tabid = main.addTab(tabConfig);
                            //pp.checkPrivilege();
                            pp.init();
                            avalon.scan();
                            main.changeTab(tabid, {onRemove: function () {
                            }})
                        })
                    } else {
                        alert("请登录");
                    }
                })
        }}
    ]
    //AM模块的侧边栏
    var amTongjiConfig = [{header: '报表统计', submenu: [
        {text: '项目工作包统计', href: '#!/am/planStatistics/select/byProject'},
        {text: '专业组工作包统计', href: '#!/am/planStatistics/select/byGroup'},
        {text: '员工任务统计', href: '#!/am/planStatistics/select/byEmployee'},
        {text: '部门工作包统计', href: '#!/am/planStatistics/select/byDepartment'}
    ]}]
    var amSidebarConfig = []/*[
        {header: '数据管理', submenu: [
            {text: '计划导入', href: '#'},
            {text: '计划制订', href: '#!/am/plan/LXS78M'},
            {text: '计划查询', href: '#!/am/plan/LXS78M'},
            {text: '计划下达', href: '#!/am/plan/LXS78M'},
            {text: '计划变更', href: '#!/am/plan/LXS78M'},
            {text: '计划取消', href: '#!/am/plan/LXS78M'}
        ]},
        {header: '项目管理', submenu: [
            {text: '创建项目', href: '#!/am/project/add'},
            {text: '项目分组', href: '#!/am/project/groupDistribution/1'},
            {text: '人员管理', href: '#!/am/project/groupMember/2'}
        ]}

    ];*/

    avalon.mix(configs, {init: init})
    return configs;
})
/**
 * 2014.10.14:add:增加规则/am/plan/:planID/:planOp
 * 2014.10.15:modify:所有规则在初始化时载入
 */