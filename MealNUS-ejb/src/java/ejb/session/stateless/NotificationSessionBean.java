/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Notification;
import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author 60540
 */
@Stateless
public class NotificationSessionBean implements NotificationSessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    public void persist(Object object) {
        em.persist(object);
    }

    @Override
    public void createNotification(Notification n) {
        em.persist(n);
    }

    @Override
    public List<Notification> retrieveAllNotifications() {
        Query query = em.createQuery("SELECT n FROM Notification n", Notification.class);
        return query.getResultList();
    }

    @Override
    public List<Notification> retrieveNotificationsByDate(Date date) {
        Query query = em.createQuery("SELECT n FROM Notification n WHERE n.notificationDate = :date", Notification.class);
        query.setParameter("date", date);
        List<Notification> notifications = query.getResultList();
        return notifications;
    }

    @Override
    public Notification retrieveNotificationById(Long id) {
        Notification notification = em.find(Notification.class, id);
        return notification;
    }

    @Override
    public void updateNotification(Notification notification) {
        em.merge(notification);
    }

    @Override
    public void deleteNotification(Notification notification) {
        em.remove(notification);
    }

}
