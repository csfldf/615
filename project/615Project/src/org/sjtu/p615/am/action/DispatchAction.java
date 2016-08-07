package org.sjtu.p615.am.action;
import com.opensymphony.xwork2.ActionSupport;
public class DispatchAction extends ActionSupport{
private String plancode;
private String planController;
public String dispatch(){
	
	return SUCCESS;
}
}
