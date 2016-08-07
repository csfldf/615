package org.sjtu.p615.dao;

import org.sjtu.p615.entity.ContractRegist;

public interface IContractRegistDao {
	public void add(ContractRegist contractRegist);
	public void update(ContractRegist contractRegist);
	public ContractRegist get(String id);
}