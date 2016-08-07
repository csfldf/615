package org.sjtu.p615.fracas.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.sjtu.p615.dao.IFailureReportDao;
import org.sjtu.p615.entity.FailureReport;
import org.sjtu.p615.entity.SelectionObject;

public class FailureReportService implements IFailureReportService {
	
	private IFailureReportDao failureReportDao;
	
	public IFailureReportDao getFailureReportDao() {
		return failureReportDao;
	}

	public void setFailureReportDao(IFailureReportDao failureReportDao) {
		this.failureReportDao = failureReportDao;
	}
	
	@Override
	public void addFailureReport(FailureReport failureReport) {
		// TODO Auto-generated method stub
		failureReportDao.add(failureReport);
	}

	@Override
	public FailureReport getFailureReport(String queryCondition) {
		// TODO Auto-generated method stub
		FailureReport failureReport = failureReportDao.get(queryCondition);
		return failureReport;
	}
	
	@Override
	public SelectionObject  getSelectionOptions(){
		SelectionObject selectionOptions = failureReportDao.getSelectionOptions();
		return selectionOptions;
	}

	@Override
	public List<FailureReport> getFailureReportsByProject(String project) {
		// TODO Auto-generated method stub
		return failureReportDao.getFailureReportsByAttr(0, 0, "project='" + project + "'");
	}
	
	@Override
	public List<FailureReport> queryFailureReport(Map<String, String> queryMap, int offset, int count){
		return failureReportDao.queryFailureReport(queryMap, offset, count);
	}

	@Override
	public List<FailureReport> getFailureReportsByAttr(int start, int count, String attrs) {
		// TODO Auto-generated method stub
		return failureReportDao.getFailureReportsByAttr(start, count, attrs);
	}
}
