$(document).ready(function() {
	
    var roleID = window.location.search;   //location.search是从当前URL的?号开始的字符串
    if (roleID.indexOf("id")!=-1){
		var pos_start = roleID.indexOf('id')+3;
		var pos_end = roleID.indexOf("&",pos_start);
		if (pos_end == -1){
			roleID = roleID.substring(pos_start);
//			var backdata = eval("("+selectInfo+")");
//			var roleName = backdata[0];
//			var groupName = backdata[1];
//			var departmentName = backdata[2];
			
			$.post(
			    	'../am/',
//			    	{'roleName':roleName,'groupName':groupName,'departmentName':departmentName},
			    	{'roleID':roleID},
			    	function back(data){
			    		for(var i = 0; i < data.length; i++){
			    			if(data[i].complete == true){
				    			$("#donedg").datagrid('appendRow',
									{	
					    				'planSerialNumber':data[i].planSerialNumber,
										'planCode':data[i].planCode,
										'planName':data[i].planName,
										'planIssuedDate':data[i].planIssuedDate,
										'planDeadlineDate':data[i].planDeadlineDate,
										'planRemainingDate':data[i].planRemainingDate,
										'planStartDate':data[i].planStartDate,
										'planSource':data[i].planSource,
										'planState':data[i].planState	
									});
			    			}
			    			else{
				    			$("#doingdg").datagrid('appendRow',
									{	
					    				'planSerialNumber':data[i].planSerialNumber,
										'planCode':data[i].planCode,
										'planName':data[i].planName,
										'planIssuedDate':data[i].planIssuedDate,
										'planDeadlineDate':data[i].planDeadlineDate,
										'planRemainingDate':data[i].planRemainingDate,
										'planStartDate':data[i].planStartDate,
										'planSource':data[i].planSource,
										'planState':data[i].planState
									});
			    			}
			    		}
			    	});
		}else{
			alert("something is wrong");
		}
    }
});