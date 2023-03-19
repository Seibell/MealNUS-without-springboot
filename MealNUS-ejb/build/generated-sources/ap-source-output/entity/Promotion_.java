package entity;

import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-19T14:04:40")
@StaticMetamodel(Promotion.class)
public class Promotion_ { 

    public static volatile SingularAttribute<Promotion, String> promotionName;
    public static volatile SingularAttribute<Promotion, Date> endDate;
    public static volatile SingularAttribute<Promotion, String> promotionCode;
    public static volatile SingularAttribute<Promotion, BigDecimal> discount;
    public static volatile SingularAttribute<Promotion, Long> promotionId;
    public static volatile SingularAttribute<Promotion, String> picture;
    public static volatile SingularAttribute<Promotion, Date> startDate;

}