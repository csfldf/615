/**
 * Created by Administrator on 2015/7/12.
 */
/**
 * Created by rtio on 2014/12/15.
 */
define(function() {
    var filterUtil = avalon.define("filterUtil", function (vm) {

        vm.filter = {
            contents: [],
            column: "",
            values: [],
            org_values: []
        }
        vm.filterConfig = function (contents, column) {
            vm.filter.org_values = []
            vm.filter.contents=contents
            vm.filter.column = column
            for (var i = 0; i < contents.size(); i++) {
                if (!verify_in(contents[i][column], vm.filter.org_values)) {
                    var tmp = new Object()
                    tmp.enabled = true
                    tmp.name = contents[i][column]
                    vm.filter.org_values.push(tmp)
                }
            }
            $('#' + vm.modalName).modal('show')
        }
        vm.selALL = function () {
            for (var i = 0; i < vm.filter.org_values.size(); i++) {
                vm.filter.org_values[i].enabled = true
            }
        }
        vm.executeFilter = function () {
            vm.filter.values = []
            for (var i = 0; i < vm.filter.org_values.size(); i++) {
                if (vm.filter.org_values[i].enabled) {
                    vm.filter.values.push(vm.filter.org_values[i].name)
                }
            }
            vm.filter.contents = vm.filter(
                vm.filter.contents, vm.filter.column, vm.filter.values)
            $('#' + vm.modalName).modal('hide')
        }

        vm.verify_in = function (key, array) {
            for (var i = 0; i < array.size(); i++) {
                if (key == array[i]['name']) {
                    return true;
                }
            }
            return false;
        }

        vm.filter = function (contents, column, values) {
            var results = []
            for (var i = 0; i < contents.size(); i++) {
                for (var j = 0; j < values.size(); j++) {
                    if (contents[i][column] == values[j]) {
                        results.push(contents[i])
                        break
                    }
                }
            }
            return results
        }
    })
    return filterUtil;
})

