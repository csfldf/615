/**
 * 
 */
define([], function() {
	var payNode = {};
	var payNodeModes = {};
	
	payNode.getVm = function(id) {
		if(payNodeModes[id] != null) return payNodeModes[id];
		payNodeModes[id] = avalon.define(id, function(vm) {
			vm.nodeType = "";
			vm.nodeTypeOpts = [{label:1, value:1}, {label:2, value:2}];
			vm.planMoneyAmount = 100;
			vm.planMoneyType = "";
			vm.planMoneyTypeOpts = [{label:1, value:1}, {label:2, value:2}];
			vm.payCondition = "always";
			vm.planPayDate = "";
			vm.payBasis = "nothing";
			vm.actualMoneyAmount = 100;
			vm.actualMoneyType = "";
			vm.actualMoneyTypeOpts = [{label:1, value:1}, {label:2, value:2}];
			vm.payType = "";
			vm.payTypeOpts = [{label:"挂账", value:"hangingAccount"}, {label:"预付", value:"prepaid"}, {label:"决算款", value:"finalAccount"}];
			vm.payApplyTime = "2015-02-22";
			vm.isArchive = "";
			vm.isArchiveOpts = [{label:1, value:1}, {label:2, value:2}];
			vm.payContain = "everything";
			vm.isVerify = "";
			vm.verifyMoneyDiff = 99;
			vm.verifyMoneyTotal = 99;
			vm.verifyApplyDate = "2015-01-11";
			vm.verifyMoneyContain = "abc";
			vm.payNodeRecordCm = "i am cm";
			vm.payNodeRecordPm = "i am pm";
			vm.verifyRecordCm = "i am cm";
			vm.verifyRecordPm = "i am pm";
			vm.count = 1;
		});
		return payNodeModes[id];
	}
	
	payNode.init = function(cid, index) {
		var mode = payNode.getVm("payNode-" + cid + "-" + index);
		mode.count = index;
	}
	
	return payNode;
});