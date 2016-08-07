package org.sjtu.p615.am.service;

import org.sjtu.p615.dao.IGroupDao;
import org.sjtu.p615.dao.IProjectDao;
import org.sjtu.p615.dao.IRoleDao;
import org.sjtu.p615.entity.Group;
import org.sjtu.p615.entity.Project;
import org.sjtu.p615.entity.Role;

import java.util.List;

public class GroupService implements IGroupService{
private IGroupDao groupDao;
private IRoleDao roleDao;
private IProjectDao projectDao;
	@Override
	public List<Group> getAllGroup(){
		List<Group> list=groupDao.getAllGroup();
		if (!list.isEmpty()) {
			for(Group group : list){
				if(group.getProjectId()!=null){
					Project project=projectDao.getOne(group.getProjectId());
					if(project!=null)
						group.setProjectName(project.getProjectName());
				}
			}
		}
		return list;
	}
	@Override
	public Group getById(int groupId) {
		// TODO Auto-generated method stub
		return groupDao.getGroup(groupId);
	}
	public IGroupDao getGroupDao() {
		return groupDao;
	}
	public void setGroupDao(IGroupDao groupDao) {
		this.groupDao = groupDao;
	}
	@Override
	public int addOne(Group grp) {
		// TODO Auto-generated method stub
		grp.setDeleteMark(false);
		//grp.setLevel(1);
		int res= groupDao.addOneGroup(grp);
		Role role=new Role();
		role.setGroupName(grp.getGroupName());
		role.setEmployeeId(grp.getGroupLeaderId());
		role.setGroupId(res);
		role.setProjectName(grp.getProjectName());
		role.setProjectId(grp.getProjectId());
		role.setEmployeeName(grp.getGroupLeaderName());
		role.setRoleId(2);
		role.setDeleteMark(false);
		role.setRoleName("组长");
		roleDao.saveRole(role);
		return res;
	}
	@Override
	public void deleteOne(int groupId) {
		// TODO Auto-generated method stub
		groupDao.deleteOneGroup(groupId);
	}
	@Override
	public List<Group> getByProject(String projectId) {
		// TODO Auto-generated method stub
		return groupDao.getByProject(projectId);
	}
	public IRoleDao getRoleDao() {
		return roleDao;
	}
	public IProjectDao getProjectDao() {
		return projectDao;
	}
	public void setProjectDao(IProjectDao projectDao) {
		this.projectDao = projectDao;
	}
	public void setRoleDao(IRoleDao roleDao) {
		this.roleDao = roleDao;
	}
	@Override
	public Group getByEmployeeIdProjectName(String employeeId,
			String projectName) {
		// TODO Auto-generated method stub
		return null;
	}

}
