var uName = "";
var uRole = "";

var ifLogin = false;

$(document).ready(function() {
	$('#dlg').dialog('close');

	/*$.post(
			'../am/check_user',
			{},
			function back(data) {
				uName = data;
				if(data != null) {
					$.post(
							'../am/check_role',
							{},
							function back(data) {
								uRole = data;
								document.getElementById("user").innerHTML="user:"+uName+"/Role:"+uRole;
							}
					);
				}
			}
	);*/
});

//function navFracas() {
//	$("#west-view").attr("src", "../fracas/fracas_west.html");
//	$("#main-view").attr("src", "../common/project_select.html");
//}

function navAmAction() {
//	$("#west-view").attr("src", "./am_west.html");
//	$("#main-view").attr("src", "./role_select.html");
	if(!ifLogin)
		alert("请登录");
	else{
		$("#west-view").attr("src", "./am_west.html");
		$("#main-view").attr("src", "./task_list.html");
	}
}

function login(){
	alert("login");
	var username = $('#userName').val();
	var password = $('#password').val();
	
	$.post('../am/login',
			{
				"username":username,
				"password":password
			},
			function back(data){
				var res=data.msg;
				if(res=="success"){
					ifLogin = true;
					alert("login success");
					//alert("EDITOR:"+data.editor);
					//alert("MANAGER:"+data.manager);
					document.getElementById("user").innerHTML=username;
					$('.menu-bar').append('<br><a id="logout" href="javascript:void(0)" onclick="logoutOnclick()" style="font-size:20px;color:black;">登出</a>');
					$('#dlg').dialog('close');
					
					//$("#main-view").attr("src", "./task_list.html");
				}
				else{
					alert("login failed");
				}
		});
}
//				var backdata = eval("("+data+")");
//				var userErr = backdata.userErr;
//				var pwdErr = backdata.pwdErr;
//				if(userErr == false)
//					alert("user not exist!");
//				else if(pwdErr == false)
//					alert("password wrong!");
//				else{
//					document.getElementById("user").innerHTML="user:"+name+"/Role:"+role;
//					var roleList = data.role;
					
//					location.href="role_select.html?pusername="+username;
//					$("#main-view").attr("src", "./role_select.html");

//				}
		//		var name = backdata.userName;
		//		var role = backdata.role;				//alert("user:"+name);


function loginOnclick(){
	$('#dlg').dialog('open');
}

function logoutOnclick(){
	$("#west-view").attr("src", "");
	$("#main-view").attr("src", "");
	
	document.getElementById("user").innerHTML="登陆";
	$("#logout").prev().remove();
	$("#logout").remove();
	ifLogin = false;
}

function alertMessage(title, content) {
	$.messager.alert(title, content);
}