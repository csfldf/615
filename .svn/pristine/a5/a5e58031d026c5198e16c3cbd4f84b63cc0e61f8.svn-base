package org.sjtu.p615.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.FailureReportMetadata;
import org.sjtu.p615.entity.Group;

public class FailureReportMetadataDao implements IFailureReportMetadataDao {
	private SessionFactory sessionFactory;

	@Override
	public FailureReportMetadata getOne(String project, String type) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from FailureReportMetadata where projectName = '" + project + "' and type='"+ type +"'";
		Query q=session.createQuery(hql);
		FailureReportMetadata fMetadata = (FailureReportMetadata)q.uniqueResult();
		tx.commit();
		session.close();
		return fMetadata;
	}

	@Override
	public void save(FailureReportMetadata failureReportMetadata) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		session.saveOrUpdate(failureReportMetadata);
		tx.commit();
		session.close();
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public List<FailureReportMetadata> getByProject(String project) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from FailureReportMetadata where projectName = '" + project + "'";
		Query q=session.createQuery(hql);
		List<FailureReportMetadata> fMetadatas = (List<FailureReportMetadata>)q.list();
		tx.commit();
		session.close();
		return fMetadatas;
	}

}
