package org.sjtu.p615.dao;

import java.util.List;

import org.sjtu.p615.entity.Amprivilege;

public interface IAmPrivilegeDao {
public Amprivilege getOneByRoleId(int roleId);
public void addOne(Amprivilege one);
public void changeOne(Amprivilege one);
public void deleteOne(int roleId);
public  List<Amprivilege> getAll();
public List<Amprivilege> getByPrj(String empId,String prjId);
public int checkAuth(String empId,String prjId,String action);
public List<Amprivilege> getAmPrivilegeByEmployeeId(String empId);
}
