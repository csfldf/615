package org.sjtu.p615.am.service;

import org.sjtu.p615.entity.Project;

import java.util.List;

public interface IProjectService {
public void addOneProject(Project project);
public void add(Project project);

    List<Project> getAllProjects();

    public Project getOneProject(String projectId);
public Project getByProjectName(String projectName);
public Project getByProNameAndEmployeeId(String projectName,String employeeId);
public List<Project> getAllProject(String empId);
public List<Project> getPrjsCreatedByMe(String empId);
public void deleteOneProject(String projectId);
}
