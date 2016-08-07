/**
 * Created by FeiyuLab on 2014/9/28 0028.
 */
"use strict";
define(['mmRouter'],function (avalon) {
    window.UIMainFrame = avalon.define("UIMainFrame", function (vm) {
        /**
         * NavigationBar Part
         */
        vm.backToMainPage=function(){
            vm.removeAllTabs();
            /*var mainTabConfig={tabName: 'DashBoard',tabContent: "It's a DashBoard Page",removable:false};
            vm.addTab(mainTabConfig);*/
            vm.clearSider();
        }
        vm.navMenu = {};
        vm.setNavMenu = function (config) {
            if (typeof config == 'object' && config.leftMenu) {
                _initNavActive(config)
                vm.navMenu = config;
            }
        }
        vm._navActiveOne=function($index){
            _initNavActive(vm.navMenu);
            vm.navMenu.leftMenu[$index].active=true;
        }
        function _initNavActive(config){
            for(var i=0;i < config.leftMenu.length;i++){
                config.leftMenu[i].active=false;//标示此项是否为active
            }
        }
        /**
         * Sidebar Part
         */
        vm.$sidebars = {};
        vm.currentSidebar = [];
        vm.currentSpecialSidebar='';
        vm.projectManagementBar=false;
        vm.showNormalSidebar=true;
        vm.prjMaintainBar=false;
        vm.fastAccessBar=false;
        vm.planMgrBar=false;
        vm.commBar=false;
        vm.actionMgrBar = false
        /**
         * 增加Sidebar，包括Normal和Special
         * @param id
         * @param array ,Array：Normal，String(Html Code)：Special
         * @param focus
         */
        vm.addSidebar = function (id, array, focus) {
            if (typeof id == 'string' && array instanceof Array) {
                if (vm.$sidebars[id] == undefined || ( vm.$sidebars[id] != undefined && focus == true)) {
                    _initSidebarActive(array);
                    vm.$sidebars[id] = array;
                }
            }else if(typeof id == 'string' && typeof array == "string"){
                if (vm.$sidebars[id] == undefined || ( vm.$sidebars[id] != undefined && focus == true)) {
                    vm.$sidebars[id] = array;
                }
            }
        }
        vm.switchSidebar = function (id) {
            if (typeof id == 'string' && vm.$sidebars[id] != undefined) {
                if(vm.$sidebars[id] instanceof Array){
                    vm.currentSidebar = vm.$sidebars[id];
                    vm.showNormalSidebar = true;
                }else if(typeof vm.$sidebars[id] == "string"){
                    vm.currentSpecialSidebar=vm.$sidebars[id];
                    avalon.scan();
                    vm.showNormalSidebar = false;
                }

            }
        }

        vm._sidebarActiveOne=function($parentIndex,$childIndex){
            _initSidebarActive(vm.currentSidebar);
            vm.currentSidebar[$parentIndex].submenu[$childIndex].active=true;
        }
        vm.initSider=function(){
            vm.projectManagementBar=true;
            vm.anotherSidebar=false;
            vm.showOriginSidebar=false;
            vm.showNormalSidebar = false;
            vm.prjMaintainBar=false;
            vm.fastAccessBar=false;
            vm.planMgrBar=false;
            vm.commBar=false;
        }
        vm.initSiderBarAction=function(){
            vm.projectManagementBar=false;
            vm.anotherSidebar=false;
            vm.showOriginSidebar=false;
            vm.showNormalSidebar = false;
            vm.prjMaintainBar=false;
            vm.fastAccessBar=false;
            vm.planMgrBar=false;
            vm.commBar=false;
            vm.actionMgrBar = true
        }
        vm.initSiderBarPlanMgr=function(){
            vm.projectManagementBar=false;
            vm.anotherSidebar=false;
            vm.showOriginSidebar=false;
            vm.showNormalSidebar = false;
            vm.prjMaintainBar=false;
            vm.fastAccessBar=false;
            vm.planMgrBar=true;
            vm.commBar=false;
            vm.actionMgrBar = false
        }
        vm.fracasInit=function(){
            vm.projectManagementBar=false;
            vm.anotherSidebar=false;
            vm.showOriginSidebar=true;
            vm.prjMaintainBar=false;
            vm.fastAccessBar=false;
            vm.commBar=false;
           // vm.showNormalSidebar = false;
        }
        vm.clearSider=function(){
            vm.projectManagementBar=false;
            vm.anotherSidebar=false;
            vm.showOriginSidebar=false;
            vm.showNormalSidebar = false;
            vm.prjMaintainBar=false;
            vm.fastAccessBar=false;
            vm.planMgrBar=false;
            vm.commBar=false;
            vm.actionMgrBar = false
        }
        vm.prjMaintain=function(){
            vm.projectManagementBar=false;
            vm.anotherSidebar=false;
            vm.showOriginSidebar=false;
            vm.showNormalSidebar = false;
            vm.prjMaintainBar=true;
            vm.fastAccessBar=false;
            vm.planMgrBar=false;
            vm.commBar=false;
            vm.actionMgrBar = false
        }
        vm.fastAccess=function(){
            vm.projectManagementBar=false;
            vm.anotherSidebar=false;
            vm.showOriginSidebar=false;
            vm.showNormalSidebar = false;
            vm.prjMaintainBar=false;
            vm.fastAccessBar=true;
            vm.planMgrBar=false;
            vm.commBar=false;
            vm.actionMgrBar = false
        }
//        vm.communicate=function(){
//            vm.projectManagementBar=false;
//            vm.anotherSidebar=false;
//            vm.showOriginSidebar=false;
//            vm.showNormalSidebar = false;
//            vm.prjMaintainBar=false;
//            vm.fastAccessBar=false;
//            vm.commBar=true;
//        }
        function _initSidebarActive(array){
            for(var i in array){
                for(var j in array[i].submenu){
                    //array[i].submenu[j].active=false;
                }
            }
        }
        //vm.anotherSidebar=true;
//        vm.anotherSidebarSrc='simpletree/simpletree.html';
        vm.showOriginSidebar=true;



        /**
         * navTab Part
         */
        vm.$tabContentPrefix = 'simpleTabContent';
        vm.$maxTabNumInPage = 5;
        vm.currentIndex = 0;
        vm.$maxId = 0;
        vm.tabs = [];
        /**                        tab切换回调                   **/
        vm.$tabChangeCallbacks = {}
        vm.clickTabCallback = function ($index) {
            vm.currentIndex = $index;
        }
        vm.registerTabChangeCallBack = function (name, func) {
            vm.$tabChangeCallbacks[name] = func
        }
        vm.$watch("currentIndex", function (newValue, oldValue) {
//            alert(newValue + " " + oldValue);
            //在打开主页的时候进行调用函数的注册
            if(vm.$tabChangeCallbacks[newValue]!=null&&vm.$tabChangeCallbacks[newValue]!=undefined)
                vm.$tabChangeCallbacks[newValue]()
            else{
                vm.clearSider()
            }
//            for (var func in vm.$tabChangeCallbacks) {
//                func(newValue, oldValue)
//            }
        })
        /************************** end ****************************/
        /**
         * add(config) 新增tab, config = {tabName,tabContent,removable:true,
                useHref:false,href:'',rendered:avalon.noop,loaded:avalon.noop, onRemove:avalon.noop};
         * @param config
         * @returns {number|*|item.tabId}
         */
        vm.addTab = function (config) {
            var item = {tabName: "Tab Title", tabContent: "Tab Content", removable: true,
                useHref: false, href: '',
                tmplRendered: avalon.noop,
                tmplLoaded: function(tmpl){return tmpl;},
                onRemove: avalon.noop,
                unique:true
            };
            if (arguments.length == 1 && typeof config == 'object') {
                avalon.mix(item, config);//必要用mix浅拷贝，以让config重用
                item.tabId = vm.$maxId++;
                var index;
                var hrefIndex;
                if(item.unique && (index = vm._getTabIndexByName(item.tabName))>=0
                    || (hrefIndex = vm._getTabIndexByHref(item.href))>=0){
                    avalon.log('已存在tabName相同的Tab');
                    //alert(item.tabName+'已经存在');
                    if(index >= 0 ) {
                        vm.currentIndex = index;
                    }else{
                        vm.currentIndex = hrefIndex;
                        if(item.href=='am/plan_list.html'){
                            vm.tabs[vm.currentIndex].tabName = "计划管理主页"
                        }
                    }
                }
                else{
                    vm.tabs.push(item);
                    vm.currentIndex = vm.tabs.size() - 1;
                }
                return item.tabId;
            }
        }
        /**
         * changeTab config对象
         * @param id
         * @param config
         */
        vm.changeTab = function (id, config) {
            if (arguments.length == 2 && typeof config == 'object') {
                var index=vm._getTabIndex(id);
                index>=0 && avalon.mix(vm.tabs[index], config);
            }
        }
        //@method remove(e, index) 删除索引指向的tab，绑定情形下ms-click="remove($event, index)"，js调用则是vm.remove(index)
        vm.removeTab = function (e, index) {
            if (arguments.length == 2) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                index = e;
            }
            if (vm.tabs[index].removable != undefined && vm.tabs[index].removable === false) {
                return
            }
            var onRemove = vm.tabs[index].onRemove;
            vm.tabs.removeAt(index);
            avalon.nextTick(function () {
                var c1 = 0//统计当前删除的tab之后有几个tab
                var c2 = 0//统计第一个tab后还有几个tab
                for(var key in vm.$tabChangeCallbacks){
                    if(parseInt(key)>index){
                        if(index==0&&vm.$tabChangeCallbacks[key]!=null)
                            c2++
                        c1++
                        vm.$tabChangeCallbacks[key-1] = vm.$tabChangeCallbacks[key]
                        vm.$tabChangeCallbacks[key] = null
                    }
                }
                if(index==0){//当删除第一个tab的时候，调用下一个tab的初始化函数
                    if(vm.$tabChangeCallbacks[index]!=undefined&&vm.$tabChangeCallbacks[index]!=null)
                        vm.$tabChangeCallbacks[0]();
                }
                if(c1==0){//当删除最后一个tab的时候，将它的初始化函数设置为null
                    vm.$tabChangeCallbacks[index.toString()]=null
                }
                if(c2==0&&vm.currentIndex==index) {//当关闭所有tab的时候，将侧边栏清空
                    vm.clearSider()
                }
                vm.currentIndex = index > 1 ? index - 1 : 0;
                onRemove();
            })
            window.location.hash='#!/random'+Math.random();
        }
        vm.removeAllTabs=function(){
            vm.tabs.splice(0,vm.tabs.length);
        }
        vm._getTabIndex = function (id) {
            if (typeof id == 'number') {
                for (var index in vm.$model.tabs) {
                    if (vm.tabs[index].tabId == id) {
                        return index;
                    }
                }
            }
        }
        vm._getTabIndexByName = function(name){
            if (typeof name =='string'){
                for (var index in vm.$model.tabs) {
                    if (vm.tabs[index].tabName == name) {
                        return index;
                    }
                }
            }
        }
        vm._getTabIndexByHref = function(href){
            if (typeof href =='string'){
                for (var index in vm.$model.tabs) {
                    if (vm.tabs[index].href == href) {
                        return index;
                    }
                }
            }
        }
        vm.showTab = function (id) {
            var index = vm._getTabIndex(id);
            index>=0 && (vm.currentIndex = index);
            require(['am.planSummary'],function(ps){
                if(ps.currentIndex!=vm.currentIndex){
                    vm.planMgrBar = false
                }else vm.planMgrBar = true
            })
        }
        vm.getTab = function (id) {
            var index = vm._getTabIndex(id);
            if (index>=0) {
                return vm.tabs[index];
            }
        }
        /**
         * 关闭Tab，在tabContent Div内调用
         * @param $event
         */
        vm.closeThisTab = function($event){
            if(avalon.isPlainObject($event)==false){
                for(var i= 0,length=$event.path.length,one,id,found=false;i<length;i++){
                    one=$event.path[i]
                    if(avalon(one).hasClass("AreaTabContent")){
                        id = parseInt(avalon(one).attr('id').replace(vm.$tabContentPrefix,''));
                        for(var j=0;j<vm.tabs.length;j++){
                            if(vm.tabs[j].tabId==id){
                                vm.removeTab(j)
                                found=true;
                                break;
                            }
                        }
                        if(found)
                            break;
                    }
                }
            }
        }
        //bug:ms-click绑定不到DOM上
        vm.showTabInDropdownMenu = function (e, index) {
            if (arguments.length == 2) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                index = e;
            }
            var temp = vm.tabs[index];
            vm.tabs[index] = vm.tabs[vm.$maxTabNumInPage - 1];
            vm.tabs[vm.$maxTabNumInPage - 1] = temp;
        }
        vm._canRemove = function (tab) {
            return tab.removable != undefined ? tab.removable == true : true;
        }
        /**
         * Global Setting
         */
        vm.applyAll = function () {
            require('ready!', function () {
                avalon.scan(document.body);
            })
        }
        //Sidebar
        vm.leftSidebarClass = "span2"
        vm.leftSidebarVisiablity = true
        vm.contentClass = "span10"
        vm.buttonContent = "<"
        vm.sidebarOpen = true
        vm.toggleSideBar = function () {
            if (vm.sidebarOpen) {
                vm.leftSidebarClass = ""
                //$('#leftsidebar').fadeOut()
                vm.leftSidebarVisiablity = false
                vm.contentClass = "span12"
                vm.buttonContent = "＞"
                vm.sidebarOpen = false
            } else {
                vm.leftSidebarClass = "span2"
                vm.leftSidebarVisiablity = true
                vm.contentClass = "span10"
                vm.buttonContent = "＜"
                vm.sidebarOpen = true
            }
        }
        return vm;
    });
    return UIMainFrame;
})
/**
 * 2014.10.12:add:injectTmplParentId()，向模板注入parentId属性，以便模板实现DOM隔离（2014.10.13已删除）
 *            del:apply***()
 *            add:tab的unique属性，默认true
 * 2014.10.15:add:_navActiveOne，_initNavActive，_initSidebarActive，_sidebarActiveOne，导航栏和侧边栏的单击active效果
 *                  问题：监控的层级太多，影响性能，未来重构
*/