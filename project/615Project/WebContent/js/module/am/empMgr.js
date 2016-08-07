/**
 * Created by fanjiahua on 2014/12/1.
 */
define(["mmRequest",'am.searchUtil','UIMainFrame','am.sessionUtil'], function (avalon,searchUtil,main,sessionUtil) {
    var model = avalon.define("empMgr", function (vm) {
        vm.$formId="empModifyForm";
        vm.empModify={};
        vm.submitType="";
        vm.isModify=false;
        vm.empSelected="";
        vm.modifyOneEmployee=function(){
            if(!vm.empModify.departmentId){
                vm.empModify.departmentId=vm.depList[0].id
                vm.empModify.departmentName=vm.depList[0].name
            }else{
                for(var i=0;i<vm.depList.size();i++){
                    if(vm.depList[i].id==vm.empModify.departmentId){
                        vm.empModify.departmentName=vm.depList[i].name
                        break
                    }
                }
            }
            if(vm.submitType=="new"){
                sessionUtil.addOrModifyEmp(vm.empModify,'new',function(data){
                    if(data.msg=="success"){
                        vm.data.employees.search_filter_reports.push(vm.empModify);
                        vm.refreshReports('employees')
                        alert("添加成功");
                    }else{
                        alert("错误");
                    }
                })
            }else{
                sessionUtil.addOrModifyEmp(vm.empModify,'modify',function(data){
                    if(data.msg=="success"){
                        var xxx=getEmpFromArray(vm.empModify.employeeNumber);
                        vm.data.employees.search_filter_reports[xxx].employeeName=vm.empModify.employeeName;
                        vm.data.employees.search_filter_reports[xxx].employeeEmail=vm.empModify.employeeEmail;
                        vm.data.employees.search_filter_reports[xxx].departmentName=vm.empModify.departmentName;
                        vm.data.employees.search_filter_reports[xxx].major=vm.empModify.major;
                        vm.refreshReports('employees')
                    }else{
                        alert("错误");
                    }
                })
            }
            $('#empModal').modal("hide");
        }
        ////////////////////////////////////////////////////////////////
        vm.modalName='filterModal'+'empMgr'
        vm.modalBtn=vm.modalName+'_close_btn'
        vm.depList=[]
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
            {
                sessionUtil.getEmpList(function(data) {
                    vm.init_data('employees', data)
                    vm.refreshReports('employees')
                })
                sessionUtil.getAllDep(function(data){
                    vm.depList=data;
                })
            }
            setTimeout(function() {
                $('.panel').slideDown( "slow" );
            }, 500);
        }
        vm.data= {
            employees:{
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
        vm.init_data=function(reportName,contents){
            vm.data[reportName].original_reports=contents
            vm.data[reportName].totalNum=vm.data[reportName].original_reports.size()
            vm.data[reportName].search_filter_reports=vm.data[reportName].original_reports
            vm.refreshReports(reportName)
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
        ////////////////////////////////////////////////////////////////
        vm.selectOne=function(empNm){
            vm.empSelected=empNm;
        }
        vm.selectOneEmp=function(el){
            vm.submitType="modify";
            vm.empModify=el;
            vm.isModify=true;
            $('#empModal').modal("show");
        }
        vm.addOneEmp=function(){
            vm.submitType="new";
            vm.empModify={};
            vm.isModify=false;
            $('#empModal').modal("show");
        }
        vm.delOneEmp=function(){
            if(vm.empSelected==""){
                alert("请选择一个人员");
            }else{
                var r = confirm("确认要删除吗?");
                if (r == true) {
                    $.post("am/delOneEmp",{"employeeNumber":vm.empSelected},function back(data){
                        if(data.msg=="success"){
                            var xxx=getEmpFromArray(vm.empSelected);
                            vm.data.employees.search_filter_reports.splice(xxx,1);
                            vm.empSelected="";
                            vm.refreshReports('employees')
                        }else{
                            alert("错误");
                        }
                    })
                }
            }
        }
        getEmpFromArray=function(empNm){
            for(var i in vm.data.employees.search_filter_reports){
                if(vm.data.employees.search_filter_reports[i].employeeNumber==empNm){
                    return i;
                }
            }
        }
        return vm;
    })
    verify_in=function(key,array,column){
        for(var i=0;i<array.size();i++){
            if(key==array[i][column]){
                return true;
            }
        }
        return false;
    }
    $('#empModal').on('hidden.bs.modal', function () {
        $('#emp_close_btn').click();
    })
    $('#'+model.modalName).on('hidden.bs.modal', function () {
        $('#'+model.modalBtn).click();
    })
    return model;
})