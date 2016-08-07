package org.sjtu.p615.am.action;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.management.relation.RoleInfo;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.IRoleInfoService;
import org.sjtu.p615.am.service.IRoleService;
import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.entity.Roleinfo;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import com.opensymphony.xwork2.ActionSupport;

public class RoleAction extends ActionSupport{
private IRoleService roleService;
private IRoleInfoService roleInfoService;
private String employeeNumber;
private String employeeId;
private String projectName;
private String fracasRoleCombine;
private String result;
private String groupId;
private String projectId;
private JSONArray jsonary;
private Role role;
private String roleKey;
private String roleId;
private Employee[] newGrpMembers;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    private String roleName;
private JSONObject jsonobj;

public String assertRoleByEmployeeId(){
    List<Role> roles = roleService.getRoleList(employeeId);
    boolean ok=false;
    String trueRoleName = null;
    if(roleName.equals("TeamLeader"))
        trueRoleName="组长";
    else if(roleName.equalsIgnoreCase("Manager"))
        trueRoleName="项目经理";
    else if(roleName.equalsIgnoreCase("ProjectLeader"))
        trueRoleName="项目领导";
    else if(roleName.equalsIgnoreCase("Worker"))
        trueRoleName="组员";
    else if(roleName.equalsIgnoreCase("DepartmentLeader"))
        trueRoleName="部门领导";

    if(trueRoleName != null)
        for(Role role : roles){
            if(role.getProjectId().equals(projectId) && role.getRoleName().equals(trueRoleName)){
                ok = true;
                break;
            }
        }
    jsonobj = new JSONObject();
    jsonobj.put("success",ok);
    return SUCCESS;
}
public String getRoleByEmployee() {
//	List<Role> roles = roleService.getRoleList(projectName);
	List<Role> roles = roleService.getRoleList(employeeId);
	JSONArray jArray = JSONArray.fromObject(roles);
//	setResult(jArray.toString());
	setJsonary(jArray);
	return SUCCESS;
}

public String getRoleByProject() {
	List<Role> roles = roleService.getRoleListByProject(projectName);
	JSONArray jArray = JSONArray.fromObject(roles);
	setResult(jArray.toString());
	return SUCCESS;
}
public String getRolesForFracas(){
	List<Role> roles = roleService.getRoleListByProject(projectName);
	List<Role> temp_roles = new ArrayList<Role>();
	Iterator<Role> it = roles.iterator();
	while(it.hasNext()){  
		Role role=it.next();
		boolean exist = false;
		for(int i=0; i<temp_roles.size(); i++){
			Role temp_role = roles.get(i);
			if(temp_role.getEmployeeName().equals(role.getEmployeeName())){  
				exist = true;  
			}   
		}
		if(!exist){
			temp_roles.add(role);
		}
	}
	JSONArray jArray = JSONArray.fromObject(temp_roles);
	setResult(jArray.toString());
	return SUCCESS;
}
public String getRoleByGroup(){
	List<Role> roles = roleService.getRoleListByGroup(Integer.parseInt(groupId));
	JSONArray jArray = JSONArray.fromObject(roles);
	this.setJsonary(jArray);
	setResult(jArray.toString());
	return SUCCESS;
}
public String changeFracasRole() {
	String[] params = fracasRoleCombine.split(" ");
	List<Role> roles = roleService.getRoleListByProject(params[0]);
	for (Role role : roles) {
		if (role.getRoleName() == null) {
			continue;
		}
		if (role.getRoleName().equals("project_leader")) {
			role.setEmployeeId(params[1]);
			role.setEmployeeName(params[2]);
		}
		else if (role.getRoleName().equals("qa_leader")) {
			role.setEmployeeId(params[3]);
			role.setEmployeeName(params[4]);
		}
		else if (role.getRoleName().equals("mrb")) {
			role.setEmployeeId(params[5]);
			role.setEmployeeName(params[6]);
		}
		roleService.saveRole(role);
	}
	return SUCCESS;
}
public String saveRole(){
	roleService.saveRole(role);
	return SUCCESS;
}

public String addRoles(){
//	HttpServletRequest request=null;
//	 try {
//	 request=ServletActionContext.getRequest();
//	 Map<String,String[]> mm=request.getParameterMap();
//	 JSONObject json=JSONObject.fromObject(mm);
//	 Enumeration enu=request.getParameterNames();  
//	 while(enu.hasMoreElements()){  
//	 String paraName=(String)enu.nextElement();  
//	 System.out.println(paraName+": "+request.getParameter(paraName));  
//	 }  
//	} 
//	 catch (Exception e) {
//	// TODO: handle exception
//	e.printStackTrace();
//	} 
	List<Role> roles=null;
	Role role=null;
	jsonobj=new JSONObject();
	for(Employee tmp:newGrpMembers){
		role=new Role();
		role.setEmployeeId(tmp.getEmployeeNumber());
		role.setGroupId(Integer.parseInt(groupId));
		role.setProjectId(projectId);
		role.setProjectName(projectName);
		role.setEmployeeName(tmp.getEmployeeName());
		role.setRoleId(12);
		role.setDeleteMark(false);
		role.setRoleName("组员");
		roles.add(role);
	}
	try{
		roleService.addRoles(roles);
		jsonobj.put("msg", "success");
	}
	catch(Exception e){
		e.printStackTrace();
		jsonobj.put("msg", "error");
	}
	return SUCCESS;
}

public String changeOneRole(){
	Role role=roleService.getOneRole(Integer.parseInt(roleKey));
	role.setRoleId(Integer.parseInt(roleId));
	//Roleinfo roleInfo=roleInfoService.getById(Integer.parseInt(roleId));
	//role.setRoleName(roleInfo.getRoleName());
	jsonobj=new JSONObject();
	try{
		roleService.saveRole(role);
	}
	catch(Exception e){
		e.printStackTrace();
		jsonobj.put("msg", "error");
	}
	jsonobj.put("msg","success");
	return SUCCESS;
}
public String deleteOneRole(){
	jsonobj=new JSONObject();
	try{
		roleService.deleteOneRole(Integer.parseInt(roleKey));
	}
	catch(Exception e){
		e.printStackTrace();
		jsonobj.put("msg", "error");
	}
	jsonobj.put("msg","success");
	return SUCCESS;
}
public String addOneRole(){
	jsonobj=new JSONObject();
	try{
		Role role=new Role();
		role.setEmployeeId(employeeId);
		role.setGroupId(Integer.parseInt(groupId));
		role.setProjectId(projectId);
		role.setRoleId(1);
		role.setDeleteMark(false);
		roleService.saveRole(role);
	}
	catch(Exception e){
		e.printStackTrace();
		jsonobj.put("msg", "error");
	}
	jsonobj.put("msg","success");
	return SUCCESS;
}
public String addGrpMember(){
	jsonobj=new JSONObject();
	try{
		Role role=new Role();
		role.setEmployeeId(employeeId);
		role.setGroupId(Integer.parseInt(groupId));
		role.setProjectId(projectId);
		role.setRoleId(1);
		role.setDeleteMark(false);
		roleService.saveRole(role);
	}
	catch(Exception e){
		e.printStackTrace();
		jsonobj.put("msg", "error");
	}
	jsonobj.put("msg","success");
	return SUCCESS;
}
//��ȡ�������ƻ�Ȩ��
public String getUserPrivilege(){
	List<Role> roleList = roleService.getRoleList(employeeId);
	for(Role tmp:roleList){
		if(tmp.getRoleId().equals(7)){
			setResult("approval");
			return SUCCESS;
		}
	}
	setResult("disapproval");
	return SUCCESS;
}
//��ȡ��Ŀ����
public String getallManager(){
	List<Role> roleList = roleService.getRoleByRoleId(3);
	JsonConfig cfg = new JsonConfig();
	cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
	JSONArray jsonarray=JSONArray.fromObject(roleList,cfg);
	this.setJsonary(jsonarray);
	return SUCCESS;
}

public String getEmployeeNumber() {
	return employeeNumber;
}

public void setEmployeeNumber(String employeeNumber) {
	this.employeeNumber = employeeNumber;
}

public IRoleService getRoleService() {
	return roleService;
}

public void setRoleService(IRoleService roleService) {
	this.roleService = roleService;
}

public String getResult() {
	return result;
}

public void setResult(String result) {
	this.result = result;
}

public String getEmployeeId() {
	return employeeId;
}

public void setEmployeeId(String employeeId) {
	this.employeeId = employeeId;
}

public String getProjectName() {
	return projectName;
}

public void setProjectName(String projectName) {
	this.projectName = projectName;
}

public String getFracasRoleCombine() {
	return fracasRoleCombine;
}

public void setFracasRoleCombine(String fracasRoleCombine) {
	this.fracasRoleCombine = fracasRoleCombine;
}

public String getGroupId() {
	return groupId;
}

public void setGroupId(String groupId) {
	this.groupId = groupId;
}

public JSONArray getJsonary() {
	return jsonary;
}

public void setJsonary(JSONArray jsonary) {
	this.jsonary = jsonary;
}

public Role getRole() {
	return role;
}

public void setRole(Role role) {
	this.role = role;
}
public Employee[] getNewGrpMembers() {
	return newGrpMembers;
}

public void setNewGrpMembers(Employee[] newGrpMembers) {
	this.newGrpMembers = newGrpMembers;
}

public String getProjectId() {
	return projectId;
}

public void setProjectId(String projectId) {
	this.projectId = projectId;
}

public String getRoleKey() {
	return roleKey;
}

public void setRoleKey(String roleKey) {
	this.roleKey = roleKey;
}

public String getRoleId() {
	return roleId;
}

public void setRoleId(String roleId) {
	this.roleId = roleId;
}

public IRoleInfoService getRoleInfoService() {
	return roleInfoService;
}

public void setRoleInfoService(IRoleInfoService roleInfoService) {
	this.roleInfoService = roleInfoService;
}

public JSONObject getJsonobj() {
	return jsonobj;
}

public void setJsonobj(JSONObject jsonobj) {
	this.jsonobj = jsonobj;
}


}
