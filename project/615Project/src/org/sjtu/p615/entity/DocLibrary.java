package org.sjtu.p615.entity;

// default package
// Generated 2015-5-19 15:10:56 by Hibernate Tools 3.4.0.CR1

import java.util.Date;

/**
 * Doclibrary generated by hbm2java
 */
public class DocLibrary implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String uuid;
	private String title;
	private String type;
	private long size;
	private String ownerId;
	private String ownerName;
	private Date modifiedDate;
	private String attachmentName;
	private String projectId;
	private boolean deleteMark;
	
	private String downloadHref;
	private String deleteHref;

	public DocLibrary() {
	}

	public DocLibrary(String uuid, String title, String type, long size,
			Date modifiedDate, String attachmentName, boolean deleteMark) {
		this.uuid = uuid;
		this.title = title;
		this.type = type;
		this.size = size;
		this.modifiedDate = modifiedDate;
		this.attachmentName = attachmentName;
		this.deleteMark = deleteMark;
	}

	public DocLibrary(String uuid, String title, String type, long size,
			String ownerId, String ownerName, Date modifiedDate,
			String attachmentName, boolean deleteMark) {
		this.uuid = uuid;
		this.title = title;
		this.type = type;
		this.size = size;
		this.ownerId = ownerId;
		this.ownerName = ownerName;
		this.modifiedDate = modifiedDate;
		this.attachmentName = attachmentName;
		this.deleteMark = deleteMark;
	}

	public String getUuid() {
		return this.uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getSize() {
		return this.size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public String getOwnerId() {
		return this.ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	public String getOwnerName() {
		return this.ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public Date getModifiedDate() {
		return this.modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public String getAttachmentName() {
		return this.attachmentName;
	}

	public String getDownloadHref() {
		return downloadHref;
	}

	public void setDownloadHref(String downloadHref) {
		this.downloadHref = downloadHref;
	}

	public String getDeleteHref() {
		return deleteHref;
	}

	public void setDeleteHref(String deleteHref) {
		this.deleteHref = deleteHref;
	}

	public void setAttachmentName(String attachmentName) {
		this.attachmentName = attachmentName;
	}

	public boolean isDeleteMark() {
		return this.deleteMark;
	}

	public void setDeleteMark(boolean deleteMark) {
		this.deleteMark = deleteMark;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
}