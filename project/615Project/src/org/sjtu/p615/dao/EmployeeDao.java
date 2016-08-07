package org.sjtu.p615.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Group;
import org.sjtu.p615.entity.Plan;
import org.sjtu.p615.entity.Planoutput;
import org.sjtu.p615.entity.Role;

public class EmployeeDao implements IEmployeeDao{
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	@Override
	public void add(Employee employee) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int login(String userid,String pwd) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		//Planoutput planOutput = (Planoutput) session.get(Planoutput.class,PlanOutputCode);
		String hql = "from Employee where EmployeeNumber = '"+userid+"' and LoginPassword='"+pwd+"' and DeleteMark=0";
		Query q = session.createQuery(hql);
		Employee result = (Employee)q.uniqueResult();
		tx.commit();
		session.close();
		if(result==null)
			return 0;
		else
			return 1;

	}

	@Override
	public List<Employee> getalluser() {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Employee where DeleteMark=0";
		Query q=session.createQuery(hql);
		List<Employee> res=q.list();
		tx.commit();
		session.close();
		return res;
	}
	@Override
	public Employee getone(String employeeId) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Employee where DeleteMark=0 and EmployeeNumber='"+employeeId+"'";
		Query q=session.createQuery(hql);
		Employee res=(Employee)q.uniqueResult();
		tx.commit();
		session.close();
		return res;
	}
	@Override
	public void addOrModify(Employee emp, String type) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		if(type.equals("new")){
			emp.setLoginPassword("1234");
			session.save(emp);
		}else{
			String hql="from Employee where DeleteMark=0 and EmployeeNumber='"+emp.getEmployeeNumber()+"'";
			Query q=session.createQuery(hql);
			Employee tmp=(Employee)q.uniqueResult();
			tmp.setDepartmentId(emp.getDepartmentId());
			tmp.setDepartmentName(emp.getDepartmentName());
			tmp.setEmployeeEmail(emp.getEmployeeEmail());
			tmp.setEmployeeName(emp.getEmployeeName());
			tmp.setMajor(emp.getMajor());
			tmp.setLoginPassword(emp.getLoginPassword());
			session.merge(tmp);
		}
		tx.commit();
		session.close();
	}
	@Override
	public Employee getByEmployeeName(String employeeName) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Employee where DeleteMark=0 and EmployeeName='"+employeeName+"'";
		Query q=session.createQuery(hql);
		Employee res=(Employee)q.uniqueResult();
		tx.commit();
		session.close();
		return res;
	}
	@Override
	public void delOne(String employeeId) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Employee where DeleteMark=0 and EmployeeNumber='"+employeeId+"'";
		Query q=session.createQuery(hql);
		Employee res=(Employee)q.uniqueResult();
		res.setDeleteMark(true);
		session.merge(res);
		tx.commit();
		session.close();
	}
	@Override
	public List<Employee> getAllEmps() {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		//String hql="select e.employeeNumber,e.employeeName,e.departmentName,e.major,(select count(Distinct projectId) as prjCount from Role r where r.employeeId=e.employeeNumber and e.deleteMark=0) from Employee as e where e.deleteMark=0";
		String hql="from Employee where deleteMark=0";
		Query q=session.createQuery(hql);
		List<Employee> res=q.list();
		String tmp="";
		for(Employee emp:res){
			hql="select count(distinct projectId) as prjCount from Role where employeeId='"+emp.getEmployeeNumber()+"'";
			tmp=session.createQuery(hql).uniqueResult().toString();
			emp.setPrjCount(Integer.parseInt(tmp));
		}
		tx.commit();
		session.close();
		return res;
	}
}
