package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.dao.IActionDao;
import org.sjtu.p615.entity.Action;

public class ActionService implements IActionService{

	private IActionDao actionDao;

	@Override
	public List<Action> getUnreleasedActions(String creatorId){
		return actionDao.getUnreleasedActions(creatorId);
	}
	@Override
	public List<Action> getUsrActions(String employeeId) {
		// TODO Auto-generated method stub
		return actionDao.getUsrActions(employeeId);
	}

	@Override
	public List<Action> getUsrActionProjects(String employeeId) {
		// TODO Auto-generated method stub
		return actionDao.getUsrActionProjects(employeeId);
	}

	public IActionDao getActionDao() {
		return actionDao;
	}

	public void setActionDao(IActionDao actionDao) {
		this.actionDao = actionDao;
	}

	@Override
	public List<Action> getProjectActions(String projectId) {
		// TODO Auto-generated method stub
		return actionDao.getProjectActions(projectId);
	}

	@Override
	public Action getAction(String actionId) {
		return actionDao.getAction(actionId);
	}

	@Override
	public boolean deleteAction(String actionId) {
		return actionDao.deleteAction(actionId);
	}

	@Override
	public boolean saveAction(Action action) {
		return actionDao.saveAction(action);
	}

}
