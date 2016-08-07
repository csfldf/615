/**
 * Created by rtio on 2015/5/11.
 */
define(['jquery','am.sessionUtil','Login','am.amCommonFunc','UIMainFrame','am.searchUtil',
    'datatables.bootstrap','datatables','bootstrap','ready!'],function($,sessionUtil,login,commonFunc,main,searchUtil){
    var homePageVM = {}
    var homePageMode = avalon.define("homePage",function(vm) {
        //筛选设置
        vm.modalName = 'homePage_filter'
        vm.filter = {}
        
        vm.data = {
            message:{
                processed:[],
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                pageSize:5
            },
            remind:{
                reports:[],
                curReports:[],
                search_filter_reports:[],
                indexPage:0,
                pageNum:0,
                pageSize:5
            }
        }
        //deleted pages
        vm.deletedPages = "";
        vm.deleteMessageAcc = 0

        //show processed or processing information
        vm.showProcessing = true
        vm.showProcessed = false

        vm.showOption = function(opt){
            if(opt=='processed')
                vm.showProcessing = false
            else
                vm.showProcessed = false
        }
        vm.loadWork = function(el){
            if(el.planCode!=undefined && el.planCode!=""){
                if((el.isTask!=undefined&&el.leaf!=undefined&&!el.isTask&&el.leaf)
                    || (el.isPackageDir!=undefined&&el.isPackageDir)){
                    window.location.href = '#!/am/taskDecompose/'+el.planCode+"/"+el.planName;
                }else {
                    window.location.href = '#!/am/plan/' + el.planCode + '/update/';
                }
            }else if(el.actionId!=undefined && el.actionId!=""){
                window.location.href = '#!/am/action/' + el.actionId;
            }
        }
        vm.deleteMessage = function(messageId){
            var index = 0;
            var flag = true;
            var mdata = vm.data['message']['reports']
            for(var i=0;i<mdata.length && flag;i++){
                if(mdata[i].messageId==messageId){
                    flag=false;
                    index  = i;
                }
            }
            mdata.splice(index,1);
            vm.data['message']['pageNum'] = Math.ceil(mdata.length / vm.data['message']['pageSize']);
            vm.data['message']['curReports'] = mdata.slice(vm.data['message']['indexPage']*vm.data['message']['pageSize'], 
                    vm.data['message']['indexPage']*vm.data['message']['pageSize']+vm.data['message']['pageSize']);
            vm.deletedPages += (vm.deletedPages.length==0?messageId:(","+messageId));
            vm.deleteMessageAcc++
            if(vm.deleteMessageAcc==2) {
                sessionUtil.deleteMessage(vm.deletedPages, function (data) {
                })
                vm.deletedPages = "";
                vm.deleteMessageAcc = 0
            }
            main.navMenu.leftMenu[0].badge--;
//            vm.deletedPages.push(messageId);
        }
        vm.showContent = function(data){
            var elem = $("<div></div>").text(data.messageContent).attr("class", "p" + data.messageId)
            var org = $("." + data.messageId + data.messageType);
            org.append(elem)
            $(".p" + data.messageId).css("top", '0px');
            $(".p" + data.messageId).css("height", org.css("line-height"));
            $(".p" + data.messageId).css('position', 'absolute').position();
            $(".p" + data.messageId).css('z-index', 0);
        }
        vm.hideContent = function(data){
            $(".p"+data.messageId).remove()
        }
        vm.changeShrinkExpandImg = function(id){
           commonFunc.changeShrinkExpandImg(id);
        };
        vm.setPage = function(type,id){
            vm.data[type]['pageSize'] = parseInt($("#select-"+type).val());
            vm.data[type]['curReports']   = vm.data[type]['search_filter_reports'].slice(0, vm.data[type]['pageSize']);
            vm.data[type]['pageNum'] = Math.ceil(vm.data[type]['search_filter_reports'].length / vm.data[type]['pageSize']);
            vm.data[type]['indexPage'] = 0;
            $("#"+id).css('height','auto').height();
        };
        vm.nextPage = function(type,id) {
            if (vm.data[type]['indexPage']+1 < vm.data[type]['pageNum']) {
                var height = $("#"+id).height();
                vm.data[type]['indexPage'] ++;
                vm.data[type]['curReports'] = vm.data[type]['search_filter_reports'].slice(vm.data[type]['indexPage']*vm.data[type]['pageSize'],
                        vm.data[type]['indexPage']*vm.data[type]['pageSize']+vm.data[type]['pageSize']);
                if(vm.data[type]['indexPage']+1==vm.data[type]['pageNum']){
                    $("#"+id).height(height);
                }
            }
        };
        vm.prePage = function(type) {
            if (vm.data[type]['indexPage'] > 0) {
                vm.data[type]['indexPage'] --;
                vm.data[type]['curReports'] = vm.data[type]['search_filter_reports'].slice(vm.data[type]['indexPage']*vm.data[type]['pageSize'],
                        vm.data[type]['indexPage']*vm.data[type]['pageSize']+vm.data[type]['pageSize']);
            }
        };
        //========================设置排序========================//
        vm.orderByDict = function(reportName,column,order){
            vm.data[reportName].search_filter_reports=searchUtil.orderByChinese(vm.data[reportName].curReports,column,order)
            vm.data[reportName].curReports=vm.data[reportName].search_filter_reports.slice(0,vm.data[reportName].pageSize)
            vm.data[reportName].indexPage=0;
        }
        //========================设置筛选========================//
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
            $('#'+vm.modalName).modal('hide')
        }
        /////////////////////////////////////显示
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
            vm.data[reportName]["curReports"]=vm.data[reportName].search_filter_reports.slice(0,vm.data[reportName]['pageSize'])
            vm.data[reportName]['pageNum']=Math.ceil(vm.data[reportName].search_filter_reports.length / vm.data[reportName]['pageSize'])
            vm.data[reportName]['indexPage']=0;
            vm.data[reportName]['filterNum']= vm.data[reportName].search_filter_reports.length
        }
        vm.selALL = function(check){
            for(var i=0;i<vm.filter.org_values.size();i++){
                vm.filter.org_values[i].enabled=check?true:false
            }
        }
    })


    homePageVM.init = function(){
        //清空之前数据
        homePageMode.data['message']['reports'] = [];
        homePageMode.data['remind']['reports'] = [];
        homePageMode.data['message']['indexPage'] = 0;
        homePageMode.data['remind']['indexPage'] = 0;
        var usrId = login.loginId;
        //get data from backend
        sessionUtil.getMessage(usrId,function(data){
            var processed = []
            var processing = []
            initialMessageData(data,processed,processing)
            homePageMode.data['message']['reports'] = data;
            homePageMode.data['message']['search_filter_reports'] = processing;
            homePageMode.data['message']['processed'] = processed;
            //设置分页
//            homePageMode.data['message']['pageSize'] = 5;
            homePageMode.data['message']['curReports']   = homePageMode.data['message']['search_filter_reports'].slice(0, homePageMode.data['message']['pageSize']);
            homePageMode.data['message']['pageNum'] = Math.ceil(homePageMode.data['message']['search_filter_reports'].length / homePageMode.data['message']['pageSize']);
        });
        sessionUtil.getRemind(usrId,function(data){
            data = initialRemindData(data)
            homePageMode.data['remind']['reports'] = data;
            homePageMode.data['remind']['search_filter_reports'] = data;
            //设置分页
//            homePageMode.data['message']['pageSize'] = 5;
            homePageMode.data['remind']['curReports']   = homePageMode.data['remind']['reports'].slice(0, homePageMode.data['remind']['pageSize']);
            homePageMode.data['remind']['pageNum'] = Math.ceil(homePageMode.data['remind']['reports'].length / homePageMode.data['remind']['pageSize']);
            //set navBar
            main.navMenu.leftMenu[0].badge = homePageMode.data['remind']['reports'].size()+homePageMode.data['message']['reports'].size()
        })
        //侧边栏效果演示
        /*$('#demo').BootSideMenu({
            side:"left",
            autoClose:false
        })*/
        // Animation after page loading
        setTimeout(function() {
            $('.panel').slideDown( "slow" );
        }, 500);
        return true;
    }
    function initialMessageData(data,processed,processing){
        //initial data
        var max=0;
        var d = new Date();
        var myDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        for(var i= 0,j=0;i<data.length;i++){
            data[i].messageDate = data[i].messageDate.split(" ")[0]
            if(sessionUtil.DateDiff(myDate,data[i].messageDate)>=7) {
                var tmp = data[j];
                data[j]=data[i];
                data[i]=tmp;
                data[j].bg = "red";
                j++;
            }
            else data[i].bg = ""
        }
        for(var i= 0,j= 0,index=0;index<data.length;index++){
            if(data[index].deleteMark){
                data[index].state = "已关闭"
                data[index].visible=false
                processed.push(data[index])
                processed[i].index=i++
            }else{
                data[index].state = "未关闭"
                data[index].visible=true
                processing.push(data[index])
                processing[j].index=j++
            }
            var content = data[index].messageContent
            if(content.length > 10){
                data[index].messageContent2Show = content.substr(0,10)+"..."
            }else data[index].messageContent2Show = content
        }
    }
    function initialRemindData(data){
        //inital data
        var d = new Date();
        var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        for(var i=0;i<data.length;i++){
            if(data[i].planType!=undefined)
                data[i].remindType = data[i].planType
            else if(data[i].actionType!=undefined)
                data[i].remindType = data[i].actionType
            if(data[i].taskContent!=undefined)
                data[i].remindContent = data[i].taskContent
            else if(data[i].remark!=undefined)
                data[i].remindContent = data[i].remark
            if(data[i].planSource!=undefined)
                data[i].remindSource = data[i].planSource
            else if(data[i].actionResource!=undefined)
                data[i].remindSource = data[i].actionResource
            if(data[i].planDeadlineDate!=undefined)
                data[i].deadline = data[i].planDeadlineDate.split(" ")[0]
            else if(data[i].actionDeadlineDate!=undefined)
                data[i].deadline = data[i].actionDeadlineDate.split(" ")[0]

            if(sessionUtil.DateDiff(now,data[i].deadline)>=0){
                data[i].bg = "red";
            }else {
                data[i].bg = ""
            }
        }
        return data
    }
    avalon.mix(homePageVM,{hpMode:homePageMode});
    return homePageVM;
})