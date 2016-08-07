package org.sjtu.p615.fracas.service;

import java.util.List;

import org.sjtu.p615.dao.IFailureReportMetadataDao;
import org.sjtu.p615.entity.FailureReportMetadata;

public class FailureReportMetadataService implements
		IFailureReportMetadataService {

	private IFailureReportMetadataDao failureReportMetadataDao;
	
	@Override
	public FailureReportMetadata getOne(String project, String type) {
		// TODO Auto-generated method stub
		return failureReportMetadataDao.getOne(project, type);
	}

	@Override
	public void save(FailureReportMetadata failureReportMetadata) {
		// TODO Auto-generated method stub
		failureReportMetadataDao.save(failureReportMetadata);
	}

	public IFailureReportMetadataDao getFailureReportMetadataDao() {
		return failureReportMetadataDao;
	}

	public void setFailureReportMetadataDao(IFailureReportMetadataDao failureReportMetadataDao) {
		this.failureReportMetadataDao = failureReportMetadataDao;
	}

	@Override
	public List<FailureReportMetadata> getByProject(String project) {
		// TODO Auto-generated method stub
		return failureReportMetadataDao.getByProject(project);
	}

}
