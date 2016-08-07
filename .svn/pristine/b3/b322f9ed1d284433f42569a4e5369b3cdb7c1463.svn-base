package org.sjtu.p615.fracas.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.sjtu.p615.entity.Correctiveactionreport;
import org.sjtu.p615.entity.FailureAnalysisReport;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.fracas.service.ICorrectiveActionReportService;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

public class CorrectiveActionReportAction {
	private ICorrectiveActionReportService carService;
	private Correctiveactionreport correctiveActionReport;
	private String params;
	private String result;
	
	public String saveCar(){
		JSONObject jsonObject = new JSONObject();
		try{
			
			carService.addCar(correctiveActionReport);
			jsonObject.put("success", true);
		}
		catch(Exception e){
			e.printStackTrace();
			jsonObject.put("msg", "error");
		}
		result = jsonObject.toString();
		return "success";
	}
	
	public String getOneCar(){
		String carNumber = params;
		Correctiveactionreport correctiveactionreport = carService.getOneCar(carNumber);
		JsonConfig cfg = new JsonConfig();
		cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
		JSONObject jsonObject = JSONObject.fromObject(correctiveactionreport, cfg);
		setResult(jsonObject.toString());
		return "success";
	}
	
	public String getAllCars(){
		List<Correctiveactionreport> cars = carService.getAllCars();
		JsonConfig cfg = new JsonConfig();
		cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
		JSONArray jsonObject = JSONArray.fromObject(cars, cfg);
		setResult(jsonObject.toString());
		return "success";
	}
	
	public ICorrectiveActionReportService getCarService() {
		return carService;
	}
	public void setCarService(ICorrectiveActionReportService carService) {
		this.carService = carService;
	}
	public Correctiveactionreport getCorrectiveActionReport() {
		return correctiveActionReport;
	}

	public void setCorrectiveActionReport(
			Correctiveactionreport correctiveActionReport) {
		this.correctiveActionReport = correctiveActionReport;
	}
	public String getParams() {
		return params;
	}
	public void setParams(String params) {
		this.params = params;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	
	
}
