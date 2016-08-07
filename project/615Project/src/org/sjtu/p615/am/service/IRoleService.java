package org.sjtu.p615.am.service;
import java.util.List;

import org.sjtu.p615.entity.Role;
public interface IRoleService {
public void saveRole(Role role);
public List<Role> getRoleList(String employeeId);
public List<Role> getRoleListByProject(String projectId);
public List<Role> getRoleListByGroup(int groupId);
public List<Role> getRoleByRoleId(int roleId);
public String getEmployeeId(int roleKey);
public Role getOneRole(int roleKey);
public List<Role> getByEmploeeIdProjectName(String employeeId,String projectName);
public void addRoles(List<Role> roles);
public void deleteOneRole(int roleKey);
public void addOneRole(Role role);
public List<String> getEmpIDsByPRJ(String prjId);
}
