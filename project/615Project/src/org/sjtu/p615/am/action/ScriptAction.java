package org.sjtu.p615.am.action;

import java.util.Enumeration;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.IScriptService;
import org.sjtu.p615.am.service.ScriptService;
import org.sjtu.p615.entity.Plan;
import org.sjtu.p615.entity.Script;

import com.opensymphony.xwork2.ActionSupport;

public class ScriptAction extends ActionSupport{
private String employeeId;
private JSONArray jsonary;
private JSONObject jsonobj;
private String scriptKey;
IScriptService scriptService;
public String getScriptList(){
	List<Script> res=scriptService.getList(employeeId);
	
	String json="[";
	for(int i=0;i<res.size();i++){
		if(i==0){
			json+=(res.get(i).getScriptContent().split("}")[0]+",\"scriptKey\":[\""+res.get(i).getScriptKey().toString()+"\"]}");
		}else{
			json+=(","+(res.get(i).getScriptContent().split("}")[0]+res.get(i).getScriptKey().toString()+"}"));
		}
	}
	json+="]";
	JSONArray ary=JSONArray.fromObject(json);
	//List<Plan> plans=(List<Plan>)JSONArray.toCollection(ary, Plan.class);
	this.setJsonary(ary);
	return SUCCESS;
}
public String getOneScript(){
	Script scp=scriptService.getOneScript(Integer.parseInt(scriptKey));
	this.setJsonobj(JSONObject.fromObject(scp.getScriptContent()));
	return SUCCESS;
}
public String addScript(){
	JSONObject jsonObject = new JSONObject();
	HttpServletRequest request=null;
	 try {
	 request=ServletActionContext.getRequest();
	 Map<String,String[]> mm=request.getParameterMap();
	 jsonObject=JSONObject.fromObject(mm);
	 Enumeration enu=request.getParameterNames();  
	 while(enu.hasMoreElements()){  
	 String paraName=(String)enu.nextElement();  
	 System.out.println(paraName+": "+request.getParameter(paraName));  
	 }  
	} 
	 catch (Exception e) {
	// TODO: handle exception
	e.printStackTrace();
	} 
	Script scp=new Script();
	scp.setEmployeeId(employeeId);
	scp.setScriptContent(jsonObject.toString());
	this.jsonobj=new JSONObject();
	try{
		scriptService.addScript(scp);
	}
	catch(Exception e){
		this.jsonobj.put("msg", "error");
		e.printStackTrace();
		return SUCCESS;
	}
	this.jsonobj.put("msg", "success");
	return SUCCESS;
}
public String getEmployeeId() {
	return employeeId;
}
public void setEmployeeId(String employeeId) {
	this.employeeId = employeeId;
}
public JSONArray getJsonary() {
	return jsonary;
}
public void setJsonary(JSONArray jsonary) {
	this.jsonary = jsonary;
}
public JSONObject getJsonobj() {
	return jsonobj;
}
public void setJsonobj(JSONObject jsonobj) {
	this.jsonobj = jsonobj;
}
public String getScriptKey() {
	return scriptKey;
}
public void setScriptKey(String scriptKey) {
	this.scriptKey = scriptKey;
}
public IScriptService getScriptService() {
	return scriptService;
}
public void setScriptService(IScriptService scriptService) {
	this.scriptService = scriptService;
}

}
