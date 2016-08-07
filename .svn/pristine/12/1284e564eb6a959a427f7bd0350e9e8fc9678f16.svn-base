define(function() {
	var sessionUtil = {};
	
	sessionUtil.getEmployeeId = function(callback) {
		$.post(
				'util/check_user_id', 
				{},
				function(data) {
					callback(data);
				}
		);
	};
	
	sessionUtil.getEmployeeName = function(callback) {
		$.post(
				'util/check_user', 
				{},
				function(data) {
					callback(data);
				}
		);
	};
	
	sessionUtil.getRole = function(callback) {
		$.post(
				'util/check_role',
				{},
				function(data) {
					callback(data);
				}
			);
	}
	
	sessionUtil.getAllProjects = function(callback) {
		$.post(
				'am/getAllProject',
				{},
				function(data) {
					callback(data);
				}
			);
	}
	
	sessionUtil.putProjectRole = function(projectName, roleId, callback) {
		$.post(
				'fracas/select_project',
				{
					'projectName' : projectName,
					'role' : roleId
				},
				
				function(data) {
					callback(data);
				}
		);
	};
	
	sessionUtil.getServerTime = function(callback) {
		$.post(
				'util/get_time',
				{},
				function(data) {
					callback(data);
				}
			);
	}
	
	//get employee's basic info. Include employee id, employee name, the project and the relative role
	sessionUtil.getEmployeeInfo = function(callback) {

		$.post(
				'util/get_role_info',
				{},
				function(data) {
					var data = eval("(" + data + ")");
					var res = {};
					if(data.length != 0){
						res.employeeId = data[0].employeeId;
						res.employeeName = data[0].employeeName;
						res.projectRole = [];
						for (var i = 0; i < data.length; i ++) {
							res.projectRole[i] = [data[i].projectName, data[i].roleId];
						}
						callback(res);
					}
					else
						callback(null);
				}
			);// post
		
	}// getEmployeeInfo
	
	return sessionUtil;
});