define(['fracas.sessionUtil', 'fracas.fracasDataPicker', 'UIMainFrame'], function(sessionUtil, dataPicker, main) {

  console.log();
  var drafts = {};

  var employeeInfo = {};

  var draftsMode = avalon.define("drafts", function(vm) {
    _vm = vm;
    vm.frReports = [];
    vm.failureAnalyseReports = [];
    vm.carReports = [];
    vm.loadReport = function(fr) {
            window.location.href='#!/fracas/failure_report/' + fr.mode + '/' + fr.frNumber;
    }
    vm.loadFar = function(far) {
            window.location.href='#!/fracas/failure_analyse/' + far.mode + '/' + far.farNumber;
    }
  });

  drafts.init = function() {
//    main.switchSidebar(fracasSidebar);
//    main.registerTabChangeCallBack(main.currentIndex, main.fracasInit);
    sessionUtil.getEmployeeInfo(function(data) {
      employeeInfo = data;
      setFrDrafts();
      setFarDrafts();
    });// getEmployeeInfo

    // Animation after page loading
    setTimeout(function() {
      $('.panel').slideDown( "slow" );
    }, 500);


  };

  // get and display FR drafts
  function setFrDrafts() {
    dataPicker.getFrDrafts(employeeInfo.employeeId, function(frs) {
      frs = markDrafts(frs);
      displayFrs(frs);
    });
  }

  function displayFrs(ogfrs) {
    draftsMode.frReports.clear();
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

      draftsMode.frReports.push({
        frNumber : ogfrs[i].frNumber,
        project : ogfrs[i].project,
        frCreater : ogfrs[i].frCreater,
        frCreateDate : ogfrs[i].frCreateDate,
        reporter : ogfrs[i].reporter,
        happenTime : ogfrs[i].happenTime,
        status : s,
        mark : ogfrs[i].mark,
        mode : ogfrs[i].mode
      }); // push
    } // for
  }// displayFrs

  function markDrafts(frs) {
    for ( var i = 0; i < frs.length; i++ ) {
      var fr = frs[i];
      if (fr.status == "") {
        fr.mode = 1;
      }
      else if (fr.status == "wait for tl") {
        fr.mode = 2;
      }
      else if (fr.status == "wait for qa") {
        fr.mode = 3;
      }
      else if (fr.status == "wait for mrb") {
        fr.mode = 4;
      }
    }// for frs
    return frs;
  }// markDrafts

  function setFarDrafts() {
    dataPicker.getFarDrafts(employeeInfo.employeeId, function(fars) {
      var ogfars = markOngoingFars(fars);
      displayFars(ogfars);
    }); // dataPicker.getAllFars

  }// setFars

  function displayFars(ogfrs) {
    draftsMode.failureAnalyseReports.clear();
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

      draftsMode.failureAnalyseReports.push({
        farNumber : ogfrs[i].id,
        project : ogfrs[i].project,
        frNumberRefer : ogfrs[i].frNumberRefer,
        farAnalyst : ogfrs[i].farAnalyst,
        status : s,
        mark : ogfrs[i].mark,
        mode : ogfrs[i].mode
      }); // push
    } // for
  }// displayFars

  function markOngoingFars(fars) {
    for (var i = 0; i < fars.length; i++) {
      var far = fars[i];
      far.mark = "NA";
      for (var j = 0; j < employeeInfo.projectRole.length; j ++) {
        var projectRole = employeeInfo.projectRole[j]
        var project = projectRole[0];
        var roleId = projectRole[1];

        if ( project != far.project ) continue;
        // department leader
        far.mode = 0;
        if( roleId == 11 && far.status == "wait for dl" ) {
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

      } // for employeeInfo.projectRole
    } // for frs

    return fars;
  } // markOngoingFars

  return drafts;
});