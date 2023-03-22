/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Notification;
import java.util.Date;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author 60540
 */
@Local
public interface NotificationSessionBeanLocal {

    public void createNotification(Notification n);

    public List<Notification> retrieveAllNotifications();

    public Notification retrieveNotificationById(Long id);

    public void updateNotification(Notification notification);

    public void deleteNotification(Notification notification);

    public List<Notification> retrieveNotificationsByDate(Date date);
    
}
