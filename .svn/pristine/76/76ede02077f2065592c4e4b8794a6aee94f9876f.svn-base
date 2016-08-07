package org.sjtu.p615.am.action;

import java.util.List;

import net.sf.json.JSONArray;

import org.sjtu.p615.am.service.IRoleInfoService;
import org.sjtu.p615.am.service.IRoleService;
import org.sjtu.p615.entity.Roleinfo;

import com.opensymphony.xwork2.ActionSupport;

public class RoleInfoAction extends ActionSupport{
private IRoleInfoService roleInfoService;
private JSONArray jsonary;
public String getAllRoleInfo(){
	List<Roleinfo> res=roleInfoService.getall();
	jsonary=JSONArray.fromObject(res);
	return SUCCESS;
}
public IRoleInfoService getRoleInfoService() {
	return roleInfoService;
}
public void setRoleInfoService(IRoleInfoService roleInfoService) {
	this.roleInfoService = roleInfoService;
}
public JSONArray getJsonary() {
	return jsonary;
}
public void setJsonary(JSONArray jsonary) {
	this.jsonary = jsonary;
}

}
