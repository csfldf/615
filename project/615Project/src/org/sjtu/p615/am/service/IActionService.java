package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.entity.Action;

public interface IActionService {
	List<Action> getUnreleasedActions(String creatorId);

	public List<Action> getUsrActions(String employeeId);
	public List<Action> getUsrActionProjects(String employeeId);
	public List<Action> getProjectActions(String projectId);

	public Action getAction(String actionId);
	public boolean deleteAction(String actionId);
	public boolean saveAction(Action action);
}
