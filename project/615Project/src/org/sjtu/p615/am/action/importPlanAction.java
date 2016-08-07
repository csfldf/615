package org.sjtu.p615.am.action;

import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import java.net.URLEncoder;
import java.lang.reflect.*;

//readMSProject
import net.sf.mpxj.mpp.*;
import net.sf.mpxj.mspdi.MSPDIWriter;
import net.sf.mpxj.utility.NumberUtility;
import net.sf.mpxj.writer.ProjectWriter;
import net.sf.mpxj.Duration;
import net.sf.mpxj.MPXJException;
import net.sf.mpxj.ProjectCalendar;
import net.sf.mpxj.Relation;
import net.sf.mpxj.RelationType;
import net.sf.mpxj.Resource;
import net.sf.mpxj.ResourceAssignment;
import net.sf.mpxj.Task;
import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.TimeUnit;
import net.sf.mpxj.mpx.MPXWriter;
import net.sf.mpxj.SubProject;
import net.sf.mpxj.reader.ProjectReader;
import net.sf.mpxj.DateRange;
import net.sf.mpxj.Day;
import net.sf.mpxj.ProjectCalendarHours;
import net.sf.mpxj.ProjectHeader;

import java.io.File; 
import java.io.FileInputStream; 
import java.io.FileOutputStream; 
import java.io.IOException; 
import java.io.InputStream;
import java.io.OutputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;

import org.apache.commons.io.IOUtils;  
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.sjtu.p615.entity.Plan;
import org.sjtu.p615.am.service.IPlanService;
import org.sjtu.p615.am.service.PlanService;
import org.sjtu.p615.util.json.JsonDateValueProcessor;
import org.apache.http.protocol.HttpContext;
import org.apache.poi.hssf.model.Sheet;
import org.apache.poi.hssf.record.formula.functions.Row;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.struts2.ServletActionContext;
import org.sjtu.p615.entity.Planoutput;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;





































import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.ArrayList;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.JFileChooser;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.apache.struts2.ServletActionContext;
import org.jawin.COMException;  
import org.jawin.DispatchPtr;
import org.jawin.win32.Ole32;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.sjtu.p615.entity.Employee;
import org.sjtu.p615.entity.Project;
import org.sjtu.p615.am.service.IEmployeeService;
import org.sjtu.p615.am.service.IProjectService;
import org.sjtu.p615.am.service.IRoleService;
import org.sjtu.p615.am.service.IScriptService;
import org.sjtu.p615.am.service.ProjectService;
import org.sjtu.p615.am.service.RoleService;
import org.sjtu.p615.am.service.ScriptService;
import org.sjtu.p615.util.json.JsonDateValueProcessor;
import org.sjtu.p615.entity.Plan;
import org.sjtu.p615.entity.PlanRemind;
import org.sjtu.p615.entity.Role;
import org.sjtu.p615.entity.Script;
import org.sjtu.p615.am.service.EmployeeService;
import org.sjtu.p615.am.service.IPlanService;

import com.opensymphony.xwork2.ActionSupport;

public class importPlanAction extends ActionSupport{
	private static final long serialVersionUID = 1L;
	
	private String qquuid;
	private String qqfilename;
	private File qqfile;
//	private List<String> projectList = new ArrayList<String>();
	private String projectControllerName;
	private String projectControllerId;
	private String projectName;
	private String projectId;
	private String projectList;
    private static int SUCCESS_RESPONSE_CODE = 200;
    private static int FAILURE_RESPONSE_CODE = 300;
	
	private IPlanService planService;
	private IEmployeeService employeeService;
	private IProjectService projectService;
	private IRoleService roleService;

	private JSONArray jsonary;
	private JSONObject jsonobj;
	private String result;
	
	private List allTasks = new ArrayList<>();
	private List<String> importData = new ArrayList<>();
	private List<String> importTitleList = new ArrayList<>();
	private List<String> exportTitleList = new ArrayList<>();
	public List<String> uploadFileList = new ArrayList<>();
	private Map<String,String> plan2mpp = new HashMap<String,String>();//存放从plan到mpp表的映射
	private Map<String,String> plan2xls = new HashMap<String,String>();//存放从plan到xls表的映射
	private Map<String,String> chn2Eng = new HashMap<String,String>();
	private Set<String> str_s = new HashSet<String>();//存放字符型列名
	private Set<String> int_s = new HashSet<String>();//存放数字型列名
	private Set<String> date_s = new HashSet<String>();//存放日期型列名
	private Set<String> bool_s = new HashSet<String>();//存放布尔型列名
	private Set<String> double_s = new HashSet<String>();//存放浮点型列名
	private List<Map<String,String>> import2SqlData = new ArrayList<>();
	private List<Map<String,Object>> export2SqlData = new ArrayList<>();
	private Map<String,Role> role_map = new HashMap<String,Role>();//用来存放导入数据时的人员信息
	private Map<String,Role> roleName2Role = new HashMap<String,Role>();//角色名到角色映射
	private int importInfo = 0;//为0表示正常，1表示导入成员出现问题
	private String projectIdNew = new String();
	private String taskTypeObj = new String();
	private ProjectFile proFile_para = null;
	private Task task_para = null;

	public void initDBSet(){
		int_s.add("planKey");
		int_s.add("parentKey");
		int_s.add("planStateCode");
		int_s.add("level");
		int_s.add("planRemainingDate");

		date_s.add("planIssuedDate");
		date_s.add("planDeadlineDate");
		date_s.add("planStartDate");
		date_s.add("planFinishDate");
		date_s.add("baselineFinishTime");
		date_s.add("baselineStartTime");

		bool_s.add("back");
		bool_s.add("leaf");
		bool_s.add("complete");
		bool_s.add("accept");
		bool_s.add("issue");
		bool_s.add("deleteMark");
		bool_s.add("isTask");

		double_s.add("savic");
		double_s.add("comac");
		double_s.add("spi");
		double_s.add("completePercentage");
		double_s.add("taskWeight");
		double_s.add("budget");
		double_s.add("cashReal");
	}

	public void initialTitle(){
		//初始化导入数据库的标题
		/*String impTitle = "parentPlanCode|projectId|projectName"
    			+ "|planCode|planSerialNumber|planName|planIssuedDate|planDeadlineDate"
    			+ "|planStartDate|planFinishDate|planSource|employeeId"
    			+ "|planController|employeeName|planStateCode|reviewer|leaf|level|changeDetail"
    			+ "|complete|accept|issue|deleteMark|planType|savic|comac|spi|completePercentage"
    			+ "|remainingDuration|remainingHour|remainingPeriod|baselineFinishTime|baselineStartTime"
    			+ "|predecessor|successor|";*/
		String impTitle = "parentPlanCode|projectId|projectName"
    			+ "|planCode|planName|planIssuedDate|planDeadlineDate"
    			+ "|planStartDate|planFinishDate|planSource|employeeId"
    			+ "|planController|employeeName|planStateCode|reviewer|leaf|level"
    			+ "|deleteMark|spi|completePercentage"
    			+ "|remainingDuration|remainingHour|remainingPeriod"
    			+ "|predecessor|successor|";
		plan2mpp.put("wbs", "WBS");
		plan2mpp.put("planName", "Name");
		plan2mpp.put("planIssuedDate", "Start");
		plan2mpp.put("planDeadlineDate", "Finish");
		plan2mpp.put("controlDepartment", "Text1");
		plan2mpp.put("planController", "Text2");
//		plan2mpp.put("planOutput", "Text3");
		plan2mpp.put("budget", "Text4");
		plan2mpp.put("cashFlow", "Text5");
		plan2mpp.put("cashSource", "Text6");
		plan2mpp.put("cashSubject", "Text7");
		plan2mpp.put("cashReal", "Text8");
		plan2mpp.put("reviewer", "Text9");
//		plan2mpp.put("spi", "SPI");
		plan2mpp.put("completePercentage", "PercentageComplete");
		plan2mpp.put("remainingHour", "Work");
		plan2mpp.put("remainingDuration", "Duration");
		plan2mpp.put("remainingPeriod", "RemainingDuration");
		plan2mpp.put("planStartDate", "ActualStart");
		plan2mpp.put("planFinishDate", "ActualFinish");
		plan2mpp.put("predecessor", "Predecessors");
		plan2mpp.put("successor", "Successors");
    	String copyTitle = impTitle;
    	while(!copyTitle.equals("")){
    		String tmpstr = new String();
    		tmpstr = copyTitle.substring(0, copyTitle.indexOf("|"));
    		copyTitle = copyTitle.substring(copyTitle.indexOf("|")+1,copyTitle.length());
    		importTitleList.add(tmpstr);
    	}

		//初始化中英文标对
		chn2Eng.put("wbs","wbs");
		chn2Eng.put("任务名称","planName");
		chn2Eng.put("开始时间","planIssuedDate");
		chn2Eng.put("完成时间","planDeadlineDate");
		chn2Eng.put("负责部门","controlDepartment");
		chn2Eng.put("负责人","planController");
		chn2Eng.put("交付物","planOutput");
		chn2Eng.put("费用预算","budget");
		chn2Eng.put("收入/支出","cashFlow");
		chn2Eng.put("经费来源","cashSource");
		chn2Eng.put("费用科目","cashSubject");
		chn2Eng.put("实际金额","cashReal");
		chn2Eng.put("备注","reviewer");
		chn2Eng.put("SPI","spi");
		chn2Eng.put("完成百分比","completePercentage");
		chn2Eng.put("工时","remainingHour");
		chn2Eng.put("工期","remainingDuration");
		chn2Eng.put("剩余工期","remainingPeriod");
		chn2Eng.put("实际开始时间","planStartDate");
		chn2Eng.put("实际完成时间","planFinishDate");
		chn2Eng.put("WBS前置任务","predecessor");
		chn2Eng.put("WBS后置任务","successor");
    	
    	//初始化导出数据库的标题
    	plan2xls.put("Wbs","wbs");
    	plan2xls.put("PlanName","任务名称");
    	plan2xls.put("PlanIssuedDate","开始时间");
    	plan2xls.put("PlanDeadlineDate","完成时间");
    	plan2xls.put("ControlDepartment","负责部门");
    	plan2xls.put("PlanController","负责人");
//    	plan2xls.put("planOutput","交付物");
    	plan2xls.put("Budget","费用预算");
    	plan2xls.put("CashFlow","收入/支出");
    	plan2xls.put("CashSource","经费来源");
    	plan2xls.put("CashSubject","费用科目");
    	plan2xls.put("CashReal","实际金额");
    	plan2xls.put("Reviewer","备注");
//    	plan2xls.put("spi","SPI");
    	plan2xls.put("CompletePercentage","完成百分比");
    	plan2xls.put("RemainingHour","工时");
    	plan2xls.put("RemainingDuration","工期");
    	plan2xls.put("RemainingPeriod","剩余工期");
    	plan2xls.put("PlanStartDate","实际开始时间");
    	plan2xls.put("PlanFinishDate","实际完成时间");
    	plan2xls.put("Predecessor","WBS前置任务");
    	plan2xls.put("Successor","WBS后置任务");
	    String[] expTitle = {"wbs","任务名称","开始时间","完成时间","负责部门","负责人","交付物","费用预算","收入/支出","经费来源",
	                         "费用科目","实际金额","备注","SPI","完成百分比","工时","工期","剩余工期","实际开始时间",
	                         "实际完成时间","WBS前置任务","WBS后置任务"};
	    for(int i=0;i<expTitle.length;i++)
	    	exportTitleList.add(expTitle[i]);
	}
	
	public String importMainProject() throws IOException, MPXJException, ParseException, ClassNotFoundException, 
	InstantiationException, IllegalAccessException, NoSuchFieldException, SecurityException, NoSuchMethodException, 
	IllegalArgumentException, InvocationTargetException{
			
		HttpServletResponse res = (HttpServletResponse)ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_RESPONSE);
	    HttpServletRequest req = (HttpServletRequest)ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);

	    //冻结当前计划
	    planService.freezeCurrentMainPlan(projectId);
	    
	    boolean success = true;
		//获取输入的文件路径及相关文件(mpp文件)
	    String filePath = req.getSession().getServletContext().getRealPath("/");
    	filePath += "am\\flash\\";
    	FileInputStream fis = new FileInputStream(qqfile); 
    	File file=new File(filePath,qqfilename);
    	FileOutputStream fos = new FileOutputStream(file); 
    	IOUtils.copy(fis, fos);  
        fos.flush();  
        fos.close();  
        fis.close();

        initialTitle();
		initDBSet();
		//初始化导入数据库的标题
    	String strTitle = "parentPlanCode|projectId|projectName"
    			+ "|planCode|planSerialNumber|planName|planIssueDate|planDeadlineDate"
    			+ "|planStartDate|planFinishDate|planSource|employeeId"
    			+ "|planController|employeeName|planStateCode|reviewer|leaf|level|changeDetail"
    			+ "|complete|accept|issue|deleteMark|planType|savic|comac|spi|completePercentage"
    			+ "|remainingDuration|remainingHour|remainingPeriod|baselineFinishTime|baselineStartTime"
    			+ "|predecessor|successor|";
     
		importData.add(strTitle);//add import title list
		//初始化projectName
		Project p = projectService.getOneProject(projectId);
		projectName = p.getProjectName();
        //read data from .mpp or .xls files
        String readInfo = readPlan(file);
		/*
		 * add related information about imported plan,mainly include role table and project table information
		 * */
        //如果出错则打印错误信息
        switch(importInfo){
        	case 1:{
        		String errorInfo = "导入的人员存在问题，请仔细检查该成员是否在项目中！！！";
        		String jsonStr = "{success: false, error:'"+ errorInfo+"', preventRetry: true}";
    	    	jsonobj = new JSONObject().fromObject(jsonStr);
    	    	System.out.println("import plan failed");
    	    	return SUCCESS;
        	}
        	case 2:break;
        	case 3:{
        		String errorInfo = "导入的计划负责人必须是项目经理，已进行强制转换！！！";
        		String jsonStr = "{success: false, error:'"+ errorInfo+"', preventRetry: true}";
    	    	jsonobj = new JSONObject().fromObject(jsonStr);
    	    	System.out.println("import plan encount problem");
        	};break;
        }
        /*if(readInfo!=null){
        	String jsonStr = "{success: false, error:'"+ readInfo+"', preventRetry: true}";
	    	jsonobj = new JSONObject().fromObject(jsonStr);
	    	System.out.println("failed");
			return SUCCESS;
        }*/
        /*
         * import data to Mysql
         * */
//		String importInfo = import2MySQL(importData);
		String importInfo = import2MySQL(import2SqlData);
        //如果出错则打印错误信息(if there is something wrong,print the error information)
        if(importInfo!=null){
        	String jsonStr = "{success: false, error:'"+ importInfo+"', preventRetry: true}";
	    	jsonobj = new JSONObject().fromObject(jsonStr);
	    	System.out.println("failed");
			return SUCCESS;
        }
		
		String jsonStr = "{success: true}";
    	jsonobj = new JSONObject().fromObject(jsonStr);
		System.out.println("successful");
		return SUCCESS;
	}
	public String readPlan(File file) throws MPXJException, ParseException, ClassNotFoundException, InstantiationException, 
	IllegalAccessException, NoSuchFieldException, SecurityException, NoSuchMethodException, IllegalArgumentException, 
	InvocationTargetException{
		String format = file.getPath();
		format = format.substring(format.lastIndexOf('.')+1, format.length());
		if(format.equals("mpp"))
			return readMPPContent(file);
		else if(format.equals("xls")||format.equals("xlsx"))
			return readXLSContent(file);
		return null;
	}
	public String readMPPContent(File file) throws MPXJException, ParseException, ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchFieldException, SecurityException, NoSuchMethodException, IllegalArgumentException, InvocationTargetException{
		//读取mpp文件
        MPPReader mppRead = new MPPReader();
		ProjectFile proFile = mppRead.read(file);
		proFile_para = mppRead.read(file);
		allTasks = proFile.getAllTasks();
		Task pTask = null;
		int level = 1;
		
		//get the first plan controller id and set it as project manager id
		Task managerTask = (Task) allTasks.get(1);
		
		Task taskHeader = (Task) allTasks.get(0);
		List childTasks = taskHeader.getChildTasks();
		taskTypeObj = childTasks.get(0).getClass().getName();
		//==================获取项目相关的角色===================//
		List<Role> role_list = roleService.getRoleListByProject(projectId);
		for(Role r:role_list){
			role_map.put(r.getEmployeeName(), r);
			roleName2Role.put(r.getRoleName(), r);
		}
		//==================获取导入的计划信息===================//
		for(int i=0;i <childTasks.size();i++){
			Task tmpTsk = (Task) childTasks.get(i);
			Map dataMap = getMSProjectContext(tmpTsk,pTask,"",level);
			if(dataMap==null)
				return null;
			import2SqlData.add(dataMap);
			if(tmpTsk.getChildTasks().size()!=0){
				if(!getSuprojectContext(tmpTsk,dataMap.get("planCode").toString(),level+1)){
					return null;
				}
			}
		}
		return null;
	}
	
	public boolean getSuprojectContext(Task pTask,String parentPlanCode,int level) throws ParseException, ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchFieldException, SecurityException, NoSuchMethodException, IllegalArgumentException, InvocationTargetException{
		List childTasks = pTask.getChildTasks();
		for(int i=0;i < childTasks.size();i++){
			Task tmpTsk = (Task) childTasks.get(i);
			task_para = tmpTsk;
			Map dataMap = getMSProjectContext(tmpTsk,pTask,parentPlanCode,level);
			if(dataMap==null) return false;
//			importData.add(getMSProjectContext(tmpTsk,pTask,level));
			try {
				import2SqlData.add(dataMap);
			} catch (SecurityException | IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if(tmpTsk.getChildTasks().size()!=0)
			{
				getSuprojectContext(tmpTsk,dataMap.get("planCode").toString(),level+1);
			}
		}
		return true;
	}
	
	public Map<String,String> getMSProjectContext(Task task,Task pTask,String parentPlanCode,int level) throws
	ClassNotFoundException, InstantiationException, IllegalAccessException, 
	NoSuchFieldException, SecurityException, NoSuchMethodException, IllegalArgumentException, InvocationTargetException, ParseException{
		/*
		 * 用来获取mpp中的内容，并添加不能通过mpp导入的信息
		 * */
		Map<String,String> mdata = new HashMap<>();
		//实现反射机制
		for(String key:plan2mpp.keySet()){
			String value = plan2mpp.get(key);
        	Method method = task.getClass().getMethod("get" +value);
        	Object value_obj = method.invoke(task);
            /*//对日期格式的数据进行转换
            if((key.indexOf("Date")!=-1 || key.indexOf("Time")!=-1) && value_obj!=null){
            	DateFormat df = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.US);
                //将已有的时间字符串转化为Date对象
            	java.util.Date date = df.parse(value_obj.toString());// 那天是周一
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date sqlDate = sdf.parse(sdf.format(date));
				java.sql.Date idate = new java.sql.Date(sqlDate.getTime());
				value_obj = idate;
			}
            //对Duration数据进行转换
            if(key.indexOf("remaining")!=-1 && value_obj!=null){
            	value_obj = value_obj.toString();
            }
            //对Double数据进行转换
            if(key.indexOf("budget")!=-1||key.indexOf("cashReal")!=-1){
            	if(value_obj!=null)
            		value_obj = Double.valueOf(value_obj.toString());
            	else value_obj = 0.0;
            }*/
			//核对人员信息
            if(key.indexOf("planController")!=-1){
            	if(value_obj!=null){
                	Role role = role_map.get(value_obj.toString());
                	if(role==null){
                		importInfo = 1;
                		return null;
                	}else{
                		if(task.getChildTasks().size()==0)
                			mdata.put("planControllerId", role.getEmployeeId());
                		else{
	                		String ManagerId = roleName2Role.get("项目经理").getEmployeeId();
	                		String ManagerName = roleName2Role.get("项目经理").getEmployeeName();
	                		String ControllerId = role.getEmployeeId();
	                		if(ManagerId==null){
	                			importInfo = 2;
	                			return null;
	                		}
	                		if(!ManagerId.equals(ControllerId)){
	                			importInfo = 3;
	                		}
	                		mdata.put("planControllerId", ManagerId);
	                		value_obj = ManagerName;
                		}
                	}
            	}else{
            		importInfo = 1;
            		return null;
            	}
            }
			if(value_obj != null)
            	mdata.put(key, value_obj.toString());
			else mdata.put(key, "");
		}
		//==================设置额外的计划信息（不能通过导入获取的计划信息）===================//
		mdata.put("projectName", projectName);
		mdata.put("projectId", projectId);
		mdata.put("level", String.valueOf(level));
		mdata.put("deleteMark", "false");
		mdata.put("isTask","false");
        //获取当前时间作为planCode
		java.util.Date now = new java.util.Date();
        String planCode = new String();
		if(task.getChildTasks().size()==0){
			mdata.put("leaf","true");
			planCode = "package"+String.valueOf(now.getTime());
		}else{
			mdata.put("leaf","false");
			planCode = "plan"+String.valueOf(now.getTime());
		}
		mdata.put("planCode", planCode);
		mdata.put("parentPlanCode",parentPlanCode);
		//设置planStateCode
		mdata.put("planStateCode","2");//将计划和工作包目录都设置为“发布”状态
		//添加planCreatorId、planAuditorId
		String CAId = new String();
		if(mdata.get("leaf").compareTo("true") == 0){
			CAId = roleName2Role.get("项目经理").getEmployeeId();
		}else{
			CAId = roleName2Role.get("项目领导").getEmployeeId();
		}
		if(CAId==null){
			importInfo = 2;
			return null;
		}
		mdata.put("planCreatorId",CAId);
		mdata.put("planAuditorId",CAId);
		return mdata;
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

	public String readXLSContent(File file){

//		List tmpList = new ArrayList();
        
		try {
	        XSSFWorkbook xs = new XSSFWorkbook(new FileInputStream(file));
	        XSSFSheet xssfSheet = xs.getSheetAt(0);
			int totalRows = xssfSheet.getPhysicalNumberOfRows();
			String parentPlanCode = new String();
			for (int rownum = 1; rownum < totalRows; rownum++) {//读取xls内容
				Map<String,String> tmpMap = new HashMap<String,String>();
				XSSFRow row = xssfSheet.getRow(rownum);
				String childsParent = new String();
				String level = new String();
				String leaf = new String();
				for(int i = 0; i < exportTitleList.size() ; i++){
					String strbuf = new String();
					Object obj = null;
					if(i == 0){//读取planCode
						while(row.getCell(i++)==null);
						if(i-1==0)
							parentPlanCode = "";
						else
							parentPlanCode = XgetParentPlanCode(rownum-1,i-2,xssfSheet);
						strbuf = XgetCellFormatValue(row.getCell(i-1)).trim();
//						tmpMap.put(exportTitleList.get(0),XgetCellFormatValue(row.getCell(i-1)).trim());
						level = String.valueOf(i);
						XSSFRow tmpRow = xssfSheet.getRow(rownum+1);
						if(tmpRow!=null)
							leaf = (tmpRow.getCell(i)!=null && i!=4)?"0":"1";
						else
							leaf = "1";
						i=0;
					}
					else{//读取其他内容
						strbuf = XgetCellFormatValue(row.getCell(i)).trim();
//						tmpMap.put(chn2Eng.get(exportTitleList.get(i)),XgetCellFormatValue(row.getCell(i)).trim());
					}
					String property = chn2Eng.get(exportTitleList.get(i));
					if(property.compareTo("planOutput") == 0) continue;
					tmpMap.put(property,strbuf);
				}
				//读取第一个计划的负责人作为经理
				if(rownum==2){
					if(tmpMap.get("planController") != null)
						projectControllerName = tmpMap.get("planController").toString();
					else
						projectControllerName = null;
					Employee projectController = employeeService.getByEmployeeName(projectControllerName);
					if(projectController==null)
						return "所选项目经理：" + projectControllerName + ",不存在！";
					projectControllerId = projectController.getEmployeeNumber();
				}
//				String datatmp = formatXLSData(tmpMap,parentPlanCode,level,leaf);
				if(tmpMap!=null) {
					import2SqlData.add(tmpMap);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		java.util.Date now = new java.util.Date();
		for(int i=1; i<import2SqlData.size();i++){
			Map preMap = import2SqlData.get(i-1);
			Map nextMap = import2SqlData.get(i);
			String preWbs = preMap.get("wbs").toString();
			String nextWbs = nextMap.get("wbs").toString();
			if(nextWbs.startsWith(preWbs)){
				preMap.put("planCode","plan"+String.valueOf(now.getTime()));
			}else{
				preMap.put("planCode","package"+String.valueOf(now.getTime()));
			}
			if(i == import2SqlData.size() - 1){
				nextMap.put("planCode","package"+String.valueOf(now.getTime()));
			}
		}

		return null;
	}
    private String XgetCellFormatValue(XSSFCell cell){
    	String cellvalue = "";
        if (cell != null) {
            switch (cell.getCellType()) {
            case XSSFCell.CELL_TYPE_NUMERIC:
            case XSSFCell.CELL_TYPE_FORMULA: {
                if(DateUtil.isCellDateFormatted(cell)){
                	cellvalue = new DataFormatter().formatRawCellContents(cell.getNumericCellValue(), 0, "yyyy-mm-dd");
                }
                else {
                    cellvalue = String.valueOf(cell.getNumericCellValue());
                }
                break;
            }
            case HSSFCell.CELL_TYPE_STRING:
                cellvalue = cell.getRichStringCellValue().getString();
                break;
            default:
                cellvalue = " ";
            }
        } else {
            cellvalue = "";
        }
        return cellvalue;
    }
    private int SgetCellFormatValue(Object o){
    	String strType = o==null?null:o.getClass().toString();
    	if(strType!=null){
    		if(strType.indexOf("String")!=-1)
    			return XSSFCell.CELL_TYPE_STRING;
    		else if(strType.indexOf("Double")!=-1)
    			return XSSFCell.CELL_TYPE_NUMERIC;
    		else if(strType.indexOf("Date")!=-1)
    			return XSSFCell.CELL_TYPE_FORMULA;
    	}
    	return XSSFCell.CELL_TYPE_STRING;
    }
    public String formatXLSData(Map data,String parentPlanCode,String level,String leaf){
    	String tmp = new String();
    	StringBuffer str = new StringBuffer();
    	str.append(parentPlanCode + "|");				//parentPlanCode
//    	str += projectIdNew + "|";				//projectId
    	str.append(projectName + "|");				//projectId
    	str.append(projectName + "|");				//projectName
    	if(data.get("活动项ID")==null || data.get("活动项ID").equals(""))
    		return null;
    	str.append(data.get("活动项ID") + "|");				//pslanCode
    	str.append("P"+data.get("活动项ID")+"|");			//planSerialNumber                  
    	str.append(data.get("活动项类型") + "|");				//planName                              
    	str.append(data.get("开始时间") + "|");				//planIssueDate
    	str.append(data.get("完成时间") + "|");				//planDeadlineDate                   
    	str.append(data.get("实际开始时间") + "|");				//planStartDate                         
    	str.append(data.get("实际完成时间") + "|");				//planFinishDate                        
    	str.append(data.get("资源名称") + "|");				//planSource            
    	Employee employee = employeeService.getByEmployeeName((String)data.get("文档责任人"));
    	String employeeNumber = new String();
    	if(employee!=null){
    		employeeNumber = employee.getEmployeeNumber();
    	}
    	/*if(employeeNumber==null || employeeNumber.equals("")){
    		employeeNumber = String.valueOf(((int)Math.random()*1000));
    	}*/
    	str.append(employeeNumber + "|");				//employeeId                         
    	str.append(data.get("文档责任人") + "|");				//planController                        
    	str.append(data.get("文档责任人") + "|");				//employeeName                      
    	str.append(getPlanStateCode(data) + "|");			//planStateCode                        
    	str.append("|");				//reviewer   
//    	tmp = (String)data.get("�Ƿ�Ҷ��");                               
//    	str.append leaf + "|";				//Leaf             
    	String isAction = data.get("是否行动项")!=null?data.get("是否行动项").toString():"否";
    	str.append( (isAction.equals("是")?"1":"0") + "|");				//Leaf
//    	tmp = (String) data.get("����㼶");
    	str.append (level + "|");				//Level                                       
    	str.append("|");									//changeDetailĬ��û�и���˵��                           
    	str.append(this.getComplete(data) + "|");				//Complete 
    	str.append(this.getAccept(data) + "|");				//Accept 
    	str.append(this.getIssue(data) + "|");				//Issue 
    	str.append("0|");									//deleteMarkĬ��Ϊ0 
    	str.append(data.get("活动类型") + "|");					//planType 
    	str.append(data.get("SAVIC评审点") + "|");				//SAVIC 
    	str.append(data.get("COMAC评审点") + "|");				//COMAC 
    	str.append(data.get("SPI") + "|");					//SPI 
    	str.append(data.get("完成百分比") + "|");				//CompletePercentage 
    	str.append(data.get("剩余工期") + "|");					//RemainingDuration 
    	str.append(data.get("工时") + "|");					//RemainingHour 
    	str.append(data.get("工期") + "|");					//RemainingPeriod 
    	str.append(data.get("比较基准完成时间") + "|");			//BaselineFinishTime 
    	str.append(data.get("比较基准开始时间") + "|");			//BaselineStartTime 
    	str.append(data.get("前置任务") + "|");					//predecessor 
    	str.append(data.get("后续任务") + "|");					//successor 
    	
    	return str.toString();
    }
    public String XgetParentPlanCode(int rownum,int colnum,XSSFSheet xssfSheet){
    	for(;rownum>0;rownum--){
    		XSSFRow row = xssfSheet.getRow(rownum);
    		XSSFCell cell = row.getCell(colnum);
    		if(cell!=null){
    			return XgetCellFormatValue(cell).trim();
    		}
    	}
    	return null;
    }
	
	public String getParentKey(Task pTask){
		String parentKey = new String();
		return parentKey;
	}
	public String getParentPlanCode(Task pTask){
		String parentPlanCode = new String();
		return parentPlanCode;
	}
	public String getProjectId(){
		String projectId = new String();
		return projectId;
	}
	public String getProjectName(){
		String projectName = new String();
		return projectName;
	}
	public String getPlanCode(){
		String planCode = new String();
		return planCode;
	}
	public String getPlanSerialNumber(){
		String planSerialNumber = new String();
		return planSerialNumber;
	}
	public String getPlanName(){
		String planName = new String();
		return planName;
	}
	public String getPlanIssuedDate(){
		String planIssuedDate = new String();
		return planIssuedDate;
	}
	public String getPlanDeadlineDate(){
		String planDeadlineDate = new String();
		return planDeadlineDate;
	}
	public String getPlanStartDate(){
		String planStartDate = new String();
		return planStartDate;
	}
	public String getPlanFinishDate(){
		String planFinishDate = new String();
		return planFinishDate;
	}
	public String getPlanSource(){
		String planSource = new String();
		return planSource;
	}
	public String getEmployeeId(){
		String employeeId = new String();
		return employeeId;
	}
	public String getPlanController(){
		String planController = new String();
		return planController;
	}
	public String getEmployeeName(){
		String employeeName = new String();
		return employeeName;
	}
	public String getPlanStateCode(Task task){//��ȡplanStateCode
		String planStateCode = new String();
		if(task.getStart()!=null){
			if(task.getActualStart()!=null){
				if(task.getActualFinish()!=null){
					planStateCode = "4";
				}
				else planStateCode = "3";
			}
			else planStateCode = "2";
		}
		else planStateCode = "1";
		return planStateCode;
	}
	public String getPlanStateCode(Map data){//��ȡplanStateCode
		String planStateCode = new String();
		if(!data.get("开始时间").equals("")){
			if(!data.get("实际开始时间").equals("")){
				if(!data.get("实际完成时间").equals("")){
					planStateCode = "4";
				}
				else planStateCode = "3";
			}
			else planStateCode = "2";
		}
		else planStateCode = "1";
		return planStateCode;
	}
	public String getReviewer(){
		String reviewer = new String();
		return reviewer;
	}
	public String getLeaf(Task task){
		return task.getChildTasks().size()==0?"1":"0";
	}
	public int getLevel(){
		int level = 0;
		return level;
	}
	public String getChangeDetail(){
		String changeDetail = new String();
		return changeDetail;
	}
	public String getComplete(Task task){
		if(task.getActualFinish()!=null)
			return "1";
		return "0";
	}
	public String getComplete(Map data){
		return data.get("实际完成时间").equals("")==false?"1":"0";
	}
	public String getAccept(Task task){
		if(task.getActualFinish()==null)
			if(task.getActualStart()!=null)
				return "1";
		return "0";
	}
	public String getAccept(Map data){
		if(data.get("实际完成时间").equals(""))
			if(!data.get("实际开始时间").equals(""))
				return "1";
		return "0";
	}
	public String getIssue(Task task){
		int issue = 0;
		if(task.getActualFinish()==null)
			if(task.getActualStart()==null)
				if(task.getStart()!=null)
					return "1";
		return "0";
	}
	public String getIssue(Map data){
		if(data.get("实际完成时间").equals(""))
			if(data.get("实际开始时间").equals(""))
				if(!data.get("开始时间").equals(""))
					return "1";
		return "0";
	}
	public int getDeleteMark(){
		int deleteMark = 0;
		return deleteMark;
	}
	
	public String import2MySQL(List importData) throws ParseException,IOException{
		//将数据导入数据库
		for(int i=0;i<importData.size();i++){
			Plan plan = new Plan();//!!
			//==================按照特定的顺序将数据插入数据库====================//
			Map<String,String> dataMap = (Map<String,String>)importData.get(i);
			try{
				//实现反射机制
				Class<?> demo = null;
		        Object obj = null;	 
		        demo = Class.forName("org.sjtu.p615.entity.Plan");
		        obj = demo.newInstance();
		 
		        for(String key:dataMap.keySet()){
		        	Object ob = null;
					String value = dataMap.get(key);
			        Field field = demo.getDeclaredField(key);
			        Class<?> type = field.getType();
					if(value == null || value.compareTo("") == 0) continue;
					switch(type.getName()){
						case "java.lang.String":ob=String.valueOf(value);break;
						case "java.lang.Integer":ob=Integer.valueOf(value);break;
						case "java.sql.Date":ob=java.sql.Date.valueOf(value);break;
						case "java.lang.Boolean":ob=Boolean.valueOf(value);break;
						case "java.lang.Double":ob=Double.valueOf(value);break;
					}
			        String firstLetter = key.substring(0,1).toUpperCase();
			        String restLetters = key.substring(1, key.length());
		        	Method method = obj.getClass().getMethod("set" + firstLetter+restLetters, type);
		            method.invoke(plan, ob);
		        }
		        planService.importPlan(plan);
			}
			catch(Exception e){
				e.printStackTrace();
				return e.toString();
			}

		}
			
		return null;
	}
	
	//�������ƻ�
	private List<Plan> sortedPlan = new ArrayList<Plan>();
	public String exportMainProject() throws MPXJException, IOException, RowsExceededException, WriteException, NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException{
		
		/*List<Plan> list = new ArrayList<Plan>();
		writeMppFile(list);*/
        initialTitle();
		
		
//        String errorInfo = new String();//用来保存导出时候的错误信息
//		JSONArray jArray=JSONArray.fromObject(projectList);
//		for(int i=0;i<jArray.size();i++){
			sortedPlan.clear();
//			String proName = jArray.getJSONObject(i).getString("projectName");
//			String savePath = jArray.getJSONObject(i).getString("savePath");
			HttpServletRequest req = (HttpServletRequest)ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);
			String savePath = req.getServletContext().getRealPath("/")+"\\am\\"+projectName+".xls";
			sortPlan(planService.getByProjectName(projectName));//对要导出的主计划进行排序
			try{
//				write2Excel(plan2List(sortedPlan),savePath);//将主计划导出为xls文件
				write2Xls(plan2Map(sortedPlan),savePath);//将主计划导出为xls文件
			}
			catch(IOException e){
				System.out.println(e.toString());
				result = e.toString();
				result = result.substring(result.indexOf(':')+1, result.length());
				this.setResult(result);
				return SUCCESS;
			}
//		}
		this.setResult(result);
		return SUCCESS;
	}
	public void sortPlan(List<Plan> planList){
		int levelCount = 1;
		for(int i=0;i<planList.size();i++){
			Plan tmp = planList.get(i);
			if(tmp.getLevel()==null) continue;
			if(tmp.getLevel().equals(1)){
				planList.remove(i);
				i--;
				tmp.setWbs(String.valueOf(levelCount));
				sortedPlan.add(tmp);
				appendChild(tmp,planList,String.valueOf(levelCount));
				levelCount++;
			}
		}
	}
	public void appendChild(Plan pPlan,List<Plan> planList,String pWBS){
		int levelCount = 1;
		for(int i=0;i<planList.size();i++){
			Plan tmp = planList.get(i);
			Integer parentKey = tmp.getParentKey();
			Integer pparentKey = pPlan.getPlanKey();
			if(pparentKey!=null && parentKey!=null && parentKey.equals(pparentKey)){//
				planList.remove(i);
				i--;
				String wbs = pWBS+"."+String.valueOf(levelCount);
				tmp.setWbs(wbs);
				sortedPlan.add(tmp);
				appendChild(tmp,planList,wbs);
				levelCount++;
			}
		}
	}
	public List plan2Map(List<Plan> plans) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException{
		//将任务剔除
		for(int i=0;i<plans.size();i++){
			Plan plan = plans.get(i);
			if(plan!=null && plan.getIsTask()!=null && plan.getIsTask()){
				plans.remove(i);
				i--;
			}
		}
		//将数据转换为map格式
		for(Plan plan:plans){
			Map<String,Object> mdata = new HashMap<>();
			for(String key:plan2xls.keySet()){
				String value = plan2xls.get(key);
	        	Method method = plan.getClass().getMethod("get" +key);
	        	Object value_obj = method.invoke(plan);
	        	mdata.put(value, value_obj);
			}
			export2SqlData.add(mdata);
		}
		return export2SqlData;
	}
	public void write2Xls(List plans,String savePath) throws IOException{
		
		System.out.print(savePath);

        FileOutputStream output = new FileOutputStream(new File(savePath));
        SXSSFWorkbook wb = new SXSSFWorkbook(10000);
        org.apache.poi.ss.usermodel.Sheet sheet = wb.createSheet("project");
    	org.apache.poi.ss.usermodel.Row tmprow = sheet.createRow(0);   
        //=======================将主计划导入xls文件中==========================//
    	//打印xls表头
    	CellStyle headcellstyle = wb.createCellStyle();
    	headcellstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
    	headcellstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        for(int cols=0;cols<exportTitleList.size();cols++){  
        	String strtmp = exportTitleList.get(cols);
            Cell cell = tmprow.createCell(cols);                     
            cell.setCellType(XSSFCell.CELL_TYPE_STRING);
            cell.setCellValue(strtmp!=null?strtmp:"");
            cell.setCellStyle(headcellstyle);
        }
    	//打印内容
    	for(int i=0;i<plans.size();i++){  
	        org.apache.poi.ss.usermodel.Row row = sheet.createRow(i+1);
	        Map planMap = (Map) plans.get(i);
	        for(int cols=0;cols<exportTitleList.size();cols++){
	        	//
	        	String colName = exportTitleList.get(cols);
	            Cell cell = null;    
//        		cell = row.createCell(((int) planMap.get(contentType))-1);
        		cell = row.createCell(cols);
	            int valueType = SgetCellFormatValue(planMap.get(colName));
	            switch(valueType){
	            	case XSSFCell.CELL_TYPE_NUMERIC:{
	                    cell.setCellType(valueType);
	            		Object tmpO = planMap.get(colName)!=null?planMap.get(colName):null;
	            		cell.setCellValue((double) planMap.get(colName));
	                    sheet.setColumnWidth(cols, "yyyy-mm-dd".length()*384);
	            		break;
	            	}
	            	case XSSFCell.CELL_TYPE_STRING:{
	                    cell.setCellType(valueType);
	            		Object tmpO = planMap.get(colName)!=null?planMap.get(colName):null;
	                    cell.setCellValue(tmpO!=null?tmpO.toString():"");
	                    sheet.setColumnWidth(cols, "yyyy-mm-dd".length()*384);
	            		break;
	            	}
	            	case XSSFCell.CELL_TYPE_FORMULA:{
	            		Object tmpO = planMap.get(colName)!=null?planMap.get(colName):null;
	                    cell.setCellValue((Date)planMap.get(colName));
	                    XSSFCellStyle cellStyle = (XSSFCellStyle) wb.createCellStyle();
	                    XSSFDataFormat format= (XSSFDataFormat) wb.createDataFormat();
	                    cellStyle.setDataFormat(format.getFormat("yyyy-mm-dd"));
	                    cell.setCellStyle(cellStyle);
	                    sheet.setColumnWidth(cols, "yyyy-mm-dd".length()*384);
	                    break;
	            	}
	            }
	        }  
        }
        wb.write(output);
        output.close();   
	}
	public void writeMppFile(List<Plan> data) throws MPXJException, IOException{
		int UIDAcc = 0;
		int IDAcc = 0;
		int count = 0;
        try { 
        	ProjectReader reader = new MPPReader(); 
            ProjectFile project; 
        	project = reader.read("G:\\mpp\\data.mpp"); 
            //生成文件 
            ProjectWriter writer = new MSPDIWriter(); 
            
            writer.write(project, "G:\\mpp\\test.mpp"); 
        	
        	/*ProjectFile file =new ProjectFile();   
            
            Task task1 = file.addTask();   
            task1.setName("task1");   
            task1.setUniqueID(1);   
            task1.setID(1);   
            task1.setOutlineLevel(1);   
               
            Task task11 = task1.addTask();   
            task11.setName("task1-1");   
            task11.setDuration(Duration.getInstance(6, TimeUnit.DAYS));   
            task11.setStart(java.sql.Date.valueOf("2008-8-21"));   
            task11.setFinish(java.sql.Date.valueOf("2008-8-26"));   
            task11.setPercentageComplete(NumberUtility.getDouble(90D));   
            task11.setUniqueID(2);   
            task11.setID(2);   
            task11.setResourceNames("one");   
                       
            Task task12 = task1.addTask();   
            task12.setName("task12");   
            task12.setDuration(Duration.getInstance(5, TimeUnit.DAYS));   
            task12.setStart(java.sql.Date.valueOf("2008-8-27"));   
            task12.setFinish(java.sql.Date.valueOf("2008-8-31"));   
            task12.setResourceNames("two");   
            task12.setUniqueID(3);   
            task12.setID(3);   
                   
                      //前置关系   
            Relation r=task12.addPredecessor(task11, RelationType.FINISH_START, Duration.getInstance(5, TimeUnit.DAYS));      
      
//                 r.setType(RelationType.FINISH_START);   
//                 r.setTaskUniqueID(task11.getUniqueID());   
               
            ProjectCalendar pc=file.addBaseCalendar();   
               
                      //设置工作日历 这里设的周1－7全部工作，呵呵 如不设默认为5天工作制   
            pc.setName("压榨民工");   
            pc.setWorkingDay(Day.SUNDAY, true);   
            pc.setWorkingDay(Day.MONDAY, true);   
            pc.setWorkingDay(Day.TUESDAY, true);   
            pc.setWorkingDay(Day.WEDNESDAY, true);   
            pc.setWorkingDay(Day.THURSDAY, true);   
            pc.setWorkingDay(Day.FRIDAY, true);   
            pc.setWorkingDay(Day.SATURDAY, true);   
               
            ProjectCalendarHours h1=pc.addCalendarHours(Day.SUNDAY);   
            h1.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
            h1.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
               
            ProjectCalendarHours h2=pc.addCalendarHours(Day.MONDAY);   
            h2.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
            h2.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
               
            ProjectCalendarHours h3=pc.addCalendarHours(Day.TUESDAY);   
            h3.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
            h3.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
               
            ProjectCalendarHours h4=pc.addCalendarHours(Day.WEDNESDAY);   
            h4.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
            h4.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
               
            ProjectCalendarHours h5=pc.addCalendarHours(Day.THURSDAY);   
            h5.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
            h5.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
               
            ProjectCalendarHours h6=pc.addCalendarHours(Day.FRIDAY);   
            h6.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
            h6.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
               
            ProjectCalendarHours h7=pc.addCalendarHours(Day.SATURDAY);   
            h7.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
            h7.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
               
               
            ProjectHeader ph=file.getProjectHeader();   
            ph.setCalendarName(pc.getName());   
                       
            MPXWriter writer = new MPXWriter();   
                 //设置中文   
            writer.setLocale(Locale.CHINESE);
            writer.write(file, "G:\\mpp\\20150530.xml");  */ 
            
            
        	/*File in = new File("G:\\mpp\\avalonTest.mpp");
//            File in = new File("G:\\mpp\\avalonTest.mpx");
            ProjectFile mpp = new MPPReader().read(in);
//            ProjectFile mpp = new ProjectFile();
//            Task tmpTsk = new Task(project, tmpTsk);
//            List<Task> pt = project.getAllTasks();
            Task tsk = mpp.addTask();
            tsk.setID(count++);
            tsk.setUniqueID(count++);
            tsk.setName("wode");
            tsk.setText1("time");
            tsk.setNumber1(1.2);
            tsk.setNumber2(2.2);
            tsk.setText2("zhaoliu");
            tsk.setText3("ʱ�����");
            tsk.setResourceNames("615");
            tsk.setNumber3(23.2);
            tsk.setPercentageComplete(0.25);
            tsk.setActualStart(java.sql.Date.valueOf("2014-12-5"));
            tsk.setActualFinish(java.sql.Date.valueOf("2014-12-19"));
            tsk.setRemainingDuration(null);
            TimeUnit day = TimeUnit.DAYS;
            Duration dr = Duration.getInstance(5,day);
            tsk.setWork(dr);
            tsk.setActualDuration(dr);
            tsk.setDuration(dr);
            tsk.setStart(java.sql.Date.valueOf("2014-12-4"));
            tsk.setFinish(java.sql.Date.valueOf("2014-12-21"));
            tsk.setBaselineFinish(java.sql.Date.valueOf("2014-12-21"));
            tsk.setBaselineStart(java.sql.Date.valueOf("2014-12-4"));
            
            
            ProjectCalendar pc=mpp.addBaseCalendar();   */
            
            //���ù������� ���������1��7ȫ���������Ǻ� �粻��Ĭ��Ϊ5�칤����   
//			  pc.setName("ѹե��");   
//			  pc.setWorkingDay(Day.SUNDAY, true);   
//			  pc.setWorkingDay(Day.MONDAY, true);   
//			  pc.setWorkingDay(Day.TUESDAY, true);   
//			  pc.setWorkingDay(Day.WEDNESDAY, true);   
//			  pc.setWorkingDay(Day.THURSDAY, true);   
//			  pc.setWorkingDay(Day.FRIDAY, true);   
//			  pc.setWorkingDay(Day.SATURDAY, true);   
//			     
//			  ProjectCalendarHours h1=pc.addCalendarHours(Day.SUNDAY);   
//			  h1.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
//			  h1.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
//			     
//			  ProjectCalendarHours h2=pc.addCalendarHours(Day.MONDAY);   
//			  h2.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
//			  h2.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
//			     
//			  ProjectCalendarHours h3=pc.addCalendarHours(Day.TUESDAY);   
//			  h3.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
//			  h3.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
//			     
//			  ProjectCalendarHours h4=pc.addCalendarHours(Day.WEDNESDAY);   
//			  h4.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
//			  h4.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
//			     
//			  ProjectCalendarHours h5=pc.addCalendarHours(Day.THURSDAY);   
//			  h5.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
//			  h5.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
//			     
//			  ProjectCalendarHours h6=pc.addCalendarHours(Day.FRIDAY);   
//			  h6.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
//			  h6.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
//			     
//			  ProjectCalendarHours h7=pc.addCalendarHours(Day.SATURDAY);   
//			  h7.addRange(new DateRange (ProjectCalendar.DEFAULT_START1, ProjectCalendar.DEFAULT_END1));   
//			  h7.addRange(new DateRange (ProjectCalendar.DEFAULT_START2, ProjectCalendar.DEFAULT_END2));   
//			     
//			     
//			  ProjectHeader ph=mpp.getProjectHeader();   
//			  ph.setCalendarName(pc.getName());  
            
//            File out = File.createTempFile("junit", ".mpx");
//            new MPXWriter().write(mpp, out.getAbsolutePath());
            
            //
//            ProjectWriter writer = new MSPDIWriter(); 
            
//        	String sysProperty = System.getProperty("java.library.path");
//        	sysProperty=sysProperty.substring(0, sysProperty.length()-1);
//        	System.out.println(System.getProperty("java.library.path"));
//        	System.setProperty("java.library.path", sysProperty+"C:\\Windows\\SysWOW64;.");
//        	System.out.println(System.getProperty("java.library.path"));
            /*Ole32.CoInitialize();
            DispatchPtr app = new DispatchPtr("MSProject.Application");
            app.put("Visible",true);
            DispatchPtr projects = (DispatchPtr) app.get("Projects");
            DispatchPtr project = (DispatchPtr) projects.invoke("Add");
            DispatchPtr tasks = (DispatchPtr) project.get("Tasks");
            DispatchPtr taskName = (DispatchPtr) tasks.invoke("Add");
            taskName.put("UID", UIDAcc++);
            taskName.put("ID", IDAcc++);
            taskName.put("OutlineNumber",1);
            taskName.put("OutlineLevel", 1);
            taskName.put("Start", "2014-12-4");
            taskName.put("Finish", "2014-12-25");
            project.invoke("SaveAs", "G:\\mpp\\zy.mpp");
            app.invoke("DocClose");
            Ole32.CoUninitialize(); */
        }
        catch (Exception e) { 
            e.printStackTrace(); 
        } 
	}
	public void write2Excel(List sortedPlan,String savePath) throws IOException, RowsExceededException, WriteException{
//		HttpServletRequest req = (HttpServletRequest)ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);
//    	String filePath = req.getSession().getServletContext().getRealPath("/");
//    	filePath += "am\\flash\\";
//		HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_RESPONSE);
//		response.setHeader("Content-Disposition",
//                "attachment;filename=asd.xls");
//		response.setHeader("Connection", "close");
//		response.setHeader("Content-Type", "application/vnd.ms-excel");
		
//		JSONArray jArray=JSONArray.fromObject(projectList);
//		String filePath = new String();
		
		System.out.print(savePath);

        FileOutputStream output = new FileOutputStream(new File(savePath));  //��ȡ���ļ�·��   
        SXSSFWorkbook wb = new SXSSFWorkbook(10000);//�ڴ��б��� 10000 �����ݣ������ڴ����������д�� Ӳ��          
        org.apache.poi.ss.usermodel.Sheet sheet = wb.createSheet("project");  
//        WritableSheet sheet = (WritableSheet) wb.createSheet("project");
        //д��������
    	org.apache.poi.ss.usermodel.Row tmprow = sheet.createRow(0);   
        /*******************将主计划导入xls文件中*******************
         * 
         * 
         */
    	sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 0));
        org.apache.poi.ss.usermodel.Row r = sheet.createRow(1);  
    	Cell c1 = r.createCell(0);
    	Cell c2 = r.createCell(1);;
    	Cell c3 = r.createCell(2);;
    	Cell c4 = r.createCell(3);;
    	c1.setCellValue("一级计划");
    	c2.setCellValue("二级计划");
    	c3.setCellValue("三级计划");
    	c4.setCellValue("四级计划");
    	for(int cols=4;cols<exportTitleList.size()+3;cols++){
    		sheet.addMergedRegion(new CellRangeAddress(0,1,cols,cols));
    	}
    	//д���ͷ
    	CellStyle headcellstyle = wb.createCellStyle();
    	headcellstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);//����
    	headcellstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//���ô�ֱ����
        for(int cols=0;cols<exportTitleList.size();cols++){  
        	String strtmp = exportTitleList.get(cols);
            Cell cell = tmprow.createCell(cols==0?0:cols+3);                     
            cell.setCellType(XSSFCell.CELL_TYPE_STRING);//�ı���ʽ                    
//                    sheet.setColumnWidth(cols, tmp.get(cols).toString().length()*384); //���õ�Ԫ����  
            cell.setCellValue(strtmp!=null?strtmp:"");//д������
            cell.setCellStyle(headcellstyle);
        } 
        //д������
        for(int i=0;i<sortedPlan.size();i++){  
            org.apache.poi.ss.usermodel.Row row = sheet.createRow(i+2);//�ӵ����п�ʼд������
            List tmp = (List) sortedPlan.get(i); 
            int colShow = tmp.size() - 1;
            for(int cols=0;cols<colShow;cols++){ //ͨ��tmp.size()������Ҫд����ֶ�
            	//���ò㼶��ϵ��ʾ
                Cell cell = null;    
            	if(cols == 0)
            		cell = row.createCell(((int) tmp.get(colShow))-1);
            	else 
            		cell = row.createCell(cols + 3);
                int valueType = SgetCellFormatValue(tmp.get(cols));
                switch(valueType){
                	case XSSFCell.CELL_TYPE_NUMERIC:{
                        cell.setCellType(valueType);//�ı���ʽ        
                		Object tmpO = tmp.get(cols)!=null?tmp.get(cols):null;
                		cell.setCellValue((double) tmp.get(cols));//д������  
                        sheet.setColumnWidth(cols+3, "yyyy-mm-dd".length()*384); //���õ�Ԫ����  
                		break;
                	}
                	case XSSFCell.CELL_TYPE_STRING:{
                        cell.setCellType(valueType);//�ı���ʽ        
                		Object tmpO = tmp.get(cols)!=null?tmp.get(cols):null;
                        cell.setCellValue(tmpO!=null?tmpO.toString():"");//д������  
                        sheet.setColumnWidth(cols+3, "yyyy-mm-dd".length()*384); //���õ�Ԫ����  
                		break;
                	}
                	case XSSFCell.CELL_TYPE_FORMULA:{
//                        cell.setCellType(valueType);//�ı���ʽ        
                		Object tmpO = tmp.get(cols)!=null?tmp.get(cols):null;
                        cell.setCellValue((Date)tmp.get(cols));//д������  
                        XSSFCellStyle cellStyle = (XSSFCellStyle) wb.createCellStyle();
                        XSSFDataFormat format= (XSSFDataFormat) wb.createDataFormat();
                        cellStyle.setDataFormat(format.getFormat("yyyy-mm-dd"));
                        cell.setCellStyle(cellStyle);
                        sheet.setColumnWidth(cols+3, "yyyy-mm-dd".length()*384); //���õ�Ԫ����  
                        break;
                	}
                }
            }  
        }       
        wb.write(output);  
        output.close();   
	}
	public List plan2List(List<Plan> sortedPlan){
		List<List<String>> result = new ArrayList();
		for(int i=0;i<sortedPlan.size();i++){
			List tmpList = new ArrayList();
			Plan tmpPlan = (Plan) sortedPlan.get(i);
			tmpList.add(tmpPlan.getPlanCode());
			tmpList.add(tmpPlan.getPlanType());
			tmpList.add(tmpPlan.getSavic());
			tmpList.add(tmpPlan.getComac());
			tmpList.add(tmpPlan.getPlanController());
			tmpList.add(tmpPlan.getPlanName());
			tmpList.add(tmpPlan.getPlanSource());
			tmpList.add(tmpPlan.getSpi());
			tmpList.add(tmpPlan.getCompletePercentage());
			tmpList.add(tmpPlan.getPlanStartDate());
			tmpList.add(tmpPlan.getPlanFinishDate());
			tmpList.add(tmpPlan.getRemainingDuration());
			tmpList.add(tmpPlan.getRemainingHour());
			tmpList.add(tmpPlan.getRemainingPeriod());
			tmpList.add(tmpPlan.getPlanIssuedDate());
			tmpList.add(tmpPlan.getPlanDeadlineDate());
			tmpList.add(tmpPlan.getBaselineFinishTime());
			tmpList.add(tmpPlan.getBaselineStartTime());
			tmpList.add(tmpPlan.getPredecessor());
			tmpList.add(tmpPlan.getSuccessor());
			tmpList.add(tmpPlan.getLeaf()?"是":"否");
			tmpList.add(tmpPlan.getLevel());
			result.add(tmpList);
		}
		return result;
	}

	public String getQquuid() {
		return qquuid;
	}

	public void setQquuid(String qquuid) {
		this.qquuid = qquuid;
	}

	public String getQqfilename() {
		return qqfilename;
	}

	public void setQqfilename(String qqfilename) {
		this.qqfilename = qqfilename;
	}

	public File getQqfile() {
		return qqfile;
	}

	public void setQqfile(File qqfile) {
		this.qqfile = qqfile;
	}
	public IPlanService getPlanService() {
		return planService;
	}
	public void setPlanService(IPlanService planService) {
		this.planService = planService;
	}
	public IEmployeeService getEmployeeService() {
		return employeeService;
	}

	public void setEmployeeService(IEmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	public String getProjectList() {
		return projectList;
	}
	public void setProjectList(String projectList) {
		this.projectList = projectList;
	}

	public IProjectService getProjectService() {
		return projectService;
	}

	public void setProjectService(IProjectService projectService) {
		this.projectService = projectService;
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

	public String getProjectControllerName() {
		return projectControllerName;
	}

	public void setProjectControllerName(String projectControllerName) {
		this.projectControllerName = projectControllerName;
	}

	public String getProjectControllerId() {
		return projectControllerId;
	}

	public void setProjectControllerId(String projectControllerId) {
		this.projectControllerId = projectControllerId;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public IRoleService getRoleService() {
		return roleService;
	}

	public void setRoleService(IRoleService roleService) {
		this.roleService = roleService;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
}
