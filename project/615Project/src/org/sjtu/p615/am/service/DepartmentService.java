package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.dao.IDepartmentDao;
import org.sjtu.p615.entity.Department;

public class DepartmentService implements IDepartmentService{
	private IDepartmentDao departmentDao;
	public IDepartmentDao getDepartmentDao() {
		return departmentDao;
	}

	public void setDepartmentDao(IDepartmentDao departmentDao) {
		this.departmentDao = departmentDao;
	}

	@Override
	public String getById(int departmentId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Department> getAll() {
		// TODO Auto-generated method stub
		return departmentDao.getAll();
	}

	@Override
	public void addORmodify(Department d) {
		// TODO Auto-generated method stub
		departmentDao.addORmodify(d);
	}

	@Override
	public void deleteOne(int id) {
		// TODO Auto-generated method stub
		departmentDao.delete(id);
	}

}
