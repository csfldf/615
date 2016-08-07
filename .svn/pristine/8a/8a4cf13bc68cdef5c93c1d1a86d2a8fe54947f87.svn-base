package org.sjtu.p615.am.action;
import org.sjtu.p615.am.service.IPlanOutputService;
import org.sjtu.p615.am.service.PlanOutputService;

import java.sql.Date;
import java.util.Calendar;
import java.util.Enumeration;
import java.util.List;

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
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import com.opensymphony.xwork2.ActionSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class PlanOutputAction_old extends ActionSupport{
		 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		 private File file_upload;
		 private String Filename;
		 private String Filepath;
		 private IPlanOutputService planOutputService;
		 private String planCode;
		 private String planoutputid;
		 //private String result;
		public String upload()  {
//			HttpServletRequest request=null;
//			 try {
//			 request=ServletActionContext.getRequest();
//			 Enumeration enu=request.getParameterNames();  
//			 while(enu.hasMoreElements()){  
//			 String paraName=(String)enu.nextElement();  
//			 System.out.println(paraName+": "+request.getParameter(paraName));  
//			 }  
//			} 
//			 catch (Exception e) {
//			// TODO: handle exception
//			e.printStackTrace();
//			} 
		 try{
		  System.out.println(Filename);
		  System.out.println(file_upload);
		  HttpServletRequest request = ServletActionContext.getRequest();  
		  //Filepath=request.getSession().getServletContext().getRealPath("/");
		  //System.out.println(Filepath);
		  //Filepath = Filepath +"/uploads/";
		  FileInputStream fis = new FileInputStream(file_upload); 
		  String safeFilename=Calendar.getInstance().getTime().getTime()+"_"+Filename.replace(" ", "_");
		  File file=new File("E:\\Code\\615_2014\\project\\615Project\\uploads",safeFilename);
	      FileOutputStream fos = new FileOutputStream(file); 
	      IOUtils.copy(fis, fos);  
	      fos.flush();  
	      fos.close();  
	      fis.close();
	      Planoutput planoutput=new Planoutput();
	      planoutput.setDeleteMark(false);
	      planoutput.setFileName(Filename);
	      planoutput.setFilePath(file.getPath());
	      planoutput.setTaskCode(planCode);
	      planOutputService.addPlanOutput(planoutput);
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
		public void delete() throws IOException{
			int res=this.planOutputService.delete(Integer.parseInt(planoutputid));
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("utf-8");
			response.getWriter().print(res);
		}
		public String getoutput(){
//			this.planoutputservice=new PlanOutputService();
//			List<Planoutput> output=planoutputservice.getPlanOutput(planCode);
//			JsonConfig cfg = new JsonConfig();
//			cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
//			JSONObject jsonObject = JSONObject.fromObject(output, cfg);
//			//setResult(jsonObject.toString());
			return SUCCESS;
		}
		public File getFile_upload() {
			return file_upload;
		}
		public void setFile_upload(File file_upload) {
			this.file_upload = file_upload;
		}
		public String getFilename() {
			return Filename;
		}
		public void setFilename(String filename) {
			Filename = filename;
		}
		public String getFilepath() {
			return Filepath;
		}
		public void setFilepath(String filepath) {
			Filepath = filepath;
		}
		
		public IPlanOutputService getPlanOutputService() {
			return planOutputService;
		}
		public void setPlanOutputService(IPlanOutputService planOutputService) {
			this.planOutputService = planOutputService;
		}
		public String getPlanCode() {
			return planCode;
		}
		public void setPlanCode(String planCode) {
			this.planCode = planCode;
		}
//		public String getResult() {
//			return result;
//		}
//		public void setResult(String result) {
//			this.result = result;
//		}
		 

}
