package org.sjtu.p615.fracas.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.sjtu.p615.dao.IFracasMetadataDao;
import org.sjtu.p615.entity.FracasMetadata;

public class FracasMetadataService implements IFracasMetadataService {
	private IFracasMetadataDao fracasMetadataDao;
	
	public IFracasMetadataDao getFracasMetadataDao() {
		return fracasMetadataDao;
	}

	public void setFracasMetadataDao(IFracasMetadataDao fracasMetadataDao) {
		this.fracasMetadataDao = fracasMetadataDao;
	}

	@Override
	public void save(FracasMetadata fracasMetadata) {
		// TODO Auto-generated method stub
		fracasMetadataDao.save(fracasMetadata);
	}

	@Override
	public ArrayList<FracasMetadata> getOneSelectionList(String metadataName) {
		// TODO Auto-generated method stub
		return fracasMetadataDao.getOneSelectionList(metadataName);
	}

	@Override
	public Map<String,String> getAllMetadata(){
		Map<String,String> metadataSelections = new HashMap();
		ArrayList<String> metadataNames = fracasMetadataDao.getAllMetadataName();
		ArrayList<FracasMetadata> metadataList = fracasMetadataDao.getAllMetadata();
		for(int i = 0; i<metadataNames.size(); i++){
			String metadataName = metadataNames.get(i);
			String 	selectionValue = "";
			for(int j = 0; j< metadataList.size(); j++){
				String name = metadataList.get(j).getMetadataName();
				String value = metadataList.get(j).getValue();
				if(name.equals(metadataName)){
					 selectionValue = selectionValue + value +",";
				}
			}
			//System.out.println(metadataName+":"+selectionValue);
			int size = selectionValue.length();
			if(size != 0)
				metadataSelections.put(metadataName, selectionValue.substring(0, size-1));
		}
		return metadataSelections;
	}
	
	@Override
	public ArrayList<String> getAllMetadataNames(){
		return fracasMetadataDao.getAllMetadataName();
	}
	
	@Override
	public void deleteAllMetadata(){
		fracasMetadataDao.deleteAllMetadata();
	}
}
