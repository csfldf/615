package org.sjtu.p615.am.action;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.sjtu.p615.am.service.IGroupService;
import org.sjtu.p615.entity.Group;

import com.opensymphony.xwork2.ActionSupport;

public class GroupAction extends ActionSupport{
private IGroupService groupService;
private String groupName;
private String projectId;
private String projectName;
private String groupId;
private String leaderId;
private String parentId;
private String type;
private String groupLeaderName;
private JSONArray jsonary;
private JSONObject jsonobj;
/******************************�ж���ͳ�� �������group***************************************/
public String getAllGroup(){
	List<Group> list=groupService.getAllGroup();
	if(list!=null){
		setJsonary(JSONArray.fromObject(list));
		return SUCCESS;
	}else{
		return null;
	}
}
/*******************************************************************************************/
public IGroupService getGroupService() {
	return groupService;
}
public void setGroupService(IGroupService groupService) {
	this.groupService = groupService;
}
public String addOneGroup(){
	jsonobj=new JSONObject();
	Group grp=new Group();
	grp.setDeleteMark(false);
	grp.setGroupName(groupName);
	switch(type){
	case "first":grp.setLevel(1);break;
	case "second":grp.setLevel(2);grp.setParentId(Integer.parseInt(parentId));break;
	}
	grp.setProjectName(projectName);
	grp.setProjectId(projectId);
	grp.setGroupLeaderId(leaderId);
	grp.setGroupLeaderName(groupLeaderName);
	try{
		int res=groupService.addOne(grp);
		jsonobj.put("grpID", res);
		jsonobj.put("msg", "success");
	}
	catch(Exception e){
		jsonobj.put("msg", "error");
		e.printStackTrace();
	}
	return SUCCESS;
}
public String deleteOneGroup(){
	jsonobj=new JSONObject();
	try{
		groupService.deleteOne(Integer.parseInt(groupId));
		jsonobj.put("msg", "success");
	}
	catch(Exception e){
		jsonobj.put("msg", "error");
		e.printStackTrace();
	}
	return SUCCESS;
}
public String getGroupsByProject(){
	
	List<Group> groups=groupService.getByProject(projectId);
	jsonary=new JSONArray().fromObject(groups);
	return SUCCESS;
}

public String getParentId() {
	return parentId;
}
public void setParentId(String parentId) {
	this.parentId = parentId;
}
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}
public String getGroupName() {
	return groupName;
}

public void setGroupName(String groupName) {
	this.groupName = groupName;
}

public String getProjectId() {
	return projectId;
}

public void setProjectId(String projectId) {
	this.projectId = projectId;
}
public String getGroupId() {
	return groupId;
}
public void setGroupId(String groupId) {
	this.groupId = groupId;
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
public String getLeaderId() {
	return leaderId;
}
public void setLeaderId(String leaderId) {
	this.leaderId = leaderId;
}
public String getGroupLeaderName() {
	return groupLeaderName;
}
public void setGroupLeaderName(String groupLeaderName) {
	this.groupLeaderName = groupLeaderName;
}
public String getProjectName() {
	return projectName;
}
public void setProjectName(String projectName) {
	this.projectName = projectName;
}

}
