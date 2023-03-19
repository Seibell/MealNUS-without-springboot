package entity;

import entity.MealBox;
import entity.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-19T14:04:40")
@StaticMetamodel(Review.class)
public class Review_ { 

    public static volatile SingularAttribute<Review, MealBox> mealBox;
    public static volatile SingularAttribute<Review, String> comments;
    public static volatile SingularAttribute<Review, Date> reviewDate;
    public static volatile SingularAttribute<Review, Integer> stars;
    public static volatile SingularAttribute<Review, Long> reviewId;
    public static volatile SingularAttribute<Review, User> user;

}