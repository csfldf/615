package org.sjtu.p615.dao;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.Project;
import org.sjtu.p615.entity.Role;

import java.util.ArrayList;
import java.util.List;

public class ProjectDao implements IProjectDao{
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public List<Project> getAllProjects() {
		// TODO Auto-generated method stub
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		String hql = "from Project where deleteMark=0";
		Query q = session.createQuery(hql);
		List<Project> project = q.list();
		session.close();
		return project;
	}

	@Override
	public void add(Project project) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		session.save(project);
		tx.commit();
		session.close();
	}

	@Override
	public Project getOne(String projectId) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Project where DeleteMark=0 and ProjectId='"+projectId+"'";
		Query q=session.createQuery(hql);
		Project project=(Project)q.uniqueResult();
		tx.commit();
		session.close();
		return project;
	}

	@Override
	public List<Project> getAll(String empId) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Project where projectId in (select distinct projectId from Role where employeeId='"+empId+"' and deleteMark=0)";
		Query q=session.createQuery(hql);
		List<Project> project=q.list();
		for(Project prj:project){
			hql="from Role where projectId='"+prj.getProjectId()+"' and roleId in (3,15,16,17)";
			q=session.createQuery(hql);
			List<Role> roles=q.list();
			for(Role r:roles){
				switch(r.getRoleId()){
					case 3:{
						if(prj.getManager()==null){
							List<Role> manager=new ArrayList<Role>();
							manager.add(r);
							prj.setManager(manager);
						}else{
							prj.getManager().add(r);
						}
					}break;
					case 15:{
						if(prj.getPrjLeader()==null){
							List<Role> tmp=new ArrayList<Role>();
							tmp.add(r);
							prj.setPrjLeader(tmp);
						}else{
							prj.getPrjLeader().add(r);
						}
					}break;
					case 16:{
						if(prj.getDepLeader()==null){
							List<Role> tmp=new ArrayList<Role>();
							tmp.add(r);
							prj.setDepLeader(tmp);
						}else{
							prj.getDepLeader().add(r);
						}
					}break;
					case 17:{
						if(prj.getInsLeader()==null){
							List<Role> tmp=new ArrayList<Role>();
							tmp.add(r);
							prj.setInsLeader(tmp);
						}else{
							prj.getInsLeader().add(r);
						}
					}break;
					default:break;
				}
			}
		}
		tx.commit();
		session.close();
		return project;
	}
	@Override
	public void deleteOneProject(String projectId) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		Project project=(Project)session.get(Project.class, projectId);
		project.setDeleteMark(true);
		tx.commit();
		session.close();
	}
	@Override
	public Project getByProjectName(String projectName) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Project where DeleteMark=0 and ProjectName='"+projectName+"'";
		Query q=session.createQuery(hql);
		Project project=(Project)q.uniqueResult();
		tx.commit();
		session.close();
		return project;
	}
	@Override
	public Project getByProNameAndEmployeeId(String projectName,
			String employeeId) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="from Project where ProjectName='"+projectName+"' and EmployeeId='"+employeeId+"'";
		Query q=session.createQuery(hql);
		Project project=(Project)q.uniqueResult();
		tx.commit();
		session.close();
		return project;
	}
	@Override
	public List<Project> getByCreatorID(String creatorID) {
		// TODO Auto-generated method stub
		Session session=this.sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql = "from Project where deleteMark=0 and creatorId='"+creatorID+"'";
		Query q=session.createQuery(hql);
		List<Project> project=q.list();
		for(Project prj:project){
			hql="from Role where projectId='"+prj.getProjectId()+"' and roleId in (3,15,16,17)";
			q=session.createQuery(hql);
			List<Role> roles=q.list();
			for(Role r:roles){
				switch(r.getRoleId()){
					case 3:{
						if(prj.getManager()==null){
							List<Role> manager=new ArrayList<Role>();
							manager.add(r);
							prj.setManager(manager);
						}else{
							prj.getManager().add(r);
						}
					}break;
					case 15:{
						if(prj.getPrjLeader()==null){
							List<Role> tmp=new ArrayList<Role>();
							tmp.add(r);
							prj.setPrjLeader(tmp);
						}else{
							prj.getPrjLeader().add(r);
						}
					}break;
					case 16:{
						if(prj.getDepLeader()==null){
							List<Role> tmp=new ArrayList<Role>();
							tmp.add(r);
							prj.setDepLeader(tmp);
						}else{
							prj.getDepLeader().add(r);
						}
					}break;
					case 17:{
						if(prj.getInsLeader()==null){
							List<Role> tmp=new ArrayList<Role>();
							tmp.add(r);
							prj.setInsLeader(tmp);
						}else{
							prj.getInsLeader().add(r);
						}
					}break;
					default:break;
				}
			}
		}
		tx.commit();
		session.close();
		return project;
	}

}
