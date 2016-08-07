/**
 * Created by FeiyuLab on 2014/10/16 0016.
 */
define(function () {
    var pm = window['permissionM'] = {};
    var uiPermissons = {
        "planView": {
            origin: {
                parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                planIssuedDate: true, planDeadlineDate: true,
                planStartDate: true,planFinishDate:true,
                planSource: true,planController: true, planState: true, changeDetail: true,
                areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                //新的属性
                planWBS:true,planWBSBefore:true,planWBSAfter:true,
                remainingHour:true,remainingPeriod:true,remainingDuration:true,
                spi:true,completePercentage:true,
                controlDepartment: true, group: true,
                budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                //按钮
                buttonControllerSelect: true,buttonDepartmentSelect:true,
                buttonGroupSelect: true,
                buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                buttonSavePlan:true,
                buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                buttonModifyReject:true,buttonRelease:true,buttonReleaseCancel:true,
                buttonDelete: true
            },
            addtions: {
                new: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: false,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonGroupSelect: true,
                        buttonNewChildPlan:false,buttonNewPackage:false,buttonChange:false,
                        buttonSavePlan:true,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:false,
                        buttonModifyReject:false,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: false

                    },
                    enable: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: false,planFinishDate:false,
                        planSource: true,planController: true, planState: false, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi: true, completePercentage: false,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:true,buttonReleaseCancel:true,
                        buttonDelete: true
                    }
                },
                beforeRelease: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: false,planFinishDate:false,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:false,
                        buttonModifyReject:false,buttonRelease:true,buttonReleaseCancel:false,
                        buttonDelete: true

                    },
                    enable: {
                        planState:false,changeDetail: false, areaPlanOutput: false,
                        areaPlanRemainingDate: false,
                        planStartDate: false,planFinishDate:false,
                        buttonBack:false, buttonDelete: false,
                        //true
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planSource: true,planController: true,
                        areaUploader:true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi: true, completePercentage: false,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true
                    }
                },
                released: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonGroupSelect: false,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:false,
                        buttonModifyReject:false,buttonRelease:false,buttonReleaseCancel:true,
                        buttonDelete: true
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true
                    }
                },
                audit01: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonGroupSelect: false,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: true
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true
                    }
                },
                audit12: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonGroupSelect: false,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: true
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true
                    }
                },
                audit02: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonGroupSelect: false,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: true
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true
                    }
                },
                finished: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:false, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonGroupSelect: false,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:false,
                        buttonModifyReject:false,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: true
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true
                    }
                },
                change: {
                    display: {},
                    enable: {}
                },
                view:{
                    display:{
                        areaUploader:false,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonGroupSelect: false,
                        buttonNewChildPlan:false,buttonNewPackage:false,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:false,
                        buttonModifyReject:false,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: false,
                        //true
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true
                    },
                    enable:{
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planStartDate: false, planDeadlineDate: false, planFinishDate:false,
                        planSource: false,
                        planController: false, planState: false, changeDetail: false,
                        areaPlanOutput: false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //true
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:true,buttonReleaseCancel:true,
                        buttonDelete: true
                    }

                }
            }

        },
        "packageView": {
            origin: {
                parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                planIssuedDate: true, planDeadlineDate: true,
                planStartDate: true,planFinishDate:true,
                planSource: true,planController: true, planState: true, changeDetail: true,
                areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                //新的属性
                planWBS:true,planWBSBefore:true,planWBSAfter:true,
                remainingHour:true,remainingPeriod:true,remainingDuration:true,
                spi:true,completePercentage:true,
                controlDepartment: true, group: true,
                budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                //按钮
                buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                buttonSavePlan:true,
                buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                buttonModifyReject:true,buttonRelease:true,buttonReleaseCancel:true,
                buttonDelete: true
            },
            addtions: {
                new: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: false,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                        buttonNewChildPlan:false,buttonNewPackage:false,buttonChange:false,
                        buttonSavePlan:true,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:false,
                        buttonModifyReject:false,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: false

                    },
                    enable: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: false,planFinishDate:false,
                        planSource: true,planController: true, planState: false, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi: true, completePercentage: false,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:true,buttonReleaseCancel:true,
                        buttonDelete: true
                    }
                },
                beforeRelease: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: false,planFinishDate:false,
                        planSource: true,planController: true, planState: true, changeDetail: false,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:false,
                        buttonModifyReject:false,buttonRelease:true,buttonReleaseCancel:false,
                        buttonDelete: true

                    },
                    enable: {
                        planState:false,changeDetail: false, areaPlanOutput: false,
                        areaPlanRemainingDate: false,
                        planStartDate: false,planFinishDate:false,
                        buttonBack: false, buttonDelete: true,
                        //true
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planSource: true,planController: true,
                        areaUploader:true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi: true, completePercentage: false,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:true,buttonReleaseCancel:true
                    }
                },
                released: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: false, buttonDepartmentSelect: false, buttonGroupSelect: false,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:false,
                        buttonModifyReject:false,buttonRelease:false,buttonReleaseCancel:true,
                        buttonDelete: true
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //按钮
                        buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true
                    }
                },
                audit01: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: false, buttonDepartmentSelect: false, buttonGroupSelect: false,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: true,
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //按钮
                        buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true,
                    }
                },
                audit12: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: false, buttonDepartmentSelect: false, buttonGroupSelect: false,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: true,
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //按钮
                        buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true,
                    }
                },
                audit02: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: false, buttonDepartmentSelect: false, buttonGroupSelect: false,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: true,
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //按钮
                        buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true,
                    }
                },
                finished: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:false, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true,
                        //按钮
                        buttonControllerSelect: false, buttonDepartmentSelect: false, buttonGroupSelect: false,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:false,
                        buttonModifyReject:false,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: true
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //按钮
                        buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject: true, buttonRelease: true, buttonReleaseCancel: true,
                        buttonDelete: true,
                    }
                },
                change: {
                    display: {},
                    enable: {}
                },
                view:{
                    display:{
                        areaUploader:false,
                        //按钮
                        buttonControllerSelect: false, buttonDepartmentSelect: false, buttonGroupSelect: false,
                        buttonNewChildPlan:false,buttonNewPackage:false,buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonModifyApply:false,buttonModifyAgree:false,
                        buttonModifyReject:false,buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: false,
                        //true
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        remainingHour:true,remainingPeriod:true,remainingDuration:true,
                        spi:true,completePercentage:true,
                        controlDepartment: true, group: true,
                        budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true
                    },
                    enable:{
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planStartDate: false, planDeadlineDate: false, planFinishDate:false,
                        planSource: false,
                        planController: false, planState: false, changeDetail: false,
                        areaPlanOutput: false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        remainingHour:false,remainingPeriod:false,remainingDuration:false,
                        spi:false,completePercentage:false,
                        controlDepartment: false, group: false,
                        budget:false,cashFlow:false,cashSource:false,cashSubject:false,cashReal:false,
                        //true
                        //按钮
                        buttonControllerSelect: true, buttonDepartmentSelect: true, buttonGroupSelect: true,
                        buttonNewChildPlan:true,buttonNewPackage:true,buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonModifyApply:true,buttonModifyAgree:true,
                        buttonModifyReject:true,buttonRelease:true,buttonReleaseCancel:true,
                        buttonDelete: true


                    }

                }
            }

        },
        "taskView": {
            origin: {
                parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                planIssuedDate: true, planDeadlineDate: true,
                planStartDate: true,planFinishDate:true,
                planSource: true,planController: true, planState: true, changeDetail: true,
                areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                //新的属性
                planWBS:true,planWBSBefore:true,planWBSAfter:true,
                taskContent:true,taskWeight:true,
                //按钮
                buttonControllerSelect: true,buttonDepartmentSelect:true,
                buttonChange:true,
                buttonSavePlan:true,
                buttonMarkFinished:true,buttonMarkNotFinished:true,buttonMarkFinishedOverdue:true,
                buttonRelease:true,buttonReleaseCancel:true,
                buttonDelete: true
            },
            addtions: {
                new: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: false,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        taskContent:true,taskWeight:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:false,
                        buttonSavePlan:true,
                        buttonMarkFinished:false,buttonMarkNotFinished:false,buttonMarkFinishedOverdue:false,
                        buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: false,

                    },
                    enable: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: false,planFinishDate:false,
                        planSource: true,planController: true, planState: false, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        taskContent:true,taskWeight:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonMarkNotFinished:true,buttonMarkFinishedOverdue:true,
                        buttonRelease:true,buttonReleaseCancel:true,
                        buttonDelete: true
                    }
                },
                beforeRelease: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: false,planFinishDate:false,
                        planSource: true,planController: true, planState: true, changeDetail: false,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        taskContent:true,taskWeight:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonMarkNotFinished:false,buttonMarkFinishedOverdue:false,
                        buttonRelease:true,buttonReleaseCancel:false,
                        buttonDelete: true

                    },
                    enable: {
                        planState:false,changeDetail: false, areaPlanOutput: false,
                        areaPlanRemainingDate: false,
                        planStartDate: false,planFinishDate:false,
                        buttonBack: false,
                        //true
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planSource: true,planController: true,
                        areaUploader:true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        taskContent:true,taskWeight:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonMarkNotFinished:true,buttonMarkFinishedOverdue:true,
                        buttonRelease:true,buttonReleaseCancel:true,
                        buttonDelete: true
                    }
                },
                released: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        taskContent:true,taskWeight:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:true,buttonMarkNotFinished:true,buttonMarkFinishedOverdue:false,
                        buttonRelease:false,buttonReleaseCancel:true,
                        buttonDelete: true
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        taskContent:false,taskWeight:false,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonMarkNotFinished:true,buttonMarkFinishedOverdue:true,
                        buttonRelease:true,buttonReleaseCancel:true,
                        buttonDelete: true
                    }
                },
                notFinished: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:false, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        taskContent:true,taskWeight:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonMarkNotFinished:false,buttonMarkFinishedOverdue:true,
                        buttonRelease:false,buttonReleaseCancel:true,
                        buttonDelete: true
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        taskContent:false,taskWeight:false,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonMarkNotFinished:true,buttonMarkFinishedOverdue:true,
                        buttonRelease:true,buttonReleaseCancel:true,
                        buttonDelete: true
                    }
                },
                finished: {
                    display: {
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaUploader:false, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        taskContent:true,taskWeight:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonMarkNotFinished:false,buttonMarkFinishedOverdue:false,
                        buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: true
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planDeadlineDate: false,
                        planStartDate: false,planFinishDate:false,
                        planSource: false,planController: false, planState: false, changeDetail: true,
                        areaPlanOutput: false, areaUploader:false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        taskContent:false,taskWeight:false,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonMarkNotFinished:true,buttonMarkFinishedOverdue:true,
                        buttonRelease:true,buttonReleaseCancel:true,
                        buttonDelete: true
                    }
                },
                change: {
                    display: {},
                    enable: {}
                },
                view:{
                    display:{
                        areaUploader:false,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonChange:false,
                        buttonSavePlan:false,
                        buttonMarkFinished:false,buttonMarkNotFinished:false,buttonMarkFinishedOverdue:false,
                        buttonRelease:false,buttonReleaseCancel:false,
                        buttonDelete: false,
                        //true
                        parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                        planIssuedDate: true, planDeadlineDate: true,
                        planStartDate: true,planFinishDate:true,
                        planSource: true,planController: true, planState: true, changeDetail: true,
                        areaPlanOutput: true, areaPlanRemainingDate: true,
                        //新的属性
                        planWBS:true,planWBSBefore:true,planWBSAfter:true,
                        taskContent:true,taskWeight:true
                    },
                    enable:{
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false,
                        planIssuedDate: false, planStartDate: false, planDeadlineDate: false, planFinishDate:false,
                        planSource: false,
                        planController: false, planState: false, changeDetail: false,
                        areaPlanOutput: false, areaPlanRemainingDate: false,
                        //新的属性
                        planWBS:false,planWBSBefore:false,planWBSAfter:false,
                        taskContent:false,taskWeight:false,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSavePlan:true,
                        buttonMarkFinished:true,buttonMarkNotFinished:true,buttonMarkFinishedOverdue:true,
                        buttonReleasebuttonReleaseCancel:true,
                        buttonDelete: true
                    }
                }
            }

        },
        "actionView": {
            origin: {
                parentActionId:true,
                actionId:true,actionType:true,actionName:true,actionDeadlineDate:true,actionFinishDate:true,actionState:true,
                actionResource:true,controllerDepartment:true,actionController:true,actionControllerId:true,
                remark:true,
                actionOutputArea:true,actionUploaderArea:true,actionOutputDeleteArea:true,
                //按钮
                buttonControllerSelect: true,buttonDepartmentSelect:true,
                buttonChange:true,
                buttonSaveAction:true,buttonSaveActionAgain:true,
                buttonAudit12:true,buttonAudit21:true,
                buttonAudit23:true,buttonAudit32:true,buttonAudit34:true,
                buttonRelease:true,
                buttonDelete: true
            },
            addtions: {
                new: {
                    display: {
                        parentActionId:true,
                        actionId:true,actionType:true,actionName:true,actionDeadlineDate:true,actionFinishDate:false,actionState:true,
                        actionResource:true,controllerDepartment:true,actionController:true,actionControllerId:true,
                        remark:true,
                        actionOutputArea:false,actionUploaderArea:false,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSaveAction:true,buttonSaveActionAgain:false,
                        buttonAudit12:false,buttonAudit21:false,
                        buttonAudit23:false,buttonAudit32:false,buttonAudit34:false,
                        buttonRelease:false,
                        buttonDelete: false,
                    },
                    enable: {
                        parentActionId:true,
                        actionId:true,actionType:true,actionName:true,actionDeadlineDate:true,actionFinishDate:false,actionState:false,
                        actionResource:true,controllerDepartment:true,actionController:true,actionControllerId:true,
                        remark:true,
                        actionOutputArea:false,actionUploaderArea:true,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSaveAction:true,buttonSaveActionAgain:true,
                        buttonAudit12:true,buttonAudit21:true,
                        buttonAudit23:true,buttonAudit32:true,buttonAudit34:true,
                        buttonRelease:true,
                        buttonDelete: true
                    }
                },
                beforeRelease: {
                    display: {
                        parentActionId:true,
                        actionId:true,actionType:true,actionName:true,actionDeadlineDate:true,actionFinishDate:true,actionState:true,
                        actionResource:true,controllerDepartment:true,actionController:true,actionControllerId:true,
                        remark:true,
                        actionOutputArea:false,actionUploaderArea:false,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSaveAction:false,buttonSaveActionAgain:true,
                        buttonAudit12:false,buttonAudit21:false,
                        buttonAudit23:false,buttonAudit32:false,buttonAudit34:false,
                        buttonRelease:true,
                        buttonDelete: true
                    },
                    enable: {
                        parentActionId:true,
                        actionId:true,actionType:true,actionName:true,actionDeadlineDate:true,actionFinishDate:false,actionState:false,
                        actionResource:true,controllerDepartment:true,actionController:true,actionControllerId:true,
                        remark:true,
                        actionOutputArea:false,actionUploaderArea:true,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSaveAction:true,buttonSaveActionAgain:true,
                        buttonAudit12:true,buttonAudit21:true,
                        buttonAudit23:true,buttonAudit32:true,buttonAudit34:true,
                        buttonRelease:true,
                        buttonDelete: true
                    }
                },
                released: {
                    display: {
                        parentActionId:true,
                        actionId:true,actionType:true,actionName:true,actionDeadlineDate:true,actionFinishDate:true,actionState:true,
                        actionResource:true,controllerDepartment:true,actionController:true,actionControllerId:true,
                        remark:true,
                        actionOutputArea:true,actionUploaderArea:true,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonChange:false,
                        buttonSaveAction:false,buttonSaveActionAgain:false,
                        buttonAudit12:true,buttonAudit21:false,
                        buttonAudit23:false,buttonAudit32:false,buttonAudit34:false,
                        buttonRelease:false,
                        buttonDelete: true
                    },
                    enable: {
                        parentActionId:false,
                        actionId:false,actionType:false,actionName:false,actionDeadlineDate:false,actionFinishDate:false,actionState:false,
                        actionResource:false,controllerDepartment:false,actionController:false,actionControllerId:false,
                        remark:true,
                        actionOutputArea:true,actionUploaderArea:true,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSaveAction:true,buttonSaveActionAgain:true,
                        buttonAudit12:true,buttonAudit21:true,
                        buttonAudit23:true,buttonAudit32:true,buttonAudit34:true,
                        buttonRelease:true,
                        buttonDelete: true
                    }
                },
                waitForAudit: {
                    display: {
                        parentActionId:true,
                        actionId:true,actionType:true,actionName:true,actionDeadlineDate:true,actionFinishDate:true,actionState:true,
                        actionResource:true,controllerDepartment:true,actionController:true,actionControllerId:true,
                        remark:true,
                        actionOutputArea:true,actionUploaderArea:true,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonChange:false,
                        buttonSaveAction:false,buttonSaveActionAgain:false,
                        buttonAudit12:false,buttonAudit21:true,
                        buttonAudit23:true,buttonAudit32:false,buttonAudit34:false,
                        buttonRelease:false,
                        buttonDelete: true
                    },
                    enable: {
                        parentActionId:false,
                        actionId:false,actionType:false,actionName:false,actionDeadlineDate:false,actionFinishDate:false,actionState:false,
                        actionResource:false,controllerDepartment:false,actionController:false,actionControllerId:false,
                        remark:true,
                        actionOutputArea:true,actionUploaderArea:true,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSaveAction:true,buttonSaveActionAgain:true,
                        buttonAudit12:true,buttonAudit21:true,
                        buttonAudit23:true,buttonAudit32:true,buttonAudit34:true,
                        buttonRelease:true,
                        buttonDelete: true
                    }
                },
                waitForApprove: {
                    display: {
                        parentActionId:true,
                        actionId:true,actionType:true,actionName:true,actionDeadlineDate:true,actionFinishDate:true,actionState:true,
                        actionResource:true,controllerDepartment:true,actionController:true,actionControllerId:true,
                        remark:true,
                        actionOutputArea:true,actionUploaderArea:true,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonChange:false,
                        buttonSaveAction:false,buttonSaveActionAgain:false,
                        buttonAudit12:false,buttonAudit21:false,
                        buttonAudit23:false,buttonAudit32:true,buttonAudit34:true,
                        buttonRelease:false,
                        buttonDelete: true
                    },
                    enable: {
                        parentActionId:false,
                        actionId:false,actionType:false,actionName:false,actionDeadlineDate:false,actionFinishDate:false,actionState:false,
                        actionResource:false,controllerDepartment:false,actionController:false,actionControllerId:false,
                        remark:true,
                        actionOutputArea:true,actionUploaderArea:true,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSaveAction:true,buttonSaveActionAgain:true,
                        buttonAudit12:true,buttonAudit21:true,
                        buttonAudit23:true,buttonAudit32:true,buttonAudit34:true,
                        buttonRelease:true,
                        buttonDelete: true
                    }
                },
                finished: {
                    display: {
                        parentActionId:true,
                        actionId:true,actionType:true,actionName:true,actionDeadlineDate:true,actionFinishDate:true,actionState:true,
                        actionResource:true,controllerDepartment:true,actionController:true,actionControllerId:true,
                        remark:true,
                        actionOutputArea:true,actionUploaderArea:false,actionOutputDeleteArea:false,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonChange:false,
                        buttonSaveAction:false,buttonSaveActionAgain:false,
                        buttonAudit12:false,buttonAudit21:false,
                        buttonAudit23:false,buttonAudit32:false,buttonAudit34:false,
                        buttonRelease:false,
                        buttonDelete: true
                    },
                    enable: {
                        parentActionId:false,
                        actionId:false,actionType:false,actionName:false,actionDeadlineDate:false,actionFinishDate:false,actionState:false,
                        actionResource:false,controllerDepartment:false,actionController:false,actionControllerId:false,
                        remark:true,
                        actionOutputArea:true,actionUploaderArea:true,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSaveAction:true,buttonSaveActionAgain:true,
                        buttonAudit12:true,buttonAudit21:true,
                        buttonAudit23:true,buttonAudit32:true,buttonAudit34:true,
                        buttonRelease:true,
                        buttonDelete: true
                    }
                },
                change: {
                    display: {},
                    enable: {}
                },
                view:{
                    display:{
                        parentActionId:true,
                        actionId:true,actionType:true,actionName:true,actionDeadlineDate:true,actionFinishDate:true,actionState:true,
                        actionResource:true,controllerDepartment:true,actionController:true,actionControllerId:true,
                        remark:true,
                        actionOutputArea:true,actionUploaderArea:false,actionOutputDeleteArea:false,
                        //按钮
                        buttonControllerSelect: false,buttonDepartmentSelect:false,
                        buttonChange:false,
                        buttonSaveAction:false,buttonSaveActionAgain:false,
                        buttonAudit12:false,buttonAudit21:false,
                        buttonAudit23:false,buttonAudit32:false,buttonAudit34:false,
                        buttonRelease:false,
                        buttonDelete: true
                    },
                    enable:{
                        parentActionId:false,
                        actionId:false,actionType:false,actionName:false,actionDeadlineDate:false,actionFinishDate:false,actionState:false,
                        actionResource:false,controllerDepartment:false,actionController:false,actionControllerId:false,
                        remark:false,
                        actionOutputArea:false,actionUploaderArea:true,actionOutputDeleteArea:true,
                        //按钮
                        buttonControllerSelect: true,buttonDepartmentSelect:true,
                        buttonChange:true,
                        buttonSaveAction:true,buttonSaveActionAgain:true,
                        buttonAudit12:true,buttonAudit21:true,
                        buttonAudit23:true,buttonAudit32:true,buttonAudit34:true,
                        buttonRelease:true,
                        buttonDelete: true
                    }

                }
            }

        },
        "actionDirView": {
            origin: {
                projectId: true,
                //新的属性
                actionAuditorId: true, actionAuditor: true,
                actionApproverId: true, actionApprover: true,
                actionId: true, actionName: true,
                actionState: true,
                actionController: true, actionControllerId: true,
                remark: true,
                //按钮
                buttonControllerSelect: true,
                buttonChange: true,
                buttonSaveAction: true, buttonSaveActionAgain: true,
                buttonRelease: true, buttonDelete: true
            },
            addtions: {
                new: {
                    display: {
                        projectId: true,
                        //新的属性
                        actionAuditorId: true, actionAuditor: true,
                        actionApproverId: true, actionApprover: true,
                        actionId: true, actionName: true,
                        actionState: true,
                        actionController: true, actionControllerId: true,
                        remark: true,
                        //按钮
                        buttonControllerSelect: true,
                        buttonChange: true,
                        buttonSaveAction: true, buttonSaveActionAgain: false,
                        buttonRelease: false, buttonDelete: false
                    },
                    enable: {
                        projectId: true,
                        //新的属性
                        actionAuditorId: true, actionAuditor: true,
                        actionApproverId: true, actionApprover: true,
                        actionId: true, actionName: true,
                        actionState: false,
                        actionController: true, actionControllerId: true,
                        remark: true,
                        //按钮
                        buttonControllerSelect: true,
                        buttonChange: true,
                        buttonSaveAction: true, buttonSaveActionAgain: true,
                        buttonRelease: true, buttonDelete: true
                    }
                },
                beforeRelease: {
                    display: {
                        projectId: true,
                        //新的属性
                        actionAuditorId: true, actionAuditor: true,
                        actionApproverId: true, actionApprover: true,
                        actionId: true, actionName: true,
                        actionState: true,
                        actionController: true, actionControllerId: true,
                        remark: true,
                        //按钮
                        buttonControllerSelect: true,
                        buttonChange: true,
                        buttonSaveAction: false, buttonSaveActionAgain: true,
                        buttonRelease: true, buttonDelete: true
                    },
                    enable: {
                        projectId: true,
                        //新的属性
                        actionAuditorId: true, actionAuditor: true,
                        actionApproverId: true, actionApprover: true,
                        actionId: true, actionName: true,
                        actionState: false,
                        actionController: true, actionControllerId: true,
                        remark: true,
                        //按钮
                        buttonControllerSelect: true,
                        buttonChange: true,
                        buttonSaveAction: true, buttonSaveActionAgain: true,
                        buttonRelease: true, buttonDelete: true
                    }
                },
                released: {
                    display: {
                        projectId: true,
                        //新的属性
                        actionAuditorId: true, actionAuditor: true,
                        actionApproverId: true, actionApprover: true,
                        actionId: true, actionName: true,
                        actionState: true,
                        actionController: true, actionControllerId: true,
                        remark: true,
                        //按钮
                        buttonControllerSelect: false,
                        buttonChange: true,
                        buttonSaveAction: false, buttonSaveActionAgain: false,
                        buttonRelease: false, buttonDelete: true
                    },
                    enable: {
                        projectId: false,
                        //新的属性
                        actionAuditorId: false, actionAuditor: false,
                        actionApproverId: false, actionApprover: false,
                        actionId: false, actionName: false,
                        actionState: false,
                        actionController: false, actionControllerId: false,
                        remark: false,
                        //按钮
                        buttonControllerSelect: true,
                        buttonChange: true,
                        buttonSaveAction: true, buttonSaveActionAgain: true,
                        buttonRelease: true, buttonDelete: true
                    }
                },
                change: {
                    display: {},
                    enable: {}
                },
                view: {
                    display: {
                        projectId: true,
                        //新的属性
                        actionAuditorId: true, actionAuditor: true,
                        actionApproverId: true, actionApprover: true,
                        actionId: true, actionName: true,
                        actionState: true,
                        actionController: true, actionControllerId: true,
                        remark: true,
                        //按钮
                        buttonControllerSelect: false,
                        buttonChange: false,
                        buttonSaveAction: false, buttonSaveActionAgain: false,
                        buttonRelease: false, buttonDelete: false
                    },
                    enable: {
                        projectId: false,
                        //新的属性
                        actionAuditorId: false, actionAuditor: false,
                        actionApproverId: false, actionApprover: false,
                        actionId: false, actionName: false,
                        actionState: false,
                        actionController: false, actionControllerId: false,
                        remark: false,
                        //按钮
                        buttonControllerSelect: true,
                        buttonChange: true,
                        buttonSaveAction: true, buttonSaveActionAgain: true,
                        buttonRelease: true, buttonDelete: true
                    }
                }
            }
        },
        "planReport": {
            origin: {
                parentPlanCode: true, planSerialNumber: true, planCode: true, planName: true,
                planIssuedDate: true, planDeadlineDate: true,
                planStartDate: true,planFinishDate:true,
                planSource: true,planController: true, planState: true, changeDetail: true,
                areaPlanOutput: true, areaUploader:true, areaPlanRemainingDate: true,
                buttonControllerSelect: true,
                buttonSubmit: true, buttonBack:true,buttonSubmitDraft: true,
                buttonDelete: true,buttonDeleteDraft:true,
                //新的属性
                planWBS:true,planWBSBefore:true,planWBSAfter:true,
                remainingHour:true,remainingPeriod:true,remainingDuration:true,
                spi:true,completePercentage:true,
                controlDepartment:true,
                budget:true,cashFlow:true,cashSource:true,cashSubject:true,cashReal:true
            },
            addtions: {
                new: {
                    display: {
                        changeDetail: false, areaPlanOutput: false, areaPlanRemainingDate: false,
                        planStartDate:false, planFinishDate:false
                    },
                    enable: {
                        planState:false,changeDetail: false, areaPlanOutput: false, areaPlanRemainingDate: false,
                        planStartDate: false,planFinishDate:false,
                        buttonBack:false, buttonDelete: false
                    }
                },
                update: {
                    display: {
                        changeDetail: false, buttonControllerSelect: false
                    },
                    enable: {
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false, planIssuedDate: false,  planDeadlineDate: false, planSource: false,
                        planController: false, planState: false, changeDetail: false, buttonControllerSelect: false,
                        buttonBack:false,buttonSubmitDraft: false, buttonDeleteDraft: false,
                        planStartDate: false,planFinishDate:false
                    }
                },
                change: {
                    display: {},
                    enable: {}
                },
                view:{
                    display:{
                        areaUploader:false
                    },
                    enable:{
                        parentPlanCode: false, planSerialNumber: false, planCode: false, planName: false, planIssuedDate: false, planStartDate: false, planDeadlineDate: false, planSource: false,
                        planController: false, planState: false, changeDetail: false,
                        areaPlanOutput: false, areaPlanRemainingDate: false,
                        buttonControllerSelect: false,
                        buttonSubmit: false, buttonSubmitDraft: false, buttonDelete: false,buttonBack:false,
                        buttonDeleteDraft:false
                    }

                }
            }

        }
    }
    var getOrigin = function (module) {
        if (typeof module == 'string'
            && uiPermissons.hasOwnProperty(module) && uiPermissons[module].hasOwnProperty('origin')) {
            return uiPermissons[module]['origin'];
        }
    }
    var getAddtions = function (module) {
        if (typeof module == 'string'
            && uiPermissons[module] && uiPermissons[module]['addtions']) {
            return uiPermissons[module]['addtions'];
        }
    }
    var getFinal = function (module, addtionName,typeString) {
        if (typeof module == 'string'
            && uiPermissons.hasOwnProperty(module) && uiPermissons[module].hasOwnProperty('origin')
            && uiPermissons[module].hasOwnProperty('addtions')
            && uiPermissons[module]['addtions'].hasOwnProperty(addtionName)) {
            var final = avalon.mix({}, uiPermissons[module]['origin'], uiPermissons[module]['addtions'][addtionName][typeString])
            return final;
        }
    }
    avalon.mix(pm, {getOrigin: getOrigin, getAddtions: getAddtions, getFinal: getFinal})
    return pm;
})