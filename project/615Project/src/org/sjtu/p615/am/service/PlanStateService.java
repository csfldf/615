package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.dao.IPlanStateDao;
import org.sjtu.p615.dao.PlanStateDao;
import org.sjtu.p615.entity.Planstate;

public class PlanStateService implements IPlanStateService{

	private IPlanStateDao planStateDao; 

	@Override
	public List<Planstate> getstates() {
		// TODO Auto-generated method stub
		List<Planstate> res;
		res=this.planStateDao.getstates();
		return res;
	}

	public IPlanStateDao getPlanStateDao() {
		return planStateDao;
	}

	public void setPlanStateDao(IPlanStateDao planStateDao) {
		this.planStateDao = planStateDao;
	}
	
}
