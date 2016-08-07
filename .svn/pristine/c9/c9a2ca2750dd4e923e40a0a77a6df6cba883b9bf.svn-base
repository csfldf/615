define(['fracas.sessionUtil', 'fracas.fracasDataPicker', 'chart', 'avalon/datepicker/avalon.daterangepicker'], function(sessionUtil, dataPicker, chart, datarangepicker) {
  var reportSearch = {};
  var employeeInfo = {};
  var reportSearchMode = avalon.define("reportSearch", function(vm) {
    _vm_search = vm;
    vm.targetReport = 1;
    vm.displayList = [false, false, false];
    vm.charType = '选择图表类型';
    vm.setDisplayList = function(num) {
      switch (num) {
        case 0:
          setBarChart();
          vm.displayList = [true, false, false];
          vm.charType = '柱状图';
          break;
        case 1:
          setLineChart();
          vm.displayList = [false, true, false];
          vm.charType = '曲线图';
          break;
        case 2:
          setPieChart();
          vm.displayList = [false, false, true];
          vm.charType = '拼图';
          break;
        case 3:
          vm.displayList = [false, false, false];
          vm.charType = '选择图表类型';
      }
    };
    vm.frReports = [];
    vm.aReports = [];
    vm.carReports = [];
    vm.conditions = [];
    vm.columns = [{
      text: '故障报告编号',
      value: 'frNumber'
    }, {
      text: '项目名称',
      value: 'project'
    }, {
      text: '创建人',
      value: 'frCreater'
    }, {
      text: '创建日期',
      value: 'frCreateDate'
    }, {
      text: '故障发现人',
      value: 'reporter'
    }, {
      text: '发现日期',
      value: 'happenTime'
    }, {
      text: '状态',
      value: 'status'
    }];
    vm.loadReport = function() {
      window.location.href = '#!/fracas/failure_report';
    };
    vm.setReport = function(index) {
      vm.targetReport = index;
      if (index === 1) {
        vm.columns = [
          { text: '故障报告编号', value: 'frNumber'},
          { text: '项目名称', value: 'project'},
          { text: '创建人', value: 'frCreater'},
          { text: '创建日期', value: 'frCreateDate'},
          { text: '故障发现人', value: 'reporter'},
          { text: '发现日期', value: 'happenTime'},
          { text: '状态', value: 'status'}
        ];
      } else if (index === 2) {
        vm.columns = [
          {text:'分析报告编号', value: 'farNumber'},
          {text:'项目名称', value: 'project'},
          {text:'创建日期', value: 'farCreateDate'},
          {text:'故障报告编号', value: 'frNumberRefer'},
          {text:'状态', value: 'status'},
        ];
      } else if (index === 3) {
        vm.columns = [
          {text: 'CAR报告编号', value: 'carNumber'},
          {text: '项目名称', value: 'project'},
          {text: 'CAR来源', value: 'carSource'},
          {text: '创建日期', value: 'carCreateDate'},
          {text: '状态', value: 'status'},
        ];
      }
      vm.conditions.forEach(function(c) {
        c.condition = '';
        c.columns = vm.columns;
      });
    };
    vm.addCondition = function() {
      vm.conditions.push({
        text: '',
        condition: '',
        columns: vm.columns,
        value: ''
      });
    };
    vm.removeCondition = function(i) {
      console.log('>>', i);
      if (vm.conditions.length > 1) {
        vm.conditions.splice(i, 1);
      }
    };
    vm.setCondition = function(el, item) {
      el.condition = item.value;
      el.text = item.text;
    };
    vm.search = function() {
      var attrs = {};
      for (var i = 0; i < vm.conditions.length; i++) {
        condition = vm.conditions[i];
        if(condition.condition === "" || condition.value == "") continue;
        attrs[condition.condition] = condition.value;
      }
      var json = JSON.stringify(attrs);
      console.log(json);
      if(vm.targetReport == 1) {
    	  $.post('fracas/getByAttr', {
    	        params: json
    	      }, function(data) {
    	        var rs = eval('(' + data + ')');
    	        console.log(rs);
    	        displayFrs(rs);
    	      });
      }
      else if(vm.targetReport == 2) {
    	  $.post('fracas/getFarByAttr', {
    	        params: json
    	      }, function(data) {
    	        var rs = eval('(' + data + ')');
    	        console.log(rs);
    	        displayFars(rs);
    	      });
      }
    };
  });
  // do all the init job here
  reportSearch.init = function() {
    // Only for test
    reportSearchMode.conditions.push({
      text: '',
      condition: '',
      columns: reportSearchMode.columns,
      value: ''
    });
    reportSearchMode.frReports.clear();
    reportSearchMode.aReports.clear();
    reportSearchMode.carReports.clear();
  }; // init
  setTimeout(function() {}, 100);
  // display FRs
  function displayFrs(ogfrs) {
    reportSearchMode.frReports.clear();
    for (var i = 0; i < ogfrs.length; i++) {
      var s = "未提交";
      if (ogfrs[i].status == "wait for tl") {
        s = "等待技术主管";
      } else if (ogfrs[i].status == "wait for qa") {
        s = "等待质量主管";
      } else if (ogfrs[i].status == "wait for mrb") {
        s = "等待MRB";
      } else if (ogfrs[i].status == "wait for far") {
        s = "等待分析";
      }
      reportSearchMode.frReports.push({
        frNumber: ogfrs[i].frNumber,
        project: ogfrs[i].project,
        frCreater: ogfrs[i].frCreater,
        frCreateDate: ogfrs[i].frCreateDate,
        reporter: ogfrs[i].reporter,
        happenTime: ogfrs[i].happenTime,
        status: s,
        mark: ogfrs[i].mark,
        mode: ogfrs[i].mode
      }); // push
    } // for
    reportSearchMode.frReports.reverse();
  } // displayFrs
  
  function displayFars(ogfrs) {
	    reportSearchMode.aReports.clear();
	    for(var i = 0; i < ogfrs.length; i ++) {
	      var s = "未提交";
	      if (ogfrs[i].status == "wait for dl") {
	        s = "等待部门主管";
	      }
	      else if (ogfrs[i].status == "wait for tl") {
	        s = "等待技术主管";
	      }
	      else if (ogfrs[i].status == "wait for mrb") {
	        s = "等待MRB";
	      }
	      else if (ogfrs[i].status == "wait for car") {
	        s = "等待处理";
	      }

	      reportSearchMode.aReports.push({
	        farNumber     : ogfrs[i].id,
	        project       : ogfrs[i].project,
	        frNumberRefer : ogfrs[i].frNumberRefer,
	        farAnalyst    : ogfrs[i].farAnalyst,
	        farCreateDate : ogfrs[i].farCreateDate.split(' ')[0],
	        failureHandler : ogfrs[i].failureHandler,
	        status        : s,
	        mark          : ogfrs[i].mark,
	        mode          : ogfrs[i].mode
	      }); // push
	    } // for
	    reportSearchMode.aReports.reverse();
	  }// displayFars
  
  
  // Line chart
  function setLineChart() {
    var canvas2 = $("#myChart2").get(0);
    var ctx2 = canvas2.getContext("2d");
    canvas2.width = window.innerWidth / 12 * 9;
    canvas2.height = 300;
    // fill data
    var labels = [];
    var map = {};
    for (var i = 0; i < reportSearchMode.frReports.length; i++) {
      var fr = reportSearchMode.frReports[i];
      var date = fr.frCreateDate.substring(0, 10);
      if (map[date] == null) {
        map[date] = 1;
        labels.unshift(date);
      } else {
        map[date]++;
      }
    }
    var data = [];
    var startDate = new Date(labels[0]);
    var endDate = new Date(labels[labels.length - 1]);
    labels = [];
    for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      var year = d.getFullYear();
      var mon = d.getMonth() + 1;
      if (mon / 10 < 1) mon = "0" + mon;
      var day = d.getDate();
      if (day / 10 < 1) day = "0" + day;
      var dateStr = year + "-" + mon + "-" + day;
      labels.push(dateStr);
      if (map[dateStr] == null) {
        data.push(0);
      } else {
        data.push(map[dateStr]);
      }
    }
    var data2 = {
      labels: labels,
      datasets: [{
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: data
      }]
    };
    var options = {
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale: true,
      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.2)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether the line is curved between points
      bezierCurve: true,
      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.4,
      //Boolean - Whether to show a dot for each point
      pointDot: true,
      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,
      //Boolean - Whether to fill the dataset with a colour
      datasetFill: true,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    };
    var myLineChart = new Chart(ctx2).Line(data2, options);
  } // setLineChart
  // pie chart
  function setPieChart() {
    // Pie chart
    var canvas3 = $("#myChart3").get(0);
    var ctx3 = canvas3.getContext("2d");
    canvas3.width = window.innerWidth / 12 * 9;
    canvas3.height = 300;
    //fill data
    var value = {
      tl: 0,
      qa: 0,
      mrb: 0,
      far: 0,
      other: 0
    };
    for (var i = 0; i < reportSearchMode.frReports.length; i++) {
      var fr = reportSearchMode.frReports[i];
      if (fr.status == "等待技术主管") {
        value['tl']++;
      } else if (fr.status == "等待质量主管") {
        value['qa']++;
      } else if (fr.status == "等待mrb") {
        value['mrb']++;
      } else if (fr.status == "等待分析") {
        value['far']++;
      } else {
        value['other']++;
      }
    }
    var data3 = [{
      value: value['tl'],
      color: "#F7464A",
      highlight: "#FF5A5E",
      label: "等待技术主管"
    }, {
      value: value['qa'],
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "等待质量主管"
    }, {
      value: value['mrb'],
      color: "#FDB45C",
      highlight: "#FFC870",
      label: "等待MRB"
    }, {
      value: value['far'],
      color: "#0000FF",
      highlight: "#00BFFF",
      label: "等待分析"
    }, {
      value: value['other'],
      color: "#00FF00",
      highlight: "#00FA9A",
      label: "其他"
    }];
    var doughnut = new Chart(ctx3).Pie(data3, {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke: true,
      //String - The colour of each segment stroke
      segmentStrokeColor: "#fff",
      //Number - The width of each segment stroke
      segmentStrokeWidth: 2,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 50, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps: 100,
      //String - Animation easing effect
      animationEasing: "easeOutBounce",
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate: true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale: true,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    });
  }
  // bar chart
  function setBarChart() {
    var canvas1 = $("#myChart1").get(0);
    var ctx1 = canvas1.getContext("2d");
    canvas1.width = window.innerWidth / 12 * 9;
    canvas1.height = 300;
    // fill data
    var labels = [];
    var map = {};
    for (var i = 0; i < reportSearchMode.frReports.length; i++) {
      var fr = reportSearchMode.frReports[i];
      var l = fr.project;
      if (map[l] == null) {
        map[l] = 1;
      } else {
        map[l]++;
      }
    }
    var dataSet = [];
    for (var key in map) {
      labels.push(key);
      var r = Math.ceil(Math.random() * 255);
      var g = Math.ceil(Math.random() * 255);
      var b = Math.ceil(Math.random() * 255);
      var rgb = "rgba(" + r + ", " + g + "," + b + ",";
      dataSet.push({
        label: key,
        fillColor: rgb + "0.7)",
        strokeColor: rgb + "0.9)",
        highlightFill: rgb + "0.8)",
        highlightStroke: rgb + "1)",
        data: [map[key]]
      });
    }
    var data1 = {
      labels: ['项目'],
      datasets: dataSet
    };
    var bar = new Chart(ctx1).Bar(data1, {
      barShowStroke: false
    });
  }
  return reportSearch;
});