/**
 * Created by rtio on 2015/6/16.
 */
define(['jquery','utils','am.sessionUtil','Login','text!./usrOpt.html','ready!'],
    function($,utils,sessionUtil,login,modalHtml){
    var usrOptVM = {}
    var usrOptMode = {}
    var modalInited = false
    var usrId = login.loginId

    /*var funcSharer = (function(){
        var vm,
            publicMethods = {
                tmplLoaded: function (tmpl) {
                    avalon.log('正在修改report' + vm.$taskID + '模板');
                    tmpl = utils.tmpl.clearUselessHtml(tmpl);
                    tmpl = tmpl.replace(/(ms-important=")[\S]+(UsrOpt")/, 'ms-important="' + vm.name + '"');
//                    tmpl = tmpl.replace(/(ms-important=")[\S]+(")/, 'ms-important="' + vm.name + '"');
//                    $("#taskDecompose").attr("ms-important","task"+vm.$taskID);
//                    var tmp = $("#taskDecompose").attr("ms-important");
                    return tmpl;
                },
                executeCallback: function (callbackName) {
                    var func = callbacks[callbackName]
                    if (avalon.type(func) == "function") {
                        avalon.log("execute Callback " + callbackName)
                        func(vm)
                    }
                }
            }
        executor = function(localVM,methodName){
            return function(){
                var methodCalled = publicMethods[methodName]
                if(methodCalled){
                    vm = localVM
                    return methodCalled.apply(vm,arguments)
                }
            }
        }
        executor.publicMethods = publicMethods
    })()*/

    usrOptMode = avalon.define("UsrOpt",function(vm){
        vm.name = ""
        vm.saveType = ""
        vm.title = []
        vm.optNum = 0
        vm.threshold = 5
        //判断表头自定义属性
        vm.setUsrOpt = function(value){
//                setTimeout(function(){
//                    if(value){
//                        vm.optNum[term+'OptNum']++
//                    }else{
//                        vm.optNum[term+'OptNum']--
//                    }
//                },100)
            if(value){
                vm.optNum++
            }else{
                vm.optNum--
            }
            require(['am.planSummary','ready!'],function(ps){
                ps.planTitleNum = vm.optNum
            })
        }
        //保存用户表头自定义
        vm.saveUsrOpt = function(){
            var usrOpt = "{"
            vm.title.forEach(function(el){
                el.value?usrOpt=usrOpt+el.key+":"+1+",":usrOpt=usrOpt+el.key+":"+0+","
            })
            usrOpt+="}"
            vm.saveType =vm.saveType[0].toLocaleUpperCase() + vm.saveType.substr(1,vm.saveType.length) + "ListOpt"
            sessionUtil.saveUsrOpt(login.loginId,vm.saveType,usrOpt,function(data){
            })
        }
    })
    function setData(name,title){
        usrOptMode.saveType = name
        switch(name){
            case "actionDir":name="行动项目录表头选择";break;
            case "action":name="行动项表头选择";break;
            case "actionWaiting":name="行动项待办事项表头选择";break;
            case "plan":name="计划列表表头选择";break;
            case "task":name="任务列表表头选择";break;
            case "planWaiting":name="任务待办列表表头选择";break
        }
        usrOptMode.name = name
        usrOptMode.title = title
        var optNum = 0
        title.forEach(function(el){
            if(el.value) optNum++
        })
        usrOptMode.optNum = optNum
    }
    function init(){
        if(!modalInited){
            $(document.body).append($(modalHtml))
            var selectorElement = document.getElementById("UsrOpt")
            avalon.scan(selectorElement)
            modalInited=true
        }
    }
    init()
    avalon.mix(usrOptVM,{usrOptMode:usrOptMode,setData:setData})
    return usrOptVM
})