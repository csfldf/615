define(['fracas.fracasDataPicker', 'fracas.sessionUtil',
        'avalon/dropdown/avalon.dropdown', 
        'avalon/textbox/avalon.textbox'], function(dataPicker, sessionUtil) {
	
	var failureHandle = {};
	
	var failureHandleMode = avalon.define("failureHandle", function(vm) {
	    vm.saveFr = function() {
	    	console.log('-- Save');
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
	
	failureHandle.init = function(mode, frNumber) {
	  //
	  console.log('-- failureHandle');
	}

	return failureHandle;
	
});