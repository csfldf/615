define(['cm.payNode', 'cm.receiveNode', 'avalon/datepicker/avalon.datepicker'], function(payNode, receiveNode) {
	var contractRegist = {};
	
	var contractRegistMode = avalon.define("contractRegist", function(vm) {
		_vm = vm;
		
		vm.id = "contractRegist";
		vm.name = "super contract";
		vm.moneyFlow = "pay";
		vm.isOffShore = "";
		vm.description = "this is a contract";
		vm.contractContain = [];
		vm.contractContainOpts = [{label:1, value:1}, {label:2, value:2}];
		vm.contractContainOther = "";
		vm.moneyType = [];
		vm.moneyTypeOpts = [{label:1, value:1}, {label:2, value:2}];
		vm.department = "";
		vm.departmentOpts = [{label:1, value:1}, {label:2, value:2}];
		vm.departmentOther = "";
		vm.operator = "zhang three";
		vm.currencyType = "";
		vm.currencyTypeOpts = [{label:1, value:1}, {label:2, value:2}];
		vm.project = "c919";
		vm.budgetCode = "bcxxxx";
		vm.totalMoney = "1000";
		vm.performStartDate = "";
		vm.performEndDate = "";
		vm.coorperation = "sjtu";
		vm.contractArchive = "";
		vm.contractArchiveOpts = [{label:1, value:1}, {label:2, value:2}];
		vm.contractArchiveOther = "";
		vm.nodeCount = [1];
		
		vm.onChangeMoneyFlow = function() {
			vm.nodeCount = [1];
		}
		
		vm.onClick = function() {
			vm.nodeCount.push(1);
		}
		
		vm.onAddNode = function() {
			vm.nodeCount.push(vm.nodeCount.length + 1);
		}
		
		vm.part1Render = function(tmpl) {
			tmpl = tmpl.replace(/(ms-visible="part1")/, 'ms-visible="1 === 1"');
			tmpl = tmpl.replace(/(ms-visible="part2")/, 'ms-visible="1 === 2"');
			
			if(vm.moneyFlow == "pay") {
				payNode.init(vm.id, vm.nodeCount.length);
				tmpl = tmpl.replace(/(ms-controller=")[\S]+(")/, 'ms-controller="payNode-' + vm.id + '-' + vm.nodeCount.length + '"');
	            return tmpl;
			}
			else {
				receiveNode.init(vm.id, vm.nodeCount.length);
				tmpl = tmpl.replace(/(ms-controller=")[\S]+(")/, 'ms-controller="receiveNode-' + vm.id + '-' + vm.nodeCount.length + '"');
	            return tmpl;
			}
		}
		
		vm.part2Render = function(tmpl) {
			tmpl = tmpl.replace(/(ms-visible="part1")/, 'ms-visible="1 === 2"');
			tmpl = tmpl.replace(/(ms-visible="part2")/, 'ms-visible="1 === 1"');
			
			if(vm.moneyFlow == "pay") {
				payNode.init(vm.id, vm.nodeCount.length);
				tmpl = tmpl.replace(/(ms-controller=")[\S]+(")/, 'ms-controller="payNode-' + vm.id + '-' + vm.nodeCount.length + '"');
	            return tmpl;
			}
			else {
				receiveNode.init(vm.id, vm.nodeCount.length);
				tmpl = tmpl.replace(/(ms-controller=")[\S]+(")/, 'ms-controller="receiveNode-' + vm.id + '-' + vm.nodeCount.length + '"');
	            return tmpl;
			}
		}
	});
	
	contractRegist.vm = contractRegistMode;
	
	return contractRegist;
});