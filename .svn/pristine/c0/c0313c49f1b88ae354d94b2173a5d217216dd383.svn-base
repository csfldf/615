package org.sjtu.p615.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.DocLibrary;
import org.sjtu.p615.entity.Message;
import org.sjtu.p615.entity.Notice;

public class NoticeDao implements INoticeDao{
	private SessionFactory sessionFactory;
    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
	@Override
	public List<Notice> getByEmp(String empId) {
		// TODO Auto-generated method stub
		
        Session session=sessionFactory.openSession();
        Transaction tx=session.beginTransaction();
        String hql="from Notice where prjId in (select distinct r.projectId from Role r where r.employeeId='"+empId+"' and r.deleteMark=0)";
        Query q=session.createQuery(hql);
        List<Notice> res=q.list();
        tx.commit();
        session.close();
		return res;
	}

	@Override
	public int addOrUpdate(Notice notice) {
		// TODO Auto-generated method stub
        Session session=sessionFactory.openSession();
        Transaction tx=session.beginTransaction();
        session.saveOrUpdate(notice);
        int x=notice.getId();
        tx.commit();
        session.close();
        return x;
	}

	@Override
	public void publish(int id) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
        Transaction tx=session.beginTransaction();
        Notice notice=(Notice)session.get(Notice.class, id);
        notice.setState(1);
        session.saveOrUpdate(notice);
        tx.commit();
        session.close();
		
	}

	@Override
	public List<String> recall(int id) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
        Transaction tx=session.beginTransaction();
        Notice notice=(Notice)session.get(Notice.class, id);
        notice.setState(0);
        session.saveOrUpdate(notice);
        String hql="select m.messageId from Message m where m.noticeId='"+id+"'";
        Query q=session.createQuery(hql);
        List<Integer> ints=q.list();
        List<String> res=new ArrayList<String>();
        for(Integer i:ints){
        	res.add(i.toString());
        }
        tx.commit();
        session.close();
        return res;
	}
	@Override
	public Notice getone(int id) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.openSession();
        Transaction tx=session.beginTransaction();
        Notice notice=(Notice)session.get(Notice.class, id);
        tx.commit();
        session.close();
		return notice;
	}

}
