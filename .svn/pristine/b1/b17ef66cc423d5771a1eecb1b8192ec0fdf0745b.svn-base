package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.dao.INoticeDao;
import org.sjtu.p615.dao.IPlanDao;
import org.sjtu.p615.dao.NoticeDao;
import org.sjtu.p615.entity.Notice;

public class NoticeService implements INoticeService{
	private INoticeDao noticeDao;
	private IPlanDao planDao;
	@Override
	public int addOrUpdate(Notice notice) {
		// TODO Auto-generated method stub
		
		return noticeDao.addOrUpdate(notice);
	}

	@Override
	public void publish(int id) {
		// TODO Auto-generated method stub
		noticeDao.publish(id);
	}

	@Override
	public void recall(int id) {
		// TODO Auto-generated method stub
		List<String> res=noticeDao.recall(id);
		planDao.delMessage(res);
	}

	@Override
	public List<Notice> get(String empId) {
		// TODO Auto-generated method stub
		return noticeDao.getByEmp(empId);
	}

	public INoticeDao getNoticeDao() {
		return noticeDao;
	}

	public void setNoticeDao(INoticeDao noticeDao) {
		this.noticeDao = noticeDao;
	}

	@Override
	public Notice getone(int id) {
		// TODO Auto-generated method stub
		return noticeDao.getone(id);
	}

	public IPlanDao getPlanDao() {
		return planDao;
	}

	public void setPlanDao(IPlanDao planDao) {
		this.planDao = planDao;
	}

}
