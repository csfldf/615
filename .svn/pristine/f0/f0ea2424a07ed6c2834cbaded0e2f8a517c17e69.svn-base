package org.sjtu.p615.am.action;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.IAmPrivilegeService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class AmPrivilegeAction extends ActionSupport{
private JSONObject jsonobj;
private JSONArray jsonary;
private IAmPrivilegeService amPrivilegeService;
private String empId;
private String prjId;
private String action;
public String getAllPrivileges(){
	jsonary=new JSONArray();
	jsonary=JSONArray.fromObject(amPrivilegeService.getAll());
	return SUCCESS;
}
public String getOnesAmPrivilege(){
	ActionContext ac = ActionContext.getContext();
	Map<String, Object> map = ac.getSession();
	//setResult((String) map.get("FRACAS_ROLE"));
	jsonobj=JSONObject.fromObject(map.get("amPrivilege"));
	return "success";
}
public String getAmPrivilegeByEmployeeId(){
	jsonary = JSONArray.fromObject(amPrivilegeService.getAmPrivilegeByEmployeeId(empId));
	return SUCCESS;
}
public String authAssert(){
	jsonobj=new JSONObject();
	boolean res=false;
	HttpSession session=ServletActionContext.getRequest().getSession();
	try{
		if(session.getAttribute("employeeId").equals("MVP")){
			res = true;
		}else{
			res=amPrivilegeService.checkAuth(empId, prjId, action);
		}
		jsonobj.put("success", res);
	}
	catch(Exception e){
		e.printStackTrace();
		jsonobj.put("success",false);
	}
	return SUCCESS;
}
public String multiOpAuthAssert(){
    jsonobj=new JSONObject();
    try{
        String[] actions = action.split(",");
        boolean res = false;
        for(String action : actions) {
            boolean temp = amPrivilegeService.checkAuth(empId, prjId, action);
            if (temp){
                res = true;
                break;
            }
        }
        jsonobj.put("success", res);
    }
    catch(Exception e){
        e.printStackTrace();
        jsonobj.put("success",false);
    }
    return SUCCESS;
}
public String getEmpId() {
	return empId;
}
public void setEmpId(String empId) {
	this.empId = empId;
}
public String getPrjId() {
	return prjId;
}
public void setPrjId(String prjId) {
	this.prjId = prjId;
}
public String getAction() {
	return action;
}
public void setAction(String action) {
	this.action = action;
}
public IAmPrivilegeService getAmPrivilegeService() {
	return amPrivilegeService;
}

public void setAmPrivilegeService(IAmPrivilegeService amPrivilegeService) {
	this.amPrivilegeService = amPrivilegeService;
}

public JSONObject getJsonobj() {
	return jsonobj;
}
public void setJsonobj(JSONObject jsonobj) {
	this.jsonobj = jsonobj;
}
public JSONArray getJsonary() {
	return jsonary;
}
public void setJsonary(JSONArray jsonary) {
	this.jsonary = jsonary;
}
}
