define(['fracas.sessionUtil', 'UIMainFrame', 'fracas.fracasDataPicker'], function(sessionUtil, main, dataPicker) {
	var projectSelect = {};
	var tabId;
	
	var mode = avalon.define("projectSelect", function(vm) {
		_vm = vm;
		vm.showDetail = false;
		vm.projectInfo = ['项目名称', '角色', '待处理数'];
		vm.projectArray = [];
		vm.selectOneProject = function(project) {
			sessionUtil.putProjectRole(project.projectName, project.roleId, function(data) {});
			vm.showDetail = true;
			dataPicker.getFrsByProject(project.projectName, function(data){
				setOnGoingFrs(project.roleId, data);
			});
			
		};
		
		vm.onGoingFrs = [];
	});
	
	projectSelect.init = function(tid) {
		tabId = tid;
		setProjectArray();
		sessionUtil.getEmployeeId(setProjectArray);
		setTimeout(function() {
		  $('#general-table').slideDown( "slow" );
		}, 100);
	}
	
	
	function setProjectArray(eid) {
		$.post(
				'util/get_role_by_employee',
				{'employeeId' : eid},
				function back(data) {
					var roles = eval("(" + data + ")");
					var isIn = false;
					mode.projectArray.clear();
					
					$.post(
							'fracas/get_Amounts',
							{employeeId : eid},
							function(data) {
								var map = eval("(" + data + ")");
								for(var i = 0; i < roles.length; i ++) {
									if(roles[i].roleId != 8 && roles[i].roleId != 9 && roles[i].roleId != 10 && isIn == false) {
										mode.projectArray.push({
											'projectName' : roles[i].projectName,
											'roleName' : '故障报告人',
											'roleId' : roles[i].roleId,
											'count' : 0
										});
									}
									else {
										mode.projectArray.push({
											'projectName' : roles[i].projectName,
											'roleName' : roles[i].roleName,
											'roleId' : roles[i].roleId,
											'count' : map[roles[i].projectName  + ":" + roles[i].roleId]
										});
									}
									
									
								}
							}
					);
				}
		);
		
	}
	
	function setOnGoingFrs(roleId, frs) {
		mode.onGoingFrs.clear();
		var ogfrs = dataPicker.getOnGoingFrs(roleId, frs);
		for(var i = 0; i < ogfrs.length; i ++) {
			mode.onGoingFrs.push({
				frNumber : ogfrs[i].frNumber,
				project : ogfrs[i].project,
				frCreater : ogfrs[i].frCreater,
				frCreateDate : ogfrs[i].frCreateDate,
				reporter : ogfrs[i].reporter,
				happenTime : ogfrs[i].happenTime,
				status : ogfrs[i].status
			});
		}
	}
	
	return projectSelect;
});