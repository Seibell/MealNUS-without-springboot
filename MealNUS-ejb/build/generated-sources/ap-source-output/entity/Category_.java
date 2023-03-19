package entity;

import entity.MealBox;
import entity.Promotion;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-19T12:06:06")
@StaticMetamodel(Category.class)
public class Category_ { 

    public static volatile SingularAttribute<Category, String> name;
    public static volatile SingularAttribute<Category, Long> categoryId;
    public static volatile SingularAttribute<Category, String> picture;
    public static volatile ListAttribute<Category, MealBox> mealBoxes;
    public static volatile SingularAttribute<Category, Promotion> promotion;

}