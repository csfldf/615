package org.sjtu.p615.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.Amprivilege;
import org.sjtu.p615.entity.Role;

public class AmPrivilegeDao implements IAmPrivilegeDao{
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	@Override
	public Amprivilege getOneByRoleId(int roleId) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		//Amprivilege res=(Amprivilege)session.get(Amprivilege.class, roleId);
		String hql="from Amprivilege where deleteMark=0 and roleId='"+roleId+"'";
		Query q=session.createQuery(hql);
		Amprivilege res=(Amprivilege)q.uniqueResult();
		tx.commit();
		session.close();
		return res;
	}

	@Override
	public void addOne(Amprivilege one) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		session.save(one);
		tx.commit();
		session.close();
	}

	@Override
	public void changeOne(Amprivilege one) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		session.merge(one);
		tx.commit();
		session.close();
	}
	@Override
	public void deleteOne(int roleId) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Amprivilege where deleteMark=0 and roleId='"+roleId+"'";
		Query q=session.createQuery(hql);
		Amprivilege res=(Amprivilege)q.uniqueResult();
		res.setDeleteMark(true);
		session.merge(res);
		tx.commit();
		session.close();
	}
	@Override
	public List<Amprivilege> getAll() {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		//Amprivilege res=(Amprivilege)session.get(Amprivilege.class, roleId);
		String hql="from Amprivilege where deleteMark=0";
		Query q=session.createQuery(hql);
		List<Amprivilege> res=q.list();
		tx.commit();
		session.close();
		return res;
	}
	@Override
	public List<Amprivilege> getByPrj(String empId, String prjId) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		//Amprivilege res=(Amprivilege)session.get(Amprivilege.class, roleId);
		String hql="from Amprivilege a where a.roleId in (select r.RoleId from Role r where r.EmployeeId='"+empId+"' and r.projectId='"+prjId+"' and DeleteMark=0) and DeleteMark=0";
		Query q=session.createQuery(hql);
		List<Amprivilege> res=q.list();
		tx.commit();
		session.close();
		return res;
	}
	@Override
	public int checkAuth(String empId, String prjId, String action) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String x="a."+action;
		//Amprivilege res=(Amprivilege)session.get(Amprivilege.class, roleId);
		String hql="select max("+x+") from Amprivilege a where a.roleId in (select r.RoleId from Role r where r.EmployeeId='"+empId+"' and r.projectId='"+prjId+"' and DeleteMark=0) and DeleteMark=0";
		Query q=session.createSQLQuery(hql);
		//String y=(String)q.uniqueResult();
		int res=q.uniqueResult()==null?0:(int)q.uniqueResult();
		tx.commit();
		session.close();
		System.out.println(hql);
		return res;
	}
	@Override
	public List<Amprivilege> getAmPrivilegeByEmployeeId(String empId) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		//Amprivilege res=(Amprivilege)session.get(Amprivilege.class, roleId);
		String hql="from Role where EmployeeId='"+empId+"'";
		Query q=session.createQuery(hql);
		List<Role> res=q.list();
		List<Amprivilege> resAmPrivilege=new ArrayList<Amprivilege>();
		for(Role role: res){
			hql="from Amprivilege where RoleId='"+role.getRoleId()+"'";
			q=session.createQuery(hql);
			if(q.list().size()!=0)
				resAmPrivilege.add((Amprivilege) q.list().get(0));
		}
//		Amprivilege tmpAmPrivilege = resAmPrivilege.get(0);
		tx.commit();
		session.close();
		return resAmPrivilege;
	}

}
