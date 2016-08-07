package org.sjtu.p615.am.service;

import org.sjtu.p615.dao.ISystemDao;

public class SystemService implements ISystemService{
	private ISystemDao systemDao;

	@Override
	public boolean saveUsrOpt(String employeeId, String optionType,String usrOpt) {
		// TODO Auto-generated method stub
		return systemDao.saveUsrOpt(employeeId,optionType,usrOpt);
	}

	public ISystemDao getSystemDao() {
		return systemDao;
	}

	public void setSystemDao(ISystemDao systemDao) {
		this.systemDao = systemDao;
	}

}
