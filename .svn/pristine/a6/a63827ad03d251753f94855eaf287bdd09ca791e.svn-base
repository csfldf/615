/**
 * Created by FeiyuLab on 2015/5/31 0031.
 */
"use strict"
define(["mmRequest", "utils", 'jquery'], function (avalon, utils,$){
    //新的权限控制2015.5.30

    var itemMap={
        '新建任务':'publishTask_op',
        '发布任务':'publishTask_op',
        '取消任务':'publishTask_op',
        '完成任务':'feedBackTask_op',
        '未完成任务':'feedBackTask_op',
        '超期完成任务':'feedBackTask_op',


        '新建计划':'addPlan_op',
        '发布计划':'publishPlan_op',
        '完成计划':'publishPlan_op',
        '取消计划':'publishPlan_op',
        '等待项目经理审批计划':'changePlan_op',
        '等待项目领导审批1':'changePlan_op',
        '等待项目领导审批2':'changePlan_op',
        '项目领导审批成功计划':'auditPlanChange_op',

        '新建行动项':'addAction_op',
        '发布行动项':'publishAction_op',
        '发起行动项目录审核人审批':'feedbackAction_op',
        '发起行动项目录批准人批准':'feedbackAction_op',
        '行动项目录审核人拒绝审批':'feedbackAction_op',
        '行动项目录批准人拒绝批准':'feedbackAction_op',
        '完成行动项': 'feedbackAction_op',

        '反馈行动项': 'feedbackAction_op',

        '新建行动项目录': 'addActionDir_op',
        '发布行动项目录': 'publishActionDir_op'

    }
    var authorityTableCached={}

    /**
     * Assert
     * 有权限->success(successArgs),return true;
     * 否则->fail(failArgs),返回false
     * @param memberID
     * @param projectID
     * @param item
     * @param success
     * @param successArgs
     * @param fail
     * @param failArgs
     * @returns {boolean}
     */
    function assert(memberID,projectID,item,success,successArgs,fail,failArgs){
        //debug
        if(memberID=='工作包负责人' || memberID=='任务负责人'){
            success(successArgs)
            return true
        }

        var flag=false
        if(memberID=='当前登录用户'){
            memberID=getLoginInUserId()
            if(memberID==null){
                fail(failArgs)
                return false
            }

        }
        item=itemMap[item]

        if(memberID && item && projectID){
            var fromRemote=false
            if(avalon.type(authorityTableCached[memberID])=="array"){
                if(arrayExsit(authorityTableCached[memberID],item)){
                    success(successArgs)
                    flag=true
                }
                else {
                    fromRemote = true
                }
            }
            else {
                fromRemote = true
            }

            if(fromRemote){
                avalon.get('am/authAssert',
                    {
                        empId:memberID,
                        prjId:projectID,
                        action:item
                    },function(resp){
                        if(resp.success){
                            authorityTableCached[memberID]=authorityTableCached[memberID] || []
                            if(!arrayExsit(authorityTableCached[memberID],item))
                                authorityTableCached[memberID].push(item)
                            success(successArgs)
                            flag=true
                        }else{
                            fail(failArgs)
                        }
                    })
            }
        }
        else {
            alert('用户未登录或Project参数错误或查询参数错误')
        }
        return flag
    }

    function multiOpAuthAssert(memberID,projectID,success,successArgs,fail,failArgs){
        //debug
        if(memberID=='工作包负责人' || memberID=='任务负责人'){
            success(successArgs)
            return true
        }

        var flag=false
        if(memberID=='当前登录用户'){
            memberID=getLoginInUserId()
            if(memberID==null){
                fail(failArgs)
                return false
            }

        }

        if(memberID && projectID) {
            var fromRemote = false
            if (avalon.type(authorityTableCached[memberID]) == "array") {
                if (arrayExsit(authorityTableCached[memberID], 'addPlan_op')
                    && arrayExsit(authorityTableCached[memberID], 'publishPlan_op')
                    && arrayExsit(authorityTableCached[memberID], 'changePlan_op')
                    && arrayExsit(authorityTableCached[memberID], 'auditPlanChange_op')) {
                    success(successArgs)
                    flag = true
                }
                else
                    fromRemote = true
            }
            else
                fromRemote = true

            avalon.get('am/multiOpAuthAssert',
                {
                    empId: memberID,
                    prjId: projectID,
                    action: 'addPlan_op,publishPlan_op,changePlan_op,auditPlanChange_op'
                }, function (resp) {
                    if (resp.success) {
                        success(successArgs)
                        flag = true
                    } else {
                        fail(failArgs)
                    }
                })
        }
    }

    function multiTaskOpAuthAssert(memberID, projectID, success, successArgs, fail, failArgs) {
        //debug
        if (memberID == '工作包负责人' || memberID == '任务负责人') {
            success(successArgs)
            return true
        }

        var flag = false
        if (memberID == '当前登录用户') {
            memberID = getLoginInUserId()
            if (memberID == null) {
                fail(failArgs)
                return false
            }

        }

        if (memberID && projectID) {
            var fromRemote = false
            if (avalon.type(authorityTableCached[memberID]) == "array") {
                if (arrayExsit(authorityTableCached[memberID], 'resolveTask_op')
                    && arrayExsit(authorityTableCached[memberID], 'publishTask_op')
                    && arrayExsit(authorityTableCached[memberID], 'feedbackTask_op')) {
                    success(successArgs)
                    flag = true
                }
                else
                    fromRemote = true
            }
            else
                fromRemote = true

            avalon.get('am/multiOpAuthAssert',
                {
                    empId: memberID,
                    prjId: projectID,
                    action: 'resolveTask_op,publishTask_op,feedbackTask_op'
                }, function (resp) {
                    if (resp.success) {
                        success(successArgs)
                        flag = true
                    } else {
                        fail(failArgs)
                    }
                })
        }
    }

    function multiActionOpAuthAssert(memberID,projectID,success,successArgs,fail,failArgs){
        //debug
        if(memberID=='工作包负责人' || memberID=='任务负责人'){
            success(successArgs)
            return true
        }

        var flag=false
        if(memberID=='当前登录用户'){
            memberID=getLoginInUserId()
            if(memberID==null){
                fail(failArgs)
                return false
            }
        }

        if(memberID && projectID) {
            var fromRemote = false
            if (avalon.type(authorityTableCached[memberID]) == "array") {
                if (arrayExsit(authorityTableCached[memberID], 'addAction_op')
                    && arrayExsit(authorityTableCached[memberID], 'publishAction_op')
                    && arrayExsit(authorityTableCached[memberID], 'feedbackAction_op')
                    ) {
                    success(successArgs)
                    flag = true
                }
                else
                    fromRemote = true
            }
            else
                fromRemote = true

            avalon.get('am/multiOpAuthAssert',
                {
                    empId: memberID,
                    prjId: projectID,
                    action: 'addAction_op,publishAction_op,feedbackAction_op'
                }, function (resp) {
                    if (resp.success) {
                        success(successArgs)
                        flag = true
                    } else {
                        fail(failArgs)
                    }
                })
        }
    }


    function authAssertByRole(employeeId,projectId,roleName,success,successArgs,fail,failArgs){
        if(employeeId=='当前登录用户'){
            employeeId=getLoginInUserId()
            if(employeeId==null){
                alert('未登录')
                return false
            }

        }
        
        avalon.get('am/assertRoleByEmployeeId',
            {
                employeeId:employeeId,
                projectId:projectId,
                roleName:roleName
            },function(resp){
                if(resp.success){
                    success(successArgs)
                }else{
                    fail(failArgs)
                }
            })
    }

    function multiActionDirOpAuthAssert(memberID, projectID, success, successArgs, fail, failArgs) {
        //debug
        if (memberID == '工作包负责人' || memberID == '任务负责人') {
            success(successArgs)
            return true
        }

        var flag = false
        if (memberID == '当前登录用户') {
            memberID = getLoginInUserId()
            if (memberID == null) {
                fail(failArgs)
                return false
            }
        }

        if (memberID && projectID) {
            var fromRemote = false
            if (avalon.type(authorityTableCached[memberID]) == "array") {
                if (arrayExsit(authorityTableCached[memberID], 'addActionDir_op')
                    && arrayExsit(authorityTableCached[memberID], 'publishActionDir_op')
                ) {
                    success(successArgs)
                    flag = true
                }
                else
                    fromRemote = true
            }
            else
                fromRemote = true

            avalon.get('am/multiOpAuthAssert',
                {
                    empId: memberID,
                    prjId: projectID,
                    action: 'addActionDir_op,publishActionDir_op'
                }, function (resp) {
                    if (resp.success) {
                        success(successArgs)
                        flag = true
                    } else {
                        fail(failArgs)
                    }
                })
        }
    }


    function getLoginInUserId(){
        var userid=null
        require('Login',function(login){
            if(login.isLogin)
                userid=login.loginId
        })
        return userid
    }

    function arrayExsit(array,el){
        if(avalon.type(array)=="array"){
            for(var i=0;i<array.length;i++){
                if(array[i]==el)
                    return true;
            }
            return false
        }
        return null
    }

    return {assert:assert,multiOpAuthAssert:multiOpAuthAssert,authAssertByRole:authAssertByRole,
        multiActionOpAuthAssert: multiActionOpAuthAssert, multiActionDirOpAuthAssert: multiActionDirOpAuthAssert,
        multiTaskOpAuthAssert: multiTaskOpAuthAssert
    }

})
