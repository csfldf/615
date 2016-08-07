package org.sjtu.p615.am.action;

import com.opensymphony.xwork2.ActionSupport;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.*;
import org.sjtu.p615.entity.Action;
import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Plan;
import org.sjtu.p615.entity.Project;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class ActionAction extends ActionSupport{
	private static final long serialVersionUID = 1L;
	private IPlanService planService;
	private IProjectService projectService;
	private IScriptService scriptService;
	private IGroupService groupService;
	private IRoleService roleService;
	private IActionService actionService;
	private IEmployeeService employeeService;
	
	private String employeeId; 
	private String projectId;
	private JSONArray jsonary;
	private String result;

	private String parentActionId;
	private String actionId;
	private String actionIds;
	private String actionType;
	private String actionName;
	private String actionDeadlineDate;
	private String actionFinishDate;
	private int actionState;
	private String actionResource;

	private String controllerDepartment;
	private String controllerDepartmentId;
	private String actionController;
	private String actionControllerId;
	private String actionAuditorId;
    private String actionAuditor;
    private String actionApproverId;
    private String actionApprover;

	private Boolean back;

    private String remark;
    
    private String HttpAction;//用来存放传来的action数据
	private Byte leaf;
	private int level;

	private JSONObject jsonobj;
	

	List<Action> tmpActions = new ArrayList<Action>();//存放某个项目的actions

	public String getUnreleasedActions() {
		List<Action> actions = null;
		if(actionAuditorId!=null && !actionAuditorId.equals("")){
			actions=actionService.getUnreleasedActions(actionAuditorId);
		}
		JsonConfig cfg = new JsonConfig();
		cfg.setJsonPropertyFilter(new PropertyFilter() {
			@Override
			public boolean apply(Object source, String name, Object value) {
				return value == null;
			}
		});
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
		JSONArray jsonary = JSONArray.fromObject(actions, cfg);
		this.setJsonary(jsonary);
		return SUCCESS;
	}

	public String addAction() throws ClassNotFoundException, InstantiationException, IllegalAccessException, 
	NoSuchMethodException, SecurityException, ParseException, IllegalArgumentException, InvocationTargetException{
		JSONObject jsonobj = JSONObject.fromObject(HttpAction);
		Object obj = JSONObject.toBean(jsonobj);
		Action action = new Action();
		
		//使用反射技术获取Action类的域
		Class<?> demo = null;
		demo = Class.forName("org.sjtu.p615.entity.Action");
		
		Field fields[] = demo.getDeclaredFields();
		for(int i=0;i<fields.length;i++){
			Field field = fields[i];
			String fieldName = field.getName();
			Object value_obj = jsonobj.get(fieldName);
			if(value_obj==null||fieldName.compareTo("planOutput")==0||fieldName.compareTo("actionKey")==0) continue;
			String value = value_obj.toString();
			Object property_obj = null;
			if(fieldName.indexOf("Date")!=-1){
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date sqlDate = value.equals("")?null:sdf.parse(value);
				java.sql.Date date = sqlDate==null?null:new java.sql.Date(sqlDate.getTime());
				property_obj = date;
			}
			else if(fieldName.indexOf("State")!=-1||fieldName.indexOf("Key")!=-1
					||fieldName.indexOf("level")!=-1){
				property_obj = Integer.valueOf(value);
			}else if(fieldName.indexOf("leaf")!=-1){
				property_obj = Byte.valueOf(value);
			}else if(fieldName.indexOf("back")!=-1||fieldName.indexOf("deleteMark")!=-1){
				property_obj = Boolean.valueOf(value);
			}
			else{
				property_obj = value;
			}
            String firstLetter = fieldName.substring(0, 1).toUpperCase();
            String setMethodName = "set" + firstLetter + fieldName.substring(1);// 获得和属性对应的setXXX()方法的名字
            Class<?> fieldType = field.getType();
            Method setMethod = demo.getMethod(setMethodName, fieldType);// 获得和属性对应的setXXX()方法
            setMethod.invoke(action, property_obj);
            
		}
        actionService.saveAction(action);//将数据插入数据库0
		
		return SUCCESS;
	}
	
	public String saveAction() throws IOException {
		boolean success=false;
		HttpServletResponse resp= ServletActionContext.getResponse();
		resp.setCharacterEncoding("utf-8");
		Action action = null;
		try{
			if(actionId!=null && actionId.equals("")==false){
				action=actionService.getAction(actionId);
				if(action==null)
					action=new Action();
				//??????????
				action.setActionId(actionId);
				action.setActionName(actionName);
				action.setActionType(actionType);
				action.setActionControllerId(actionControllerId);
				action.setActionController(actionController);
				action.setActionResource(actionResource);
				action.setActionState(actionState);
                action.setActionApprover(actionApprover);
                action.setActionApproverId(actionApproverId);
                action.setActionAuditor(actionAuditor);
                action.setActionAuditorId(actionAuditorId);
                action.setParentActionId(parentActionId);
				action.setRemark(remark);
				action.setProjectId(projectId);
				action.setLevel(level);
				action.setLeaf(leaf);
				action.setControllerDepartment(controllerDepartment);
				action.setControllerDepartmentId(controllerDepartmentId);
				action.setEmployeeId(employeeId);

				if(actionDeadlineDate != null && actionDeadlineDate.equals("") == false)
					action.setActionDeadlineDate(java.sql.Date.valueOf(actionDeadlineDate));
				else
					action.setActionDeadlineDate(null);
				if(actionFinishDate != null && actionFinishDate.equals("")==false)
					action.setActionFinishDate(java.sql.Date.valueOf(actionFinishDate));
				else
					action.setActionFinishDate(null);

				action.setBack(back);
				action.setDeleteMark(false);

				success = actionService.saveAction(action);
			}
		}catch(Exception e){
			e.printStackTrace();
			success=false;
		}
		if(success)
			resp.getWriter().print("{\"success\":true}");
		else
			resp.getWriter().print("{\"success\":false}");
		return null;

	}

	public String getAction(){
		Action action = actionService.getAction(actionId);
		JsonConfig cfg = new JsonConfig();
		cfg.setJsonPropertyFilter(new PropertyFilter() {
			@Override
			public boolean apply(Object source, String name, Object value) {
				return value == null;
			}
		});
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
		JSONObject jsonobj = JSONObject.fromObject(action, cfg);
		this.setJsonobj(jsonobj);
		return SUCCESS;
	}
	
	public String delActions(){
		List<String> actionIDs = Arrays.asList(actionIds.split(","));
		for(String actionID:actionIDs)
			actionService.deleteAction(actionID);
		return SUCCESS;
	}

	public String delAction() throws IOException{
		boolean success=false;
		HttpServletResponse resp=ServletActionContext.getResponse();
		resp.setCharacterEncoding("utf-8");
		try{
			success=actionService.deleteAction(actionId);
		}catch(Exception e){
			e.printStackTrace();
		}
		if(success)
			resp.getWriter().print("{\"success\":true}");
		else
			resp.getWriter().print("{\"success\":false}");
		return null;
	}



	public String getUsrActions(){
		List<Action> actions = actionService.getUsrActions(employeeId);
		JsonConfig cfg = new JsonConfig();
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
		JSONArray jsonarray=JSONArray.fromObject(actions, cfg);
		this.setJsonary(jsonarray);
		return SUCCESS;
	}

	public String getUserProject(){
		/*
		 * 用来获取登陆人相关的项目，并统计登陆人在项目中的待办事项的个数
		 * */
		//===================定义数据结构=================//
		List<Project> projects = projectService.getAllProjects();
		Map<String,Project> proId2Pro = new HashMap<String,Project>();//存放项目ID到项目的映射
		List<Role> roleList = roleService.getRoleList(employeeId);
		Map<String,String> proId2Name = new HashMap<String,String>();//项目id到项目名称的映射
		Map<String,Set<String>> proId2RoleName = new HashMap<String,Set<String>>();//存放登陆人在指定项目的角色信息
		Set<String> role_set = new HashSet<String>();
		Map<String,List<Action>> proId2action_map = new HashMap<String,List<Action>>();
		List<String> projectData_list = new ArrayList<String>();
		Map<String,Integer> proId2Waitings = new HashMap<String,Integer>();
		Set<String> proId_set = new HashSet<String>();
		//===============获取项目ID到项目的映射==============//
		for(Project p:projects){
			proId2Pro.put(p.getProjectId(), p);
		}
		//===============获取项目名称集合==============//
		for(Role role:roleList){
			if( role!=null && role.getProjectId()!=null && !role.getProjectId().equals("")){
				proId_set.add(role.getProjectId());
				/*获取登陆人所属项目到角色名的映射*/
				Set<String> s = proId2RoleName.get(role.getProjectId());
				if(s!=null){
					s.add(role.getRoleName());
				}else{
					s = new HashSet<String>();
					s.add(role.getRoleName());
					proId2RoleName.put(role.getProjectId(), s);
				}
				/*获取项目ID到项目名称的映射*/
				if(role.getProjectName()!=null)
					proId2Name.put(role.getProjectId(), role.getProjectName());
			}
		}
		//================获取项目中的计划===============//
		for(String proId:proId_set){
			List<Action> actions = actionService.getProjectActions(proId);
			proId2action_map.put(proId, actions);
		}
		//================统计项目信息=================//
		for(String proId:proId2action_map.keySet()){
			List<Action> actions = proId2action_map.get(proId);
			Project project = projectService.getOneProject(proId);
			if(actions.size()==0){//项目还没有计划的情况
				proId2Waitings.put(proId, 0);
			}else{//项目在plan表中存在计划的情况
				int waitingAcc = 0;//统计待办事项
				for(Action action:actions){
					String controllerId = action.getActionControllerId();
					String approverId = action.getActionApproverId();
					String auditorId = action.getActionAuditorId();
					Integer actionState = action.getActionState();
					if(action.getLeaf()==null) continue;
					if(action.getLeaf()==1){
						if(!actionState.equals(5)){
							int state = actionState.intValue();
							if(proId2RoleName.get(proId)==null) continue;
							if(state==0||state==1||state==3){
								if(employeeId.equals(auditorId)){
									waitingAcc++;
								}
							}else if(state==2){
								if(employeeId.equals(controllerId)){
									waitingAcc++;
								}
							}else{
								if(employeeId.equals(approverId)){
									waitingAcc++;
								}
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
		for(String proId:proId2Waitings.keySet()){
			String strData = new String();
			if(proId2Name.get(proId)==null || proId2Pro.get(proId)==null) continue;
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
	
	public String getUsrActionProjects(){
		List<Action> actions = actionService.getUsrActionProjects(employeeId);

		Map<String,Integer> jobMapAcc = new HashMap<String,Integer>();//store waiting actions
		Map<String,String> jobMapDate = new HashMap<String,String>();//store start and end date
		for(Action tmp:actions){
			String tproName = tmp.getProjectId();
			//count waiting actions
			if(tmp.getLeaf()==1 && tmp.getActionFinishDate()==null){
				if(jobMapAcc.get(tproName) == null)
					jobMapAcc.put(tproName,1);
				else{
					Integer dtmp = jobMapAcc.get(tproName);
					dtmp++;
					jobMapAcc.put(tproName, dtmp);
				}
			}
			//get project start and end date
			if(jobMapDate.get(tproName)==null){
				Project tmpPro = projectService.getOneProject(tmp.getProjectId());
				if(tmpPro==null) continue;
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
				String strStartDate = new String();
				String strDeadDate = new String();
                String projectId = tmpPro.getProjectId();
                if (tmpPro.getStartDate() != null)
                    strStartDate = sdf.format(tmpPro.getStartDate());
                if(tmpPro.getStartDate()!=null)
					strDeadDate=sdf.format(tmpPro.getEndDate());
                jobMapDate.put(tproName, "',projectStartingDate:'" + strStartDate + "',projectDeadlineDate:'" + strDeadDate + "',projectId:'" + projectId + "'");
            }
        }
        String resultTmp = new String();
		resultTmp += "[";
		for(String key:jobMapAcc.keySet()){
			if(jobMapDate.get(key)!=null)
				resultTmp += "{projectName:'" + key + "',projectWaitingTrans:'" + jobMapAcc.get(key).toString() + jobMapDate.get(key) + "},";
		}
		resultTmp = resultTmp + "]";
		setResult(resultTmp);
		JsonConfig cfg = new JsonConfig();
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
		JSONArray jsonarray=JSONArray.fromObject(actions, cfg);
		this.setResult(resultTmp);
		return SUCCESS;
	}
	public String getUsrActionWaitings(){
		List<Action> actions = actionService.getUsrActions(employeeId);
		List<Role> roles = roleService.getRoleList(employeeId);
		List<Action> ractions = new ArrayList<Action>();//返回的结果
		Map<String,Set<String>> proId2RoleName = new HashMap<String,Set<String>>();//登陆人所属项目到所属项目中角色的映射
		//===============获取项目id到角色名称的映射==============//
		for(Role role:roles){
			if( role!=null && role.getProjectId()!=null && !role.getProjectId().equals("")){
				/*获取登陆人所属项目到角色名的映射*/
				Set<String> s = proId2RoleName.get(role.getProjectId());
				if(s!=null){
					s.add(role.getRoleName());
				}else{
					s = new HashSet<String>();
					s.add(role.getRoleName());
					proId2RoleName.put(role.getProjectId(), s);
				}
			}
		}
		for(Action action:actions){
			String proId = action.getProjectId();
			String controllerId = action.getActionControllerId();
			String approverId = action.getActionApproverId();
			String auditorId = action.getActionAuditorId();
			Integer actionState = action.getActionState();
			if(action.getLeaf()==null) continue;
			if(action.getLeaf()==1){
				if(!actionState.equals(5)){
					int state = actionState.intValue();
					if(proId2RoleName.get(proId)==null) continue;
					if(state==0||state==1||state==3){
						if(employeeId.equals(auditorId)){
							ractions.add(action);
						}
					}else if(state==2){
						if(employeeId.equals(controllerId)){
							ractions.add(action);
						}
					}else{
						if(employeeId.equals(approverId)){
							ractions.add(action);
						}
					}
				}
			}
		}
		JsonConfig cfg = new JsonConfig();
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
		JSONArray jsonarray=JSONArray.fromObject(ractions, cfg);
		this.setJsonary(jsonarray);
		return SUCCESS;
	}
	
	public String getUsrActionOpt(){
		Employee employee = employeeService.getone(employeeId);
		String str = new String();
		str = employee.getActionListOpt() + " " + employee.getActionWaitingListOpt();
		setResult(str);
		return SUCCESS;
	}
	
	public String getProjectActions(){
		List<Action> actions=actionService.getProjectActions(projectId);
		for(int i=0;i < actions.size();i++){
			if(actions.get(i).getLevel() == 1){
				Action tmpFather = actions.get(i);
				tmpActions.add(tmpFather);
				actions.remove(i);
				i--;
				actionFindChild(tmpFather.getActionId(),actions,0);
			}
		}
		JsonConfig cfg = new JsonConfig();
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
		JSONArray jsonarray=JSONArray.fromObject(tmpActions, cfg);
		this.setJsonary(jsonarray);
		return SUCCESS;
	}
	public void actionFindChild(String parentActionId,List<Action> actions,int space){
		space++;
		for(int j = 0;j < actions.size();j++){
			String parentId = actions.get(j).getParentActionId();
			if(parentId!=null && parentActionId!=null && parentId.equals(parentActionId)){
				Action buffer = actions.get(j);
				String nparentActionId = buffer.getActionId();
				buffer.setActionId(String.valueOf(space)+" "+buffer.getActionId());
				tmpActions.add(buffer);
				actions.remove(j);
				j--;
				actionFindChild(nparentActionId,actions,space);
			}
		}
	}

	public IPlanService getPlanService() {
		return planService;
	}

	public void setPlanService(IPlanService planService) {
		this.planService = planService;
	}

	public IActionService getActionService() {
		return actionService;
	}

	public void setActionService(IActionService actionService) {
		this.actionService = actionService;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public JSONArray getJsonary() {
		return jsonary;
	}

	public void setJsonary(JSONArray jsonary) {
		this.jsonary = jsonary;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public IProjectService getProjectService() {
		return projectService;
	}

	public void setProjectService(IProjectService projectService) {
		this.projectService = projectService;
	}
	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public IEmployeeService getEmployeeService() {
		return employeeService;
	}

	public void setEmployeeService(IEmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	public IScriptService getScriptService() {
		return scriptService;
	}

	public void setScriptService(IScriptService scriptService) {
		this.scriptService = scriptService;
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

	public String getParentActionId() {
		return parentActionId;
	}

	public void setParentActionId(String parentActionId) {
		this.parentActionId = parentActionId;
	}

	public String getActionId() {
		return actionId;
	}

	public void setActionId(String actionId) {
		this.actionId = actionId;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public String getActionName() {
		return actionName;
	}

	public void setActionName(String actionName) {
		this.actionName = actionName;
	}



	public int getActionState() {
		return actionState;
	}

	public void setActionState(int actionState) {
		this.actionState = actionState;
	}

	public String getActionResource() {
		return actionResource;
	}

	public void setActionResource(String actionResource) {
		this.actionResource = actionResource;
	}

	public String getControllerDepartment() {
		return controllerDepartment;
	}

	public void setControllerDepartment(String controllerDepartment) {
		this.controllerDepartment = controllerDepartment;
	}

	public String getActionController() {
		return actionController;
	}

	public void setActionController(String actionController) {
		this.actionController = actionController;
	}

	public String getActionControllerId() {
		return actionControllerId;
	}

	public void setActionControllerId(String actionControllerId) {
		this.actionControllerId = actionControllerId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getLeaf() {
		return leaf;
	}


	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getActionAuditorId() {
		return actionAuditorId;
	}

	public void setActionAuditorId(String actionAuditorId) {
		this.actionAuditorId = actionAuditorId;
	}

	public String getActionApproverId() {
		return actionApproverId;
	}

	public void setActionApproverId(String actionApproverId) {
		this.actionApproverId = actionApproverId;
	}

	public String getActionDeadlineDate() {
		return actionDeadlineDate;
	}

	public void setActionDeadlineDate(String actionDeadlineDate) {
		this.actionDeadlineDate = actionDeadlineDate;
	}

	public String getActionFinishDate() {
		return actionFinishDate;
	}

	public void setActionFinishDate(String actionFinishDate) {
		this.actionFinishDate = actionFinishDate;
	}

	public String getControllerDepartmentId() {
		return controllerDepartmentId;
	}

	public void setControllerDepartmentId(String controllerDepartmentId) {
		this.controllerDepartmentId = controllerDepartmentId;
	}

	public Boolean getBack() {
		return back;
	}

	public void setBack(Boolean back) {
		this.back = back;
	}

	public void setLeaf(Byte leaf) {
		this.leaf = leaf;
	}

	public JSONObject getJsonobj() {
		return jsonobj;
	}

	public void setJsonobj(JSONObject jsonobj) {
		this.jsonobj = jsonobj;
    }

    public String getActionApprover() {
        return actionApprover;
    }

    public void setActionApprover(String actionApprover) {
        this.actionApprover = actionApprover;
    }

    public String getActionAuditor() {
        return actionAuditor;
    }

    public void setActionAuditor(String actionAuditor) {
        this.actionAuditor = actionAuditor;
    }

	public String getActionIds() {
		return actionIds;
	}

	public void setActionIds(String actionIds) {
		this.actionIds = actionIds;
	}

	public String getHttpAction() {
		return HttpAction;
	}

	public void setHttpAction(String httpAction) {
		HttpAction = httpAction;
	}
}
