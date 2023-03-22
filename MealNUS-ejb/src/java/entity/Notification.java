/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author ryanl
 */
@Entity
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
    @Temporal(TemporalType.DATE)
    private Date notificationDate;
    private String notificationTitle;
    private String notificationDescription;

    public Notification() {
    }

    public Notification(Date notificationDate, String notificationTitle, String notificationDescription) {
        this.notificationDate = notificationDate;
        this.notificationTitle = notificationTitle;
        this.notificationDescription = notificationDescription;
    }

    
    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (notificationId != null ? notificationId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the notificationId fields are not set
        if (!(object instanceof Notification)) {
            return false;
        }
        Notification other = (Notification) object;
        if ((this.notificationId == null && other.notificationId != null) || (this.notificationId != null && !this.notificationId.equals(other.notificationId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Notification[ id=" + notificationId + " ]";
    }

    /**
     * @return the notificationDate
     */
    public Date getNotificationDate() {
        return notificationDate;
    }

    /**
     * @param notificationDate the notificationDate to set
     */
    public void setNotificationDate(Date notificationDate) {
        this.notificationDate = notificationDate;
    }

    /**
     * @return the notificationTitle
     */
    public String getNotificationTitle() {
        return notificationTitle;
    }

    /**
     * @param notificationTitle the notificationTitle to set
     */
    public void setNotificationTitle(String notificationTitle) {
        this.notificationTitle = notificationTitle;
    }

    /**
     * @return the notificationDescription
     */
    public String getNotificationDescription() {
        return notificationDescription;
    }

    /**
     * @param notificationDescription the notificationDescription to set
     */
    public void setNotificationDescription(String notificationDescription) {
        this.notificationDescription = notificationDescription;
    }
    
}
