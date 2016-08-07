package org.sjtu.p615.dao;

import java.util.ArrayList;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.Correctiveactionreport;

public class CorrectiveActionReportDao implements ICorrectiveActionReportDao {
	private SessionFactory sessionFactory;
	
	@Override
	public void add(Correctiveactionreport correctiveActionReport) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		Correctiveactionreport car = (Correctiveactionreport) session.get(Correctiveactionreport.class, correctiveActionReport.getId());	
		if (car == null) {
			session.save(correctiveActionReport);
		}
		else {
			session.clear();
			session.update(correctiveActionReport);
		}
		//session.saveOrUpdate(failureReport);
		tx.commit();
		session.close();
	}

	@Override
	public Correctiveactionreport getOneCar(String carNumber) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		Correctiveactionreport car = (Correctiveactionreport) session.get(Correctiveactionreport.class, carNumber);		
		tx.commit();
		session.close();
		return car;
	}

	@Override
	public ArrayList<Correctiveactionreport> getAllCar() {
		// TODO Auto-generated method stub
		ArrayList<Correctiveactionreport> cars;
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		String hql = "from Correctiveactionreport";
		Query q = session.createQuery(hql);
		cars = (ArrayList<Correctiveactionreport>) q.list();
		tx.commit();
		session.close();
		return cars;
	}
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

}
