package org.sjtu.p615.dao;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.sjtu.p615.entity.DocLibrary;

import java.util.List;

/**
 * Created by Feiyu on 2015/5/17.
 */
public class DocLibraryDao implements IDocLibraryDao {

    private SessionFactory sessionFactory;
    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public boolean add(DocLibrary doc) {
        Session session=sessionFactory.openSession();
        Transaction tx=session.beginTransaction();

        session.save(doc);

        tx.commit();
        session.close();
        return true;
    }

    @Override
    public boolean del(String UUID) {
        boolean isSuccess=false;
        Session session=sessionFactory.openSession();
        Transaction tx=session.beginTransaction();

        String hql="from DocLibrary where DeleteMark=0 and UUID='"+UUID+"'";
        Query q=session.createQuery(hql);
        DocLibrary doc=(DocLibrary)q.uniqueResult();
        if(doc!=null){
            doc.setDeleteMark(true);
            session.update(doc);
            isSuccess=true;
            tx.commit();
        }
        else
            isSuccess=false;
        session.close();
        return isSuccess;
    }

    @Override
    public boolean set(DocLibrary doc) {
        Session session=sessionFactory.openSession();
        Transaction tx=session.beginTransaction();

        session.update(doc);

        tx.commit();
        session.close();
        return true;
    }

    @Override
    public List<DocLibrary> getAll(String projectId) {
        boolean isSuccess=false;
        Session session=sessionFactory.openSession();
        Transaction tx=session.beginTransaction();

        String hql = "from DocLibrary where DeleteMark=0 and ProjectId='" + projectId + "'";
        Query q=session.createQuery(hql);
        List<DocLibrary> doc=q.list();

        return doc;
    }

    @Override
    public DocLibrary get(String uuid) {

        Session session=sessionFactory.openSession();
        Transaction tx=session.beginTransaction();

        String hql="from DocLibrary where DeleteMark=0 and UUID='"+uuid+"'";
        Query q=session.createQuery(hql);
        DocLibrary doc=(DocLibrary)q.uniqueResult();

        session.close();

        return doc;
    }
}
