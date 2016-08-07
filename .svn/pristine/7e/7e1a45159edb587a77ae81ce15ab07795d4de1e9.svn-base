package org.sjtu.p615.entity.base;

import java.io.Serializable;


/**
 * This is an object that contains data related to the failuredescriptionattachments table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="failuredescriptionattachments"
 */

public abstract class BaseFailureDescriptionAttachments  implements Serializable {

	public static String REF = "FailureDescriptionAttachments";
	public static String PROP_FR_NUMBER = "frNumber";
	public static String PROP_ID = "id";
	public static String PROP_DELETE_MARK = "deleteMark";


	// constructors
	public BaseFailureDescriptionAttachments () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseFailureDescriptionAttachments (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	/**
	 * Constructor for required fields
	 */
	public BaseFailureDescriptionAttachments (
		java.lang.String id,
		org.sjtu.p615.entity.FailureReport frNumber) {

		this.setId(id);
		this.setFrNumber(frNumber);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private boolean deleteMark;

	// many to one
	private org.sjtu.p615.entity.FailureReport frNumber;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="DescriptionAttachs"
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
	 * Return the value associated with the column: FrNumber
	 */
	public org.sjtu.p615.entity.FailureReport getFrNumber () {
		return frNumber;
	}

	/**
	 * Set the value related to the column: FrNumber
	 * @param frNumber the FrNumber value
	 */
	public void setFrNumber (org.sjtu.p615.entity.FailureReport frNumber) {
		this.frNumber = frNumber;
	}




	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof org.sjtu.p615.entity.FailureDescriptionAttachments)) return false;
		else {
			org.sjtu.p615.entity.FailureDescriptionAttachments failureDescriptionAttachments = (org.sjtu.p615.entity.FailureDescriptionAttachments) obj;
			if (null == this.getId() || null == failureDescriptionAttachments.getId()) return false;
			else return (this.getId().equals(failureDescriptionAttachments.getId()));
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