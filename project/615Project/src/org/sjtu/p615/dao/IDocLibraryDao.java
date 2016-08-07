package org.sjtu.p615.dao;

import org.sjtu.p615.entity.DocLibrary;

import java.util.List;

/**
 * Created by Feiyu on 2015/5/17.
 */
public interface IDocLibraryDao {
    boolean add(DocLibrary doc);
    boolean del(String UUID);
    boolean set(DocLibrary doc);

    List<DocLibrary> getAll(String projectId);

    DocLibrary get(String uuid);
}
