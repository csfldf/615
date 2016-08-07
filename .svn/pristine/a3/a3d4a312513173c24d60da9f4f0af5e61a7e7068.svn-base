package org.sjtu.p615.util.action;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import org.sjtu.p615.am.service.IRoleService;
import org.sjtu.p615.entity.Role;

import com.opensymphony.xwork2.ActionContext;

public class CheckinAction {
	private IRoleService roleService;
	private String result;
	
	public String getRoleInfo() {
		ActionContext ac = ActionContext.getContext();
		Map<String, Object> map = ac.getSession();
		String eid = (String) map.get("employeeId");
		
		List<Role> roles = roleService.getRoleList(eid);
		JSONArray jArray = JSONArray.fromObject(roles);
		setResult(jArray.toString());
		return "success";
	}
	
	public String checkRole() {
		ActionContext ac = ActionContext.getContext();
		Map<String, Object> map = ac.getSession();
		setResult((String) map.get("FRACAS_ROLE"));
		return "success";
	}
	
	public String checkUser() {
		ActionContext ac = ActionContext.getContext();
		Map<String, Object> map = ac.getSession();
		setResult((String) map.get("employeeName"));
		return "success";
	}
	
	public String checkUserId() {
		ActionContext ac = ActionContext.getContext();
		Map<String, Object> map = ac.getSession();
		setResult((String) map.get("employeeId"));
		return "success";
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public IRoleService getRoleService() {
		return roleService;
	}

	public void setRoleService(IRoleService roleService) {
		this.roleService = roleService;
	}
}
