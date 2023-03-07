package entity;

import entity.User;
import java.util.Date;
import java.util.List;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import util.enumeration.AddressEnum;
import util.enumeration.OrderStatus;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-07T14:25:50")
@StaticMetamodel(Orders.class)
public class Orders_ { 

    public static volatile SingularAttribute<Orders, List> orderDetails;
    public static volatile SingularAttribute<Orders, AddressEnum> address;
    public static volatile SingularAttribute<Orders, Long> orderId;
    public static volatile SingularAttribute<Orders, OrderStatus> orderStatus;
    public static volatile SingularAttribute<Orders, Date> deliveryDate;
    public static volatile SingularAttribute<Orders, Date> orderDate;
    public static volatile SingularAttribute<Orders, User> user;

}