package org.sjtu.p615.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.Plan;
import org.sjtu.p615.entity.Planoutput;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;  
import org.hibernate.service.ServiceRegistryBuilder; 
public class PlanOutputDao implements IPlanOutputDao{
	private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	@Override
	public void add(Planoutput planOutput) {
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		session.save(planOutput);
		tx.commit();
		session.close();
	}

	@Override
	public List<Planoutput> get(String PlanCode) {
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		//Planoutput planOutput = (Planoutput) session.get(Planoutput.class,PlanOutputCode);
		String hql = "from Planoutput where TaskCode = '"+PlanCode+"' and DeleteMark=0";
		Query q = session.createQuery(hql);
		List<Planoutput> result = q.list();
		tx.commit();
		session.close();
		return result;
	}

	@Override
	public int delete(int planoutputid) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		try{
		Planoutput out=(Planoutput)session.get(Planoutput.class, planoutputid);
		out.setDeleteMark(true);
		session.merge(out);
		tx.commit();
		session.close();
		return 1;
		}
		catch(Exception e){
			session.close();
			return 0;
		}

	}

	@Override
	public List<Planoutput> getByUUID(String UUID) {
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		//Planoutput planOutput = (Planoutput) session.get(Planoutput.class,PlanOutputCode);
		String hql = "from Planoutput where UUID = '"+UUID+"' and DeleteMark=0";
		Query q = session.createQuery(hql);
		List<Planoutput> result = q.list();
		tx.commit();
		session.close();
		return result;
	}

}
