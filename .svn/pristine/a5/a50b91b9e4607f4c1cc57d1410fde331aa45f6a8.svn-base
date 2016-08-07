package org.sjtu.p615.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.sjtu.p615.entity.Group;
import org.sjtu.p615.entity.Role;

public class GroupDao implements IGroupDao{
	
	public GroupDao() {
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
	public List<Group> getAllGroup(){
		Session session=this.sessionFactory.openSession();
		String hql="from Group where DeleteMark=0";
		Query q=session.createQuery(hql);
		List<Group> result=q.list();
		session.close();
		if(result.isEmpty()==false)
			return result;
		else 
			return null;
	}
	@Override
	public Group getGroup(int GroupId) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Group where DeleteMark=0 and GroupId='"+GroupId+"'";
		Query q=session.createQuery(hql);
		Group grp=(Group)q.uniqueResult();
		tx.commit();
		session.close();
		return grp;
	}
	@Override
	public int addOneGroup(Group grp) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		session.save(grp);
		String hql="from Group where DeleteMark=0 and GroupId='"+grp.getGroupId()+"'";
		Query q=session.createQuery(hql);
		Group res=(Group)q.uniqueResult();
		tx.commit();
		session.close();
		return res.getGroupId();
	}
	@Override
	public void deleteOneGroup(int GroupId) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Group where GroupId='"+GroupId+"' and DeleteMark=0";
		Query q=session.createQuery(hql);
		Group g=(Group)q.uniqueResult();
		g.setDeleteMark(true);
		session.merge(g);
		tx.commit();
		session.close();
	}
	@Override
	public List<Group> getByProject(String projectId) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Group where ProjectId='"+projectId+"' and DeleteMark=0 and level=1";
		Query q=session.createQuery(hql);
		List<Group> grps=q.list();
		for(Group tmp:grps){
			hql="from Group where ParentId='"+tmp.getGroupId()+"' and DeleteMark=0";
			q=session.createQuery(hql);
			tmp.setSubGroups(q.list());
		}
		tx.commit();
		session.close();
		return grps;
	}
}
