package org.sjtu.p615.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.sjtu.p615.entity.Roleinfo;

public class RoleInfoDao implements IRoleInfoDao{
	
	public RoleInfoDao() {
//		Configuration cfg=new Configuration().configure("1.4hibernate.cfg.xml");
//		ServiceRegistry  sr = new ServiceRegistryBuilder().applySettings(cfg.getProperties()).buildServiceRegistry();    
//	    this.sessionFactory = cfg.buildSessionFactory(sr);
		// TODO Auto-generated constructor stub
	}
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	@Override
	public Roleinfo get(int roleId) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Roleinfo where DeleteMark=0 and RoleId='"+roleId+"'";
		Query q=session.createQuery(hql);
		Roleinfo roleinfo=(Roleinfo)q.uniqueResult();
		tx.commit();
		session.close();
		return roleinfo;
	}
	@Override
	public void add(Roleinfo roleinfo) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		session.save(roleinfo);
		tx.commit();
		session.close();
	}
	@Override
	public List<Roleinfo> getall() {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Roleinfo where DeleteMark=0";
		Query q=session.createQuery(hql);
		List<Roleinfo> roleinfo=q.list();
		tx.commit();
		session.close();
		return roleinfo;
	}

}
