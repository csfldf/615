var allFrs;
var role;
var uname;

$(document).ready(function() {
	
	$.post(
			'../fracas/getByProject', 
	{}, 
	
	function back(data) {
		allFrs = eval("(" + data + ")");
		setAll(allFrs);
		checkRole();
	});
	
	
});

function getFrsByAttr(attrKey, attrValue) {
	$.post(
		'../fracas/getByAttr',
		{
			"attrKey" : attrKey,
			"attrValue" : attrValue
		},
		function back(data) {
			var frs = eval("(" + data + ")");
			setAll(frs);
		}
	);
}

function setAll(frs) {
	var grid_data = [];
	for(var i = 0; i < frs.length; i ++) {
		grid_data[i] = {
				frNumber : frs[i].frNumber,
				project : frs[i].project,
				reporter : frs[i].reporter,
				happenTime : frs[i].happenTime,
				status : frs[i].status
		};
	}
	
	$('#dg').datagrid({
		data : grid_data,

		onClickRow : function(rowIndex, rowData) {
			window.location = 'FailureReport.html?frNumber=' + rowData.frNumber + '&mode=read';
		},
	});
}

function setInProcess(frs) {
	var grid_data = [];
	for(var i = 0; i < frs.length; i ++) {
		grid_data[i] = {
				frNumber : frs[i].frNumber,
				project : frs[i].project,
				reporter : frs[i].reporter,
				happenTime : frs[i].happenTime,
				status : frs[i].status
		};
	}
	
	$('#dgp').datagrid({
		data : grid_data,

		onClickRow : function(rowIndex, rowData) {
			window.location = 'FailureReport.html?frNumber=' + rowData.frNumber;
		},
	});
}

function setMine(frs) {
	var grid_data = [];
	for(var i = 0; i < frs.length; i ++) {
		grid_data[i] = {
				frNumber : frs[i].frNumber,
				project : frs[i].project,
				reporter : frs[i].reporter,
				happenTime : frs[i].happenTime,
				status : frs[i].status
		};
	}
	
	$('#dgm').datagrid({
		data : grid_data,

		onClickRow : function(rowIndex, rowData) {
			window.location = 'FailureReport.html?frNumber=' + rowData.frNumber + '&mode=modify';
		},
	});
}

function checkRole() {
	$.post(
		'../util/check_role',
		{},
		function back(data) {
			role = data;
			checkUser();
		}
	);
}

function checkUser() {
	$.post(
			'../util/check_user',
			{},
			function back(data) {
				uname = data;
				var frps = [];
				var frms = [];
				var cp = 0, cm = 0;
				for(var i = 0; i < allFrs.length; i++) {
					if(role == "project_leader") {
						if(allFrs[i].status == "wait for pj") {
							frps[cp] = allFrs[i];
							cp ++;
						}
						else if(allFrs[i].status == "wait for qa") {
							frms[cm] = allFrs[i];
							cm ++;
						}
					}
					else if(role == "qa_leader"){
						if(allFrs[i].status == "wait for qa") {
							frps[cp] = allFrs[i];
							cp ++;
						}
						else if(allFrs[i].status == "wait for mrb") {
							frms[cm] = allFrs[i];
							cm ++;
						}
					}
					else if(role == "mrb") {
						if(allFrs[i].status == "wait for mrb") {
							frps[cp] = allFrs[i];
							cp ++;
						}
						else if(allFrs[i].status == "wait for far") {
							frms[cm] = allFrs[i];
							cm ++;
						}
					}
					
					if(uname == allFrs[i].frCreater && allFrs[i].status == 'wait for pj') {
						frms[cm] = allFrs[i];
						cm ++;
					}
				}
				setInProcess(frps);
				setMine(frms);
			}
		);
}