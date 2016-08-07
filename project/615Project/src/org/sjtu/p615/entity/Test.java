package org.sjtu.p615.entity;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class Test {
	private Date date;
	private String dateStandin;
	private String content;
	
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getDateStandin() {
		return dateStandin;
	}
	public void setDateStandin(String dateStandin) throws ParseException {
		this.dateStandin = dateStandin;
		SimpleDateFormat format = new SimpleDateFormat("mm/dd/yyyy");
		Date date = new Date(format.parse(dateStandin).getTime());
		setDate(date);
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

}