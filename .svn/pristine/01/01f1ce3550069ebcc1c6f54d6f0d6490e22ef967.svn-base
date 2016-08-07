/**
 * Created by williamfan on 2014/11/18.
 */
define(['../../simpletree/simpletree','ready!'],function(){
    var projectTreeVM = avalon.define("prjTree", function (vm) {
        vm.projects=[];
        vm.$tree={
            normalData:vm.projects
        }
        vm.$simpletreeOpt = {
            treeNodes:vm.$tree.normalData,
            data: {
                simpleData: {
                    idKey: "id",
                    pIdKey: "pid",
                    enable: false
                },
                key: {
                    children: "groups",
                    name: "projectName",
                    title: "",
                    url: "href1"
                }
            },

            contextMenu: [
                {name: 'New', handle: function (nodes, $event) {
                    window.location.href = "#!/am/plan/" + "新计划";
                    $event;
                }},
                {name: 'Delete', handle: function (data) {

                    var r = confirm("确认要删除吗?");
                    $event;
                }}
            ]
        }
        vm.init=function(){
            $.post('am/getAllProject',{},function back(data){
                vm.projects=data;
            })
        }
    });
    avalon.scan();
    return projectTreeVM;
})