/**
 * Created by jiadongy on 10/4/2014.
 */
define(['RouterManager'], function (rm) {
    var configs = {};
    var hasInit = false;
    var employeeInfo = {};
    var fracasSidebarConfig = [];
    //FRACAS模块的侧边栏初始化逻辑
    configs.init = function()
    {
    		rm.addRules(cmProjectSelectRules);
    };
    //AM模块的业务与UI逻辑,当hasInit为false时载入
    var cmProjectSelectRules = [
        //打开一个planReport
        {path: '/cm', process: function (a) {
            require(['UIMainFrame', 'cm.contractRegist'], function (main, cm) {
                var tabConfig = {tabName: "合同登记表", useHref : true, href : "cm/contractRegist.html", tmplLoaded : function(tmpl) {return tmpl;}};
                var tabid = main.addTab(tabConfig);
                console.log(cm.vm);
            });

        }},

    ];

    return configs;
});
