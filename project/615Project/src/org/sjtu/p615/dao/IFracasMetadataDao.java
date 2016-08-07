package org.sjtu.p615.dao;

import java.util.ArrayList;

import org.sjtu.p615.entity.FailureReportMetadata;
import org.sjtu.p615.entity.FracasMetadata;

public interface IFracasMetadataDao {
	public void save(FracasMetadata fracasMetadata);
	public ArrayList<FracasMetadata> getOneSelectionList(String metadataName);
	public ArrayList<FracasMetadata> getAllMetadata();
	public ArrayList<String> getAllMetadataName();
	public void deleteAllMetadata();
}
