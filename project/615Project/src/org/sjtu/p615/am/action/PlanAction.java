package org.sjtu.p615.am.action;

import com.opensymphony.xwork2.ActionSupport;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.apache.commons.lang3.tuple.Pair;
import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.*;
import org.sjtu.p615.entity.*;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


public class PlanAction extends ActionSupport {
    private static final long serialVersionUID = 1L;
    private IPlanService planService;
    private IProjectService projectService;
    private IScriptService scriptService;
    private IGroupService groupService;
    private IRoleService roleService;
    //homePage
    private String messageIds;
    private String HttpMessage;
    //plan part
    private String HttpPlan;
    List<Plan> tmplan = new ArrayList<Plan>();
    private String taskIds;
    //private Plan plan;
    private String result;

    private String modifyType;
    private Boolean isActionItem;
    private Boolean isTask;
    private Boolean leaf;
    private Boolean back;
    private Integer level;
    private Integer parentKey;
    private String planCode;
    private String planIssuedDate;
    private String planDeadlineDate;
    private String planStartDate;
    private String planFinishDate;
    private String planSerialNumber;
    private String planName;
    private Integer planState;
    private String planSource;
    private String planController;
    private String planControllerId;
    private String planAuditorId;
    private String planCreatorId;
    private String planUpdateDescription;
    private String parentPlanCode;

    private String employeeId;
    private String employeeName;
    private String projectName;
    private String projectId;
    private String planLevel;

    private Double spi;
    private Double completePercentage;
    private String remainingDuration;
    private String remainingHour;
    private String remainingPeriod;
    private String predecessor;
    private String successor;
    private String controlDepartment;
    private String controlDepartmentId;
    private String group;
    private String groupId;
    private Double budget;
    //private Double cashFlow;
    private String cashFlow;
    private String cashSource;
    private String cashSubject;
    private Double cashReal;

    private String planScript;

    private JSONArray jsonary;
    private JSONObject jsonobj;
    private String updatePlanData;
	private String key;
    private String value;
    private String planRemainingDate;
    private String permissionLevel;

    private String roleId;
    private Integer scriptKey;
    private String rootId;

    private String changeDetail;

    public Boolean getBack() {
        return back;
    }

    public void setBack(Boolean back) {
        this.back = back;
    }

    public int dateminus(Date date, Date d2) {
        long day = (date.getTime() - d2.getTime()) / (24 * 60 * 60 * 1000) > 0 ? (date.getTime() - d2.getTime()) / (24 * 60 * 60 * 1000) : (date.getTime() - d2.getTime()) / (24 * 60 * 60 * 1000);
        return (int) (day >= 0 ? day + 1 : day - 1);
    }

    /*===========================homePage part======================================*/
    public String getMessage() {
        List<Message> messages = planService.getMessage(employeeId);
        JsonConfig cfg = new JsonConfig();
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(messages, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }

    public String getRemind() {
    /*List<Remind> reminds = planService.getRemind(employeeId);
    JsonConfig cfg = new JsonConfig();
	cfg.setJsonPropertyFilter(new PropertyFilter(){
        @Override
        public boolean apply(Object source, String name, Object value) {
            return value == null;
        }
    });
	cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
	JSONArray jsonarray=JSONArray.fromObject(reminds, cfg);
	this.setJsonary(jsonarray);*/
        List<Plan> plans = planService.getByEmployeeId(employeeId);
        List<Action> actions = planService.getActionsByEmployeeId(employeeId);
        List<Plan> resultPlans = new ArrayList<Plan>();
        List<Action> resultActions = new ArrayList<Action>();

        java.util.Date now = new java.util.Date();
        Date d = new Date(now.getTime());
    /*--------处理计划---------*/
        for (int i = 0; i < plans.size(); i++) {
            Plan tmp = plans.get(i);
            if (tmp.getLeaf()) {
                //获取工作包分解提醒
                List<Plan> tasks = planService.getTasksByParentCode(tmp.getPlanCode(), tmp.getProjectId());
                if (tasks.size() == 0 && dateminus(tmp.getPlanDeadlineDate(), d) < 14) {
                    tmp.setPlanType("工作包分解提醒");
                    resultPlans.add(tmp);
                }
                //获取任务反馈提醒
                for (int j = 0; j < tasks.size(); j++) {
                    Plan ttask = tasks.get(j);
                    if (dateminus(ttask.getPlanDeadlineDate(), d) < 3) {
                        ttask.setPlanType("任务反馈提醒");
                        resultPlans.add(ttask);
                    }
                }
            }
            //获取计划审批提醒
            if (tmp.getPlanIssuedDate() == null) {
                tmp.setPlanType("计划审批提醒");
                resultPlans.add(tmp);
            }
        }
	/*--------处理计划---------*/
        for (int i = 0; i < actions.size(); i++) {
            Action tmp = actions.get(i);
            //获取行动项反馈提醒
            if (dateminus(tmp.getActionDeadlineDate(), d) < 3) {
                tmp.setActionType("行动项反馈提醒");
                resultActions.add(tmp);
            }
            //获取行动项审批提醒
            if (tmp.getActionState() == 0) {
                tmp.setActionType("行动项审批提醒");
                resultActions.add(tmp);
            }
        }
        JsonConfig cfg = new JsonConfig();
        cfg.setJsonPropertyFilter(new PropertyFilter() {
            @Override
            public boolean apply(Object source, String name, Object value) {
                return value == null;
            }
        });
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(resultPlans, cfg);
        JSONArray jsonarray1 = JSONArray.fromObject(resultActions, cfg);
        for (int i = 0; i < jsonarray1.size(); i++) {
            jsonarray.add(jsonarray.size(), jsonarray1.get(i));
        }
        this.setJsonary(jsonarray);
        return SUCCESS;
    }

    public String delMessage() {
        List<String> messageIDs = Arrays.asList(messageIds.split(","));
        return planService.delMessage(messageIDs) ? SUCCESS : SUCCESS;
    }

    public String addMessages() throws ParseException {
        Message message = new Message();
        JSONObject jsonobj = JSONObject.fromObject(HttpMessage);
        Object obj = JSONObject.toBean(jsonobj);

        Object MessageTypeobj = jsonobj.get("MessageType");
        String MessageType = MessageTypeobj == null ? "" : MessageTypeobj.toString();
        Object MessageContentobj = jsonobj.get("MessageContent");
        String MessageContent = MessageContentobj == null ? "" : MessageContentobj.toString();
        Object MessageSourceobj = jsonobj.get("MessageSource");
        String MessageSource = MessageSourceobj == null ? "" : MessageSourceobj.toString();
        Object employeeIdobj = jsonobj.get("employeeId");
        String employeeId = employeeIdobj == null ? "" : employeeIdobj.toString();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Object MessageDateobj = jsonobj.get("MessageDate");
        String MessageDate = MessageDateobj == null ? "" : MessageDateobj.toString();
        java.util.Date sqlDate = MessageDate.equals("") ? null : sdf.parse(MessageDate);
        java.sql.Date date0 = sqlDate == null ? null : new java.sql.Date(sqlDate.getTime());

        message.setEmployeeId(employeeId);
        message.setMessageContent(MessageContent);
        message.setMessageDate(date0);
        message.setMessageSource(MessageSource);
        message.setMessageType(MessageType);
        planService.addMessage(message);
        return SUCCESS;
    }

    /*===========================task part======================================*/
    public String getTasks() {
        List<Plan> Tasks = planService.getTasksByParentCode(planCode, projectName);
        JsonConfig cfg = new JsonConfig();
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(Tasks, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }

    public String addTasks() throws ParseException, NoSuchMethodException, SecurityException, ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        JSONObject jsonobj = JSONObject.fromObject(HttpPlan);
        Object obj = JSONObject.toBean(jsonobj);
        Plan task = new Plan();

        //实现反射机制
        Class<?> demo = null;
        Object objDemo = null;
        demo = Class.forName("org.sjtu.p615.entity.Plan");
        objDemo = demo.newInstance();

        Field[] fields = demo.getDeclaredFields();
        for (Field field : fields) {
            Class<?> type = field.getType();
            String fieldName = field.getName();
            Object value_obj = jsonobj.get(fieldName);
            String value_str = value_obj.toString();
            if (value_obj != null && !value_str.equals("null")) {
                if (type.getName().contains("Date")) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    java.util.Date sqlDate = value_str.equals("") ? null : sdf.parse(value_str);
                    java.sql.Date date = sqlDate == null ? null : new java.sql.Date(sqlDate.getTime());
                    value_obj = date;
                } else if (type.getName().contains("Integer")) {
                    value_obj = Integer.valueOf(value_str);
                } else if (type.getName().contains("Double")) {
                    value_obj = Double.valueOf(value_str);
                } else if (type.getName().contains("Boolean")) {
                    if (value_str.equals("1"))
                        value_obj = true;
                    else if (value_obj.equals("0"))
                        value_obj = false;
                    else
                        value_obj = Boolean.valueOf(value_str);
                } else {
                    value_obj = value_str;
                }

                String firstLetter = fieldName.substring(0, 1).toUpperCase();
                String restLetters = fieldName.substring(1, fieldName.length());
                Method setMethod = objDemo.getClass().getMethod("set" + firstLetter + restLetters, type);
                setMethod.invoke(task, value_obj);
            }
        }
        planService.addTask(task);

        return SUCCESS;
    }

    public String delTask() {
        List<String> taskIDs = Arrays.asList(taskIds.split(","));
        return planService.delTask(taskIDs) ? SUCCESS : SUCCESS;
    }

    public String getAllPlansTasks() {
        List<Plan> uPlans = planService.getByProjectName(projectName);
        if (uPlans == null) return SUCCESS;
	/*get all plans,packets and tasks except drafts
	 * in old version planStateCode zero represents drafts
	 * */
        for (int i = 0; i < uPlans.size(); i++) {
            Plan plan = uPlans.get(i);
            if (plan != null && plan.getLevel() != null && plan.getLevel().equals(1)) {
                Plan tmpFather = uPlans.get(i);
                tmplan.add(tmpFather);
                uPlans.remove(i);
                i--;
                planTastFindChild(tmpFather.getPlanKey(), uPlans, 0);
            }
        }
        JsonConfig cfg = new JsonConfig();
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(tmplan, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }

    public void planTastFindChild(Integer parentKey, List<Plan> uPlans, int space) {
        space++;
        for (int j = 0; j < uPlans.size(); j++) {
            Integer cparentKey = uPlans.get(j).getParentKey();
            if (cparentKey != null && parentKey != null && cparentKey.equals(parentKey)) {
                Plan buffer = uPlans.get(j);
                buffer.setPlanCode(String.valueOf(space) + " " + buffer.getPlanCode());
                tmplan.add(buffer);
                uPlans.remove(j);
                j--;
                planTastFindChild(buffer.getPlanKey(), uPlans, space);
            }
        }
    }

    public String getWaitingTasks() {
        List<Plan> plans = planService.getWaitingTasks(employeeId);//获取登陆人参与的所有计划工作包项目
        List<Role> roles = roleService.getRoleList(employeeId);
        List<Plan> rplans = new ArrayList<Plan>();//返回的结果
        Map<String, Set<String>> proId2RoleName = new HashMap<String, Set<String>>();//登陆人所属项目到所属项目中角色的映射
        //===============获取项目id到角色名称的映射==============//
        for (Role role : roles) {
            if (role != null && role.getProjectId() != null && !role.getProjectId().equals("")) {
			/*获取登陆人所属项目到角色名的映射*/
                Set<String> s = proId2RoleName.get(role.getProjectId());
                if (s != null) {
                    s.add(role.getRoleName());
                } else {
                    s = new HashSet<String>();
                    s.add(role.getRoleName());
                    proId2RoleName.put(role.getProjectId(), s);
                }
            }
        }
        if (plans.size() != 0) {
            for (Plan plan : plans) {
                String proId = plan.getProjectId();
                String controllerId = plan.getPlanControllerId();
                String creatorId = plan.getPlanCreatorId();
                String auditorId = plan.getPlanAuditorId();
                Integer planState = plan.getPlanStateCode();
                if (plan.getIsTask() == null || plan.getLeaf() == null) continue;
                if (!plan.getIsTask() && !plan.getLeaf()) {//获取未完成的计划
                    if (!planState.equals(6)) {
                        int state = planState.intValue();
                        if (proId2RoleName.get(proId) == null) continue;
                        if (state >= 0 && state <= 3) {
                            if (proId2RoleName.get(proId).contains("项目经理")) {
                                rplans.add(plan);
                            }
                        } else if (state >= 4 && state <= 5) {
                            if (proId2RoleName.get(proId).contains("项目领导")) {
                                rplans.add(plan);
                            }
                        }
                    }
                } else if (plan.getLeaf() && !plan.getIsTask()) {//获取未完成的工作包
                    if (plan.getPlanCode() == null) continue;
                    if (planService.getChildPlans(plan.getPlanCode()).size() == 0) {//获取未分解的工作包
                        if (controllerId.equals(employeeId)) {
                            rplans.add(plan);
                        }
                    }
                    switch (planState) {
                        case 0: {
                            if (employeeId.equals(creatorId)) {
                                rplans.add(plan);
                            }
                        }
                        ;
                        break;
                        case 1: {
                            if (employeeId.equals(creatorId)) {
                                rplans.add(plan);
                            }
                        }
                        ;
                        break;
                        case 2: {
                            if (employeeId.equals(creatorId)) {
                                rplans.add(plan);
                            }
                        }
                        ;
                        break;
                        case 3:
                            ;
                            break;
                    }
                } else {//获取未完成的任务
                    int state = planState.intValue();
                    if (state >= 0 && state <= 1) {
                        if (employeeId.equals(auditorId)) {
                            rplans.add(plan);
                        }
                    } else if (state >= 2 && state <= 3) {
                        if (employeeId.equals(controllerId)) {
                            rplans.add(plan);
                        }
                    }
                }
            }
        }
        JsonConfig cfg = new JsonConfig();
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(rplans, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }

    public boolean checklogin() {
        boolean res = false;
        HttpSession session = ServletActionContext.getRequest().getSession();
        Employee emp = (Employee) session.getAttribute("employee");
        if (emp != null)
            res = true;
        return res;
    }

    /*******************************
     * ����new��update��change
     *********************************/
    public String savePlan() throws IOException {
        boolean success = false;
        HttpServletResponse resp = ServletActionContext.getResponse();
        resp.setCharacterEncoding("utf-8");
        Plan plan = null;
        try {
            if (planCode != null && planCode.equals("") == false) {
                plan = planService.getPlan(planCode);
                if (plan == null)
                    plan = new Plan();
                //����������
                plan.setParentPlanCode(parentPlanCode);
                plan.setPlanSerialNumber(planSerialNumber);
                plan.setPlanCode(planCode);
                plan.setPlanName(planName);
                if (planDeadlineDate != null && planDeadlineDate.equals("") == false)
                    plan.setPlanDeadlineDate(java.sql.Date.valueOf(planDeadlineDate));
                else
                    plan.setPlanDeadlineDate(null);
                if (planIssuedDate != null && planIssuedDate.equals("") == false)
                    plan.setPlanIssuedDate(java.sql.Date.valueOf(planIssuedDate));
                else
                    plan.setPlanIssuedDate(null);
                if (planStartDate != null && planStartDate.equals("") == false)
                    plan.setPlanStartDate(java.sql.Date.valueOf(planStartDate));
                else
                    plan.setPlanStartDate(null);
                if (planFinishDate != null && planFinishDate.equals("") == false)
                    plan.setPlanFinishDate(java.sql.Date.valueOf(planFinishDate));
                else
                    plan.setPlanFinishDate(null);
                plan.setPlanSource(planSource);
                plan.setPlanController(planController);
                plan.setPlanControllerId(planControllerId);
                plan.setPlanStateCode(planState);
                plan.setChangeDetail(changeDetail);
                //Plan��������
                plan.setLevel(level);
                plan.setLeaf(leaf);
                plan.setParentPlanCode(parentPlanCode);
                plan.setParentKey(parentKey);
                plan.setEmployeeId(employeeId);
                plan.setEmployeeName(employeeName);
                plan.setProjectId(projectId);
                plan.setProjectName(projectName);
                plan.setGroupId(groupId);
                plan.setGroupName(group);
                plan.setPlanAuditorId(planAuditorId);
                plan.setPlanCreatorId(planCreatorId);
                //新的属性
                plan.setSpi(spi);
                plan.setCompletePercentage(completePercentage);
                plan.setRemainingDuration(remainingDuration);
                plan.setRemainingHour(remainingHour);
                plan.setRemainingPeriod(remainingPeriod);
                plan.setControlDepartment(controlDepartment);
                plan.setBudget(budget);
                plan.setCashFlow(cashFlow);
                plan.setCashReal(cashReal);
                plan.setCashSource(cashSource);
                plan.setCashSubject(cashSubject);

                plan.setBack(back);
                plan.setIsTask(isTask);
                plan.setDeleteMark(false);
                plan.setComplete(false);
                plan.setAccept(false);
                plan.setDeleteMark(false);
                plan.setIssue(true);

                planService.updatePlan(plan);
                /*************各层的完成百分比自动更新********************************/
                //任务完成增加工作包完成比
                if (isTask == true && planState == 4/**任务完成**/) {
                    Plan parentPackage = planService.getPlan(plan.getParentPlanCode(), plan.getProjectId());
                    parentPackage.setCompletePercentage(parentPackage.getCompletePercentage() + plan.getTaskWeight());
                    planService.updatePlan(parentPackage);
                    //工作包完成增加上级计划的完成比
                } else if (isTask == false && leaf == true && planState == 3/**工作包完成**/) {
                    Plan parent = planService.getPlan(plan.getParentPlanCode(), plan.getProjectId());
                    parent.setCompletePercentage(
                            ((double) planService.getChildrenCountByConditions(parent.getPlanCode(), 4/**任务完成**/) + 1) * 100
                                    / planService.getChildrenCountByConditions(parent.getPlanCode(), -1));
                    planService.updatePlan(parent);
                } else if (isTask == false && leaf == false && planState == 6/**计划完成**/) {
                    Plan parent = planService.getPlan(plan.getParentPlanCode(), plan.getProjectId());
                    parent.setCompletePercentage(
                            ((double) planService.getChildrenCountByConditions(parent.getPlanCode(), 3/**工作包完成**/) + 1) * 100
                                    / planService.getChildrenCountByConditions(parent.getPlanCode(), -1));
                    planService.updatePlan(parent);
                }

                success = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            success = false;
        }
        if (success)
            resp.getWriter().print("{\"success\":true}");
        else
            resp.getWriter().print("{\"success\":false}");
        return null;

    }

    public String delPlan() throws IOException {
        boolean success = false;
        HttpServletResponse resp = ServletActionContext.getResponse();
        resp.setCharacterEncoding("utf-8");
        try {
            success = planService.deletePlan(planCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (success)
            resp.getWriter().print("{\"success\":true}");
        else
            resp.getWriter().print("{\"success\":false}");
        return null;

    }

    public String getPlan() {
        Plan plan = planService.getPlan(planCode);
        JsonConfig cfg = new JsonConfig();
        cfg.setJsonPropertyFilter(new PropertyFilter() {
            @Override
            public boolean apply(Object source, String name, Object value) {
                return value == null;
            }
        });
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONObject jsonobj = JSONObject.fromObject(plan, cfg);
        this.setJsonobj(jsonobj);
        return SUCCESS;
    }

    public String getPlanByPlanCodeProjectId() {
        Plan plan = planService.getPlanByPlanCodeProjectId(planCode, projectId);
        JsonConfig cfg = new JsonConfig();
        cfg.setJsonPropertyFilter(new PropertyFilter() {
            @Override
            public boolean apply(Object source, String name, Object value) {
                return value == null;
            }
        });
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONObject jsonobj = JSONObject.fromObject(plan, cfg);
        this.setJsonobj(jsonobj);
        return SUCCESS;
    }
    /*************************************************************************************/
    /**********************************
     * ����Plan Script
     ************************************/
    private static String PLAN_SCRIPT_TYPE = "PLAN_SCRIPT";

    public String savePlanScript() throws IOException {
        boolean success = false;
        HttpServletResponse resp = ServletActionContext.getResponse();
        resp.setCharacterEncoding("utf-8");
        try {
            Script script = scriptService.getOneScript(employeeId, PLAN_SCRIPT_TYPE, planCode);
            if (script == null) {
                script = new Script();
                script.setEmployeeId(employeeId);
                script.setScriptContent(planScript);
                script.setScriptType(PLAN_SCRIPT_TYPE);
                script.setUuid(planCode);
                scriptService.addScript(script);
            } else {
                script.setScriptContent(planScript);
                script.setUuid(planCode);
                scriptService.deleteOneScript(script.getScriptKey());
                scriptService.addScript(script);
            }
            success = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (success)
            resp.getWriter().print("{\"success\":true}");
        else
            resp.getWriter().print("{\"success\":false}");

        return null;
    }

    public String getPlanScripts() {
        List<Script> scripts = scriptService.getList(employeeId, PLAN_SCRIPT_TYPE);
        setJsonary(JSONArray.fromObject(scripts));
        return SUCCESS;
    }

    public String delPlanScript() throws IOException {
        boolean success = false;
        HttpServletResponse resp = ServletActionContext.getResponse();
        resp.setCharacterEncoding("utf-8");
        try {
            Script script = scriptService.getOneScript(employeeId, PLAN_SCRIPT_TYPE, planCode);
            if (script != null) {
                scriptService.deleteOneScript(script.getScriptKey());
                success = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (success)
            resp.getWriter().print("{\"success\":true}");
        else
            resp.getWriter().print("{\"success\":false}");
        return null;

    }

    /*******************************
     * Plan Statistics Part
     ******************************************************/
    private String dateColumn;
    private String dateFrom;
    private String dateTo;
    private String statisticsType;

    private String id;


    public String getStatisticsByCondition() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String conditonString;
        try {
            //String name = getName() != null ? URLDecoder.decode(getName(), "gb2312") : "";
            if ((statisticsType.contains("All") || (statisticsType.contains("One") && projectName != null && !projectName.equals(""))
                    || (statisticsType.toLowerCase().contains("finished") && id != null && !id.equals("")))
                    && dateFrom != null && dateTo != null && dateColumn != null && dateColumn.length() > 0) {

                java.util.Date smallDate = sdf.parse(dateFrom);
                java.util.Date largeDate = sdf.parse(dateTo);
                dateColumn = dateColumn.replaceFirst(dateColumn.substring(0, 1), dateColumn.substring(0, 1).toUpperCase());
                if (smallDate.compareTo(largeDate) <= 0) {
                    conditonString = " and " + dateColumn + " >= '" + dateFrom + "' and " + dateColumn + " <= '" + dateTo + "' ";
                    JSONArray result = planService.getStatisticsByCondition(statisticsType, conditonString, projectName, id);
                    jsonary = result;
                    return SUCCESS;
                }
            }
        } catch (ParseException/* | UnsupportedEncodingException*/ e) {
            return null;
        }
        return null;
    }

    private String checkApplyType;

    public String getPlansWithApply() {
        if ((checkApplyType.equals("getApply")
                || checkApplyType.equals("getApplyToAudit")
                || checkApplyType.equals("getApplyAudited"))
                && employeeId != null) {
            try {
                int id = Integer.parseInt(employeeId);
                jsonary = planService.getPlansWithApply(checkApplyType, employeeId);
                return SUCCESS;
            } catch (Exception e) {
                return null;
            }
        }
        return null;
    }

    @Deprecated
    public String getAllPlansByDateRange() {
        if (projectId != null && dateColumn != null && dateFrom != null && dateTo != null) {
            List<Plan> plans = planService.getPlansByDateRange(projectId, dateColumn, dateFrom, dateTo);
            if (plans != null) {
                JsonConfig cfg = new JsonConfig();
                cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
                jsonary = JSONArray.fromObject(plans, cfg);
                return SUCCESS;
            }
        }
        return null;
    }

    @Deprecated
    public String getAllPlansByEmployeeId() {
        if (!(dateColumn != null && dateFrom != null && dateTo != null))
            return null;
        if (projectId != null && employeeId != null) {
            List<Plan> plans = planService.getPlansByEmployeeId(projectId, dateColumn, dateFrom, dateTo, employeeId);
            if (plans != null) {
                JsonConfig cfg = new JsonConfig();
                cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
                jsonary = JSONArray.fromObject(plans, cfg);
                return SUCCESS;
            }
        }
        return null;
    }

    @Deprecated
    public String getAllPlansByGroupId() {
        if (!(dateColumn != null && dateFrom != null && dateTo != null))
            return null;
        if (projectId != null && groupId != null) {
            List<Plan> plans = planService.getPlansByGroupId(projectId, dateColumn, dateFrom, dateTo, groupId);
            if (plans != null) {
                JsonConfig cfg = new JsonConfig();
                cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
                jsonary = JSONArray.fromObject(plans, cfg);
                return SUCCESS;
            }
        }
        return null;
    }

    @Deprecated
    public String getAllPlansByDepartmentId() {
        if (!(dateColumn != null && dateFrom != null && dateTo != null))
            return null;
        if (projectId != null && controlDepartmentId != null) {
            List<Plan> plans = planService.getPlansByDepartmentId(projectId, dateColumn, dateFrom, dateTo, controlDepartmentId);
            if (plans != null) {
                JsonConfig cfg = new JsonConfig();
                cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
                jsonary = JSONArray.fromObject(plans, cfg);
                return SUCCESS;
            }
        }
        return null;
    }

    /*************************************************************************************/
    public void addPlan() throws IOException {
        new JSONObject();
//		HttpServletRequest request=null;
//		 try {
//		 request=ServletActionContext.getRequest();
//		 Map<String,String[]> mm=request.getParameterMap();
//		 JSONObject json=JSONObject.fromObject(mm);
//		 Enumeration enu=request.getParameterNames();  
//		 while(enu.hasMoreElements()){  
//		 String paraName=(String)enu.nextElement();  
//		 System.out.println(paraName+": "+request.getParameter(paraName));  
//		 }  
//		} 
//		 catch (Exception e) {
//		// TODO: handle exception
//		e.printStackTrace();
//		} 
        int res = 0;
        try {

            Plan plan = new Plan();
            if (this.modifyType.equals("update") == false) {
                plan.setDeleteMark(false);
                //plan.setPlanController(planController);
//				plan.setRoleId(Integer.parseInt(roleId));
                //java.sql.Date date=java.sql.Date.valueOf(datetransfer(planDeadlineDate));
                java.sql.Date date = java.sql.Date.valueOf(planDeadlineDate);
                plan.setPlanDeadlineDate(date);
                //date=java.sql.Date.valueOf(planIssuedDate);
                //plan.setPlanIssuedDate(date);
                plan.setPlanName(planName);
                plan.setProjectName(projectName);
                //plan.setPlanRemainingDate(Integer.parseInt(planRemainingDate));
                plan.setPlanSerialNumber(planSerialNumber);
                plan.setPlanSource(planSource);
                //date=java.sql.Date.valueOf(planStartDate);
                //plan.setPlanStartDate(date);
                plan.setLeaf(true);
            }
            plan.setPlanCode(planCode);
//			plan.setParentKey(Integer.parseInt());
            plan.setPlanStateCode(planState);
            if (this.modifyType != "new" && this.modifyType != "script") {
                if (plan.getPlanStateCode() == 6) {
                    java.util.Date now = new java.util.Date();
                    Date d = new Date(now.getTime());
                    plan.setPlanFinishDate(d);
                    plan.setComplete(true);
                }
                if (plan.getPlanStateCode() == 4) {
                    java.util.Date now = new java.util.Date();
                    Date d = new Date(now.getTime());
                    plan.setPlanStartDate(d);
                    plan.setAccept(true);
                }
                if (plan.getPlanStateCode() == 2) {
                    java.util.Date now = new java.util.Date();
                    Date d = new Date(now.getTime());
                    plan.setPlanIssuedDate(d);
                    plan.setIssue(true);
                }
                if (this.modifyType.equals("change")) {
                    plan.setChangeDetail(planUpdateDescription);
                }
            }
            planService.addPlan(plan, this.modifyType);
            if (this.modifyType.equals("script")) {
                IScriptService scriptService = new ScriptService();
                scriptService.deleteOneScript(scriptKey);
            }
            res = 1;
        } catch (Exception e) {
            e.printStackTrace();
            //jsonObject.put("success", false);
            res = 0;
        }
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(res);
        //return SUCCESS;
    }

    //����ж���ƻ�
    public void addPlanAction() throws IOException {
        new JSONObject();
        int res = 0;
        try {

            Plan plan = new Plan();
//			if(this.modifyType.equals("new")==true){//�½�
            plan.setDeleteMark(false);
            java.sql.Date ddate = java.sql.Date.valueOf(planDeadlineDate);//set deadlineDate
            plan.setPlanDeadlineDate(ddate);
            java.sql.Date idate = java.sql.Date.valueOf(planIssuedDate);//set deadlineDate
            plan.setPlanIssuedDate(idate);
            java.sql.Date sdate = java.sql.Date.valueOf(planStartDate);//set deadlineDate
            plan.setPlanStartDate(sdate);
            plan.setEmployeeId(employeeId);
            plan.setPlanCode(planCode);
            plan.setPlanName(planName);//set planName
            plan.setProjectName(projectName);
            plan.setPlanSerialNumber(planSerialNumber);
            plan.setPlanSource(planSource);
            plan.setParentKey(Integer.parseInt(parentPlanCode));
            plan.setLeaf(isActionItem.equals("0") ? false : true);
            plan.setLevel(Integer.parseInt(planLevel));
            plan.setComplete(false);
            plan.setAccept(false);
            plan.setDeleteMark(false);
            plan.setIssue(true);
            plan.setPlanStateCode(planState);
            plan.setProjectId(projectId);
//			}
//			plan.setParentCode(Integer.parseInt(planCategory));
			
			/*//�����Ƿ���ɱ�־
			if(this.modifyType!="new"&&this.modifyType!="script"){
				if(plan.getPlanStateCode()==6){
					java.util.Date now=new java.util.Date();
					Date d=new Date(now.getTime());
					plan.setPlanFinishDate(d);
					plan.setComplete(true);
				}
				if(plan.getPlanStateCode()==4){
					java.util.Date now=new java.util.Date();
					Date d=new Date(now.getTime());
					plan.setPlanStartDate(d);
					plan.setAccept(true);
				}
				if(plan.getPlanStateCode()==2){
					java.util.Date now=new java.util.Date();
					Date d=new Date(now.getTime());
					plan.setPlanIssuedDate(d);
					plan.setIssue(true);
				}
				if(this.modifyType.equals("change")){
					plan.setChangeDetail(updateDescription);
				}
			}	*/
            planService.addPlan(plan, this.modifyType);
			
			/*//old ɾ��һ���ݸ�
			if(this.modifyType.equals("script")){
				IScriptService scriptService=new ScriptService();
				scriptService.deleteOneScript(Integer.parseInt(scriptKey));
			}
			res=1;*/
        } catch (Exception e) {
            e.printStackTrace();
            //jsonObject.put("success", false);
            res = 0;
        }
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(res);
        //return SUCCESS;
    }


    public String getallplan() {
        //if(checklogin()){
        List<Plan> plans = planService.getallplan();
        for (Plan temp : plans) {
//			String s[]={"http://localhost:8080/615Project/am/updatestate.action?planCode="+temp.getPlanCode()+"&statecode="+temp.getPlanStateCode(),"http://localhost:8080/615Project/am/plan_report.html?type=search&plancode="+temp.getPlanCode()};
//			temp.setPlanAgreeButton(s);
            java.util.Date now = new java.util.Date();
            Date d = new Date(now.getTime());
            temp.setPlanRemainingDate(dateminus(temp.getPlanDeadlineDate(), d));
        }
        JsonConfig cfg = new JsonConfig();
        cfg.setJsonPropertyFilter(new PropertyFilter() {
            @Override
            public boolean apply(Object source, String name, Object value) {
                return value == null;
            }
        });
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(plans, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
        //}
        //return ERROR;
    }

    //��ȡ��������
    public String getUserWPlans() {
        List<Plan> plans = planService.getByProjectName(projectName);
		/*for(Plan temp:plans){
//			String s[]={"http://localhost:8080/615Project/am/updatestate.action?planCode="+temp.getPlanCode()+"&statecode="+temp.getPlanStateCode(),"http://localhost:8080/615Project/am/plan_report.html?type=search&plancode="+temp.getPlanCode()};
//			temp.setPlanAgreeButton(s);
			if(temp.getEmployeeId().equals(employeeId) && (temp.getPlanStateCode()!=1 &&
					temp.getPlanStateCode()!=2 && temp.getPlanStateCode()!=3))
				plans.remove(temp);
		}*/
        for (int i = 0; i < plans.size(); i++) {
            Plan temp = plans.get(i);
            if (!temp.getEmployeeId().equals(employeeId) || !temp.getLeaf() ||
                    (temp.getPlanStateCode() != 0 && temp.getPlanStateCode() != 1 &&
                            temp.getPlanStateCode() != 2 && temp.getPlanStateCode() != 3 && temp.getPlanStateCode() != 4))
                plans.remove(i--);
        }
        JsonConfig cfg = new JsonConfig();
		/*cfg.setJsonPropertyFilter(new PropertyFilter(){
	        @Override
	        public boolean apply(Object source, String name, Object value) {
	            return value == null;
	        }
	    });*/
//		cfg.registerDefaultValueProcessor(java.sql.Date.class,
//			      new DefaultValueProcessor(){
//			          public Object getDefaultValue(Class type){
//			        	  if(type==java.sql.Date.class)
//			        		  return ""; 
//			        	  return JSONNull.getInstance();  
//			         }
//			 }); 
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(plans, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
		/*JsonConfig cfg = new JsonConfig();
		cfg.setJsonPropertyFilter(new PropertyFilter(){
            @Override
            public boolean apply(Object source, String name, Object value) {
                return value == null;
            }
        });
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
		JSONArray jsonarray=JSONArray.fromObject(plans, cfg);
		this.setJsonary(jsonarray);
		return SUCCESS;*/
    }

    public String getProjectTree() {
        List<Plan> uPlans = planService.getByProjectName(projectName);
//		List<Plan> uPlans=planService.getByEmployeeId(employeeName);
        for (int i = 0; i < uPlans.size(); i++) {//
            Plan tmp = uPlans.get(i);
            if (tmp.getPlanStateCode() == 0) {
                uPlans.remove(i);
                i--;
            }
        }
        for (int i = 0; i < uPlans.size(); i++) {
            if (uPlans.get(i).getLevel() == 1) {
                Plan tmpFather = uPlans.get(i);
                tmplan.add(tmpFather);
                uPlans.remove(i);
                i--;
                findChild(tmpFather, uPlans);
            }
        }
        setResult(getTree(tmplan));

        return SUCCESS;
    }

    public void findChild(Plan pFather, List<Plan> uPlans) {
        for (int j = 0; j < uPlans.size(); j++) {
            Integer parentCode = uPlans.get(j).getParentKey();
            Integer parentKey = pFather.getPlanKey();
            if (parentCode != null && parentKey != null && parentCode.equals(parentKey)) {
                Plan buffer = uPlans.get(j);
                if (!buffer.getLeaf()) {
                    tmplan.add(buffer);
                }
                uPlans.remove(j);
                j--;
                findChild(buffer, uPlans);
            }
        }
    }

    public String getTree(List<Plan> plans) {
        String bufferStr = new String();
        bufferStr += "{children:[";
        for (int i = 0; i < tmplan.size(); i++) {
            if (i + 1 < tmplan.size()) {//��ǰ�ڵ�����һ�����
                Plan tNode = tmplan.get(i);
                Plan nNode = tmplan.get(i + 1);
                String PlanName = this.getLevelString(tNode.getLevel()) + tNode.getPlanCode();
                if (tNode.getLevel() < nNode.getLevel()) {
                    bufferStr += "{name:'" + PlanName + "',planKey:'" + tNode.getPlanKey() +
                            "',planCode:'" + tNode.getPlanCode() + "',projectId:'" + tNode.getProjectId() +
                            "',projectName:'" + tNode.getProjectName() +
                            "',planSource:'" + tNode.getPlanSource() + "',isLeaf:'" + tNode.getLeaf() +
                            "',employeeId:'" + tNode.getEmployeeId() + "',planCreatorId:'" + tNode.getPlanCreatorId() +
                            "',planControllerId:'" + tNode.getPlanControllerId() + "',children:[";
                } else {
                    bufferStr += "{name:'" + PlanName + "',planKey:'" + tNode.getPlanKey() +
                            "',planCode:'" + tNode.getPlanCode() + "',projectId:'" + tNode.getProjectId() +
                            "',projectName:'" + tNode.getProjectName() +
                            "',planSource:'" + tNode.getPlanSource() + "',isLeaf:'" + tNode.getLeaf() +
                            "',employeeId:'" + tNode.getEmployeeId() + "',planCreatorId:'" + tNode.getPlanCreatorId() +
                            "',planControllerId:'" + tNode.getPlanControllerId() + "'},";
                    for (int j = 0; j < tNode.getLevel() - nNode.getLevel(); j++) {
                        bufferStr += "]},";
                    }
                }
//				if(tNode.getLevel() > nNode.getLevel()){
//					for(int j=0;j<tNode.getLevel()-nNode.getLevel();j++){
//						bufferStr += "]},";
//					}
//				}
            } else {//��ǰ�ڵ������һ���ڵ�
                Plan tNode = tmplan.get(i);
                String PlanName = this.getLevelString(tNode.getLevel()) + tNode.getPlanCode();
                bufferStr += "{name:'" + PlanName + "',planKey:'" + tNode.getPlanKey() +
                        "',planCode:'" + tNode.getPlanCode() + "',projectId:'" + tNode.getProjectId() +
                        "',projectName:'" + tNode.getProjectName() +
                        "',planSource:'" + tNode.getPlanSource() + "',isLeaf:'" + tNode.getLeaf() +
                        "',employeeId:'" + tNode.getEmployeeId() + "',planCreatorId:'" + tNode.getPlanCreatorId() +
                        "',planControllerId:'" + tNode.getPlanControllerId() + "'},";
                for (int j = 0; j < tNode.getLevel() - 1; j++) {
                    bufferStr += "]},";
                }
            }
        }
        bufferStr += "]}";
        return bufferStr;
    }

    public String getLevelString(Integer level) {
        switch (level) {
            case 1:
                return "一级计划";
            case 2:
                return "二级计划";
            case 3:
                return "三级计划";
        }
        return null;
    }

    //��ȡ������Ŀ
    public String getAllProjects() {
        List<Plan> proPlans = planService.getallplan();
//		List<Plan> proPlans=planService.getByEmployeeId(employeeName);
        Map<String, Integer> jobMapAcc = new HashMap<String, Integer>();//��ȡ����������
        Map<String, String> jobMapDate = new HashMap<String, String>();//��ȡ��ʼ���ֹʱ��
        //ɸѡ��ִ������
        for (int i = 0; i < proPlans.size(); i++) {
            Plan tmp = proPlans.get(i);
            if (tmp.getProjectName() == null || tmp.getProjectName().equals("")) {//��ȡ��������������Ŀ
                Project ProName = projectService.getOneProject(tmp.getProjectId());
                if (ProName != null) {
                    tmp.setProjectName(ProName.getProjectName());
                } else
                    proPlans.remove(i--);
            }
        }
        for (Plan tmp : proPlans) {
            String tproName = tmp.getProjectName();
            if (tmp == null) continue;
            if (jobMapAcc.get(tproName) == null) {//��ʼ������������
                jobMapAcc.put(tproName, 0);
            }
            if (tmp.getLeaf() != null && tmp.getLeaf() && (tmp.getPlanStateCode() == 1 || tmp.getPlanStateCode() == 2 || tmp.getPlanStateCode() == 3)) {//ͳ�ƴ���������
                Integer dtmp = jobMapAcc.get(tproName);
                dtmp++;
                jobMapAcc.put(tproName, dtmp);
            }
            if (tmp.getLevel() != null && tmp.getLevel() == 1 && jobMapDate.get(tproName) == null) {//��ӹ��̿�ʼ���ֹ����

                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                String strStartDate = sdf.format(tmp.getPlanIssuedDate());
                String strDeadDate = sdf.format(tmp.getPlanDeadlineDate());
                jobMapDate.put(tproName, "',projectStartingDate:'" + strStartDate + "',projectDeadlineDate:'" + strDeadDate + "'");
            }
        }
        //����json�ַ���
        String resultTmp = new String();
        resultTmp += "[";
        for (String key : jobMapAcc.keySet()) {
            if (jobMapDate.get(key) != null)
                resultTmp += "{projectName:'" + key + "',projectWaitingTrans:'" + jobMapAcc.get(key).toString() + jobMapDate.get(key) + "},";
        }
        resultTmp = resultTmp + "]";
        setResult(resultTmp);
        return SUCCESS;
    }

    //
    public String getUserProject() {
		/*
		 * 用来获取登陆人相关的项目，并统计登陆人在项目中的待办事项的个数
		 * */
        //===================定义数据结构=================//
        List<Project> projects = projectService.getAllProjects();
        Map<String, Project> proId2Pro = new HashMap<String, Project>();//存放项目ID到项目的映射
        List<Role> roleList = roleService.getRoleList(employeeId);
        Map<String, String> proId2Name = new HashMap<String, String>();//项目id到项目名称的映射
        Map<String, Set<String>> proId2RoleName = new HashMap<String, Set<String>>();//存放登陆人在指定项目的角色信息
        Set<String> role_set = new HashSet<String>();
        Map<String, List<Plan>> proId2plan_map = new HashMap<String, List<Plan>>();
        List<String> projectData_list = new ArrayList<String>();
        Map<String, Integer> proId2Waitings = new HashMap<String, Integer>();
        Set<String> proId_set = new HashSet<String>();
        //===============获取项目ID到项目的映射==============//
        for (Project p : projects) {
            proId2Pro.put(p.getProjectId(), p);
        }
        //===============获取项目名称集合==============//
        for (Role role : roleList) {
            if (role != null && role.getProjectId() != null && !role.getProjectId().equals("")) {
                proId_set.add(role.getProjectId());
				/*获取登陆人所属项目到角色名的映射*/
                Set<String> s = proId2RoleName.get(role.getProjectId());
                if (s != null) {
                    s.add(role.getRoleName());
                } else {
                    s = new HashSet<String>();
                    s.add(role.getRoleName());
                    proId2RoleName.put(role.getProjectId(), s);
                }
				/*获取项目ID到项目名称的映射*/
                if (role.getProjectName() != null)
                    proId2Name.put(role.getProjectId(), role.getProjectName());
            }
        }
        //================获取项目中的计划===============//
        for (String proId : proId_set) {
            List<Plan> plans = planService.getByProjectId(proId);
            proId2plan_map.put(proId, plans);
        }
        //================统计项目信息=================//
        for (String proId : proId2plan_map.keySet()) {
            List<Plan> plans = proId2plan_map.get(proId);
            Project project = projectService.getOneProject(proId);
            if (plans.size() == 0) {//项目还没有计划的情况
                proId2Waitings.put(proId, 0);
            } else {//项目在plan表中存在计划的情况
                int waitingAcc = 0;//统计待办事项
                for (Plan plan : plans) {
                    String controllerId = plan.getPlanControllerId();
                    String creatorId = plan.getPlanCreatorId();
                    String auditorId = plan.getPlanAuditorId();
                    Integer planState = plan.getPlanStateCode();
                    if (plan.getIsTask() == null || plan.getLeaf() == null) continue;
                    if (!plan.getIsTask() && !plan.getLeaf()) {//获取未完成的计划
                        if (!planState.equals(6)) {
                            int state = planState.intValue();
                            if (proId2RoleName.get(proId) == null) continue;
                            if (state >= 0 && state <= 3) {
                                if (proId2RoleName.get(proId).contains("项目经理")) {
                                    waitingAcc++;
                                }
                            } else if (state >= 4 && state <= 5) {
                                if (proId2RoleName.get(proId).contains("项目领导")) {
                                    waitingAcc++;
                                }
                            }
                        }
                    } else if (plan.getLeaf() && !plan.getIsTask()) {//获取未完成的工作包
                        if (plan.getPlanCode() == null) continue;
                        if (planService.getChildPlans(plan.getPlanCode()).size() == 0) {//获取未分解的工作包
                            if (employeeId.equals(controllerId)) {
                                waitingAcc++;
                            }
                        }
                        if (!planState.equals(3)) {
                            if (employeeId.equals(creatorId)) {
                                waitingAcc++;
                            }
                        }
                    } else {//获取未完成的任务
                        int state = planState.intValue();
                        if (state >= 0 && state <= 1) {
                            if (employeeId.equals(auditorId)) {
                                waitingAcc++;
                            }
                        } else if (state >= 2 && state <= 3) {
                            if (employeeId.equals(controllerId)) {
                                waitingAcc++;
                            }
                        }
                    }
                }
                proId2Waitings.put(proId, waitingAcc);
            }
        }
        //==============生成项目信息=============//
        StringBuffer proData = new StringBuffer();
        proData.append("[");
        for (String proId : proId2Waitings.keySet()) {
            String strData = new String();
            if (proId2Name.get(proId) == null || proId2Pro.get(proId) == null) continue;
            strData = "{projectName:'" + proId2Name.get(proId) +
                    "',projectId:'" + proId +
                    "',projectStartingDate:'" + proId2Pro.get(proId).getStartDate() +
                    "',projectDeadlineDate:'" + proId2Pro.get(proId).getEndDate() +
                    "',projectWaitingTrans:'" + proId2Waitings.get(proId) + "'},";
            proData.append(strData);
        }
        proData.append("]");
        setResult(proData.toString());
        return SUCCESS;
    }

    //
    public String getUsrProjectsByProName() {
        String creatorLevel = new String();
        List<Role> roleList = roleService.getRoleList(employeeId);
        Set<String> groupSet = new HashSet<String>();
        List<Plan> proPlans = new ArrayList<Plan>();
        for (Role tmp : roleList) {
            List<Plan> tmpPlans = planService.getByProjectName(tmp.getProjectName());
            proPlans.addAll(tmpPlans);
        }
        Map<String, Integer> jobMapAcc = new HashMap<String, Integer>();//��ȡ����������
        Map<String, String> jobMapDate = new HashMap<String, String>();//��ȡ��ʼ���ֹʱ��

        for (int i = 0; i < proPlans.size(); i++) {
            Plan tmp = proPlans.get(i);
            if (tmp.getProjectName() != null && tmp.getProjectName().equals("")) {//ѡȡ��ִ�е�����
                proPlans.remove(i);
                i--;
            }
        }
        for (Plan tmp : proPlans) {
            String tproName = tmp.getProjectName();
            if (jobMapAcc.get(tproName) == null) {
                jobMapAcc.put(tproName, 0);
            }
            if (tmp.getEmployeeId().equals(employeeId) && tmp.getLeaf() && (tmp.getPlanStateCode() == 1 || tmp.getPlanStateCode() == 2 || tmp.getPlanStateCode() == 3)) {//ͳ�ƴ���������
                Integer dtmp = jobMapAcc.get(tproName);
                dtmp++;
                jobMapAcc.put(tproName, dtmp);
            }
            if (tmp.getLevel() == 1 && jobMapDate.get(tproName) == null) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                String strStartDate = sdf.format(tmp.getPlanIssuedDate());
                String strDeadDate = sdf.format(tmp.getPlanDeadlineDate());
                jobMapDate.put(tproName, "',projectStartingDate:'" + strStartDate + "',projectDeadlineDate:'" + strDeadDate + "'");
            }
        }
        String resultTmp = new String();
        resultTmp += "[";
        for (String key : jobMapAcc.keySet()) {
            if (jobMapDate.get(key) != null)
                resultTmp += "{projectName:'" + key + "',projectWaitingTrans:'" + jobMapAcc.get(key).toString() + jobMapDate.get(key) + "},";
        }
        resultTmp = resultTmp + "]";
        setResult(resultTmp);
        return SUCCESS;
    }

    //��ȡ�û��ݸ�
    public String getUserDraft() {
        List<Plan> uPlans = planService.getByEmployeeId(employeeId);
//		List<Plan> uPlans = planService.getByEmployeeId(employeeName);
        for (int i = 0; i < uPlans.size(); i++) {
            Plan tmp = uPlans.get(i);
            if (tmp.getPlanStateCode() != 0) {
                uPlans.remove(i);
                i--;
            }
        }
        JsonConfig cfg = new JsonConfig();
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(uPlans, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }

    //ͨ��planCode��ȡ������
    public String getChildPlansByPlanCode() {
//		Project project = projectService.getOneProject(projectId);
        Plan parentPlan = planService.getPlan(planCode, projectId);//��ȡ���ڵ���Ϣ
        List<Plan> employeePlan = planService.getByEmployeeId(employeeId);//��ȡ��¼�˽ڵ���Ϣ
        for (int i = 0; i < employeePlan.size(); i++) {//��ѡ����¼�����ڵ���Ŀ
            String tmpProId = employeePlan.get(i).getProjectId();
            if (tmpProId == null || !tmpProId.equals(projectId))
                employeePlan.remove(i--);
        }
        int employeeLevel = 1;
        for (Plan tmp : employeePlan) {//��ȡ��¼�˵Ĳ㼶��Ϣ���ڽ��в鿴Ȩ���ж�
            if (tmp.getLevel() < employeeLevel)
                employeeLevel = tmp.getLevel();
        }
        List<Plan> cPlans = planService.getChildPlans(parentPlan.getPlanKey());
        String planContr = parentPlan.getEmployeeId();
        int parentLevel = parentPlan.getLevel();
        for (int i = 0; i < cPlans.size(); i++) {
            Plan tmp = cPlans.get(i);
//			if(!tmp.getEmployeeId().equals(planContr) || tmp.getPlanStateCode() == 0 || !tmp.getLeaf() || 
//					tmp.getLevel() > parentLevel + 1){
            if (tmp.getPlanStateCode() == 0 || !tmp.getLeaf() || employeeLevel > parentPlan.getLevel() ||
                    tmp.getLevel() > parentLevel + 1) {
                cPlans.remove(i);
                i--;
            }
        }
        JsonConfig cfg = new JsonConfig();
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(cPlans, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }

    //ͨ��parentPlanCode��ȡ�����˺ʹ�������Ϣ
    public String getCreatorAuditorId() {
        Plan parentPlan = planService.getPlan(parentPlanCode);
        this.setResult(parentPlan.getEmployeeId());
        return SUCCESS;
    }

    //��ȡ��¼�˴����ƻ�Ȩ�޵Ĳ㼶
    public String getCreatorLevel() {
		/*String creatorLevel = new String();
		List<Role> roleList = roleService.getByEmploeeIdProjectName(employeeId, projectName);
		Set<Integer> groupSet = new HashSet<Integer>();
		for(Role tmp:roleList){
			groupSet.add(tmp.getGroupId());
		}
		for(Integer tmp:groupSet){
			String tmpId = groupService.getById(tmp).getGroupLeaderId();
			creatorLevel += planService.getByEmployeeIdPorjectName(tmpId,projectName) + ",";
		}*/
        String creatorLevel = new String();
        List<Role> roleList = roleService.getRoleList(employeeId);
        Set<String> groupSet = new HashSet<String>();
        for (Role tmp : roleList) {
            groupSet.add(tmp.getProjectName());
        }
        for (String tmp : groupSet) {
            creatorLevel += tmp + ",";
        }
        this.setResult(creatorLevel);
        return SUCCESS;
    }

    //ͨ��planName
/*	public String getChildPlansByPlanName(){
		Plan parentPlan = planService.getPlan(planCode);
		List<Plan> cPlans = planService.getChildPlans(parentPlan.getPlanKey());
		String planContr = parentPlan.getEmployeeId();
		for(int i=0;i<cPlans.size();i++){
			Plan tmp = cPlans.get(i);
			if(!tmp.getEmployeeId().equals(planContr) || tmp.getPlanStateCode() == 0){
				cPlans.remove(i);
				i--;
			}
		}
		JsonConfig cfg = new JsonConfig();
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
		JSONArray jsonarray=JSONArray.fromObject(cPlans, cfg);
		this.setJsonary(jsonarray);
		return SUCCESS;
	}*/

    public String getPlansByEmployeeId() {
        List<Plan> plans = planService.getByEmployeeId(employeeId);
        for (Plan tmp : plans) {
            String s[] = {"http://localhost:8080/615Project/am/updatestate.action?planCode=" + tmp.getPlanCode() + "&statecode=" + tmp.getPlanStateCode(), "http://localhost:8080/615Project/am/plan_report.html?type=search&plancode=" + tmp.getPlanCode()};
//			tmp.setPlanAgreeButton(s);
            java.util.Date now = new java.util.Date();
            Date d = new Date(now.getTime());
            tmp.setPlanRemainingDate(dateminus(tmp.getPlanDeadlineDate(), d));
        }
        JsonConfig cfg = new JsonConfig();
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(plans, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }

    public String getplancount() throws IOException {
        int res = planService.getplancount(employeeId);
        PlanRemind pr = new PlanRemind();
        pr.setNoticeNum(res);
        JSONObject jsonObject = JSONObject.fromObject(pr);
        setResult(jsonObject.toString());
        return SUCCESS;
    }

    public void updatestate() throws IOException {
        int x = planService.updatestate(this.planCode, planState);
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(x);
    }
    
    public void updatePlan(){
    	List<Pair<String,String>> property = new ArrayList();
    	JSONObject obj = JSONObject.fromObject(updatePlanData);
    	for(Object o:obj.keySet()){
    		Pair<String,String> p = Pair.of(o.toString(), obj.get(o).toString());
    		property.add(p);
    	}
    	planService.updatePlan(property);
    }

    public String getstructure() {
        List<Plan> plans = planService.getstructure();
        JsonConfig cfg = new JsonConfig();
        cfg.setJsonPropertyFilter(new PropertyFilter() {
            @Override
            public boolean apply(Object source, String name, Object value) {
                return value == null;
            }
        });
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(plans, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }

    public String getChildPlans() {
        List<Plan> plans = planService.getChildPlans(Integer.parseInt(rootId));
        JsonConfig cfg = new JsonConfig();
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray = JSONArray.fromObject(plans, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }

    public void deleteplan() throws IOException {
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        int x = 0;
        try {
            if (planService.deletePlan(planCode))
                x = 1;
        } catch (Exception e) {
            x = 0;
        }
        response.getWriter().print(x);
    }

    public String search() {
        List<Plan> res = planService.getplanbytype(key, value);
        JSONArray jsonarray = JSONArray.fromObject(res);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }


    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getDateColumn() {
        return dateColumn;
    }

    public void setDateColumn(String dateColumn) {
        this.dateColumn = dateColumn;
    }

    public String getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(String dateFrom) {
        this.dateFrom = dateFrom;
    }

    public String getDateTo() {
        return dateTo;
    }

    public void setDateTo(String dateTo) {
        this.dateTo = dateTo;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getPlanCode() {
        return planCode;
    }

    public String getPlanFinishDate() {
        return planFinishDate;
    }

    public void setPlanFinishDate(String planFinishDate) {
        this.planFinishDate = planFinishDate;
    }

    public Integer getParentKey() {
        return parentKey;
    }

    public void setParentKey(Integer parentKey) {
        this.parentKey = parentKey;
    }

    public void setPlanCode(String planCode) {
        this.planCode = planCode;
    }

    public String getPlanIssuedDate() {
        return planIssuedDate;
    }

    public String getPlanScript() {
        return planScript;
    }

    public void setPlanScript(String planScript) {
        this.planScript = planScript;
    }

    public void setPlanIssuedDate(String planIssuedDate) {
        this.planIssuedDate = planIssuedDate;
    }

    public String getPlanDeadlineDate() {
        return planDeadlineDate;
    }

    public void setPlanDeadlineDate(String planDeadlineDate) {
        this.planDeadlineDate = planDeadlineDate;
    }

    public String getPlanStartDate() {
        return planStartDate;
    }

    public void setPlanStartDate(String planStartDate) {
        this.planStartDate = planStartDate;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getPlanSource() {
        return planSource;
    }

    public void setPlanSource(String planSource) {
        this.planSource = planSource;
    }

    public String getPlanRemainingDate() {
        return planRemainingDate;
    }

    public void setPlanRemainingDate(String planRemainingDate) {
        this.planRemainingDate = planRemainingDate;
    }

    public void setPlanSerialNumber(String planSerialNumber) {
        this.planSerialNumber = planSerialNumber;
    }

    public JSONArray getJsonary() {
        return jsonary;
    }

    public void setJsonary(JSONArray jsonary) {
        this.jsonary = jsonary;
    }

    public JSONObject getJsonobj() {
        return jsonobj;
    }

    public void setJsonobj(JSONObject jsonobj) {
        this.jsonobj = jsonobj;
    }

    public String getPlanSerialNumber() {
        return planSerialNumber;
    }

    public Double getSpi() {
        return spi;
    }

    public void setSpi(Double spi) {
        this.spi = spi;
    }

    public Double getCompletePercentage() {
        return completePercentage;
    }

    public void setCompletePercentage(Double completePercentage) {
        this.completePercentage = completePercentage;
    }

    public String getRemainingDuration() {
        return remainingDuration;
    }

    public void setRemainingDuration(String remainingDuration) {
        this.remainingDuration = remainingDuration;
    }

    public String getRemainingHour() {
        return remainingHour;
    }

    public void setRemainingHour(String remainingHour) {
        this.remainingHour = remainingHour;
    }

    public String getRemainingPeriod() {
        return remainingPeriod;
    }

    public void setRemainingPeriod(String remainingPeriod) {
        this.remainingPeriod = remainingPeriod;
    }

    public String getPredecessor() {
        return predecessor;
    }

    public void setPredecessor(String predecessor) {
        this.predecessor = predecessor;
    }

    public String getSuccessor() {
        return successor;
    }

    public void setSuccessor(String successor) {
        this.successor = successor;
    }

    public String getControlDepartment() {
        return controlDepartment;
    }

    public void setControlDepartment(String controlDepartment) {
        this.controlDepartment = controlDepartment;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    //public Double getCashFlow() {
//	return cashFlow;
//}
//public void setCashFlow(Double cashFlow) {
//	this.cashFlow = cashFlow;
//}
    public String getCashSource() {
        return cashSource;
    }

    public String getCashFlow() {
        return cashFlow;
    }

    public void setCashFlow(String cashFlow) {
        this.cashFlow = cashFlow;
    }

    public void setCashSource(String cashSource) {
        this.cashSource = cashSource;
    }

    public String getCashSubject() {
        return cashSubject;
    }

    public void setCashSubject(String cashSubject) {
        this.cashSubject = cashSubject;
    }

    public Double getCashReal() {
        return cashReal;
    }

    public void setCashReal(Double cashReal) {
        this.cashReal = cashReal;
    }

    public String getModifyType() {
        return modifyType;
    }

    public void setModifyType(String modifyType) {
        this.modifyType = modifyType;
    }

    public String getUpdateDescription() {
        return planUpdateDescription;
    }

    public String getPlanControllerId() {
        return planControllerId;
    }

    public void setPlanControllerId(String planControllerId) {
        this.planControllerId = planControllerId;
    }

    public String getPlanAuditorId() {
        return planAuditorId;
    }

    public void setPlanAuditorId(String planAuditorId) {
        this.planAuditorId = planAuditorId;
    }

    public void setUpdateDescription(String updateDescription) {
        this.planUpdateDescription = updateDescription;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getPermissionLevel() {
        return permissionLevel;
    }

    public void setPermissionLevel(String permissionLevel) {
        this.permissionLevel = permissionLevel;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getRootId() {
        return rootId;
    }

    public void setRootId(String rootId) {
        this.rootId = rootId;
    }

    public Integer getPlanState() {
        return planState;
    }

    public void setPlanState(Integer planState) {
        this.planState = planState;
    }

    public Integer getScriptKey() {
        return scriptKey;
    }

    public void setScriptKey(Integer scriptKey) {
        this.scriptKey = scriptKey;
    }

    public IPlanService getPlanService() {
        return planService;
    }

    public void setPlanService(IPlanService planService) {
        this.planService = planService;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getPlanLevel() {
        return planLevel;
    }

    public void setPlanLevel(String planLevel) {
        this.planLevel = planLevel;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getPlanController() {
        return planController;
    }

    public void setPlanController(String planController) {
        this.planController = planController;
    }

    public Boolean getIsActionItem() {
        return isActionItem;
    }

    public void setIsActionItem(Boolean isActionItem) {
        this.isActionItem = isActionItem;
    }

    public String getParentPlanCode() {
        return parentPlanCode;
    }

    public void setParentPlanCode(String parentPlanCode) {
        this.parentPlanCode = parentPlanCode;
    }

    public String getPlanUpdateDescription() {
        return planUpdateDescription;
    }

    public void setPlanUpdateDescription(String planUpdateDescription) {
        this.planUpdateDescription = planUpdateDescription;
    }

    public IScriptService getScriptService() {
        return scriptService;
    }

    public void setScriptService(IScriptService scriptService) {
        this.scriptService = scriptService;
    }

    public IProjectService getProjectService() {
        return projectService;
    }

    public String getPlanCreatorId() {
        return planCreatorId;
    }

    public void setPlanCreatorId(String planCreatorId) {
        this.planCreatorId = planCreatorId;
    }

    public void setProjectService(IProjectService projectService) {
        this.projectService = projectService;
    }

    public IGroupService getGroupService() {
        return groupService;
    }

    public void setGroupService(IGroupService groupService) {
        this.groupService = groupService;
    }

    public IRoleService getRoleService() {
        return roleService;
    }

    public void setRoleService(IRoleService roleService) {
        this.roleService = roleService;
    }

    public String getMessageIds() {
        return messageIds;
    }

    public void setMessageIds(String messageIds) {
        this.messageIds = messageIds;
    }

    public String getHttpPlan() {
        return HttpPlan;
    }

    public void setHttpPlan(String httpPlan) {
        HttpPlan = httpPlan;
    }

    public String getTaskIds() {
        return taskIds;
    }

    public void setTaskIds(String taskIds) {
        this.taskIds = taskIds;
    }

    public String getHttpMessage() {
        return HttpMessage;
    }

    public void setHttpMessage(String httpMessage) {
        HttpMessage = httpMessage;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getControlDepartmentId() {
        return controlDepartmentId;
    }

    public void setControlDepartmentId(String controlDepartmentId) {
        this.controlDepartmentId = controlDepartmentId;
    }

    public Boolean getIsTask() {
        return isTask;
    }

    public void setIsTask(Boolean isTask) {
        this.isTask = isTask;
    }

    public void setLeaf(Boolean leaf) {
        this.leaf = leaf;
    }

    public void setStatisticsType(String statisticsType) {
        this.statisticsType = statisticsType;
    }

    public String getChangeDetail() {
        return changeDetail;
    }

    public void setChangeDetail(String changeDetail) {
        this.changeDetail = changeDetail;
    }

    public Boolean getLeaf() {
        return leaf;
    }

    public String getStatisticsType() {
        return statisticsType;
    }

    public String getCheckApplyType() {
        return checkApplyType;
    }

    public void setCheckApplyType(String checkApplyType) {
        this.checkApplyType = checkApplyType;
    }

    public Boolean getTask() {
        return isTask;
    }

    public void setTask(Boolean task) {
        isTask = task;
    }

    public Boolean getActionItem() {
        return isActionItem;
    }

    public void setActionItem(Boolean actionItem) {
        isActionItem = actionItem;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUpdatePlanData() {
		return updatePlanData;
	}

	public void setUpdatePlanData(String updatePlanData) {
		this.updatePlanData = updatePlanData;
	}
}
