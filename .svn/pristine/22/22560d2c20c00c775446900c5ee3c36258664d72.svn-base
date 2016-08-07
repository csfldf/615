package org.sjtu.p615.am.action;

import javax.servlet.*;
import javax.servlet.http.*;  

import java.io.*;  
import java.text.SimpleDateFormat;
import java.util.*;  

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.Task;
import net.sf.mpxj.mpp.MPPReader;

import org.apache.commons.fileupload.*;  
import org.apache.commons.fileupload.servlet.*;  
import org.apache.commons.fileupload.disk.*;  
import org.apache.commons.io.IOUtils;
import org.apache.http.protocol.HttpContext;

import java.io.File;
import java.io.FileInputStream;  
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;  
import java.util.ArrayList;  
import java.util.Calendar;
import java.util.Enumeration;
import java.util.Iterator;  
import java.util.List;  
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xssf.usermodel.XSSFCell;
//import org.apache.poi.xssf.usermodel.XSSFDateUtil;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

//readExcelCell
import org.apache.poi.hwpf.HWPFDocument;  
import org.apache.poi.hwpf.usermodel.Paragraph;  
import org.apache.poi.hwpf.usermodel.Range;  
import org.apache.poi.hwpf.usermodel.Table;  
import org.apache.poi.hwpf.usermodel.TableCell;  
import org.apache.poi.hwpf.usermodel.TableIterator;  
import org.apache.poi.hwpf.usermodel.TableRow;  
import org.apache.poi.poifs.filesystem.POIFSFileSystem;  
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
  


import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.dispatcher.multipart.MultiPartRequestWrapper;
import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.util.ServletContextAware;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ognl.OgnlValueStack;



//readMSProject
import net.sf.mpxj.mpp.*;
import net.sf.mpxj.MPXJException;
import net.sf.mpxj.Relation;
import net.sf.mpxj.Resource;
import net.sf.mpxj.ResourceAssignment;
import net.sf.mpxj.SubProject;
import net.sf.mpxj.Task;
import net.sf.mpxj.ProjectFile;


//import java.util.List;
//import java.io.*;
//import testReadMSProject.testcase;
import java.sql.*;
import java.sql.Date;

@SuppressWarnings({ "unchecked", "serial" })
// Servlet 文件上传  
//public class uploadMultFile extends HttpServlet  
public class  uploadMultFile extends ActionSupport// implements ServletRequestAware,ServletResponseAware, SessionAware, ServletContextAware
{  
    private String filePath = new String();    // 文件存放目录  
    private static String tempPath = new String();    // 临时文件目录  
    private List<String> listData = new ArrayList();			//存放读取的数据
    private List<String> uploadFileList = new ArrayList();		//上传文件列表
    private Boolean uploadMSProErr = false;		//
    private List errorList = new ArrayList();	//错误列表
    
    private String result = new String();		//返回的数据
    
    public String result_test = new String();//测试返回
    private String uploadFiles = new String();//接受前台数据
    private String result_fileNotIn = new String();//返回没有上传的子项目集合
    private List result_clientFileNotIn = new ArrayList();
    private String result_temp = new String();
    
    //uploadfile相关
    private File file_upload;//接受上传的文件
    private String Filename = new String();//上传文件名
    private String Filepath = new String();//上传文件路径

	//    private Map request;
//    private HttpServletResponse response;	//http响应
    private HttpServletRequest req;		//http要求
    private HttpServletResponse res;	//http响应
//    private String file;
    
    //数据库项目
    public String plan_actionID;		//活动项ID
    public String plan_actionType;		//活动项类型
    public String plan_SAVICPonit;		//SAVIC评审点
    public String plan_COMACPoint;		//COMAC评审点
    public String plan_docOwner;		//文档责任人
    public String plan_actionName;		//活动名称
    public String plan_ResourceName;	//资源名称
    public String plan_SPI;				//SPI
    public String plan_completePersent;	//完成百分比
    public String plan_realStartTime;	//实际开始时间
    public String plan_realFinishTime;	//实际完成时间
    public String plan_RemainingDuration;//剩余工期
    public String plan_laborHour;		//工时
    public String plan_timeLimit4Project;//工期
    public String plan_startTime;		//开始时间
    public String plan_finishTime;		//完成时间
    public String plan_basePredictFTime;//比较基准估计完成时间
    public String plan_basePredictSTime;//比较基准估计开始时间
    public String plan_preTask;			//前置任务
    public String plan_successorTask;	//后续任务
    
 
    // 初始化  
//    public void init(ServletConfig config) throws ServletException  
//    {  
//        super.init(config);  
        // 从配置文件中获得初始化参数  
//        filePath = config.getInitParameter("filepath");  
//        tempPath = config.getInitParameter("temppath");  
//// 
//        ServletContext context = getServletContext();  
//// 
//        filePath = context.getRealPath(filePath);  
//        tempPath = context.getRealPath(tempPath); 
//        System.out.println("上传文件目录为："+filePath);
//        System.out.println("临时文件存放目录为："+tempPath);
//        System.out.println("文件存放目录、临时文件目录准备完毕 ...");  
//    }   
      
    // doPost  
//    public void doPost(HttpServletRequest req, HttpServletResponse res)
    public void doPost()  
        throws IOException, ServletException  
    {  
    	//初始化数据
    	listData = new ArrayList();
    	uploadFileList = new ArrayList();
    	uploadMSProErr = false;
//    	java.util.Set < String >  keys  =  request.keySet();
//        //  枚举所有的key值。实际上只有一个key：struts.valueStack 
//        for (String key: keys)
//           System.out.println(key);
//        //  获得OgnlValueStack 对象 
//       OgnlValueStack stack  =  (OgnlValueStack)request.get( "struts.valueStack");
//        // 获得HttpServletResponse对象
//       response = (HttpServletResponse)stack.getContext().get(StrutsStatics.HTTP_RESPONSE);
//       response.getWriter().write("实现RequestAware 接口");
       
//    	req = ServletActionContext.getRequest();
//    	Enumeration<String> name =  req.getParameterNames();
//    	res = ServletActionContext.getResponse();

//    	HttpContext context = (HttpContext) ActionContext.getContext();
//    	filePath = context.RESERVED_PREFIX.valueOf("folder");
    	res = (HttpServletResponse)ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_RESPONSE);
    	req = (HttpServletRequest)ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);
    	filePath = req.getSession().getServletContext().getRealPath("/");
    	tempPath = filePath;
    	filePath += "am\\upload\\";
    	tempPath += "am\\tempdata\\";
    	
    	
    	//不使用拦截器的方法
//		System.out.println(filePath);
		FileInputStream fis = new FileInputStream(file_upload); 
		File file=new File(filePath,Filename);
		FileOutputStream fos = new FileOutputStream(file); 
		IOUtils.copy(fis, fos);  
		fos.flush();  
		fos.close();  
		fis.close();

	    res.setContentType("text/plain;charset=utf-8");  
	    PrintWriter pw = res.getWriter();  
        pw.write(filePath + Filename);
		//使用拦截器的方法
//    	String filename = null;
//    	req.getSession().getServletContext().getAttribute(filename);
//    	System.out.println("i am coming in into:"+filePath);
//    	
//    	
//    	
//        res.setContentType("text/plain;charset=utf-8");  
//        PrintWriter pw = res.getWriter();  
//        try{  
//            DiskFileItemFactory diskFactory = new DiskFileItemFactory();  
//            // threshold 极限、临界值，即硬盘缓存 1M  
//            diskFactory.setSizeThreshold(4 * 1024);  
//            // repository 贮藏室，即临时文件目录  
//            diskFactory.setRepository(new File(tempPath));  
//          
//            ServletFileUpload upload = new ServletFileUpload(diskFactory);  
//            // 设置允许上传的最大文件大小 4M  
//            upload.setSizeMax(4 * 1024 * 1024);  
//            // 解析HTTP请求消息头  
//            List<FileItem> fileItems = new ArrayList<FileItem>();
//            fileItems = upload.parseRequest(req);  
//            Iterator<FileItem> iter = fileItems.iterator();  
//            
//            //获取上传文件名
//            List mppName = new ArrayList();
//            for(int i = 0; i < fileItems.size(); i ++){
//            	String fn = fileItems.get(i).getName();
//            	if(fn != null){
//            		String temp = filePath + fn;
//            		mppName.add(temp);
//            	}
//            }
//            
//            while(iter.hasNext())  
//            {  
//                FileItem item = (FileItem)iter.next();
//                if(item.isFormField())  
//                {  
//                    System.out.println("处理表单内容 ...");  
//                    processFormField(item, pw);  
//                }else{  
//                    System.out.println("处理上传的文件 ...");  
//                    processUploadFile(item, pw, mppName);
//                }
//                
//            }// end while() 
// 
////            pw.write("upload to database complete!");
//            pw.close();  
//        }catch(Exception e){  
//            System.out.println("使用 fileupload 包时发生异常 ...");  
//            e.printStackTrace();
//        }// end try ... catch ...  
        //将计划导入数据库 
        
     //   importPlan2Mysql(uploadFileList);
        
    }// end doPost()  
    
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

	public File getFile_upload() {
		return file_upload;
	}

	public void setFile_upload(File file_upload) {
		this.file_upload = file_upload;
	}

	public String getResult_test() {
		return result_test;
	}

	public void setResult_test(String result_test) {
		this.result_test = result_test;
	}

	public void checkMSP(FileItem item,List fileItems){
        String houzui = item.getName();
        int index = houzui.lastIndexOf(".");  
        houzui = houzui.substring(index + 1, houzui.length());  
    }
 
 
    // 处理表单内容  
    private void processFormField(FileItem item, PrintWriter pw)  
        throws Exception  
    {  
        String name = item.getFieldName();  
        String value = item.getString();          
//        pw.println(name + " : " + value + "\r\n");  
    }  
      
//    // 处理上传的文件  
    private Boolean processUploadFile(FileItem item, PrintWriter pw, List mppName)  
        throws Exception  
    {  
        // 此时的文件名包含了完整的路径，得注意加工一下  
        String filename = item.getName();         
        System.out.println("完整的文件名：" + filename);  
        int index = filename.lastIndexOf("\\");  
        filename = filename.substring(index + 1, filename.length());  
        
 
        long fileSize = item.getSize();  
 
        if("".equals(filename) && fileSize == 0)  
        {             
//            System.out.println("文件名为空 ...");  
        	pw.write("上传文件名为空。。。");
            return false;  
        }  
        File uploadFile = new File(filePath + "/" + filename);          
        

		//上传文件
        item.write(uploadFile);  
        uploadFileList.add(filePath + filename);
        pw.write(filePath + filename);
//        pw.println(filename + " 文件保存完毕 ...");  
//        pw.println("文件大小为 ：" + fileSize + "\r\n");  

        //在后检查文件关联
//        if(filename.contains(".mpp")){
//	    	File file = new File(filePath + filename);
//			MPPReader mppRead = new MPPReader();
//			ProjectFile pf = mppRead.read(file);
//			List subPro = pf.getAllSubProjects();
//			List mppNotIn = new ArrayList();
//			//查看子项目是否在上传队列中
//			Set uploadSet = new HashSet(mppName);
//			String clientLoc = new String();
//			String temp = new String();
//			for(int i = 0; i < subPro.size(); i++){
//				clientLoc = ((SubProject)subPro.get(i)).getFullPath();
//				temp = clientLoc.substring(clientLoc.lastIndexOf("\\")+1,clientLoc.length());
//				temp = filePath + temp;
//				if(!uploadSet.contains(temp)){
//					mppNotIn.add(clientLoc);
//				}
//			}
//			//打印错误信息
//			if(mppNotIn.size() != 0){
//				printErrorInfo(mppNotIn,pw);
//				return false;
//			}
//        }
        return true;

    }  
      
    // doGet  
    public void doGet(HttpServletRequest req, HttpServletResponse res)  
        throws IOException, ServletException  
    {  
//        doPost(req, res);  
    }  
    
    /*局计划导入mysql
     * 
     * ***
     */
	public void readPlan(String planRoute,List fileItems) throws FileNotFoundException, IOException, MPXJException, ServletException{
		String stype = planRoute.substring(planRoute.lastIndexOf(".")+1, planRoute.length());
		if(stype.compareTo("docx")==0 || stype.compareTo("doc")==0)
			readWordCell(planRoute);
		else if(stype.compareTo("xlsx")==0 || stype.compareTo("xls")==0)
			readExcelCell(planRoute);
		else if(stype.compareTo("mpp") == 0)
			readMSProjectCell(planRoute,fileItems);
	}
	
	//read word
    public void readWordCell(String filePath) {  
        FileInputStream in = null;  
        POIFSFileSystem pfs = null;  
//        List<String> list = new ArrayList<String>();  
        try {  
            in = new FileInputStream(filePath);// 载入文档  
            pfs = new POIFSFileSystem(in);  
            HWPFDocument hwpf = new HWPFDocument(pfs);  
            Range range = hwpf.getRange();// 得到文档的读取范围  
            TableIterator it = new TableIterator(range);  
            // 迭代文档中的表格  
            if (it.hasNext()) {  
                TableRow tr = null;  
                TableCell td = null;  
                Paragraph para = null;  
                String lineString;  
                String cellString;  
                Table tb = (Table) it.next();  
                // 迭代行，从第2行开始  
                for (int i = 0; i < tb.numRows(); i++) {  
                    tr = tb.getRow(i);  
                    lineString = "";  
                    for (int j = 0; j < tr.numCells(); j++) {  
                        td = tr.getCell(j);// 取得单元格  
                        // 取得单元格的内容  
                        for (int k = 0; k < td.numParagraphs(); k++) {  
                            para = td.getParagraph(k);  
                            cellString = para.text();  
                            if (cellString != null  
                                    && cellString.compareTo("") != 0) {  
                                // 如果不trim，取出的内容后会有一个乱码字符  
                                cellString = cellString.trim() + "|";  
                            }  
                            lineString += cellString;  
                        }  
                    }  
                    // 去除字符串末尾的一个管道符  
                    if (lineString != null && lineString.compareTo("") != 0) {  
                        lineString = lineString.substring(0, lineString  
                                .length() - 1);  
                    }  
                    listData.add(lineString+"|");  
                }  
            }  
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {  
            if (null != in) {  
                try {  
                    in.close();  
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
//        return list;  
    }  
    
    //read excel
    public void readExcelCell(String fileRoute) throws FileNotFoundException, IOException {
//        List list = new ArrayList();
        String str = new String();
        
		try {
	        XSSFWorkbook xs = new XSSFWorkbook(new FileInputStream(fileRoute));
	        XSSFSheet xssfSheet = xs.getSheetAt(0);
			int totalRows = xssfSheet.getPhysicalNumberOfRows();
			for (int rownum = 0; rownum < totalRows; rownum++) {
				XSSFRow row = xssfSheet.getRow(rownum);
				int colnum = row.getPhysicalNumberOfCells();
				for(int i = 0; i < colnum ; i++){
	                str += XgetCellFormatValue(row.getCell((short) i)).trim() + "|";
				}
				listData.add(str);
				str = "";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
//		return list;
    }
    
    public void readMSProjectCell(String fileRoute,List fileItems) throws MPXJException, IOException, ServletException {
//    	File file = new File("G:\\Program Files\\J2EE\\workplace\\testdata\\软件开发.mpp");
    	String str = new String();
    	String strtmp = "活动项ID|活动项类型|SAVIC评审点|COMAC评审点|文档责任人|活动名称|"
    			+ "资源名称|SPI|完成百分比|实际开始时间|实际完成时间|剩余工期|工时|工期|开始时间|"
    			+ "完成时间|比较基准估计完成时间|比较基准估计开始时间|前置任务|后续任务|是否叶子节点|层级|";
//    	List list = new ArrayList();//存放数据
    	listData.add(strtmp);
    	File file = new File(fileRoute);
		MPPReader mppRead = new MPPReader();
		ProjectFile pf = mppRead.read(file);

//    	if(checkMSSubPro(pf.getAllSubProjects(),fileItems)) //查看相关子项目是否已导入
//    		return;
//    	checkRelatedSubPro(pf);//检查是否有需要的关联子项目
    	
		System.out.println("项目文件 : " + pf.getProjectFilePath());

		List tasks = pf.getAllTasks();
    	
		for (int i = 1; i < tasks.size(); i++) {
			Task task = (Task)tasks.get(i);
			int level = 1;
			Boolean bl = getSubMSProject(task,level+1);
			str = getMSProjectContext(task);
			if(bl) 
				str += "0|" + level + "|";
			else
				str += "1|" + level + "|";
			listData.add(str);
			str = "";
		}
    }
    
    public List getErrorList() {
		return errorList;
	}

	public void setErrorList(List errorList) {
		this.errorList = errorList;
	}
    
    public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getUploadFiles() {
		return uploadFiles;
	}

	public void setUploadFiles(String uploadFiles) {
		this.uploadFiles = uploadFiles;
	}

	public String printErrorInfo(List lostSubPro) throws IOException{
//	public void printErrorInfo() throws IOException{

		//显示错误信息
//		pw.write("related MS subproject files are not selected,please select:\r\n");
//        for(int i = 0,j = 1; i < lostSubPro.size(); i++,j++){
//        	pw.write("缺失文件"+ j + ":" + lostSubPro.get(i).toString() + "\r\n");
//        }
		//测试前台传输数据
//    	List importFList = new ArrayList();
//    	errorList.add("zhao");
//    	errorList.add("yao");
//    	errorList.add("kaka");
//    	errorList.add("douzi");
    	JSONArray jsonobject = JSONArray.fromObject(lostSubPro);
    	result_fileNotIn = jsonobject.toString();
    	return SUCCESS;
    }

	public String importStart() throws IOException, ServletException, MPXJException{


		//测试前台传输数据
//    	errorList.add("zhao");
//    	errorList.add("yao");
//    	errorList.add("kaka");
//    	errorList.add("douzi");
//    	JSONArray jsonobject = JSONArray.fromObject(errorList);
//    	result = jsonobject.toString();
//    	return SUCCESS;
		
		
		//获取相关的request和response对象
    	res = (HttpServletResponse)ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_RESPONSE);
    	req = (HttpServletRequest)ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);
    	filePath = req.getSession().getServletContext().getRealPath("/");
    	filePath += "am\\upload\\";
    	
		//前台文件数据
    	List mppFiles = new ArrayList();
		while(uploadFiles.compareTo("") != 0){
			String fn = uploadFiles.substring(0,uploadFiles.indexOf(";"));
			uploadFiles = uploadFiles.substring(uploadFiles.indexOf(";")+1,uploadFiles.length());
			uploadFileList.add(fn);
			if(fn.contains(".mpp"))
				mppFiles.add(fn);
		}
		//检测相关子项目
		if(mppFiles.size() != 0)
			checkMSSubPro(mppFiles);
		if(result_clientFileNotIn.size() != 0){
	    	JSONArray jsonobject = JSONArray.fromObject(result_clientFileNotIn);
	    	result = jsonobject.toString();
	    	return SUCCESS;
		}
		
		//将数据导入数据库
		importPlan2Mysql(uploadFileList);
    	JSONArray jsonobject = JSONArray.fromObject(result_clientFileNotIn);
    	result = jsonobject.toString();
		return SUCCESS;
    }
	
    public Boolean checkMSSubPro(List allSubPro) throws IOException, ServletException, MPXJException{
    	
    	//检测与父项目关联的子项目是否导入
    	List allSP = new ArrayList();
    	for(int i = 0; i < allSubPro.size(); i++){
    		String fp = (String)allSubPro.get(i);
//    		String fn = fp.substring(fp.lastIndexOf("\\")+1,fp.length());
//    		String rfp = filePath + fn;
	    	File file = new File(fp);
			MPPReader mppRead = new MPPReader();
			ProjectFile pf = mppRead.read(file);
			allSP.addAll(pf.getAllSubProjects());
    	}
    	
    	//获取路径
    	Map allsppM = new HashMap();
    	for(int i = 0; i < allSP.size(); i++){
    		String tmp = ((SubProject)allSP.get(i)).getFullPath();
    		String rtmp = tmp;
    		tmp = tmp.substring(tmp.lastIndexOf("\\")+1,tmp.length());
    		tmp = filePath + tmp;//子项目上传到服务器的路径
    		allsppM.put(tmp, rtmp);
    	}
    	//检测子项目是否上传
    	Set allsppS = new HashSet(allSubPro);
    	Iterator it=allsppM.keySet().iterator(); 
    	while(it.hasNext()){ 
    	    String serverRoute; 
    	    String clientRoute; 
    	    serverRoute = it.next().toString(); 
    	    clientRoute = (String) allsppM.get(serverRoute); 
    	    if(!allsppS.contains(serverRoute))//若没有上传加入报错队列
    	    	result_clientFileNotIn.add(clientRoute);
    	    else{
    	    	uploadFileList.remove(serverRoute);//将上传的子项目从导入列表中删除，防止重复插入数据库
    	    }
	    } 
    	if(result_clientFileNotIn.size() != 0){//存在未上传的子项目文件，返回真值并报错
			uploadMSProErr = true;
			return true;
		}
		else{//将子项目从插入列表中删除
			uploadMSProErr = false;
			return false;
		}
    	
    	//检测与父项目关联的子项目是否导入
//    	Map fMap = new HashMap();
//    	Set fSet = new HashSet(fileItems);
//    	List tmpList = new ArrayList();
//    	for(int i = 0; i < allSubPro.size(); i++){
//    		String tmpRoute = ((SubProject)allSubPro.get(i)).getFullPath();
//    		String tmpFile = tmpRoute.substring(tmpRoute.lastIndexOf("\\")+1,tmpRoute.length());
//    		tmpFile = filePath + tmpFile;
//    		if(!fSet.contains(tmpFile)){
//    			result_clientFileNotIn.add(tmpRoute);
//    		}
//    	}
//    	if(result_clientFileNotIn.size() != 0){
////    		printErrorInfo(tmpList);
////    		result_clientFileNotIn = tmpList
//    		uploadMSProErr = true;
//    		return true;
//    	}
//    	else{
//    		uploadMSProErr = false;
//    		return false;
//    	}
    	
    	
    	
    	
//		WriteSubPro(importFList);
		/*
		 * 列出未上传的MSProject关联文件名单
		 * */
//    	RequestDispatcher dispatcher = req.getRequestDispatcher("/am/wrongInfo.jsp");
//    	dispatcher.forward(req, res);

//    	req.setAttribute("tipMessage", "提交成功！");
//		res.setContentType("text/html; charset=UTF-8"); //转码
//	    PrintWriter out = res.getWriter();
//    	out.print("alert('请先删除下级数据！');history.go(-1);");
//	    out.println("<script>alert('i am comming!!');history.back();</script>");
//    	out.close();
//		if(importFList.size() != 0)
//		{
//			String defstr = new String();
//			defstr = "mpp文件中相关联的子项目：\r\n";
//			for(int i = 0; i < importFList.size(); i++)
//				defstr += (String)(importFList.get(i)) + "\r\n";
////			req.setAttribute("message", "此用户名不存在，请确认后再输入！");
//		    out.flush();
//		    out.println("<script>alert('i am comming!!');history.back();</script>");
////		    out.println("alert('"+defstr+"');");
//			return;
//		}
    }
    
    @SuppressWarnings("null")
	public void WriteSubPro(List importFiles) throws IOException{
    	
        res.setContentType("text/plain;charset=gbk");  
        PrintWriter pw = res.getWriter();  
        try{  
            DiskFileItemFactory diskFactory = new DiskFileItemFactory();  
            // threshold 极限、临界值，即硬盘缓存 1M  
            diskFactory.setSizeThreshold(4 * 1024);  
            // repository 贮藏室，即临时文件目录  
            diskFactory.setRepository(new File(tempPath));  
          
            ServletFileUpload upload = new ServletFileUpload(diskFactory);  
            // 设置允许上传的最大文件大小 4M  
            upload.setSizeMax(4 * 1024 * 1024);  
            // 解析HTTP请求消息头  
//            List<FileItem> fileItems = new ArrayList<FileItem>();
//            fileItems = upload.parseRequest(req);  
//            Iterator<FileItem> iter = fileItems.iterator();  
//            Iterator iter = importFiles.iterator();
            
            for(int i = 0; i < importFiles.size(); i++)
            {  
                FileItem item = null;//(FileItem)importFiles.get(i);//(FileItem)iter.next();  
                
//                String filename = item.getName();         
//                System.out.println("完整的文件名：" + filename);  
//                int index = filename.lastIndexOf("\\");  
//                filename = filename.substring(index + 1, filename.length());  
         
//                long fileSize = item.getSize();  
//         
//                if("".equals(filename) && fileSize == 0)  
//                {             
//                    System.out.println("文件名为空 ...");  
//                    return;  
//                }  
                String filename = new String();
                filename = (String)importFiles.get(i);
                int index = filename.lastIndexOf("\\");  
                filename = filename.substring(index + 1, filename.length()); 
                File uploadFile = new File(filePath + "/" + filename);  
                item.write(uploadFile);  
//                pw.println(filename + " 文件保存完毕 ...");  
//                pw.println("文件大小为 ：" + fileSize + "\r\n");  
            }// end while() 
            //将计划导入数据库 
 
            pw.write("upload to database complete!");
            pw.close();  
        }catch(Exception e){  
            System.out.println("使用 fileupload 包时发生异常 ...");  
            e.printStackTrace();  
        }// end try ... catch ...  
    }
    
    public void checkRelatedSubPro(ProjectFile proFile) throws IOException{//检测关联的
    	List subProList = proFile.getAllSubProjects();
    	List subProNamList = new ArrayList();
    	for(int i = 0; i < subProList.size(); i++){
    		subProNamList.add(((SubProject)subProList.get(i)).getFullPath());
    	}
    	JSONArray.fromObject(subProNamList).write(res.getWriter());  
    	res.getWriter().write("Hello,AlvinKing , A message from server");
    }
    
    public Boolean getSubMSProject(Task task,int level) throws MPXJException{
    	if(task.getSubProject() != null){
    		String str = new String();
//    		File file = new File(task.getSubProject().getFullPath());
    		MPPReader mppR = new MPPReader();
    		
    		//监测该文件是否已上传
    		String fpth = task.getSubProject().getFullPath();
    		fpth = fpth.substring(fpth.lastIndexOf("\\")+1,fpth.length());
    		fpth = filePath + fpth;//将路径转换为服务器路径(该文件已被上传到服务器)
//    		Set uploadFileSet = new HashSet(uploadFileList);
//    		if(!uploadFileSet.contains(fpth))
//    			return false;
    		
    		//读取关联子项目
    		File file = new File(fpth);
    		ProjectFile pfile = mppR.read(file);
    		List tmplist = new ArrayList();
    		tmplist = pfile.getAllTasks();
    		for(int i = 1; i < tmplist.size(); i++){
    			Boolean bl = getSubMSProject((Task)tmplist.get(i),level+1);
    			str = getMSProjectContext((Task)tmplist.get(i));
    			if(bl)
    				str += "0|" + level + "|";
    			else
    				str += "1|" + level + "|";
    			listData.add(str);
    			str = "";
    		}
    		return true;
    	}
    	return false;
    }
    
    @SuppressWarnings("deprecation")
	public String getMSProjectContext(Task task){
    	String str = "";
    	if(task.getName() != null) str += task.getName().trim() + "|"; //get 活动项ID
    	if(task.getText1() != null) str += task.getText1().trim() + "|";//get 活动项类型
    	if(task.getNumber1() != null) str += String.valueOf(task.getNumber1()).trim() + "|";//SAVIC评审点
    	if(task.getNumber2() != null) str += String.valueOf(task.getNumber2()).trim() + "|";//COMAC评审点
    	if(task.getText2() != null) str += task.getText2().trim() + "|";//文档责任人
    	if(task.getText3() != null) str += task.getText3().trim() + "|";//活动名称
    	if(this.getMSPResource(task) != null) str += this.getMSPResource(task).trim() + "|";//资源名称
    	if(task.getNumber3() != null) str += String.valueOf(task.getNumber3()).trim() + "|";//SPI
    	if(task.getPercentageComplete() != null) str += String.valueOf(task.getPercentageComplete()).trim() + "|";//完成百分比
    	if(task.getActualStart() != null) str += task.getActualStart().toLocaleString().trim() + "|";//实际开始时间
    	if(task.getActualFinish() != null) str += task.getActualFinish().toLocaleString().trim() + "|";//实际完成时间
//    	System.out.println(task.getActualFinish().toGMTString()+"---");
//    	System.out.println(task.getActualFinish().toLocaleString()+"---");
//    	System.out.println(task.getActualFinish().getYear()+"-"+task.getActualFinish().getMonth()+":"+task.getActualFinish().getDay()+"::"+task.getActualFinish().getDate());
    	if(task.getRemainingDuration() != null) 	str += String.valueOf(task.getRemainingDuration()).trim() + "|";//剩余工期
    	if(task.getDuration() != null) str += String.valueOf(task.getDuration()).trim() + "|" ;//工时
    	if(task.getDuration1() != null) str += String.valueOf(task.getDuration1()).trim() + "|";//工期
    	if(task.getStart() != null) 	str += task.getStart().toLocaleString().trim() + "|";//开始时间
    	if(task.getFinish() != null) str += task.getFinish().toLocaleString().trim() + "|";//完成时间
    	if(task.getBaselineFinish() != null) str += task.getBaselineFinish().toLocaleString().trim() + "|";//比较基准完成时间
    	if(task.getBaselineStart() != null) str += task.getBaselineStart().toLocaleString().trim() + "|";//比较基准开始时间
		List prelist = task.getPredecessors();//前置任务
		List suclist = task.getSuccessors();//后续任务
		String pretsk = "";
		String suctsk = "";
		if(prelist != null)
			for(int j = 0; j < prelist.size(); j++){
				pretsk += (((Relation)prelist.get(j)).getTargetTask()).getName().trim() + " ";
			}
		if(suclist != null)
			for(int j = 0; j < suclist.size(); j++){
				suctsk += (((Relation)suclist.get(j)).getTargetTask()).getName().trim() + " ";
			}
		str += pretsk.trim() + "|";
		str += suctsk.trim() + "|";
		
		return str;
    }
    
    public String getMSPResource(Task task) {
		StringBuffer buf = new StringBuffer();
		List assignments = task.getResourceAssignments();
		for (int i = 0; i < assignments.size(); i++) {
			ResourceAssignment assignment = (ResourceAssignment) assignments
					.get(i);
			Resource resource = assignment.getResource();

			if (resource != null) {
				buf.append(resource.getName()).append(" ");
			}
		}
		return buf.toString();
	}
    
    private String XgetCellFormatValue(XSSFCell cell){
    	String cellvalue = "";
        if (cell != null) {
            // 判断当前Cell的Type
            switch (cell.getCellType()) {
            // 如果当前Cell的Type为NUMERIC
            case XSSFCell.CELL_TYPE_NUMERIC:
            case XSSFCell.CELL_TYPE_FORMULA: {
                // 判断当前的cell是否为Date
//                if (XSSFDateUtil.isCellDateFormatted(cell)) {
                if(DateUtil.isCellDateFormatted(cell)){
                	cellvalue = new DataFormatter().formatRawCellContents(cell.getNumericCellValue(), 0, "yyyy-mm-dd");
                    // 如果是Date类型则，转化为Data格式
                    
                    //方法1：这样子的data格式是带时分秒的：2011-10-12 0:00:00
                    //cellvalue = cell.getDateCellValue().toLocaleString();
                    
                    //方法2：这样子的data格式是不带带时分秒的：2011-10-12
                    
                }
                // 如果是纯数字
                else {
                    // 取得当前Cell的数值
                    cellvalue = String.valueOf(cell.getNumericCellValue());
                }
                break;
            }
            // 如果当前Cell的Type为STRIN
            case HSSFCell.CELL_TYPE_STRING:
                // 取得当前的Cell字符串
                cellvalue = cell.getRichStringCellValue().getString();
                break;
            // 默认的Cell值
            default:
                cellvalue = " ";
            }
        } else {
            cellvalue = "";
        }
        return cellvalue;
    }
    
    private String getCellFormatValue(HSSFCell cell) {
        String cellvalue = "";
        if (cell != null) {
            // 判断当前Cell的Type
            switch (cell.getCellType()) {
            // 如果当前Cell的Type为NUMERIC
            case HSSFCell.CELL_TYPE_NUMERIC:
            case HSSFCell.CELL_TYPE_FORMULA: {
                // 判断当前的cell是否为Date
                if (HSSFDateUtil.isCellDateFormatted(cell)) {
                    // 如果是Date类型则，转化为Data格式
                    
                    //方法1：这样子的data格式是带时分秒的：2011-10-12 0:00:00
                    //cellvalue = cell.getDateCellValue().toLocaleString();
                    
                    //方法2：这样子的data格式是不带带时分秒的：2011-10-12
                    Date date = (Date) cell.getDateCellValue();
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    cellvalue = sdf.format(date);
                    
                }
                // 如果是纯数字
                else {
                    // 取得当前Cell的数值
                    cellvalue = String.valueOf(cell.getNumericCellValue());
                }
                break;
            }
            // 如果当前Cell的Type为STRIN
            case HSSFCell.CELL_TYPE_STRING:
                // 取得当前的Cell字符串
                cellvalue = cell.getRichStringCellValue().getString();
                break;
            // 默认的Cell值
            default:
                cellvalue = " ";
            }
        } else {
            cellvalue = "";
        }
        return cellvalue;

    }
    
    //链接mysql，将数据导入
    public void importPlan2Mysql(List fileList) {  
        	String username = "root";
            String password = "xi";
            String url = "jdbc:mysql://localhost:3306/c919";

            try {
            	//连接数据库
                String driver = "com.mysql.jdbc.Driver";
                Class.forName(driver);
                Connection cn = DriverManager.getConnection(url, username,
                        password);
                PreparedStatement Statement;
                //表中不要的信息
                Map insert2SQL = new HashMap();
                insert2SQL.put("活动项ID","PlanCode");
//                insert2SQL.put("文档责任人","PlanController");
                insert2SQL.put("活动名称","PlanName");
                insert2SQL.put("资源名称","PlanSource");
                insert2SQL.put("实际开始时间","PlanStartDate");
                insert2SQL.put("实际完成时间","PlanFinishDate");
                insert2SQL.put("开始时间","PlanIssuedDate");
                insert2SQL.put("完成时间","PlanDeadlineDate");
                insert2SQL.put("前置任务","ParentCode");
                insert2SQL.put("是否叶子节点","Leaf");
                insert2SQL.put("层级","Level");
//                Iterator fIter = fileList.iterator();  
//                while(fIter.hasNext()){
                for(int i = 0; i < fileList.size(); i++){
//                	FileItem item = (FileItem)fIter.next();  
//                	String fpath=item.getName();
//                	String fpath = (String)fIter.toString();
                	String fpath = (String)fileList.get(i);
                	if(fpath==null) continue;
                	String filename = fpath.substring(fpath.lastIndexOf("\\")+1, fpath.length());
                	String fileloc = filePath + filename;
                	System.out.println(fileloc);
//                	List list = new ArrayList();
//                	list = readPlan(fileloc);
                	readPlan(fileloc,fileList);
                	if(uploadMSProErr){
                	//	printErrorInfo();
                		return;
                	}
                	if(listData==null) continue;
	                boolean one=true;
//	                String[] strColArray=new String[30];
	                List ColList = new ArrayList();
	                List rColList = new ArrayList();
	                Iterator iter = listData.iterator();
	                while(iter.hasNext()) {  
	                    String str = (String) iter.next();  
	                    int accstr=0;
	                    
	                    //读取列属性
	                    if(one){
	                    	one=false;
	                    	while(str.compareTo("")!=0){
	    	                	String tmpstr=str.substring(0, str.indexOf("|"));
	    	                	str=str.substring(str.indexOf("|")+1, str.length());
//	    	                	System.out.println(tmpstr);
	    	                	if(tmpstr!="\0"){
	    	                		ColList.add(tmpstr);
	    	                		if(insert2SQL.containsKey(tmpstr))
	    	                			rColList.add(insert2SQL.get(tmpstr));
//	    	                			strColArray[accstr++]=tmpstr;
	    	                	}
	                    	}
	                    }     
	                    else{
	                    //在表中插入数据
	                    	List valueList = new ArrayList();
	                    	int k = 0;
	                    	int index = 0;
	                    	String strEmployee = new String();
	                    	
	                    	//需要查找的属性
		                    String strPlanSerialNumber = new String();//产品序列号
		                    String strRoleID = new String();//角色ID
//		                    String strPlanState = "待审核";//任务状态
//		                    String strChangeDetail = new String();//备注
//		                    String strComplete = new String();//是否完成
//		                    String strReviewer = new String();
//		                    int intDeleteMark = 0;
		                    
		                    int intPlanKey = 0;
		                    while(str.compareTo("")!=0){
		                    	String tmpstr = str.substring(0, str.indexOf("|"));
		                    	str=str.substring(str.indexOf("|")+1, str.length());
		                    	String col = (String) ColList.get(k++);
	                    		if(col.compareTo("文档责任人") == 0)
	                    			strEmployee = tmpstr;
		                    	if(insert2SQL.containsKey(col)){
		                    		if(col.compareTo("活动项ID") == 0)
		                    			strPlanSerialNumber = "P" + tmpstr.substring(1,tmpstr.length());
		                    		valueList.add(tmpstr);
		                    	}
	                    	}
		                    //查找roleID
		                    String strEmployeeID = new String();
		                    Statement = cn.prepareStatement("select EmployeeNumber from employee where EmployeeName = '"+strEmployee+"'");
		                    ResultSet resEmployeeID = Statement.executeQuery();
		                    while(resEmployeeID.next()){
		                    	strEmployeeID = resEmployeeID.getString("EmployeeNumber");
							}
		                    Statement = cn.prepareStatement("select RoleId from role where EmployeeId = '"+strEmployeeID+"'");
		                    ResultSet resRoleID = Statement.executeQuery();
		                    while(resRoleID.next()){
		                    	strRoleID = resRoleID.getString("RoleId");
							}
		                    
		                    //向数据库中插入数据
		                    String strPlanCodeIndex = (String)rColList.get(0);
		                    String strPlanCode = (String)valueList.get(0);
		                    Statement=cn.prepareStatement("insert into plan ("+strPlanCodeIndex+") VALUES('"+
		                    		strPlanCode+"')");
		                    Statement.execute();
		                    for(int m = 1; m < rColList.size(); m++){
		                    	String strCol = (String)rColList.get(m);
		                    	String strColValue = (String)valueList.get(m);
		                    	if(strCol.contains("Date")){
		                    		strColValue = strColValue.substring(0,strColValue.indexOf(" "));
		                    	}
	    	                	Statement=cn.prepareStatement("update plan set "+strCol+
	                			"='"+strColValue+"' where "+strPlanCodeIndex+" ='"+strPlanCode+"'");
	    	                	Statement.executeUpdate();
	                    	
		                    }
		                    //网数据库中插入查找到的roleID和PlanSerialNumber
    	                	Statement=cn.prepareStatement("update plan set RoleId ='"+strRoleID+
    	                			"' where "+strPlanCodeIndex+" ='"+strPlanCode+"'");
    	                	Statement.executeUpdate();
    	                	Statement=cn.prepareStatement("update plan set PlanSerialNumber='"+strPlanSerialNumber+
    	                			"' where "+strPlanCodeIndex+" ='"+strPlanCode+"'");
    	                	Statement.executeUpdate();
		                    
	                    }
	                }
                }  
            } catch (ClassNotFoundException cnfex) {
                System.out.println("装载JDBC/ODBC 驱动程序失败");
                cnfex.printStackTrace();
            } catch (SQLException sqlex) {
                System.out.println("无法联接数据库");
                sqlex.printStackTrace();
            } catch (Exception ex) {
                System.out.println("NoClassDefException");
                ex.printStackTrace();
            }
            //System.out.println("link to mysql successful!!!");
        }
    
} 