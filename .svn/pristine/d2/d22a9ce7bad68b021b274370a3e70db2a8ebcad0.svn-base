package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.dao.EmployeeDao;
import org.sjtu.p615.dao.GroupDao;
import org.sjtu.p615.dao.IEmployeeDao;
import org.sjtu.p615.dao.IGroupDao;
import org.sjtu.p615.dao.IPlanDao;
import org.sjtu.p615.dao.IProjectDao;
import org.sjtu.p615.dao.IRoleDao;
import org.sjtu.p615.dao.IRoleInfoDao;
import org.sjtu.p615.dao.ProjectDao;
import org.sjtu.p615.dao.RoleDao;
import org.sjtu.p615.dao.RoleInfoDao;
import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Role;

public class RoleService implements IRoleService{
	private IRoleDao roleDao;
	private IEmployeeDao empDao;
	private IRoleInfoDao riDao;
	private IGroupDao grpDao;
	private IProjectDao proDao;
	private IPlanDao planDao;
	@Override
	public List<Role> getRoleList(String employeeId) {
		// TODO Auto-generated method stub
		return roleDao.getRoleByEmployeeId(employeeId);
	}
	@Override
	public String getEmployeeId(int roleKey) {
		// TODO Auto-generated method stub
		return roleDao.getEmployeeId(roleKey);
	}
	
	@Override
	public List<Role> getRoleListByProject(String projectId) {
		// TODO Auto-generated method stub
		return roleDao.getRoleByProject(projectId);
	}
	
	@Override
	public Role getOneRole(int roleKey) {
		// TODO Auto-generated method stub
		return this.roleDao.getOneRole(roleKey);
	}
	public IRoleDao getRoleDao() {
		return roleDao;
	}
	public void setRoleDao(IRoleDao roleDao) {
		this.roleDao = roleDao;
	}
	@Override
	public void saveRole(Role role) {
		// TODO Auto-generated method stub
		
		role.setEmployeeName(empDao.getone(role.getEmployeeId()).getEmployeeName());
		role.setRoleName(riDao.get(role.getRoleId()).getRoleName());
		if(role.getGroupId()!=null)
			role.setGroupName(grpDao.getGroup(role.getGroupId()).getGroupName());
		role.setProjectName(proDao.getOne(role.getProjectId()).getProjectName());
		roleDao.saveRole(role);
	}
	@Override
	public List<Role> getRoleListByGroup(int groupId) {
		// TODO Auto-generated method stub
		
		return roleDao.getByGroup(groupId);
	}
	@Override
	public void addRoles(List<Role> roles) {
		// TODO Auto-generated method stub
		roleDao.addRoles(roles);
	}
	@Override
	public void deleteOneRole(int roleKey) {
		// TODO Auto-generated method stub
		roleDao.deleteOneRole(roleKey);
	}
	@Override
	public List<Role> getByEmploeeIdProjectName(String employeeId, String projectName) {
		// TODO Auto-generated method stub
		return roleDao.getOneRole(employeeId,projectName);
	}
	@Override
	public List<Role> getRoleByRoleId(int roleId) {
		// TODO Auto-generated method stub
		List<Role> res = roleDao.getByRoleId(roleId);
		for(Role tmp:res){
			tmp.setTaskCount(planDao.getplancount(tmp.getEmployeeId()));
		}
		return res;
	}
	@Override
	public void addOneRole(Role role) {
		// TODO Auto-generated method stub
		role.setEmployeeName(empDao.getone(role.getEmployeeId()).getEmployeeName());
		roleDao.saveRole(role);
	}
	@Override
	public List<String> getEmpIDsByPRJ(String prjId) {
		// TODO Auto-generated method stub
		return roleDao.getEmpsByPrj(prjId);
	}
	public IEmployeeDao getEmpDao() {
		return empDao;
	}
	public void setEmpDao(IEmployeeDao empDao) {
		this.empDao = empDao;
	}
	public IRoleInfoDao getRiDao() {
		return riDao;
	}
	public void setRiDao(IRoleInfoDao riDao) {
		this.riDao = riDao;
	}
	public IGroupDao getGrpDao() {
		return grpDao;
	}
	public void setGrpDao(IGroupDao grpDao) {
		this.grpDao = grpDao;
	}
	public IProjectDao getProDao() {
		return proDao;
	}
	public void setProDao(IProjectDao proDao) {
		this.proDao = proDao;
	}
	public IPlanDao getPlanDao() {
		return planDao;
	}
	public void setPlanDao(IPlanDao planDao) {
		this.planDao = planDao;
	}



	
}
