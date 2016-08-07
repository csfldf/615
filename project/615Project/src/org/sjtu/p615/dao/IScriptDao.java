package org.sjtu.p615.dao;
import java.util.List;

import org.sjtu.p615.entity.Script;
public interface IScriptDao {
public List<Script> getList(String employeeId);
public void addScript(Script scp);
public Script getOneScript(int scriptKey);
public void deleteOneScript(int scriptKey);
List<Script> getList(String employeeId, String scriptTye);
}
