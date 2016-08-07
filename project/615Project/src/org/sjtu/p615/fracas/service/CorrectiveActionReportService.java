package org.sjtu.p615.fracas.service;

import java.util.ArrayList;

import org.sjtu.p615.dao.ICorrectiveActionReportDao;
import org.sjtu.p615.entity.Correctiveactionreport;

public class CorrectiveActionReportService implements
		ICorrectiveActionReportService {
	private ICorrectiveActionReportDao carDao;
	public ICorrectiveActionReportDao getCarDao() {
		return carDao;
	}

	public void setCarDao(ICorrectiveActionReportDao carDao) {
		this.carDao = carDao;
	}

	@Override
	public void addCar(Correctiveactionreport car) {
		// TODO Auto-generated method stub
		carDao.add(car);
	}

	@Override
	public Correctiveactionreport getOneCar(String carNumber) {
		// TODO Auto-generated method stub
		Correctiveactionreport car = carDao.getOneCar(carNumber);
		return car;
	}

	@Override
	public ArrayList<Correctiveactionreport> getAllCars() {
		// TODO Auto-generated method stub
		return carDao.getAllCar();
	}

}
