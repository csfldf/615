package org.sjtu.p615.entity.base;

import java.io.Serializable;


/**
 * This is an object that contains data related to the failureanalysisreport table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="failureanalysisreport"
 */

public abstract class BaseFailureAnalysisReport  implements Serializable {

	public static String REF = "FailureAnalysisReport";
	public static String PROP_FAR_MRB_DATE = "farMrbDate";
	public static String PROP_FR_NUMBER_REFER = "frNumberRefer";
	public static String PROP_FR_COMPONENT_MODEL = "frComponentModel";
	public static String PROP_FAILURE_CAUSE = "failureCause";
	public static String PROP_FR_PROJECT_LEADER = "frProjectLeader";
	public static String PROP_DEPARTMENT_OPINION = "departmentOpinion";
	public static String PROP_FR_COMPONENT_CODE = "frComponentCode";
	public static String PROP_ATTRIBUTE78 = "attribute78";
	public static String PROP_TAG = "tag";
	public static String PROP_FAILURE_ANALYSIS = "failureAnalysis";
	public static String PROP_FAR_LEADER_OPINION = "farLeaderOpinion";
	public static String PROP_PROJECT = "project";
	public static String PROP_FR_COMPONENT_NAME = "frComponentName";
	public static String PROP_FAR_ANALYST = "farAnalyst";
	public static String PROP_FAR_CREATE_DATE = "farCreateDate";
	public static String PROP_USER_OPINION = "userOpinion";
	public static String PROP_RESPONSIBLE_DEPARTMENT_LEADER = "responsibleDepartmentLeader";
	public static String PROP_FAR_MRB_LEADER = "farMrbLeader";
	public static String PROP_LAST_EDITER = "lastEditer";
	public static String PROP_CORRECT_SUGGESTION = "correctSuggestion";
	public static String PROP_DELETE_MARK = "deleteMark";
	public static String PROP_STATUS = "status";
	public static String PROP_FAILURE_CATEGORY = "failureCategory";
	public static String PROP_FAILURE_HANDLER = "failureHandler";
	public static String PROP_MRB_SUGGESTIONS = "mrbSuggestions";
	public static String PROP_ID = "id";


	// constructors
	public BaseFailureAnalysisReport () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseFailureAnalysisReport (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private java.lang.String frNumberRefer;
	private java.lang.String frComponentModel;
	private java.lang.String frComponentCode;
	private java.lang.String frComponentName;
	private java.lang.String failureCause;
	private java.lang.String failureAnalysis;
	private java.lang.String correctSuggestion;
	private java.lang.String failureCategory;
	private java.lang.String responsibleDepartmentLeader;
	private java.lang.String departmentOpinion;
	private java.lang.String failureHandler;
	private java.lang.String frProjectLeader;
	private java.lang.String farLeaderOpinion;
	private java.lang.String farMrbLeader;
	private java.lang.String mrbSuggestions;
	private java.util.Date farMrbDate;
	private java.lang.String userOpinion;
	private boolean deleteMark;
	private java.lang.String status;
	private java.lang.String attribute78;
	private java.lang.String tag;
	private java.lang.String lastEditer;
	private java.lang.String farAnalyst;
	private java.lang.String project;
	private java.util.Date farCreateDate;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="FarNumber"
     */
	public java.lang.String getId () {
		return id;
	}

	/**
	 * Set the unique identifier of this class
	 * @param id the new ID
	 */
	public void setId (java.lang.String id) {
		this.id = id;
		this.hashCode = Integer.MIN_VALUE;
	}




	/**
	 * Return the value associated with the column: FrNumberRefer
	 */
	public java.lang.String getFrNumberRefer () {
		return frNumberRefer;
	}

	/**
	 * Set the value related to the column: FrNumberRefer
	 * @param frNumberRefer the FrNumberRefer value
	 */
	public void setFrNumberRefer (java.lang.String frNumberRefer) {
		this.frNumberRefer = frNumberRefer;
	}



	/**
	 * Return the value associated with the column: FrComponentModel
	 */
	public java.lang.String getFrComponentModel () {
		return frComponentModel;
	}

	/**
	 * Set the value related to the column: FrComponentModel
	 * @param frComponentModel the FrComponentModel value
	 */
	public void setFrComponentModel (java.lang.String frComponentModel) {
		this.frComponentModel = frComponentModel;
	}



	/**
	 * Return the value associated with the column: FrComponentCode
	 */
	public java.lang.String getFrComponentCode () {
		return frComponentCode;
	}

	/**
	 * Set the value related to the column: FrComponentCode
	 * @param frComponentCode the FrComponentCode value
	 */
	public void setFrComponentCode (java.lang.String frComponentCode) {
		this.frComponentCode = frComponentCode;
	}



	/**
	 * Return the value associated with the column: FrComponentName
	 */
	public java.lang.String getFrComponentName () {
		return frComponentName;
	}

	/**
	 * Set the value related to the column: FrComponentName
	 * @param frComponentName the FrComponentName value
	 */
	public void setFrComponentName (java.lang.String frComponentName) {
		this.frComponentName = frComponentName;
	}



	/**
	 * Return the value associated with the column: FailureCause
	 */
	public java.lang.String getFailureCause () {
		return failureCause;
	}

	/**
	 * Set the value related to the column: FailureCause
	 * @param failureCause the FailureCause value
	 */
	public void setFailureCause (java.lang.String failureCause) {
		this.failureCause = failureCause;
	}



	/**
	 * Return the value associated with the column: FailureAnalysis
	 */
	public java.lang.String getFailureAnalysis () {
		return failureAnalysis;
	}

	/**
	 * Set the value related to the column: FailureAnalysis
	 * @param failureAnalysis the FailureAnalysis value
	 */
	public void setFailureAnalysis (java.lang.String failureAnalysis) {
		this.failureAnalysis = failureAnalysis;
	}



	/**
	 * Return the value associated with the column: CorrectSuggestion
	 */
	public java.lang.String getCorrectSuggestion () {
		return correctSuggestion;
	}

	/**
	 * Set the value related to the column: CorrectSuggestion
	 * @param correctSuggestion the CorrectSuggestion value
	 */
	public void setCorrectSuggestion (java.lang.String correctSuggestion) {
		this.correctSuggestion = correctSuggestion;
	}



	/**
	 * Return the value associated with the column: FailureCategory
	 */
	public java.lang.String getFailureCategory () {
		return failureCategory;
	}

	/**
	 * Set the value related to the column: FailureCategory
	 * @param failureCategory the FailureCategory value
	 */
	public void setFailureCategory (java.lang.String failureCategory) {
		this.failureCategory = failureCategory;
	}



	/**
	 * Return the value associated with the column: ResponsibleDepartmentLeader
	 */
	public java.lang.String getResponsibleDepartmentLeader () {
		return responsibleDepartmentLeader;
	}

	/**
	 * Set the value related to the column: ResponsibleDepartmentLeader
	 * @param responsibleDepartmentLeader the ResponsibleDepartmentLeader value
	 */
	public void setResponsibleDepartmentLeader (java.lang.String responsibleDepartmentLeader) {
		this.responsibleDepartmentLeader = responsibleDepartmentLeader;
	}



	/**
	 * Return the value associated with the column: DepartmentOpinion
	 */
	public java.lang.String getDepartmentOpinion () {
		return departmentOpinion;
	}

	/**
	 * Set the value related to the column: DepartmentOpinion
	 * @param departmentOpinion the DepartmentOpinion value
	 */
	public void setDepartmentOpinion (java.lang.String departmentOpinion) {
		this.departmentOpinion = departmentOpinion;
	}



	/**
	 * Return the value associated with the column: FailureHandler
	 */
	public java.lang.String getFailureHandler () {
		return failureHandler;
	}

	/**
	 * Set the value related to the column: FailureHandler
	 * @param failureHandler the FailureHandler value
	 */
	public void setFailureHandler (java.lang.String failureHandler) {
		this.failureHandler = failureHandler;
	}



	/**
	 * Return the value associated with the column: FrProjectLeader
	 */
	public java.lang.String getFrProjectLeader () {
		return frProjectLeader;
	}

	/**
	 * Set the value related to the column: FrProjectLeader
	 * @param frProjectLeader the FrProjectLeader value
	 */
	public void setFrProjectLeader (java.lang.String frProjectLeader) {
		this.frProjectLeader = frProjectLeader;
	}



	/**
	 * Return the value associated with the column: FarLeaderOpinion
	 */
	public java.lang.String getFarLeaderOpinion () {
		return farLeaderOpinion;
	}

	/**
	 * Set the value related to the column: FarLeaderOpinion
	 * @param farLeaderOpinion the FarLeaderOpinion value
	 */
	public void setFarLeaderOpinion (java.lang.String farLeaderOpinion) {
		this.farLeaderOpinion = farLeaderOpinion;
	}



	/**
	 * Return the value associated with the column: FarMrbLeader
	 */
	public java.lang.String getFarMrbLeader () {
		return farMrbLeader;
	}

	/**
	 * Set the value related to the column: FarMrbLeader
	 * @param farMrbLeader the FarMrbLeader value
	 */
	public void setFarMrbLeader (java.lang.String farMrbLeader) {
		this.farMrbLeader = farMrbLeader;
	}



	/**
	 * Return the value associated with the column: MrbSuggestions
	 */
	public java.lang.String getMrbSuggestions () {
		return mrbSuggestions;
	}

	/**
	 * Set the value related to the column: MrbSuggestions
	 * @param mrbSuggestions the MrbSuggestions value
	 */
	public void setMrbSuggestions (java.lang.String mrbSuggestions) {
		this.mrbSuggestions = mrbSuggestions;
	}



	/**
	 * Return the value associated with the column: FarMrbDate
	 */
	public java.util.Date getFarMrbDate () {
		return farMrbDate;
	}

	/**
	 * Set the value related to the column: FarMrbDate
	 * @param farMrbDate the FarMrbDate value
	 */
	public void setFarMrbDate (java.util.Date farMrbDate) {
		this.farMrbDate = farMrbDate;
	}



	/**
	 * Return the value associated with the column: UserOpinion
	 */
	public java.lang.String getUserOpinion () {
		return userOpinion;
	}

	/**
	 * Set the value related to the column: UserOpinion
	 * @param userOpinion the UserOpinion value
	 */
	public void setUserOpinion (java.lang.String userOpinion) {
		this.userOpinion = userOpinion;
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
	 * Return the value associated with the column: Attribute_78
	 */
	public java.lang.String getAttribute78 () {
		return attribute78;
	}

	/**
	 * Set the value related to the column: Attribute_78
	 * @param attribute78 the Attribute_78 value
	 */
	public void setAttribute78 (java.lang.String attribute78) {
		this.attribute78 = attribute78;
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
	 * Return the value associated with the column: FarCreateDate
	 */
	public java.util.Date getFarCreateDate () {
		return farCreateDate;
	}

	/**
	 * Set the value related to the column: FarCreateDate
	 * @param farCreateDate the FarCreateDate value
	 */
	public void setFarCreateDate (java.util.Date farCreateDate) {
		this.farCreateDate = farCreateDate;
	}




	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof org.sjtu.p615.entity.FailureAnalysisReport)) return false;
		else {
			org.sjtu.p615.entity.FailureAnalysisReport failureAnalysisReport = (org.sjtu.p615.entity.FailureAnalysisReport) obj;
			if (null == this.getId() || null == failureAnalysisReport.getId()) return false;
			else return (this.getId().equals(failureAnalysisReport.getId()));
		}
	}

	public int hashCode () {
		if (Integer.MIN_VALUE == this.hashCode) {
			if (null == this.getId()) return super.hashCode();
			else {
				String hashStr = this.getClass().getName() + ":" + this.getId().hashCode();
				this.hashCode = hashStr.hashCode();
			}
		}
		return this.hashCode;
	}


	public String toString () {
		return super.toString();
	}


}