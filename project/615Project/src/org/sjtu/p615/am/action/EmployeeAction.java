package org.sjtu.p615.am.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.opensymphony.xwork2.ActionSupport;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.EmployeeService;
import org.sjtu.p615.am.service.IEmployeeService;
import org.sjtu.p615.am.service.IPlanService;
import org.sjtu.p615.am.service.IRoleService;
import org.sjtu.p615.am.service.PlanService;
import org.sjtu.p615.am.service.RoleService;
import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Plan;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.util.json.JsonDateValueProcessor;
public class EmployeeAction extends ActionSupport{
	//private IEmployeeService employeeservice;
	private JSONArray jsonary;
	private JSONObject jsonobj;
	private String result;
	private String projectId;
	private String employeeId;
	private String employeeName;
	private String employeeNumber;
	private String employeeEmail;
	private String departmentName;
	private String departmentId;
	private String loginPassword;
	private IEmployeeService employeeService;
	private IRoleService roleService;
	private Employee employee;
	private String type;
	private String major;

public String getall()
{
	List<Employee> res=employeeService.getalluser();
	JsonConfig cfg = new JsonConfig();
	cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
	JSONArray jsonarray=JSONArray.fromObject(res,cfg);
	this.setJsonary(jsonarray);
	return SUCCESS;
}

public String getEmployeesByProject(){
	List<Employee> res=employeeService.getalluser();
	List<Role> roles=roleService.getRoleListByProject(projectId);
	Map<String,Role> empId2Role = new HashMap<String,Role>();
	for(Role r:roles){
		empId2Role.put(r.getEmployeeId(), r);
	}
	for(int i=0;i<res.size();i++){
		Employee e = res.get(i);
		if(!empId2Role.containsKey(e.getEmployeeNumber())){
			res.remove(i);
			i--;
		}
	}
	JsonConfig cfg = new JsonConfig();
	cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
	JSONArray jsonarray=JSONArray.fromObject(res,cfg);
	this.setJsonary(jsonarray);
	return SUCCESS;
}
public String getEmpList(){
	List<Employee> res=employeeService.getAllEmps();
	JsonConfig cfg = new JsonConfig();
	cfg.setJsonPropertyFilter(new PropertyFilter(){
        @Override
        public boolean apply(Object source, String name, Object value) {
            return value == null;
        }
    });
	JSONArray jsonarray=JSONArray.fromObject(res,cfg);
	this.setJsonary(jsonarray);
	return SUCCESS;
}
public String getRoleList()
{
	IRoleService roleService=new RoleService();
	List<Role> roles=roleService.getRoleList(employeeId);
	jsonary=JSONArray.fromObject(roles);
	return SUCCESS;
}

public String getOneEmployee(){
	HttpSession session=ServletActionContext.getRequest().getSession();
	Employee emp=new Employee();
	try{
		emp=employeeService.getone((String)session.getAttribute("employeeId"));
	}catch(Exception e){
		e.printStackTrace();
		return ERROR;
	}
	jsonobj=JSONObject.fromObject(emp);
	return SUCCESS;
}

public String addOrModifyEmp(){
	this.jsonobj=new JSONObject();
	try{
		employee.setDeleteMark(false);
		employee.setDepartmentId(Integer.parseInt(departmentId));
		employee.setDepartmentName(departmentName);
		employee.setEmployeeNumber(employeeNumber);
		employee.setEmployeeName(employeeName);
		employee.setEmployeeEmail(employeeEmail);
		employee.setMajor(major);
		employee.setRoleId(1);
		employee.setLoginPassword(loginPassword);
		employeeService.addOrModify(employee, type);
	}
	catch(Exception e){
		e.printStackTrace();
		jsonobj.put("msg", "error");
		return ERROR;
	}
	jsonobj.put("msg","success");
	return SUCCESS;
}
public String delOneEmp(){
	this.jsonobj=new JSONObject();
	try{
		employeeService.delOne(employeeNumber);
	}
	catch(Exception e){
		e.printStackTrace();
		jsonobj.put("msg", "error");
		return SUCCESS;
	}
	jsonobj.put("msg","success");
	return SUCCESS;
}
public IEmployeeService getEmployeeService() {
	return employeeService;
}
public void setEmployeeService(IEmployeeService employeeService) {
	this.employeeService = employeeService;
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
public String getEmployeeId() {
	return employeeId;
}
public void setEmployeeId(String employeeId) {
	this.employeeId = employeeId;
}
public String getEmployeeName() {
	return employeeName;
}

public void setEmployeeName(String employeeName) {
	this.employeeName = employeeName;
}

public String getResult() {
	return result;
}

public void setResult(String result) {
	this.result = result;
}

public Employee getEmployee() {
	return employee;
}

public void setEmployee(Employee employee) {
	this.employee = employee;
}

public String getType() {
	return type;
}

public void setType(String type) {
	this.type = type;
}

public String getEmployeeNumber() {
	return employeeNumber;
}

public void setEmployeeNumber(String employeeNumber) {
	this.employeeNumber = employeeNumber;
}

public String getEmployeeEmail() {
	return employeeEmail;
}

public void setEmployeeEmail(String employeeEmail) {
	this.employeeEmail = employeeEmail;
}

public String getDepartmentName() {
	return departmentName;
}

public void setDepartmentName(String departmentName) {
	this.departmentName = departmentName;
}
public String getMajor() {
	return major;
}
public void setMajor(String major) {
	this.major = major;
}
public String getLoginPassword() {
	return loginPassword;
}
public void setLoginPassword(String loginPassword) {
	this.loginPassword = loginPassword;
}
public String getDepartmentId() {
	return departmentId;
}
public void setDepartmentId(String departmentId) {
	this.departmentId = departmentId;
}

public String getProjectId() {
	return projectId;
}

public void setProjectId(String projectId) {
	this.projectId = projectId;
}

public IRoleService getRoleService() {
	return roleService;
}

public void setRoleService(IRoleService roleService) {
	this.roleService = roleService;
}

}
