/**
 * Created by PC on 2015/5/28.
 * 消息管理模块
 */
define(['RouterManager',"mmRequest", "UIMainFrame","am.sessionUtil","am.searchUtil","Login"], function (rm,avalon, main,amUtil,searchUtil,login) {
    var model=avalon.define("msgDetailMgr",function(vm) {
        vm.typeName="";
        vm.msgList=[];
        vm.msgListOrg=[];
        vm.privilege={};
        vm.id=""
        vm.modalName=""
        vm.data= {
            msgs:{
                pageSize: 5,
                original_reports: [],
                search_filter_reports: [],
                curReports: [],
                indexPage: 0,
                pageNum: 0,
                totalNum:0,
                filterNum:0
            }
        }
        vm.init=function(id){
            vm.id=id;
            amUtil.getNoticeByEmp(function(data){
                vm.msgListpOrg=[];
                vm.msgListOrg=data;
                getDetailFromList(id);
                vm.data['msgs'].original_reports=vm.msgList
                vm.data['msgs'].totalNum=vm.data['msgs'].original_reports.size()
                vm.data['msgs'].search_filter_reports=vm.data['msgs'].original_reports
                vm.refreshReports('msgs')
            })
        }
        /////////////////////////////////////显示
        vm.refreshReports=function(reportName){
            vm.data[reportName].curReports=vm.data[reportName].search_filter_reports.slice(0,vm.data[reportName].pageSize)
            vm.data[reportName].pageNum=Math.ceil(vm.data[reportName].search_filter_reports.length / vm.data[reportName].pageSize)
            vm.data[reportName].indexPage=0;
            vm.data[reportName].filterNum= vm.data[reportName].search_filter_reports.size()
        }
        /////////////////////////////////////排序分页
        vm.orderByDict = function(reportName,column,order){
            vm.data[reportName].search_filter_reports=searchUtil.orderByDict(vm.data[reportName].search_filter_reports,column,order)
            vm.data[reportName].curReports=vm.data[reportName].search_filter_reports.slice(0,vm.data[reportName].pageSize)
            vm.data[reportName].indexPage=0;
        }
        vm.nextPage = function(reportName){
            if(vm.data[reportName].indexPage+1<vm.data[reportName].pageNum){
                vm.data[reportName].indexPage++
                vm.data[reportName].curReports=vm.data[reportName].search_filter_reports.slice(
                        vm.data[reportName].indexPage*vm.data[reportName].pageSize,
                        vm.data[reportName].indexPage*vm.data[reportName].pageSize+vm.data[reportName].pageSize)
            }
        }
        vm.prePage = function(reportName){
            if(vm.data[reportName].indexPage>0){
                vm.data[reportName].indexPage--
                vm.data[reportName].curReports=vm.data[reportName].search_filter_reports.slice(
                        vm.data[reportName].indexPage*vm.data[reportName].pageSize,
                        vm.data[reportName].indexPage*vm.data[reportName].pageSize+vm.data[reportName].pageSize)
            }
        }
        vm.setPagesMessage = function(reportName){
            vm.data[reportName].pageSize=parseInt(vm.data[reportName].pageSize)
            vm.refreshReports(reportName)
        }
        ////////////////////////////////////////////////////筛选
        vm.reset=function(reportName){
            vm.data[reportName].search_filter_reports=vm.data[reportName].original_reports
            vm.refreshReports(reportName)
        }
        vm.filter={
            reportName:"",
            column:"",
            values:[],
            org_values:[]
        }
        vm.filterConfig=function(reportName,column){
            vm.filter.org_values=[]
            vm.filter.reportName=reportName
            vm.filter.column=column
            for(var i=0;i<vm.data[reportName].search_filter_reports.size();i++){
                if(!verify_in(vm.data[reportName].search_filter_reports[i][column],vm.filter.org_values)){
                    var tmp=new Object()
                    tmp.enabled=true
                    tmp.name=vm.data[reportName].search_filter_reports[i][column]
                    vm.filter.org_values.push(tmp)
                }
            }
            vm.modalName='#filterModal'+vm.id
            $(vm.modalName).modal('show')
        }
        vm.executeFilter=function(){
            vm.filter.values=[]
            for(var i=0;i<vm.filter.org_values.size();i++){
                if(vm.filter.org_values[i].enabled){
                    vm.filter.values.push(vm.filter.org_values[i].name)
                }
            }
            vm.data[vm.filter.reportName].search_filter_reports=searchUtil.filter(
                vm.data[vm.filter.reportName].search_filter_reports,vm.filter.column,vm.filter.values)
            vm.refreshReports(vm.filter.reportName)
            vm.modalName='#filterModal'+vm.id
            $(vm.modalName).modal('hide')
        }
    })
    getDetailFromList=function(id){
        switch(id){
            case 1:var tmp="大事记";break;
            case 2:var tmp="项目简报";break;
            case 3:var tmp="会议纪要";break;
            case 4:var tmp="项目公告";break;
        }
        model.msgList=[];
        for(var i=0;i<model.msgListOrg.size();i++){
            if(model.msgListOrg[i].type==tmp&&model.msgListOrg[i].state==1){
                model.msgList.push(model.msgListOrg[i]);
            }
        }
        model.typeName=tmp;
    }
    verify_in=function(key,array){
        for(var i=0;i<array.size();i++){
            if(key==array[i]['name']){
                return true;
            }
        }
        return false;
    }
    $(model.modalName).on('hidden.bs.modal', function () {
        var cls_btn_name=model.modalName+'_close_btn'
        $(cls_btn_name).click();
    })
    return model;
})