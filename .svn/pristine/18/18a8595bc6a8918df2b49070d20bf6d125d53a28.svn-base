package org.sjtu.p615.entity.base;

import java.io.Serializable;


/**
 * This is an object that contains data related to the fracasmetadata table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="fracasmetadata"
 */

public abstract class BaseFracasMetadata  implements Serializable {

	public static String REF = "FracasMetadata";
	public static String PROP_VALUE = "value";
	public static String PROP_METADATA_ID = "metadataId";
	public static String PROP_METADATA_NAME = "metadataName";
	public static String PROP_DELETE_MARK = "deleteMark";


	// constructors
	public BaseFracasMetadata () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseFracasMetadata (java.lang.Integer metadataId) {
		this.setMetadataId(metadataId);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.Integer metadataId;

	// fields
	private java.lang.String metadataName;
	private java.lang.String value;
	private boolean deleteMark;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="identity"
     *  column="metadataId"
     */
	public java.lang.Integer getMetadataId () {
		return metadataId;
	}

	/**
	 * Set the unique identifier of this class
	 * @param metadataId the new ID
	 */
	public void setMetadataId (java.lang.Integer metadataId) {
		this.metadataId = metadataId;
		this.hashCode = Integer.MIN_VALUE;
	}




	/**
	 * Return the value associated with the column: metadataName
	 */
	public java.lang.String getMetadataName () {
		return metadataName;
	}

	/**
	 * Set the value related to the column: metadataName
	 * @param metadataName the metadataName value
	 */
	public void setMetadataName (java.lang.String metadataName) {
		this.metadataName = metadataName;
	}



	/**
	 * Return the value associated with the column: value
	 */
	public java.lang.String getValue () {
		return value;
	}

	/**
	 * Set the value related to the column: value
	 * @param value the value value
	 */
	public void setValue (java.lang.String value) {
		this.value = value;
	}



	/**
	 * Return the value associated with the column: deleteMark
	 */
	public boolean isDeleteMark () {
		return deleteMark;
	}

	/**
	 * Set the value related to the column: deleteMark
	 * @param deleteMark the deleteMark value
	 */
	public void setDeleteMark (boolean deleteMark) {
		this.deleteMark = deleteMark;
	}




	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof org.sjtu.p615.entity.FracasMetadata)) return false;
		else {
			org.sjtu.p615.entity.FracasMetadata fracasMetadata = (org.sjtu.p615.entity.FracasMetadata) obj;
			if (null == this.getMetadataId() || null == fracasMetadata.getMetadataId()) return false;
			else return (this.getMetadataId().equals(fracasMetadata.getMetadataId()));
		}
	}

	public int hashCode () {
		if (Integer.MIN_VALUE == this.hashCode) {
			if (null == this.getMetadataId()) return super.hashCode();
			else {
				String hashStr = this.getClass().getName() + ":" + this.getMetadataId().hashCode();
				this.hashCode = hashStr.hashCode();
			}
		}
		return this.hashCode;
	}


	public String toString () {
		return super.toString();
	}


}