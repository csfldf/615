package org.sjtu.p615.fracas.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.sjtu.p615.entity.FailureReportMetadata;
import org.sjtu.p615.entity.FailureReportMetadataId;
import org.sjtu.p615.entity.FracasMetadata;
import org.sjtu.p615.fracas.service.IFailureReportMetadataService;
import org.sjtu.p615.fracas.service.IFracasMetadataService;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

public class FracasMetadataAction {
	private IFracasMetadataService fracasMetadataService;
	private String result;
	private String params;
	private FracasMetadata fracasMetadata;
	
	public String save(){
		fracasMetadataService.deleteAllMetadata();
		System.out.println("-------------metadata before save: "+fracasMetadataService.getAllMetadata().size());
		JSONArray metadataJsons = JSONArray.fromObject(params);
		System.out.println("-----params:--"+params);
		for (Object object : metadataJsons) {
			JSONObject metadataJson = JSONObject.fromObject(object);
			
			String name = (String) metadataJson.get("key");
			String value = (String) metadataJson.get("value");
			String[] valueArray = value.split(",");
			for(int i = 0; i < valueArray.length; i++){
				System.out.println("-----save------");
				System.out.println(name+":"+valueArray[i]);
				FracasMetadata metadata = new FracasMetadata();
				metadata.setMetadataName(name);
				metadata.setValue(valueArray[i]);
				metadata.setDeleteMark(false);
				fracasMetadataService.save(metadata);
			}
		}
		
		return "success";
	}
	
	
	public String getOneSelectionList(){
		String metadataName = params;
		ArrayList<FracasMetadata> fracasMetadataSelections= fracasMetadataService.getOneSelectionList(metadataName);
		JsonConfig cfg = new JsonConfig();
		cfg.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor());
		JSONArray jsonObject = JSONArray.fromObject(fracasMetadataSelections, cfg);
		setResult(jsonObject.toString());
		return "success";
	}
	
	public String getAllMetadata(){
		Map<String,String> map = fracasMetadataService.getAllMetadata();
		JSONObject jObject = JSONObject.fromObject(map);
		setResult(jObject.toString());
		return "success";
	}
	
	public String getAllMetadataNames(){
		ArrayList<String> metadataNames = fracasMetadataService.getAllMetadataNames();
		JSONArray jarray = JSONArray.fromObject(metadataNames);
		setResult(jarray.toString());
		return "success";
	}
	
	/*
	public String getOne() {
		String[] ps = params.split(" ");
		FailureReportMetadata failureReportMetadata = failureReportMetadataService.getOne(ps[0], ps[1]);
		setResult(JSONObject.fromObject(failureReportMetadata).toString());
		return "success";
	}
	
	public String getFrMetadataByProject() {
		List<FailureReportMetadata> failureReportMetadatas = failureReportMetadataService.getByProject(params);
		Map<String, String> map = new HashMap<String, String>();
		for (FailureReportMetadata failureReportMetadata : failureReportMetadatas) {
			map.put(failureReportMetadata.getId().getType(), failureReportMetadata.getValue());
		}
		setResult(JSONObject.fromObject(map).toString());
		return "success";
	}
	
	public String saveChange() {
		String[] ps = params.split(" ");
		FailureReportMetadata failureReportMetadata = new FailureReportMetadata();
		failureReportMetadata.setId(new FailureReportMetadataId(ps[0], ps[1]));
		failureReportMetadata.setValue(ps[2]);
		failureReportMetadataService.save(failureReportMetadata);
		return "success";
	}
	*/
	

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public IFracasMetadataService getFracasMetadataService() {
		return fracasMetadataService;
	}

	public void setFracasMetadataService(IFracasMetadataService fracasMetadataService) {
		this.fracasMetadataService = fracasMetadataService;
	}
}
