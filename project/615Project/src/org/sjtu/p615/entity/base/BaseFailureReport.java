package org.sjtu.p615.entity.base;

import java.io.Serializable;


/**
 * This is an object that contains data related to the failurereport table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="failurereport"
 */

public abstract class BaseFailureReport  implements Serializable {

	public static String REF = "FailureReport";
	public static String PROP_ENVIRONMENT = "environment";
	public static String PROP_TEST_EQUIPMENT_NUMBER = "testEquipmentNumber";
	public static String PROP_CASE_CODE = "caseCode";
	public static String PROP_TYPE = "type";
	public static String PROP_FR_CREATER = "frCreater";
	public static String PROP_QA_LEADER = "qaLeader";
	public static String PROP_PROJECT_LEADER = "projectLeader";
	public static String PROP_CODE = "code";
	public static String PROP_COMPONENT_CODE = "componentCode";
	public static String PROP_FAILURE_MODE = "failureMode";
	public static String PROP_TAG = "tag";
	public static String PROP_COMPONENT_SRU_LOT = "componentSruLot";
	public static String PROP_MRB_DATE = "mrbDate";
	public static String PROP_PROCESS = "process";
	public static String PROP_ATTRIBUTE99 = "attribute99";
	public static String PROP_SOFTWARE_CONFIG = "softwareConfig";
	public static String PROP_PROJECT = "project";
	public static String PROP_PRODUCER = "producer";
	public static String PROP_HAPPEN_TIME = "happenTime";
	public static String PROP_FAR_ANALYST = "farAnalyst";
	public static String PROP_REPORTER = "reporter";
	public static String PROP_EFFECTION = "effection";
	public static String PROP_COMPONENT_MODEL = "componentModel";
	public static String PROP_FR_CREATE_DATE = "frCreateDate";
	public static String PROP_QA_LEADER_OPINION = "qaLeaderOpinion";
	public static String PROP_CARD_NUMBER = "cardNumber";
	public static String PROP_WIRE_NUMBER = "wireNumber";
	public static String PROP_DESCRIPTION = "description";
	public static String PROP_LEADER_OPINION = "leaderOpinion";
	public static String PROP_LAST_EDITER = "lastEditer";
	public static String PROP_LOCATION = "location";
	public static String PROP_TEST_EQUIPMENT_INFO = "testEquipmentInfo";
	public static String PROP_DELETE_MARK = "deleteMark";
	public static String PROP_SYSTEM_TYPE = "systemType";
	public static String PROP_QUALITY_ISSUE_CATEGORY = "qualityIssueCategory";
	public static String PROP_STATUS = "status";
	public static String PROP_SYSTEM_SN = "systemSn";
	public static String PROP_MRB_LEADER = "mrbLeader";
	public static String PROP_MRB_OPINION = "mrbOpinion";
	public static String PROP_FR_NUMBER = "frNumber";
	public static String PROP_WORKING_HOURS = "workingHours";
	public static String PROP_PROVIDER = "provider";
	public static String PROP_COMPONENT_NAME = "componentName";


	// constructors
	public BaseFailureReport () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseFailureReport (java.lang.String frNumber) {
		this.setFrNumber(frNumber);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String frNumber;

	// fields
	private java.lang.String environment;
	private java.lang.String caseCode;
	private java.lang.String testEquipmentNumber;
	private java.lang.String type;
	private java.lang.String frCreater;
	private java.lang.String qaLeader;
	private java.lang.String projectLeader;
	private java.lang.String code;
	private java.lang.String componentCode;
	private java.lang.String failureMode;
	private java.util.Date mrbDate;
	private java.lang.String componentSruLot;
	private java.lang.String process;
	private java.lang.String softwareConfig;
	private java.lang.String project;
	private java.lang.String producer;
	private java.util.Date happenTime;
	private java.lang.String reporter;
	private java.lang.String effection;
	private java.lang.String componentModel;
	private java.util.Date frCreateDate;
	private java.lang.String qaLeaderOpinion;
	private java.lang.String cardNumber;
	private java.lang.String wireNumber;
	private java.lang.String description;
	private java.lang.String leaderOpinion;
	private java.lang.String attribute99;
	private java.lang.String location;
	private boolean deleteMark;
	private java.lang.String testEquipmentInfo;
	private java.lang.String systemType;
	private java.lang.String status;
	private java.lang.String qualityIssueCategory;
	private java.lang.String systemSn;
	private java.lang.String mrbLeader;
	private java.lang.String mrbOpinion;
	private java.lang.Integer workingHours;
	private java.lang.String provider;
	private java.lang.String componentName;
	private java.lang.String tag;
	private java.lang.String lastEditer;
	private java.lang.String farAnalyst;

	// collections
	private java.util.Set<org.sjtu.p615.entity.FailureDescriptionAttachments> failureDescriptionAttachmentsSet;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="FrNumber"
     */
	public java.lang.String getFrNumber () {
		return frNumber;
	}

	/**
	 * Set the unique identifier of this class
	 * @param frNumber the new ID
	 */
	public void setFrNumber (java.lang.String frNumber) {
		this.frNumber = frNumber;
		this.hashCode = Integer.MIN_VALUE;
	}




	/**
	 * Return the value associated with the column: Environment
	 */
	public java.lang.String getEnvironment () {
		return environment;
	}

	/**
	 * Set the value related to the column: Environment
	 * @param environment the Environment value
	 */
	public void setEnvironment (java.lang.String environment) {
		this.environment = environment;
	}



	/**
	 * Return the value associated with the column: CaseCode
	 */
	public java.lang.String getCaseCode () {
		return caseCode;
	}

	/**
	 * Set the value related to the column: CaseCode
	 * @param caseCode the CaseCode value
	 */
	public void setCaseCode (java.lang.String caseCode) {
		this.caseCode = caseCode;
	}



	/**
	 * Return the value associated with the column: TestEquipmentNumber
	 */
	public java.lang.String getTestEquipmentNumber () {
		return testEquipmentNumber;
	}

	/**
	 * Set the value related to the column: TestEquipmentNumber
	 * @param testEquipmentNumber the TestEquipmentNumber value
	 */
	public void setTestEquipmentNumber (java.lang.String testEquipmentNumber) {
		this.testEquipmentNumber = testEquipmentNumber;
	}



	/**
	 * Return the value associated with the column: Type
	 */
	public java.lang.String getType () {
		return type;
	}

	/**
	 * Set the value related to the column: Type
	 * @param type the Type value
	 */
	public void setType (java.lang.String type) {
		this.type = type;
	}



	/**
	 * Return the value associated with the column: FrCreater
	 */
	public java.lang.String getFrCreater () {
		return frCreater;
	}

	/**
	 * Set the value related to the column: FrCreater
	 * @param frCreater the FrCreater value
	 */
	public void setFrCreater (java.lang.String frCreater) {
		this.frCreater = frCreater;
	}



	/**
	 * Return the value associated with the column: QaLeader
	 */
	public java.lang.String getQaLeader () {
		return qaLeader;
	}

	/**
	 * Set the value related to the column: QaLeader
	 * @param qaLeader the QaLeader value
	 */
	public void setQaLeader (java.lang.String qaLeader) {
		this.qaLeader = qaLeader;
	}



	/**
	 * Return the value associated with the column: ProjectLeader
	 */
	public java.lang.String getProjectLeader () {
		return projectLeader;
	}

	/**
	 * Set the value related to the column: ProjectLeader
	 * @param projectLeader the ProjectLeader value
	 */
	public void setProjectLeader (java.lang.String projectLeader) {
		this.projectLeader = projectLeader;
	}



	/**
	 * Return the value associated with the column: Code
	 */
	public java.lang.String getCode () {
		return code;
	}

	/**
	 * Set the value related to the column: Code
	 * @param code the Code value
	 */
	public void setCode (java.lang.String code) {
		this.code = code;
	}



	/**
	 * Return the value associated with the column: ComponentCode
	 */
	public java.lang.String getComponentCode () {
		return componentCode;
	}

	/**
	 * Set the value related to the column: ComponentCode
	 * @param componentCode the ComponentCode value
	 */
	public void setComponentCode (java.lang.String componentCode) {
		this.componentCode = componentCode;
	}



	/**
	 * Return the value associated with the column: FailureMode
	 */
	public java.lang.String getFailureMode () {
		return failureMode;
	}

	/**
	 * Set the value related to the column: FailureMode
	 * @param failureMode the FailureMode value
	 */
	public void setFailureMode (java.lang.String failureMode) {
		this.failureMode = failureMode;
	}



	/**
	 * Return the value associated with the column: MrbDate
	 */
	public java.util.Date getMrbDate () {
		return mrbDate;
	}

	/**
	 * Set the value related to the column: MrbDate
	 * @param mrbDate the MrbDate value
	 */
	public void setMrbDate (java.util.Date mrbDate) {
		this.mrbDate = mrbDate;
	}



	/**
	 * Return the value associated with the column: ComponentSruLot
	 */
	public java.lang.String getComponentSruLot () {
		return componentSruLot;
	}

	/**
	 * Set the value related to the column: ComponentSruLot
	 * @param componentSruLot the ComponentSruLot value
	 */
	public void setComponentSruLot (java.lang.String componentSruLot) {
		this.componentSruLot = componentSruLot;
	}



	/**
	 * Return the value associated with the column: Process
	 */
	public java.lang.String getProcess () {
		return process;
	}

	/**
	 * Set the value related to the column: Process
	 * @param process the Process value
	 */
	public void setProcess (java.lang.String process) {
		this.process = process;
	}



	/**
	 * Return the value associated with the column: SoftwareConfig
	 */
	public java.lang.String getSoftwareConfig () {
		return softwareConfig;
	}

	/**
	 * Set the value related to the column: SoftwareConfig
	 * @param softwareConfig the SoftwareConfig value
	 */
	public void setSoftwareConfig (java.lang.String softwareConfig) {
		this.softwareConfig = softwareConfig;
	}



	/**
	 * Return the value associated with the column: Project
	 */
	public java.lang.String getProject () {
		return project;
	}

	/**
	 * Set the value related to the column: Project
	 * @param project the Project value
	 */
	public void setProject (java.lang.String project) {
		this.project = project;
	}



	/**
	 * Return the value associated with the column: Producer
	 */
	public java.lang.String getProducer () {
		return producer;
	}

	/**
	 * Set the value related to the column: Producer
	 * @param producer the Producer value
	 */
	public void setProducer (java.lang.String producer) {
		this.producer = producer;
	}



	/**
	 * Return the value associated with the column: HappenTime
	 */
	public java.util.Date getHappenTime () {
		return happenTime;
	}

	/**
	 * Set the value related to the column: HappenTime
	 * @param happenTime the HappenTime value
	 */
	public void setHappenTime (java.util.Date happenTime) {
		this.happenTime = happenTime;
	}



	/**
	 * Return the value associated with the column: Reporter
	 */
	public java.lang.String getReporter () {
		return reporter;
	}

	/**
	 * Set the value related to the column: Reporter
	 * @param reporter the Reporter value
	 */
	public void setReporter (java.lang.String reporter) {
		this.reporter = reporter;
	}



	/**
	 * Return the value associated with the column: Effection
	 */
	public java.lang.String getEffection () {
		return effection;
	}

	/**
	 * Set the value related to the column: Effection
	 * @param effection the Effection value
	 */
	public void setEffection (java.lang.String effection) {
		this.effection = effection;
	}



	/**
	 * Return the value associated with the column: ComponentModel
	 */
	public java.lang.String getComponentModel () {
		return componentModel;
	}

	/**
	 * Set the value related to the column: ComponentModel
	 * @param componentModel the ComponentModel value
	 */
	public void setComponentModel (java.lang.String componentModel) {
		this.componentModel = componentModel;
	}



	/**
	 * Return the value associated with the column: FrCreateDate
	 */
	public java.util.Date getFrCreateDate () {
		return frCreateDate;
	}

	/**
	 * Set the value related to the column: FrCreateDate
	 * @param frCreateDate the FrCreateDate value
	 */
	public void setFrCreateDate (java.util.Date frCreateDate) {
		this.frCreateDate = frCreateDate;
	}



	/**
	 * Return the value associated with the column: QaLeaderOpinion
	 */
	public java.lang.String getQaLeaderOpinion () {
		return qaLeaderOpinion;
	}

	/**
	 * Set the value related to the column: QaLeaderOpinion
	 * @param qaLeaderOpinion the QaLeaderOpinion value
	 */
	public void setQaLeaderOpinion (java.lang.String qaLeaderOpinion) {
		this.qaLeaderOpinion = qaLeaderOpinion;
	}



	/**
	 * Return the value associated with the column: CardNumber
	 */
	public java.lang.String getCardNumber () {
		return cardNumber;
	}

	/**
	 * Set the value related to the column: CardNumber
	 * @param cardNumber the CardNumber value
	 */
	public void setCardNumber (java.lang.String cardNumber) {
		this.cardNumber = cardNumber;
	}



	/**
	 * Return the value associated with the column: WireNumber
	 */
	public java.lang.String getWireNumber () {
		return wireNumber;
	}

	/**
	 * Set the value related to the column: WireNumber
	 * @param wireNumber the WireNumber value
	 */
	public void setWireNumber (java.lang.String wireNumber) {
		this.wireNumber = wireNumber;
	}



	/**
	 * Return the value associated with the column: Description
	 */
	public java.lang.String getDescription () {
		return description;
	}

	/**
	 * Set the value related to the column: Description
	 * @param description the Description value
	 */
	public void setDescription (java.lang.String description) {
		this.description = description;
	}



	/**
	 * Return the value associated with the column: LeaderOpinion
	 */
	public java.lang.String getLeaderOpinion () {
		return leaderOpinion;
	}

	/**
	 * Set the value related to the column: LeaderOpinion
	 * @param leaderOpinion the LeaderOpinion value
	 */
	public void setLeaderOpinion (java.lang.String leaderOpinion) {
		this.leaderOpinion = leaderOpinion;
	}



	/**
	 * Return the value associated with the column: Attribute_99
	 */
	public java.lang.String getAttribute99 () {
		return attribute99;
	}

	/**
	 * Set the value related to the column: Attribute_99
	 * @param attribute99 the Attribute_99 value
	 */
	public void setAttribute99 (java.lang.String attribute99) {
		this.attribute99 = attribute99;
	}



	/**
	 * Return the value associated with the column: Location
	 */
	public java.lang.String getLocation () {
		return location;
	}

	/**
	 * Set the value related to the column: Location
	 * @param location the Location value
	 */
	public void setLocation (java.lang.String location) {
		this.location = location;
	}



	/**
	 * Return the value associated with the column: DeleteMark
	 */
	public boolean isDeleteMark () {
		return deleteMark;
	}

	/**
	 * Set the value related to the column: DeleteMark
	 * @param deleteMark the DeleteMark value
	 */
	public void setDeleteMark (boolean deleteMark) {
		this.deleteMark = deleteMark;
	}



	/**
	 * Return the value associated with the column: TestEquipmentInfo
	 */
	public java.lang.String getTestEquipmentInfo () {
		return testEquipmentInfo;
	}

	/**
	 * Set the value related to the column: TestEquipmentInfo
	 * @param testEquipmentInfo the TestEquipmentInfo value
	 */
	public void setTestEquipmentInfo (java.lang.String testEquipmentInfo) {
		this.testEquipmentInfo = testEquipmentInfo;
	}



	/**
	 * Return the value associated with the column: SystemType
	 */
	public java.lang.String getSystemType () {
		return systemType;
	}

	/**
	 * Set the value related to the column: SystemType
	 * @param systemType the SystemType value
	 */
	public void setSystemType (java.lang.String systemType) {
		this.systemType = systemType;
	}



	/**
	 * Return the value associated with the column: Status
	 */
	public java.lang.String getStatus () {
		return status;
	}

	/**
	 * Set the value related to the column: Status
	 * @param status the Status value
	 */
	public void setStatus (java.lang.String status) {
		this.status = status;
	}



	/**
	 * Return the value associated with the column: QualityIssueCategory
	 */
	public java.lang.String getQualityIssueCategory () {
		return qualityIssueCategory;
	}

	/**
	 * Set the value related to the column: QualityIssueCategory
	 * @param qualityIssueCategory the QualityIssueCategory value
	 */
	public void setQualityIssueCategory (java.lang.String qualityIssueCategory) {
		this.qualityIssueCategory = qualityIssueCategory;
	}



	/**
	 * Return the value associated with the column: SystemSn
	 */
	public java.lang.String getSystemSn () {
		return systemSn;
	}

	/**
	 * Set the value related to the column: SystemSn
	 * @param systemSn the SystemSn value
	 */
	public void setSystemSn (java.lang.String systemSn) {
		this.systemSn = systemSn;
	}



	/**
	 * Return the value associated with the column: MrbLeader
	 */
	public java.lang.String getMrbLeader () {
		return mrbLeader;
	}

	/**
	 * Set the value related to the column: MrbLeader
	 * @param mrbLeader the MrbLeader value
	 */
	public void setMrbLeader (java.lang.String mrbLeader) {
		this.mrbLeader = mrbLeader;
	}



	/**
	 * Return the value associated with the column: MrbOpinion
	 */
	public java.lang.String getMrbOpinion () {
		return mrbOpinion;
	}

	/**
	 * Set the value related to the column: MrbOpinion
	 * @param mrbOpinion the MrbOpinion value
	 */
	public void setMrbOpinion (java.lang.String mrbOpinion) {
		this.mrbOpinion = mrbOpinion;
	}



	/**
	 * Return the value associated with the column: WorkingHours
	 */
	public java.lang.Integer getWorkingHours () {
		return workingHours;
	}

	/**
	 * Set the value related to the column: WorkingHours
	 * @param workingHours the WorkingHours value
	 */
	public void setWorkingHours (java.lang.Integer workingHours) {
		this.workingHours = workingHours;
	}



	/**
	 * Return the value associated with the column: Provider
	 */
	public java.lang.String getProvider () {
		return provider;
	}

	/**
	 * Set the value related to the column: Provider
	 * @param provider the Provider value
	 */
	public void setProvider (java.lang.String provider) {
		this.provider = provider;
	}



	/**
	 * Return the value associated with the column: ComponentName
	 */
	public java.lang.String getComponentName () {
		return componentName;
	}

	/**
	 * Set the value related to the column: ComponentName
	 * @param componentName the ComponentName value
	 */
	public void setComponentName (java.lang.String componentName) {
		this.componentName = componentName;
	}



	/**
	 * Return the value associated with the column: Tag
	 */
	public java.lang.String getTag () {
		return tag;
	}

	/**
	 * Set the value related to the column: Tag
	 * @param tag the Tag value
	 */
	public void setTag (java.lang.String tag) {
		this.tag = tag;
	}



	/**
	 * Return the value associated with the column: LastEditer
	 */
	public java.lang.String getLastEditer () {
		return lastEditer;
	}

	/**
	 * Set the value related to the column: LastEditer
	 * @param lastEditer the LastEditer value
	 */
	public void setLastEditer (java.lang.String lastEditer) {
		this.lastEditer = lastEditer;
	}



	/**
	 * Return the value associated with the column: FarAnalyst
	 */
	public java.lang.String getFarAnalyst () {
		return farAnalyst;
	}

	/**
	 * Set the value related to the column: FarAnalyst
	 * @param farAnalyst the FarAnalyst value
	 */
	public void setFarAnalyst (java.lang.String farAnalyst) {
		this.farAnalyst = farAnalyst;
	}



	/**
	 * Return the value associated with the column: failureDescriptionAttachmentsSet
	 */
	public java.util.Set<org.sjtu.p615.entity.FailureDescriptionAttachments> getFailureDescriptionAttachmentsSet () {
		return failureDescriptionAttachmentsSet;
	}

	/**
	 * Set the value related to the column: failureDescriptionAttachmentsSet
	 * @param failureDescriptionAttachmentsSet the failureDescriptionAttachmentsSet value
	 */
	public void setFailureDescriptionAttachmentsSet (java.util.Set<org.sjtu.p615.entity.FailureDescriptionAttachments> failureDescriptionAttachmentsSet) {
		this.failureDescriptionAttachmentsSet = failureDescriptionAttachmentsSet;
	}

	public void addTofailureDescriptionAttachmentsSet (org.sjtu.p615.entity.FailureDescriptionAttachments failureDescriptionAttachments) {
		if (null == getFailureDescriptionAttachmentsSet()) setFailureDescriptionAttachmentsSet(new java.util.TreeSet<org.sjtu.p615.entity.FailureDescriptionAttachments>());
		getFailureDescriptionAttachmentsSet().add(failureDescriptionAttachments);
	}




	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof org.sjtu.p615.entity.FailureReport)) return false;
		else {
			org.sjtu.p615.entity.FailureReport failureReport = (org.sjtu.p615.entity.FailureReport) obj;
			if (null == this.getFrNumber() || null == failureReport.getFrNumber()) return false;
			else return (this.getFrNumber().equals(failureReport.getFrNumber()));
		}
	}

	public int hashCode () {
		if (Integer.MIN_VALUE == this.hashCode) {
			if (null == this.getFrNumber()) return super.hashCode();
			else {
				String hashStr = this.getClass().getName() + ":" + this.getFrNumber().hashCode();
				this.hashCode = hashStr.hashCode();
			}
		}
		return this.hashCode;
	}


	public String toString () {
		return super.toString();
	}


}