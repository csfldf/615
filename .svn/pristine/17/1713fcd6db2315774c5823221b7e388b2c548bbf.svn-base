package org.sjtu.p615.am.action;

import com.opensymphony.xwork2.ActionSupport;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;
import org.apache.commons.io.IOUtils;
import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.am.service.DocLibraryService;
import org.sjtu.p615.entity.DocLibrary;
import org.sjtu.p615.util.json.JsonDateValueProcessor;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;

/**
 * Created by Feiyu on 2015/5/17.
 */
public class DocLibraryAction extends ActionSupport {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private DocLibraryService docLibraryService;
    
    private String title;
       
    private String ownerId;
    private String ownerName;

    private File file;
    private String filename;
    private String uuid;
    private long totalfilesize;
    private String _method;
    private String planCode;
    private String projectId;

    private InputStream downFileStream;
    private String downFilename;
    
    private JSONArray jsonary;
    private JSONObject jsonobj;

    private static String saveDir="docLibrary";
    private static File uploadDir;

    public DocLibraryService getDocLibraryService() {
        return docLibraryService;
    }

    public void setDocLibraryService(DocLibraryService docLibraryService) {
        this.docLibraryService = docLibraryService;
    }

    private boolean doUpload(DocLibrary Doclibrary){
        if(uploadDir==null){
            uploadDir=new File(ServletActionContext.getServletContext().getRealPath("/")+saveDir);
            uploadDir.mkdirs();
        }
        if(Doclibrary!=null){
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

                    Doclibrary.setAttachmentName(safeFile.getAbsolutePath());
                    Doclibrary.setModifiedDate(new Date(file.lastModified()));
                    String shuffix=safeFile.getName().substring(safeFile.getName().lastIndexOf('.')+1);
                    Doclibrary.setTitle(filename);
                    Doclibrary.setType(shuffix);
                    Doclibrary.setSize(safeFile.length());
                    Doclibrary.setUuid(uuid);
                    Doclibrary.setProjectId(projectId);
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
                return success;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    public String addOneDoc(){
        DocLibrary doclibrary=new DocLibrary();

        doclibrary.setOwnerId(ownerId);
        doclibrary.setOwnerName(ownerName);        

        boolean success=false;
        success=doUpload(doclibrary);
        if(success){
            docLibraryService.add(doclibrary);
            return null;
        }
        else
            return null;
    }

    private boolean doDelete(String UUID){
        if(UUID!=null&&UUID.equals("")==false){
            HttpServletResponse resp=ServletActionContext.getResponse();
            resp.setCharacterEncoding("utf-8");
            boolean success=false;
            DocLibrary doc=docLibraryService.get(UUID);

            if(doc!=null){
                docLibraryService.del(doc.getUuid());
                success=true;
            }

            resp.setStatus(200);

            try {
                if(success)
                    resp.getWriter().print("{\"success\":true}");
                else
                    resp.getWriter().print("{\"success\":false}");
                return success;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    public String delOneDoc(){
        if(uuid!=null && uuid.equals("")==false){
            boolean success=false;
            success=doDelete(uuid);
            if(success)
                return null;
        }
        return  null;
    }

    private boolean doDownload(String uuid) {
        HttpServletResponse resp=ServletActionContext.getResponse();
        resp.setCharacterEncoding("utf-8");
        try{
            if(uuid!=null && uuid.equals("")==false){
                DocLibrary doc=docLibraryService.get(uuid);
                if(doc!=null){
                    File file=new File(doc.getAttachmentName());
                    String name=file.getName();
                    if(file.exists()){
                        downFileStream=new FileInputStream(file);
                        downFilename= URLEncoder.encode(doc.getTitle(), "UTF-8");
                        return true;
                    }
                }
            }
        }catch(IOException e){
            e.printStackTrace();
        }
        return false;
    }

    public String downloadOneDoc(){
        boolean success=false;
        success=doDownload(uuid);
        if(success)
            return SUCCESS;
        else
            return  null;
    }

    public String getAllDoc(){
        List<DocLibrary> docs = docLibraryService.getAll(projectId);
        for(DocLibrary doc:docs){
        	doc.setAttachmentName("");
        	doc.setDownloadHref("./am/downloadOneDoc?uuid="+doc.getUuid());
        	doc.setDeleteHref("./am/delOneDoc?uuid="+doc.getUuid());
        }

        JsonConfig cfg = new JsonConfig();
        cfg.setJsonPropertyFilter(new PropertyFilter(){
            @Override
            public boolean apply(Object source, String name, Object value) {
                return value == null;
            }
        });
        cfg.registerJsonValueProcessor(java.sql.Date.class, new JsonDateValueProcessor());
        JSONArray jsonarray=JSONArray.fromObject(docs, cfg);
        this.setJsonary(jsonarray);
        return SUCCESS;
    }



    public String get_method() {
        return _method;
    }

    public void set_method(String _method) {
        this._method = _method;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

	public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getPlanCode() {
        return planCode;
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


    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }
}
