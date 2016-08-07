package org.sjtu.p615.am.action;

import com.opensymphony.xwork2.ActionSupport;

import java.sql.Date;

import org.sjtu.p615.entity.Test222;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
public class testaction extends ActionSupport{
private Test222 test;
private String testid;
private String testname;
private String testdate;
//private String result;

public String execute() {
	JSONObject jsonObject = new JSONObject();
	try{
		System.out.println(testid);
		System.out.println(testname);
		Date date = java.sql.Date.valueOf(testdate);
		System.out.println(date);
//		System.out.println(test.getTestid());
//		System.out.println(test.getTestname());
//		test.setTestdate(date);
//		System.out.println(test.getTestdate());
		jsonObject.put("success", true);
	}
	catch(Exception e){
		e.printStackTrace();
		jsonObject.put("msg", "error");
	}
	//result = jsonObject.toString();
	return SUCCESS;
}

public String getTestid() {
	return testid;
}

public void setTestid(String testid) {
	this.testid = testid;
}

public String getTestname() {
	return testname;
}

public void setTestname(String testname) {
	this.testname = testname;
}

public String getTestdate() {
	return testdate;
}

public void setTestdate(String testdate) {
	this.testdate = testdate;
}
}
