/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.singleton;

import ejb.session.stateless.AllergenSessionBeanLocal;
import ejb.session.stateless.CategorySessionBeanLocal;
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
import entity.Category;
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
    private CategorySessionBeanLocal categorySessionBean;

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

        if (ingredientSessionBean.retrieveAllIngredients().isEmpty()) {
            ingredientSessionBean.createIngredient(new Ingredient("Rice",
                    "https://media.istockphoto.com/id/1069180776/photo/uncooked-white-long-grain-rice-background.jpg?s=612x612&w=is&k=20&c=DGoWb_yAHltTChGq9fb4m2ynsXPdCaeoQ_qovRrWjjY="));

            ingredientSessionBean.createIngredient(new Ingredient("Chicken",
                    "https://media.self.com/photos/62cd9c3069671d734f919d0f/16:9/w_4010,h_2256,c_limit/should-you-wash-chicken.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Salmon",
                    "https://www.skinnytaste.com/wp-content/uploads/2018/12/Baked-Salmon-1.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Broccoli",
                    "https://cdn.britannica.com/25/78225-050-1781F6B7/broccoli-florets.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Pasta",
                    "https://www.jessicagavin.com/wp-content/uploads/2020/07/how-to-cook-pasta-3-1200-500x500.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Tomatoes",
                    "https://post.healthline.com/wp-content/uploads/2020/09/AN313-Tomatoes-732x549-Thumb-732x549.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Bell Peppers",
                    "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2019/08/Bell-Peppers.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Soba",
                    "https://sudachirecipes.com/wp-content/uploads/2022/05/zaru-soba-sq.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Beef",
                    "https://cdn.shopify.com/s/files/1/2546/7220/products/iStock-1162717440.jpg?v=1595447055"));

            ingredientSessionBean.createIngredient(new Ingredient("Carrot",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqq6D6eWI4NlXMGYUSrqPuasV5LzvlyO3zqw&usqp=CAU"));

            ingredientSessionBean.createIngredient(new Ingredient("Lettuce",
                    "https://www.bhg.com/thmb/oL0DwR0DXrhFynA2y-oiY-nkCbg=/1878x0/filters:no_upscale():strip_icc()/tango-oakleaf-lettuce-c6f6417e-4cffa63034624d96a9e9ec9a3fe158f9.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Tomato Sauce", ""));

            ingredientSessionBean.createIngredient(new Ingredient("Barbecue Sauce", ""));

            ingredientSessionBean.createIngredient(new Ingredient("Soy Sauce", ""));

            ingredientSessionBean.createIngredient(new Ingredient("Teriyaki Sauce", ""));

            ingredientSessionBean.createIngredient(new Ingredient("Pesto Sauce", ""));

            ingredientSessionBean.createIngredient(new Ingredient("Alfredo Sauce", ""));

            ingredientSessionBean.createIngredient(new Ingredient("Sweet and Sour Sauce", ""));
        }

        //TESTING PURPOSE
        if (reviewSessionBean.retrieveAllReviews().isEmpty()) {
            Calendar calendar = Calendar.getInstance();
            try {
                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 5, "This is a default review", userSessionBean.retrieveUserByEmail("user@gmail.com")));
                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 5, "Just tried the Healthy Vegan Box - a delightful DIY meal!", userSessionBean.retrieveUserByEmail("user@gmail.com")));
                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 5, "I recently tried the BBQ Bliss Box, and it was a fantastic experience! The chicken was tender, and the barbecue sauce provided a delicious, smoky flavor.", userSessionBean.retrieveUserByEmail("user@gmail.com")));
                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 5, "I absolutely loved the All-in-One Box! The variety of ingredients allowed me to create a unique, mouthwatering meal.", userSessionBean.retrieveUserByEmail("user@gmail.com")));
            } catch (UserNotFoundException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }

//            try {
//                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 5, "Just tried the Healthy Vegan Box - a delightful DIY meal!", userSessionBean.retrieveUserByEmail("user@gmail.com")));
//            } catch (UserNotFoundException ex) {
//                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
//            }
//
//            try {
//                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 5, "I recently tried the BBQ Bliss Box, and it was a fantastic experience! The chicken was tender, and the barbecue sauce provided a delicious, smoky flavor.", userSessionBean.retrieveUserByEmail("user@gmail.com")));
//            } catch (UserNotFoundException ex) {
//                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
//            }
//
//            try {
//                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 5, "I absolutely loved the All-in-One Box! The variety of ingredients allowed me to create a unique, mouthwatering meal.", userSessionBean.retrieveUserByEmail("user@gmail.com")));
//            } catch (UserNotFoundException ex) {
//                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
//            }
        }

        if (categorySessionBean.retrieveAllCategories().isEmpty()) {
            categorySessionBean.createCategory(new Category("Low-Calorie", "https://www.shutterstock.com/image-vector/lowcalorie-rubber-vector-stamp-on-260nw-666178171.jpg"));
            categorySessionBean.createCategory(new Category("Vegan", "https://upload.wikimedia.org/wikipedia/commons/5/5b/Vegan_friendly_icon.svg"));
            categorySessionBean.createCategory(new Category("Seafood", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrbetFbGgrCRQjke31-z0y76TZM0-95gh1Bw&usqp=CAU"));
            categorySessionBean.createCategory(new Category("Meat", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMOKwvJ5oCa297do9pg_h0EA2OyXkevIA8Zg&usqp=CAU"));
        }
        if (mealBoxSessionBean.retrieveAllMealBoxes().isEmpty()) {
            MealBox box1 = new MealBox("https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660763547-veestro-best-vegan-meal-delivery-1643295633.jpg?crop=0.670xw:1.00xh;0.223xw,0&resize=980:*",
                    "Healthy Vegan Box", 001L, new BigDecimal(7), new BigDecimal(12), "This is a vegetable mealBox", 15);
            MealBox box2 = new MealBox("https://cdn.shopify.com/s/files/1/0588/6705/6848/products/bbqchickenricebox.jpg?v=1631767089",
                    "BBQ Bliss Box", 002L, new BigDecimal(9), new BigDecimal(15), "This is a BBQ meat mealBox", 15);
            MealBox box3 = new MealBox("https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660847883-sprinly-best-vegan-meal-delivery-service-1643296178.png?crop=0.688xw:1.00xh;0.0449xw,0&resize=980:*",
                    "All-in-One Box", 003L, new BigDecimal(11), new BigDecimal(18), "This is a all in one meat & vegetable mealBox", 15);
            List<Ingredient> ingres1 = new ArrayList<>();
            ingres1.add(ingredientSessionBean.retrieveIngredientByName("Soba"));
            ingres1.add(ingredientSessionBean.retrieveIngredientByName("Carrot"));
            box1.setIngredients(ingres1);

            List<Ingredient> ingres2 = new ArrayList<>();
            ingres2.add(ingredientSessionBean.retrieveIngredientByName("Chicken"));
            ingres2.add(ingredientSessionBean.retrieveIngredientByName("Rice"));
            ingres2.add(ingredientSessionBean.retrieveIngredientByName("Barbecue Sauce"));
            ingres2.add(ingredientSessionBean.retrieveIngredientByName("Bell Peppers"));
            box2.setIngredients(ingres2);

            List<Ingredient> ingres3 = new ArrayList<>();
            ingres3.add(ingredientSessionBean.retrieveIngredientByName("Beef"));
            ingres3.add(ingredientSessionBean.retrieveIngredientByName("Tomatoes"));
            ingres3.add(ingredientSessionBean.retrieveIngredientByName("Lettuce"));
            box3.setIngredients(ingres3);

            Review r1 = reviewSessionBean.retrieveReviewById(2L);
            box1.addReview(r1);

            Review r2 = reviewSessionBean.retrieveReviewById(3L);
            box2.addReview(r2);

            Review r3 = reviewSessionBean.retrieveReviewById(4L);
            box3.addReview(r3);
            
            
            Category c1 = categorySessionBean.retrieveCategoryById(4L);
            Category c2 = categorySessionBean.retrieveCategoryById(1L);
            Category c3 = categorySessionBean.retrieveCategoryById(2L);

            //c1.addMealBox(box1);
            box1.addCategory(c1);

            //c2.addMealBox(box1);
            box1.addCategory(c2);

            //c3.addMealBox(box2);
            box2.addCategory(c3);

            //c3.addMealBox(box3);
            box3.addCategory(c3);
            mealBoxSessionBean.createMealBox(box1);
            mealBoxSessionBean.createMealBox(box2);
            mealBoxSessionBean.createMealBox(box3);
        }

        if (promotionSessionBean.retrieveAllPromotions().isEmpty()) {
            try {
                Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse("2023-03-11");
                Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse("2023-04-05");

                promotionSessionBean.createPromotion(new Promotion("Promotion 1", "https://cdn.hellofresh.com/us/lp/images/hellofresh-coupons-and-promos-30OFF.jpg", startDate, endDate, BigDecimal.valueOf(0.3)));
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
        if (notificationSessionBean.retrieveAllNotifications().isEmpty()) {
            Calendar calendar = Calendar.getInstance();
            notificationSessionBean.createNotification(new Notification(new Date(calendar.getTime().getTime()), "Notification", "Hello, MealNUS Admin!"));
        }

        //TESTING PURPOSE
        if (orderSessionBean.retrieveAllOrders().isEmpty()) {
            try {
                Date orderDate = new Date();
                MealBox mealBox = new MealBox("https://assets.epicurious.com/photos/61ba94cc79b235be07f993e7/6:4/w_1600%2Cc_limit/gobble.png", "Supreme Meat Box", 004L, new BigDecimal(15), new BigDecimal(20), "This is a high quality meat mealBox", 10);
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
                MealBox mealBox2 = new MealBox("https://media.self.com/photos/63a31904dcba23cb155ff501/4:3/w_2560%2Cc_limit/greenchef.jpeg", "Aww in One Box", 005L, new BigDecimal(13), new BigDecimal(14.98), "Box catered to your daily nutrition needs!", 60);
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
            } catch (OrderNotFoundException | UnknownPersistenceException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
