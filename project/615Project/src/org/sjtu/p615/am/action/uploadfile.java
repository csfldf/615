package org.sjtu.p615.am.action;
import java.sql.Date;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import java.io.File; 
import java.io.FileInputStream; 
import java.io.FileOutputStream; 
import java.io.IOException; 

import org.apache.commons.io.IOUtils;  
import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.entity.Plan;
import org.sjtu.p615.entity.Planoutput;
import org.sjtu.p615.am.service.IPlanService;
import org.sjtu.p615.am.service.PlanService;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import com.opensymphony.xwork2.ActionSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class uploadfile extends ActionSupport{
		 private File file_upload;
		 private String Filename;
		 private String Filepath;
		 private String planCode;
		 

		public String upload()  {
		 
		 try{
		  System.out.println(Filename);
		  System.out.println(file_upload);
		  HttpServletRequest request = ServletActionContext.getRequest();  
		  Filepath=request.getSession().getServletContext().getRealPath("/");
		  System.out.println(Filepath);
		  Filepath = Filepath +"/uploads/";
		  FileInputStream fis = new FileInputStream(file_upload); 
		  File file=new File("E:\\code\\615_2014\\project\\615Project\\uploads",Filename);
	      FileOutputStream fos = new FileOutputStream(file); 
	      IOUtils.copy(fis, fos);  
	        fos.flush();  
	        fos.close();  
	        fis.close();  
		  HttpServletResponse response = ServletActionContext.getResponse();
		  response.setCharacterEncoding("utf-8");
		  response.getWriter().print(file.getPath());
		       return null; //这里不需要页面转向，所以返回空就可以了
		 }
		 catch(Exception e){
			 e.printStackTrace();
				//jsonObject.put("msg", "error");
			 return null;
		 }
		 }
		 public String getFilepath() {
			return Filepath;
		}
		public void setFilepath(String filepath) {
			Filepath = filepath;
		}
		public String getFilename() {
			return Filename;
		}
		public void setFilename(String filename) {
			Filename = filename;
		}
		public File getFile_upload() {
			return file_upload;
		}
		public void setFile_upload(File file_upload) {
			this.file_upload = file_upload;
		}
		 

}
