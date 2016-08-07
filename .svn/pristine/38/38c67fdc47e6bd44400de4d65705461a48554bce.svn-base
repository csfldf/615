/**
 * Created by jiadongy on 10/4/2014.
 */
define(['RouterManager','fracas.sessionUtil'], function (rm, sessionUtil) {
    var configs = {};
    var hasInit = false;
    var employeeInfo = {};
    var fracasSidebarConfig = [];
    //FRACAS模块的侧边栏初始化逻辑
    configs.fracasInitRules =
    {
        path: '/fracas', process: function (a) {
            sessionUtil.getEmployeeInfo(function(data) {
                var isProjectAdmin = false;
                var isMetadataAdmin = false;
                //AM模块的侧边栏
                fracasSidebarConfig = [
                    {header: 'fracas', submenu: [
                        {text: '事件汇总', href: '#!/fracas/event_summary'},
                        {text: '草稿箱', href: '#!/fracas/drafts'},
                        {text: '故障报告录入', href: '#!/fracas/failure_report/1/'},
                        {text: '报告搜索', href: '#!/fracas/report_search'}
                    ]}];

                employeeInfo = data;
                if(employeeInfo === null) {
                    alert("请先登录");
                }
                if(employeeInfo !== null){
                    //alert(employeeInfo.employeeName);
                    //alert(employeeInfo.projectRole.length);
                    for ( var i = 0; i < employeeInfo.projectRole.length; i++){
                        //alert(employeeInfo.projectRole[i][1]);
                        if(employeeInfo.projectRole[i][1] == 11){
                            isProjectAdmin = true;
                        }
                        if(employeeInfo.projectRole[i][1] == 12){
                            isMetadataAdmin = true;
                        }
                    }
                    if(isProjectAdmin && isMetadataAdmin){
                        fracasSidebarConfig.push({header: '管理', submenu: [{text: '项目管理', href: '#!/fracas/project_management'},
                                                                          {text: '元数据管理', href: '#!/fracas/metadata_management'}]
                                                 });
                    }
                    else if(isProjectAdmin && !isMetadataAdmin){
                        fracasSidebarConfig.push({header: '管理', submenu: [{text: '项目管理', href: '#!/fracas/project_management'}]});
                    }
                    else if(!isProjectAdmin && isMetadataAdmin){
                        fracasSidebarConfig.push({header: '管理', submenu: [{text: '元数据管理', href: '#!/fracas/metadata_management'}]});
                    }

                    //if (!configs.hasInit) {
                    UIMainFrame.addSidebar('fracasSidebar', fracasSidebarConfig, true);
                    rm.addRules(fracasProjectSelectRules);
                    //configs.hasInit = true;
                    //}
                    UIMainFrame.switchSidebar('fracasSidebar');
                    // Jump to project select directly
                    setTimeout(function() {
                            window.location.href='#!/fracas/event_summary';
                        }, 0);
                    }

            });


        }
    };
    //AM模块的业务与UI逻辑,当hasInit为false时载入
    var fracasProjectSelectRules = [
        //打开一个planReport
        {path: '/fracas/project_select', process: function (a) {
            require(['fracas.projectSelect', 'UIMainFrame'], function (ps, main) {
                var tabConfig = {tabName: "项目选择", useHref : true, href : "fracas/projectSelect.html", tmplLoaded : function(tmpl) {return tmpl;}};
                var tabid = main.addTab(tabConfig);
                ps.init(tabid);
            });

        }},

        {path: '/fracas/event_summary', process: function (a) {
            if(avalon.vmodels.tree !== undefined)
                avalon.vmodels.tree.remove("root");
            require(['fracas.eventSummary', 'UIMainFrame'], function (es, main) {
                var tabConfig = {tabName: "事件汇总", useHref : true, href : "fracas/eventSummary.html", tmplLoaded : function(tmpl) {return tmpl;}};
                var tabid = main.addTab(tabConfig);
                es.init();
            });

        }},

        {path: '/fracas/drafts', process: function (a) {
            require(['fracas.drafts', 'UIMainFrame'], function (fr, main) {
                var tabConfig = {tabName: "草稿箱", useHref : true, href : "fracas/drafts.html", tmplLoaded : function(tmpl) {return tmpl;}};
                var tabid = main.addTab(tabConfig);
                fr.init(1, '');
            });

        }},

        {path: '/fracas/failure_report/:mode/:frNumber', process: function (mode, frNumber) {
            require(['fracas.failureReport', 'UIMainFrame', "utils"], function (fr, main, utils) {
                if(mode == 1) {
                    frNumber = "FR" + Date.now();
                }
                var vm = fr.getVm(frNumber);
                var tabConfig = {tabName: "故障报告" + frNumber, useHref : true, href : "fracas/failureReport.html", tmplLoaded : function(tmpl) {
                    tmpl = utils.tmpl.clearUselessHtml(tmpl);
                    tmpl = tmpl.replace(/(ms-controller=")[\S]+(")/, 'ms-controller="' + frNumber + '"');
                    return tmpl;}};
                var tabid = main.addTab(tabConfig);
                fr.init(mode, frNumber);
            });

        }},

        {path: '/fracas/failure_analyse/:mode/:id', process: function (mode, id) {
            require(['fracas.failureAnalyse', 'UIMainFrame', 'utils'], function (far, main, utils) {
                var farId;
                if(mode == 1) {
                    farId = "FAR" + Date.now();
                }
                else {
                    farId = id;
                }
                var vm = far.getVm(farId);
                var tabConfig = {tabName: "故障分析" + farId, useHref : true, href : "fracas/failureAnalyse.html", tmplLoaded : function(tmpl) {
                    tmpl = utils.tmpl.clearUselessHtml(tmpl);
                    tmpl = tmpl.replace(/(ms-controller=")[\S]+(")/, 'ms-controller="' + farId + '"');
                    return tmpl;
                    }
                };
                var tabid = main.addTab(tabConfig);
                far.init(mode, id);
            });

        }},

        {path: '/fracas/car/:mode/:id/:farId', process: function (mode, id, farId) {
            require(['fracas.car', 'UIMainFrame', 'utils'], function (car, main, utils) {
                var carId;
                if(mode == 1) {
                    carId = "CAR" + Date.now();
                }
                else {
                    carId = id;
                }
                var vm = car.getVm(carId);
                var tabConfig = {tabName: "故障处理" + carId, useHref : true, href : "fracas/car.html", tmplLoaded : function(tmpl) {
                    tmpl = utils.tmpl.clearUselessHtml(tmpl);
                    tmpl = tmpl.replace(/(ms-controller=")[\S]+(")/, 'ms-controller="' + carId + '"');
                    return tmpl;
                    }
                };
                var tabid = main.addTab(tabConfig);
                car.init(mode, id, farId);
            });

        }},

        {path: '/fracas/report_search', process: function (a) {
            require(['fracas.reportSearch', 'UIMainFrame'], function (fr, main) {
                var tabConfig = {tabName: "报告搜索", useHref : true, href : "fracas/reportSearch.html", tmplLoaded : function(tmpl) {return tmpl;}};
                var tabid = main.addTab(tabConfig);
                fr.init(1, '');
            });
        }},

        {path: '/fracas/report_data', process: function (a) {
            require(['fracas.reportData', 'UIMainFrame'], function (fr, main) {
                var tabConfig = {tabName: "数据统计", useHref : true, href : "fracas/reportData.html", tmplLoaded : function(tmpl) {return tmpl;}};
                var tabid = main.addTab(tabConfig);
                fr.init(1, '');
            });
        }},

        {path: '/fracas/project_management', process: function (a) {
            require(['fracas.projectManagement', 'UIMainFrame'], function (fr, main) {
                var tabConfig = {tabName: "项目管理", useHref : true, href : "fracas/projectManagement.html", tmplLoaded : function(tmpl) {return tmpl;}};
                var tabid = main.addTab(tabConfig);
                fr.init();
            });
        }},

        {path: '/fracas/metadata_management', process: function (a) {
            require(['fracas.metadataManagement', 'UIMainFrame'], function (fr, main) {
                var tabConfig = {tabName: "元数据管理", useHref : true, href : "fracas/metadataManagement.html", tmplLoaded : function(tmpl) {return tmpl;}};
                var tabid = main.addTab(tabConfig);
                fr.init(1, '');
            });

        }},

    ];

    return configs;
});
