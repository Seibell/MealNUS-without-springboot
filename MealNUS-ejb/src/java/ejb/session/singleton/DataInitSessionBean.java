/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.singleton;

import ejb.session.stateless.AllergenSessionBeanLocal;
import ejb.session.stateless.CategorySessionBeanLocal;
import ejb.session.stateless.CreditCardSessionBeanLocal;
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
import entity.CreditCard;
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
    private CreditCardSessionBeanLocal creditCardSessionBean;

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
                    "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZXxlbnwwfHwwfHw%3D&w=1000&q=80"));

            ingredientSessionBean.createIngredient(new Ingredient("Noodle",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mama_instant_noodle_block.jpg/1200px-Mama_instant_noodle_block.jpg"));

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

            ingredientSessionBean.createIngredient(new Ingredient("Tomato Sauce", "https://res.cloudinary.com/drkpzjlro/image/upload/v1680155404/samples/landscapes/landscape-panorama.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Barbecue Sauce", "https://res.cloudinary.com/drkpzjlro/image/upload/v1680155404/samples/landscapes/landscape-panorama.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Soy Sauce", "https://res.cloudinary.com/drkpzjlro/image/upload/v1680155404/samples/landscapes/landscape-panorama.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Teriyaki Sauce", "https://res.cloudinary.com/drkpzjlro/image/upload/v1680155404/samples/landscapes/landscape-panorama.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Pesto Sauce", "https://res.cloudinary.com/drkpzjlro/image/upload/v1680155404/samples/landscapes/landscape-panorama.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Alfredo Sauce", "https://res.cloudinary.com/drkpzjlro/image/upload/v1680155404/samples/landscapes/landscape-panorama.jpg"));

            ingredientSessionBean.createIngredient(new Ingredient("Sweet and Sour Sauce", "https://res.cloudinary.com/drkpzjlro/image/upload/v1680155404/samples/landscapes/landscape-panorama.jpg"));
        }

        //TESTING PURPOSE
        if (reviewSessionBean.retrieveAllReviews().isEmpty()) {
            Calendar calendar = Calendar.getInstance();
            try {
                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 5, "This is a default review", userSessionBean.retrieveUserByEmail("user@gmail.com")));
                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 4, "Just tried the Healthy Vegan Box - a delightful DIY meal!", userSessionBean.retrieveUserByEmail("user@gmail.com")));
                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 2, "I recently tried the BBQ Bliss Box, and it was a fantastic experience! The chicken was tender, and the barbecue sauce provided a delicious, smoky flavor.", userSessionBean.retrieveUserByEmail("user@gmail.com")));
                reviewSessionBean.createReview(new Review(new Date(calendar.getTime().getTime()), 1, "I absolutely loved the All-in-One Box! The variety of ingredients allowed me to create a unique, mouthwatering meal.", userSessionBean.retrieveUserByEmail("user@gmail.com")));
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
            categorySessionBean.createCategory(new Category("Site-Wide", "")); //For promotions
        }
        if (mealBoxSessionBean.retrieveAllMealBoxes().isEmpty()) {
            MealBox box1 = new MealBox("https://i.imgur.com/K8ex5m6.jpg",
                    "Healthy Vegan Box", 001L, new BigDecimal(7), new BigDecimal(12), "This is a vegetable mealBox", 15);
            MealBox box2 = new MealBox("https://cdn.shopify.com/s/files/1/0588/6705/6848/products/bbqchickenricebox.jpg?v=1631767089",
                    "BBQ Bliss Box", 002L, new BigDecimal(9), new BigDecimal(15), "This is a BBQ meat mealBox", 15);
            MealBox box3 = new MealBox("https://i.imgur.com/jVlcI4N.png",
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
            System.out.println("###########TEST HERE:" + box1.getReviews().toString());
            Review r2 = reviewSessionBean.retrieveReviewById(3L);
            box2.addReview(r2);

            Review r3 = reviewSessionBean.retrieveReviewById(4L);
            box3.addReview(r3);

            Category c1 = categorySessionBean.retrieveCategoryById(4L);
            Category c2 = categorySessionBean.retrieveCategoryById(1L);
            Category c3 = categorySessionBean.retrieveCategoryById(2L);
            Category vegan = categorySessionBean.retrieveCategoryByName("Vegan");
            Category meat = categorySessionBean.retrieveCategoryByName("Meat");
            Category lowc = categorySessionBean.retrieveCategoryByName("Low-Calorie");
            Category seafood = categorySessionBean.retrieveCategoryByName("Seafood");
            //c1.addMealBox(box1);
            box1.addCategory(vegan);

            //c2.addMealBox(box1);
            box1.addCategory(lowc);

            //c3.addMealBox(box2);
            box2.addCategory(meat);

            //c3.addMealBox(box3);
            box3.addCategory(meat);
            box3.addCategory(seafood);
            box3.addCategory(vegan);
            mealBoxSessionBean.createMealBox(box1);
            mealBoxSessionBean.createMealBox(box2);
            mealBoxSessionBean.createMealBox(box3);
        }

        if (promotionSessionBean.retrieveAllPromotions().isEmpty()) {
            try {
                Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse("2023-03-11");
                Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse("2023-04-05");

                promotionSessionBean.createPromotion(new Promotion("Promotion 1", "https://cdn.hellofresh.com/us/lp/images/hellofresh-coupons-and-promos-30OFF.jpg", startDate, endDate, BigDecimal.valueOf(0.3), "Site-Wide"));
            } catch (PromotionNotFoundException | UnknownPersistenceException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            } catch (ParseException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        //TESTING PURPOSE
        if (forumSessionBean.retrieveAllForumPosts().isEmpty()) {
            Calendar calendar = Calendar.getInstance();
            ForumPost fp1 = new ForumPost(new Date(calendar.getTime().getTime()), "Test", "Welcome to MealNUS Forum! Share your experience with the mealboxes here:)");
            try {
                fp1.setUser(userSessionBean.retrieveUserByEmail("user@gmail.com"));
            } catch (UserNotFoundException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
            forumSessionBean.createForumPost(fp1);

        }

        //TESTING PURPOSE
        if (notificationSessionBean.retrieveAllNotifications().isEmpty()) {
            Calendar calendar = Calendar.getInstance();
            notificationSessionBean.createNotification(new Notification(new Date(calendar.getTime().getTime()), "Notification", "Hello, MealNUS Admin!"));
        }

        //TESTING PURPOSE
        if (orderSessionBean.retrieveAllOrders().isEmpty()) {
            try {
                Calendar cal = Calendar.getInstance();
                cal.setTime(new Date());
                cal.add(Calendar.DAY_OF_MONTH, -50);
                Date orderDate = cal.getTime();
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
                em.persist(user);
                orderSessionBean.createOrder(new OrderEntity(orderDate, orderDetails, priceList, costList, deliveryDate, address, orderStatus, user));

            } catch (OrderNotFoundException | UnknownPersistenceException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        if (creditCardSessionBean.retrieveAllCreditCardsByUserId((long) 6).isEmpty()) {
            try {
                creditCardSessionBean.addNewCreditCard(new CreditCard("Eric5 Tang5", "4231946284028637", "523", "06/28", userSessionBean.retrieveUserByEmail("user5@gmail.com")), (long) 6);
                creditCardSessionBean.addNewCreditCard(new CreditCard("Eric5 Tang5", "5231946284028637", "972", "05/23", userSessionBean.retrieveUserByEmail("user5@gmail.com")), (long) 6);
                creditCardSessionBean.addNewCreditCard(new CreditCard("Eric5 Tang5", "4231943285028682", "105", "06/25", userSessionBean.retrieveUserByEmail("user5@gmail.com")), (long) 6);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
