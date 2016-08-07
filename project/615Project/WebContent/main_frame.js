var uName = "";
var uRole = "";

$(document).ready(function() {
	$('#dlg').dialog('close');
	$(".alert_icon").hide();

	$.post(
			'./util/check_user',
			{},
			function back(data) {
				uName = data;
				if(data != null) {
					$.post(
							'./util/check_role',
							{},
							function back(data) {
								uRole = data;
								document.getElementById("user").innerHTML="user:"+uName+"/Role:"+uRole;
							}
					);
				}
			}
	);
});

function navFracas() {
	$("#west-view").attr("src", "fracas/fracas_west.html");
	$("#main-view").attr("src", "common/project_select.html");
}

function login(){
	var username = $('#userName').val();
	uName = username;
	var password = $('#password').val();
	//alert(username);
	//alert(password);
	
	$.post('./am/login',
			{
				"username":username,
				"password":password
			},
			function back(data){
				/*
				var backdata = eval("("+data+")");
				var name = backdata.userName;
				document.getElementById("user").innerHTML="user:"+name;
				*/
				alertFracasOngoingEvents();
				
				navFracas();
			});
	$('#dlg').dialog('close');
}

function loginOnclick(){
	$('#dlg').dialog('open');
//	$('#userName').val("");
//	$('password').val("");
}

function alertMessage(title, content) {
	$.messager.alert(title, content);
}

function alertFracasOngoingEvents() {
	$.post(
			'./fracas/get_Amounts',
			{
				'employeeId' : uName
			},
			function back(data) {
				var map = eval("(" + data + ")");
				var total = map["total"];
				if(total != 0) {
					$("#fracas_alert_icon").val(total);
					$("#fracas_alert_icon").show();
				}
				else {
					$("#fracas_alert_icon").hide();
				}
				
			}
	);
}