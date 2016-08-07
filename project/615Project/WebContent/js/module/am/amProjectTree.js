/**
 * Created by rtio on 2014/11/15.
 */
define(['am.sessionUtil','am.cookie','Login','../../simpletree/simpletree','ready!'],function(sessionUtil,ck,login){
    var planTree = {}; 
    var treeFormation = {};
    var parentPlanName = '';
    var parentKey = '';
    var pLevel = '';
    var projectId = '';
    var proCode = '';
    var planSource = '';
    var planCreatorId = '';
    var planAuditorId = '';
    var CreatorLevel = '';
    var projectTreeVM = avalon.define("testSimpleTree", function (vm) {
        vm.$tree = {};
        vm.$simpletreeOpt = {
            treeNodes: treeFormation.children,//vm.$tree.children,

            contextMenu: [
                {name: '任务分解', handle: function (data) {
//                    window.location.href = "#!/am/plan/" + "新计划" + "/newPlan";
                    window.location.href = '#!/am/taskDecompose/'+proCode;
                }},
                {name: '新建行动项', handle: function (data) {
//                    window.location.href = "#!/am/plan/" + "新计划" + "/newPlan";
                    var creatorId=planCreatorId || '111',
                        auditorId=planAuditorId||'111'
                    window.location.href = '#!/am/plan/' + '新行动项' + '/newAction/#planCreatorId='+creatorId+
                        "&planAuditorId="+auditorId+"&parentPlanCode="+proCode+"&projectId="+projectId;
                }},
                {name: '新建计划', handle: function (data) {
//                    window.location.href = "#!/am/plan/" + "新计划" + "/newPlan";
                    var creatorId=planCreatorId || '111',
                        auditorId=planAuditorId||'111'
                    window.location.href = '#!/am/plan/' + '新计划' + '/newPlan/#planCreatorId='+creatorId+
                        "&planAuditorId="+auditorId+"&parentPlanCode="+proCode+"&projectId="+projectId;
                }},
                {name: '更新计划', handle: function (data) {
                    window.location.href = "#!/am/plan/" + proCode + "/update";
                }},
                {name: '查看计划', handle: function (data) {
                    window.location.href = "#!/am/plan/" + proCode + "/view";
                }},
                {name: '变更计划', handle: function (data) {
                    window.location.href = "#!/am/plan/" + proCode + "/change";
                }}
            ],
            callback:{
                onContextmenu:function(data){
                    parentPlanName = data.node.name;
                    parentKey = data.node.planKey;
                    pLevel = data.node.$treeid + 1;
                    projectId = data.node.projectId;
                    proCode = data.node.planCode;
                    planSource = data.node.planSource;
                    planCreatorId = login.loginId || '111'
                    planAuditorId = data.node.planControllerId;
                    ck.cookie.set("planSource",planSource);
                    ck.cookie.set("parentPlanCode",proCode);
                    ck.cookie.set("projectId",projectId);
                    ck.cookie.set("parentKey",parentKey);
                    ck.cookie.set("parentPlanName",parentPlanName);
                    ck.cookie.set("parentLevel",pLevel);
                    ck.cookie.set("planCreatorId",planCreatorId);
                    ck.cookie.set("planAuditorId",planAuditorId);
                },
                onClick:function(data){
                    var tNode = data.node;
                    parentPlanName = data.node.name;
                    parentKey = data.node.planKey;
                    pLevel = data.node.$treeid + 1;
                    projectId = data.node.projectId;
                    proCode = data.node.planCode;
                    planSource = data.node.planSource;
                    planCreatorId = login.loginId || '111';
                    planAuditorId = data.node.planControllerId;
                    ck.cookie.set("planSource",planSource);
                    ck.cookie.set("parentPlanCode",proCode);
                    ck.cookie.set("projectId",projectId);
                    ck.cookie.set("parentKey",parentKey);
                    ck.cookie.set("parentPlanName",parentPlanName);
                    ck.cookie.set("parentLevel",pLevel);
                    ck.cookie.set("planCreatorId",planCreatorId);
                    ck.cookie.set("planAuditorId",planAuditorId);
                    //在planList中显示行动项
                    /*sessionUtil.getChildPlan(login.loginId,tNode.projectId,tNode.planCode, function (plan) {
                        sessionUtil.setPlanList(plan);
                        *//*设置分页的显示
                         * *//*
                        var pageSize = 5;
                        //PlanList分页设置
                        avalon.vmodels["planSummary"].curPListReports   = avalon.vmodels["planSummary"].planDGrid.slice(0, pageSize);
                        avalon.vmodels["planSummary"].pagesPListReports = Math.ceil(avalon.vmodels["planSummary"].planDGrid.length / pageSize);
                    });*/
                    //在任务列表中显示任务
                    sessionUtil.getTasks(proCode,projectId,function(tasks){
                        sessionUtil.setTaskList(tasks);
                        //*设置分页的显示
                        var pageSize = 5;
                        //PlanList分页设置
                        avalon.vmodels["planSummary"].curPListReports   = avalon.vmodels["planSummary"].planDGrid.slice(0, pageSize);
                        avalon.vmodels["planSummary"].pagesPListReports = Math.ceil(avalon.vmodels["planSummary"].planDGrid.length / pageSize);
                    })
                }
            }
        }
    });
    function formatItem(item){
        item.isLeaf!="false"?item.isParent=false:item.isParent=true;
        (item.children||[]).forEach(function(one){
            formatItem(one);
        })
    }
    planTree.setProTree = function(employeeID,projectName){
        require(['am.planSummary','Login'],function(ps,login){
            /*var employeeID = "";
            var projectName ="";
            employeeID = login.loginId;
            var proDG = ps.psMode.proDGrid;
            for(var u in proDG){
                if(proDG[u].text==true)
                    projectName = proDG[u].projectName;
            }
            *//*调试使用
            * *//*
            employeeID = "111";*/
            //刷新工程树
            sessionUtil.getProTree(employeeID,projectName,function(data){
                avalon.vmodels["planSummary"].planDGrid.clear();
                treeFormation = eval('('+ data +')');
                treeFormation.children.open = false;
                avalon.vmodels["tree"].remove("root");
                formatItem(treeFormation.children[0]);
                var nodes=avalon.vmodels["tree"].append("root",treeFormation.children);
            });
            //获取登录人的Creator权限
            sessionUtil.getCreatorLevel(employeeID,projectName,function(data){
                CreatorLevel = data;
            })
        })
    };
    planTree.parentKey = parentKey;
    planTree.parentPlanName = parentPlanName;
    avalon.scan();
    return planTree;
})