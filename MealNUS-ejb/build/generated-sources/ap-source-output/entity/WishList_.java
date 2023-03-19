package entity;

import entity.MealBox;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-19T12:06:06")
@StaticMetamodel(WishList.class)
public class WishList_ { 

    public static volatile SingularAttribute<WishList, Long> wishListId;
    public static volatile ListAttribute<WishList, MealBox> wishListItems;

}