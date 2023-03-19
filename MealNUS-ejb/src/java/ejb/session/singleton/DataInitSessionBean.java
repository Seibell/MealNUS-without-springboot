/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.singleton;

import ejb.session.stateless.AllergenSessionBeanLocal;
import ejb.session.stateless.IngredientSessionBeanLocal;
import ejb.session.stateless.MealBoxSessionBeanLocal;
import ejb.session.stateless.PromotionSessionBeanLocal;
import ejb.session.stateless.UserSessionBeanLocal;
import entity.Allergen;
import entity.Ingredient;
import entity.MealBox;
import entity.Promotion;
import entity.User;
import entity.WishList;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import util.exception.PromotionNotFoundException;
import util.exception.UnknownPersistenceException;

/**
 *
 * @author ryanl
 */
@Singleton
@LocalBean
@Startup
public class DataInitSessionBean {

    @EJB
    private PromotionSessionBeanLocal promotionSessionBean;

    @EJB
    private IngredientSessionBeanLocal ingredientSessionBean;

    @EJB
    private AllergenSessionBeanLocal allergenSessionBean;

    @EJB
    private UserSessionBeanLocal userSessionBean;

    @EJB
    private MealBoxSessionBeanLocal mealBoxSessionBean;

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    public void persist(Object object) {
        em.persist(object);
    }

    @PostConstruct
    public void postConstruct() {
        if (userSessionBean.retrieveAllUsers().isEmpty()) {
            userSessionBean.createUser(new User("eric", "tang", "user@gmail.com", "password"));
            userSessionBean.createUser(new User("eric1", "tang1", "user1@gmail.com", "password"));
            userSessionBean.createUser(new User("eric2", "tang2", "user2@gmail.com", "password"));
            userSessionBean.createUser(new User("eric3", "tang3", "user3@gmail.com", "password"));
        }

        if (allergenSessionBean.retrieveAllAllergens().isEmpty()) {
            allergenSessionBean.createAllergen(new Allergen("Peanut", "deez nutz"));
        }

        if (mealBoxSessionBean.retrieveAllMealBoxes().isEmpty()) {
            mealBoxSessionBean.createMealBox(new MealBox("Vegetable's Party Box", 001L, new BigDecimal(7), new BigDecimal(12), "This is a vegetable mealBox", 15));
            mealBoxSessionBean.createMealBox(new MealBox("BBQ Bliss Box", 002L, new BigDecimal(9), new BigDecimal(15), "This is a BBQ meat mealBox", 15));
            mealBoxSessionBean.createMealBox(new MealBox("All-in-One Box", 003L, new BigDecimal(11), new BigDecimal(18), "This is a all in one meat & vegetable mealBox", 15));
        }

        if (ingredientSessionBean.retrieveAllIngredients().isEmpty()) {
            ingredientSessionBean.createIngredient(new Ingredient("Rice",
                    "https://media.istockphoto.com/id/1069180776/photo/uncooked-white-long-grain-rice-background.jpg?s=612x612&w=is&k=20&c=DGoWb_yAHltTChGq9fb4m2ynsXPdCaeoQ_qovRrWjjY="));
        }

        if (promotionSessionBean.retrieveAllPromotions().isEmpty()) {
            try {
                promotionSessionBean.createPromotion(new Promotion("Promotion 1", "https://cdn.hellofresh.com/us/lp/images/hellofresh-coupons-and-promos-30OFF.jpg", new Date(2023, 3, 13), new Date(2023, 3, 17), BigDecimal.valueOf(0.3)));
                //Promotion starts on the 13th of March and ends on the 17th. The reason why the month is 2 is because they start from a 0 index
            } catch (PromotionNotFoundException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            } catch (UnknownPersistenceException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    //try push
}
