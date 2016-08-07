package org.sjtu.p615.am.action;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.sjtu.p615.am.service.IActionService;
import org.sjtu.p615.am.service.IEmployeeService;
import org.sjtu.p615.am.service.IPlanService;
import org.sjtu.p615.am.service.IRoleService;
import org.sjtu.p615.am.service.ISystemService;
import org.sjtu.p615.entity.Action;
import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Plan;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import com.opensymphony.xwork2.ActionSupport;

public class SystemAction extends ActionSupport{
	private ISystemService systemService;
	private IEmployeeService employeeService;
	private IPlanService planService;
	private IActionService actionService;
	private IRoleService roleService;
	
	private String employeeId;
	private String optionType;
	private String usrOpt;
	private String result;
	private JSONArray jsonary;
	
	public String saveUsrOpt(){
		systemService.saveUsrOpt(employeeId,optionType,usrOpt);
		setResult("successful");
		return SUCCESS;
	}
	
	public String getUsrPlanOpt(){
		Employee employee = employeeService.getone(employeeId);
		String str = new String();
		str = employee.getPlanListOpt()+" " + employee.getTaskListOpt() + " " + employee.getPlanWaitingListOpt();
		setResult(str);
		return SUCCESS;
	}
	
	public String getUsrActionOpt(){
		Employee employee = employeeService.getone(employeeId);
		String str = new String();
		str = employee.getActionDirListOpt()+" " + employee.getActionListOpt() + " " + employee.getActionWaitingListOpt();
		setResult(str);
		return SUCCESS;
	}
	
	/*****************获取首页信息*******************/
	public String getRemind(){
		List<Plan> plans = planService.getByEmployeeId(employeeId);
		List<Action> actions = actionService.getUsrActions(employeeId);
		List<Role> roles = roleService.getRoleList(employeeId);
		List<Plan> rplans = new ArrayList<Plan>();//用来存放获取的计划提醒
		List<Action> ractions = new ArrayList<Action>();//用来存放获取的行动项提醒
		Map<String,Set<String>> proId2RoleName = new HashMap<String,Set<String>>();//登陆人所参与的项目ID到登陆人在该项目中的角色的映射
		//===============获取项目名称集合==============//
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
		//==================获取计划信息=================//
		java.util.Date now=new java.util.Date();//获取当前时间
		Date d=new Date(now.getTime());
		for(Plan plan:plans){
			String controllerId = plan.getPlanControllerId();
			String auditorId = plan.getPlanAuditorId();
			String creatorId = plan.getPlanCreatorId();
			if(plan.getPlanDeadlineDate()==null) continue;
			boolean flag = false;
			int state = plan.getPlanStateCode();
			if(!plan.getIsTask()&&plan.getLeaf()){//获取工作包提醒
				if(plan.getPlanCode()==null) continue;
				if(planService.getChildPlans(plan.getPlanCode()).size()==0){
					if(controllerId.equals(employeeId) && dateminus(plan.getPlanDeadlineDate(),d)<14){
						flag = true;
						plan.setPlanType("工作包分解提醒");
					}
				}
				/*switch(state){
					case 0:;break;
					case 1:{
						if(controllerId.equals(employeeId) && dateminus(plan.getPlanDeadlineDate(),d)<14){
							flag = true;
							plan.setPlanType("工作包分解提醒");
						}
					}break;
					case 2:;break;
					case 3:;break;
				}*/
			}else if(plan.getIsTask()){//获取任务提醒
				switch(state){
					case 0:;break;
					case 1:;break;
					case 2:{
						if(controllerId.equals(employeeId) && dateminus(plan.getPlanDeadlineDate(),d)<3){
							flag = true;
							plan.setPlanType("任务反馈提醒");
						}
					};break;
					case 3:{
						if(controllerId.equals(employeeId) && dateminus(plan.getPlanDeadlineDate(),d)<3){
							flag = true;
							plan.setPlanType("任务反馈提醒");
						}
					};break;
					case 4:;break;
				}
			}else{//获取计划提醒
				String proId = plan.getProjectId();
				switch(state){
					case 0:;break;
					case 1:;break;
					case 2:;break;
					case 3:{
						if(proId2RoleName.get(proId).contains("项目经理")){
							flag = true;
							plan.setPlanType("工作包目录审批提醒");
						}
					};break;
					case 4:{
						if(proId2RoleName.get(proId).contains("项目领导")){
							flag = true;
							plan.setPlanType("工作包目录审批提醒");
						}
					};break;
					case 5:{
						if(proId2RoleName.get(proId).contains("项目领导")){
							flag = true;
							plan.setPlanType("工作包目录审批提醒");
						}
					};break;
					case 6:;break;
				}
			}
			if(flag)
				rplans.add(plan);
		}
		//==================获取行动项信息=================//
		if(actions.size()!=0){
			for(Action action:actions){
				String controllerId = action.getActionControllerId();
				String auditorId = action.getActionAuditorId();
				String approverId = action.getActionApproverId();
				boolean flag = false;
				int state = action.getActionState();
				if(action.getActionDeadlineDate()==null) continue;
				if(action.getLeaf()==1){
					switch(state){
						case 0:;break;
						case 1:;break;
						case 2:{
							if(controllerId.equals(employeeId) && dateminus(action.getActionDeadlineDate(),d)<3){
								flag = true;
								action.setActionType("行动项反馈提醒");
							}
						};break;
						case 3:{
							if(auditorId.equals(employeeId)){
								flag = true;
								action.setActionType("行动项审核提醒");
							}
						};break;
						case 4:{
							if(approverId.equals(employeeId)){
								flag = true;
								action.setActionType("行动项批准提醒");
							}
						};break;
						case 5:;break;
					}
				}
				if(flag)
					ractions.add(action);
			}
		}
		//==================数据格式化=================//
		JsonConfig cfg = new JsonConfig();
		cfg.setJsonPropertyFilter(new PropertyFilter(){
	        @Override
	        public boolean apply(Object source, String name, Object value) {
	            return value == null;
	        }
	    });
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
		JSONArray jsonarray=JSONArray.fromObject(rplans, cfg);
		JSONArray jsonarray1=JSONArray.fromObject(ractions, cfg);
		for(int i=0;i<jsonarray1.size();i++){
			jsonarray.add(jsonarray.size(),jsonarray1.get(i));
		}
		this.setJsonary(jsonarray);
		
		return SUCCESS;
	}
	
	public int dateminus(Date date,Date d2){
		long day = (date.getTime()-d2.getTime())/(24*60*60*1000)>0 ? (date.getTime()-d2.getTime())/(24*60*60*1000):(date.getTime()-d2.getTime())/(24*60*60*1000);
		return (int)(day>=0?day+1:day-1);
	}
	
	public String getUsrWaitings(){
		
		return SUCCESS;
	}

	public ISystemService getSystemService() {
		return systemService;
	}

	public void setSystemService(ISystemService systemService) {
		this.systemService = systemService;
	}

	public IEmployeeService getEmployeeService() {
		return employeeService;
	}

	public void setEmployeeService(IEmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getOptionType() {
		return optionType;
	}

	public void setOptionType(String optionType) {
		this.optionType = optionType;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getUsrOpt() {
		return usrOpt;
	}

	public void setUsrOpt(String usrOpt) {
		this.usrOpt = usrOpt;
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

	public IRoleService getRoleService() {
		return roleService;
	}

	public void setRoleService(IRoleService roleService) {
		this.roleService = roleService;
	}

	public JSONArray getJsonary() {
		return jsonary;
	}

	public void setJsonary(JSONArray jsonary) {
		this.jsonary = jsonary;
	}
}
