package org.sjtu.p615.dao;

import java.util.List;

import org.sjtu.p615.entity.Planoutput;

public interface IPlanOutputDao {
	public void add(Planoutput planOutput);
	public List<Planoutput> get(String planCode);
	public int delete(int planoutputid);
	public List<Planoutput> getByUUID(String UUID);
}
