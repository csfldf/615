define(['fracas.fracasDataPicker', 'fracas.sessionUtil',
        'avalon/dropdown/avalon.dropdown',
        'avalon/textbox/avalon.textbox',
        'avalon/datepicker/avalon.datepicker'], function(dataPicker, sessionUtil) {

  var car = {};
  var carMode = {};
  var carModes = {};

  car.getVm = function(id) {
    carMode = carModes[id];
    if(carMode != null) return carMode;
    carMode = avalon.define(id, function(vm) {
      vm.id = id;

      vm.frNumber = "";
      vm.farNumber = "";
      vm.project = "";
      vm.frComponentModel = "";
      vm.frSruLot = "";
      vm.frSruSn = "";
      vm.ImpltGroup ="";
      vm.ImpltDate = "";
      vm.ShopFindingReportNo = "";
      vm.UnitRemoveName = "";
      vm.UniteRemovePartNo = "";
      vm.UniteRemoveSerialNo = "";
      vm.UnitRemoveManufct = "";
      vm.UniteRemoveProdDate = "";
      vm.UnitReplaceName = "";
      vm.UnitReplacePartNo = "";
      vm.UnitReplaceSerialNo = "";
      vm.UnitReplaceManufct = "";
      vm.UnitReplaceProdDate = "";
      vm.UnitRepairName = "";
      vm.UnitRepairPartNo = "";
      vm.UnitRepairSerialNo = "";
      vm.UnitRepairManufct = "";
      vm.UnitRepairProdDate = "";
      vm.SoftwareName = "";
      vm.SoftwarePartyNo = "";
      vm.RevisionBfChange = "";
      vm.RevisionAftChange = "";
      vm.CaImpltSummary = "";
      vm.CaImpltSummarySigner = "";
      vm.CaImpltSummarSignDate = "";
      vm.ActionValidation = "";
      vm.DepartmentManager = "";
      vm.ActionValidationDate = "";
      vm.TechLeaderVerification = "";
      vm.TechLeader = "";
      vm.TechLeaderVerifyDate = "";
      vm.QaManagerVerification = "";
      vm.QaManager = "";
      vm.QaManagerVerifyDate = "";
      vm.MrbVerification = "";
      vm.MrbLeader = "";
      vm.MrbVerifyDate = "";

      vm.frNumberDisabled = "disable";
      vm.projectDisabled = "disable";
      vm.frComponentModelDisabled = "disable";
      vm.frSruLotDisabled = "disable";
      vm.frSruSnDisabled = "disable";
      vm.ImpltGrouDisabledp ="disable";
      vm.ImpltDateDisabled = "disable";
      vm.ShopFindingReportNoDisabled = "disable";
      vm.UnitRemoveNameDisabled = "disable";
      vm.UniteRemovePartNoDisabled = "disable";
      vm.UniteRemoveSerialNoDisabled = "disable";
      vm.UnitRemoveManufctDisabled = "disable";
      vm.UniteRemoveProdDateDisabled = "disable";
      vm.UnitReplaceNameDisabled = "disable";
      vm.UnitReplacePartNoDisabled = "disable";
      vm.UnitReplaceSerialNoDisabled = "disable";
      vm.UnitReplaceManufctDisabled = "disable";
      vm.UnitReplaceProdDateDisabled = "disable";
      vm.UnitRepairNameDisabled = "disable";
      vm.UnitRepairPartNoDisabled = "disable";
      vm.UnitRepairSerialNoDisabled = "disable";
      vm.UnitRepairManufctDisabled = "disable";
      vm.UnitRepairProdDateDisabled = "disable";
      vm.SoftwareNameDisabled = "disable";
      vm.SoftwarePartyNoDisabled = "disable";
      vm.RevisionBfChangeDisabled = "disable";
      vm.RevisionAftChangeDisabled = "disable";
      vm.CaImpltSummaryDisabled = "disable";
      vm.CaImpltSummarySignerDisabled = "disable";
      vm.CaImpltSummarSignDateDisabled = "disable";
      vm.ActionValidationDisabled = "disable";
      vm.DepartmentManagerDisabled = "disable";
      vm.ActionValidationDateDisabled = "disable";
      vm.TechLeaderVerificationDisabled = "disable";
      vm.TechLeaderDisabled = "disable";
      vm.TechLeaderVerifyDateDisabled = "disable";
      vm.QaManagerVerificationDisabled = "disable";
      vm.QaManagerDisabled = "disable";
      vm.QaManagerVerifyDateDisabled = "disable";
      vm.MrbVerificationDisabled = "disable";
      vm.MrbLeaderDisabled = "disable";
      vm.MrbVerifyDateDisabled = "disable";

      vm.test = function() {
        alert(vm.frNumber);
      };

      vm.editMode = true;
      vm.dlMode = false;
      vm.tlMode = false;
      vm.qaMode = false;
      vm.mrbMode = false;
      vm.carMode = false;

      vm.saveCar = function() {
        console.log('-- Save');
        operateMode = 2;
      };
      vm.commitCar = function() {
        console.log('-- Commit');
        operateMode = 1;
      };
      vm.cancelCar = function() {
        console.log('-- Cancel');
        operateMode = 0;
      };

      vm.confirm = function() {
        //alert("hello");
        // cancel
        if (operateMode === 0) {
          window.location.href = '#!/fracas/event_summary';
        }
        // commit
        else if (operateMode == 1) {
          saveCar(1);
          window.location.href = '#!/fracas/event_summary';
        }
        // save draft
        else if (operateMode == 2) {
          saveCar(0);
          window.location.href = '#!/fracas/drafts';
        }
      };
      vm.checkFr = function() {
      	window.location.href = '#!/fracas/failure_report/0/' + carMode.frNumber;
      };
      vm.checkFar = function() {
        window.location.href = '#!/fracas/failure_analyse/0/' + carMode.farNumber;
      };
    });

    carModes[id] = carMode;
    return carMode;
  };

  car.init = function(mode, id, farId) {
  //  autoGenerate(mode, id);
  //  initCar();
    sessionUtil.getEmployeeInfo(function(data) {
      employeeInfo = data;
        if (mode != 1) {
          loadCar(id);
        }
        checkAccessMode(mode);
        autoGenerate(mode, id, farId);
    }); // getEmployeeInfo

  };

  function saveCar(smode) {
     // carMode.lastEditer = employeeInfo.employeeId;
    carMode.tag = "";
      //保存草稿
    if (smode == 0) {
      carMode.tag = "draft";
    }
    //提交
    else if (smode == 1) {
        //null to dl
      if (carMode.status == null || carMode.status == "") {
        carMode.status = 'wait for dl';
        }
        //dl to tl
        else if (carMode.status == 'wait for dl') {
          carMode.status = 'wait for tl';
        }
      //tl to qa
        else if (carMode.status == 'wait for tl'){
          carMode.status = 'wait for qa';
        }
        //qa to mrb
        else if (carMode.status == 'wait for qa') {
          carMode.status = 'wait for mrb';
        }
        //done
        else if (carMode.status == 'wait for mrb') {
          carMode.status = 'done';
        }
    } // else smode
      //alert(carMode.farCreateDate);
    var param = {
        'correctiveActionReport.id'               : carMode.id,
        'correctiveActionReport.column46'		  : carMode.farNumber,
        'correctiveActionReport.programID'        : carMode.project,
        'correctiveActionReport.failureReportNo'  : carMode.frNumber,
        'correctiveActionReport.failureItemPartNo': carMode.frComponentModel,
        'correctiveActionReport.failureItemName'  : carMode.frComponentName,
        'correctiveActionReport.failedItemBatchNo': carMode.frSrulot,
        'correctiveActionReport.failedItemSerialNo':carMode.frSruSn,
        'correctiveActionReport.impltGroup'       : carMode.ImpltGroup,
        'correctiveActionReport.implDate'         : carMode.ImpltDate,
        'correctiveActionReport.shopFindingReportNo': carMode.ShopFindingReportNo,
        'correctiveActionReport.unitRemoveName'   : carMode.UnitRemoveName,
        'correctiveActionReport.unitRemovePartNo' : carMode.UniteRemovePartNo,
        'correctiveActionReport.unitRemoveSerialNo': carMode.UniteRemoveSerialNo,
        'correctiveActionReport.unitRemoveManufct': carMode.UnitRemoveManufct,
        'correctiveActionReoprt.uniteRemoveProdDate': carMode.UniteRemoveProdDate,
        'correctiveActionReport.unitReplaceName' : carMode.UnitReplaceName,
        'correctiveActionReport.unitReplacePartNo': carMode.UnitReplacePartNo,
        'correctiveActionReport.unitReplaceSerialNo': carMode.UnitReplaceSerialNo,
        'correctiveActionReport.unitReplaceManufct' : carMode.UnitReplaceManufct,
        'correctiveActionReport.unitReplaceProdDate': carMode.UnitReplaceProdDate,
        'correctiveActionReport.unitRepairName' : carMode.UnitRepairName,
        'correctiveActionReport.unitRepairPartNo': carMode.UnitRepairPartNo,
        'correctiveActionReport.unitRepairSerialNo': carMode.UnitRepairSerialNo,
        'correctiveActionReport.unitRepairManufct' : carMode.UnitRepairManufct,
        'correctiveActionReport.unitRepairProdDate': carMode.UnitRepairProdDate,
        'correctiveActionReport.softwareName'      : carMode.SoftwareName,
        'correctiveActionReport.softwarePartyNo'   : carMode.SoftwarePartyNo,
        'correctiveActionReport.revisionBfChange'  : carMode.RevisionBfChange,
        'correctiveActionReport.revisionAftChange' : carMode.RevisionAftChange,
        'correctiveActionReport.caImpltSummary' : carMode.CaImpltSummary,
        'correctiveActionReport.caImpltSummarySigner': carMode.CaImpltSummarySigner,
        'correctiveActionReport.caImpltSummarSignDate': carMode.CaImpltSummarSignDate,
        'correctiveActionReport.actionValidation' : carMode.ActionValidation,
        'correctiveActionReport.departmentManager': carMode.DepartmentManager,
        'correctiveActionReport.actionValidationDate': carMode.ActionValidationDate,
        'correctiveActionReport.techLeaderVerification': carMode.TechLeaderVerification,
        'correctiveActionReport.techLeader' : carMode.TechLeader,
        'correctiveActionReport.techLeaderVerifyDate': carMode.TechLeaderVerifyDate,
        'correctiveActionReport.qaManagerVerification': carMode.QaManagerVerification,
        'correctiveActionReport.qaManager' : carMode.QaManager,
        'correctiveActionReport.qaManagerVerifyDate' : carMode.QaManagerVerifyDate,
        'correctiveActionReport.mrbVerification': carMode.MrbVerification,
        'correctiveActionReport.mrbLeader' : carMode.MrbLeader,
        'correctiveActionReport.mrbVerifyDate' : carMode.MrbVerifyDate,
        'correctiveActionReport.status' : carMode.status
    }; // param
    $.post('fracas/saveCar', param, function back(data) {}); // post
  } // saveCar

  function loadCar(carNumber) {
      dataPicker.getOneCar(carNumber, function(car) {
      //  alert(car.programID);
        console.log('>>', car);
        carMode.id = car.id;
        carMode.farNumber = car.column46;
        carMode.project = car.programID;
        carMode.frNumber = car.failureReportNo;
        carMode.frComponentModel = car.failureItemPartNo;
        carMode.frComponentName = car.failureItemName;
        carMode.frSrulot = car.failedItemBatchNo;
        carMode.frSruSn = car.failedItemSerialNo;
        carMode.ImpltGroup = car.impltGroup;
        carMode.ImpltDate = car.implDate;
        carMode.ShopFindingReportNo = car.shopFindingReportNo;
        carMode.UnitRemoveName = car.unitRemoveName;
        carMode.UniteRemovePartNo = car.unitRemovePartNo;
        carMode.UniteRemoveSerialNo = car.unitRemoveSerialNo;
        carMode.UnitRemoveManufct = car.unitRemoveManufct;
        carMode.UniteRemoveProdDate = car.uniteRemoveProdDate;
        carMode.UnitReplaceName = car.unitReplaceName;
        carMode.UnitReplacePartNo = car.unitReplacePartNo;
        carMode.UnitReplaceSerialNo = car.unitReplaceSerialNo;
        carMode.UnitReplaceManufct = car.unitReplaceManufct;
        carMode.UnitReplaceProdDate = car.unitReplaceProdDate;
        carMode.UnitRepairName = car.unitRepairName;
        carMode.UnitRepairPartNo = car.unitRepairPartNo;
        carMode.UnitRepairSerialNo = car.unitRepairSerialNo;
        carMode.UnitRepairManufct = car.unitRepairManufct;
        carMode.UnitRepairProdDate = car.unitRepairProdDate;
        carMode.SoftwareName = car.softwareName;
        carMode.SoftwarePartyNo = car.softwarePartyNo;
        carMode.RevisionBfChange = car.revisionBfChange;
        carMode.RevisionAftChange = car.revisionAftChange;
        carMode.CaImpltSummary = car.caImpltSummary;
        carMode.CaImpltSummarySigner = car.caImpltSummarySigner;
        carMode.CaImpltSummarSignDate = car.caImpltSummarSignDate;
        carMode.ActionValidation = car.actionValidation;
        carMode.DepartmentManager = car.departmentManager;
        carMode.ActionValidationDate = car.actionValidationDate;
        carMode.TechLeaderVerification = car.techLeaderVerification;
        carMode.TechLeader = car.techLeader;
        carMode.TechLeaderVerifyDate = car.techLeaderVerifyDate;
        carMode.QaManagerVerification = car.qaManagerVerification;
        carMode.QaManager = car.qaManager;
        carMode.QaManagerVerifyDate = car.qaManagerVerifyDate;
        carMode.MrbVerification = car.mrbVerification;
        carMode.MrbLeader = car.mrbLeader;
        carMode.MrbVerifyDate = car.mrbVerifyDate;
        carMode.status = car.status;
      }); // loadFar
    }

  var autoGenerate = function(amode, id, farId) {
      //readonly
      if (amode == 0) {}
      //录入
      else if (amode == 1) {
        //auto generate frNumber
        dataPicker.getOneFr(id, function(fr) {
          carMode.frNumber    = fr.frNumber;
          carMode.project = fr.project;
          carMode.frComponentModel = fr.type;
          carMode.frSruLot = fr.componentSruLot;
          carMode.frSruSn = fr.systemSn;
        }); // getOneFr
        carMode.farNumber = farId;
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
      if (amode === 0) {
        setAnalystDisable(true);
        setDlDisable(true);
        setTlDisable(true);
        setQaDisable(true);
        setMrbDisable(true);
        carMode.editMode = false;
        carMode.dlMode = true;
        carMode.tlMode = true;
        carMode.qaMode = true;
        carMode.mrbMode = true;
      }
      //录入
      else if (amode === 1) {
        setAnalystDisable(false);
        setDlDisable(true);
        setTlDisable(true);
        setQaDisable(true);
        setMrbDisable(true);
        carMode.editMode = true;
        carMode.dlMode = false;
        carMode.tlMode = false;
        carMode.qaMode = false;
        carMode.mrbMode = false;
      }
      //部门主管
      else if (amode == 2) {
        setAnalystDisable(true);
        setDlDisable(false);
        setTlDisable(true);
        setQaDisable(true);
        setQaDisable(true);
        setMrbDisable(true);
        carMode.editMode = true;
        carMode.dlMode = true;
        carMode.qaMode = false;
        carMode.tlMode = false;
        carMode.mrbMode = false;
      }
      //技术主管
      else if (amode == 3) {
        setAnalystDisable(true);
        setDlDisable(true);
        setTlDisable(false);
        setQaDisable(true);
        setMrbDisable(true);
        carMode.editMode = true;
        carMode.dlMode = true;
        carMode.tlMode = true;
        carMode.qaMode = false;
        carMode.mrbMode = false;
      }
      //质量主管
      else if (amode == 4) {
        setAnalystDisable(true);
        setDlDisable(true);
        setTlDisable(true);
        setQaDisable(false);
        setMrbDisable(true);
        carMode.editMode = true;
        carMode.dlMode = true;
        carMode.tlMode = true;
        carMode.qaMode = true;
        carMode.mrbMode = false;
      }
      //mrb
      else if (amode == 5) {
        setAnalystDisable(true);
        setDlDisable(true);
        setTlDisable(true);
        setQaDisable(true);
        setMrbDisable(false);
        carMode.editMode = true;
        carMode.dlMode = true;
        carMode.tlMode = true;
        carMode.qaMode = true;
        carMode.mrbMode = true;
      }
      // done
      else if (amode == 6) {
        setAnalystDisable(true);
        setDlDisable(true);
        setTlDisable(true);
        setMrbDisable(true);
        carMode.editMode = false;
        carMode.dlMode = true;
        carMode.tlMode = true;
        carMode.qaMode = true;
        carMode.mrbMode = true;
      }
    };

    function setAnalystDisable(disable) {
      var op = "";
      if(disable === true) {
        op = "disable";
      }

      carMode.frNumberDisabled = op;
      carMode.projectDisabled = op;
      carMode.frComponentModelDisabled = op;
      carMode.frSruLotDisabled = op;
      carMode.frSruSnDisabled = op;
      carMode.ImpltGrouDisabledp =op;
      carMode.ImpltDateDisabled = op;
      carMode.ShopFindingReportNoDisabled = op;
      carMode.UnitRemoveNameDisabled = op;
      carMode.UniteRemovePartNoDisabled = op;
      carMode.UniteRemoveSerialNoDisabled = op;
      carMode.UnitRemoveManufctDisabled = op;
      carMode.UniteRemoveProdDateDisabled = op;
      carMode.UnitReplaceNameDisabled = op;
      carMode.UnitReplacePartNoDisabled = op;
      carMode.UnitReplaceSerialNoDisabled = op;
      carMode.UnitReplaceManufctDisabled = op;
      carMode.UnitReplaceProdDateDisabled = op;
      carMode.UnitRepairNameDisabled = op;
      carMode.UnitRepairPartNoDisabled = op;
      carMode.UnitRepairSerialNoDisabled = op;
      carMode.UnitRepairManufctDisabled = op;
      carMode.UnitRepairProdDateDisabled = op;
      carMode.SoftwareNameDisabled = op;
      carMode.SoftwarePartyNoDisabled = op;
      carMode.RevisionBfChangeDisabled = op;
      carMode.RevisionAftChangeDisabled = op;
      carMode.CaImpltSummaryDisabled = op;
      carMode.CaImpltSummarySignerDisabled = op;
      carMode.CaImpltSummarSignDateDisabled = op;
    }

    function setDlDisable(disable) {
      var op = "";
      if(disable === true) {
        op = "disable";
      }

      carMode.ActionValidationDisabled = op;
      carMode.DepartmentManagerDisabled = op;
      carMode.ActionValidationDateDisabled = op;
    }

    function setTlDisable(disable) {
      var op = "";
      if(disable === true) {
        op = "disable";
      }

      carMode.TechLeaderVerificationDisabled = op;
      carMode.TechLeaderDisabled = op;
      carMode.TechLeaderVerifyDateDisabled = op;
    }

    function setQaDisable(disable) {
      var op = "";
      if(disable === true) {
        op = "disable";
      }

      carMode.QaManagerVerificationDisabled = op;
      carMode.QaManagerDisabled = op;
      carMode.QaManagerVerifyDateDisabled = op;
    }
    function setMrbDisable(disable) {
      var op = "";
      if(disable === true) {
        op = "disable";
      }

      carMode.MrbVerificationDisabled = op;
      carMode.MrbLeaderDisabled = op;
      carMode.MrbVerifyDateDisabled = op;
    }

    function initFar() {

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

  return car;
});