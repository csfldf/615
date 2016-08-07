define(['fracas.fracasDataPicker', 'fracas.sessionUtil',
        'avalon/dropdown/avalon.dropdown', 
        'avalon/textbox/avalon.textbox'], function(dataPicker, sessionUtil) {
	
	var projectManagement = {};
	
	var projectManagementMode = avalon.define("projectManagement", function(vm) {
		vm.project = "";
		vm.projectOpts = {data: [{value:'1', label:'1'}, {value:'2', label:'2'}, {value:'3', label:'3'}], readOnly:false};
		
		vm.projectLeader = "";
		vm.projectLeaderOpts = {data: [{value:'1', label:'1'}, {value:'2', label:'2'}, {value:'3', label:'3'}], readOnly:false};
		
		vm.qaManager = "";
		vm.qaManagerOpts = {data: [{value:'1', label:'1'}, {value:'2', label:'2'}, {value:'3', label:'3'}], readOnly:false};
		
		vm.mrb = "";
		vm.mrbOpts = {data: [{value:'1', label:'1'}, {value:'2', label:'2'}, {value:'3', label:'3'}], readOnly:false};
		
		vm.saveFr = function() {
	    	console.log('-- Save');
	    };

	    vm.commitFr = function() {
	    	var param = {
	   // 		'role.'
	    	}
	    	console.log('-- Commit');
	    };

	    vm.cancelFr = function() {
	    	console.log('-- Cancel');
	    };

	    vm.back = function() {
	    	console.log('-- Back');
            window.location.href='#!/fracas/project_management';
	    };    
	    /*
	    vm.selectProject = function(){
	    	$.post('am/getRolesForFracas',{'projectName':vm.project},function back(data){
	        	//alert("hello hello");
	        	//alert(data);
	        	var jsondata = eval("(" + data + ")");
	        	projectManagementMode.projectLeaderOpts = jsondata;
	        	projectManagementMode.qaManagerOpts = jsondata;
	        	projectManagementMode.mrbOpts = jsondata;
	        })
	    };
	    */
	    vm.$watch("project", function(a) {
	    	$.post('am/getRolesForFracas',{'projectName':a},function back(data){
	        	//alert("hello hello");
	        	//alert(data);
	    		//alert(a);
	        	var jsondata = eval("(" + data + ")");
	        	projectManagementMode.projectLeaderOpts = jsondata;
	        	projectManagementMode.qaManagerOpts = jsondata;
	        	projectManagementMode.mrbOpts = jsondata;
	        })
        })
	    
	});
	
	
	projectManagement.init = function() {
		//alert("hello");
			        
		$.post('am/getAllProject',{},function back(data){
			//alert(data);
			projectManagementMode.projectOpts=data;
        })
        projectManagementMode.project = "C919";
        $.post('am/getRolesForFracas',{'projectName':projectManagementMode.project},function back(data){
	        	//alert(data);
	        var jsondata = eval("(" + data + ")");
	        projectManagementMode.projectLeaderOpts = jsondata;
	        projectManagementMode.qaManagerOpts = jsondata;
	        projectManagementMode.mrbOpts = jsondata;
	     })
	     
	}

	return projectManagement;
	
});