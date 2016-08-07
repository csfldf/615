/**
 * 
 */

$(document).ready(function() {
	getProject();
});

function getProject() {
	$.post(
			"../util/get_all_project",
			{},
			function back(data) {
				var projects = eval("(" + data + ")");
				var list = [];
				for(var i = 0; i < projects.length; i ++) {
					list[i] = {
						id : i,
						text : projects[i].projectName
					};
				}
				$("#project").combobox("loadData", list);
				$("#project").combobox({
					onSelect : function(data) {
						var project = data.text;
						$("#pl").combobox("clear");
						$("#qa").combobox("clear");
						$("#mrb").combobox("clear");
						fillRole(project);
					}
				});
			}
	);
}

function fillRole(project) {
	$.post(
		"../util/get_role_by_project",
		{projectName : project},
		function back(data) {
			var roles = eval("(" + data + ")");
			var map = {};
			var list = [];
			for(var i = 0; i < roles.length; i ++) {
				if(map[roles[i].employeeId] == null) {
					map[roles[i].employeeId] = 1;
					
					list[i] = {
							id : i,
							text : roles[i].employeeId + " " + roles[i].employeeName
					}
				}

				roleName = roles[i].roleName;
				if(roleName == "project_leader") {
					$("#pl").combobox("setValue", roles[i].employeeId + " " + roles[i].employeeName);
				}
				else if(roleName == "qa_leader") {
					$("#qa").combobox("setValue", roles[i].employeeId + " " + roles[i].employeeName);
				}
				else if(roleName == "mrb") {
					$("#mrb").combobox("setValue", roles[i].employeeId + " " + roles[i].employeeName);
				}
			}
			
			$("#pl").combobox("loadData", list);
			$("#qa").combobox("loadData", list);
			$("#mrb").combobox("loadData", list);
			
		}
	);
}

function submitChange() {
	var project = $("#project").combobox("getText");
	var pl = $("#pl").combobox("getText");
	var qa = $("#qa").combobox("getText");
	var mrb = $("#mrb").combobox("getText");
	
	var param = project + " " + pl + " " + qa + " " +  mrb;
	alert(param);
	$.post(
			"../util/save_role",
			{fracasRoleCombine : param},
			function back(data) {
				alert("修改成功");
			}
	);
}