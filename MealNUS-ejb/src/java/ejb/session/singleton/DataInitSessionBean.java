/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.singleton;

import ejb.session.stateless.AllergenSessionBeanLocal;
import ejb.session.stateless.ForumSessionBeanLocal;
import ejb.session.stateless.IngredientSessionBeanLocal;
import ejb.session.stateless.MealBoxSessionBeanLocal;
import ejb.session.stateless.NotificationSessionBeanLocal;
import ejb.session.stateless.OrderSessionBeanLocal;
import ejb.session.stateless.PromotionSessionBeanLocal;
import ejb.session.stateless.ReviewSessionBeanLocal;
import ejb.session.stateless.StaffSessionBeanLocal;
import ejb.session.stateless.UserSessionBeanLocal;
import entity.Allergen;
import entity.ForumPost;
import entity.Ingredient;
import entity.MealBox;
import entity.Notification;
import entity.OrderEntity;
import entity.Promotion;
import entity.Review;
import entity.Staff;
import entity.User;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.util.Pair;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import util.enumeration.AddressEnum;
import util.enumeration.OrderStatus;
import util.exception.OrderNotFoundException;
import util.exception.PromotionNotFoundException;
import util.exception.UnknownPersistenceException;
import util.exception.UserNotFoundException;

/**
 *
 * @author ryanl
 */
@Singleton
@LocalBean
@Startup
public class DataInitSessionBean {

    @EJB
    private OrderSessionBeanLocal orderSessionBean;

    @EJB
    private NotificationSessionBeanLocal notificationSessionBean;

    @EJB
    private ReviewSessionBeanLocal reviewSessionBean;

    @EJB
    private ForumSessionBeanLocal forumSessionBean;

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
    
    @EJB
    private StaffSessionBeanLocal staffSessionBean;

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
        
        if (staffSessionBean.retrieveAllStaff().isEmpty()) {
            staffSessionBean.createStaff(new Staff("firstname", "lastname", "staff@gmail.com", "password"));
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
            } catch (PromotionNotFoundException | UnknownPersistenceException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        //TESTING PURPOSE
        if (forumSessionBean.retrieveAllForumPosts().isEmpty()) {
            Calendar calendar = Calendar.getInstance();
            forumSessionBean.createForumPost(new ForumPost(new Date(calendar.getTime().getTime()), "Test", "Welcome to MealNUS Forum!"));
        }

        //TESTING PURPOSE
        if (reviewSessionBean.retrieveAllReviews().isEmpty()) {
            Calendar calendar = Calendar.getInstance();
            try {
                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 5, "This is a default review", userSessionBean.retrieveUserByEmail("user@gmail.com")));
            } catch (UserNotFoundException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        //TESTING PURPOSE
        if (notificationSessionBean.retrieveAllNotifications().isEmpty()) {
            Calendar calendar = Calendar.getInstance();
            notificationSessionBean.createNotification(new Notification(new Date(calendar.getTime().getTime()), "Notification", "Hello, MealNUS Admin!"));
        }

        //TESTING PURPOSE
        if (orderSessionBean.retrieveAllOrders().isEmpty()) {
            try {
                Date orderDate = new Date();
                MealBox mealBox = new MealBox("Supreme Meat Box", 004L, new BigDecimal(15), new BigDecimal(20), "This is a high quality meat mealBox", 10);
                Integer qty = 4;
                List<Pair<MealBox,Integer>> orderDetails = new ArrayList<>();
                orderDetails.add(new Pair<>(mealBox,qty));
                List<BigDecimal> priceList = new ArrayList<>();
                priceList.add(mealBox.getItemPrice());
                List<BigDecimal> costList = new ArrayList<>();
                costList.add(mealBox.getItemCost());
                Date deliveryDate = new Date();
                AddressEnum address = AddressEnum.PRINCE_GEORGE_PARK_RESIDENCE;
                OrderStatus orderStatus = OrderStatus.PREPARING;
                User user = new User("eric4", "tang4", "user4@gmail.com", "password");
                orderSessionBean.createOrder(new OrderEntity(orderDate,orderDetails,priceList,costList,deliveryDate,address,orderStatus,user));
            } catch (OrderNotFoundException | UnknownPersistenceException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
