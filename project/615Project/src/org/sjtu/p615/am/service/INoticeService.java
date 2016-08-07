package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.entity.Notice;

public interface INoticeService {
public int addOrUpdate(Notice notice);
public void publish(int id);
public void recall(int id);
public List<Notice> get(String empId);
public Notice getone(int id);
}
