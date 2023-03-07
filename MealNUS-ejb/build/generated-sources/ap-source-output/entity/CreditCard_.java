package entity;

import entity.User;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-07T14:25:50")
@StaticMetamodel(CreditCard.class)
public class CreditCard_ { 

    public static volatile SingularAttribute<CreditCard, String> expiryDate;
    public static volatile SingularAttribute<CreditCard, String> cardOwnerName;
    public static volatile SingularAttribute<CreditCard, String> cvv;
    public static volatile SingularAttribute<CreditCard, String> creditCardNumber;
    public static volatile SingularAttribute<CreditCard, Long> creditCardId;
    public static volatile SingularAttribute<CreditCard, User> user;

}