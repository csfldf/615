package org.sjtu.p615.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.entity.Script;

public class ScriptDao implements IScriptDao{
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public ScriptDao(){
//		Configuration cfg=new Configuration().configure("1.4hibernate.cfg.xml");
//		ServiceRegistry  sr = new ServiceRegistryBuilder().applySettings(cfg.getProperties()).buildServiceRegistry();    
//	    this.sessionFactory = cfg.buildSessionFactory(sr);
	}
	@Override
	public List<Script> getList(String employeeId) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Script where EmployeeId='"+employeeId+"'";
		Query q=session.createQuery(hql);
		List<Script> res=q.list();
		System.out.println(hql);
		tx.commit();
		session.close();
		return res;
	}
	@Override
	public List<Script> getList(String employeeId,String scriptTye) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Script where EmployeeId='"+employeeId+"'"+" and ScriptType='"+scriptTye+"'";
		Query q=session.createQuery(hql);
		List<Script> res=q.list();
		System.out.println(hql);
		tx.commit();
		session.close();
		return res;
	}
	@Override
	public void addScript(Script scp) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		session.save(scp);
		tx.commit();
		session.close();
	}
	@Override
	public Script getOneScript(int scriptKey) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Script where ScriptKey='"+scriptKey+"'";
		Query q=session.createQuery(hql);
		Script res=(Script)q.uniqueResult();
		System.out.println(hql);
		tx.commit();
		session.close();
		return res;
	}
	@Override
	public void deleteOneScript(int scriptKey) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		Script s=(Script)session.get(Script.class, scriptKey);
		session.delete(s);
		tx.commit();
		session.close();
	}

}
