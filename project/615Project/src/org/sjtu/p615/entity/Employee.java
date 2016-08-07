package org.sjtu.p615.entity;

// default package
// Generated 2014-9-27 21:50:52 by Hibernate Tools 3.4.0.CR1

/**
 * Employee generated by hbm2java
 */
public class Employee implements java.io.Serializable {

	private String employeeNumber;
	private String employeeName;
	private String employeeEmail;
	private int roleId;
	private Boolean deleteMark;
	private String loginPassword;
	private int taskCount;
	private boolean checked;
	private int departmentId;
	private String departmentName;
	private int prjCount;
	private String major;
	private String groupName;
	private String actionDirListOpt;
	private String actionListOpt;
	private String actionWaitingListOpt;
	private String planListOpt;
	private String taskListOpt;
	private String planWaitingListOpt;
	public Employee() {
		this.setChecked(false);
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public Employee(String employeeNumber) {
		this.employeeNumber = employeeNumber;
	}

	public Employee(String employeeNumber, String employeeName,
		String employeeEmail, String departmentName) {
		this.employeeNumber = employeeNumber;
		this.employeeName = employeeName;
		this.employeeEmail = employeeEmail;
		this.deleteMark = false;
		this.loginPassword = "1234";
		this.departmentName=departmentName;
		this.setChecked(false);
	}
	
	public int getPrjCount() {
		return prjCount;
	}

	public void setPrjCount(int prjCount) {
		this.prjCount = prjCount;
	}

	public String getEmployeeNumber() {
		return this.employeeNumber;
	}

	public void setEmployeeNumber(String employeeNumber) {
		this.employeeNumber = employeeNumber;
	}

	public String getEmployeeName() {
		return this.employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getEmployeeEmail() {
		return this.employeeEmail;
	}

	public void setEmployeeEmail(String employeeEmail) {
		this.employeeEmail = employeeEmail;
	}

	public Boolean getDeleteMark() {
		return this.deleteMark;
	}

	public void setDeleteMark(Boolean deleteMark) {
		this.deleteMark = deleteMark;
	}

	public String getLoginPassword() {
		return this.loginPassword;
	}

	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}

	public int getTaskCount() {
		return taskCount;
	}

	public void setTaskCount(int taskCount) {
		this.taskCount = taskCount;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getActionListOpt() {
		return actionListOpt;
	}

	public void setActionListOpt(String actionListOpt) {
		this.actionListOpt = actionListOpt;
	}

	public String getActionWaitingListOpt() {
		return actionWaitingListOpt;
	}

	public void setActionWaitingListOpt(String actionWaitingListOpt) {
		this.actionWaitingListOpt = actionWaitingListOpt;
	}

	public String getPlanListOpt() {
		return planListOpt;
	}

	public void setPlanListOpt(String planListOpt) {
		this.planListOpt = planListOpt;
	}

	public String getPlanWaitingListOpt() {
		return planWaitingListOpt;
	}

	public void setPlanWaitingListOpt(String planWaitingListOpt) {
		this.planWaitingListOpt = planWaitingListOpt;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public String getTaskListOpt() {
		return taskListOpt;
	}

	public void setTaskListOpt(String taskListOpt) {
		this.taskListOpt = taskListOpt;
	}

	public String getActionDirListOpt() {
		return actionDirListOpt;
	}

	public void setActionDirListOpt(String actionDirListOpt) {
		this.actionDirListOpt = actionDirListOpt;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	
}