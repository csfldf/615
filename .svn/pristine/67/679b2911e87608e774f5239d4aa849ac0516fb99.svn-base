package org.sjtu.p615.am.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.IOUtils;
import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.INoticeService;
import org.sjtu.p615.am.service.IPlanService;
import org.sjtu.p615.am.service.IRoleService;
import org.sjtu.p615.entity.DocLibrary;
import org.sjtu.p615.entity.Message;
import org.sjtu.p615.entity.Notice;

import com.opensymphony.xwork2.ActionSupport;

public class NoticeAction extends ActionSupport{
private INoticeService noticeService;
private IPlanService planService;
private IRoleService roleService;
private String id;
private String type;
private String projectId;
private String prjName;
private String title;
private String content;
private String fileName;
private String path;
private String state;
private String empId;
private JSONArray jsonary;
private JSONObject jsonobj;
private String uuid;
private File file;
private static String saveDir="notice";
private static File uploadDir;
private InputStream downFileStream;
private String downFilename;
private boolean doDownload(String id) {
    HttpServletResponse resp=ServletActionContext.getResponse();
    resp.setCharacterEncoding("utf-8");
    try{
        if(id!=null&&!id.equals("")){
            Notice notice=noticeService.getone(Integer.parseInt(id));
            if(notice!=null){
                File file=new File(notice.getPath());
                String name=file.getName();
                if(file.exists()){
                    downFileStream=new FileInputStream(file);
                    downFilename= URLEncoder.encode(notice.getFileName(), "UTF-8");
                    return true;
                }
            }
        }
    }catch(IOException e){
        e.printStackTrace();
    }
    return false;
}
private boolean doUpload(Notice notice){
	
	if(uploadDir==null){
        uploadDir=new File(ServletActionContext.getServletContext().getRealPath("/")+saveDir);
        uploadDir.mkdirs();
    }
	boolean success=false;
    if(notice!=null){
        try {
            if(file!=null){
                FileInputStream fis=new FileInputStream(file);
                File safeFile=new File(uploadDir.getAbsolutePath()+File.separator+uuid+"-"+fileName);
                FileOutputStream fos=new FileOutputStream(safeFile);
                IOUtils.copy(fis, fos);
                fos.flush();
                fos.close();
                fis.close();
                notice.setPath(safeFile.getAbsolutePath());
                notice.setFileName(fileName);
                success=true;
            }
        } catch (IOException e1) {
            e1.printStackTrace();
            return false;
        }
        
    }
    return success;
}
public String addOneNotice(){
	jsonobj=new JSONObject();
	Notice notice=null;
	if(id!=null&&!id.equals("")){
		notice=noticeService.getone(Integer.parseInt(id));
	}else{
		notice=new Notice();
	}
	HttpSession session=ServletActionContext.getRequest().getSession();
    notice.setPrjId(projectId);
    notice.setPrjName(prjName);
    notice.setState(0);
    notice.setTitle(title);
    notice.setType(type);
    notice.setContent(content);
    notice.setEmpId((String)session.getAttribute("employeeId"));
    notice.setEmpName((String)session.getAttribute("employeeName"));
    try{
    	int x=noticeService.addOrUpdate(notice);
    	jsonobj.put("msg", "success");
    	jsonobj.put("id", x);
    }
    catch(Exception e){
    	e.printStackTrace();
    	jsonobj.put("msg", "failed");
    }
	return SUCCESS;
}
public String addOneDoc(){
	//HttpServletResponse resp=ServletActionContext.getResponse();
    //resp.setCharacterEncoding("utf-8");
	jsonobj=new JSONObject();
	Notice notice=null;
	if(id!=null){
		notice=noticeService.getone(Integer.parseInt(id));
	}else{
		notice=new Notice();
	}
	boolean mark=doUpload(notice);
	try{
		if(mark){
			try{
				int x=noticeService.addOrUpdate(notice);
				String tmp="true"+x;
				//resp.getWriter().print("{\"success\":\""+tmp+"\"}");
//				resp.getWriter().print("{\"success\":true,\"id\":'"+x+"'}");
		    	jsonobj.put("success", true);
		    	jsonobj.put("id", x);
			}
			catch(Exception e1){
				e1.printStackTrace();
				//jsonobj.put("msg", "failed");
			}
		}else{
			//resp.getWriter().print("{\"success\":false}");
			jsonobj.put("success", false);
		}
	}catch(Exception e){
		e.printStackTrace();
	}
	return SUCCESS;
}
public String getOnesNotice(){
	HttpSession session=ServletActionContext.getRequest().getSession();
	String ID=(String)session.getAttribute("employeeId");
	try{
		List<Notice> nl=noticeService.get(ID);
		for(Notice tmp:nl){
        	tmp.setDownloadHref("./am/downloadOneNotice?id="+tmp.getId());
        	//tmp.setDeleteHref("./am/delOneNotice?id="+tmp.getId());
        }

		jsonary=JSONArray.fromObject(nl);
	}catch(Exception e){
		e.printStackTrace();
	}
	return SUCCESS;
}
public String publishNotice(){
	jsonobj=new JSONObject();
	try{
		noticeService.publish(Integer.parseInt(id));
		Notice notice=noticeService.getone(Integer.parseInt(id));
		List<String> empIDs=roleService.getEmpIDsByPRJ(notice.getPrjId());
		for(String tmp:empIDs){
			Message message=new Message();
			message.setMessageContent(notice.getContent());
			java.sql.Date now=new java.sql.Date(System.currentTimeMillis());
			message.setEmployeeId(tmp);
			message.setMessageDate(now);
			message.setMessageSource(notice.getPrjName());
			message.setMessageType(notice.getType());
			message.setNoticeId(notice.getId());
			planService.addMessage(message);
		}
		jsonobj.put("success", true);
	}catch(Exception e){
		e.printStackTrace();
		jsonobj.put("success", false);
	}
	return SUCCESS;
}
public String recallNotice(){
	jsonobj=new JSONObject();
	try{
		noticeService.recall(Integer.parseInt(id));
		jsonobj.put("success", true);
	}catch(Exception e){
		e.printStackTrace();
		jsonobj.put("success", false);
	}
	return SUCCESS;
}
public String downloadOneNotice(){
	boolean success=false;
    success=doDownload(id);
    if(success)
        return SUCCESS;
    else
        return  null;
}

public IPlanService getPlanService() {
	return planService;
}
public void setPlanService(IPlanService planService) {
	this.planService = planService;
}
public String getNoticeId(){
	return SUCCESS;
}
public String getUuid() {
	return uuid;
}
public void setUuid(String uuid) {
	this.uuid = uuid;
}
public JSONArray getJsonary() {
	return jsonary;
}
public void setJsonary(JSONArray jsonary) {
	this.jsonary = jsonary;
}
public JSONObject getJsonobj() {
	return jsonobj;
}
public void setJsonobj(JSONObject jsonobj) {
	this.jsonobj = jsonobj;
}
public File getFile() {
	return file;
}
public void setFile(File file) {
	this.file = file;
}
public static String getSaveDir() {
	return saveDir;
}
public static void setSaveDir(String saveDir) {
	NoticeAction.saveDir = saveDir;
}
public static File getUploadDir() {
	return uploadDir;
}
public static void setUploadDir(File uploadDir) {
	NoticeAction.uploadDir = uploadDir;
}
public INoticeService getNoticeService() {
	return noticeService;
}
public void setNoticeService(INoticeService noticeService) {
	this.noticeService = noticeService;
}
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}
public String getPrjId() {
	return projectId;
}
public void setPrjId(String prjId) {
	this.projectId = prjId;
}
public String getTitle() {
	return title;
}
public void setTitle(String title) {
	this.title = title;
}
public String getContent() {
	return content;
}
public void setContent(String content) {
	this.content = content;
}
public String getFileName() {
	return fileName;
}
public void setFileName(String fileName) {
	this.fileName = fileName;
}
public String getPath() {
	return path;
}
public void setPath(String path) {
	this.path = path;
}
public String getState() {
	return state;
}
public void setState(String state) {
	this.state = state;
}
public String getEmpId() {
	return empId;
}
public void setEmpId(String empId) {
	this.empId = empId;
}
public String getProjectId() {
	return projectId;
}
public void setProjectId(String projectId) {
	this.projectId = projectId;
}
public String getPrjName() {
	return prjName;
}
public void setPrjName(String prjName) {
	this.prjName = prjName;
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
public IRoleService getRoleService() {
	return roleService;
}
public void setRoleService(IRoleService roleService) {
	this.roleService = roleService;
}




}
