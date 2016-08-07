package org.sjtu.p615.am.action;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.sjtu.p615.am.service.IDepartmentService;
import org.sjtu.p615.entity.Department;

import com.opensymphony.xwork2.ActionSupport;

public class DepartmentAction extends ActionSupport{
private IDepartmentService departmentService;
public String id;
public String name;
public String type;
public JSONObject jsonobj;
public JSONArray jsonary;
public String getAllDep(){
	jsonary=JSONArray.fromObject(departmentService.getAll());
	return SUCCESS;
}
public String deleteOneDep(){
	jsonobj=new JSONObject();
	try{
		departmentService.deleteOne(Integer.parseInt(id));
		jsonobj.put("success", true);
	}catch (Exception e){
		e.printStackTrace();
		jsonobj.put("success", false);
	}
	return SUCCESS;
}
public String addOrModifyDep(){
	jsonobj=new JSONObject();
	Department d=new Department();
	if(type.equals("modify")){
		d.setId(Integer.parseInt(id));
	}
	d.setName(name);
	try{
		departmentService.addORmodify(d);
		jsonobj.put("success", true);
	}catch (Exception e){
		e.printStackTrace();
		jsonobj.put("success", false);
	}
	return SUCCESS;
}
public IDepartmentService getDepartmentService() {
	return departmentService;
}
public void setDepartmentService(IDepartmentService departmentService) {
	this.departmentService = departmentService;
}
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
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
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}

}
