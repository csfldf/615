define(['fracas.fracasDataPicker', 'fracas.sessionUtil', 'avalon/dropdown/avalon.dropdown', 'avalon/textbox/avalon.textbox', 'avalon/checkboxlist/avalon.checkboxlist', 'avalon/datepicker/avalon.datepicker'], function(dataPicker, sessionUtil) {
  var failureAnalyse = {};
  var employeeInfo = {};
  var operateMode = 0;
  var farModes = {};
  var failureAnalyseMode;

  failureAnalyse.getVm = function(id) {
    failureAnalyseMode = farModes[id];
    if(failureAnalyseMode != null) return failureAnalyseMode;
    failureAnalyseMode = avalon.define(id, function(vm) {
      _vm_fa = vm;
        vm.id                         = id;
        vm.frNumberRefer              = "";
        vm.frComponentModel           = "";
        vm.frComponentModelOpts       = {
          data: [{
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }, {
            value: '3',
            label: '3'
          }],
          readOnly: false
        };
        vm.frComponentCode            = "";
        vm.frComponentName            = "";
        vm.failureCause               = [];
        vm.failureCauseOpts           = [{label:'高低温（Thermal Shock）', value:'高低温（Thermal Shock）'},
                                         {label:'振动（Vibaraion）', value:'振动（Vibaraion）'}, {label:'试验（Testing）', value:'试验（Testing）'}];
        vm.failureCategory            = [];
        vm.failureCategoryOpts        = [{label:'设计 Design', value:'设计 Design'}, {label:'制造 Manufacture', value:'制造 Manufacture'}, {label:'工艺 Process', value:'工艺 Process'}];
        vm.correctSuggestion          = [];
        vm.correctSuggestionOpts      = [{label:'设计更改 Change Design', value:'设计更改 Change Design'}, {label:'更换元器件 Replace Component', value:'更换元器件 Replace Component'},
                                         {label:'工艺更改 Change Process', value:'工艺更改 Change Process'}];
        vm.response                   = [];
        vm.responseOpts               = [{label:'围堵措施 Containment Action', value:'围堵措施 Containment Action'}, {label:'纠正措施 Corrective Action', value:'纠正措施 Corrective Action'},
                                         {label:'根本原因 Root Cause', value:'根本原因 Root Cause'}];
        vm.failureAnalysis            = "";
        vm.failureAnalysisResponsible = "";
        vm.failureAnalysisLeader      = "";
        vm.failureHandler = "";
        vm.failureHandlerOpts =  [{
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }, {
            value: '3',
            label: '3'
          }];
        vm.mrbSuggestions             = "";
        vm.farCreateDate = '2014-10-19';

        vm.frNumberReferDisabled              = "disable";
        vm.frComponentModelDisabled           = "disable";
        vm.frComponentModelOptsDisabled       = "disable";
        vm.frComponentCodeDisabled            = "disable";
        vm.frComponentNameDisabled            = "disable";
        vm.failureCauseDisabled               = "disable";
        vm.failureCauseOptsDisabled           = "disable";
        vm.failureCategoryDisabled            = "disable";
        vm.failureCategoryOptsDisabled        = "disable";
        vm.correctSuggestionDisabled          = "disable";
        vm.correctSuggestionOptsDisabled      = "disable";
        vm.responseDisabled                   = "disable";
        vm.responseOptsDisabled               = "disable";
        vm.failureHandlerDisabled = "disable";
        vm.failureAnalysisDisabled            = "disable";
        vm.failureAnalysisResponsibleDisabled = "disable";
        vm.failureAnalysisLeaderDisabled      = "disable";
        vm.mrbSuggestionsDisabled             = "disable";
        vm.farCreateDateDisable         = "disable";

        vm.editMode = true;
        vm.dlMode = false;
        vm.tlMode = false;
        vm.mrbMode = false;
        vm.carMode = false;

        vm.saveFr = function() {
          console.log('-- Save');
          operateMode = 2;
        };
        vm.commitFr = function() {
          console.log('-- Commit');
          operateMode = 1;
        };
        vm.cancelFr = function() {
          console.log('-- Cancel');
          operateMode = 0;
        };
        vm.doCar = function() {
          operateMode = 3;
        }
        vm.confirm = function() {
          // cancel
          if (operateMode == 0) {
            window.location.href = '#!/fracas/event_summary';
          }
          // commit
          else if (operateMode == 1) {
            saveFar(1);
            window.location.href = '#!/fracas/event_summary';
          }
          // save draft
          else if (operateMode == 2) {
            saveFar(0);
            window.location.href = '#!/fracas/drafts';
          }
          // do car
          else if(operateMode == 3) {
            window.location.href = '#!/fracas/car/1/' + failureAnalyseMode.frNumberRefer + '/' + failureAnalyseMode.id;
          }
        };
        vm.checkFr = function() {
        	window.location.href = '#!/fracas/failure_report/0/' + failureAnalyseMode.frNumberRefer;
        }
        //
      });

    farModes[id] = failureAnalyseMode;
    return failureAnalyseMode;
  }

  failureAnalyse.init = function(mode, id) {
    initFar();
    sessionUtil.getEmployeeInfo(function(data) {
      employeeInfo = data;
      if (mode != 1) {
        loadFar(id);
      }
      checkAccessMode(mode);
      autoGenerate(mode, id);
    }); // getEmployeeInfo
  } // init
  function saveFar(smode) {
    failureAnalyseMode.lastEditer = employeeInfo.employeeId;
    failureAnalyseMode.tag = "";
    //保存草稿
    if (smode == 0) {
      failureAnalyseMode.tag = "draft";
    }
    //提交
    else if (smode == 1) {
      //null to dl
      if (failureAnalyseMode.status == null || failureAnalyseMode.status == "") {
        failureAnalyseMode.status = 'wait for dl';
      }
      //dl to tl
      else if (failureAnalyseMode.status == 'wait for dl') {
        failureAnalyseMode.status = 'wait for tl';
      }
      //qa to mrb
      else if (failureAnalyseMode.status == 'wait for tl') {
        failureAnalyseMode.status = 'wait for mrb';
      }
      //mrb to far
      else if (failureAnalyseMode.status == 'wait for mrb') {
        failureAnalyseMode.status = 'wait for car';
      }
    } // else smode
    //alert(failureAnalyseMode.farCreateDate);
    var param = {
      'failureAnalysisReport.id'                : failureAnalyseMode.id,
      'failureAnalysisReport.project'           : failureAnalyseMode.project,
      'failureAnalysisReport.frNumberRefer'     : failureAnalyseMode.frNumberRefer,
      'failureAnalysisReport.frComponentModel'  : failureAnalyseMode.frComponentModel,
      'failureAnalysisReport.frComponentCode'   : failureAnalyseMode.frComponentCode,
      'failureAnalysisReport.frComponentName'   : failureAnalyseMode.frComponentName,
      'failureAnalysisReport.failureCause'      : failureAnalyseMode.failureCause.join(),
      'failureAnalysisReport.failureCategory'   : failureAnalyseMode.failureCategory.join(),
      'failureAnalysisReport.correctSuggestion' : failureAnalyseMode.correctSuggestion.join(),
      'failureAnalysisReport.failureAnalysis'   : failureAnalyseMode.failureAnalysis,
      'failureAnalysisReport.failureHandler'   : failureAnalyseMode.failureHandler,
      'failureAnalysisReport.mrbSuggestions'    : failureAnalyseMode.mrbSuggestions,
      'failureAnalysisReport.farAnalyst'        : failureAnalyseMode.farAnalyst,
      'failureAnalysisReport.status'            : failureAnalyseMode.status,
      'failureAnalysisReport.tag'               : failureAnalyseMode.tag,
      'failureAnalysisReport.lastEditer'        : failureAnalyseMode.lastEditer,
      "farCreateDate"                           : failureAnalyseMode.farCreateDate,
      'failureAnalysisReport.departmentOpinion' : failureAnalyseMode.failureAnalysisResponsible,
      'failureAnalysisReport.farLeaderOpinion'  : failureAnalyseMode.failureAnalysisLeader
    }; // param
    $.post('fracas/saveFailureAnalysisReport', param, function back(data) {}); // post
    //alert(failureAnalyseMode.farCreateDate);
  } // saveFar
  function loadFar(farNumber) {
    dataPicker.getOneFar(farNumber, function(far) {
      console.log('>>', far);
      failureAnalyseMode.id                = far.id;
      failureAnalyseMode.project           = far.project;
      failureAnalyseMode.frNumberRefer     = far.frNumberRefer;
      failureAnalyseMode.frComponentModel  = far.frComponentModel;
      failureAnalyseMode.frComponentCode   = far.frComponentCode;
      failureAnalyseMode.frComponentName   = far.frComponentName;
      failureAnalyseMode.failureCause      = far.failureCause.split(",");
      failureAnalyseMode.failureCategory   = far.failureCategory.split(",");
      failureAnalyseMode.correctSuggestion = far.correctSuggestion.split(",");
      failureAnalyseMode.failureAnalysis   = far.failureAnalysis;
      failureAnalyseMode.mrbSuggestions    = far.mrbSuggestions;
      failureAnalyseMode.farAnalyst        = far.farAnalyst;
      failureAnalyseMode.status            = far.status;
      failureAnalyseMode.tag               = far.tag;
      failureAnalyseMode.lastEditer        = far.lastEditer;
      failureAnalyseMode.farCreateDate         = far.farCreateDate;
      failureAnalyseMode.failureAnalysisResponsible = far.departmentOpinion;
      failureAnalyseMode.failureAnalysisLeader = far.farLeaderOpinion;

      dataPicker.getEmployeesByProject(failureAnalyseMode.project, function(roles) {
          failureAnalyseMode.failureHandlerOpts.clear();
          var isIn = {};
          for (var i = 0; i < roles.length; i++) {
            if (isIn[roles[i].employeeName] != null) continue;
            isIn[roles[i].employeeName] = 1;
            failureAnalyseMode.failureHandlerOpts.push({
              value: roles[i].employeeName,
              label: roles[i].employeeName
            });
          } // for roles
//          failureAnalyseMode.failureHandler           = far.failureHandler;
          $('#fh-select').val(far.failureHandler);
          //alert(far.falireHandler);
        }); // get EmployeesByProject
    }); // loadFar
  }
  var autoGenerate = function(amode, id) {
    //readonly
    if (amode == 0) {}
    //录入
    else if (amode == 1) {
      //auto generate frNumber
      //failureAnalyseMode.id = "FAR" + Date.now();
      dataPicker.getOneFr(id, function(fr) {
        failureAnalyseMode.frNumberRefer    = fr.frNumber;
        failureAnalyseMode.frComponentModel = fr.type;
        failureAnalyseMode.frComponentName = fr.type;
        failureAnalyseMode.frComponentCode  = fr.code;
        failureAnalyseMode.farAnalyst       = fr.farAnalyst;
        failureAnalyseMode.project          = fr.project;
      }); // getOneFr

    //auto generate farCreaterDate
      sessionUtil.getServerTime(function(time) {
        failureAnalyseMode.farCreateDate = time;
        //alert(time);
      });
    }
    //技术主管
    else if (amode == 2) {}
    //质量主管
    else if (amode == 3) {}
    //mrb
    else if (amode == 4) {}
  }; // autoGenerate

  var checkAccessMode = function(amode) {
      //readonly
      if (amode == 0) {
        setAnalystDisable(true);
        setDlDisable(true);
        setTlDisable(true);
        setMrbDisable(true);
        failureAnalyseMode.editMode = false;
        failureAnalyseMode.dlMode = true;
        failureAnalyseMode.tlMode = true;
        failureAnalyseMode.mrbMode = true;
      }
      //录入
      else if (amode == 1) {
        setAnalystDisable(false);
        setDlDisable(true);
        setTlDisable(true);
        setMrbDisable(true);
        failureAnalyseMode.editMode = true;


        failureAnalyseMode.dlMode = false;
        failureAnalyseMode.tlMode = false;
        failureAnalyseMode.mrbMode = false;
        failureAnalyseMode.carMode = false;
      }
      //部门主管
      else if (amode == 2) {
        setAnalystDisable(true);
        setDlDisable(false);
        setTlDisable(true);
        setMrbDisable(true);
        failureAnalyseMode.editMode = true;
        failureAnalyseMode.dlMode = true;
        failureAnalyseMode.tlMode = false;
        failureAnalyseMode.mrbMode = false;
        failureAnalyseMode.carMode = false;
      }
      //质量主管
      else if (amode == 3) {
        setAnalystDisable(true);
        setDlDisable(true);
        setTlDisable(false);
        setMrbDisable(true);
        failureAnalyseMode.editMode = true;
        failureAnalyseMode.dlMode = true;
        failureAnalyseMode.tlMode = true;
        failureAnalyseMode.mrbMode = false;
        failureAnalyseMode.carMode = false;
      }
      //mrb
      else if (amode == 4) {
        setAnalystDisable(true);
        setDlDisable(true);
        setTlDisable(true);
        setMrbDisable(false);
        failureAnalyseMode.editMode = true;
        failureAnalyseMode.dlMode = true;
        failureAnalyseMode.tlMode = true;
        failureAnalyseMode.mrbMode = true;
        failureAnalyseMode.carMode = false;
      }
      //car
      else if (amode == 5) {
        setAnalystDisable(true);
        setDlDisable(true);
        setTlDisable(true);
        setMrbDisable(false);
        failureAnalyseMode.editMode = false;
        failureAnalyseMode.dlMode = true;
        failureAnalyseMode.tlMode = true;
        failureAnalyseMode.mrbMode = false;
        failureAnalyseMode.carMode = true;
      }
      // supervisor
      else if (amode == 6) {

      }
    }

  function setAnalystDisable(disable) {
    var op = "";
    if(disable === true) {
      op = "disable";
    }

    failureAnalyseMode.failureCauseDisabled               = op;
    failureAnalyseMode.failureCategoryDisabled            = op;
    failureAnalyseMode.correctSuggestionDisabled          = op;
    failureAnalyseMode.failureAnalysisDisabled            = op;
    failureAnalyseMode.responseDisabled                   = op;
  }

  function setDlDisable(disable) {
    var op = "";
    if(disable == true) {
      op = "disable";
    }

    failureAnalyseMode.failureAnalysisResponsibleDisabled               = op;
    failureAnalyseMode.failureHandlerDisabled = op;
  }

  function setTlDisable(disable) {
    var op = "";
    if(disable == true) {
      op = "disable";
    }

    failureAnalyseMode.failureAnalysisLeaderDisabled               = op;
  }

  function setMrbDisable(disable) {
    var op = "";
    if(disable == true) {
      op = "disable";
    }

    failureAnalyseMode.mrbSuggestionsDisabled               = op;
  }

  function initFar() {
      // load metadata
      dataPicker.getAllMetadata(function(data) {
        failureAnalyseMode.failureCauseOpts = loadMetadata(data, "failurecause");
        failureAnalyseMode.failureCategoryOpts = loadMetadata(data, "failurecategory");
        failureAnalyseMode.correctSuggestionOpts = loadMetadata(data, "recommendation");
        failureAnalyseMode.responseOpts = loadMetadata(data, "requiredcontent");
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

  return failureAnalyse;
});



