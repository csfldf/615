package org.sjtu.p615.am.service;

import net.sf.json.JSONArray;

import org.apache.commons.lang3.tuple.Pair;
import org.sjtu.p615.dao.*;
import org.sjtu.p615.entity.*;

import java.util.List;

public class PlanService implements IPlanService {

    private IPlanDao planDao;
    private IProjectDao projectDao;
    private IEmployeeDao employeeDao;

    /*******************************
     * ��ɾ�Ĳ�
     **********************************************/
    @Override
    @Deprecated
    public void addPlan(Plan plan) {
        if (plan.getProjectName() == null && plan.getProjectId() != null
                && plan.getProjectId().equals("") == false) {
            Project project = projectDao.getOne(plan.getProjectId());
            if (project != null)
                plan.setProjectName(project.getProjectName());
        }
        if (plan.getPlanController() == null && plan.getPlanControllerId() != null
                && plan.getPlanControllerId().equals("") == false) {
            Employee employee = employeeDao.getone(plan.getPlanControllerId());
            if (employee != null)
                plan.setPlanController(employee.getEmployeeName());
        }
        if (plan.getEmployeeName() == null && plan.getEmployeeId() != null
                && plan.getEmployeeId().equals("") == false) {
            Employee employee = employeeDao.getone(plan.getEmployeeId());
            if (employee != null)
                plan.setEmployeeName(employee.getEmployeeName());
        }
        if (plan.getParentKey() == null && plan.getParentPlanCode() != null) {
            if (plan.getProjectId() != null) {
                Plan parentPlan = planDao.get(plan.getParentPlanCode(), plan.getProjectId());
                if (parentPlan != null) {
                    plan.setParentKey(parentPlan.getPlanKey());
                    plan.setLevel(parentPlan.getLevel() + 1);
                } else {
                    plan.setLevel(1);
                }
            }
        }
        if (plan.getLevel() == null)
            plan.setLevel(1);
        planDao.add(plan);
    }

    @Override
    public void importPlan(Plan plan) {
        if (plan.getParentPlanCode() != null) {
            Plan parentPlan = planDao.get(plan.getParentPlanCode(), plan.getProjectId());
            if (parentPlan != null)
                plan.setParentKey(parentPlan.getPlanKey());
            else
                plan.setParentKey(null);
        }
        planDao.add(plan);
    }

    @Override
    public int updatePlan(Plan plan) {
        /*if(plan.getProjectId()!=null){
            plan.setProjectName(projectDao.getOne(plan.getProjectId()).getProjectName());
		}
		if(plan.getPlanController()==null && plan.getPlanControllerId()!=null){
			Employee employee=employeeDao.getone(plan.getPlanControllerId());
			if(employee!=null)
				plan.setPlanController(employee.getEmployeeName());
		}
		if(plan.getEmployeeId()!=null&&plan.getEmployeeId().equals("")==false){
			plan.setEmployeeName(employeeDao.getone(plan.getEmployeeId()).getEmployeeName());
		}	
		if(plan.getParentPlanCode()!=null){
			Plan parentPlan=planDao.get(plan.getParentPlanCode());
			if(parentPlan!=null)
				plan.setParentKey(parentPlan.getPlanKey());
		}		*/
        planDao.update(plan);
        return 1;
    }

    @Override
    public Plan getPlan(String planCode) {
        Plan plan = planDao.get(planCode);
        return plan;
    }

    @Override
    public boolean deletePlan(String planCode) {
        return planDao.delete(planCode);
    }

    /******************************
     * plan ͳ����Ϣ
     ***********************************************/
    @Override
    public List<Plan> getPlansByConditions(String projectid, String dateColumn, String date1, String date2,
                                           String employeeId, String groupId, String departmentId) {
        return planDao.getPlansByConditons(projectid, dateColumn, date1, date2, employeeId, groupId, departmentId);
    }

    @Override
    public List<Plan> getPlansByDateRange(String projectId, String dateColumn, String date1, String date2) {
        return planDao.getPlansByConditons(projectId, dateColumn, date1, date2, null, null, null);
    }

    @Override
    public List<Plan> getPlansByEmployeeId(String projectId, String dateColumn, String date1, String date2, String employeeId) {
        return planDao.getPlansByConditons(projectId, dateColumn, date1, date2, employeeId, null, null);
    }

    @Override
    public List<Plan> getPlansByGroupId(String projectId, String dateColumn, String date1, String date2, String groupid) {
        return planDao.getPlansByConditons(projectId, dateColumn, date1, date2, null, groupid, null);
    }

    @Override
    public List<Plan> getPlansByDepartmentId(String projectId, String dateColumn, String date1, String date2, String departmentId) {
        return planDao.getPlansByConditons(projectId, dateColumn, date1, date2, null, null, departmentId);
    }

    @Override
    public JSONArray getStatisticsByCondition(String statisticsType, String conditonString, String projectName, String id) {
        return planDao.getStatisticsByCondition(statisticsType, conditonString, projectName, id);
    }

    @Override
    public JSONArray getPlansWithApply(String checkApplyType, String userId) {
        return planDao.getPlansWithApply(checkApplyType, userId);
    }

    /*****************************************************************************/
    @Override
    public List<Plan> getallplan() {
        // TODO Auto-generated method stub
        List<Plan> plans = planDao.getallplan();
        return plans;
    }

    @Override
    public int getplancount(String plancontroller) {
        // TODO Auto-generated method stub
        int res = planDao.getplancount(plancontroller);
        return res;
    }

    @Override
    public int getChildrenCountByConditions(String parentCode, int stateCode) {
        // TODO Auto-generated method stub
        int res = planDao.getChildrenCountByConditions(parentCode, stateCode);
        return res;
    }

    @Override
    public int updatestate(String plancode, int statecode) {
        // TODO Auto-generated method stub
        return planDao.updatestate(plancode, statecode);
    }


    @Override
    public List<Plan> getstructure() {
        // TODO Auto-generated method stub
        return planDao.getstructure();

    }


    @Override
    public List<Plan> getplanbytype(String key, String value) {
        // TODO Auto-generated method stub
        return planDao.getbytype(key, value);
    }

    @Override
    public List<Plan> getByEmployeeId(String employeeId) {
        // TODO Auto-generated method stub
        return planDao.getByEmployeeId(employeeId);
    }

    @Override
    public List<Plan> getChildPlans(int rootId) {
        // TODO Auto-generated method stub
        return planDao.getChildPlans(rootId);
    }

    public IPlanDao getPlanDao() {
        return planDao;
    }

    public void setPlanDao(IPlanDao planDao) {
        this.planDao = planDao;
    }

    @Override
    public void addPlan(Plan plan, String type) {
        // TODO Auto-generated method stub
        if (type.equals("new")) {
            IEmployeeDao empDao = new EmployeeDao();
//			IRoleInfoDao riDao=new RoleInfoDao();
//			IGroupDao grpDao=new GroupDao();
            IProjectDao proDao = new ProjectDao();
            plan.setProjectName(proDao.getOne(plan.getProjectId()).getProjectName());
            plan.setEmployeeName(empDao.getone(plan.getEmployeeId()).getEmployeeName());
        }
        planDao.add(plan);
    }

    public IProjectDao getProDao() {
        return projectDao;
    }

    public void setProDao(IProjectDao proDao) {
        this.projectDao = proDao;
    }

    public IEmployeeDao getEmpDao() {
        return employeeDao;
    }

    public void setEmpDao(IEmployeeDao empDao) {
        this.employeeDao = empDao;
    }

    public IProjectDao getProjectDao() {
        return projectDao;
    }

    public void setProjectDao(IProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    public IEmployeeDao getEmployeeDao() {
        return employeeDao;
    }

    public void setEmployeeDao(IEmployeeDao employeeDao) {
        this.employeeDao = employeeDao;
    }

    @Override
    public List<Plan> getByProjectName(String projectName) {
        // TODO Auto-generated method stub
        return planDao.getByProjectName(projectName);
    }

    @Override
    public List<Plan> getByProjectId(String projectId) {
        // TODO Auto-generated method stub
        return planDao.getByProjectId(projectId);
    }

    @Override
    public Plan getPlan(String planCode, String projectId) {
        // TODO Auto-generated method stub
        Plan plan = planDao.get(planCode, projectId);
        return plan;
    }

    @Override
    public List<Plan> getByEmployeeIdPorjectName(String employeeId,
                                                 String projectName) {
        // TODO Auto-generated method stub
        return planDao.getByEmployeeIdPorjectName(employeeId, projectName);
    }

    @Override
    public List<Message> getMessage(String employeeId) {
        // TODO Auto-generated method stub
        return planDao.getMessage(employeeId);
    }

    @Override
    public List<Remind> getRemind(String employeeId) {
        // TODO Auto-generated method stub
        return planDao.getRemind(employeeId);
    }

    @Override
    public boolean delMessage(List<String> messageIds) {
        // TODO Auto-generated method stub
        return planDao.delMessage(messageIds);
    }

    @Override
    public List<Plan> getTasksByParentCode(String parentCode, String projectId) {
        // TODO Auto-generated method stub
        return planDao.getTasksByParentCode(parentCode, projectId);
    }

    @Override
    public Plan getPlanByPlanCodeProjectId(String planCode, String projectId) {
        // TODO Auto-generated method stub
        return planDao.get(planCode, projectId);
    }

    @Override
    public List<Action> getActionsByEmployeeId(String employeeId) {
        // TODO Auto-generated method stub
        return planDao.getActionsByEmployeeId(employeeId);
    }

    @Override
    public boolean delTask(List<String> tasksIds) {
        // TODO Auto-generated method stub
        return planDao.delTask(tasksIds);
    }

    @Override
    public void addTask(Plan plan) {
        // TODO Auto-generated method stub

        if (plan.getProjectName() == null && plan.getProjectId() != null
                && plan.getProjectId().equals("") == false) {
            Project project = projectDao.getOne(plan.getProjectId());
            if (project != null)
                plan.setProjectName(project.getProjectName());
        }
        if (plan.getPlanController() == null && plan.getPlanControllerId() != null
                && plan.getPlanControllerId().equals("") == false) {
            Employee employee = employeeDao.getone(plan.getPlanControllerId());
            if (employee != null)
                plan.setPlanController(employee.getEmployeeName());
        }
        if (plan.getEmployeeName() == null && plan.getEmployeeId() != null
                && plan.getEmployeeId().equals("") == false) {
            Employee employee = employeeDao.getone(plan.getEmployeeId());
            if (employee != null)
                plan.setEmployeeName(employee.getEmployeeName());
        }
        if (plan.getParentKey() == null && plan.getParentPlanCode() != null) {
            if (plan.getProjectId() != null) {
                Plan parentPlan = planDao.get(plan.getParentPlanCode(), plan.getProjectId());
                if (parentPlan != null) {
                    plan.setParentKey(parentPlan.getPlanKey());
                    plan.setLevel(parentPlan.getLevel() + 1);
                } else {
                    plan.setLevel(1);
                }
            }
        }
        if (plan.getLevel() == null)
            plan.setLevel(1);
        planDao.addTask(plan);
    }

    @Override
    public boolean addMessage(Message message) {
        // TODO Auto-generated method stub
        return planDao.addMessage(message);
    }

    @Override
    public List<Plan> getWaitingTasks(String employeeId) {
        // TODO Auto-generated method stub
        return planDao.getWaitingTasks(employeeId);
    }

    @Override
    public void freezeCurrentMainPlan(String projectId) {
        // TODO Auto-generated method stub
        planDao.freezeCurrentMainPlan(projectId);
    }

    @Override
    public List<Plan> getChildPlans(String planCode) {
        // TODO Auto-generated method stub
        return planDao.getChildPlans(planCode);
    }

	@Override
	public boolean updatePlan(List<Pair<String, String>> property) {
		// TODO Auto-generated method stub
		return planDao.updatePlan(property);
	}

}
