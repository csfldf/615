package org.sjtu.p615.dao;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.Action;
import org.sjtu.p615.entity.Planoutput;

import java.util.List;

public class ActionDao implements IActionDao{
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}


	@Override
	public Action getAction(String actionId){
		try{
			Session session=sessionFactory.openSession();
			Transaction tx=session.beginTransaction();
			String hql="from Action where ActionId='"+actionId+"' and DeleteMark = 0";
			Query q = session.createQuery(hql);
			List<Action> resultList = q.list();
			if(!resultList.isEmpty()){
				Action result = resultList.get(0);
//			System.out.println("Delete Plan Whose Code is "+plan.getPlanCode());
				hql = "from Planoutput where TaskCode = '"+actionId+"' and DeleteMark =0 ";
				Query query = session.createQuery(hql);
				List <Planoutput> planoutputs = query.list();
				for(Planoutput temp : planoutputs){
					String uuid=temp.getUUID();
					temp.setFileHref("./am/downloadOutput?uuid="+uuid);
					temp.setFileDelHref("./am/delOutput?planCode="+actionId+"&uuid="+uuid);
					temp.setUploadDateString(temp.getUploadDate().toString());
				}
				result.setPlanoutput(planoutputs);
				tx.commit();
				session.close();
				return result;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean saveAction(Action action){
		try{
			Session session=sessionFactory.openSession();
			Transaction tx=session.beginTransaction();
			session.saveOrUpdate(action);
			session.flush();
			tx.commit();
			session.close();
			return true;
//			System.out.println("Delete Plan Whose Code is "+plan.getPlanCode());
		}catch(Exception e){
			e.printStackTrace();
		}
		return  false;
	}

	@Override
	public List<Action> getUnreleasedActions(String creatorId) {
		try{
			Session session=sessionFactory.openSession();
			Transaction tx=session.beginTransaction();
			String hql="from Action where ActionAuditorId='"+creatorId+"' and ActionState=1 and DeleteMark = 0";
			Query q = session.createQuery(hql);
			List<Action> resultList = q.list();
			return resultList;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean deleteAction(String actionId){
		try{
			Session session=sessionFactory.openSession();
			Transaction tx=session.beginTransaction();
            String hql = "from Action where ActionId='" + actionId + "' and DeleteMark=0 ";
            Query q = session.createQuery(hql);
			Action result = (Action)q.uniqueResult();
			if(result != null){
				result.setDeleteMark(true);
				session.save(result);
			}
            String hql1 = "from Action where ParentActionId='" + actionId + "' and DeleteMark=0 ";
            Query q1 = session.createQuery(hql1);
            List<Action> result1 = q1.list();
            if (result1 != null) {
                for (Action son : result1) {
                    deleteAction(son.getActionId());
                }
            }
            tx.commit();
			session.close();
			System.out.println("Delete Action Whose Id is "+actionId);
			return true;
		}catch(Exception e){
			e.printStackTrace();

		}
		return false;
	}


	@Override
	public List<Action> getUsrActions(String employeeId) {
		// TODO Auto-generated method stub
		try{
			Session session=sessionFactory.openSession();
			Transaction tx=session.beginTransaction();
			String hql="from Action where (ActionControllerId='"+employeeId+
					"' or ActionAuditorId ='" + employeeId +
					"' or ActionApproverId='" + employeeId +
					"') and DeleteMark = 0";
			Query q = session.createQuery(hql);
			List<Action> result = q.list();
			tx.commit();
			session.close();
//			System.out.println("Delete Plan Whose Code is "+plan.getPlanCode());
			return result;			
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}


	@Override
	public List<Action> getUsrActionProjects(String employeeId) {
		// TODO Auto-generated method stub
		try{
			Session session=sessionFactory.openSession();
			Transaction tx=session.beginTransaction();
			String hql="from Action where (ActionControllerId='"+employeeId+
					"' or ActionApproverId='"+employeeId+
					"' or ActionAuditorId='"+employeeId+
					"') and DeleteMark = 0";
			Query q = session.createQuery(hql);
			List<Action> result = q.list();
			tx.commit();
			session.close();
//			System.out.println("Delete Plan Whose Code is "+plan.getPlanCode());
			return result;			
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Action> getProjectActions(String projectId) {
		// TODO Auto-generated method stub
		try{
			Session session=sessionFactory.openSession();
			Transaction tx=session.beginTransaction();
			String hql="from Action where ProjectId='"+projectId+"' and DeleteMark = 0";
			Query q = session.createQuery(hql);
			List<Action> result = q.list();
			tx.commit();
			session.close();
//			System.out.println("Delete Plan Whose Code is "+plan.getPlanCode());
			return result;			
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

}
