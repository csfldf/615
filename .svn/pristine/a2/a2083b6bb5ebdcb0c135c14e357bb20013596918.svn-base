package org.sjtu.p615.entity.base;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.sjtu.p615.entity.dao.iface.FailureReportDAO;
import org.hibernate.criterion.Order;

/**
 * This is an automatically generated DAO class which should not be edited.
 */
public abstract class BaseFailureReportDAO extends org.sjtu.p615.entity.dao._RootDAO {

	public BaseFailureReportDAO () {}
	
	public BaseFailureReportDAO (Session session) {
		super(session);
	}

	// query name references


	public static FailureReportDAO instance;

	/**
	 * Return a singleton of the DAO
	 */
	public static FailureReportDAO getInstance () {
		if (null == instance) instance = new org.sjtu.p615.entity.dao.FailureReportDAO();
		return instance;
	}

	public Class getReferenceClass () {
		return org.sjtu.p615.entity.FailureReport.class;
	}

    public Order getDefaultOrder () {
		return null;
    }

	/**
	 * Cast the object as a org.sjtu.p615.entity.FailureReport
	 */
	public org.sjtu.p615.entity.FailureReport cast (Object object) {
		return (org.sjtu.p615.entity.FailureReport) object;
	}

	public org.sjtu.p615.entity.FailureReport get(java.lang.String key)
	{
		return (org.sjtu.p615.entity.FailureReport) get(getReferenceClass(), key);
	}

	public org.sjtu.p615.entity.FailureReport get(java.lang.String key, Session s)
	{
		return (org.sjtu.p615.entity.FailureReport) get(getReferenceClass(), key, s);
	}

	public org.sjtu.p615.entity.FailureReport load(java.lang.String key)
	{
		return (org.sjtu.p615.entity.FailureReport) load(getReferenceClass(), key);
	}

	public org.sjtu.p615.entity.FailureReport load(java.lang.String key, Session s)
	{
		return (org.sjtu.p615.entity.FailureReport) load(getReferenceClass(), key, s);
	}

	public org.sjtu.p615.entity.FailureReport loadInitialize(java.lang.String key, Session s) 
	{ 
		org.sjtu.p615.entity.FailureReport obj = load(key, s); 
		if (!Hibernate.isInitialized(obj)) {
			Hibernate.initialize(obj);
		} 
		return obj; 
	}

/* Generic methods */

	/**
	 * Return all objects related to the implementation of this DAO with no filter.
	 */
	public java.util.List<org.sjtu.p615.entity.FailureReport> findAll () {
		return super.findAll();
	}

	/**
	 * Return all objects related to the implementation of this DAO with no filter.
	 */
	public java.util.List<org.sjtu.p615.entity.FailureReport> findAll (Order defaultOrder) {
		return super.findAll(defaultOrder);
	}

	/**
	 * Return all objects related to the implementation of this DAO with no filter.
	 * Use the session given.
	 * @param s the Session
	 */
	public java.util.List<org.sjtu.p615.entity.FailureReport> findAll (Session s, Order defaultOrder) {
		return super.findAll(s, defaultOrder);
	}

	/**
	 * Persist the given transient instance, first assigning a generated identifier. (Or using the current value
	 * of the identifier property if the assigned generator is used.) 
	 * @param failureReport a transient instance of a persistent class 
	 * @return the class identifier
	 */
	public java.lang.String save(org.sjtu.p615.entity.FailureReport failureReport)
	{
		return (java.lang.String) super.save(failureReport);
	}

	/**
	 * Persist the given transient instance, first assigning a generated identifier. (Or using the current value
	 * of the identifier property if the assigned generator is used.) 
	 * Use the Session given.
	 * @param failureReport a transient instance of a persistent class
	 * @param s the Session
	 * @return the class identifier
	 */
	public java.lang.String save(org.sjtu.p615.entity.FailureReport failureReport, Session s)
	{
		return (java.lang.String) save((Object) failureReport, s);
	}

	/**
	 * Either save() or update() the given instance, depending upon the value of its identifier property. By default
	 * the instance is always saved. This behaviour may be adjusted by specifying an unsaved-value attribute of the
	 * identifier property mapping. 
	 * @param failureReport a transient instance containing new or updated state 
	 */
	public void saveOrUpdate(org.sjtu.p615.entity.FailureReport failureReport)
	{
		saveOrUpdate((Object) failureReport);
	}

	/**
	 * Either save() or update() the given instance, depending upon the value of its identifier property. By default the
	 * instance is always saved. This behaviour may be adjusted by specifying an unsaved-value attribute of the identifier
	 * property mapping. 
	 * Use the Session given.
	 * @param failureReport a transient instance containing new or updated state.
	 * @param s the Session.
	 */
	public void saveOrUpdate(org.sjtu.p615.entity.FailureReport failureReport, Session s)
	{
		saveOrUpdate((Object) failureReport, s);
	}

	/**
	 * Update the persistent state associated with the given identifier. An exception is thrown if there is a persistent
	 * instance with the same identifier in the current session.
	 * @param failureReport a transient instance containing updated state
	 */
	public void update(org.sjtu.p615.entity.FailureReport failureReport) 
	{
		update((Object) failureReport);
	}

	/**
	 * Update the persistent state associated with the given identifier. An exception is thrown if there is a persistent
	 * instance with the same identifier in the current session.
	 * Use the Session given.
	 * @param failureReport a transient instance containing updated state
	 * @param the Session
	 */
	public void update(org.sjtu.p615.entity.FailureReport failureReport, Session s)
	{
		update((Object) failureReport, s);
	}

	/**
	 * Remove a persistent instance from the datastore. The argument may be an instance associated with the receiving
	 * Session or a transient instance with an identifier associated with existing persistent state. 
	 * @param id the instance ID to be removed
	 */
	public void delete(java.lang.String id)
	{
		delete((Object) load(id));
	}

	/**
	 * Remove a persistent instance from the datastore. The argument may be an instance associated with the receiving
	 * Session or a transient instance with an identifier associated with existing persistent state. 
	 * Use the Session given.
	 * @param id the instance ID to be removed
	 * @param s the Session
	 */
	public void delete(java.lang.String id, Session s)
	{
		delete((Object) load(id, s), s);
	}

	/**
	 * Remove a persistent instance from the datastore. The argument may be an instance associated with the receiving
	 * Session or a transient instance with an identifier associated with existing persistent state. 
	 * @param failureReport the instance to be removed
	 */
	public void delete(org.sjtu.p615.entity.FailureReport failureReport)
	{
		delete((Object) failureReport);
	}

	/**
	 * Remove a persistent instance from the datastore. The argument may be an instance associated with the receiving
	 * Session or a transient instance with an identifier associated with existing persistent state. 
	 * Use the Session given.
	 * @param failureReport the instance to be removed
	 * @param s the Session
	 */
	public void delete(org.sjtu.p615.entity.FailureReport failureReport, Session s)
	{
		delete((Object) failureReport, s);
	}
	
	/**
	 * Re-read the state of the given instance from the underlying database. It is inadvisable to use this to implement
	 * long-running sessions that span many business tasks. This method is, however, useful in certain special circumstances.
	 * For example 
	 * <ul> 
	 * <li>where a database trigger alters the object state upon insert or update</li>
	 * <li>after executing direct SQL (eg. a mass update) in the same session</li>
	 * <li>after inserting a Blob or Clob</li>
	 * </ul>
	 */
	public void refresh (org.sjtu.p615.entity.FailureReport failureReport, Session s)
	{
		refresh((Object) failureReport, s);
	}


}