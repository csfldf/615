define(['fracas.fracasDataPicker', 'fracas.sessionUtil', 'avalon/dropdown/avalon.dropdown', 'avalon/textbox/avalon.textbox', 'avalon/datepicker/avalon.datepicker', 'avalon/slider/avalon.slider', 'avalon/checkboxlist/avalon.checkboxlist'], function(dataPicker, sessionUtil) {
  var failureReport = {};
  var employeeInfo = {};
  var operateMode = 0;
  var frModes = {};
  var failureReportMode;
  
  failureReport.getVm = function(frNumber) {
	  failureReportMode = frModes[frNumber];
	  if(failureReportMode != null) return failureReportMode;
	  failureReportMode = avalon.define(frNumber, function(vm) {
		    _vm = vm;
		    // Set editable status
		    vm.projectDisable              = "";
		    vm.frNumberDisable             = "disable";
		    vm.typeDisable                 = "";
		    vm.systemTypeDisable           = "";
		    vm.systemSnDisable             = "";
		    vm.happenTimeDisable           = "";
		    vm.componentSruLotDisable      = "";
		    vm.workingHoursDisable         = "";
		    vm.codeDisable                 = "";
		    vm.providerDisable             = "";
		    vm.producerDisable             = "";
		    vm.environmentDisable          = "";
		    vm.reporterDisable             = "";
		    vm.testEquipmentNumberDisable  = "";
		    vm.testEquipmentInfoDisable    = "";
		    vm.processDisable              = "";
		    vm.failureModeDisable          = "";
		    vm.descriptionDisable          = "";
		    vm.frCreaterDisable            = "disable";
		    vm.frCreateDateDisable         = "disable";
		    vm.leaderOpinionDisable        = "";
		    vm.farAnalystDisable           = "";
		    vm.qualityIssueCategoryDisable = "";
		    vm.mrbOpinionDisable           = "";
		    vm.statusDisable               = "";
		    // THIS NEEDS TO BE REMOVED LATER!!!
		    setTimeout(function() {
		      $('.happenTime').attr('disabled', true);
		    }, 2000);
		    
		    vm.val = ["1", "2"];
		    vm.dataConfig = {
		      data: [{
		        text: "选项一",
		        value: "1"
		      }, {
		        text: "选项二",
		        value: "2"
		      }, {
		        text: "选项三",
		        value: "3"
		      }, {
		        text: "选项四",
		        value: "4"
		      }, {
		        text: "选项五",
		        value: "5"
		      }]
		    };
		    vm.project = "";
		    vm.projectOpts = [{
		      value: '1',
		      label: '1'
		    }, {
		      value: '2',
		      label: '2'
		    }, {
		      value: '3',
		      label: '3'
		    }];
		    vm.frNumber = frNumber;
		    vm.type = "";
		    vm.typeOpts = [{
		      value: '1',
		      label: 'aa'
		    }, {
		      value: '2',
		      label: '2'
		    }, {
		      value: '3',
		      label: '3'
		    }];
		    vm.componentModel = "";
		    vm.componentModelOpts = [{
		      value: '1',
		      label: '1'
		    }, {
		      value: '2',
		      label: '2'
		    }, {
		      value: '3',
		      label: '3'
		    }];
		    vm.systemType = "";
		    vm.systemTypeOpts = [{
		      value: '1',
		      label: '1'
		    }, {
		      value: '2',
		      label: '2'
		    }, {
		      value: '3',
		      label: '3'
		    }];
		    vm.systemSn = "";
		    vm.happenTime = "2014-11-11 11:11:11";
		    vm.componentSruLot = "";
		    vm.workingHours = 0;
		    vm.code = "";
		    vm.provider = "";
		    vm.providerOpts = [{
		      value: '1',
		      label: '1'
		    }, {
		      value: '2',
		      label: '2'
		    }, {
		      value: '3',
		      label: '3'
		    }];
		    vm.producer = "";
		    vm.producerOpts = [{
		      value: '1',
		      label: '1'
		    }, {
		      value: '2',
		      label: '2'
		    }, {
		      value: '3',
		      label: '3'
		    }];
		    vm.environment = [];
		    vm.environmentOpts = ['高低温（Thermal Shock）', '振动（Vibaraion）', '试验（Testing）'];
		    vm.reporter = "";
		    vm.testEquipmentNumber = "";
		    vm.testEquipmentNumberOpts = [{
		      value: '1',
		      label: '1'
		    }, {
		      value: '2',
		      label: '2'
		    }, {
		      value: '3',
		      label: '3'
		    }];
		    vm.testEquipmentInfo = "";
		    vm.testEquipmentInfoOpts = [{
		      value: '1',
		      label: '1'
		    }, {
		      value: '2',
		      label: '2'
		    }, {
		      value: '3',
		      label: '3'
		    }];
		    vm.process = [];
		    vm.processOpts = ['环境应力筛选（ESS）', '试用/试飞 （FT）', '电磁兼容试验'];
		    vm.failureMode = [];
		    vm.failureModeOpts = ['不显示（Not Display）', '损坏（Damaged）', '绝缘电阻下降（IRR）'];
		    vm.description = "";
		    vm.frCreater = 'Zhipeng';
		    vm.frCreateDate = '2014-10-19';
		    vm.farAnalyst = '';
		    vm.farAnalystOpts = [{
		      value: '1',
		      label: '1'
		    }, {
		      value: '2',
		      label: '2'
		    }, {
		      value: '3',
		      label: '3'
		    }];
		    vm.qualityIssueCategory = ['一般质量问题（General）'];
		    vm.qualityIssueCategoryOpts = ['一般质量问题（General）', '重复质量问题（Repetitive）', '严重质量问题（Serious）'];
		    vm.$mrbOpts = [];
		    vm.leaderOpinion = "";
		    vm.mrbOpinion = "";
		    vm.status = "";
		    vm.statusOpts = [{
		      value: 'wait for tl',
		      label: '等待技术主管'
		    }, {
		      value: 'wait for qa',
		      label: '等待质量主管'
		    }, {
		      value: 'wait for mrb',
		      label: '等待mrb'
		    }];
		    vm.$mode = "";
		    vm.$frNumber = "";
		    vm.tlMode = false;
		    vm.qaMode = false;
		    vm.mrbMode = false;
		    vm.editMode = true;
		    vm.farMode = false;
		    vm.supervisorMode = false;
		    vm.selectProject = function(project) {
		      // load employees by different project
		      dataPicker.getEmployeesByProject(failureReportMode.project, function(roles) {
		        failureReportMode.farAnalystOpts.clear();
		        var isIn = {};
		        for (var i = 0; i < roles.length; i++) {
		          if (isIn[roles[i].employeeName] != null) continue;
		          isIn[roles[i].employeeName] = 1;
		          failureReportMode.farAnalystOpts.push({
		            value: roles[i].employeeName,
		            label: roles[i].employeeName
		          });
		        } // for roles
		      }); // get EmployeesByProject
		    }
		    vm.saveFr = function() {
		      operateMode = 2;
		    };
		    vm.commitFr = function(op) {
		      operateMode = op;
		    };
		    vm.cancelFr = function() {
		      operateMode = 0;
		    };
		    vm.doFar = function() {
		      operateMode = 3;
		    };
		    vm.confirm = function() {
		      // cancel
		      if (operateMode == 0) {
		        window.location.href = '#!/fracas/event_summary';
		      }
		      // commit
		      else if (operateMode == 1) {
		        saveFr(1);
		        window.location.href = '#!/fracas/event_summary';
		      }
		      // save draft
		      else if (operateMode == 2) {
		        saveFr(0);
		        window.location.href = '#!/fracas/drafts';
		      }
		      // generate far report
		      else if (operateMode == 3) {
		        window.location.href = '#!/fracas/failure_analyse/1/' + failureReportMode.frNumber;
		      }
		      // supervisor
		      else if (operateMode == 4) {
		        saveFr(2);
		        window.location.href = '#!/fracas/event_summary';
		      }
		    };
		  });
	  
	  frModes[frNumber] = failureReportMode;
	  return failureReportMode;
  }
  
  failureReport.init = function(mode, frNumber) {
    initFr();
    sessionUtil.getEmployeeInfo(function(data) {
      employeeInfo = data;
      loadData();
      if (mode != 1) {
        loadFr(frNumber);
      }
      autoGenerate(mode);
      checkAccessMode(mode);
    }); // getEmployeeInfo
    /*
    failureReportMode.$mode = mode;
    failureReprotMode.$frNumber = frNumber;
    checkAccessMode(mode);
    
    */
  }
  var saveFr = function(smode) {
    failureReportMode.lastEditer = employeeInfo.employeeId;
    failureReportMode.tag = "";
    //保存草稿
    if (smode == 0) {
      failureReportMode.tag = "draft";
    }
    //提交
    else if (smode == 1) {
      //null to tl
      if (failureReportMode.status == null || failureReportMode.status == "") {
        failureReportMode.status = 'wait for tl';
      }
      //tl to qa
      else if (failureReportMode.status == 'wait for tl') {
        failureReportMode.status = 'wait for qa';
      }
      //qa to mrb
      else if (failureReportMode.status == 'wait for qa') {
        failureReportMode.status = 'wait for far';
        var isFind = false;
        for (var i = 0; i < failureReportMode.$mrbOpts.length; i++) {
          for (var j = 0; j < failureReportMode.qualityIssueCategory.length; j++) {
            var m = failureReportMode.$mrbOpts[i].value;
            var q = failureReportMode.qualityIssueCategory[j];
            if (m != q) continue;
            failureReportMode.status = 'wait for mrb';
            isFind = true;
            break;
          }
          if (isFind == true) {
            break;
          }
        }
      }
      //mrb to far
      else if (failureReportMode.status == 'wait for mrb') {
        failureReportMode.status = 'wait for far';
      }
      failureReportMode.tag = "";
    }
    // supervisor
    else if (smode == 2) {}
    var param = {
      'failureReport.project'              : failureReportMode.project,
      'failureReport.frNumber'             : failureReportMode.frNumber,
      'failureReport.type'                 : failureReportMode.type,
      'failureReport.componentModel'       : failureReportMode.componentModel,
      'failureReport.systemType'           : failureReportMode.systemType,
      'failureReport.systemSn'             : failureReportMode.systemSn,
      'failureReport.happenTime'           : failureReportMode.happenTime,
      'failureReport.componentSruLot'      : failureReportMode.componentSruLot,
      'failureReport.workingHours'         : failureReportMode.workingHours,
      'time'                               : failureReportMode.happenTime,
      'failureReport.code'                 : failureReportMode.code,
      'failureReport.provider'             : failureReportMode.provider,
      'failureReport.producer'             : failureReportMode.producer,
      'failureReport.environment'          : failureReportMode.environment.join(),
      'failureReport.reporter'             : failureReportMode.reporter,
      'failureReport.testEquipmentNumber'  : failureReportMode.testEquipmentNumber,
      'failureReport.testEquipmentInfo'    : failureReportMode.testEquipmentInfo,
      'failureReport.process'              : failureReportMode.process.join(),
      'failureReport.failureMode'          : failureReportMode.failureMode.join(),
      'failureReport.description'          : failureReportMode.description,
      'failureReport.frCreater'            : failureReportMode.frCreater,
      //'failureReport.frCreateDate'       : failureReportMode.frCreateDate,
      "frCreateDate"                       : failureReportMode.frCreateDate,
      'failureReport.leaderOpinion'        : failureReportMode.leaderOpinion,
      'failureReport.farAnalyst'           : failureReportMode.farAnalyst,
      'failureReport.qualityIssueCategory' : failureReportMode.qualityIssueCategory.join(),
      'failureReport.mrbOpinion'           : failureReportMode.mrbOpinion,
      //"mrbDate"                          : failureReportMode.mrbDate,
      'failureReport.status'               : failureReportMode.status,
      'failureReport.tag'                  : failureReportMode.tag,
      'failureReport.lastEditer'           : failureReportMode.lastEditer
    };
    $.post('fracas/add', param, function back(data) {});
  };
  var loadFr = function(frNumber) {
    dataPicker.getOneFr(frNumber, function(fr) {
      failureReportMode.project              = fr.project;
      failureReportMode.frNumber             = fr.frNumber;
      failureReportMode.type                 = fr.type;
      failureReportMode.componentModel       = fr.componentModel;
      failureReportMode.systemType           = fr.systemType;
      failureReportMode.systemSn             = fr.systemSn;
      failureReportMode.happenTime           = fr.happenTime;
      failureReportMode.componentSruLot      = fr.componentSruLot;
      failureReportMode.workingHours         = fr.workingHours;
      failureReportMode.code                 = fr.code;
      failureReportMode.provider             = fr.provider;
      failureReportMode.producer             = fr.producer;
      failureReportMode.environment          = fr.environment.split(',');
      failureReportMode.reporter             = fr.reporter;
      failureReportMode.testEquipmentNumber  = fr.testEquipmentNumber;
      failureReportMode.testEquipmentInfo    = fr.testEquipmentInfo;
      failureReportMode.process              = fr.process.split(',');
      failureReportMode.failureMode          = fr.failureMode.split(',');
      failureReportMode.description          = fr.description;
      failureReportMode.frCreater            = fr.frCreater;
      failureReportMode.frCreateDate         = fr.frCreateDate;
      failureReportMode.leaderOpinion        = fr.leaderOpinion;
      
      failureReportMode.qualityIssueCategory = fr.qualityIssueCategory.split(',');
      failureReportMode.mrbOpinion           = fr.mrbOpinion;
      failureReportMode.status               = fr.status;
      failureReportMode.tag                  = fr.tag;
      failureReportMode.lastEditer           = fr.lastEditer;
      
      dataPicker.getEmployeesByProject(failureReportMode.project, function(roles) {
          failureReportMode.farAnalystOpts.clear();
          var isIn = {};
          for (var i = 0; i < roles.length; i++) {
            if (isIn[roles[i].employeeName] != null) continue;
            isIn[roles[i].employeeName] = 1;
            failureReportMode.farAnalystOpts.push({
              value: roles[i].employeeName,
              label: roles[i].employeeName
            });
          } // for roles
          failureReportMode.farAnalyst           = fr.farAnalyst;
        }); // get EmployeesByProject
    });
  };

  function initFr() {
    // init all segments to null
    failureReportMode.project              = "";
    //failureReportMode.frNumber             = "";
    failureReportMode.type                 = "";
    failureReportMode.componentModel       = "";
    failureReportMode.systemType           = "";
    failureReportMode.systemSn             = "";
    failureReportMode.happenTime           = "";
    failureReportMode.componentSruLot      = "";
    failureReportMode.workingHours         = 0;
    failureReportMode.code                 = "";
    failureReportMode.provider             = "";
    failureReportMode.producer             = "";
    failureReportMode.environment          = "";
    failureReportMode.reporter             = "";
    failureReportMode.testEquipmentNumber  = "";
    failureReportMode.testEquipmentInfo    = "";
    failureReportMode.process              = "";
    failureReportMode.failureMode          = "";
    failureReportMode.description          = "";
    failureReportMode.frCreater            = "";
    failureReportMode.frCreateDate         = "";
    failureReportMode.leaderOpinion        = "";
    failureReportMode.farAnalyst           = "";
    failureReportMode.qualityIssueCategory = "";
    failureReportMode.mrbOpinion           = "";
    failureReportMode.status               = "";
    failureReportMode.tag                  = "";
    failureReportMode.lastEditer           = "";
    
    // load metadata
    dataPicker.getAllMetadata(function(data) {
      failureReportMode.typeOpts                 = loadMetadata(data, "type");
      failureReportMode.systemTypeOpts           = loadMetadata(data, "systemtype");
      failureReportMode.providerOpts             = loadMetadata(data, "provider");
      failureReportMode.producerOpts             = loadMetadata(data, "producer");
      failureReportMode.testEquipmentNumberOpts  = loadMetadata(data, "testequipmentnumber");
      failureReportMode.testEquipmentInfoOpts    = loadMetadata(data, "testequipmentmodel");
      failureReportMode.processOpts              = loadMetadata(data, "process");
      failureReportMode.failureModeOpts          = loadMetadata(data, "failuremode");
      failureReportMode.environmentOpts          = loadMetadata(data, "environment");
      failureReportMode.qualityIssueCategoryOpts = loadMetadata(data, "qualityissuecategory");
      failureReportMode.$mrbOpts                 = loadMetadata(data, "mrb");
    //  failureReportMode.projectOpts              = loadMetadata(data, "project");
    //  alert(failureReportMode.typeOpts);
    });
  }

  function loadMetadata(metadata, key) {
    var m;
    var result = [];
    if (metadata[key] == "" || metadata[key] == null) return result;
    m = metadata[key].split(',');
    for (var i = 0; i < m.length; i++) {
      result.push({
        value: m[i],
        label: m[i]
      });
    }
    return result;
  }
  // load data that need employee info
  function loadData() {
    // load projects
    failureReportMode.projectOpts.clear();
    var projectMap = {};
    for (var i = 0; i < employeeInfo.projectRole.length; i++) {
      var project = employeeInfo.projectRole[i][0];
      if (projectMap[project] == null && project != "") {
        projectMap[project] = 1;
        failureReportMode.projectOpts.push({
          value: project,
          label: project
        });
      }
    }

  }
  var checkAccessMode = function(amode) {
    //readonly
    if (amode == 0) {
      setReporterDisable(true);
      failureReportMode.tlMode = true;
      setTlDisable(true);
      failureReportMode.qaMode = true;
      setQaDisable(true);
      failureReportMode.mrbMode = true;
      setMrbDisable(true);
      failureReportMode.editMode = false;
      failureReportMode.farMode = false;
      failureReportMode.supervisorMode = false;
    }
    //录入
    else if (amode == 1) {
    	setReporterDisable(false);
      failureReportMode.tlMode = false;
      failureReportMode.qaMode = false;
      failureReportMode.mrbMode = false;
      failureReportMode.editMode = true;
      failureReportMode.farMode = false;
      failureReportMode.supervisorMode = false;
    }
    //技术主管
    else if (amode == 2) {
    	setReporterDisable(true);
      failureReportMode.tlMode = true;
      setTlDisable(false);
      failureReportMode.qaMode = false;
      failureReportMode.mrbMode = false;
      failureReportMode.editMode = true;
      failureReportMode.farMode = false;
      failureReportMode.supervisorMode = false;
    }
    //质量主管
    else if (amode == 3) {
    	setReporterDisable(true);
      failureReportMode.tlMode = true;
      setTlDisable(true);
      failureReportMode.qaMode = true;
      setQaDisable(false);
      failureReportMode.mrbMode = false;
      failureReportMode.editMode = true;
      failureReportMode.supervisorMode = false;
    }
    //mrb
    else if (amode == 4) {
    	setReporterDisable(true);
      failureReportMode.tlMode = true;
      setTlDisable(true);
      failureReportMode.qaMode = true;
      setQaDisable(true);
      failureReportMode.mrbMode = true;
      setMrbDisable(false);
      failureReportMode.editMode = true;
      failureReportMode.farMode = false;
      failureReportMode.supervisorMode = false;
    }
    //far
    else if (amode == 5) {
    	setReporterDisable(true);
        failureReportMode.tlMode = true;
        setTlDisable(true);
        failureReportMode.qaMode = true;
        setQaDisable(true);
      failureReportMode.mrbMode = true;
      setMrbDisable(true);
      failureReportMode.editMode = false;
      failureReportMode.farMode = true;
      failureReportMode.supervisorMode = false;
    }
    // supervisor
    else if (amode == 6) {
    	setReporterDisable(true);
        failureReportMode.tlMode = true;
        setTlDisable(true);
        failureReportMode.qaMode = true;
        setQaDisable(true);
        failureReportMode.mrbMode = true;
        setMrbDisable(true);
        failureReportMode.editMode = false;
        failureReportMode.farMode = false;
      failureReportMode.supervisorMode = true;
    }
  }
  
  function setReporterDisable(disable) {
	  var op = "";
	  if(disable == true) {
		  op = "disable";
	  }
	  
	  failureReportMode.projectDisable              = op;

	    failureReportMode.typeDisable                 = op;
	    failureReportMode.systemTypeDisable           = op;
	    failureReportMode.systemSnDisable             = op;
	    failureReportMode.happenTimeDisable           = op;
	    failureReportMode.componentSruLotDisable      = op;
	    failureReportMode.workingHoursDisable         = op;
	    failureReportMode.codeDisable                 = op;
	    failureReportMode.providerDisable             = op;
	    failureReportMode.producerDisable             = op;
	    failureReportMode.environmentDisable          = op;
	    failureReportMode.reporterDisable             = op;
	    failureReportMode.testEquipmentNumberDisable  = op;
	    failureReportMode.testEquipmentInfoDisable    = op;
	    failureReportMode.processDisable              = op;
	    failureReportMode.failureModeDisable          = op;
	    failureReportMode.descriptionDisable          = op;
  }
  
  function setTlDisable(disable) {
	  var op = "";
	  if(disable == true) {
		  op = "disable";
	  }
	  
	  failureReportMode.leaderOpinionDisable        = op;
	    failureReportMode.farAnalystDisable           = op;
  }
  
  function setQaDisable(disable) {
	  var op = "";
	  if(disable == true) {
		  op = "disable";
	  }
	  
	  failureReportMode.qualityIssueCategoryDisable = op;
  }
  
  function setMrbDisable(disable) {
	  var op = "";
	  if(disable == true) {
		  op = "disable";
	  }
	  
	  failureReportMode.mrbOpinionDisable           = op;
  }
  
  var autoGenerate = function(amode) {
    //readonly
    if (amode == 0) {}
    //录入
    else if (amode == 1) {
      //auto generate frCreater
      failureReportMode.frCreater = employeeInfo.employeeName;
      //auto generate frCreaterDate
      sessionUtil.getServerTime(function(time) {
        failureReportMode.frCreateDate = time;
      });
      //auto generate frNumber
      //failureReportMode.frNumber = "FR" + Date.now();
    }
    //技术主管
    else if (amode == 2) {}
    //质量主管
    else if (amode == 3) {}
    //mrb
    else if (amode == 4) {}
  }
  return failureReport;
});