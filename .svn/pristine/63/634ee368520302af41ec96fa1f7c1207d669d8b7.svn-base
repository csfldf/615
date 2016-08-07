package org.sjtu.p615.util.json;

import java.util.Date;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import java.text.SimpleDateFormat;

public class JsonDateValueProcessor implements JsonValueProcessor {
	private final String format="yyyy-MM-dd hh:mm:ss";
	@Override
	public Object processArrayValue(Object arg0, JsonConfig arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object processObjectValue(String arg0, Object arg1, JsonConfig arg2) {
		// TODO Auto-generated method stub
		if(arg1==null)
			return "";
		if (arg1 instanceof java.util.Date) {
			String str = new SimpleDateFormat(format).format((Date) arg1);
			return str;
		}
		return arg1.toString();
	}
}
