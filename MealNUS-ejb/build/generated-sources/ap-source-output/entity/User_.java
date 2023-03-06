package entity;

import entity.CreditCard;
import entity.Orders;
import entity.Review;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-06T18:37:00")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile SingularAttribute<User, String> firstName;
    public static volatile SingularAttribute<User, String> lastName;
    public static volatile SingularAttribute<User, String> password;
    public static volatile ListAttribute<User, CreditCard> creditCards;
    public static volatile ListAttribute<User, Review> reviews;
    public static volatile ListAttribute<User, Orders> orders;
    public static volatile SingularAttribute<User, Long> userId;
    public static volatile SingularAttribute<User, String> email;

}