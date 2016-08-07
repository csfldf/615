/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2014/8/29 13:39:26                           */
/*==============================================================*/

CREATE DATABASE `c919` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

use c919;

drop table if exists Aircraft;

drop table if exists AircraftCase;

drop table if exists BoardCard;

drop table if exists Car;

drop table if exists CarSourceCategory;

drop table if exists CorrectiveActionTaken;

drop table if exists CorrectiveSuggestion;

drop table if exists Equipment;

drop table if exists FailureAnalysisReport;

drop table if exists FailureCategory;

drop table if exists FailureCause;

drop table if exists FailureComponent;

drop table if exists FailureDescriptionAttachments;

drop table if exists FailureEffection;

drop table if exists FailureMode;

drop table if exists FailureReport;

drop table if exists Location;

drop table if exists NewComponent;

drop table if exists Precaution;

drop table if exists Process;

drop table if exists Producer;

drop table if exists Project;

drop table if exists Provider;

drop table if exists QualityIssueCategory;

drop table if exists RemainArgue;

drop table if exists SoftwareConfiguration;

drop table if exists System;

drop table if exists TestEquipment;

drop table if exists User;

drop table if exists Wire;

/*==============================================================*/
/* Table: Aircraft                                              */
/*==============================================================*/
create table Aircraft
(
   AircraftType         varchar(100) not null,
   DeleteMark           bool,
   primary key (AircraftType)
);

/*==============================================================*/
/* Table: AircraftCase                                          */
/*==============================================================*/
create table AircraftCase
(
   AircraftCaseNum      varchar(100) not null,
   DeleteMark           bool,
   primary key (AircraftCaseNum)
);

/*==============================================================*/
/* Table: BoardCard                                             */
/*==============================================================*/
create table BoardCard
(
   BoardCardNumber      varchar(100) not null,
   DeleteMark           bool,
   primary key (BoardCardNumber)
);

/*==============================================================*/
/* Table: Car                                                   */
/*==============================================================*/
create table Car
(
   CarNumber            varchar(100) not null,
   FrNumberRefer        varchar(100),
   FarNumberRefer       varchar(100),
   CarSource            varchar(256),
   CarSourceCode        varchar(256),
   CarCategory          varchar(100),
   ResponsiblePerson    varchar(100),
   DirectCauseAnalysis  text,
   NonconformityDescription varchar(1024),
   DirectCorrectMeasure varchar(1024),
   RootCause            text,
   Precaution           varchar(1024),
   VerifyActivity       bool,
   FailureCorrectPerson varchar(100),
   PredictFinishDate    datetime,
   ActualFinishDate     datetime,
   RemainArgue          varchar(1024),
   FileVersion          varchar(100),
   SoftwareVersion      varchar(100),
   NewComptModel        varchar(100),
   NewComponentCode     varchar(100),
   NewComptName         varchar(100),
   DeleteNMark          bool,
   Status               varchar(100),
   Attribute_116        char(10),
   primary key (CarNumber)
);

/*==============================================================*/
/* Table: CarSourceCategory                                     */
/*==============================================================*/
create table CarSourceCategory
(
   CarSourceCategory    varchar(100) not null,
   CarCategoryCode      varchar(100),
   DeleteMark           bool,
   primary key (CarSourceCategory)
);

/*==============================================================*/
/* Table: CorrectiveActionTaken                                 */
/*==============================================================*/
create table CorrectiveActionTaken
(
   CorrectiveAction     varchar(128) not null,
   DeleteMark           bool,
   primary key (CorrectiveAction)
);

/*==============================================================*/
/* Table: CorrectiveSuggestion                                  */
/*==============================================================*/
create table CorrectiveSuggestion
(
   CorrectiveSuggestion varchar(128) not null,
   DeleteMark           bool,
   primary key (CorrectiveSuggestion)
);

/*==============================================================*/
/* Table: Equipment                                             */
/*==============================================================*/
create table Equipment
(
   EquipmentInformation varchar(128) not null,
   DeleteMark           bool,
   primary key (EquipmentInformation)
);

/*==============================================================*/
/* Table: FailureAnalysisReport                                 */
/*==============================================================*/
create table FailureAnalysisReport
(
   FarNumber            varchar(100) not null,
   FrNumberRefer        varchar(100),
   FrComponentModel     varchar(100),
   FrComponentCode      varchar(100),
   FrComponentName      varchar(256),
   FailureCause         varchar(512),
   FailureAnalysis      text,
   CorrectSuggestion    varchar(1024),
   FailureCategory      varchar(1024),
   ResponsibleDepartmentLeader varchar(100),
   DepartmentOpinion    text,
   FrProjectLeader      varchar(100),
   FarLeaderOpinion     varchar(1024),
   FarMrbLeader         varchar(100),
   MrbSuggestions       varchar(1024),
   FarMrbDate           datetime,
   UserOpinion          text,
   DeleteMark           bool,
   Status               varchar(100),
   Attribute_78         char(10),
   primary key (FarNumber)
);

/*==============================================================*/
/* Table: FailureCategory                                       */
/*==============================================================*/
create table FailureCategory
(
   FailureCategoryName  varchar(128) not null,
   DeleteMark           bool,
   primary key (FailureCategoryName)
);

/*==============================================================*/
/* Table: FailureCause                                          */
/*==============================================================*/
create table FailureCause
(
   CauseName            varchar(128) not null,
   DeleteMark           bool,
   primary key (CauseName)
);

/*==============================================================*/
/* Table: FailureComponent                                      */
/*==============================================================*/
create table FailureComponent
(
   FailureComponentModel varchar(100) not null,
   FailureComponentName varchar(256),
   FailureComponentCode varchar(100),
   FailureComponentSruLot varchar(100),
   DeleteMark           bool,
   primary key (FailureComponentModel)
);

/*==============================================================*/
/* Table: FailureDescriptionAttachments                         */
/*==============================================================*/
create table FailureDescriptionAttachments
(
   FrNumber             varchar(100) not null,
   DescriptionAttachs   varchar(128) not null,
   DeleteMark           bool,
   primary key (DescriptionAttachs)
);

/*==============================================================*/
/* Table: FailureEffection                                      */
/*==============================================================*/
create table FailureEffection
(
   EffectionName        varchar(100) not null,
   DeleteMark           bool,
   primary key (EffectionName)
);

/*==============================================================*/
/* Table: FailureMode                                           */
/*==============================================================*/
create table FailureMode
(
   FailuerModeName      varchar(100) not null,
   DeleteMark           bool,
   primary key (FailuerModeName)
);

/*==============================================================*/
/* Table: FailureReport                                         */
/*==============================================================*/
create table FailureReport
(
   FrNumber             varchar(100) not null,
   Project              varchar(100),
   Type                 varchar(100),
   ComponentModel       varchar(100),
   ComponentCode        varchar(100),
   ComponentName        varchar(256),
   ComponentSruLot      varchar(100),
   SystemType           varchar(100),
   SystemSn             varchar(100),
   Code                 varchar(100),
   CardNumber           varchar(100),
   CaseCode             varchar(100),
   SoftwareConfig       varchar(1024),
   Producer             varchar(256),
   Provider             varchar(256),
   HappenTime           datetime,
   Location             varchar(256),
   WorkingHours         int,
   Environment          varchar(1024),
   Process              varchar(100),
   TestEquipmentNumber  varchar(100),
   WireNumber           varchar(100),
   TestEquipmentInfo    varchar(1024),
   FailureMode          varchar(1024),
   Description          varchar(1024),
   Effection            varchar(1024),
   QualityIssueCategory varchar(1024),
   ProjectLeader        varchar(100),
   LeaderOpinion        varchar(1024),
   QaLeader             varchar(100),
   QaLeaderOpinion      varchar(1024),
   FrCreater            varchar(1024),
   FrCreateDate         datetime,
   Reporter             varchar(100),
   MrbLeader            varchar(100),
   MrbOpinion           varchar(1024),
   MrbDate              datetime,
   DeleteMark           bool,
   Status               varchar(100),
   Attribute_99         char(10),
   primary key (FrNumber)
);

/*==============================================================*/
/* Table: Location                                              */
/*==============================================================*/
create table Location
(
   LocationName         varchar(100) not null,
   DeleteMark           bool,
   primary key (LocationName)
);

/*==============================================================*/
/* Table: Environment                                              */
/*==============================================================*/
create table Environment
(
   Environment         varchar(100) not null,
   DeleteMark           bool,
   primary key (Environment)
);

/*==============================================================*/
/* Table: NewComponent                                          */
/*==============================================================*/
create table NewComponent
(
   NewComptCode         varchar(100) not null,
   NewComptModel        varchar(100),
   NewComptName         varchar(100),
   DeleteMark           bool,
   primary key (NewComptCode)
);

/*==============================================================*/
/* Table: Precaution                                            */
/*==============================================================*/
create table Precaution
(
   PrecautionName       varchar(128) not null,
   DeleteMark           bool,
   primary key (PrecautionName)
);

/*==============================================================*/
/* Table: Process                                               */
/*==============================================================*/
create table Process
(
   ProcessName          varchar(100) not null,
   DeleteMark           bool,
   primary key (ProcessName)
);

/*==============================================================*/
/* Table: Producer                                              */
/*==============================================================*/
create table Producer
(
   ProducerName         varchar(100) not null,
   DeleteMark           bool,
   primary key (ProducerName)
);

/*==============================================================*/
/* Table: Project                                               */
/*==============================================================*/
create table Project
(
   ProjectName          varchar(100) not null,
   ProjectLeader        varchar(256),
   QualityAssureLeader  varchar(256),
   MrbLeader            varchar(256),
   DeleteMark           bool,
   Column_6             char(10),
   primary key (ProjectName)
);

/*==============================================================*/
/* Table: Provider                                              */
/*==============================================================*/
create table Provider
(
   ProviderName         varchar(100) not null,
   DeleteMark           bool,
   primary key (ProviderName)
);

/*==============================================================*/
/* Table: QualityIssueCategory                                  */
/*==============================================================*/
create table QualityIssueCategory
(
   QualityCategory      varchar(100) not null,
   DeleteMark           bool,
   primary key (QualityCategory)
);

/*==============================================================*/
/* Table: RemainArgue                                           */
/*==============================================================*/
create table RemainArgue
(
   ArgueType            varchar(100) not null,
   DeleteMark           bool,
   primary key (ArgueType)
);

/*==============================================================*/
/* Table: SoftwareConfiguration                                 */
/*==============================================================*/
create table SoftwareConfiguration
(
   Configurations       varchar(100) not null,
   DeleteMark           bool,
   primary key (Configurations)
);

/*==============================================================*/
/* Table: System                                                */
/*==============================================================*/
create table System
(
   SystemSnCode         varchar(100) not null,
   SystemModel          varchar(100),
   DeleteMark           bool,
   primary key (SystemSnCode)
);

/*==============================================================*/
/* Table: TestEquipment                                         */
/*==============================================================*/
create table TestEquipment
(
   TestEquipmentNum     varchar(100) not null,
   DeleteMark           bool,
   primary key (TestEquipmentNum)
);

/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
create table User
(
   UserId               int not null,
   UserName             varchar(100),
   Password				varchar(100),
   Email                varchar(100),
   Role                 varchar(100),
   primary key (UserId)
);

/*==============================================================*/
/* Table: Wire                                                  */
/*==============================================================*/
create table Wire
(
   WireNum              varchar(100) not null,
   DeleteMark           bool,
   primary key (WireNum)
);

alter table FailureDescriptionAttachments add constraint FK_Relationship_1 foreign key (FrNumber)
      references FailureReport (FrNumber) on delete restrict on update restrict;

