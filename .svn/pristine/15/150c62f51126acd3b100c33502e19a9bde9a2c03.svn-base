/**
 * Created by rtio on 2014/12/15.
 */
define(function() {

    var searchUtil = {};

    // order contents according to round robin
    // column: the column to be ordered
    // order: 0-descend 1-ascend
    searchUtil.orderByChinese=function(contents, column, order){
        var reverse = order?1:-1;
        contents.sort(function(objA, objB){
            var param1=objA[column], param2=objB[column]
            //如果两个参数均为字符串类型
            if(typeof param1 == "string" && typeof param2 == "string"){
                return reverse*param1.localeCompare(param2);
            }
            //如果参数1为数字，参数2为字符串
            if(typeof param1 == "number" && typeof param2 == "string"){
                return reverse*-1;
            }
            //如果参数1为字符串，参数2为数字
            if(typeof param1 == "string" && typeof param2 == "number"){
                return reverse*1;
            }
            //如果两个参数均为数字
            if(typeof param1 == "number" && typeof param2 == "number"){
                if(param1 > param2) return reverse*1;
                if(param1 == param2) return reverse*0;
                if(param1 < param2) return reverse*-1;
            }
        })
        return contents
    }

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

    searchUtil.orderByNumber = function(contents, column, order) {
        if(order == 0) {
            contents.sort(function(objA, objB) {
                var a = parseInt(objA[column]);
                var b = parseInt(objB[column]);
                if(a > b) return -1;
                else if(a < b) return 1;
                else return 0
            });
        }
        else {
            contents.sort(function(objA, objB) {
                var a = parseInt(objA[column]);
                var b = parseInt(objB[column]);
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

    searchUtil.filter=function(contents, column,values){
        var results=[]
        for(var i=0;i<contents.length;i++){
            for(var j=0;j<values.length;j++){
                if(contents[i][column]==values[j]){
                    results.push(contents[i])
                    contents[i].visible = true
                    break
                }
            }
        }
        return results
    }

    searchUtil.searchColumn=function(contents,column,value){
        var results=[]
        for(var i=0;i<contents.length;i++){
            if(contents[i][column].search(value)!=-1){
                results.push(contents[i])
            }
        }
        return results
    }
    return searchUtil;
});