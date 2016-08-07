/**
 * 
 */

$(document).ready(function() {
	init();
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
				$("#project").combobox("clear");
			}
	);
}

function init() {
	
	
	$("#frType").combobox({
		onSelect : function(data) {
			loadFrValue();
		}
	});
	
	$("#project").combobox({
		onSelect : function(data) {
			$("#frType").combobox("enable");
		}
	});
	
	
	$("#frType").combobox("disable");
	$("#frType").combobox("clear");
	
}

function loadFrValue() {
	var project = $("#project").combobox("getText");
	var frType = $("#frType").combobox("getValue");
	var params = project + " " + frType;
	$.post(
			"../fracas/load_fr_metadata",
			{params : params},
			function back(data) {
				var d = eval("(" + data + ")");
				if(d == null) {
					$("#frMetadata").textbox("setText", "");
				}
				else {
					$("#frMetadata").textbox("setText", d.value);
				}
				
			}
	);
}

function submitChange() {
	var project = $("#project").combobox("getText");
	var frType = $("#frType").combobox("getValue");
	var frMetadata = $("#frMetadata").textbox("getText");
	
	var params = project + " " + frType + " " + frMetadata;
	$.post(
			"../fracas/save_metadata",
			{params : params},
			function back(data) {
				alert("修改成功");
			}
	);
}