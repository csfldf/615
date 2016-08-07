package org.sjtu.p615.am.service;

import java.util.List;

import org.sjtu.p615.dao.IScriptDao;
import org.sjtu.p615.dao.ScriptDao;
import org.sjtu.p615.entity.Script;

public class ScriptService implements IScriptService{
private IScriptDao scriptDao;
	@Override
	public List<Script> getList(String employeeId) {
		
		return this.scriptDao.getList(employeeId);
	}
	@Override
	public Script getOneScript(String employeeId,String scriptType,String uuid) {		
		List<Script> scripts=getList(employeeId,scriptType);
		for(Script tmp : scripts){
			if(tmp.getUuid().equalsIgnoreCase(uuid))
				return tmp;
		}
		return null;
	}
	@Override
	public List<Script> getList(String employeeId,String scriptType) {
		
		return this.scriptDao.getList(employeeId,scriptType);
	}
	@Override
	public void addScript(Script scp) {
		
		scriptDao.addScript(scp);
	}
	@Override
	public Script getOneScript(int scriptKey) {
		
		return scriptDao.getOneScript(scriptKey);
	}
	@Override
	public void deleteOneScript(int scriptKey) {
		
		scriptDao.deleteOneScript(scriptKey);
	}
	public IScriptDao getScriptDao() {
		return scriptDao;
	}
	public void setScriptDao(IScriptDao scriptDao) {
		this.scriptDao = scriptDao;
	}

}
