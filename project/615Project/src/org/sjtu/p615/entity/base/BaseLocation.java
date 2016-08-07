package org.sjtu.p615.entity.base;

import java.io.Serializable;


/**
 * This is an object that contains data related to the location table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="location"
 */

public abstract class BaseLocation  implements Serializable {

	public static String REF = "Location";
	public static String PROP_ID = "id";
	public static String PROP_DELETE_MARK = "deleteMark";


	// constructors
	public BaseLocation () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseLocation (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private boolean deleteMark;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="LocationName"
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




	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof org.sjtu.p615.entity.Location)) return false;
		else {
			org.sjtu.p615.entity.Location location = (org.sjtu.p615.entity.Location) obj;
			if (null == this.getId() || null == location.getId()) return false;
			else return (this.getId().equals(location.getId()));
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