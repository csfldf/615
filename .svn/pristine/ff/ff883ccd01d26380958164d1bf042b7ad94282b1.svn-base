define(function() {
	var dataPicker = {};
	
	dataPicker.getFrsByEmployee = function(eid, callback) {
		$.post(
				'fracas/getFrsByEmployee',
				{params : eid},
				function(data) {
					var frs = eval("(" + data + ")");
					callback(frs);
				}
		); // post
	};
	
	dataPicker.getFrsByProject = function(projectName, callback) {
		$.post(
				'fracas/getByProject',
				{params : projectName},
				function(data) {
					var frs = eval("(" + data + ")");
					callback(frs);
				}
		);
	};
	
	dataPicker.getOneFr = function(frNumber, callback) {
		$.post(
				'fracas/get',
				{failureReportNum : frNumber},
				function(data) {
					var fr = eval("(" + data + ")");
					callback(fr);
				}
		);
	}
	
	dataPicker.getOnGoingFrs = function(roleId, frs) {
		var ogfrs = [];
		
		for(var i = 0; i < frs.length; i ++) {
			if(roleId == 8 && frs[i].status == "wait for tl") {
				ogfrs.push(frs[i]);
			}
			else if(roleId == 9 && frs[i].status == "wait for qa") {
				ogfrs.push(frs[i]);
			}
			else if(roleId == 10 && frs[i].status == "wait for mrb") {
				ogfrs.push(frs[i]);
			}
		}
		
		return ogfrs;
	}
	
	// get employee's FR drafts
	dataPicker.getFrDrafts = function(eid, callback) {
		$.post(
				'fracas/getFrDrafts',
				{params : eid},
				function(data) {
					var frs = eval("(" + data + ")");
					callback(frs);
				}
		); // post
	}
	
	// get all employees in the given project
	dataPicker.getEmployeesByProject = function(project, callback) {
		$.post(
				'util/get_role_by_project',
				{projectName : project},
				function(data) {
					var roles = eval("(" + data + ")");
					callback(roles);
				}
		);
	}
	
	dataPicker.getFarsByEmployee = function(eid, callback) {
		$.post(
				'fracas/getFarsByEmployee',
				{params : eid},
				function(data) {
					var fars = eval("(" + data + ")");
					callback(fars);
				}
		); // post
	}; // getFarsByEmployee
	
	dataPicker.getOneFar = function(farNumber, callback) {
		$.post(
				'fracas/getOneFar',
				{params : farNumber},
				function(data) {
					var far = eval("(" + data + ")");
					callback(far);
				}
		);
	}
	
	dataPicker.getFarDrafts = function(eid, callback) {
		$.post(
				'fracas/getFarDrafts',
				{params : eid},
				function(data) {
					var fars = eval("(" + data + ")");
					callback(fars);
				}
		); // post
	}
	
	dataPicker.getAllMetadata = function(callback) {
		$.post(
				'fracas/getAllMetadata',
				{},
				function(data) {
					data = eval('(' + data + ')');
					callback(data);
				}
		);
	}
	
	dataPicker.getAllCars = function(callback) {
		$.post(
				'fracas/getAllCars',
				{},
				function(data) {
					data = eval("(" + data + ")");
					callback(data);
				}
		);
	}
	
	dataPicker.getOneCar = function(carNumber, callback) {
		$.post(
				'fracas/getOneCar',
				{params : carNumber},
				function(data) {
					var car = eval("(" + data + ")");
					callback(car);
				}
		);
	}
	
	
	return dataPicker;
	
});
