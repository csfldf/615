/**
 * Created by PC on 2015/7/14.
 */
/**
 * Created by Administrator on 2015/7/5.
 */
/**
 * Created by PC on 2015/5/28.
 * 消息管理模块
 */
define(['RouterManager',"mmRequest", "UIMainFrame","am.sessionUtil","am.searchUtil","Login"], function (rm,avalon, main,amUtil,searchUtil,login) {
    var model=avalon.define("depMgr",function(vm) {
        vm.modalName='filterModal'+'department'
        vm.modalBtn=vm.modalName+'_close_btn'
        vm.data= {
            deps:{
                pageSize: 5,
                original_reports: [],
                search_filter_reports: [],
                curReports: [],
                indexPage: 0,
                pageNum: 0,
                totalNum:0,
                filterNum:0,
//                search_columns:[
//                    {
//                        key:'content',
//                        value:'内容'
//                    },
//                    {
//                        key:'title',
//                        value:'标题'
//                    }
//                ],
//                search_content:"",
//                search_column:"",
            }
        }
        vm.init_data=function(reportName,contents){
            vm.data[reportName].original_reports=contents
            vm.data[reportName].totalNum=vm.data[reportName].original_reports.size()
            vm.data[reportName].search_filter_reports=vm.data[reportName].original_reports
            vm.refreshReports(reportName)
        }
        vm.init=function(){
            var metadataSider=[
                {header: '基础数据维护', submenu: [
                    {text: '人员管理', href: '#!/am/employeeMgr'},
                    {text:'部门管理',href:'#!/am/depMgr'}
//                {text: '权限管理', href: '#!/am/privilegeMgr'}
                ]}
            ];
            main.clearSider();
            main.addSidebar('metadataSidebar', metadataSider, true);
            main.switchSidebar('metadataSidebar')
            amUtil.getAllDep(function(data){
                vm.init_data('deps',data)
                vm.refreshReports("deps")
            })
            setTimeout(function() {
                $('.panel').slideDown( "slow" );
            }, 500);
        }
        //////////////////////////////////////页面逻辑
        vm.selDepId=""
        vm.selectOne=function(id){
            vm.selDepId=id
        }
        vm.createDep={}
        vm.addOneDep=function(){
            vm.createDep={}
            vm.createDep.type='new'
            $('#depModal').modal('show')
        }
        vm.modify=function(dep){
            vm.createDep=dep
            vm.createDep.type='modify'
            $('#depModal').modal('show')
        }
        vm.addOrModify=function(){
            amUtil.addOrModifyDep(vm.createDep,function(data){
                if(data.success){
                    vm.init()
                    $('#depModal').modal('hide')
                }else{
                    alert("failed")
                }
            })
        }
        vm.delOneDep=function(){
            if(vm.selDepId){
                amUtil.deleteDep(vm.selDepId,function(data){
                    if(data.success){
                        vm.init()
                        vm.selDepId=""
                    }else{
                        alert("failed")
                    }
                })
            }else{
                alert("请选择一个部门")
            }
        }
        //////////////////////////////////////搜索
        vm.do_search=function(reportName){
            if (!vm.data[reportName].search_column){
                vm.data[reportName].search_column=vm.data[reportName].search_columns[0].key
            }
            vm.data[reportName].search_filter_reports=searchUtil.searchColumn(vm.data[reportName].search_filter_reports,vm.data[reportName].search_column,vm.data[reportName].search_content)
            vm.refreshReports(reportName)
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
            vm.data[reportName].search_filter_reports=searchUtil.orderByChinese(vm.data[reportName].search_filter_reports,column,order)
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
            org_values:[],
            filtered_values:[]
        }
        vm.filterConfig=function(reportName,column){
            vm.filter.org_values=[]
            vm.filter.reportName=reportName
            vm.filter.column=column
            for(var i=0;i<vm.data[reportName].original_reports.size();i++){
                if(!verify_in(vm.data[reportName].original_reports[i][column],vm.filter.org_values,'name')){
                    var tmp=new Object()
                    tmp.enabled=verify_in(vm.data[reportName].original_reports[i][column],vm.data[reportName].search_filter_reports,column)?true:false
                    tmp.name=vm.data[reportName].original_reports[i][column]
                    vm.filter.org_values.push(tmp)
                }
            }
            $('#'+vm.modalName).modal('show')
        }
        vm.selALL=function(){
            for(var i=0;i<vm.filter.org_values.size();i++){
                vm.filter.org_values[i].enabled=true
            }
        }
        vm.executeFilter=function(){
            vm.filter.values=[]
            var orgORsearch=false
            for(var i=0;i<vm.filter.org_values.size();i++){
                if(vm.filter.org_values[i].enabled){
                    vm.filter.values.push(vm.filter.org_values[i].name)
                    if(!verify_in(vm.filter.org_values[i].name,vm.data[vm.filter.reportName].search_filter_reports,vm.filter.column)){
                        orgORsearch=true
                    }
                }
            }
            vm.data[vm.filter.reportName].search_filter_reports=searchUtil.filter(
                orgORsearch?vm.data[vm.filter.reportName].original_reports:vm.data[vm.filter.reportName].search_filter_reports,vm.filter.column,vm.filter.values)
            vm.refreshReports(vm.filter.reportName)
            $('#'+vm.modalName).modal('hide')
        }
    })
    verify_in=function(key,array,column){
        for(var i=0;i<array.size();i++){
            if(key==array[i][column]){
                return true;
            }
        }
        return false;
    }
    $('#'+model.modalName).on('hidden.bs.modal', function () {
        $('#'+model.modalBtn).click();
    })
    $('#depModal').on('hidden.bs.modal', function () {
        $('#dep_close_btn').click();
    })
    return model;
})