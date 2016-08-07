package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.dao.IRoleInfoDao;
import org.sjtu.p615.dao.RoleInfoDao;
import org.sjtu.p615.entity.Roleinfo;

public class RoleInfoService implements IRoleInfoService{
private IRoleInfoDao roleInfoDao;
	@Override
	public Roleinfo getById(int RoleId) {
		// TODO Auto-generated method stub
		return this.roleInfoDao.get(RoleId);
	}
	public IRoleInfoDao getRoleInfoDao() {
		return roleInfoDao;
	}
	public void setRoleInfoDao(IRoleInfoDao roleInfoDao) {
		this.roleInfoDao = roleInfoDao;
	}
	@Override
	public List<Roleinfo> getall() {
		// TODO Auto-generated method stub
		return roleInfoDao.getall();
	}

}
