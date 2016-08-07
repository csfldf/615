/**
 * 
 */
define([], function() {
	var receiveNode = {};
	var receiveNodeModes = {};
	
	receiveNode.getVm = function(id) {
		if(receiveNodeModes[id] != null) return receiveNodeModes[id];
		receiveNodeModes[id] = avalon.define(id, function(vm) {
			vm.nodeType = "";
			vm.nodeTypeOpts = [{label:1, value:1}, {label:2, value:2}];
			vm.planMoneyAmount = 98;
			vm.planMoneyType = "";
			vm.planMoneyTypeOpts = [{label:1, value:1}, {label:2, value:2}];
			vm.receiveCondition = "after";
			vm.planReceiveDate = "";
			vm.actualMoneyAmount = 78;
			vm.actualMoneyType = "";
			vm.actualMoneyTypeOpts = [{label:1, value:1}, {label:2, value:2}];
			vm.receiptState = "";
			vm.receiptApplyDate = "2015-10-28";
			vm.receiveNodeRecordCm = "i am cm";
			vm.receiveNodeRecordPm = "i am pm";
			vm.count = 1;
		});
		return receiveNodeModes[id];
	}
	
	receiveNode.init = function(cid, index) {
		var mode = receiveNode.getVm("receiveNode-" + cid + "-" + index);
		mode.count = index;
	}
	
	return receiveNode;
});