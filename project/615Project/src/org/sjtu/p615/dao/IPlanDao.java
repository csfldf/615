package org.sjtu.p615.dao;

import net.sf.json.JSONArray;

import org.apache.commons.lang3.tuple.Pair;
import org.sjtu.p615.entity.Action;
import org.sjtu.p615.entity.Message;
import org.sjtu.p615.entity.Plan;
import org.sjtu.p615.entity.Remind;

import java.util.List;

public interface IPlanDao {
	public boolean add(Plan plan);
	public Plan get(String planCode);
	public Plan get(String planCode,String projectId);

	public List<Plan> getallplan();
	public int getplancount(String plancontroller);
	public int updatestate(String plancode,int statecode);
	public int updateplan(Plan plan);
	public boolean updatePlan(List<Pair<String,String>> property);
	public List<Plan> getstructure();
	public int deleteplan(String plancode);
	public List<Plan> getbytype(String key,String value);
	public List<Plan> getByEmployeeId(String employeeId);
	public List<Plan> getChildPlans(int rootId);
	public List<Plan> getChildPlans(String planCode);
	public List<Plan> getByProjectName(String projectName);
	public List<Plan> getByProjectId(String projectId);
	public List<Plan> getByEmployeeIdPorjectName(String employeeId,String projectName);
	public List<Message> getMessage(String employeeId);
	public List<Remind> getRemind(String employeeId);
	public boolean delMessage(List<String> messageIds);
	//*==============homePage part================*//
	public List<Action> getActionsByEmployeeId(String employeeId);
	public boolean addMessage(Message message);
	//*==============Task part================*//
	public void freezeCurrentMainPlan(String projectId);
	public List<Plan> getTasksByParentCode(String parentCode,String projectId);
	boolean update(Plan plan);
	boolean delete(String planCode);
	public boolean delTask(List<String> taskIds);
	public void addTask(Plan plan);
	public List<Plan> getWaitingTasks(String employeeId);

	List<Plan> getPlansByConditons(String projectId,
								   String dateColumn, String date1, String date2,
								   String employeeId, String groupId, String departmentId);

	int getChildrenCountByConditions(String parent, int stateCode);

	JSONArray getPlansWithApply(String checkApplyType, String userId);

	JSONArray getStatisticsByCondition(String statisticsType, String conditonString, String projectName, String id);
}
