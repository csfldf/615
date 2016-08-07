package org.sjtu.p615.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.FailureAnalysisReport;
import org.sjtu.p615.entity.FailureReport;

public class FailureAnalysisReportDao implements IFailureAnalysisReportDao{
	
	private SessionFactory sessionFactory;

	@Override
	public void add(FailureAnalysisReport failureAnalysisReport) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		FailureAnalysisReport fr = (FailureAnalysisReport) session.get(FailureAnalysisReport.class, failureAnalysisReport.getId());	
		if (fr == null) {
			session.save(failureAnalysisReport);
		}
		else {
			session.clear();
			session.update(failureAnalysisReport);
		}
		tx.commit();
		session.close();
	}

	@Override
	public ArrayList<FailureAnalysisReport> getFailureAnalysisReportsByAttr(
			int start, int count, String attrs) {
		// TODO Auto-generated method stub
		ArrayList<FailureAnalysisReport> selections;
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		String hql = "from FailureAnalysisReport where ";
		hql += attrs;
		
		System.out.println(hql);
		Query q = session.createQuery(hql);
		q.setFirstResult(start);
		if (count != 0) {
			q.setMaxResults(count);
		}
		
		try {
			List list = q.list();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		selections = (ArrayList<FailureAnalysisReport>) q.list();
		tx.commit();
		session.close();
		return selections;
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

}
