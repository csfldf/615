define(['fracas.fracasDataPicker', 'fracas.sessionUtil',
        'avalon/dropdown/avalon.dropdown',
        'avalon/textbox/avalon.textbox'], function(dataPicker, sessionUtil) {

	var metadataManagement = {};

	var metadataNames = [];

	var metadataManagementMode = avalon.define("metadataManagement", function(vm) {
		var metadataValue = "";
		var metadatastr = "";
		vm.project = "";
		vm.projectOpts = {data: [{value:'1', label:'1'}, {value:'2', label:'2'}, {value:'3', label:'3'}], readOnly:false};

		vm.saveFr = function() {
			var metadata = [];
	    	console.log('-- Save');
	    	if (metadataNames.length > 0) {
	    		metadataNames.forEach(function(name) {
	    			metadataValue = $('#'+name).val();
	    			if(metadataValue.length > 0){
	    				metadata.push({
	    					key: name,
	    					value: metadataValue
	    				});
	    				console.log(metadataValue);
	    			}
				});
			}
	    	metadatastr = JSON.stringify(metadata);
	    	console.log(metadatastr);
	    	$.post(
	    			'fracas/save_metadata',
	    			{params:metadatastr},
	    			function(data) {

	    			}
	    	);
	    };

	    vm.commitFr = function() {
	    	console.log('-- Commit');
	    };

	    vm.cancelFr = function() {
	    	console.log('-- Cancel');
	    };

	    vm.back = function() {
	    	console.log('-- Back');
            window.location.href='#!/fracas/event_summary';
	    };
	});

	metadataManagement.init = function(mode, frNumber) {
		var res = [];
		$.post('fracas/getAllMetadataNames',{},function back(data){
			console.log('-----metadatanames:'+data);
			metadataNames = JSON.parse(data);
			console.log(metadataNames.length);
		});

		$.post('fracas/getAllMetadata',{},function back(data){
		//	console.log(data);
			var jsonData = JSON.parse(data);
			var keys = Object.keys(jsonData);
			//metadataNames = keys;
			keys.forEach(function(k) {
				//console.log(k, jsonData[k]);
				if(jsonData[k].length > 0){
					console.log(k,jsonData[k]);
					res.push({
						key: k,
						value: jsonData[k]
					});
				}
			});
        });

        setTimeout(function() {
			if (res.length > 0) {
				res.forEach(function(r) {
					$('#'+r.key).tagsinput('add', r.value);
				});
			}
		}, 1000);

	};

	return metadataManagement;

});