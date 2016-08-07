package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.entity.Planoutput;

public interface IPlanOutputService {
public void addPlanOutput(Planoutput outputfile);
public List<Planoutput> getPlanOutput(String plancode);
public int delete(int planoutputid);
public List<Planoutput> getByUUID(String UUID);

}
