var projectName = "";
var userId = "";
var roleName = "";
var grid_data = [];

function selectProject() {
	$.post(
			'../fracas/select_project',
			{
				'projectName' : projectName,
				'role' : roleName
			},
			
			function back(data) {
				window.location = '../fracas/fr_list.html';
			}
	);
}

function checkLogin(user) {
	if(user == null) {
		window.parent.loginOnclick();
	}
	else {
		selectProject();
	}
}

$(document).ready(function() {
	$.post(
			'../util/check_user_id', 
	{}, 
	function back(data) {
		userId = data;
		if(userId == null) {
			window.parent.loginOnclick();
		}
		else {
			$.post(
					'../fracas/get_Amounts',
					{'employeeId' : userId},
					function back(data) {
						var map = eval("(" + data + ")");
						
						$.post(
								'../util/get_role_by_employee',
								{'employeeId' : userId},
								function back(data) {
									var roles = eval("(" + data + ")");
									var j = 0;
									for(var i = 0; i < roles.length; i ++) {
										//if(roles[i].roleName != "project_leader" && roles[i].roleName != "qa_leader" && roles[i].roleName != "mrb") continue;
										grid_data[j] = {
												projectName : roles[i].projectName,
												role : roles[i].roleName,
												count : map[roles[i].projectName + ":" + roles[i].roleName]
										};
										j++;

									};
									
									$('#dg').datagrid({
										data : grid_data,

										onClickRow : function(rowIndex, rowData) {
											projectName = rowData.projectName;
											roleName = rowData.role;
											alert(roleName);
											selectProject();
										},
									});
									
								}
						);
						
					}
					
					
			);
			
		}
		
	});

	
});


