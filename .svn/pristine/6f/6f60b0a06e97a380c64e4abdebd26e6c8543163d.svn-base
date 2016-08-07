/**
 * Created by rtio on 2015/6/1.
 */
define(['jquery','am.sessionUtil','am.cookie','Login','selector','am.searchUtil','am.amCommonFunc','UIMainFrame',
        'fineuploader','usrOpt',
        'datatables.bootstrap','datatables','bootstrap','ready!'],
    function($,sessionUtil,ck,login,select,searchUtil,commonFunc,main,fn,up) {
        var usrId = login.loginId;
        var actionSummaryVM = {};
        var usrId = login.loginId;

        var actionSummaryMode = avalon.define("actionSummary", function (vm) {
            //设置侧边栏
            vm.projectId = ''
            vm.actionSideBarConfig = {
                header:"行动项操作",
                subMenu:[
                    {
                        href: '#/am/actionDir/' + Date.now() + '/new/#projectId=' + vm.projectId,
                        text:"新增行动项目录"
                    }
                ]
            }
            //others
            vm.showActionDirId = ""
            vm.projectId = ''
            //English to Chinese
            vm.e2c = {
//                wbs:'wbs',
//                actionId:"行动项ID",
//                parentActionId:"父行动项ID",
                actionType:"类型",
                actionName:"名称",
                actionDeadlineDate:"截止时间",
                actionFinishDate:"完成时间",
                state:"工作状态",
                actionResource:"来源",
                controllerDepartment:"所属部门",
                actionController:"责任人",
                actionControllerId:"责任人ID",
                remark:"备注",
                projectId:"所属项目",
                actionRemainingDate:'剩余天数'
            }
            //title to show
            vm.titleOptDefault = {
                wbs:true,
                actionId:true
            }
            vm.title = {
                actionDirTitle:[],
                actionTitle:[],
                actionWaitingTitle:[]
            }
            //filter
            vm.filter={
                reportName:"",
                column:"",
                values:[],
                org_values:[],
                filtered_values:[]
            }
            vm.modalName = "filter_action"
            //data
            vm.data = {
                project:{
                    reports:[],
                    search_filter_reports:[],
                    filted:false,
                    curReports:[],
                    pageSize:5,
                    indexPage:0,
                    pageNum:0
                },
                actionWaiting:{
                    reports:[],
                    search_filter_reports:[],
                    filted:false,
                    curReports:[],
                    pageSize:5,
                    indexPage:0,
                    pageNum:0
                },
                actionDir:{
                    action_reports:[],
                    search_filter_reports:[],
                    filted:false,
                    reports:[],
                    curReports:[],
                    pageSize:5,
                    indexPage:0,
                    pageNum:0
                },
                action:{
                    original_reports:[],
                    search_filter_reports:[],
                    filted:false,
                    reports:[],
                    curReports:[],
                    pageSize:5,
                    indexPage:0,
                    pageNum:0
                }
            }
            //设置最多显示的表头数目
            vm.threshold = 5
            vm.optNum = {
                actionDirOptNum:0,
                actionOptNum:0,
                actionWaitingOptNum:0
            }

            //change imagine
            vm.changeShrinkExpandImg = function(id){
                commonFunc.changeShrinkExpandImg(id);
            };
            //set level shrink and expand
            vm.changeActionExpandShrink = function(cl,el){
                $("."+cl).attr("src")=="img/planExpand.png"?$("."+cl).attr("src","img/planShrink.png"):
                    $("."+cl).attr("src","img/planExpand.png");
                //保证高度不变
                var height = $("#accordion-element-actionList").height();
                var dataOrigin = vm.data['actionDir']['original_reports']
                //收
                if($("."+cl).attr("src")=="img/planExpand.png"){
                    //将原来的数组进行重置
                    vm.data['actionDir']['reports'] = []
                    var parentActionId = el.actionId
                    var parentWbs = el.wbs
                    for(var i=0;i<dataOrigin.length;i++){
                        if(dataOrigin[i].actionId == parentActionId){
                            dataOrigin[i].imgSrc = "img/planExpand.png"
                        }
                        if(dataOrigin[i].wbs.indexOf(parentWbs)!=-1 && dataOrigin[i].wbs.length > parentWbs.length){
                            dataOrigin[i].visible = false
                        }
                        if(dataOrigin[i].visible==true)
                            vm.data['actionDir']['reports'].push(dataOrigin[i])
                    }
                    //PlanList分页设置
                    vm.data['actionDir']['curReports']   = vm.data['actionDir']['reports'].slice(0, vm.data['actionDir']['pageSize']);
                    vm.data['actionDir']['pageNum'] = Math.ceil(vm.data['actionDir']['reports'].length / vm.data['actionDir']['pageSize']);
                }else{//放
                    //重置初始数组
                    vm.data['actionDir']['reports'] = []
                    var parentActionId = el.actionId
                    for(var i= 0,k=0;i<dataOrigin.length;i++,k++){
                        //改变图标
                        if(dataOrigin[i].actionId==parentActionId){
                            dataOrigin[i].imgSrc = "img/planShrink.png"
                        }
                        if(dataOrigin[i].parentActionId==parentActionId){
                            dataOrigin[i].visible = true
                            if(dataOrigin[i].imgSrc == "img/planShrink.png"){
                                vm.expandThis(i+1,dataOrigin[i].actionId)
                            }
                        }
                        //重写元数据
                        if(dataOrigin[i].visible==true)
                            vm.data['actionDir']['reports'].push(dataOrigin[i])
                    }
                    //PlanList分页设置
                    vm.data['actionDir']['curReports']   = vm.data['actionDir']['reports'].slice(0, vm.data['actionDir']['pageSize']);
                    vm.data['actionDir']['pageNum'] = Math.ceil(vm.data['actionDir']['reports'].length / vm.data['actionDir']['pageSize']);
                }
                //保证高度不变
                if($("."+cl).attr("src")=="img/planShrink.png") {
                    $("#accordion-element-actionList").css('height', 'auto').height();
                }
                else {
                    $("#accordion-element-actionList").height(height)
                }
            };
            vm.expandThis = function(index,actionId){
                var acc = 0;
                for(var i=index;i<vm.data['actionDir']['original_reports'].length;i++,acc++){
                    if(vm.data['actionDir']['original_reports'][i].parentActionId==actionId) {
                        vm.data['actionDir']['original_reports'][i].visible = true
                        if(vm.data['actionDir']['original_reports'][i].imgSrc=="img/planShrink.png"){
                            i += vm.expandThis(i+1,vm.data['actionDir']['original_reports'][i].actionId)
                        }
                    }
                }
                return acc
            }
            //set page size
            vm.setPages = function(sid,aid,term){
                vm.data[term]['pageSize'] = parseInt($("#"+sid).val());
                vm.data[term]['curReports']   = vm.data[term]['search_filter_reports'].slice(0, vm.data[term]['pageSize']);
                vm.data[term]['pageNum'] = Math.ceil(vm.data[term]['search_filter_reports'].length / vm.data[term]['pageSize']);
                vm.data[term]['indexPage'] = 0;
                $("#"+aid).css('height','auto').height();
            };
            //设置表头属性顺序
            vm.setActionPos = function(sid,el){
                var posNew = parseInt($("."+sid).val());
                var tmpTitle = vm.title['actionTitle']
                for(var i=0;i<tmpTitle.length;i++){
                    if(tmpTitle[i].position!=undefined && tmpTitle[i].position==posNew){
                        tmpTitle[i].position = el.position
                        el.position = posNew
                        $(".select-opt-"+ tmpTitle[i].key).val(tmpTitle[i].position)
                        i = tmpTitle.length
                    }
                }
                var min = 0;
                var acc = 0
                for(var i=0;i<tmpTitle.length&&acc<vm.threshold;i++){
                    min = i
                    if(tmpTitle[i].value) {
                        for (var j = i; j < tmpTitle.length && acc < vm.threshold; j++) {
                            if (tmpTitle[j].position < tmpTitle[min].position) min = j
                        }
                        var tmp = tmpTitle[i]
                        tmpTitle[i] = tmpTitle[min]
                        tmpTitle[min] = tmp
                        acc++
                    }
                }
            }   
            vm.openUsrSetWindow = function(term){//打开设置窗口
                up.setData(term,vm.title[term+'Title'])
                $('#UsrOpt').modal('show')
            }  
            vm.prePage = function(term) {//设置翻页:前一页
                if (vm.data[term]['indexPage'] > 0) {
                    vm.data[term]['indexPage'] --
                    vm.data[term]['curReports'] =
                        vm.data[term]['search_filter_reports'].slice(vm.data[term]['indexPage']*vm.data[term]['pageSize'],
                                vm.data[term]['indexPage']*vm.data[term]['pageSize']+vm.data[term]['pageSize']);
                }
            };
            vm.nextPage = function(term) {//设置翻页：后一页
                var pageSize = vm.data[term]['pageSize']
                var height = $("#accordion-element-"+term+"List").height();
                if (vm.data[term]['indexPage']+1 < vm.data[term]['pageNum']) {
                    vm.data[term]['indexPage'] ++;
                    vm.data[term]['curReports'] =
                        vm.data[term]['search_filter_reports'].slice(vm.data[term]['indexPage']*pageSize,
                                vm.data[term]['indexPage']*pageSize+pageSize);
                }
                if(vm.data[term]['indexPage']+1==vm.data[term]['pageNum']){
                    $("#accordion-element-"+term+"List").height(height);
                }
            };
            vm.newActionDir = function(){
                if(vm.projectId==''){
                    alert("请选择一个项目！！！")
                }else {
                    window.location.href = '#/am/actionDir/' + Date.now() + '/new/#projectId=' + vm.projectId;
                }
            }
            vm.loadActionDirs = function(project){
                var projectName = ""
                if(project=="null"){
                    projectName = $("#select-shortcuts-actionProject").val()
                }else{
                    projectName = project.projectName
                }
                //重置radio
                vm.data['project']['reports'].forEach(function(e){
                    if(e.projectName!=projectName){
                        e.text = false
                    }else{
                        vm.projectId = e.projectId
                        e.text = true
                        vm.projectId = e.projectId
                        $("#select-shortcuts-actionProject").val(projectName)
                    }
                })
                vm.projectId = vm.projectId

                //清空action列表中的数据
                vm.data['action']['reports'] = []
                vm.data['action']['curReports'] = []
                vm.data['action']['search_filter_reports'] = []
                vm.data['action']['indexPage'] = 0
                vm.data['action']['pageSize'] = 5
                vm.data['action']['pageNum'] = 0
                sessionUtil.getProjectActions(project.projectId,function(data){
                    data = displayAction(data)
                    //分离行动项目录和行动项
                    var adData = []
                    var aData = []
                    data.forEach(function(el){
                        if(el.leaf==0){
                            adData.push(el)
                        }else{
                            aData.push(el)
                        }
                    })
                    vm.data['actionDir']['original_reports'] = adData
                    vm.data['actionDir']['reports'] = adData
                    vm.data['actionDir']['search_filter_reports'] = adData
                    vm.data['actionDir']['action_reports'] = aData
                    //*设置分页的显示
                    vm.data['actionDir']['pageSize'] = 5
                    vm.data['actionDir']['indexPage'] = 0
                    //PlanList分页设置
                    vm.data['actionDir']['curReports'] = vm.data['actionDir']['reports'].slice(0, vm.data['actionDir']['pageSize'])
                    vm.data['actionDir']['pageNum'] = Math.ceil(vm.data['actionDir']['reports'].length / vm.data['actionDir']['pageSize'])
                })
                //重置pages
                $("#option-actionList").attr("selected","selected")
            }
            vm.loadActionDir = function(actionDir){
                window.location.href = '#!/am/actionDecompose/'+actionDir.actionId;
            }
            vm.loadActions = function(actionDir){
                vm.showActionDirId = actionDir.actionId
                //重置radio
                vm.data['actionDir']['search_filter_reports'].forEach(function(el){
                    if(el.text){
                        if(el.actionId!=actionDir.actionId){
                            el.text = false
                        }
                    }
                })
                vm.data['action']['reports'] = []
                vm.data['action']['curReports'] = []
                vm.data['action']['pageNum'] = 0
                vm.data['actionDir']['action_reports'].forEach(function(el){
                    if(el.parentActionId==actionDir.actionId){
                        vm.data['action']['reports'].push(el)
                    }
                })
                vm.data['action']['search_filter_reports'] = vm.data['action']['reports']
                //PlanList分页设置
                vm.data['action']['curReports'] = vm.data['action']['reports'].slice(0, vm.data['action']['pageSize'])
                vm.data['action']['pageNum'] = Math.ceil(vm.data['action']['reports'].length / vm.data['action']['pageSize'])
            }
            vm.loadAction = function (action) {
                window.location.href = '#!/am/action/' + action.actionId;
            }
            //==================实现筛选==================//
            vm.filterConfig=function(reportName,column){
                vm.filter.org_values = []
                vm.filter.reportName = reportName
                vm.filter.column = column
                for(var i=0;i<vm.data[reportName]['reports'].length;i++){
                    if(!vm.verify_in(vm.data[reportName]['reports'][i][column],vm.filter.org_values,'name')){
                        var tmp=new Object()
                        tmp.enabled=vm.verify_in(vm.data[reportName]['reports'][i][column],vm.data[reportName].search_filter_reports,column)?true:false
//                    tmp.enabled = true
                        tmp.name=vm.data[reportName]['reports'][i][column]
                        vm.filter.org_values.push(tmp)
                    }
                }
                vm.filter = vm.filter
                $('#'+vm.modalName).modal('show')
            }
            vm.verify_in = function(key,array,column){
                for(var i=0;i<array.length;i++){
                    if(key==array[i][column]){
                        return true;
                    }
                }
                return false;
            }
            vm.executeFilter=function(){
                vm.filter.values=[]
                var orgORsearch=false
                for(var i=0;i<vm.filter.org_values.size();i++){
                    if(vm.filter.org_values[i].enabled){
                        vm.filter.values.push(vm.filter.org_values[i].name)
                        if(!vm.verify_in(vm.filter.org_values[i].name,vm.data[vm.filter.reportName].search_filter_reports,vm.filter.column)){
                            orgORsearch=true
                        }
                    }
                }
                vm.data[vm.filter.reportName].search_filter_reports=searchUtil.filter(
                    orgORsearch?vm.data[vm.filter.reportName].reports:vm.data[vm.filter.reportName].search_filter_reports,vm.filter.column,vm.filter.values)
                vm.refreshReports(vm.filter.reportName)
                //判断是否进行了筛选，若进行了筛选则取消树形结构
                if(vm.filter.values.length!=vm.filter.org_values.length)
                    vm.data[vm.filter.reportName]['filted'] = true
                else vm.data[vm.filter.reportName]['filted'] = false
                $('#'+vm.modalName).modal('hide')
            }
            vm.refreshReports=function(reportName){
                if(reportName=='groupMembers'){
                    vm.orderByDict(reportName,'employeeName',1)
                    var back=0
                    for(var i=0;i<vm.data[reportName].search_filter_reports.size();i++){
                        if(i!=0&&vm.data[reportName].search_filter_reports[i].roleId==2){
                            while(vm.data[reportName].search_filter_reports[back].roleId==2){
                                back++
                                if(back==i) break
                            }
                            if(back>=i){
                                continue
                            }
                            var tmp=vm.data[reportName].search_filter_reports[i]
                            vm.data[reportName].search_filter_reports[i]=vm.data[reportName].search_filter_reports[back]
                            vm.data[reportName].search_filter_reports[back]=tmp
                            back++
                        }
                    }
                }
                //设置分页
//            vm.data[reportName]['reports'] = vm.data[reportName].search_filter_reports
                vm.data[reportName]["curReports"]=vm.data[reportName].search_filter_reports.slice(0,vm.data[reportName]['pageSize'])
                vm.data[reportName]['pageNum']=Math.ceil(vm.data[reportName].search_filter_reports.length / vm.data[reportName]['pageSize'])
                vm.data[reportName]['indexPage']=0;
                vm.data[reportName]['filterNum']= vm.data[reportName].search_filter_reports.size()
            }
            vm.selALL = function(check){
                for(var i=0;i<vm.filter.org_values.size();i++){
                    vm.filter.org_values[i].enabled=check?true:false
                }
            }
            //==================实现排序==================//
            vm.orderByDict = function(type, column, order) {
                vm.data[type]['reports'] = searchUtil.orderByDict(vm.data[type]['reports'], column, order);
                vm.data[type]['curReports'] = vm.data[type]['reports'].slice(vm.data[type]['indexPage']*vm.data[type]['pageSize'],
                        vm.data[type]['indexPage']*vm.data[type]['pageSize']+vm.data[type]['pageSize']);
            };
            vm.orderByNumber = function(type, column, order) {
                vm.data[type]['reports'] = searchUtil.orderByNumber(vm.data[type]['reports'], column, order);
                vm.data[type]['curReports'] = vm.data[type]['reports'].slice(vm.data[type]['indexPage']*vm.data[type]['pageSize'],
                        vm.data[type]['indexPage']*vm.data[type]['pageSize']+vm.data[type]['pageSize']);
            };
        })

        function displayAction(data){
            //初始化行动项
            var level = new Array(10)
            for(var i=0;i<level.length;i++)
                level[i]=1
            var baseSpace = "&nbsp;&nbsp;&nbsp;&nbsp;"
            var d = new Date();
            var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
            for(var u=0;u<data.length; u++) {
                //初始化恒定变量
                data[u].text = false;
                data[u].visible = true;
                //=================设置状态================//
                sessionUtil.amSetState('action',data[u])
                //调整日期
                data[u].actionFinishDate = data[u].actionFinishDate.split(" ")[0]
                data[u].actionDeadlineDate = data[u].actionDeadlineDate.split(" ")[0]
                //调整空格
                var spaceSize = data[u].actionId.indexOf(" ")!=-1?data[u].actionId.split(" ")[0]:0
                data[u].space = ""
                for(var i=0;i<spaceSize;i++) {
                    data[u].space += baseSpace
                }
                data[u].actionId.split(" ")[1]==undefined?null:data[u].actionId=data[u].actionId.split(" ")[1]
                data[u].wbs = ""
                for(var i=0;i<data[u].level;i++){
                    i!=data[u].level-1?data[u].wbs += (level[i]+"."):data[u].wbs+= level[i]
                }
                if(u+1<data.length && data[u+1].level <= data[u].level)
                    level[data[u+1].level-1]++
                //显示类别
                if(data[u].leaf==true){
                    data[u].type = "行动项"
                }else{
                    data[u].type = "行动项目录"
                }
                data[u].visible = true
                //调整图片显示
                if(data[u].leaf)
                    data[u].imgSrc = ""
                else {
                    if(u+1<data.length){
                        if(data[u+1].level>data[u].level)
                            data[u].imgSrc = "img/planShrink.png"
                        else data[u].imgSrc = ""
                    }else{
                        data[u].imgSrc = ""
                    }
                }
                //计算剩余天数
                data[u].actionRemainingDate = sessionUtil.DateDiff(data[u].actionDeadlineDate,now)
            }
            return data
        }
        //初始化模块
        actionSummaryVM.init = function(){
            var usrId = login.loginId;
            sessionUtil.getUserProject(usrId,function(data){
                var proGrids = eval('('+ data +')');
                proGrids.forEach(function(el){
                    el.text = false
                })
                actionSummaryMode.data['project']['reports'] = proGrids
                //ProjectList分页设置
                var pageSize = 5;
                actionSummaryMode.data['project']['curReports'] = actionSummaryMode.data['project']['reports'].slice(0,pageSize)
                actionSummaryMode.data['project']['pageNum'] = Math.ceil(actionSummaryMode.data['project']['reports'].length / pageSize);
            })
            //获取表头配置
            sessionUtil.getUsrActionOpt(usrId,function(opt) {
                var ss = opt.split(" ")
                var opts = []
                ss.forEach(function(el){
                    opts.push(eval('('+el+')'))
                })
                //================获取待办事项===============//
                sessionUtil.getUsrActionWaitings(login.loginId, function (data) {
                    data = displayAction(data)
                    //设置红脚标
                    main.navMenu.leftMenu[3].badge = data.length
                    //设置表头属性
                    var paraOpt = {
                        opt:{},
                        title:[],
                        e2c:actionSummaryMode.e2c,
                        defaultOpt:actionSummaryMode.titleOptDefault,
                        sum:0
                    }
                    //设置合法化参数
                    var isLegalPara = {
                        title:[],
                        threshold:actionSummaryMode.threshold,
                        sum:0
                    }
                    //重置表头属性
                    var count = 0
                    for(var key in actionSummaryMode.title){
                        if(key.indexOf('Title')==-1) continue
                        actionSummaryMode.title[key] = []
                        switch(key){
                            case "actionDirTitle":count=0;break;
                            case "actionTitle":count=1;break;
                            case "actionWaitingTitle":count=2;break
                        }
                        paraOpt.opt = opts[count]//在此按照固定顺序进行赋值(actionDir，action，actionWaiting),参照actionSummaryMode.title里的顺序
                        paraOpt.title = actionSummaryMode.title[key]
                        paraOpt.sum = 0
                        //格式化表头数据
                        sessionUtil.formatUsrOpt(paraOpt)
                        //判断标题是否合法，若不合法进行重新设置
                        isLegalPara.title = actionSummaryMode.title[key]
                        isLegalPara.sum = paraOpt.sum
                        sessionUtil.isLegalOrSetOpt(isLegalPara)
                    }
                    actionSummaryMode.data['actionWaiting']['reports'] = data
                    actionSummaryMode.data['actionWaiting']['search_filter_reports'] = data
                    //设置分页
                    var pageSize = 5;
                    actionSummaryMode.data['actionWaiting']['curReports'] = data.slice(0,pageSize)
                    actionSummaryMode.data['actionWaiting']['pageNum'] = Math.ceil(data.length / pageSize);
                })
            })
            return true
        }
        avalon.mix(actionSummaryVM,{asMode:actionSummaryMode});
        return actionSummaryVM;
})