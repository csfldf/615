package org.sjtu.p615.entity;

// Generated 2015-5-25 12:29:27 by Hibernate Tools 3.4.0.CR1

import java.util.Date;

/**
 * Remind generated by hbm2java
 */
public class Remind implements java.io.Serializable {

	private Integer remindId;
	private String remindType;
	private String remindContent;
	private String remindSource;
	private Date deadline;
	private Date remindDate;
	private String employeeId;

	public Remind() {
	}

	public Remind(String remindType, String remindContent, String remindSource,
			Date deadline, Date remindDate, String employeeId) {
		this.remindType = remindType;
		this.remindContent = remindContent;
		this.remindSource = remindSource;
		this.deadline = deadline;
		this.remindDate = remindDate;
		this.employeeId = employeeId;
	}

	public Integer getRemindId() {
		return this.remindId;
	}

	public void setRemindId(Integer remindId) {
		this.remindId = remindId;
	}

	public String getRemindType() {
		return this.remindType;
	}

	public void setRemindType(String remindType) {
		this.remindType = remindType;
	}

	public String getRemindContent() {
		return this.remindContent;
	}

	public void setRemindContent(String remindContent) {
		this.remindContent = remindContent;
	}

	public String getRemindSource() {
		return this.remindSource;
	}

	public void setRemindSource(String remindSource) {
		this.remindSource = remindSource;
	}

	public Date getDeadline() {
		return this.deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public Date getRemindDate() {
		return this.remindDate;
	}

	public void setRemindDate(Date remindDate) {
		this.remindDate = remindDate;
	}

	public String getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

}
