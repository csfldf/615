package org.sjtu.p615.am.action;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

import org.sjtu.p615.am.service.IPlanStateService;
import org.sjtu.p615.am.service.PlanStateService;
import org.sjtu.p615.entity.Planstate;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import com.opensymphony.xwork2.ActionSupport;

public class PlanStateAction extends ActionSupport{
	private IPlanStateService planStateService;

	public IPlanStateService getPlanStateService() {
		return planStateService;
	}
	public void setPlanStateService(IPlanStateService planStateService) {
		this.planStateService = planStateService;
	}
	public JSONArray getJsonary() {
		return jsonary;
	}
	public void setJsonary(JSONArray jsonary) {
		this.jsonary = jsonary;
	}
	private JSONArray jsonary;
public String getallstates(){
	//this.planservice=new PlanStateService();
	List<Planstate> list=planStateService.getstates();
	JsonConfig cfg = new JsonConfig();
	cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
	JSONArray jsonarray=JSONArray.fromObject(list, cfg);
	this.setJsonary(jsonarray);
	return SUCCESS;
}
}
