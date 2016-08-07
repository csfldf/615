package org.sjtu.p615.entity.base;

import java.io.Serializable;


/**
 * This is an object that contains data related to the failurecomponent table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="failurecomponent"
 */

public abstract class BaseFailureComponent  implements Serializable {

	public static String REF = "FailureComponent";
	public static String PROP_FAILURE_COMPONENT_CODE = "failureComponentCode";
	public static String PROP_FAILURE_COMPONENT_NAME = "failureComponentName";
	public static String PROP_ID = "id";
	public static String PROP_FAILURE_COMPONENT_SRU_LOT = "failureComponentSruLot";
	public static String PROP_DELETE_MARK = "deleteMark";


	// constructors
	public BaseFailureComponent () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseFailureComponent (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private java.lang.String failureComponentName;
	private java.lang.String failureComponentCode;
	private java.lang.String failureComponentSruLot;
	private boolean deleteMark;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="FailureComponentModel"
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
	 * Return the value associated with the column: FailureComponentName
	 */
	public java.lang.String getFailureComponentName () {
		return failureComponentName;
	}

	/**
	 * Set the value related to the column: FailureComponentName
	 * @param failureComponentName the FailureComponentName value
	 */
	public void setFailureComponentName (java.lang.String failureComponentName) {
		this.failureComponentName = failureComponentName;
	}



	/**
	 * Return the value associated with the column: FailureComponentCode
	 */
	public java.lang.String getFailureComponentCode () {
		return failureComponentCode;
	}

	/**
	 * Set the value related to the column: FailureComponentCode
	 * @param failureComponentCode the FailureComponentCode value
	 */
	public void setFailureComponentCode (java.lang.String failureComponentCode) {
		this.failureComponentCode = failureComponentCode;
	}



	/**
	 * Return the value associated with the column: FailureComponentSruLot
	 */
	public java.lang.String getFailureComponentSruLot () {
		return failureComponentSruLot;
	}

	/**
	 * Set the value related to the column: FailureComponentSruLot
	 * @param failureComponentSruLot the FailureComponentSruLot value
	 */
	public void setFailureComponentSruLot (java.lang.String failureComponentSruLot) {
		this.failureComponentSruLot = failureComponentSruLot;
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




	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof org.sjtu.p615.entity.FailureComponent)) return false;
		else {
			org.sjtu.p615.entity.FailureComponent failureComponent = (org.sjtu.p615.entity.FailureComponent) obj;
			if (null == this.getId() || null == failureComponent.getId()) return false;
			else return (this.getId().equals(failureComponent.getId()));
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