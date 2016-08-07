package org.sjtu.p615.dao;

import java.util.List;

import org.sjtu.p615.entity.Notice;

public interface INoticeDao {
public List<Notice> getByEmp(String empId);
public Notice getone(int id);
public int addOrUpdate(Notice notice);
public void publish(int id);
public List<String> recall(int id);
}
