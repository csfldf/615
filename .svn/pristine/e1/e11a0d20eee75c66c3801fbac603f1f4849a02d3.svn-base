package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.dao.EmployeeDao;
import org.sjtu.p615.dao.IEmployeeDao;
import org.sjtu.p615.dao.IPlanDao;
import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Role;

public class EmployeeService implements IEmployeeService{
private IEmployeeDao employeeDao;
private IPlanDao planDao;
	@Override
	public int getEmployeeInfo(String userid,String pwd) {
		// TODO Auto-generated method stub
		int  res=employeeDao.login(userid,pwd);
		return res;
	}

	@Override
	public List<Employee> getalluser() {
		// TODO Auto-generated method stub
		List<Employee> res=employeeDao.getalluser();
		for(Employee tmp:res){
			tmp.setTaskCount(planDao.getplancount(tmp.getEmployeeNumber()));
		}
		return res;
	}

//	@Override
//	public List<Role> getroleList(String employeeId) {
//		// TODO Auto-generated method stub
//		IEmployeeDao employeedao=new EmployeeDao();
//		return employeedao.getRoleList(employeeId);
//	}	
	@Override
	public Employee getone(String employeeId) {
		// TODO Auto-generated method stub
		return employeeDao.getone(employeeId);
	}

	public IEmployeeDao getEmployeeDao() {
		return employeeDao;
	}

	public void setEmployeeDao(IEmployeeDao employeeDao) {
		this.employeeDao = employeeDao;
	}

	public IPlanDao getPlanDao() {
		return planDao;
	}

	public void setPlanDao(IPlanDao planDao) {
		this.planDao = planDao;
	}

	@Override
	public Employee getByEmployeeName(String employeeName) {
		// TODO Auto-generated method stub
		return employeeDao.getByEmployeeName(employeeName);
	}

	@Override
	public void addOrModify(Employee emp, String type) {
		// TODO Auto-generated method stub
		employeeDao.addOrModify(emp, type);
		
	}

	@Override
	public void delOne(String employeeId) {
		// TODO Auto-generated method stub
		employeeDao.delOne(employeeId);
	}

	@Override
	public List<Employee> getAllEmps() {
		// TODO Auto-generated method stub
		return employeeDao.getAllEmps();
	}

}
