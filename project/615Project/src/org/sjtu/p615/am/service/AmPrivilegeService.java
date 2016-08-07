package org.sjtu.p615.am.service;

import java.util.List;




//import org.sjtu.p615.dao.AmPrivilegeDao;
import org.sjtu.p615.dao.IAmPrivilegeDao;
import org.sjtu.p615.dao.IRoleInfoDao;
import org.sjtu.p615.entity.Amprivilege;

public class AmPrivilegeService implements IAmPrivilegeService{
	private IAmPrivilegeDao amPrivilegeDao;
	private IRoleInfoDao roleInfoDao;
	public IRoleInfoDao getRoleInfoDao() {
		return roleInfoDao;
	}

	public void setRoleInfoDao(IRoleInfoDao roleInfoDao) {
		this.roleInfoDao = roleInfoDao;
	}

	public IAmPrivilegeDao getAmPrivilegeDao() {
		return amPrivilegeDao;
	}

	public void setAmPrivilegeDao(IAmPrivilegeDao amPrivilegeDao) {
		this.amPrivilegeDao = amPrivilegeDao;
	}

	@Override
	public Amprivilege getOne(int roleId) {
		// TODO Auto-generated method stub
		return amPrivilegeDao.getOneByRoleId(roleId);
	}



	@Override
	public void addOne(Amprivilege one) {
		// TODO Auto-generated method stub
		amPrivilegeDao.addOne(one);
	}

	@Override
	public void changeOne(Amprivilege one) {
		// TODO Auto-generated method stub
		amPrivilegeDao.changeOne(one);
	}

	@Override
	public void deleteOne(int roleId) {
		// TODO Auto-generated method stub
		amPrivilegeDao.deleteOne(roleId);
	}

	@Override
	public List<Amprivilege> getAll() {
		// TODO Auto-generated method stub
		List<Amprivilege> res=amPrivilegeDao.getAll();
		//for(Amprivilege)
		return res;
	}

	@Override
	public Amprivilege getByPrj(String empId, String prjId) {
		// TODO Auto-generated method stub
		List<Amprivilege> alist=amPrivilegeDao.getByPrj(empId, prjId);
		Amprivilege a=new Amprivilege();
		
		
		return null;
	}

	@Override
	public boolean checkAuth(String empId, String prjId, String s) {
		// TODO Auto-generated method stub
		String tmp[] =s.split("_");
		int res=amPrivilegeDao.checkAuth(empId, prjId, tmp[0]);
		switch(tmp[1]){
		case "op":return res==2?true:false;
		case "view":return res>=1?true:false;
		default:break;
		}
		return false;
	}

	@Override
	public List<Amprivilege> getAmPrivilegeByEmployeeId(String empId) {
		// TODO Auto-generated method stub
		return amPrivilegeDao.getAmPrivilegeByEmployeeId(empId);
	}

}
