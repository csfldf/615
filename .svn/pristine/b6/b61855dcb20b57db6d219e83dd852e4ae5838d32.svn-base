package org.sjtu.p615.fracas.service;

import java.util.ArrayList;

import org.sjtu.p615.entity.FailureAnalysisReport;
import org.sjtu.p615.dao.IFailureAnalysisReportDao;;

public class FailureAnalysisReportService implements IFailureAnalysisReportService{
	
	private IFailureAnalysisReportDao  failureAnalysisReportDao;

	@Override
	public void add(FailureAnalysisReport failureAnalysisReport) {
		// TODO Auto-generated method stub
		failureAnalysisReportDao.add(failureAnalysisReport);
	}

	@Override
	public ArrayList<FailureAnalysisReport> getFailureAnalysisReportsByAttr(
			int start, int count, String attrs) {
		// TODO Auto-generated method stub
		return failureAnalysisReportDao.getFailureAnalysisReportsByAttr(start, count, attrs);
	}

	public IFailureAnalysisReportDao getFailureAnalysisReportDao() {
		return failureAnalysisReportDao;
	}

	public void setFailureAnalysisReportDao(IFailureAnalysisReportDao failureAnalysisReportDao) {
		this.failureAnalysisReportDao = failureAnalysisReportDao;
	}


}
