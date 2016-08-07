package org.sjtu.p615.entity.base;

import java.io.Serializable;


/**
 * This is an object that contains data related to the system table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="system"
 */

public abstract class BaseSystem  implements Serializable {

	public static String REF = "System";
	public static String PROP_ID = "id";
	public static String PROP_DELETE_MARK = "deleteMark";
	public static String PROP_SYSTEM_MODEL = "systemModel";


	// constructors
	public BaseSystem () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseSystem (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private java.lang.String systemModel;
	private boolean deleteMark;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="SystemSnCode"
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
	 * Return the value associated with the column: SystemModel
	 */
	public java.lang.String getSystemModel () {
		return systemModel;
	}

	/**
	 * Set the value related to the column: SystemModel
	 * @param systemModel the SystemModel value
	 */
	public void setSystemModel (java.lang.String systemModel) {
		this.systemModel = systemModel;
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
		if (!(obj instanceof org.sjtu.p615.entity.System)) return false;
		else {
			org.sjtu.p615.entity.System system = (org.sjtu.p615.entity.System) obj;
			if (null == this.getId() || null == system.getId()) return false;
			else return (this.getId().equals(system.getId()));
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