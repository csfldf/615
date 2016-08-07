package org.sjtu.p615.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.sjtu.p615.entity.Planstate;

public class PlanStateDao implements IPlanStateDao{
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	@Override
	public List<Planstate> getstates() {
		// TODO Auto-generated method stub
		List<Planstate> res;
//		Configuration cfg=new Configuration().configure("1.4hibernate.cfg.xml");
//		ServiceRegistry  sr = new ServiceRegistryBuilder().applySettings(cfg.getProperties()).buildServiceRegistry();    
//	    this.sessionFactory = cfg.buildSessionFactory(sr);
	    Session session=this.sessionFactory.openSession();
	    Transaction tx=session.beginTransaction();
	    String hql="from Planstate";
	    Query q=session.createQuery(hql);
	    res=q.list();
	    tx.commit();
	    session.close();
		return res;
	}
	@Override
	public String getStateName(int planStateCode) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
