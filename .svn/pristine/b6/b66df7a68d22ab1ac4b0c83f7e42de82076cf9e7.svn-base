package org.sjtu.p615.dao;

import java.util.List;

import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Role;


public interface IEmployeeDao {
	public void add(Employee employee);
	public int login(String userid,String pwd);
	public List<Employee> getalluser();
	public List<Employee> getAllEmps();
	//public List<Role> getRoleList(String employeeId);
	public Employee getone(String employeeId);
	public Employee getByEmployeeName(String employeeName);
	public void addOrModify(Employee emp,String type);
	public void delOne(String employeeId);
}
