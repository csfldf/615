package org.sjtu.p615.am.service;

import org.sjtu.p615.entity.DocLibrary;

import java.util.List;

/**
 * Created by Feiyu on 2015/5/17.
 */
public interface IDocLibraryService {
    boolean add(DocLibrary doc);
    boolean del(String UUID);
    boolean set(DocLibrary doc);

    List<DocLibrary> getAll(String projectID);
    DocLibrary get(String UUID);
}
