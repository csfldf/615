/**
 * Created by fanjiahua on 2014/12/1.
 */
define(['RouterManager',"mmRequest", "UIMainFrame"], function (rm,avalon, main) {
    var model=avalon.define("metadataMgr",function(vm) {
        vm.init=function(){
            //rm.addRules(metadataRules);
            main.clearSider();
            main.addSidebar('metadataSidebar', metadataSider, true);
            main.switchSidebar('metadataSidebar')
        }
        var metadataSider=[
            {header: '元数据管理', submenu: [
                {text: '人员管理', href: '#!/am/employeeMgr'},
                {text: '权限管理', href: '#!/am/privilegeMgr'}
            ]}
        ];
    })

    var metadataRules=[
        {path: '/am/employeeMgr', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            require(['am.empMgr'], function (pp) {
                var tabConfig = {tabName: '人员管理', useHref: true, href: 'am/employeeMgr.html', tmplLoaded: function (tmpl) {
                    return tmpl;
                }}
                main.registerTabChangeCallBack(main.currentIndex,function(){
                    main.clearSider()
                    model.init()
                })
                var tabid = main.addTab(tabConfig);

                pp.init();
                avalon.scan();
                main.changeTab(tabid, {onRemove: function () {
                }})
            })
        }},
        {path: '/am/privilegeMgr', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            require(['am.privilegeMgr'], function (pp) {
                //pgd.$groupID=a;
                var tabConfig = {tabName: '权限管理', useHref: true, href: 'am/privilegeMgr.html', tmplLoaded: function (tmpl) {
                    return tmpl;
                }}
                main.registerTabChangeCallBack(main.currentIndex,function(){
                    main.clearSider()
                    model.init()
                })
                var tabid = main.addTab(tabConfig);
                //pp.checkPrivilege();
                pp.init();
                avalon.scan();
                main.changeTab(tabid, {onRemove: function () {
                }})
            })
        }}
    ]
    return model;
})