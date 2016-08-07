package org.sjtu.p615.am.service;

import org.sjtu.p615.dao.*;
import org.sjtu.p615.entity.Project;

import java.util.List;

public class ProjectService implements IProjectService{
private IProjectDao projectDao;
private IEmployeeDao employeeDao;
private IGroupDao groupDao;
private IRoleDao roleDao;
private IPlanDao planDao;
@Override
public void addOneProject(Project project) {
	// TODO Auto-generated method stub
	//project.setManager(employeeDao.getone(project.getEmployeeId()).getEmployeeName());
	//Role role=new Role();
	//role.setDeleteMark(false);
	//role.setEmployeeId(project.getEmployeeId());
	//role.setRoleId(3);
	//role.setRoleName("项目经理");
	//role.setEmployeeName(employeeDao.getone(project.getEmployeeId()).getEmployeeName());
	//role.setProjectId(project.getProjectId());
	//role.setProjectName(project.getProjectName());
	//roleDao.saveRole(role);
	projectDao.add(project);
//	Plan plan=new Plan();
//	plan.setPlanStateCode(1);
//	plan.setEmployeeId(role.getEmployeeId());
//	plan.setEmployeeName(role.getEmployeeName());
//	plan.setDeleteMark(false);
//	plan.setProjectId(project.getProjectId());
//	plan.setProjectName(project.getProjectName());
//	plan.setPlanIssuedDate(project.getStartDate());
//	plan.setPlanDeadlineDate(project.getEndDate());
//	plan.setPlanCode("new");
//	plan.setLeaf(false);
//	plan.setLevel(1);
//	plan.setComplete(false);
//	plan.setAccept(false);
//	plan.setIssue(true);
//	planDao.add(plan);
}

	@Override
	public List<Project> getAllProjects() {
		// TODO Auto-generated method stub
		List<Project> projects = projectDao.getAllProjects();
		return projects;
}

@Override
public Project getOneProject(String projectId) {
	// TODO Auto-generated method stub
	return projectDao.getOne(projectId);
}

@Override
public Project getByProjectName(String projectName) {
	// TODO Auto-generated method stub
	return projectDao.getByProjectName(projectName);
}

@Override
public List<Project> getAllProject(String empId) {
	// TODO Auto-generated method stub
	List<Project> projects=projectDao.getAll(empId);
	for(Project temp:projects){
		temp.setGroups(groupDao.getByProject(temp.getProjectId()));
	}
	return projects;
}

@Override
public List<Project> getPrjsCreatedByMe(String empId) {
	// TODO Auto-generated method stub
	return projectDao.getByCreatorID(empId);
}
@Override
public void deleteOneProject(String projectId) {
	// TODO Auto-generated method stub
	projectDao.deleteOneProject(projectId);
}
public IProjectDao getProjectDao() {
	return projectDao;
}

public void setProjectDao(IProjectDao projectDao) {
	this.projectDao = projectDao;
}

public IEmployeeDao getEmployeeDao() {
	return employeeDao;
}

public void setEmployeeDao(IEmployeeDao employeeDao) {
	this.employeeDao = employeeDao;
}

public IGroupDao getGroupDao() {
	return groupDao;
}

public void setGroupDao(IGroupDao groupDao) {
	this.groupDao = groupDao;
}

public IRoleDao getRoleDao() {
	return roleDao;
}

public void setRoleDao(IRoleDao roleDao) {
	this.roleDao = roleDao;
}

public IPlanDao getPlanDao() {
	return planDao;
}

public void setPlanDao(IPlanDao planDao) {
	this.planDao = planDao;
}

@Override
public Project getByProNameAndEmployeeId(String projectName, String employeeId) {
	// TODO Auto-generated method stub
	return projectDao.getByProNameAndEmployeeId(projectName,employeeId);
}

@Override
public void add(Project project) {
	// TODO Auto-generated method stub
	//project.setManager(employeeDao.getone(project.getEmployeeId()).getEmployeeName());
	//Role role=new Role();
	//role.setDeleteMark(false);
	//role.setEmployeeId(project.getEmployeeId());
	//role.setRoleId(3);
	//role.setRoleName("项目经理");
	//role.setEmployeeName(employeeDao.getone(project.getEmployeeId()).getEmployeeName());
	//role.setProjectId(project.getProjectId());
	//role.setProjectName(project.getProjectName());
	//roleDao.saveRole(role);
	projectDao.add(project);
	
}





}
