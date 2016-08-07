/**
 * Created by FeiyuLab on 2015/5/18 0018.
 */
"use strict";
define(["mmRequest", "utils", 'jquery', 'permissionMgr', 'authorityMgr', 'selector', 'datatables.bootstrap'],
    function (avalon, utils, $, pm, auth, select) {

        var tableElement

        function getLoginInUserId() {
            var userid = 'null'
            require('Login', function (login) {
                if (login.isLogin)
                    userid = login.loginId
            })
            return userid
        }

        function getLoginInUserName() {
            var user = 'null name'
            require('Login', function (login) {
                if (login.isLogin)
                    user = login.loginName
            })
            return user
        }

        var docs = avalon.define("docLibrary", function (vm, $) {

            vm.ownerId = getLoginInUserId()
            vm.ownerName = getLoginInUserName()
            vm.description = ''
            vm.canUpload = false;
            vm.projectId = null;

            vm.refreshAll = refreshAll

            vm.initProjectSelector = initSelectProject

            vm.clear = function () {
                vm.ownerId = vm.ownerName = vm.projectId = null;
                vm.canUpload = false;
            }

        })

        function initSelectProject(modalSelector) {
            select.types['projectSelectForDocLibrary'].onSelect = function (row) {
                avalon.log(row)
                docs.projectId = row.projectId
                auth.authAssertByRole(getLoginInUserId(), docs.projectId, 'Manager', function () {
                    docs.canUpload = true
                }, null, function () {
                    docs.canUpload = false;
                })
                docs.refreshAll()
            }
            $(modalSelector).modal('show')
            select.init('projectSelectForDocLibrary')
        }

        function showLastModifiedDate(dateObj) {
            return (dateObj.year + 1900) + '-' + (dateObj.month + 1) + '-' + (dateObj.date) + ' ' + dateObj.hours + ':' + dateObj.minutes
        }

        function showSize(size) {
            function toFixed(num) {
                if (Number.toFixed)
                    return num.toFixed(2)
                else
                    return Math.round(num)
            }

            if (size < 1024 * 1024)
                return toFixed(size / 1024) + 'KB'
            else if (size < 1024 * 1024 * 1024)
                return toFixed(size / 1024 / 1024) + 'MB'
            else
                return toFixed(size / 1024 / 1024 / 1024) + 'GB'
        }


        function init() {
            tableElement = document.getElementById("docLibraryTable")
            //summary.reports.push(emptyReportTmpl)
            avalon.scan()
            $(tableElement).dataTable({
                //"data":[],
                columns: [
                    {data: "title", title: "标题", class: "center"},
                    {data: "modifiedDate", title: "最后修改日期", class: "center"},
                    {data: "size", title: "大小", class: "center"},
                    {data: "ownerName", title: "所有者", class: "center"},
                    {data: "type", title: "类型", class: "center"},
                    {data: "operationHtml", title: '操作', class: "center"}
//                {data:"description",title:'备注',class:"center"}
                ],
                columnDefs: [
                    {
                        render: showLastModifiedDate,
                        targets: 1
                    }, {
                        render: showSize,
                        targets: 2
                    }, {
                        orderable: false,
                        targets: 5
                    }
                ]
            })

        }

        function refreshAll() {
            getAllDocs(refreshDataTable)
        }

        function dataFormatter(dataArray) {
            for (var i = 0; i < dataArray.length; i++) {
                var href = ''
                var data = dataArray[i]
                if (data.downloadHref && data.downloadHref != "")
                    href += "<a target='blank' href='" + data.downloadHref + "\'>下载</a>"
                href += "<span>   </span>"
                if (data.deleteHref && data.deleteHref != "" && docs.canUpload)
                    href += "<a href='javascript:delDoc(&quot;" + data.deleteHref + "&quot;)\'>删除</button>"
                data.operationHtml = href
            }
            return dataArray
        }

        function refreshDataTable(dataSource) {
            if (avalon.isPlainObject(tableElement) == false) {
                $(tableElement).DataTable().clear().draw()
                $(tableElement).DataTable().rows.add(dataSource).draw()
            }
        }

        function getAllDocs(success) {
            avalon.getJSON('am/getAllDoc',
                {projectId: docs.projectId}, function (data) {
                    avalon.type(data) == "object" && (data = [data])
                    if (avalon.type(data) == "array" && data.length > 0) {
                        if (avalon.type(success) == "function")
                            success(dataFormatter(data))
                    } else if (avalon.type(data) == "array" && data.length == 0) {
                        success(dataFormatter([]))
                    }
                })
        }

        function setData(data) {
            refreshDataTable(dataFormatter(data))
        }

        var doc_func = {init: init, refreshAll: refreshAll, setData: setData}

        return doc_func
    })