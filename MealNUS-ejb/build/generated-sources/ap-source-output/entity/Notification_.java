package entity;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-16T12:03:34")
@StaticMetamodel(Notification.class)
public class Notification_ { 

    public static volatile SingularAttribute<Notification, String> notificationTitle;
    public static volatile SingularAttribute<Notification, String> notificationDescription;
    public static volatile SingularAttribute<Notification, Long> notificationId;
    public static volatile SingularAttribute<Notification, Date> notificationDate;

}