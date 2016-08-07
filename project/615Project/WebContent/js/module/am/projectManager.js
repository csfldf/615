/**
 * Created by fanjiahua on 2014/10/13.
 */
define(["mmRequest", "utils"], function (avalon, utils) {

    var model=avalon.define("projectReport",function(vm){
        vm.$formId="projectCreateForm";
        vm.$employeeTmpl = [
            {value: 1, text: 'fanjiahua'},
            {value: 2, text: 'yujiadong'},
            {value: 3, text: 'shenlingxuan'}
        ];
        vm.projects=[];
        vm.project={};
        vm.employees=[];
        vm.create=function(){
            var form = document.getElementById(vm.$formId);
            var formJson = avalon.serialize(form);
            alert(vm.project.projectId);
           //avalon.post('am/addOneProject',{'projectName': vm.project.projectName,'projectId':vm.project.projectId,'manager':vm.project.manager},function back(data){
                avalon.post('am/addOneProject',formJson,function back(data){
                if(data.msg=="success") {
                    alert("success");
                    $.post('am/getAllProject',{},function back(data){
                        vm.projects=data;
                    })
                    $('#myModal').modal('hide');
                }else{
                    alert("error");
                }
            });
        }
        vm.init=function(){
            $.post('am/getAllProject',{},function back(data){
                model.projects=data;
            })
            $.post('am/getalluser',{},function back(data){
                model.employees=data;
            })
        }
        vm.selectOne=function(){

        }
        return vm;
    })
    $('#myModal').on('hidden.bs.modal', function () {
        $('#close_btn').click();
    })
    return model;
})

