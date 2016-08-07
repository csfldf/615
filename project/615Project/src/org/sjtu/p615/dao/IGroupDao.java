package org.sjtu.p615.dao;

import java.util.List;

import org.sjtu.p615.entity.Group;

public interface IGroupDao {
public Group getGroup(int GroupId);
public int addOneGroup(Group grp);
public void deleteOneGroup(int GroupId);
public List<Group> getByProject(String projectId);
List<Group> getAllGroup();
}
