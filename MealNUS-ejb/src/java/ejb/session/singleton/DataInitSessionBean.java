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
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import util.exception.UserAlreadyExistsException;
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
            try {
                userSessionBean.createUser(new User("eric", "tang", "user@gmail.com", "password"));
                userSessionBean.createUser(new User("eric1", "tang1", "user1@gmail.com", "password"));
                userSessionBean.createUser(new User("eric2", "tang2", "user2@gmail.com", "password"));
                userSessionBean.createUser(new User("eric3", "tang3", "user3@gmail.com", "password"));
            } catch (UserAlreadyExistsException ex) {
                ex.printStackTrace();
            }
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
                Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse("2023-03-11");
                Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse("2023-04-05");

                promotionSessionBean.createPromotion(new Promotion("Promotion 1", "https://cdn.hellofresh.com/us/lp/images/hellofresh-coupons-and-promos-30OFF.jpg", startDate, endDate, BigDecimal.valueOf(0.3)));
                
                Promotion promoApplied = new Promotion("Promotion Applied", "https://cdn.hellofresh.com/us/lp/images/hellofresh-coupons-and-promos-30OFF.jpg", startDate, endDate, BigDecimal.valueOf(0.5));
                promoApplied.setIsApplied(true);
                
                promotionSessionBean.createPromotion(promoApplied);
            } catch (PromotionNotFoundException | UnknownPersistenceException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            } catch (ParseException ex) {
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
                List<Pair<MealBox, Integer>> orderDetails = new ArrayList<>();
                orderDetails.add(new Pair<>(mealBox, qty));
                List<BigDecimal> priceList = new ArrayList<>();
                priceList.add(mealBox.getItemPrice());
                List<BigDecimal> costList = new ArrayList<>();
                costList.add(mealBox.getItemCost());
                Date deliveryDate = new Date();
                AddressEnum address = AddressEnum.PRINCE_GEORGE_PARK_RESIDENCE;
                OrderStatus orderStatus = OrderStatus.PREPARING;
                User user = new User("eric4", "tang4", "user4@gmail.com", "password");
                orderSessionBean.createOrder(new OrderEntity(orderDate, orderDetails, priceList, costList, deliveryDate, address, orderStatus, user));

                Date orderDate2 = new Date();
                MealBox mealBox2 = new MealBox("Aww in One Box", 005L, new BigDecimal(13), new BigDecimal(14.98), "Box catered to your daily nutrition needs!", 60);
                Integer qty2 = 23;
                List<Pair<MealBox, Integer>> orderDetails2 = new ArrayList<>();
                orderDetails2.add(new Pair<>(mealBox2, qty2));
                List<BigDecimal> priceList2 = new ArrayList<>();
                priceList2.add(mealBox2.getItemPrice());
                List<BigDecimal> costList2 = new ArrayList<>();
                costList2.add(mealBox2.getItemCost());
                Date deliveryDate2 = new Date();
                Calendar calEnd2 = Calendar.getInstance();
                calEnd2.setTime(deliveryDate2);
                calEnd2.add(Calendar.DAY_OF_MONTH, 3);
                deliveryDate2 = calEnd2.getTime();
                AddressEnum address2 = AddressEnum.UTOWN_RESIDENCES;
                OrderStatus orderStatus2 = OrderStatus.PAID;
                User user2 = new User("eric5", "tang5", "user5@gmail.com", "password");
                OrderEntity newOrder2 = orderSessionBean.createOrder(new OrderEntity(orderDate2, orderDetails2, priceList2, costList2, deliveryDate2, address2, orderStatus2, user2));
                
                Date orderDate3 = new Date();
                Integer qty3 = 25;
                List<Pair<MealBox, Integer>> orderDetails3 = new ArrayList<>();
                orderDetails3.add(new Pair<>(mealBox2, qty3));
                List<BigDecimal> priceList3 = new ArrayList<>();
                priceList3.add(mealBox2.getItemPrice());
                List<BigDecimal> costList3 = new ArrayList<>();
                costList3.add(mealBox2.getItemCost());
                Date deliveryDate3 = new Date();
                Calendar calEnd3 = Calendar.getInstance();
                calEnd3.setTime(deliveryDate2);
                calEnd3.add(Calendar.DAY_OF_MONTH, 1);
                deliveryDate3 = calEnd3.getTime();
                AddressEnum address3 = AddressEnum.TEMBUSU_COLLEGE;
                OrderStatus orderStatus3 = OrderStatus.CREATED;
                OrderEntity newOrder3 = orderSessionBean.createOrder(new OrderEntity(orderDate3, orderDetails3, priceList3, costList3, deliveryDate3, address3, orderStatus3, user2));
            } catch (OrderNotFoundException | UnknownPersistenceException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
