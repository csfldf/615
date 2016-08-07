package org.sjtu.p615.am.action;

import org.apache.commons.io.IOUtils;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;



import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.IPlanOutputService;
import org.sjtu.p615.entity.Planoutput;

import com.opensymphony.xwork2.ActionSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.*;
import java.net.URLEncoder;
import java.util.List;
import java.util.UUID;

//commented code blocks are only used for CORS environments
public class PlanOutputAction extends ActionSupport
{
	private static final long serialVersionUID = 1L;
	private File file;
	private String filename;
	private String uuid;
	private long totalfilesize;
	private String _method;
	private String planCode;
	
	private InputStream downFileStream;
	private String downFilename;
	
	private IPlanOutputService planOutputService;
	private static String saveDir="uploads";	
	private static File uploadDir;
	
	public String doDelete(){
		if(planCode!=null&&uuid!=null){   		
    		HttpServletResponse resp=ServletActionContext.getResponse();
    		resp.setCharacterEncoding("utf-8");
    		boolean success=false;    	
			java.util.List<Planoutput> list=planOutputService.getPlanOutput(planCode);
			for(Planoutput tmp : list){
				if(tmp.getUUID().equals(uuid)){
					planOutputService.delete(tmp.getPlanOutputCode());
					success=true;
					break;
				}
			}
			resp.setStatus(200);
			       	
			try {
				if(success)
					resp.getWriter().print("{\"success\":true}");
				else
	        		resp.getWriter().print("{\"success\":false}");
			} catch (IOException e) {				
				e.printStackTrace();
			}
		}
		return null;
	}
    
	public String doUpload(){
    	if(uploadDir==null){    		
    		uploadDir=new File(ServletActionContext.getServletContext().getRealPath("/")+saveDir); 
        	uploadDir.mkdirs();        	
    	}   	
    	if(planCode!=null&&uuid!=null){   		
    		HttpServletResponse resp=ServletActionContext.getResponse();
    		resp.setCharacterEncoding("utf-8");
    		boolean success=false;    		
        	try {
        		if(file!=null){
        			FileInputStream fis=new FileInputStream(file);       			
        			File safeFile=new File(uploadDir.getAbsolutePath()+File.separator+uuid+"-"+filename);
        			FileOutputStream fos=new FileOutputStream(safeFile);
        			IOUtils.copy(fis, fos);
        			fos.flush();
        			fos.close();
        			fis.close();       			
        			Planoutput planoutput=new Planoutput();
        			planoutput.setDeleteMark(false);
        			planoutput.setFileName(filename);
        			planoutput.setFilePath(safeFile.getAbsolutePath());
        			planoutput.setTaskCode(planCode);
        			planoutput.setUUID(uuid);
        			planOutputService.addPlanOutput(planoutput);       			
        			success=true;    			   			    			
        		}		
    		} catch (IOException e1) {    			
    			e1.printStackTrace();
    		}       	
			try {
				if(success)
					resp.getWriter().print("{\"success\":true}");
				else
	        		resp.getWriter().print("{\"success\":false}");
			} catch (IOException e) {				
				e.printStackTrace();
			}			
    	}
		return null;    	
    }
    
    public String doDownload() {
    	HttpServletResponse resp=ServletActionContext.getResponse();
		resp.setCharacterEncoding("utf-8");
    	try{
    		if(uuid!=null){
        		List<Planoutput> list=planOutputService.getByUUID(uuid);
        		if(!list.isEmpty()){
        			File file=new File(list.get(0).getFilePath());
        			String name=list.get(0).getFileName();
        			if(file.exists()){
        				downFileStream=new FileInputStream(file);
        				downFilename=URLEncoder.encode(name, "UTF-8");        				
        				return SUCCESS;
        			}
        		}
        	}
    	}catch(IOException e){
    		e.printStackTrace();
    	}    	
		return null;
	}
   
    public String getQquuid() {
		return uuid;
	}

	public void setQquuid(String qquuid) {
		this.uuid = qquuid;
	}

	public long getQqtotalfilesize() {
		return totalfilesize;
	}

	public void setQqtotalfilesize(long qqtotalfilesize) {
		this.totalfilesize = qqtotalfilesize;
	}

	public File getQqfile() {
		return file;
	}

	public void setQqfile(File qqfile) {
		this.file = qqfile;
	}

	public String getSavePath() {
		return saveDir;
	}

	public void setSavePath(String savePath) {
		this.saveDir = savePath;
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

	public String get_method() {
		return _method;
	}

	public void set_method(String _method) {
		this._method = _method;
	}

	public void setPlanCode(String planCode) {
		this.planCode = planCode;
	}

	public InputStream getDownFileStream() {
		return downFileStream;
	}

	public void setDownFileStream(InputStream downFileStream) {
		this.downFileStream = downFileStream;
	}

	public String getDownFilename() {
		return downFilename;
	}

	public void setDownFilename(String downFilename) {
		this.downFilename = downFilename;
	}
	public File getFile() {
		return file;
	}
	public void setFile(File file) {
		this.file = file;
	}
	
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public long getTotalfilesize() {
		return totalfilesize;
	}
	public void setTotalfilesize(long totalfilesize) {
		this.totalfilesize = totalfilesize;
	}


    
}
