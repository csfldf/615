package org.sjtu.p615.fracas.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.sjtu.p615.entity.FailureReport;
import org.sjtu.p615.entity.Project;
import org.sjtu.p615.entity.UserProject;

import com.opensymphony.xwork2.ActionContext;

public class ProjectSelectionAction {
	

	private String projectName;
	private String role;
	private String result;

	public String getRole() {
		return role;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	
	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	
	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String takeProject() {
		/*
		Project[] projects = projectService.getProject();
		ActionContext ac = ActionContext.getContext();
		Map<String, Object> session = ac.getSession();
		int uid = (int) session.get("USER_ID");
		List<Project> rs = new ArrayList<Project>();
		List<UserProject> userProjects = userProjectService.getByUserId(uid);
		for (UserProject userProject : userProjects) {
			for (Project project : projects) {
				if (userProject.getId().getProjectName().equals(project.getId())) {
					rs.add(project);
					break;
				}
			}
		}
		JSONArray jArray = JSONArray.fromObject(rs);
		result = jArray.toString();
		*/
		return "success";
	}
	
	public String selectProject() {
		ActionContext ac = ActionContext.getContext();
		Map<String, Object> session = ac.getSession();
		session.put("FRACAS_ROLE", role);
		session.put("FRACAS_PROJECT", projectName);
		
		return "success";
	}
	
	public String takeProjectSession() {
		ActionContext ac = ActionContext.getContext();
		Map<String, Object> session = ac.getSession();
		result = (String) session.get("FRACAS_PROJECT");
		return "success";
	}
	
}
