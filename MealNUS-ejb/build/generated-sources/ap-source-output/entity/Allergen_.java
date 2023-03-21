package entity;

import entity.MealBox;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-21T22:10:59")
@StaticMetamodel(Allergen.class)
public class Allergen_ { 

    public static volatile ListAttribute<Allergen, MealBox> mealBoxIncluded;
    public static volatile SingularAttribute<Allergen, Long> allergenId;
    public static volatile SingularAttribute<Allergen, String> allergenName;
    public static volatile SingularAttribute<Allergen, String> allergenDescription;

}