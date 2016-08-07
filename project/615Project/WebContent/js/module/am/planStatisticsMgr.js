/** Created by jiadongy on 2014/12/3. **/
"use strict";
define(['mmRequest', 'utils', 'jquery', 'selector', 'datatables.bootstrap', 'echarts', 'datatables.tabletools'], function (avalon, utils, $, select) {
    var summaryTableElement, tableElement, chart, tableInited = false;
    var lang = {
        "sProcessing": "处理中...",
        "sLengthMenu": "显示 _MENU_ 项结果",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上页",
            "sNext": "下页",
            "sLast": "末页"
        },
        "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    };


    var summary = avalon.define('planStatisticsReports', function (vm) {
        vm.$skipArray = ['summaryTableMetaData', 'planTableMetaData', 'chartParameters'];
        vm.summaryTableMetaData = {
            byProject: {
                dataTablesParameters: {
                    columns: [
                        {data: "ProjectName", title: "项目名称", class: "center"},
                        {data: "PackageCount", title: "工作包数量", class: "center"},
                        {data: "FinishedCount", title: "工作包已完成数量", class: "center"},
                        {data: "UnfinishedCount", title: "工作包未完成数量", class: "center"},
                        {data: "PackagePercent", title: "工作包完成率", class: "center"},
                    ],
                    columnDefs: [
                        {
                            render: function (data, type, row) {
                                if (row['ProjectId'] != undefined && row['ProjectName'] != '' && row['FinishedCount'] != 0 && row['ProjectId'])
                                    return '<a href="#!/am/planStatistics/' +
                                        'id=' + row['ProjectId'] + '&statisticsType=projectOneFinished&dateColumn=' + vm.dateType + '&dateFrom=' + vm.startDate + '&dateTo=' + vm.finishDate
                                        + '">'
                                        + row['FinishedCount']
                                        + '</a>';
                                else
                                    return '<a href="javascript:void(0)">'
                                        + row['FinishedCount']
                                        + '</a>'
                            },
                            targets: 2
                        },
                        {
                            render: function (data, type, row) {
                                if (row['ProjectId'] != undefined && row['ProjectName'] != '' && row['UnfinishedCount'] != 0 && row['ProjectId'])
                                    return '<a href="#!/am/planStatistics/' +
                                        'id=' + row['ProjectId'] + '&statisticsType=projectOneUnfinished&dateColumn=' + vm.dateType + '&dateFrom=' + vm.startDate + '&dateTo=' + vm.finishDate
                                        + '">'
                                        + row['UnfinishedCount']
                                        + '</a>';
                                else
                                    return '<a href="javascript:void(0)">'
                                        + row['UnfinishedCount']
                                        + '</a>'
                            },
                            targets: 3
                        }
                    ],
                    language: lang
                },
                dataRender: function (data) {
                    if (avalon.type(data) == "array") {
                        for (var i = 0; i < data.length; i++) {
                            var one = data[i];
                            one.ProjectName = one.ProjectName || '[Null]';
                            one.PackageCount = one.PackageCount || 0;
                            one.FinishedCount = one.FinishedCount || 0;
                            one.UnfinishedCount = one.UnfinishedCount || 0;
                            one.PackagePercent = (one.FinishedCount * 100.0 / one.PackageCount).toFixed(2) + ' %'
                        }
                    }
                    return data
                },
                initChartFunc: function (data) {
                    var origin = {}
                    avalon.mix(origin, vm.chartParameters)
                    var words = [], sum = [], finish = []
                    if (avalon.type(data) == "array") {
                        for (var i = 0; i < data.length; i++) {
                            var one = data[i];
                            one.ProjectName = one.ProjectName || '[Null]';
                            one.PackageCount = one.PackageCount || 0;
                            one.FinishedCount = one.FinishedCount || 0;
                            words.push(one.ProjectName)
                            sum.push(one.PackageCount)
                            finish.push(one.FinishedCount)
                        }
                    }
                    origin.title.text = '按项目统计'
                    origin.xAxis[0].data = words;
                    origin.series[0].data = sum;
                    origin.series[1].data = finish;
                    return origin
                }
            },
            byGroup: {
                dataTablesParameters: {
                    columns: [
                        {data: "GroupName", title: "工作组名称", class: "center"},
                        {data: "PackageCount", title: "工作包数量", class: "center"},
                        {data: "FinishedCount", title: "工作包已完成数量", class: "center"},
                        {data: "UnfinishedCount", title: "工作包未完成数量", class: "center"},
                        {data: "PackagePercent", title: "工作包完成率", class: "center"},
                    ],
                    columnDefs: [
                        {
                            render: function (data, type, row) {
                                if (row['GroupId'] != undefined && row['GroupName'] != '' && row['FinishedCount'] != 0 && row['GroupId'])
                                    return '<a href="#!/am/planStatistics/' + 'projectName=' + row['ProjectName'] + '&' +
                                        'id=' + row['GroupId'] + '&statisticsType=groupOneFinished&dateColumn=' + vm.dateType + '&dateFrom=' + vm.startDate + '&dateTo=' + vm.finishDate
                                        + '">'
                                        + row['FinishedCount']
                                        + '</a>';
                                else
                                    return '<a href="javascript:void(0)">'
                                        + row['FinishedCount']
                                        + '</a>'
                            },
                            targets: 2
                        },
                        {
                            render: function (data, type, row) {
                                if (row['GroupId'] != undefined && row['GroupName'] != '' && row['UnfinishedCount'] != 0)
                                    return '<a href="#!/am/planStatistics/' + 'projectName=' + row['ProjectName'] + '&' +
                                        'id=' + row['GroupId'] + '&statisticsType=groupOneUnfinished&dateColumn=' + vm.dateType + '&dateFrom=' + vm.startDate + '&dateTo=' + vm.finishDate
                                        + '">'
                                        + row['UnfinishedCount']
                                        + '</a>';
                                else
                                    return '<a href="javascript:void(0)">'
                                        + row['UnfinishedCount']
                                        + '</a>'
                            },
                            targets: 3
                        }
                    ],
                    language: lang
                },
                dataRender: function (data) {
                    if (avalon.type(data) == "array") {
                        for (var i = 0; i < data.length; i++) {
                            var one = data[i];
                            one.GroupName = one.GroupName || '[Null]';
                            one.PackageCount = one.PackageCount || 0;
                            one.FinishedCount = one.FinishedCount || 0;
                            one.UnfinishedCount = one.UnfinishedCount || 0;
                            one.PackagePercent = (one.FinishedCount * 100.0 / one.PackageCount).toFixed(2) + ' %'
                        }
                    }
                    return data
                },
                initChartFunc: function (data) {
                    var origin = {}
                    avalon.mix(origin, vm.chartParameters)
                    var words = [], sum = [], finish = []
                    if (avalon.type(data) == "array") {
                        for (var i = 0; i < data.length; i++) {
                            var one = data[i];
                            one.GroupName = one.GroupName || '[Null]';
                            one.PackageCount = one.PackageCount || 0;
                            one.FinishedCount = one.FinishedCount || 0;
                            words.push(one.GroupName)
                            sum.push(one.PackageCount)
                            finish.push(one.FinishedCount)
                        }
                    }
                    origin.title.text = '按工作组统计'
                    origin.xAxis[0].data = words;
                    origin.series[0].data = sum;
                    origin.series[1].data = finish;
                    return origin
                }
            },
            byEmployee: {
                dataTablesParameters: {
                    columns: [
                        {data: "EmployeeName", title: "姓名", class: "center"},
                        {data: "PackageCount", title: "工作包数量", class: "center"},
                        {data: "FinishedCount", title: "工作包已完成数量", class: "center"},
                        {data: "UnfinishedCount", title: "工作包未完成数量", class: "center"},
                        {data: "PackagePercent", title: "工作包完成率", class: "center"},
                    ],
                    columnDefs: [
                        {
                            render: function (data, type, row) {
                                if (row['EmployeeId'] != undefined && row['EmployeeName'] != '' && row['FinishedCount'] != 0)
                                    return '<a href="#!/am/planStatistics/' + 'projectName=' + row['ProjectName'] + '&' +
                                        'id=' + row['EmployeeId'] + '&statisticsType=employeeOneFinished&dateColumn=' + vm.dateType + '&dateFrom=' + vm.startDate + '&dateTo=' + vm.finishDate
                                        + '">'
                                        + row['FinishedCount']
                                        + '</a>';
                                else
                                    return '<a href="javascript:void(0)">'
                                        + row['FinishedCount']
                                        + '</a>'
                            },
                            targets: 2
                        },
                        {
                            render: function (data, type, row) {
                                if (row['EmployeeId'] != undefined && row['EmployeeName'] != '' && row['UnfinishedCount'] != 0)
                                    return '<a href="#!/am/planStatistics/' + 'projectName=' + row['ProjectName'] + '&' +
                                        'id=' + row['EmployeeId'] + '&statisticsType=employeeOneUnfinished&dateColumn=' + vm.dateType + '&dateFrom=' + vm.startDate + '&dateTo=' + vm.finishDate
                                        + '">'
                                        + row['UnfinishedCount']
                                        + '</a>';
                                else
                                    return '<a href="javascript:void(0)">'
                                        + row['UnfinishedCount']
                                        + '</a>'
                            },
                            targets: 3
                        }
                    ],
                    language: lang
                },
                dataRender: function (data) {
                    if (avalon.type(data) == "array") {
                        for (var i = 0; i < data.length; i++) {
                            var one = data[i];
                            one.EmployeeName = one.EmployeeName || '[Null]';
                            one.PackageCount = one.PackageCount || 0;
                            one.FinishedCount = one.FinishedCount || 0;
                            one.UnfinishedCount = one.UnfinishedCount || 0;
                            one.PackagePercent = (one.FinishedCount * 100.0 / one.PackageCount).toFixed(2) + ' %'
                        }
                    }
                    return data
                },
                initChartFunc: function (data) {
                    var origin = {}
                    avalon.mix(origin, vm.chartParameters)
                    var words = [], sum = [], finish = []
                    if (avalon.type(data) == "array") {
                        for (var i = 0; i < data.length; i++) {
                            var one = data[i];
                            one.EmployeeName = one.EmployeeName || '[Null]';
                            one.PackageCount = one.PackageCount || 0;
                            one.FinishedCount = one.FinishedCount || 0;
                            words.push(one.EmployeeName)
                            sum.push(one.PackageCount)
                            finish.push(one.FinishedCount)
                        }
                    }
                    origin.title.text = '按员工统计'
                    origin.xAxis[0].data = words;
                    origin.series[0].data = sum;
                    origin.series[1].data = finish;
                    return origin
                }

            },
            byDepartment: {
                dataTablesParameters: {
                    columns: [
                        {data: "DepartmentName", title: "部门名称", class: "center"},
                        {data: "PackageCount", title: "工作包数量", class: "center"},
                        {data: "FinishedCount", title: "工作包已完成数量", class: "center"},
                        {data: "UnfinishedCount", title: "工作包未完成数量", class: "center"},
                        {data: "PackagePercent", title: "工作包完成率", class: "center"}
                    ],
                    columnDefs: [
                        {
                            render: function (data, type, row) {
                                if (row['DepartmentId'] != undefined && row['DepartmentName'] != '' && row['FinishedCount'] != 0)
                                    return '<a href="#!/am/planStatistics/' + 'projectName=' + row['ProjectName'] + '&' +
                                        'id=' + row['DepartmentId'] + '&statisticsType=departmentOneFinished&dateColumn=' + vm.dateType + '&dateFrom=' + vm.startDate + '&dateTo=' + vm.finishDate
                                        + '">'
                                        + row['FinishedCount']
                                        + '</a>';
                                else
                                    return '<a href="javascript:void(0)">'
                                        + row['FinishedCount']
                                        + '</a>'
                            },
                            targets: 2
                        },
                        {
                            render: function (data, type, row) {
                                if (row['DepartmentId'] != undefined && row['DepartmentName'] != '' && row['UnfinishedCount'] != 0)
                                    return '<a href="#!/am/planStatistics/' + 'projectName=' + row['ProjectName'] + '&' +
                                        'id=' + row['DepartmentId'] + '&statisticsType=departmentOneUnfinished&dateColumn=' + vm.dateType + '&dateFrom=' + vm.startDate + '&dateTo=' + vm.finishDate
                                        + '">'
                                        + row['UnfinishedCount']
                                        + '</a>';
                                else
                                    return '<a href="javascript:void(0)">'
                                        + row['UnfinishedCount']
                                        + '</a>'
                            },
                            targets: 3
                        }
                    ],
                    language: lang
                },
                dataRender: function (data) {
                    if (avalon.type(data) == "array") {
                        for (var i = 0; i < data.length; i++) {
                            var one = data[i];
                            one.DepartmentName = one.DepartmentName || '[Null]';
                            one.PackageCount = one.PackageCount || 0;
                            one.FinishedCount = one.FinishedCount || 0;
                            one.UnfinishedCount = one.UnfinishedCount || 0;
                            one.PackagePercent = (one.FinishedCount * 100.0 / one.PackageCount).toFixed(2) + ' %'
                        }
                    }
                    return data
                },
                initChartFunc: function (data) {
                    var origin = {}
                    avalon.mix(origin, vm.chartParameters)
                    var words = [], sum = [], finish = []
                    if (avalon.type(data) == "array") {
                        for (var i = 0; i < data.length; i++) {
                            var one = data[i];
                            one.DepartmentName = one.DepartmentName || '[Null]';
                            one.PackageCount = one.PackageCount || 0;
                            one.FinishedCount = one.FinishedCount || 0;
                            words.push(one.DepartmentName)
                            sum.push(one.PackageCount)
                            finish.push(one.FinishedCount)
                        }
                    }
                    origin.title.text = '按部门统计'
                    origin.xAxis[0].data = words;
                    origin.series[0].data = sum;
                    origin.series[1].data = finish;
                    return origin
                }
            },
        };
        vm.chartParameters = {
            title: {
                text: '统计',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['工作包总量', '已完成工作包量']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: true},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '工作包总量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    /*markPoint : {
                     data : [
                     {type : 'max', name: '最大值'},
                     {type : 'min', name: '最小值'}
                     ]
                     },
                     markLine : {
                     data : [
                     {type : 'average', name: '平均值'}
                     ]
                     }*/
                },
                {
                    name: '已完成工作包量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    /*markPoint : {
                     data : [
                     {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                     {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                     ]
                     },
                     markLine : {
                     data : [
                     {type : 'average', name : '平均值'}
                     ]
                     }*/
                }
            ]
        }
        vm.planTableMetaData = {
            dataTableParameter: {
                columns: [
                    {data: "wbs", title: "WBS", class: "center"},
                    {data: "planName", title: "工作名称", class: "center"},
                    {data: "planIssuedDate", title: "开始日期", class: "center"},
                    {data: "planFinishDate", title: "完成日期", class: "center"},
                    {data: "planStartDate", title: "实际启动日期", class: "center"},
                    {data: "planFinishDate", title: "实际完成日期", class: "center"},
                    {data: "planRemainingDate", title: "剩余时间", class: "center"},
                    {data: "planController", title: "工作责任人", class: "center"},
                    {data: "planState", title: "工作状态", class: "center"},
                ],
                columnDefs: [
                    {
                        render: showPlanStateText,
                        targets: 8
                    }, {
                        render: showPlanReaminingDateText,
                        targets: 6
                    }
                ],
                language: lang
            }
        };
        vm.type = "byProject";
        vm.dateType = 'planIssuedDate';
        vm.startDate = '2000-01-01';
        vm.finishDate = utils.date.getCurrentDate();
        var dataTableToolOption = {
            "dom": 'Tlfrtip',
            "tableTools": {
                "aButtons": [
                    {"sExtends": "copy", "sButtonText": "复制到剪贴板"},
                    {"sExtends": "xls", "sButtonText": "导出XLS文件"}
                ],
                "sSwfPath": "/js/base/copy_csv_xls_pdf.swf"
            }
        }

        vm.init = function (mixString) {
            if (!$.fn.DataTable.isDataTable('#planSummaryTable')) {
                tableElement = document.getElementById("planStatisticsTable");
                $(tableElement).dataTable(vm.planTableMetaData.dataTableParameter);
                summaryTableElement = document.getElementById("planSummaryTable");
                var option = avalon.mix(true, {},
                    dataTableToolOption,
                    vm.summaryTableMetaData[vm.type].dataTablesParameters)
                var summarydataTable = $(summaryTableElement).dataTable(option);
                $('#planChart').height(600);
                chart = echarts.init(document.getElementById("planChart"));
                avalon.scan()
            } else if (mixString) {
                if (avalon.isPlainObject(tableElement) == false) {
                    $(tableElement).DataTable().clear().draw();
                }
                avalon.getJSON('am/getStatisticsByCondition.action?' + mixString, function (data) {
                    if (avalon.type(data) == "array" && data.length > 0) {
                        if (avalon.isPlainObject(tableElement) == false) {
                            $(tableElement).DataTable().rows.add(reportRemoteDataFormator(data)).draw()
                        }
                    }
                })
            }
        };
        vm.continueStat = function () {
            var projectElement = document.getElementById("select-shortcuts-myProject");
            var projectName = projectElement ? projectElement.value : '';
            if (projectName != "") {
                var param = null, initData = null, dataRender = null, initChartFunc = null;
                switch (vm.type) {
                    case 'byProject':
                        if (projectName == "全部") {
                            param = "statisticsType=projectAll&dateColumn=" + vm.dateType + "&dateFrom=" + vm.startDate + "&dateTo=" + vm.finishDate;
                            initChartFunc = vm.summaryTableMetaData['byProject'].initChartFunc
                        } else
                            param = "projectName=" + projectName + "&statisticsType=projectOne&dateColumn=" + vm.dateType + "&dateFrom=" + vm.startDate + "&dateTo=" + vm.finishDate;
                        initData = vm.summaryTableMetaData['byProject'].dataTablesParameters;
                        dataRender = vm.summaryTableMetaData['byProject'].dataRender;
                        break;
                    case 'byGroup':
                        if (projectName == "全部") {
                            alert('请选择一个项目')
                            return
                        }
                        param = "projectName=" + projectName + "&statisticsType=groupAllInOneProject&dateColumn=" + vm.dateType + "&dateFrom=" + vm.startDate + "&dateTo=" + vm.finishDate;
                        initData = vm.summaryTableMetaData['byGroup'].dataTablesParameters;
                        dataRender = vm.summaryTableMetaData['byGroup'].dataRender;
                        initChartFunc = vm.summaryTableMetaData['byGroup'].initChartFunc
                        break;
                    case 'byEmployee':
                        if (projectName == "全部") {
                            alert('请选择一个项目')
                            return
                        }
                        param = "projectName=" + projectName + "&statisticsType=employeeAllInOneProject&dateColumn=" + vm.dateType + "&dateFrom=" + vm.startDate + "&dateTo=" + vm.finishDate;
                        initData = vm.summaryTableMetaData['byEmployee'].dataTablesParameters;
                        dataRender = vm.summaryTableMetaData['byEmployee'].dataRender;
                        initChartFunc = vm.summaryTableMetaData['byEmployee'].initChartFunc
                        break;
                    case 'byDepartment':
                        if (projectName == "全部") {
                            alert('请选择一个项目')
                            return
                        }
                        param = "projectName=" + projectName + "&statisticsType=departmentAllInOneProject&dateColumn=" + vm.dateType + "&dateFrom=" + vm.startDate + "&dateTo=" + vm.finishDate;
                        initData = vm.summaryTableMetaData['byDepartment'].dataTablesParameters;
                        dataRender = vm.summaryTableMetaData['byDepartment'].dataRender;
                        initChartFunc = vm.summaryTableMetaData['byDepartment'].initChartFunc
                        break
                }
                if (initData && dataRender) {
                    //need redraw
                    if ($.fn.DataTable.isDataTable('#planSummaryTable')) {
                        $(summaryTableElement).DataTable().clear().destroy();
                        if (vm.type == 'byProject')
                            $(tableElement).DataTable().clear().draw()
                    }
                    $(summaryTableElement).dataTable(avalon.mix(true, {}, initData, dataTableToolOption));
                    avalon.getJSON('am/getStatisticsByCondition.action?' + param, function (data) {
                        if (avalon.type(data) == "array" && data.length > 0) {
                            if (avalon.isPlainObject(summaryTableElement) == false) {
                                $(summaryTableElement).DataTable().clear().draw();
                                $(summaryTableElement).DataTable().rows.add(dataRender(data)).draw()
                            }
                            chart.clear()
                            if (initChartFunc) {
                                chart.setOption(initChartFunc(data))
                            }
                        } else {
                            if (avalon.isPlainObject(summaryTableElement) == false) {
                                $(summaryTableElement).DataTable().clear().draw();
                            }
                            chart.clear()
                        }
                    })

                }
            }


        }
        vm.destroy = function () {

        }
    });

    window.summaryMoudle = summary;


    function showPlanReaminingDateText(remainingDate) {
        return (remainingDate >= 0 ? remainingDate : ('已超期 ' + remainingDate * (-1))) + ' 天'
    }

    function showPlanStateText(state) {
        var text = '';
        switch (state) {
            case 0:
                text = '新建';
                break;
            case 1:
                text = '未发布';
                break;
            case 2:
                text = '已发布';
                break;
            case 3:
                text = '组长请求/等待项目经理审批';
                break;
            case 4:
                text = '组长请求/等待项目领导审批'
                break;
            case 5:
                text = '项目经理请求/等待项目领导审批'
                break;
            case 6:
                text = '已完成'
                break;
        }
        return text
    }

    function reportRemoteDataFormator(data) {
        if (avalon.type(data) == "array") {
            data.forEach(function (one) {
                one.planIssuedDate = (one.planIssuedDate || ' ').split(' ')[0];
                one.planDeadlineDate = (one.planDeadlineDate || ' ').split(' ')[0];
                one.planStartDate = (one.planStartDate || ' ').split(' ')[0];
                one.planFinishDate = (one.planFinishDate || ' ').split(' ')[0];
                one.planState = one.planStateCode;
                one.planRemainingDate = utils.date.dateDiff(one.planDeadlineDate, utils.date.getCurrentDate());
//               one.planCode=one.planCode
//               one.planSerialNumber=one.planSerialNumber
//               one.planName=one.planName
//               one.planController=one.planController
                one.isActionItem = one.leaf;
                one.wbs = one.wbs || ''
//               one.planSource=one.planSource
//               one.parentPlanCode=one.parentPlanCode
                //one.planUpdateDescription=one.changeDetail
//               one.back = one.back
//               tmp.$skipArray=$skipArray
            });
            return data
        }
    }

    var ps = {
        vm: summary
    };

    return ps
});
/**
 * 2014.12.7:hint:echarts-all.js比较大又不是AMD规范，avalon Require时会出现没有进入回调函数的bug，requirejs没有此问题
 *                  解决方法：对echarts-all做AMD包装
 *           caution：在init()初始化函数中显式
 *           tips of dataTables：$(xxx).dateTables()初始化函数对一个element只能执行一遍，除非在initOptions中指定destroy：true，
 *                               调用API用$(xxx).DateTables().Api()
 *                               如果列不变，先清空table再添加行：$(xxx).DataTables().clear(),$(xxx).DateTables().rows/row.add(yyy)
 *                               initOPtions中columnDefs中可以定义列的属性：是否隐藏，render，指定对哪几列生效用数字表示
 *           tips of echarts:$(xxx).init()先初始化得到chart对象，再chart.setOPtions(opt),同样只能有一个实例
 *
 */