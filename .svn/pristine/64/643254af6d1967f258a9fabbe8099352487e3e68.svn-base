define(['fracas.sessionUtil', 'fracas.fracasDataPicker', 'fracas.searchUtil'], function(sessionUtil, dataPicker, searchUtil) {

  console.log();
  var eventSummary = {};

  var employeeInfo = {};

  var eventSummaryMode = avalon.define("eventSummary", function(vm) {
    _vm = vm;
    vm.frReports             = [];
    vm.failureAnalyseReports = [];
    vm.carReports            = [];

    // reports for display
    vm.curFrReports    = [];
    vm.curFarReports   = [];
    vm.curCarReports   = [];
    // page index
    vm.indexFrReports  = 0;
    vm.indexFarReports = 0;
    vm.indexCarReports = 0;
    // Pages
    vm.pagesFrReports  = 0;
    vm.pagesFarReports = 0;
    vm.pagesCarReports = 0;


    vm.loadReport = function(fr) {
      window.location.href='#!/fracas/failure_report/' + fr.mode + '/' + fr.frNumber;
    };
    vm.loadFar = function(far) {
      window.location.href='#!/fracas/failure_analyse/' + far.mode + '/' + far.farNumber;
    };
    vm.loadCar = function(car) {
      window.location.href='#!/fracas/car/' + car.mode + '/' + car.carNumber + '/' + '';
    };
    vm.orderByRound = function(contents, column, order) {
      vm.frReports      = searchUtil.orderByRound(contents, column, order);
      vm.curFrReports   = vm.frReports.slice(0, 6);
      vm.indexFrReports = 0;
    };
    vm.orderByDict = function(contents, column, order) {
      vm.frReports       = searchUtil.orderByDict(contents, column, order);
      vm.curFrReports    = vm.frReports.slice(0, 6);
      vm.indexFarReports = 0;
    };
    vm.topOnGoing = function(contents) {
      vm.frReports       = searchUtil.topOnGoing(contents);
      vm.curFrReports    = vm.frReports.slice(0, 6);
      vm.indexCarReports = 0;
    };

    // Increse page number
    vm.nextFrPage = function() {
      if (vm.indexFrReports+1 < vm.pagesFrReports) {
        vm.indexFrReports ++;
        vm.curFrReports = vm.frReports.slice(vm.indexFrReports*6, vm.indexFrReports*6+6);
      }
    };

    vm.preFrPage = function() {
      if (vm.indexFrReports > 0) {
        vm.indexFrReports --;
        vm.curFrReports = vm.frReports.slice(vm.indexFrReports*6, vm.indexFrReports*6+6);
      }
    };

    vm.nextFarPage = function() {
      if (vm.indexFarReports+1 < vm.pagesFarReports) {
        vm.indexFarReports ++;
        vm.curFarReports = vm.failureAnalyseReports.slice(vm.indexFarReports*6, vm.indexFarReports*6+6);
      }
    };

    vm.preFarPage = function() {
      if (vm.indexFarReports > 0) {
        vm.indexFarReports --;
        vm.curFarReports = vm.failureAnalyseReports.slice(vm.indexFarReports*6, vm.indexFarReports*6+6);
      }
    };

    vm.nextCarPage = function() {
      if (vm.indexCarReports+1 < vm.pagesCarReports) {
        vm.indexCarReports ++;
        vm.curCarReports = vm.carReports.slice(vm.indexCarReports*6, vm.indexCarReports*6+6);
      }
    };

    vm.preCarPage = function() {
      if (vm.indexCarReports > 0) {
        vm.indexCarReports --;
        vm.curCarReports = vm.carReports.slice(vm.indexCarReports*6, vm.indexCarReports*6+6);
      }
    };
  });

  // do all the init job here
  eventSummary.init = function() {
    sessionUtil.getEmployeeInfo(function(data) {
      employeeInfo = data;
      setFrs();
      setFars();
      setCars();
      setTimeout(function() {
      getNotification();
      }, 500);
    }); // getEmployeeInfo

    // Animation after page loading
    setTimeout(function() {
      $('.panel').slideDown( "slow" );
      $('.nav.nav-pills.nav-stacked').show();
    }, 500);

  }; // init

  // get and display all FRs from database, then mark on going items
  function setFrs() {
    dataPicker.getFrsByEmployee(employeeInfo.employeeId, function(frs) {
      var ogfrs = markOngoingFrs(frs);
      displayFrs(ogfrs);
    }); // dataPicker.getAllFrs

  }// setFrs

  // display FRs
  function displayFrs(ogfrs) {
    eventSummaryMode.frReports.clear();
    for(var i = 0; i < ogfrs.length; i ++) {
      var s = "未提交";
      if (ogfrs[i].status == "wait for tl") {
        s = "等待技术主管";
      }
      else if (ogfrs[i].status == "wait for qa") {
        s = "等待质量主管";
      }
      else if (ogfrs[i].status == "wait for mrb") {
        s = "等待MRB";
      }
      else if (ogfrs[i].status == "wait for far") {
        s = "等待分析";
      }

      eventSummaryMode.frReports.push({
        frNumber     : ogfrs[i].frNumber,
        project      : ogfrs[i].project,
        frCreater    : ogfrs[i].frCreater,
        frCreateDate : ogfrs[i].frCreateDate,
        reporter     : ogfrs[i].reporter,
        happenTime   : ogfrs[i].happenTime,
        status       : s,
        mark         : ogfrs[i].mark,
        mode         : ogfrs[i].mode
      }); // push
    } // for
    eventSummaryMode.frReports.reverse();
    eventSummaryMode.curFrReports   = eventSummaryMode.frReports.slice(0, 6);
    eventSummaryMode.pagesFrReports = Math.ceil(eventSummaryMode.frReports.length / 6);
  }// displayFrs

  // use employeeInfo and fr.status to mark on going items
  function markOngoingFrs(frs) {
    for (var i = 0; i < frs.length; i++) {
      var fr = frs[i];
      fr.mark = "NA";
      for (var j = 0; j < employeeInfo.projectRole.length; j ++) {
        var projectRole = employeeInfo.projectRole[j];
        var project = projectRole[0];
        var roleId = projectRole[1];

        if ( project != fr.project ) continue;
        // technical leader
        fr.mode = 0;
        if( roleId == 8 && fr.status == "wait for tl" ) {
          fr.mark = "wait";
          fr.mode = 2;
          break;
        }
        // qa leader
        else if ( roleId == 9 && fr.status == "wait for qa") {
          fr.mark = "wait";
          fr.mode = 3;
          break;
        }
        // mrb
        else if ( roleId == 10 && fr.status == "wait for mrb" ) {
          fr.mark = "wait";
          fr.mode = 4;
          break;
        }
        // far
        else if ( employeeInfo.employeeName == fr.farAnalyst && fr.status == "wait for far" ) {
          fr.mark = "wait";
          fr.mode = 5;
          break;
        }
        // supervisor
        else if ( roleId == 13 ) {
          fr.mode = 6;
        }
      } // for employeeInfo.projectRole
    } // for frs

    return frs;
  } // markOngoingFrs

  function setFars() {
    dataPicker.getFarsByEmployee(employeeInfo.employeeId, function(fars) {
      var ogfars = markOngoingFars(fars);
      displayFars(ogfars);
    }); // dataPicker.getAllFars

  }// setFars

  function displayFars(ogfrs) {
    eventSummaryMode.failureAnalyseReports.clear();
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

      eventSummaryMode.failureAnalyseReports.push({
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
    eventSummaryMode.curFarReports   = eventSummaryMode.failureAnalyseReports.slice(0, 6);
    eventSummaryMode.pagesFarReports = Math.ceil(eventSummaryMode.failureAnalyseReports.length / 6);
  }// displayFars

  function markOngoingFars(fars) {
    for (var i = 0; i < fars.length; i++) {
      var far = fars[i];
      far.mark = "NA";
      for (var j = 0; j < employeeInfo.projectRole.length; j ++) {
        var projectRole = employeeInfo.projectRole[j];
        var project = projectRole[0];
        var roleId = projectRole[1];

        if ( project != far.project ) continue;
        // department leader
        far.mode = 0;
        if( roleId == 16 && far.status == "wait for dl" ) {
          far.mark = "wait";
          far.mode = 2;
          break;
        }
        // technology leader
        else if ( roleId == 8 && far.status == "wait for tl") {
          far.mark = "wait";
          far.mode = 3;
          break;
        }
        // mrb
        else if ( roleId == 10 && far.status == "wait for mrb" ) {
          far.mark = "wait";
          far.mode = 4;
          break;
        }
        // car
        else if ( employeeInfo.employeeName == far.failureHandler && far.status == "wait for car" ) {
          far.mark = "wait";
          far.mode = 5;
          break;
        }

      } // for employeeInfo.projectRole
    } // for frs

    return fars;
  } // markOngoingFars

  function setCars() {
    dataPicker.getAllCars(function(cars) {
        var ogcars = markOngoingCars(cars);
        displayCars(ogcars);
    }); // dataPicker.getAllCars
  }// setCars

  function displayCars(ogcrs) {
    eventSummaryMode.carReports.clear();
    for(var i = 0; i < ogcrs.length; i ++) {
        var s = "未提交";
        if (ogcrs[i].status == "wait for dl") {
          s = "等待部门主管";
        }
        else if (ogcrs[i].status == "wait for tl") {
          s = "等待技术主管";
        }
        else if (ogcrs[i].status == "wait for qa") {
          s = "等待质量主管";
        }
        else if (ogcrs[i].status == "wait for mrb") {
          s = "等待MRB";
        }
        else if(ogcrs[i].status == "done"){
          s = "处理完成";
        }
        eventSummaryMode.carReports.push({
          carNumber     : ogcrs[i].id,
          project       : ogcrs[i].programID,
          frNumber : ogcrs[i].failureReportNo,
          carCreateDate : ogcrs[i].impltDate,
          status        : s,
          mark          : ogcrs[i].mark,
          mode          : ogcrs[i].mode
        }); // push
      } // for
      eventSummaryMode.curFarReports   = eventSummaryMode.failureAnalyseReports.slice(0, 6);
      eventSummaryMode.pagesFarReports = Math.ceil(eventSummaryMode.failureAnalyseReports.length / 6);
    }// displayFars

    function markOngoingCars(cars) {
      for (var i = 0; i < cars.length; i++) {
        var car = cars[i];
        car.mark = "NA";
        for (var j = 0; j < employeeInfo.projectRole.length; j ++) {
          var projectRole = employeeInfo.projectRole[j];
          var project = projectRole[0];
          var roleId = projectRole[1];

          // department leader
          car.mode = 0;
          if( roleId == 16 && car.status == "wait for dl" ) {
            car.mark = "wait";
            car.mode = 2;
            break;
          }
          // technology leader
          else if ( roleId == 8 && car.status == "wait for tl") {
            car.mark = "wait";
            car.mode = 3;
            break;
          }
          //qa leader
          else if ( roleId == 9 && car.status == "wait for qa") {
              car.mark = "wait";
              car.mode = 4;
              break;
        }
          // mrb
          else if ( roleId == 10 && car.status == "wait for mrb" ) {
            car.mark = "wait";
            car.mode = 5;
            break;
          }
          // done
          else if (car.status == "done" ) {
            car.mark = "done";
            car.mode = 6;
            break;
          }
         // alert(car.mode);
        } // for employeeInfo.projectRole
      } // for frs

      return cars;
    } // markOngoingFar


  function getNotification() {
    var count = {
      fr: 0,
      far: 0,
      car: 0
    };
    eventSummaryMode.frReports.forEach(function(r) {
      if (r.mark === 'wait') {
        count.fr ++;
      }
    });

    eventSummaryMode.failureAnalyseReports.forEach(function(r) {
      if (r.mark === 'wait') {
        count.far ++;
      }
    });

    eventSummaryMode.carReports.forEach(function(r) {
      if (r.mark === 'wait') {
        count.car ++;
      }
    });
    $('.well.information')[0].textContent = '提醒: 您有 ' + count.fr + ' 份故障报告、 ' 
    + count.far + ' 份分析报告、 ' 
    + count.car + ' 份纠正措施实施报告 等待处理！';
    console.log(count);
  }

  return eventSummary;
});