define(['fracas.sessionUtil', 'fracas.fracasDataPicker', 'chart', 'avalon/datepicker/avalon.daterangepicker'], function(sessionUtil, dataPicker, chart, datarangepicker) {
	var reportData = {};
	
	var reportDataMode = avalon.define("reportData", function(vm) {
		_vm = vm;
		vm.displayList = [true, false, false];
		
		vm.setDisplayList = function(num) {
			switch(num) {
			case 0:
				vm.displayList = [true, false, false];
				break;
			case 1:
				vm.displayList = [false, true, false];
				break;
			case 2:
				vm.displayList = [false, false, true];
				break;
			}
		};
	});
	
	// do all the init job here
	reportData.init = function() {
		console.log('Do Something');
	};
	
	setTimeout(function() {
		
		// Bar chart
		var canvas1 = $("#myChart1").get(0);
		var ctx1 = canvas1.getContext("2d");
		canvas1.width = window.innerWidth/12*9;
		canvas1.height = 300;
		var data1 = {
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(52, 73, 94,0.7)",
		            strokeColor: "rgba(52, 73, 94,0.9)",
		            highlightFill: "rgba(52, 73, 94,0.8)",
		            highlightStroke: "rgba(52, 73, 94,1)",
		            data: [65, 59, 80, 81, 56, 55, 40]
		        },
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(41, 128, 185,0.7)",
		            strokeColor: "rgba(41, 128, 185,0.9)",
		            highlightFill: "rgba(41, 128, 185,0.8)",
		            highlightStroke: "rgba(41, 128, 185,1)",
		            data: [28, 48, 40, 19, 86, 27, 90]
		        }
		    ]
		};
		var bar = new Chart(ctx1).Bar(data1, {
		    barShowStroke: false
		});
		
		// Line chart
		var canvas2 = $("#myChart2").get(0);
		var ctx2 = canvas2.getContext("2d");
		canvas2.width = window.innerWidth/12*9;
        canvas2.height = 300;
		var data2 = {
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,1)",
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [65, 59, 80, 81, 56, 55, 40]
		        },
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(52, 152, 219,0.5)",
		            strokeColor: "rgba(52, 152, 219,1)",
		            pointColor: "rgba(52, 152, 219,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(52, 152, 219,1)",
		            data: [28, 48, 40, 19, 86, 27, 90]
		        }
		    ]
		};
		var options = {
				//Boolean - Whether we animate scaling the Doughnut from the centre
			    animateScale : true,
			    ///Boolean - Whether grid lines are shown across the chart
			    scaleShowGridLines : true,

			    //String - Colour of the grid lines
			    scaleGridLineColor : "rgba(0,0,0,.2)",

			    //Number - Width of the grid lines
			    scaleGridLineWidth : 1,

			    //Boolean - Whether the line is curved between points
			    bezierCurve : true,

			    //Number - Tension of the bezier curve between points
			    bezierCurveTension : 0.4,

			    //Boolean - Whether to show a dot for each point
			    pointDot : true,

			    //Number - Radius of each point dot in pixels
			    pointDotRadius : 4,

			    //Number - Pixel width of point dot stroke
			    pointDotStrokeWidth : 1,

			    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			    pointHitDetectionRadius : 20,

			    //Boolean - Whether to show a stroke for datasets
			    datasetStroke : true,

			    //Number - Pixel width of dataset stroke
			    datasetStrokeWidth : 2,

			    //Boolean - Whether to fill the dataset with a colour
			    datasetFill : true,

			    //String - A legend template
			    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

			};
		var myLineChart = new Chart(ctx2).Line(data2, options);
		
		// Pie chart
		var canvas3 = $("#myChart3").get(0);
		var ctx3 = canvas3.getContext("2d");
		canvas3.width = window.innerWidth/12*9;
        canvas3.height = 300;
		var data3 = [
		            {
		                value: 300,
		                color:"#F7464A",
		                highlight: "#FF5A5E",
		                label: "Red"
		            },
		            {
		                value: 50,
		                color: "#46BFBD",
		                highlight: "#5AD3D1",
		                label: "Green"
		            },
		            {
		                value: 100,
		                color: "#FDB45C",
		                highlight: "#FFC870",
		                label: "Yellow"
		            }
		        ];
		var doughnut = new Chart(ctx3).Pie(data3, {
			//Boolean - Whether we should show a stroke on each segment
		    segmentShowStroke : true,

		    //String - The colour of each segment stroke
		    segmentStrokeColor : "#fff",

		    //Number - The width of each segment stroke
		    segmentStrokeWidth : 2,

		    //Number - The percentage of the chart that we cut out of the middle
		    percentageInnerCutout : 50, // This is 0 for Pie charts

		    //Number - Amount of animation steps
		    animationSteps : 100,

		    //String - Animation easing effect
		    animationEasing : "easeOutBounce",

		    //Boolean - Whether we animate the rotation of the Doughnut
		    animateRotate : true,

		    //Boolean - Whether we animate scaling the Doughnut from the centre
		    animateScale : true,

		    //String - A legend template
		    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
		});
	},100);
	
	return reportData;
});