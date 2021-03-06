package org.sjtu.p615.entity;

import java.util.List;

// default package
// Generated 2014-9-27 21:50:52 by Hibernate Tools 3.4.0.CR1

/**
 * Group generated by hbm2java
 */
public class Group implements java.io.Serializable {

	private Integer groupId;
	private String groupName;
	private String projectId;
	private Integer level;
	private Integer parentId;
	private Boolean deleteMark;
	private String groupLeaderId;
	private String groupLeaderName;
	private List<Group> subGroups;
	
	private String projectName;
	public Group() {
	}

	public Group(String groupName, String projectId, Integer level,
			Integer parentId, Boolean deleteMark) {
		this.groupName = groupName;
		this.projectId = projectId;
		this.level = level;
		this.parentId = parentId;
		this.deleteMark = deleteMark;
	}

	public List<Group> getSubGroups() {
		return subGroups;
	}

	public void setSubGroups(List<Group> subGroups) {
		this.subGroups = subGroups;
	}

	public Integer getGroupId() {
		return this.groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public String getGroupName() {
		return this.groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getProjectId() {
		return this.projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public Integer getLevel() {
		return this.level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getParentId() {
		return this.parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Boolean getDeleteMark() {
		return this.deleteMark;
	}

	public void setDeleteMark(Boolean deleteMark) {
		this.deleteMark = deleteMark;
	}

	public String getGroupLeaderId() {
		return groupLeaderId;
	}

	public void setGroupLeaderId(String groupLeaderId) {
		this.groupLeaderId = groupLeaderId;
	}

	public String getGroupLeaderName() {
		return groupLeaderName;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public void setGroupLeaderName(String groupLeaderName) {
		this.groupLeaderName = groupLeaderName;
	}

}
