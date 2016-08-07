define(function() {
	
	var searchUtil = {};
	
	// order contents according to round robin
	// column: the column to be ordered
	// order: 0-descend 1-ascend
	searchUtil.orderByRound = function(contents, column, order) {
		var columnMap = {};
		var columnArr = [];
		var results = [];
		var last;
		var isFirst = true;
		var first;
		for(var i = 0; i < contents.length; i ++) {
			var c = contents[i][column];
			if(columnMap[c] != null) continue;
			if(order == 0) {
				columnMap[c] = columnArr.length + 1;
				last = c;
			}
			else {
				if(isFirst) {
					first = c;
					isFirst = false;
				}
				columnMap[c] = columnArr.length - 1;
			}
			columnArr.push(0);
		}
		
		if(order == 0) {
			columnMap[last] = 0;
		}
		else {
			columnMap[first] = columnArr.length - 1;
		}
		
		for(var i = contents.length - 1; i >= 0; i --) {
			var c = contents[i][column];
			var columnPos = columnMap[c];
			var pos = columnArr[columnPos];
			results.splice(pos, 0, contents[i]);
			for(var j = columnPos + 1; j < columnArr.length; j ++) {
				columnArr[j] ++;
			}
			
		}
		
		return results;
	}; // orderByRound
	
	searchUtil.orderByDict = function(contents, column, order) {
		if(order == 0) {
			contents.sort(function(objA, objB) {
				var a = objA[column];
				var b = objB[column];
				if(a > b) return -1;
				else if(a < b) return 1;
				else return 0
			});
		}
		else {
			contents.sort(function(objA, objB) {
				var a = objA[column];
				var b = objB[column];
				if(a > b) return 1;
				else if(a < b) return -1;
				else return 0
			});
		}
		return contents;
	}
	
	searchUtil.topOnGoing = function(contents) {
		var results = [];
		var pos = 0;
		for(var i = contents.length - 1; i >= 0; i --) {
			var mark = contents[i].mark;
			if(mark == 'wait') {
				results.unshift(contents[i]);
				pos ++;
			}
			else {
				results.splice(pos, 0, contents[i]);
			}
			
		}
		return results;
	}
	
	
	return searchUtil;
});