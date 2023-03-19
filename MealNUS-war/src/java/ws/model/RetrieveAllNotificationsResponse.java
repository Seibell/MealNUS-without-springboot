/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.Notification;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author 60540
 */
@XmlRootElement

public class RetrieveAllNotificationsResponse
{
    private List<Notification> notifications;

    
    
    public RetrieveAllNotificationsResponse()
    {
        notifications = new ArrayList<>();
    }

    
    
    public RetrieveAllNotificationsResponse(List<Notification> notifications)
    {
        this.notifications = notifications;
    }
    
    

    @XmlElements({
        @XmlElement(name="notification", type=Notification.class)
    })
    @XmlElementWrapper
    public List<Notification> getNotificationEntities() {
        return notifications;
    }

    public void setNotificationEntities(List<Notification> notifications) {
        this.notifications = notifications;
    }
}
