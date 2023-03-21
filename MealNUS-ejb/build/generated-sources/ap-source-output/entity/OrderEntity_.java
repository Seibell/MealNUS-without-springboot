package entity;

import entity.User;
import java.util.Date;
import java.util.List;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import util.enumeration.AddressEnum;
import util.enumeration.OrderStatus;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-21T22:10:59")
@StaticMetamodel(OrderEntity.class)
public class OrderEntity_ { 

    public static volatile SingularAttribute<OrderEntity, List> orderDetails;
    public static volatile SingularAttribute<OrderEntity, AddressEnum> address;
    public static volatile SingularAttribute<OrderEntity, Long> orderId;
    public static volatile SingularAttribute<OrderEntity, List> costList;
    public static volatile SingularAttribute<OrderEntity, OrderStatus> orderStatus;
    public static volatile SingularAttribute<OrderEntity, Date> deliveryDate;
    public static volatile SingularAttribute<OrderEntity, Date> orderDate;
    public static volatile SingularAttribute<OrderEntity, User> user;
    public static volatile SingularAttribute<OrderEntity, List> priceList;

}