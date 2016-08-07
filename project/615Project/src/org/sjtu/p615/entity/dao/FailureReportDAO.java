package org.sjtu.p615.entity.dao;

import org.hibernate.Session;

import org.sjtu.p615.entity.base.BaseFailureReportDAO;


public class FailureReportDAO extends BaseFailureReportDAO implements org.sjtu.p615.entity.dao.iface.FailureReportDAO {

	public FailureReportDAO () {}
	
	public FailureReportDAO (Session session) {
		super(session);
	}


}