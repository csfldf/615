package org.sjtu.p615.entity;

import java.sql.Date;
import java.text.SimpleDateFormat;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class JSONDateValueProcessor implements JsonValueProcessor{

	@Override
	public Object processArrayValue(Object arg0, JsonConfig arg1) {
		// TODO Auto-generated method stub
		return process(arg0);
	}

	@Override
	public Object processObjectValue(String arg0, Object arg1, JsonConfig arg2) {
		// TODO Auto-generated method stub
		return process(arg1);
	}
	
	private Object process(Object obj) {
		//System.out.println(obj.getClass());
		if (obj instanceof Date) {
			Date date = (Date) obj;
			return date.toString();
		}
		return "";
		
	}

}
