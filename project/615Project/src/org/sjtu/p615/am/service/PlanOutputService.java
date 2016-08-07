package org.sjtu.p615.am.service;
import java.util.List;

import org.sjtu.p615.dao.IPlanOutputDao;
import org.sjtu.p615.dao.PlanOutputDao;
import org.sjtu.p615.am.service.IPlanOutputService;
import org.sjtu.p615.entity.Planoutput;
public class PlanOutputService implements IPlanOutputService{

private IPlanOutputDao planOutputDao;


	public IPlanOutputDao getPlanOutputDao() {
	return planOutputDao;
}

public void setPlanOutputDao(IPlanOutputDao planOutputDao) {
	this.planOutputDao = planOutputDao;
}

	@Override
	public void addPlanOutput(Planoutput outputfile) {
		// TODO Auto-generated method stub
		planOutputDao.add(outputfile);
	}

	@Override
	public List<Planoutput> getPlanOutput(String plancode) {
		// TODO Auto-generated method stub
		List<Planoutput> planoutputlist=planOutputDao.get(plancode);
		return planoutputlist;
	}

	@Override
	public int delete(int planoutputid) {
		// TODO Auto-generated method stub
		return this.planOutputDao.delete(planoutputid);
	}

	@Override
	public List<Planoutput> getByUUID(String UUID) {
		return planOutputDao.getByUUID(UUID);
		
	}
	
}
