package org.sjtu.p615.am.service;

import org.sjtu.p615.dao.DocLibraryDao;
import org.sjtu.p615.entity.DocLibrary;

import java.util.List;

/**
 * Created by Feiyu on 2015/5/17.
 */
public class DocLibraryService implements IDocLibraryService {



    private DocLibraryDao docLibraryDao;

    @Override
    public boolean add(DocLibrary doc) {
        return docLibraryDao.add(doc);
    }

    @Override
    public boolean del(String UUID) {
        return docLibraryDao.del(UUID);
    }

    @Override
    public boolean set(DocLibrary doc) {
        return docLibraryDao.set(doc);
    }

    @Override
    public List<DocLibrary> getAll(String projectId) {
        List<DocLibrary> docs = docLibraryDao.getAll(projectId);
        return docs;
    }

    @Override
    public DocLibrary get(String UUID) {
        DocLibrary doc=docLibraryDao.get(UUID);      
        return doc;
    }



    public DocLibraryDao getDocLibraryDao() {
        return docLibraryDao;
    }

    public void setDocLibraryDao(DocLibraryDao docLibraryDao) {
        this.docLibraryDao = docLibraryDao;
    }
}
