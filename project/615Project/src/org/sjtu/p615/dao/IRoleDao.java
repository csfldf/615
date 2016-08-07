package org.sjtu.p615.dao;
import java.util.List;

import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Role;
public interface IRoleDao {
public void saveRole(Role role);
public List<Role> getRoleByEmployeeId(String EmployeeId);
public List<Role> getRoleByProject(String projectName);
public List<Role> getByRoleId(int roleId);
public String getEmployeeId(int RoleKey);
public Role getOneRole(int RoleKey);
public List<Role> getOneRole(String employeeId,String projectName);
public List<Role> getByGroup(int GroupId);
public List<Role> getByProject(int ProjectId);
public void addRoles(List<Role> roles);
public void deleteOneRole(int roleKey);
public List<String> getEmpsByPrj(String prjId);
}
