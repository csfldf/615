package org.sjtu.p615.dao;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.FailureDescriptionAttachments;

public class FailureDescriptionAttachmentsDao implements IFailureDescriptionAttachmentsDao{

	private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	@Override
	public void add(FailureDescriptionAttachments descriptionAttachments) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		session.save(descriptionAttachments);
		tx.commit();
		session.close();
	}

	@Override
	public FailureDescriptionAttachments get(String descriptionAttachs) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		FailureDescriptionAttachments failureBasicInfo = (FailureDescriptionAttachments) session.get(FailureDescriptionAttachments.class,
				descriptionAttachs);
		tx.commit();
		session.close();
		return failureBasicInfo;
	}
}
