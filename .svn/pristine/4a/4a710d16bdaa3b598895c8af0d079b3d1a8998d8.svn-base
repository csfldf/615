package org.sjtu.p615.fracas.action;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
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
import org.sjtu.p615.entity.FailureReport;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.entity.SelectionObject;
import org.sjtu.p615.fracas.service.IFailureReportService;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import com.opensymphony.xwork2.ActionSupport;

public class FailureReportAction extends ActionSupport{

  private static final long serialVersionUID = 1L;
  private IFailureReportService failureReportService;
  private IRoleService roleService;
  private FailureReport failureReport;
  private SelectionObject selectionOptions;
  private String failureReportNum;
  private String time;
  private String frCreateDate;
  private String mrbDate;
  private String result;
  private String attrKey;
  private String attrValue;
  private String employeeId;
  private String params;

  public String addFailureReport() {
    JSONObject jsonObject = new JSONObject();
    try{
      SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
      Date date = new Date(System.currentTimeMillis());
      if(time != null && !time.equals("")) {
        date = new Date(format.parse(time).getTime());
      }
      failureReport.setHappenTime(date);

      format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
      if(frCreateDate != null && !frCreateDate.equals("")) {
        date = new Date(format.parse(frCreateDate).getTime());
      }
      failureReport.setFrCreateDate(date);

      if(mrbDate != null && !mrbDate.equals("")) {
        date = new Date(format.parse(mrbDate).getTime());
      }
      failureReport.setMrbDate(date);

      failureReportService.addFailureReport(failureReport);
      jsonObject.put("success", true);
    }
    catch(Exception e){
      e.printStackTrace();
      jsonObject.put("msg", "error");
    }
    result = jsonObject.toString();
    return SUCCESS;
  }

  public String takeFailureReport() {
    failureReport = failureReportService.getFailureReport(failureReportNum);
    //ʹ��JsonConfigȥ����java.sql.Date�޷�ֱ��ת��ΪJSON������
    JsonConfig cfg = new JsonConfig();
    cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
    JSONObject jsonObject = JSONObject.fromObject(failureReport, cfg);
    setResult(jsonObject.toString());
    return SUCCESS;
  }

  public String takeFailureReportByProject() {
    List<FailureReport> failureReports = failureReportService.getFailureReportsByProject(params);
    JsonConfig cfg = new JsonConfig();
    cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
    JSONArray jsonObject = JSONArray.fromObject(failureReports, cfg);
    setResult(jsonObject.toString());
    return SUCCESS;
  }

  // get all FRs of a employee
  public String takeFailureReportByEmployee() {
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

    List<FailureReport> failureReports = failureReportService.getFailureReportsByAttr(0, 0, attrs);
    JsonConfig cfg = new JsonConfig();
    cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
    JSONArray jsonObject = JSONArray.fromObject(failureReports, cfg);
    setResult(jsonObject.toString());
    return SUCCESS;
  }

  public String takeFailureReportDrafts() {
    String eid = params;
    String attrs = "";
    attrs += "tag='draft' and lastediter='" + eid + "'";

    List<FailureReport> failureReports = failureReportService.getFailureReportsByAttr(0, 0, attrs);
    JsonConfig cfg = new JsonConfig();
    cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
    JSONArray jsonObject = JSONArray.fromObject(failureReports, cfg);
    setResult(jsonObject.toString());
    return SUCCESS;
  }

  /*
  public String takeFailureReportByProject() {
    ActionContext ac = ActionContext.getContext();
    String project = (String) ac.getSession().get("FRACAS_PROJECT");
    if(project == null) {
      project = "c919";
    }
    List<FailureReport> failureReports = failureReportService.getFailureReportsByProject(project);
    JsonConfig cfg = new JsonConfig();
    cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
    JSONArray jsonObject = JSONArray.fromObject(failureReports, cfg);
    setResult(jsonObject.toString());
    return SUCCESS;
  }
  */
  public String takeFailureReportByAttr() {
    Map<String, String> map;
    try {
      map = (Map<String, String>)JSONUtil.deserialize(params);
      String attrs = "";
      for(String key : map.keySet()) {
        String value = map.get(key);
        if(key.equals("frCreateDate")) {
          String[] vs = value.split("/");
          attrs += key + " >= '" + vs[0] + "' and ";
          attrs += key + " <= '" + vs[1] + "' and ";
        }
        else {
          attrs += key + " like '%" + value + "%' and ";
        }
      }
      attrs = attrs.substring(0, attrs.length() - 4);
      List<FailureReport> list = failureReportService.getFailureReportsByAttr(0, 0, attrs);
      JsonConfig cfg = new JsonConfig();
      cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
      JSONArray jsonObject = JSONArray.fromObject(list, cfg);
      setResult(jsonObject.toString());
    } catch (JSONException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

    return SUCCESS;
  }

  public String getSelectionOptions(){
    /*
    selectionOptions= failureReportService.getSelectionOptions();
    //ʹ��JsonConfigȥ����java.sql.Date�޷�ֱ��ת��ΪJSON������
    if(selectionOptions == null)
      System.out.println("error!!!!!!!");
    JsonConfig cfg = new JsonConfig();
    cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
    JSONObject jsonObject = JSONObject.fromObject(selectionOptions, cfg);
    setResult(jsonObject.toString());
    */
    return SUCCESS;
  }

  public String getProjectTodoListAmounts() {
    List<Role> roles = roleService.getRoleList(employeeId);
    Map<String, String> map = new HashMap<String, String>();
    int count = 0;
    for (Role role : roles) {
      int rcount = 0;

      int roleId = role.getRoleId();
      if (roleId < 8 || roleId > 10) {
        continue;
      }
      List<FailureReport> frs = failureReportService.getFailureReportsByProject(role.getProjectName());

      for (FailureReport failureReport : frs) {
        String status = failureReport.getStatus();
        if (roleId == 8) {
          if (status.equals("wait for tl")) {
            count ++;
            rcount ++;
          }
        }
        else if (roleId == 9) {
          if (status.equals("wait for qa")) {
            count ++;
            rcount ++;
          }
        }
        else if (roleId == 10) {
          if (status.equals("wait for mrb")) {
            count ++;
            rcount ++;
          }
        }
      }

      map.put(role.getProjectName() + ":" + roleId, rcount + "");
    }
    map.put("total", count + "");
    JSONObject jObject = JSONObject.fromObject(map);
    setResult(jObject.toString());
    return SUCCESS;
  }

  public String queryFailureReport(String queryCondition, int offset, int count){
    JSONObject jObject = JSONObject.fromObject(params);
    Map<String, String> queryMap = (Map)jObject; //ת����map
    List<FailureReport> frs = failureReportService.queryFailureReport(queryMap, offset, count);
    JSONObject frsJObject = JSONObject.fromObject(frs);
    setResult(frsJObject.toString());
    return SUCCESS;
  }

  public String getFailureReportNum() {
    return failureReportNum;
  }

  public void setFailureReportNum(String failureReportNum) {
    this.failureReportNum = failureReportNum;
  }
  public String getTime() {
    return time;
  }

  public void setTime(String time) {
    this.time = time;
  }

  public String getResult() {
    return result;
  }

  public void setResult(String result) {
    this.result = result;
  }
  public FailureReport getFailureReport() {
    return failureReport;
  }

  public void setFailureReport(FailureReport failureReport) {
    this.failureReport = failureReport;
  }

  public IFailureReportService getFailureReportService() {
    return failureReportService;
  }

  public void setFailureReportService(IFailureReportService failureReportService) {
    this.failureReportService = failureReportService;
  }
  public String getFrCreateDate() {
    return frCreateDate;
  }

  public void setFrCreateDate(String frCreateDate) {
    this.frCreateDate = frCreateDate;
  }

  public String getMrbDate() {
    return mrbDate;
  }

  public void setMrbDate(String mrbDate) {
    this.mrbDate = mrbDate;
  }

  public String getAttrKey() {
    return attrKey;
  }

  public void setAttrKey(String attrKey) {
    this.attrKey = attrKey;
  }

  public String getAttrValue() {
    return attrValue;
  }

  public void setAttrValue(String attrValue) {
    this.attrValue = attrValue;
  }

  public IRoleService getRoleService() {
    return roleService;
  }

  public void setRoleService(IRoleService roleService) {
    this.roleService = roleService;
  }

  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
  }

  public String getParams() {
    return params;
  }

  public void setParams(String params) {
    this.params = params;
  }
}
