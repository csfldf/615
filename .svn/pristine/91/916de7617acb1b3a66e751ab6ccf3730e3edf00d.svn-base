package org.sjtu.p615.fracas.service;

import java.util.List;
import java.util.Map;

import org.sjtu.p615.entity.FailureReport;
import org.sjtu.p615.entity.SelectionObject;

public interface IFailureReportService {
	public void addFailureReport(FailureReport failureReport);
	public FailureReport getFailureReport(String queryCondition);
	public List<FailureReport> getFailureReportsByAttr(int start, int count, String attrs);
	public List<FailureReport> getFailureReportsByProject(String project);
	public SelectionObject getSelectionOptions();
	public List<FailureReport> queryFailureReport(Map<String, String> queryMap, int offset, int count);
}
