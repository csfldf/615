package org.sjtu.p615.am.action;

import com.opensymphony.xwork2.ActionSupport;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.IProjectService;
import org.sjtu.p615.am.service.IRoleService;
import org.sjtu.p615.entity.Project;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.util.json.JsonDateProcessor;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import javax.servlet.http.HttpSession;
import java.util.List;

public class ProjectAction extends ActionSupport{
private IProjectService projectService;
private IRoleService roleService;
//private Project project;
private JSONObject jsonobj;
private JSONArray jsonary;
private String projectId;
private String projectName;
private String startDate;
private String endDate;
private String prjShortName;
private String prjType;
private int prjTypeId;
private String prjSubId;
private String contractId;
private String inBudget;
private String outBudget;
private String insLeader;
private String depLeader;
private String prjLeader;
private String manager;
private String creatorID;

	public String getAllProjectsInStatistics() {
		jsonary = new JSONArray();
		JsonConfig cfg = new JsonConfig();
		List<Project> projects = projectService.getAllProjects();
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateProcessor());
		this.setJsonary(JSONArray.fromObject(projects, cfg));
		//setResult(JSONArray.fromObject(projects,cfg).toString());
		return SUCCESS;

	}
private void save(String empId,int type){
	Role r=new Role();
	r.setDeleteMark(false);
	r.setEmployeeId(empId);
	r.setProjectId(projectId);
	r.setProjectName(projectName);
	switch(type){
	case 1:r.setRoleId(17);r.setRoleName("所领导");break;
	case 2:r.setRoleId(16);r.setRoleName("部门领导");break;
	case 3:r.setRoleId(15);r.setRoleName("项目领导");break;
	case 4:r.setRoleId(3);r.setRoleName("项目经理");break;
		default:break;
	}

	roleService.addOneRole(r);
}
public String addOneProject(){
	jsonobj=new JSONObject();
	try{
		Project project=new Project();
		project.setProjectId(projectId);
		project.setProjectName(projectName);
		project.setDeleteMark(false);
		project.setStartDate(java.sql.Date.valueOf(startDate));
		project.setEndDate(java.sql.Date.valueOf(endDate));
		project.setPrjShortName(prjShortName);
		project.setPrjSubId(prjSubId);
		project.setPrjType(prjType);
		project.setPrjTypeId(prjTypeId);
		project.setContractId(contractId);
		project.setInBudget(inBudget);
		project.setOutBudget(outBudget);
		project.setCreatorID(creatorID);
		projectService.addOneProject(project);
		String[] l=insLeader.split("##");
		for(String tmp:l){
			save(tmp,1);
		}
		l=depLeader.split("##");
		for(String tmp:l){
			save(tmp,2);
		}
		l=prjLeader.split("##");
		for(String tmp:l){
			save(tmp,3);
		}
		l=manager.split("##");
		for(String tmp:l){
			save(tmp,4);
		}
	}
	catch(Exception e){
		jsonobj.put("msg", "error");
		e.printStackTrace();
		return SUCCESS;
	}
	jsonobj.put("msg","success");
	return SUCCESS;
}
public String getOneProject(){
	jsonobj=new JSONObject();
	JsonConfig cfg = new JsonConfig();
	cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
	Project project=projectService.getOneProject(projectId);
	this.setJsonobj(JSONObject.fromObject(project,cfg));
	return SUCCESS;
}
public String getAllProject(){
	jsonary=new JSONArray();
	JsonConfig cfg = new JsonConfig();
	HttpSession session=ServletActionContext.getRequest().getSession();
	try{
		String empId=(String)session.getAttribute("employeeId");
		List<Project> projects=projectService.getAllProject(empId);
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateProcessor());
		this.setJsonary(JSONArray.fromObject(projects,cfg));
		//setResult(JSONArray.fromObject(projects,cfg).toString());
		return SUCCESS;
	}catch(Exception e){
		e.printStackTrace();
		return ERROR;
	}
}
public String getProjectsCreatedByMe(){
	jsonary=new JSONArray();
	JsonConfig cfg = new JsonConfig();
	HttpSession session=ServletActionContext.getRequest().getSession();
	try{
		String empId= (String)session.getAttribute("employeeId");
		List<Project> projects=projectService.getPrjsCreatedByMe(empId);
		cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateProcessor());
		this.setJsonary(JSONArray.fromObject(projects,cfg));
		//setResult(JSONArray.fromObject(projects,cfg).toString());
		return SUCCESS;
	}catch(Exception e){
		e.printStackTrace();
		return ERROR;
	}
}

public String deleteOneProject(){
	jsonobj=new JSONObject();
	try{
		projectService.deleteOneProject(projectId);
		jsonobj.put("msg", "success");
	}
	catch(Exception e){
		jsonobj.put("msg", "error");
		e.printStackTrace();
	}
	return SUCCESS;

}

public IRoleService getRoleService() {
	return roleService;
}
public void setRoleService(IRoleService roleService) {
	this.roleService = roleService;
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
public JSONObject getJsonobj() {
	return jsonobj;
}
public void setJsonobj(JSONObject jsonobj) {
	this.jsonobj = jsonobj;
}
public JSONArray getJsonary() {
	return jsonary;
}
public void setJsonary(JSONArray jsonary) {
	this.jsonary = jsonary;
}
public String getProjectName() {
	return projectName;
}
public void setProjectName(String projectName) {
	this.projectName = projectName;
}
public String getStartDate() {
	return startDate;
}
public void setStartDate(String startDate) {
	this.startDate = startDate;
}
public String getEndDate() {
	return endDate;
}
public void setEndDate(String endDate) {
	this.endDate = endDate;
}
public String getPrjShortName() {
	return prjShortName;
}
public void setPrjShortName(String prjShortName) {
	this.prjShortName = prjShortName;
}
public String getPrjType() {
	return prjType;
}
public void setPrjType(String prjType) {
	this.prjType = prjType;
}
public int getPrjTypeId() {
	return prjTypeId;
}
public void setPrjTypeId(int prjTypeId) {
	this.prjTypeId = prjTypeId;
}
public String getPrjSubId() {
	return prjSubId;
}
public void setPrjSubId(String prjSubId) {
	this.prjSubId = prjSubId;
}
public String getContractId() {
	return contractId;
}
public void setContractId(String contractId) {
	this.contractId = contractId;
}
public String getInBudget() {
	return inBudget;
}
public void setInBudget(String inBudget) {
	this.inBudget = inBudget;
}
public String getOutBudget() {
	return outBudget;
}
public void setOutBudget(String outBudget) {
	this.outBudget = outBudget;
}
public String getInsLeader() {
	return insLeader;
}
public void setInsLeader(String insLeader) {
	this.insLeader = insLeader;
}
public String getDepLeader() {
	return depLeader;
}
public void setDepLeader(String depLeader) {
	this.depLeader = depLeader;
}
public String getPrjLeader() {
	return prjLeader;
}
public void setPrjLeader(String prjLeader) {
	this.prjLeader = prjLeader;
}
public String getManager() {
	return manager;
}
public void setManager(String manager) {
	this.manager = manager;
}
public String getCreatorID() {
	return creatorID;
}
public void setCreatorID(String creatorID) {
	this.creatorID = creatorID;
}

}