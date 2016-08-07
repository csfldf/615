var roleData = "";

function selectSubmit(){
	$.each($('#dg').datagrid('getSelections'), function(i,rowDom){
		    var rowNum = $('#dg').datagrid('getRowIndex',rowDom);
		})
		
		var roleID ="";
	    var roleName =document.all("dg").rows[rowNum].cells[0].innerText;
		if(roleName != null){
			for(var i = 0; i < roleData.length(); i++){
				if(roleName == roleData[i].roleInfo.roleName)
					roleID = roleData[i].roleInfo.roleID;
			}
			if(roleID != null){
				location.href="task_select.html?id="+roleID;
				$("#main-view").attr("src", "./task_select.html");
			}
		}
    
   
}

$(document).ready(function(e) {
	

	initTable('dg');
	$("#dg").datagrid('appendRow',
	{	
		'roleName':'创建者',
		'groupName':'系统开发组',
		'departmentName':'创新部门'
	});
	
    var username = window.location.search;   //location.search是从当前URL的?号开始的字符串
    if (username.indexOf("pusername")!=-1){        
		var pos_start = username.indexOf('pusername')+10;
		var pos_end = username.indexOf("&",pos_start);
		if (pos_end == -1){
			username = username.substring(pos_start);
			alert(username);

		    $.post(
		    	'../am/getRoleList',
		    	{'employee':username},
		    	function back(data){
		    		roleData = data;
		    		for(i = 0; i < data.length; i++){
		    			$("#dg").datagrid('appendRow',
							{	
								'roleName':data[i].roleInfo.roleName,
								'groupName':data[i].group.groupName,
								'departmentName':data[i].group.departmentName
							});
		    		}
		    	});
		}else{
			alert("没有此值~~");
		}
    }
    
});


