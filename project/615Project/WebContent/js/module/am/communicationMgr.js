/**
 * Created by PC on 2015/5/26.
 * 沟通管理模块
 */
define(['RouterManager',"mmRequest", "UIMainFrame","am.sessionUtil","fracas.searchUtil","Login"], function (rm,avalon, main,amUtil,searchUtil,login) {
    var model=avalon.define("commMgr",function(vm) {
        vm.privilege={};
        vm.prjList=[
//            {prjId:1,prjName:'C919综合管理平台',prjShortName:'C919',prjTypeId:'1',prjType:'型号项目',prjSubId:'PRJ001',contractId:'CTR001',startDate:'2015-01-05',endDate:'2015-02-08',inBudget:'8000',outBudget:'20000',deleteMark:false,manager:[{employeeNumber:1,employeeName:'项目经理一'},{employeeNumber:2,employeeName:'项目经理二'}],insLeader:[{employeeNumber:3,employeeName:'所领导一'}],depLeader:[{employeeNumber:4,employeeName:'部门领导一'}],prjLeader:[{employeeNumber:5,employeeName:'项目领导一'}]},
//            {prjId:2,prjName:'C919测试',prjShortName:'C919',prjTypeId:'4',prjType:'内部项目',prjSubId:'PRJ002',contractId:'CTR002',startDate:'2015-05-05',endDate:'2015-06-08',inBudget:'5000',outBudget:'10000',deleteMark:false,manager:[{employeeNumber:2,employeeName:'项目经理二'}],insLeader:[{employeeNumber:3,employeeName:'所领导一'}],depLeader:[{employeeNumber:4,employeeName:'部门领导一'}],prjLeader:[{employeeNumber:5,employeeName:'项目领导一'}]}
        ]
        vm.msgList=[
//            {id:1,type:"大事记",prjId:1,prjName:'C919综合管理平台',title:'C919大事记一',content:'大事记一',fileName:'C919大事记一20150527',path:'dsad/abc',state:1,empId:'001'},
//            {id:2,type:"项目简报",prjId:1,prjName:'C919综合管理平台',title:'项目简报一',content:'项目简报一',fileName:'项目简报一20150527',path:'dsad/abc',state:1,empId:'001'},
//            {id:3,type:"会议纪要",prjId:1,prjName:'C919综合管理平台',title:'会议纪要一',content:'会议纪要一',fileName:'会议纪要一20150527',path:'dsad/abc',state:1,empId:'001'},
//            {id:4,type:"项目公告",prjId:1,prjName:'C919综合管理平台',title:'项目公告一',content:'项目公告一',fileName:'项目公告一20150527',path:'dsad/abc',state:1,empId:'001'}
        ];
        vm.msgReadList=[
//            {id:1,type:"大事记",prjId:1,prjName:'C919综合管理平台',title:'C919大事记一',content:'大事记一',fileName:'C919大事记一20150527',path:'dsad/abc',state:1,empId:'001',empName:'项目经理一'},
//            {id:2,type:"项目简报",prjId:1,prjName:'C919综合管理平台',title:'项目简报一',content:'项目简报一',fileName:'项目简报一20150527',path:'dsad/abc',state:1,empId:'001',empName:'项目经理一'},
//            {id:3,type:"会议纪要",prjId:1,prjName:'C919综合管理平台',title:'会议纪要一',content:'会议纪要一',fileName:'会议纪要一20150527',path:'dsad/abc',state:1,empId:'001',empName:'项目经理一'},
//            {id:4,type:"项目公告",prjId:1,prjName:'C919综合管理平台',title:'项目公告一',content:'项目公告一',fileName:'项目公告一20150527',path:'dsad/abc',state:1,empId:'001',empName:'项目经理一'}
        ];
        vm.init=function(){
            amUtil.getAllProject(function(data){
                vm.prjList=data;
            });
            amUtil.getNoticeByEmp(function(data){
                vm.tmpList=[];
                vm.tmpList=data;
                vm.msgReadList=[];
                for(var i=0;i<vm.tmpList.size();i++){
                    if(vm.tmpList[i].state==1){
                        vm.msgReadList.push(vm.tmpList[i]);
                    }
                }
                vm.msgList=[];
                for(var i=0;i<vm.tmpList.size();i++){
                    if(vm.tmpList[i].empId==login.loginId){
                        vm.msgList.push(vm.tmpList[i]);
                    }
                }
                vm.msgDetailSel=false;
                vm.msgCreateSel=false;
                rm.addRules(commRules);
                main.clearSider();
                main.addSidebar('commSidebar', commSider, true);
                main.switchSidebar('commSidebar')
                vm.numPerPage=8;
                vm.curMsgs = vm.msgList.slice(0, vm.numPerPage);
                vm.pagesMsg = Math.ceil(vm.msgList.length / vm.numPerPage);
                vm.curReadMsgs=vm.msgReadList.slice(0,vm.numPerPage);
                vm.pagesReadMsg=Math.ceil(vm.msgReadList.length / vm.numPerPage);
            })


        }
        vm.msgDetailSel=false;
        vm.msgCreateSel=false;
        vm.msgDetail={};
        vm.createMsg={};
        vm.msgTypes=[
            {name:'大事记'},
            {name:'项目简报'},
            {name:'会议纪要'},
            {name:'项目公告'}
        ]

        vm.detail=function(id){
            for(var i=0;i<vm.msgList.size();i++){
                if(vm.msgList[i].id==id){
                    vm.msgDetail=vm.msgList[i];
                }
            }
            vm.msgDetailSel=true;
        }
        vm.createMsgClk=function(){
            vm.msgCreateSel=true;
            vm.createMsg={};
        }
        vm.createOneMsg=function(){
            var formJson=new Object();
            formJson.id=vm.createMsg.id?vm.createMsg.id:null;
            formJson.prjId=vm.createMsg.prjId?vm.createMsg.prjId:vm.prjList[0].projectId;
            for(var i=0;i<vm.prjList.size();i++){
                if(vm.prjList[i].projectId==formJson.prjId){
                    formJson.prjName=vm.prjList[i].projectName;
                    vm.createMsg.prjprjName = formJson.prjName;
                    break;
                }
            }
            formJson.content=vm.createMsg.content;
            formJson.title=vm.createMsg.title;
            formJson.type=vm.createMsg.type;
            amUtil.addOneNotice(formJson,function(data){
                if(data.msg=="success"){
                    vm.createMsg.id=data.id;
                    vm.msgList.push(vm.createMsg);
                    vm.curMsgs = vm.msgList.slice(0, vm.numPerPage);
                    vm.pagesMsg = Math.ceil(vm.msgList.length / vm.numPerPage);
                    vm.indexMsg = 0;
                    vm.msgCreateSel=false;
                }else{
                    alert("failed");
                }
            })
        }
        vm.saveChanges=function(){

        }
        vm.publish=function(obj){
            amUtil.publishNotice(obj.id,function(data){
                if(data.success){
                    alert("发布成功");
                    //vm.refreshNotice();
                    amUtil.getNoticeByEmp(function(data){
                        vm.tmpList=[];
                        vm.tmpList=data;
                        vm.msgReadList=[];
                        for(var i=0;i<vm.tmpList.size();i++){
                            if(vm.tmpList[i].state==1){
                                vm.msgReadList.push(vm.tmpList[i]);
                            }
                        }
                        vm.msgList=[];
                        for(var i=0;i<vm.tmpList.size();i++){
                            if(vm.tmpList[i].empId==login.loginId){
                                vm.msgList.push(vm.tmpList[i]);
                            }
                        }
                        vm.msgDetailSel=false;
                        vm.msgCreateSel=false;
                        rm.addRules(commRules);
                        main.clearSider();
                        main.addSidebar('commSidebar', commSider, true);
                        main.switchSidebar('commSidebar')
                        vm.numPerPage=8;
                        vm.curMsgs = vm.msgList.slice(0, vm.numPerPage);
                        vm.pagesMsg = Math.ceil(vm.msgList.length / vm.numPerPage);
                        vm.curReadMsgs=vm.msgReadList.slice(0,vm.numPerPage);
                        vm.pagesReadMsg=Math.ceil(vm.msgReadList.length / vm.numPerPage);
                    })
                }else{
                    alert("failed")
                }

            })
        }
        vm.recall=function(obj){
            amUtil.recallNotice(obj.id,function(data){
                if(data.success){
                    alert("撤回成功");
                    //vm.refreshNotice();
                    amUtil.getNoticeByEmp(function(data){
                        vm.tmpList=[];
                        vm.tmpList=data;
                        vm.msgReadList=[];
                        for(var i=0;i<vm.tmpList.size();i++){
                            if(vm.tmpList[i].state==1){
                                vm.msgReadList.push(vm.tmpList[i]);
                            }
                        }
                        vm.msgList=[];
                        for(var i=0;i<vm.tmpList.size();i++){
                            if(vm.tmpList[i].empId==login.loginId){
                                vm.msgList.push(vm.tmpList[i]);
                            }
                        }
                        vm.msgDetailSel=false;
                        vm.msgCreateSel=false;
                        rm.addRules(commRules);
                        main.clearSider();
                        main.addSidebar('commSidebar', commSider, true);
                        main.switchSidebar('commSidebar')
                        vm.numPerPage=8;
                        vm.curMsgs = vm.msgList.slice(0, vm.numPerPage);
                        vm.pagesMsg = Math.ceil(vm.msgList.length / vm.numPerPage);
                        vm.curReadMsgs=vm.msgReadList.slice(0,vm.numPerPage);
                        vm.pagesReadMsg=Math.ceil(vm.msgReadList.length / vm.numPerPage);
                    })
                }else{
                    alert("failed")
                }
            })
        }
        vm.addId=function(responseJSON){
            vm.createMsg.id=responseJSON.id;
            vm.createMsg.id=comm.createMsg.id;
        }
        /////////////////////////////////////排序分页
        vm.curReadMsgs=[];
        vm.pagesReadMsg="";
        vm.indexReadMsg=0;
        vm.numPerPage="";
        vm.orderByDictReadMsg = function(contents, column, order) {
            vm.msgReadList       = searchUtil.orderByDict(contents, column, order);
            vm.curReadMsgs    = vm.msgReadList.slice(0, vm.numPerPage);
            vm.indexReadMsg = 0;
        };
        vm.nextReadMsgPage = function() {
            if (vm.indexReadMsg+1 < vm.pagesReadMsg) {
                vm.indexReadMsg ++;
                vm.curReadMsgs = vm.msgReadList.slice(vm.indexReadMsg*vm.numPerPage, vm.indexReadMsg*vm.numPerPage+vm.numPerPage);
            }
        };
        vm.preReadMsgPage = function() {
            if (vm.indexReadMsg > 0) {
                vm.indexReadMsg --;
                vm.curReadMsgs = vm.msgReadList.slice(vm.indexReadMsg*vm.numPerPage, vm.indexReadMsg*vm.numPerPage+vm.numPerPage);
            }
        };

        vm.curMsgs=[];
        vm.pagesMsg="";
        vm.indexMsg=0;
        vm.orderByDictMsg = function(contents, column, order) {
            vm.msgList       = searchUtil.orderByDict(contents, column, order);
            vm.curMsgs    = vm.msgList.slice(0, vm.numPerPage);
            vm.indexMsg = 0;
        };
        vm.nextMsgPage = function() {
            if (vm.indexMsg+1 < vm.pagesMsg) {
                vm.indexMsg ++;
                vm.curMsgs = vm.msgList.slice(vm.indexMsg*vm.numPerPage, vm.indexMsg*vm.numPerPage+vm.numPerPage);
            }
        };
        vm.preMsgPage = function() {
            if (vm.indexMsg > 0) {
                vm.indexMsg --;
                vm.curMsgs = vm.msgList.slice(vm.indexMsg*vm.numPerPage, vm.indexMsg*vm.numPerPage+vm.numPerPage);
            }
        };
        ////////////////////////////////////////////////////图标转换
        vm.changeMessageImg_msgDetail = function(){
            $("#imgMessage_msgCreate").attr("src")=="img/expand.png"?$("#imgMessage_msgDetail").attr("src","img/shrink.png"):
                $("#imgMessage_msgDetail").attr("src","img/expand.png");
        };
        vm.changeMessageImg_msgCreate=function(){
            $("#imgMessage_msgCreate").attr("src")=="img/expand.png"?$("#imgMessage_msgCreate").attr("src","img/shrink.png"):
                $("#imgMessage_msgCreate").attr("src","img/expand.png");
        }
        /////////
        vm.tmpList=[];
        vm.refreshNotice=function(){

        }
    })
    var commSider=[
        {header: '沟通管理', submenu: [
            {text: '我的消息', href: '#!/am/MsgMgr'},
            {text: '大事记', href: '#!/am/Msg1'},
            {text: '项目简报', href: '#!/am/Msg2'},
            {text: '会议纪要', href: '#!/am/Msg3'},
            {text: '项目公告', href: '#!/am/Msg4'}
        ]}

    ];
    var commRules=[
        {path: '/am/MsgMgr', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            require(['am.commMgr'], function (pp) {
                var tabConfig = {tabName: '沟通管理', useHref: true, href: 'am/communicationMgr.html', tmplLoaded: function (tmpl) {
                    return tmpl;
                }}
                var tabid = main.addTab(tabConfig);
                pp.init();
                avalon.scan();
                main.changeTab(tabid, {onRemove: function () {
                }})
            })
        }},
        {path: '/am/Msg1', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            require(['am.msgDetail'], function (pp) {
                //pgd.$groupID=a;
                var tabConfig = {tabName: '大事记', useHref: true, href: 'am/msgDetail.html', tmplLoaded: function (tmpl) {
                    return tmpl;
                }}
                var tabid = main.addTab(tabConfig);
                //pp.checkPrivilege();

                pp.init(1);
                pp.typeName="大事记";
                avalon.scan();
                main.changeTab(tabid, {onRemove: function () {
                }})
            })
        }},
        {path: '/am/Msg2', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            require(['am.msgDetail'], function (pp) {
                //pgd.$groupID=a;
                var tabConfig = {tabName: '项目简报', useHref: true, href: 'am/msgDetail.html', tmplLoaded: function (tmpl) {
                    return tmpl;
                }}
                var tabid = main.addTab(tabConfig);
                //pp.checkPrivilege();
                pp.init(2);
                pp.typeName="项目简报";
                avalon.scan();
                main.changeTab(tabid, {onRemove: function () {
                }})
            })
        }},
        {path: '/am/Msg3', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            require(['am.msgDetail'], function (pp) {
                //pgd.$groupID=a;
                var tabConfig = {tabName: '会议纪要', useHref: true, href: 'am/msgDetail.html', tmplLoaded: function (tmpl) {
                    return tmpl;
                }}
                var tabid = main.addTab(tabConfig);
                //pp.checkPrivilege();
                pp.init(3);
                pp.typeName="会议纪要";
                avalon.scan();
                main.changeTab(tabid, {onRemove: function () {
                }})
            })
        }},
        {path: '/am/Msg4', process: function () {
            if (avalon.vmodels["tree"] !== undefined)//删除am管理中的树形结构
                avalon.vmodels["tree"].remove("root");
            require(['am.msgDetail'], function (pp) {
                //pgd.$groupID=a;
                var tabConfig = {tabName: '项目公告', useHref: true, href: 'am/msgDetail.html', tmplLoaded: function (tmpl) {
                    return tmpl;
                }}
                var tabid = main.addTab(tabConfig);
                //pp.checkPrivilege();
                pp.init(4);
                pp.typeName="项目公告";
                avalon.scan();
                main.changeTab(tabid, {onRemove: function () {
                }})
            })
        }}

    ]
    return model;
})