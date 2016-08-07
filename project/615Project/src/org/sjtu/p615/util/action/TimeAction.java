package org.sjtu.p615.util.action;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeAction {
  private String result;

  public String getResult() {
    return result;
  }

  public void setResult(String result) {
    this.result = result;
  }

  public String takeServerTime() {
    Date date = new Date(System.currentTimeMillis());
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    result = format.format(date);
    return "success";
  }
}
