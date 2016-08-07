package org.sjtu.p615.dao;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;








import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.FailureReport;
import org.sjtu.p615.entity.Project;
import org.sjtu.p615.entity.SelectionObject;

public class FailureReportDao implements IFailureReportDao{

	private SessionFactory sessionFactory;
	private SelectionObject selectionObjects;
	
	@Override
	public void add(FailureReport failureReport) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		FailureReport fr = (FailureReport) session.get(FailureReport.class, failureReport.getFrNumber());	
		if (fr == null) {
			session.save(failureReport);
		}
		else {
			session.clear();
			session.update(failureReport);
		}
		//session.saveOrUpdate(failureReport);
		tx.commit();
		session.close();
	}
	
	@Override
	public void update(FailureReport failureReport) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		session.update(failureReport);
		tx.commit();
		session.close();
	}

	@Override
	public FailureReport get(String frNumber) {
		// TODO Auto-generated method stub
		
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		FailureReport failureReport = (FailureReport) session.get(FailureReport.class, frNumber);		
		tx.commit();
		session.close();
		return failureReport;
	}
	
	/**
	 * Get a list of FailureReports by conditions.
	 * 
	 * @param start head of  the list
	 * @param count the length of the list. If count is 0, get all 
	 * @param attrs conditions, should follow the format of key value key value key value
	 * @return A list of target FailureReports
	 */
	public ArrayList<FailureReport> getFailureReportsByAttr(int start, int count, String attrs) {
		ArrayList<FailureReport> selections;
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		String hql = "from FailureReport where ";
		hql += attrs;
		/*for (String key : attrs.keySet()) {
			String[] vals = attrs.get(key);
			hql += "(";
			for (String val : vals) {
				hql += key + "=" + "'" + val + "'" + " or ";
			}
			hql = hql.substring(0, hql.length() - 4);
			hql += ") and ";
		}
		hql = hql.substring(0, hql.length() - 5);*/
		
		System.out.println(hql);
		Query q = session.createQuery(hql);
		q.setFirstResult(start);
		if (count != 0) {
			q.setMaxResults(count);
		}
		
		try {
			List list = q.list();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		selections = (ArrayList<FailureReport>) q.list();
		tx.commit();
		session.close();
		return selections;
	}
	
	@Override
	public SelectionObject getSelectionOptions(){
		Session session = sessionFactory.openSession();
		ArrayList<String> Selections;
		
		Selections = querySelectOptions(session,"Project", "id");
		selectionObjects.setProjects(Selections);
		
		Selections = querySelectOptions(session,"FailureMode","id");
		selectionObjects.setFailureModes(Selections);
		
		Selections = querySelectOptions(session,"Environment","id");
		selectionObjects.setEnvironments(Selections);
		
		Selections = querySelectOptions(session,"Process","id");
		selectionObjects.setProcesses(Selections);
		
		Selections = querySelectOptions(session,"FailureComponent","id");
		selectionObjects.setFailureComponentModels(Selections);
		
		Selections = querySelectOptions(session,"FailureComponent","failureComponentName");
		selectionObjects.setFailureComponentNames(Selections);
		
		Selections = querySelectOptions(session,"FailureComponent","failureComponentCode");
		selectionObjects.setFailureComponentCodes(Selections);
		
		Selections = querySelectOptions(session,"FailureComponent","failureComponentSruLot");
		selectionObjects.setFailureComponentSruLots(Selections);
		
		
		
	//	Selections = querySelectOptions("FailureComponent","id");
	//	selectionObjects.setFailureModes(Selections);
		session.close();
		return selectionObjects;
	}
	
	public ArrayList<String> querySelectOptions(Session session,String table, String attr){
		ArrayList<String> Selections;
	//	Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		String hql = "select queryObject."+attr+" from "+table+" queryObject where deleteMark=0";
		System.out.println(hql);
		Query q = session.createQuery(hql);
		Selections = (ArrayList<String>) q.list();
		System.out.println(Selections.size());
		tx.commit();
		session.close();
		return Selections;
	}
	
	@Override
	public ArrayList<FailureReport> queryFailureReport(Map<String, String> queryMap, int offset, int count){
		String hql;
		ArrayList<FailureReport> failureReports = new ArrayList();
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		Query q;
		if(queryMap == null){
			hql = "from FailureReport where deleteMark = 0";
			q = session.createQuery(hql);
			
		}
		else{
			String queryAttr="";
			String queryValue="";
			for (Iterator i=queryMap.entrySet().iterator(); i.hasNext(); ) {  
				Map.Entry e = (Map.Entry) i.next();
				queryAttr = e.getKey().toString();
				queryValue ="%"+ e.getValue().toString() + "%";
				System.out.println(e.getKey() + ": " + e.getValue());  
			}  
			hql = "from FailureReport fr where fr."+ queryAttr +" like :queryCondition where deleteMark = 0";
			//hql = "from FailureReport fr where fr
			q = session.createQuery(hql);
			q.setString("queryCondition",queryValue);
			System.out.println(hql);
		}
		//hibernate��ҳ��ȡ����
		q.setFirstResult(offset);
        q.setMaxResults(count);
        failureReports = (ArrayList<FailureReport>) q.list();
		tx.commit();
		session.close();
		return failureReports;
	}
	
	public SelectionObject getSelectionObjects() {
		return selectionObjects;
	}

	public void setSelectionObjects(SelectionObject selectionObjects) {
		this.selectionObjects = selectionObjects;
	}
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
}
