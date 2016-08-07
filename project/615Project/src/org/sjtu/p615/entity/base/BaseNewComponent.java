package org.sjtu.p615.entity.base;

import java.io.Serializable;


/**
 * This is an object that contains data related to the newcomponent table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="newcomponent"
 */

public abstract class BaseNewComponent  implements Serializable {

	public static String REF = "NewComponent";
	public static String PROP_NEW_COMPT_NAME = "newComptName";
	public static String PROP_NEW_COMPT_MODEL = "newComptModel";
	public static String PROP_ID = "id";
	public static String PROP_DELETE_MARK = "deleteMark";


	// constructors
	public BaseNewComponent () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseNewComponent (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private java.lang.String newComptModel;
	private java.lang.String newComptName;
	private boolean deleteMark;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="NewComptCode"
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
	 * Return the value associated with the column: NewComptModel
	 */
	public java.lang.String getNewComptModel () {
		return newComptModel;
	}

	/**
	 * Set the value related to the column: NewComptModel
	 * @param newComptModel the NewComptModel value
	 */
	public void setNewComptModel (java.lang.String newComptModel) {
		this.newComptModel = newComptModel;
	}



	/**
	 * Return the value associated with the column: NewComptName
	 */
	public java.lang.String getNewComptName () {
		return newComptName;
	}

	/**
	 * Set the value related to the column: NewComptName
	 * @param newComptName the NewComptName value
	 */
	public void setNewComptName (java.lang.String newComptName) {
		this.newComptName = newComptName;
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
		if (!(obj instanceof org.sjtu.p615.entity.NewComponent)) return false;
		else {
			org.sjtu.p615.entity.NewComponent newComponent = (org.sjtu.p615.entity.NewComponent) obj;
			if (null == this.getId() || null == newComponent.getId()) return false;
			else return (this.getId().equals(newComponent.getId()));
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