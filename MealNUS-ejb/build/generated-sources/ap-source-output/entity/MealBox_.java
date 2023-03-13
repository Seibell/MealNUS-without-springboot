package entity;

import entity.Allergen;
import entity.Category;
import entity.Ingredient;
import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-10T19:53:28")
@StaticMetamodel(MealBox.class)
public class MealBox_ { 

    public static volatile SingularAttribute<MealBox, String> itemName;
    public static volatile SingularAttribute<MealBox, Long> ItemCode;
    public static volatile SingularAttribute<MealBox, Integer> quantityAvailable;
    public static volatile ListAttribute<MealBox, Ingredient> ingredients;
    public static volatile SingularAttribute<MealBox, BigDecimal> itemPrice;
    public static volatile SingularAttribute<MealBox, Long> mealBoxId;
    public static volatile SingularAttribute<MealBox, String> itemDescription;
    public static volatile ListAttribute<MealBox, Category> categories;
    public static volatile SingularAttribute<MealBox, String> itemImage;
    public static volatile ListAttribute<MealBox, Allergen> allergens;

}