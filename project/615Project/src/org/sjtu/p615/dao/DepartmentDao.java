package org.sjtu.p615.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.Department;
import org.sjtu.p615.entity.Employee;

public class DepartmentDao implements IDepartmentDao{
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	@Override
	public String getDepartmentName(int DepartmentId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addORmodify(Department d) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		session.saveOrUpdate(d);
		tx.commit();
		session.close();
	}

	@Override
	public void delete(int departmentId) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		Department d=(Department)session.get(Department.class, departmentId);
		if(!(d==null)){
			session.delete(d);
		}
		tx.commit();
		session.close();
	}
	@Override
	public List<Department> getAll() {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Department";
		Query q=session.createQuery(hql);
		List<Department> res=q.list();
		tx.commit();
		session.close();
		return res;
	}

}
