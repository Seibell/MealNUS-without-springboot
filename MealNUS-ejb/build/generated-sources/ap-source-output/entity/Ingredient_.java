package entity;

import entity.MealBox;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-19T16:18:27")
@StaticMetamodel(Ingredient.class)
public class Ingredient_ { 

    public static volatile SingularAttribute<Ingredient, Long> ingredientId;
    public static volatile SingularAttribute<Ingredient, String> name;
    public static volatile SingularAttribute<Ingredient, String> picture;
    public static volatile ListAttribute<Ingredient, MealBox> mealBoxes;

}