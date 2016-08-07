package org.sjtu.p615.fracas.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.struts2.json.JSONException;
import org.apache.struts2.json.JSONUtil;
import org.sjtu.p615.am.service.IRoleService;
import org.sjtu.p615.entity.FailureAnalysisReport;
import org.sjtu.p615.entity.FailureReport;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.fracas.service.IFailureAnalysisReportService;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

public class FailureAnalysisReportAction {
  private IFailureAnalysisReportService failureAnalysisReportService;
  private IRoleService roleService;

  private FailureAnalysisReport failureAnalysisReport;
  private String params;
  private String result;
  private String farCreateDate;

  public String saveFailureAnalysisReport() {
    JSONObject jsonObject = new JSONObject();
    System.out.println("-----------------farCreateDate: "+farCreateDate);
    try{
      SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      Date date = new Date(System.currentTimeMillis());
      if(farCreateDate != null && !farCreateDate.equals("")) {
        date = new Date(format.parse(farCreateDate).getTime());
      }
      failureAnalysisReport.setFarCreateDate(date);

      failureAnalysisReportService.add(failureAnalysisReport);
      jsonObject.put("success", true);
    }
    catch(Exception e){
      e.printStackTrace();
      jsonObject.put("msg", "error");
    }
    result = jsonObject.toString();
    return "success";

  //  failureAnalysisReportService.add(failureAnalysisReport);
  //  return "success";
  }

  public String getFailureAnalysisReportByEmployee() {
    String eid = params;
    List<Role> roles = roleService.getRoleList(eid);
    Set<String> projects = new HashSet<String>();
    for (Role role : roles) {
      projects.add(role.getProjectName());
    }

    String attrs = "";
    attrs += "(";
    for (String project : projects) {
      attrs += "project='" + project + "' or ";
    }
    attrs = attrs.substring(0, attrs.length() - 4);
    attrs += ") and status<>''";

    List<FailureAnalysisReport> failureAnalysisReports = failureAnalysisReportService.getFailureAnalysisReportsByAttr(0, 0, attrs);
    JsonConfig cfg = new JsonConfig();
    cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
    JSONArray jsonObject = JSONArray.fromObject(failureAnalysisReports, cfg);
    setResult(jsonObject.toString());
    return "success";
  }

  public String getOneFailureAnalysisReport() {
    String farNumber = params;
    String attrs = "farnumber='" + farNumber + "'";
    List<FailureAnalysisReport> failureAnalysisReports = failureAnalysisReportService.getFailureAnalysisReportsByAttr(0, 0, attrs);
    JsonConfig cfg = new JsonConfig();
    cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
    JSONObject jsonObject = JSONObject.fromObject(failureAnalysisReports.get(0), cfg);
    setResult(jsonObject.toString());
    return "success";
  }

  public String getFailureAnalysisReportDrafts() {
    String eid = params;
    String attrs = "";
    attrs += "tag='draft' and lastediter='" + eid + "'";

    List<FailureAnalysisReport> failureReports = failureAnalysisReportService.getFailureAnalysisReportsByAttr(0, 0, attrs);
    JsonConfig cfg = new JsonConfig();
    cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
    JSONArray jsonObject = JSONArray.fromObject(failureReports, cfg);
    setResult(jsonObject.toString());
    return "success";
  }
  
  public String takeFailureAnalysisReportByAttr() {
	    Map<String, String> map;
	    try {
	      map = (Map<String, String>)JSONUtil.deserialize(params);
	      String attrs = "";
	      for(String key : map.keySet()) {
	        String value = map.get(key);
	        if(key.equals("farCreateDate")) {
	          String[] vs = value.split("/");
	          attrs += key + " >= '" + vs[0] + "' and ";
	          attrs += key + " <= '" + vs[1] + "' and ";
	        }
	        else {
	          attrs += key + " like '%" + value + "%' and ";
	        }
	      }
	      attrs = attrs.substring(0, attrs.length() - 4);
	      List<FailureAnalysisReport> list = failureAnalysisReportService.getFailureAnalysisReportsByAttr(0, 0, attrs);
	      JsonConfig cfg = new JsonConfig();
	      cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
	      JSONArray jsonObject = JSONArray.fromObject(list, cfg);
	      setResult(jsonObject.toString());
	    } catch (JSONException e) {
	      // TODO Auto-generated catch block
	      e.printStackTrace();
	    }

	    return "success";
	  }

  public IFailureAnalysisReportService getFailureAnalysisReportService() {
    return failureAnalysisReportService;
  }

  public void setFailureAnalysisReportService(
      IFailureAnalysisReportService failureAnalysisReportService) {
    this.failureAnalysisReportService = failureAnalysisReportService;
  }

  public FailureAnalysisReport getFailureAnalysisReport() {
    return failureAnalysisReport;
  }

  public void setFailureAnalysisReport(FailureAnalysisReport failureAnalysisReport) {
    this.failureAnalysisReport = failureAnalysisReport;
  }

  public String getParams() {
    return params;
  }

  public void setParams(String params) {
    this.params = params;
  }

  public IRoleService getRoleService() {
    return roleService;
  }

  public void setRoleService(IRoleService roleService) {
    this.roleService = roleService;
  }

  public String getResult() {
    return result;
  }

  public void setResult(String result) {
    this.result = result;
  }
  public String getFarCreateDate() {
    return farCreateDate;
  }

  public void setFarCreateDate(String farCreateDate) {
    this.farCreateDate = farCreateDate;
  }
}
