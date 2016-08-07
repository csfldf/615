package org.sjtu.p615.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Plan;

public class SystemDao implements ISystemDao{
	private SessionFactory sessionFactory;

	@Override
	public boolean saveUsrOpt(String employeeId, String optionType,String usrOpt) {
		// TODO Auto-generated method stub
		try{
			Session session = sessionFactory.openSession();
			Transaction tx = session.beginTransaction();
			String hql="from Employee where EmployeeNumber='"+employeeId+"'";
			Query q = session.createQuery(hql);
			List<Employee> result = q.list();
			Employee employee = result.get(0);
			switch(optionType){
				case "ActionDirListOpt":employee.setActionDirListOpt(usrOpt);break;
				case "ActionListOpt":employee.setActionListOpt(usrOpt);break;
				case "ActionWaitingListOpt":employee.setActionWaitingListOpt(usrOpt);break;
				case "PlanListOpt":employee.setPlanListOpt(usrOpt);break;
				case "TaskListOpt":employee.setTaskListOpt(usrOpt);break;
				case "PlanWaitingListOpt":employee.setPlanWaitingListOpt(usrOpt);break;
			}
			session.saveOrUpdate(employee);		
			session.flush();
			tx.commit();
			session.close();
			System.out.println("Update Employee Whose ID is "+employee.getEmployeeNumber());
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

}
