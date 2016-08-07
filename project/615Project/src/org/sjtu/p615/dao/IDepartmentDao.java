package org.sjtu.p615.dao;

import java.util.List;

import org.sjtu.p615.entity.Department;

public interface IDepartmentDao {
public String getDepartmentName(int DepartmentId);
public void addORmodify(Department d);
public void delete(int departmentId);
public List<Department> getAll();
}
