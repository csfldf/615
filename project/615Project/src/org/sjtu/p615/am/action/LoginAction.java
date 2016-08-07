package org.sjtu.p615.am.action;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession; 

import net.sf.json.JSON;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.EmployeeService;
import org.sjtu.p615.am.service.IAmPrivilegeService;
import org.sjtu.p615.am.service.IEmployeeService;
import org.sjtu.p615.am.service.IRoleService;
import org.sjtu.p615.am.service.RoleService;
import org.sjtu.p615.entity.Amprivilege;
import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport{
private String username;
private String password;
private String result;
private JSONObject jsonobj;
IEmployeeService employeeService;
IRoleService roleService;
IAmPrivilegeService amPrivilegeService;
public String login(){
	int res=1;
	try{
	jsonobj=new JSONObject();
	res=employeeService.getEmployeeInfo(username,password);
	}
	catch(Exception e){
		jsonobj.put("msg", "error");
		e.printStackTrace();
		return ERROR;
	}
	if(res==1){
		HttpSession session=ServletActionContext.getRequest().getSession();
		session.setAttribute("employeeId",username);
		//String emp=(String)session.getAttribute("employeeId");
		Employee employee = employeeService.getone(username);
		session.setAttribute("employeeName", employee.getEmployeeName());
		//session.setAttribute("employeeName",employee.getEmployeeName());
//		List<Role> roles=roleService.getRoleList(username);
		jsonobj=JSONObject.fromObject(employee);
		jsonobj.put("msg", "success");
	}else{
		jsonobj.put("msg", "error");
	}
	return SUCCESS;
}
public String checkLogin(){
	jsonobj=new JSONObject();
	HttpSession session=ServletActionContext.getRequest().getSession();
	if(session.getAttribute("employeeId")!=null){
		Employee emp=new Employee();
		emp.setEmployeeNumber((String)session.getAttribute("employeeId"));
		emp.setEmployeeName((String)session.getAttribute("employeeName"));
		jsonobj=JSONObject.fromObject(emp);
		jsonobj.put("success", true);
	}else{
		jsonobj.put("success", false);
	}
	return SUCCESS;
}



public String selectRole(){
	
	return SUCCESS;
}

public JSONObject getJsonobj() {
	return jsonobj;
}

public void setJsonobj(JSONObject jsonobj) {
	this.jsonobj = jsonobj;
}

public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getResult() {
	return result;
}
public void setResult(String result) {
	this.result = result;
}

public IEmployeeService getEmployeeService() {
	return employeeService;
}

public void setEmployeeService(IEmployeeService employeeService) {
	this.employeeService = employeeService;
}

public IAmPrivilegeService getAmPrivilegeService() {
	return amPrivilegeService;
}

public void setAmPrivilegeService(IAmPrivilegeService amPrivilegeService) {
	this.amPrivilegeService = amPrivilegeService;
}
public IRoleService getRoleService() {
	return roleService;
}

public void setRoleService(IRoleService roleService) {
	this.roleService = roleService;
}
}
