package org.sjtu.p615.fracas.service;

import org.sjtu.p615.dao.IFailureDescriptionAttachmentsDao;
import org.sjtu.p615.entity.FailureDescriptionAttachments;

public class FailureDescriptionAttachmentsService implements IFailureDescriptionAttachmentsService {
	private IFailureDescriptionAttachmentsDao failureDescriptionAttachmentsDao;
	
	@Override
	public void addFailureDescriptionAttachments(FailureDescriptionAttachments descriptionAttachments) {
		// TODO Auto-generated method stub
		failureDescriptionAttachmentsDao.add(descriptionAttachments);
	}

	@Override
	public FailureDescriptionAttachments getDescriptionAttachments(String queryCondition) {
		// TODO Auto-generated method stub
		return failureDescriptionAttachmentsDao.get(queryCondition);
	}
	

	public IFailureDescriptionAttachmentsDao getFailureDescrpAttachDao() {
		return failureDescriptionAttachmentsDao;
	}

	public void setFailureDescriptionAttachmentsDao(IFailureDescriptionAttachmentsDao failureDescrptAttachDao) {
		this.failureDescriptionAttachmentsDao = failureDescrptAttachDao;
	}

}
