var status = "";
var mode = "";

$(document).ready(function() {
	var frn = getUrlParam("frNumber");
	
	
	if(frn == "") {
		reporterMode();
		checkUser(fillCreater);
		getTime(fillCreateTime);
		
	}
	else {
		displayFr(frn);
		
		
	}
	
	checkProject(fillProject);
	
	
});

function saveFr() {
	
	
	var param = {
			"failureReport.frNumber" : $("#failureReportNum").textbox("getValue"),
			"failureReport.frCreater" : $("#fRCreater").textbox("getValue"),
			"frCreateDate" : $("#fRCreateTime").textbox("getValue"),
			
			"failureReport.project" : $("#project").combobox("getText"),
			"failureReport.componentModel" : $("#failureComponentModel").combobox("getText"),
			"failureReport.componentName" : $("#failureComponentName").combobox("getText"),
			"failureReport.componentCode" : $("#failureComponentCode").combobox("getText"),
			"failureReport.componentSruLot" : $("#failureComponentSruLot").combobox("getText"),
			"failureReport.softwareConfig" : $("#softwareConfig").combobox("getText"),
			"failureReport.producer" : $("#producer").combobox("getText"),
			
			"time" : $("#time").datetimebox("getValue"),
			"failureReport.workingHours" : $("#workingHours").numberbox("getValue"),
			
			"failureReport.environment" : $("#environment").combobox("getText"),
			"failureReport.wireNumber" : $("#wireNumber").combobox("getText"),
			"failureReport.effection" : $("#failureEffection").combobox("getText"),
			"failureReport.qualityIssueCategory" : $("#qualityIssueCategory").combobox("getText"),
			"failureReport.type" : $("#aircraft").combobox("getText"),
			"failureReport.systemType" : $("#systemType").combobox("getText"),
			"failureReport.systemSn" : $("#systemSN").combobox("getText"),
			"failureReport.cardNumber" : $("#boardCardNum").combobox("getText"),
			"failureReport.code" : $("#chassisNum").combobox("getText"),
			"failureReport.provider" : $("#provider").combobox("getText"),
			"failureReport.location" : $("#location").combobox("getText"),
			"failureReport.process" : $("#Process").combobox("getText"),
			"failureReport.testEquipmentNumber" : $("#testEquipment").combobox("getText"),
			"failureReport.testEquipmentInfo" : $("#testEquipmentInfo").combobox("getText"),
			"failureReport.failureMode" : $("#failureMode").combobox("getText"),
			
			"failureReport.reporter" : $("#reporter").textbox("getValue"),
			"failureReport.description" : $("#description").textbox("getValue"),
			"failureReport.leaderOpinion" : $("#leaderOpinion").textbox("getValue"),
			"failureReport.projectLeader" : $("#projectLeader").textbox("getValue"),
			"failureReport.mrbOpinion" : $("#mrbOpinion").textbox("getValue"),
			"failureReport.mrbLeader" : $("#mRBLeader").textbox("getValue"),
			"mrbDate" : $("#mRBDate").textbox("getValue"),
			"failureReport.status" : status
			
	};

	$.post(
			"../fracas/add",
			param,
			function back(data) {
				var json = eval("("+data+")");
				window.parent.alertFracasOngoingEvents();
				window.location = "fr_list.html"
			},
			"json"
	);
}

function displayFr(frNumber) {
	$.post(
			'../fracas/get',
			{
				failureReportNum : frNumber
			},
			function back(data) {
				var fr = eval("(" + data + ")");
				
				$("#failureReportNum").textbox("setValue", fr.frNumber);
				$("#fRCreater").textbox("setValue", fr.frCreater);
				$("#fRCreateTime").textbox("setValue", fr.frCreateDate.substring(0, 10));
				
				$("#project").combobox("setValue", fr.project);
				$("#failureComponentModel").combobox("setValue", fr.componentModel);
				$("#failureComponentName").combobox("setValue", fr.componentName);
				$("#failureComponentCode").combobox("setValue", fr.componentCode);
				$("#failureComponentSruLot").combobox("setValue", fr.componentSruLot);
				$("#softwareConfig").combobox("setValue", fr.softwareConfig);
				$("#producer").combobox("setValue", fr.producer);
				
				$("#time").datetimebox("setValue", fr.happenTime);
				$("#workingHours").numberbox("setValue", fr.workingHours);
				
				$("#environment").combobox("setValue", fr.environment);
				$("#wireNumber").combobox("setValue", fr.wireNumber);
				$("#failureEffection").combobox("setValue", fr.effection);
				$("#qualityIssueCategory").combobox("setValue", fr.qualityIssueCategory);
				$("#aircraft").combobox("setValue", fr.type);
				$("#systemType").combobox("setValue", fr.systemType);
				$("#systemSN").combobox("setValue", fr.systemSn);
				$("#boardCardNum").combobox("setValue", fr.cardNumber);
				$("#chassisNum").combobox("setValue", fr.code);
				$("#provider").combobox("setValue", fr.provider);
				$("#location").combobox("setValue", fr.location);
				$("#Process").combobox("setValue", fr.process);
				$("#testEquipment").combobox("setValue", fr.testEquipmentNumber);
				$("#testEquipmentInfo").combobox("setValue", fr.testEquipmentInfo);
				$("#failureMode").combobox("setValue", fr.failureMode);
				
				$("#reporter").textbox("setValue", fr.reporter);
				$("#description").textbox("setValue", fr.description);
				$("#leaderOpinion").textbox("setValue", fr.leaderOpinion);
				$("#projectLeader").textbox("setValue", fr.projectLeader);
				$("#mrbOpinion").textbox("setValue", fr.mrbOpinion);
				$("#mRBLeader").textbox("setValue", fr.mrbLeader);
				$("#mRBDate").textbox("setValue", fr.mrbDate.substring(0, 10));
				
				status = fr.status;
				
				mode = getUrlParam("mode");
				if(mode == "read") {
					readMode();
				}
				else if(mode == "modify") {
					if(status == "wait for pj") {
						reporterMode();
					}
					else if(status == "wait for qa") {
						plMode();
					}
					else if(status == "wait for mrb") {
						qaMode();
					}
					else {
						mrbMode();
					}
				}
				else {
					checkRole(privilegeControl);
				}
			}
	);
}

function privilegeControl(role) {
	if(role == 'project_leader') {
		plMode();
	}
	else if(role == 'qa_leader'){
		qaMode();
	}
	else if(role == 'mrb') {
		mrbMode();
	}
}

function fillCreater(c) {
	$("#fRCreater").textbox("setValue", c);
}

function fillProjectLeader(pl){
	$("#projectLeader").textbox("setValue",pl);
}

function fillMrbLeader(mrb){
	$("#mRBLeader").textbox("setValue",mrb);
}

function fillCreateTime(t) {
	$("#fRCreateTime").textbox("setValue", t);
	var myDate = new Date();
	$("#failureReportNum").textbox("setValue", "FR" + myDate.getMilliseconds());
}

function fillProject(p) {
	$("#project").combobox("setText", p);
	fillMetadata(p);
}

function fillMrbDate(t){
	$("mRBDate").textbox("setValue",t);
}

function fillStatus(r) {
	alert(status);
	if(mode == "modify");
	else if(status == "") {
		status = "wait for pj";
	}
	else if(status == "wait for pj" && r == "project_leader") {
		status = "wait for qa";
	}
	else if(status == "wait for qa" && r == "qa_leader") {
		status = "wait for mrb";
	}
	else if(status == "wait for mrb" && r == "mrb"){
		status = "wait for far";
	}
	alert(status);
	saveFr();
}

function fillMetadata(project) {
		$.post(
				"../fracas/get_selections",
				{params : project},
				function back(data) {
					var map = eval("(" + data + ")");
					
					var failureComponentModel = formatMetadata(map["failureComponentModel"]);
					$("#failureComponentModel").combobox("loadData", failureComponentModel);
					
					var failureComponentName = formatMetadata(map["failureComponentName"]);
					$("#failureComponentName").combobox("loadData", failureComponentName);
					
					var failureComponentCode = formatMetadata(map["failureComponentCode"]);
					$("#failureComponentCode").combobox("loadData", failureComponentCode);
				}
		);
	
}

function formatMetadata(metadata) {
	var datas = metadata.split(",");
	var list = [];
	for(var i = 0; i < datas.length; i ++) {
		list[i] = {
				id : i,
				name : datas[i]
		}
	}
	return list;
}

function reporterMode() {
	$("#p2").hide();
	$("#p3").hide();
	$("#p4").hide();
	
	$("#p0 .easyui-textbox").textbox("readonly");
	$("#project").combobox("readonly");
}

function plMode() {
	$("#p3").hide();
	$("#p4").hide();
	
	$("#p0 .easyui-textbox").textbox("readonly");
	
	$("#p1 .easyui-textbox").textbox("readonly");
	$("#p1 .easyui-combobox").combobox("readonly");
	$("#p1 .easyui-datetimebox").datetimebox("readonly");
	$("#p1 .easyui-numberbox").datetimebox("readonly");
	$("#p1 .easyui-filebox").filebox("readonly");
	
	checkUser(fillProjectLeader);
}

function qaMode(){
	$("#p4").hide();
	
	$("#p1 .easyui-textbox").textbox("readonly");
	$("#p1 .easyui-combobox").combobox("readonly");
	$("#p1 .easyui-datetimebox").datetimebox("readonly");
	$("#p1 .easyui-numberbox").datetimebox("readonly");
	$("#p1 .easyui-filebox").filebox("readonly");
	
	$("#p2 .easyui-textbox").textbox("readonly");
	$("#p2 .easyui-combobox").combobox("readonly");
}

function mrbMode() {
	$("#p0 .easyui-textbox").textbox("readonly");
	
	$("#p1 .easyui-textbox").textbox("readonly");
	$("#p1 .easyui-combobox").combobox("readonly");
	$("#p1 .easyui-datetimebox").datetimebox("readonly");
	$("#p1 .easyui-numberbox").datetimebox("readonly");
	$("#p1 .easyui-filebox").filebox("readonly");
	
	$("#p2 .easyui-textbox").textbox("readonly");
	$("#p2 .easyui-combobox").combobox("readonly");
	
	$("#p3 .easyui-textbox").textbox("readonly");
	$("#p3 .easyui-combobox").combobox("readonly");
	
	checkUser(fillMrbLeader);
	getTime(fillMrbDate);
}

function readMode() {
	$("#p0 .easyui-textbox").textbox("readonly");
	
	$("#p1 .easyui-textbox").textbox("readonly");
	$("#p1 .easyui-combobox").combobox("readonly");
	$("#p1 .easyui-datetimebox").datetimebox("readonly");
	$("#p1 .easyui-numberbox").datetimebox("readonly");
	$("#p1 .easyui-filebox").filebox("readonly");
	
	$("#p2 .easyui-textbox").textbox("readonly");
	$("#p2 .easyui-combobox").combobox("readonly");
	
	$("#p3 .easyui-textbox").textbox("readonly");
	$("#p3 .easyui-combobox").combobox("readonly");
	
	$("#p4 .easyui-textbox").textbox("readonly");
}