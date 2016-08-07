package org.sjtu.p615.dao;

import java.util.ArrayList;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.FracasMetadata;

public class FracasMetadataDao implements IFracasMetadataDao {

	private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public void save(FracasMetadata fracasMetadata) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		session.saveOrUpdate(fracasMetadata);
		tx.commit();
		session.close();
	}

	@Override
	public ArrayList<FracasMetadata> getOneSelectionList(String metadataName) {
		// TODO Auto-generated method stub
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		String hql = "from FracasMetadata where metadataName = :queryCondition and deleteMark = 0";
		Query q = session.createQuery(hql);
		q.setString("queryCondition", metadataName);
		System.out.println(hql);
		ArrayList<FracasMetadata> metadataSelections = (ArrayList<FracasMetadata>) q.list();
		tx.commit();
		session.close();
		return metadataSelections;
	}
	
	@Override
	public ArrayList<FracasMetadata> getAllMetadata(){
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		String hql = "from FracasMetadata";
		Query q = session.createQuery(hql);
		System.out.println(hql);
		ArrayList<FracasMetadata> metadataSelections = (ArrayList<FracasMetadata>) q.list();
		tx.commit();
		session.close();
		return metadataSelections;
	}
	
	@Override
	public ArrayList<String> getAllMetadataName(){
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		//String hql = "select DISTINCT metadataName from FracasMetadata";
		String hql = "select value from FracasMetadata where metadataName = 'metadataName'";
		Query q = session.createQuery(hql);
		System.out.println(hql);
		ArrayList<String> metadataNames = (ArrayList<String>) q.list();
		tx.commit();
		session.close();
		return metadataNames;
	}
	
	@Override
	public void deleteAllMetadata(){
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		//String hql = "select DISTINCT metadataName from FracasMetadata";
		String hql = "delete from FracasMetadata where metadataName != 'metadataName' ";
		Query q = session.createQuery(hql);
		System.out.println(hql);
		q.executeUpdate();
		tx.commit();
		session.close();
	}

}
