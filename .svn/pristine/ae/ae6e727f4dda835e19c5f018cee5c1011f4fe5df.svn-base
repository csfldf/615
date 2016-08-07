package org.sjtu.p615.dao;

import java.util.ArrayList;
import java.util.Map;

import org.sjtu.p615.entity.FailureReport;
import org.sjtu.p615.entity.SelectionObject;

public interface IFailureReportDao {
	public void add(FailureReport failureReport);
	public void update(FailureReport failureReport);
	public FailureReport get(String frNumber);
	public ArrayList<FailureReport> getFailureReportsByAttr(int start, int count, String attrs);
	public SelectionObject getSelectionOptions();
	public ArrayList<FailureReport> queryFailureReport(Map<String, String> queryMap, int offset, int count);
}
