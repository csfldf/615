package org.sjtu.p615.entity;

import java.util.ArrayList;

public class SelectionObject {
	private ArrayList<String> projects;
	private ArrayList<String> failureModes;
	private ArrayList<String> failureComponentNames;
	private ArrayList<String> failureComponentModels;
	private ArrayList<String> failureComponentCodes;
	private ArrayList<String> failureComponentSruLots;
	private ArrayList<String> environments;
	private ArrayList<String> processes;

	public ArrayList<String> getProjects() {
		return projects;
	}

	public void setProjects(ArrayList<String> projects) {
		this.projects = projects;
	}

	public ArrayList<String> getFailureComponentNames() {
		return failureComponentNames;
	}

	public void setFailureComponentNames(ArrayList<String> failureComponentNames) {
		this.failureComponentNames = failureComponentNames;
	}

	public ArrayList<String> getFailureComponentModels() {
		return failureComponentModels;
	}

	public void setFailureComponentModels(ArrayList<String> failureComponentModels) {
		this.failureComponentModels = failureComponentModels;
	}

	public ArrayList<String> getFailureComponentCodes() {
		return failureComponentCodes;
	}

	public void setFailureComponentCodes(ArrayList<String> failureComponentCodes) {
		this.failureComponentCodes = failureComponentCodes;
	}

	public ArrayList<String> getFailureComponentSruLots() {
		return failureComponentSruLots;
	}

	public void setFailureComponentSruLots(ArrayList<String> failureComponentSruLots) {
		this.failureComponentSruLots = failureComponentSruLots;
	}

	public ArrayList<String> getEnvironments() {
		return environments;
	}

	public void setEnvironments(ArrayList<String> environments) {
		this.environments = environments;
	}

	public ArrayList<String> getProcesses() {
		return processes;
	}

	public void setProcesses(ArrayList<String> processes) {
		this.processes = processes;
	}

	public ArrayList<String> getFailureModes() {
		return failureModes;
	}

	public void setFailureModes(ArrayList<String> failureModes) {
		this.failureModes = failureModes;
	}

	
	
	
}
