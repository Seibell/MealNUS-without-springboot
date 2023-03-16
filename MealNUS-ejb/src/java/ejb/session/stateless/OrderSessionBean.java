/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.MealBox;
import entity.OrderEntity;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import javafx.util.Pair;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import util.enumeration.OrderStatus;
import util.exception.OrderNotFoundException;
import util.exception.UnknownPersistenceException;
import util.exception.UserNotFoundException;

/**
 *
 * @author Darie
 */
@Stateless
public class OrderSessionBean implements OrderSessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @Override
    public OrderEntity createOrder(OrderEntity order) throws OrderNotFoundException, UnknownPersistenceException {
        try {
            em.persist(order);
            em.flush();
            return order;

        } catch (PersistenceException ex) {
            if (ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException")) {
                if (ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException")) {
                    throw new OrderNotFoundException();
                } else {
                    throw new UnknownPersistenceException(ex.getMessage());
                }
            } else {
                throw new UnknownPersistenceException(ex.getMessage());
            }
        }
    }

    // This method helps with Order Management :: Orders Overview
    @Override
    public List<OrderEntity> retrieveAllOrders() {
        Query query = em.createQuery("SELECT o FROM OrderEntity o");
        return query.getResultList();
    }

    @Override
    public OrderEntity retrieveOrderById(Long orderId) throws OrderNotFoundException {
        OrderEntity order = em.find(OrderEntity.class, orderId);

        if (order != null) {
            return order;
        } else {
            throw new OrderNotFoundException("Order ID [" + orderId + "] not found in system!");
        }
    }

    // This method supports Order Management :: Daily Orders
    @Override
    public List<OrderEntity> retrieveOrdersByOrderStatus(OrderStatus orderStatus) {
        Query query = em.createQuery("SELECT o FROM OrderEntity o WHERE o.orderStatus = :inOrderStatus");
        query.setParameter("inOrderStatus", orderStatus);
        return query.getResultList();
    }

    // This method supports Customer Portal Order Management
    @Override
    public List<OrderEntity> retrieveOrdersByUserEmail(String email) throws UserNotFoundException {
        Query query = em.createQuery("SELECT o FROM OrderEntity o WHERE o.user.email = :inUserEmail");
        query.setParameter("inUserEmail", email);
        return query.getResultList();
    }

    // This method will help with finding MTD and Total Turnover for each type of MealBox
    // It just takes all the orders since the start of MealNUS, then filter out orders that contain the mealBoxName concerned
    @Override
    public List<OrderEntity> retrieveOrdersByMealBoxName(String mealBoxNameToCheck) {
//        String query = "SELECT o FROM OrderEntity o JOIN o.orderDetails oD JOIN oD.getKey() mb WHERE mb.itemName = :inName";
//        TypedQuery<OrderEntity> typedQuery = em.createQuery(query, OrderEntity.class);
//        typedQuery.setParameter("inName", mealBoxNameToCheck);
//        List<OrderEntity> orders = typedQuery.getResultList();

        List<OrderEntity> orderList = retrieveAllOrders();
        if (orderList.isEmpty()) {
            return orderList; //return empty list to signify no order made under mealBoxNameToCheck
        }

        ArrayList<OrderEntity> ordersThatMatchMealBoxNameToCheck = new ArrayList<>();

        for (OrderEntity order : orderList) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                MealBox mealBox = orderLineItem.getKey();
                String mealBoxName = mealBox.getItemName();
                if (mealBoxName.equals(mealBoxNameToCheck)) {
                    ordersThatMatchMealBoxNameToCheck.add(order);
                    break;
                }
            }
        }
        return ordersThatMatchMealBoxNameToCheck;
    }

    @Override
    public List<OrderEntity> retrieveOrdersByMealBoxNameAndDate(String mealBoxNameToCheck, Date queryDate) {
        List<OrderEntity> orderList = retrieveAllOrders();
        if (orderList.isEmpty()) {
            return orderList; //return empty list to signify no order made under mealBoxNameToCheck
        }

        ArrayList<OrderEntity> ordersThatMatchMealBoxNameToCheck = new ArrayList<>();

        for (OrderEntity order : orderList) {
            if (order.getOrderDate().compareTo(queryDate) == 0) {
                List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
                for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                    MealBox mealBox = orderLineItem.getKey();
                    String mealBoxName = mealBox.getItemName();
                    if (mealBoxName.equals(mealBoxNameToCheck)) {
                        ordersThatMatchMealBoxNameToCheck.add(order);
                        break;
                    }
                }
            }
        }

        return ordersThatMatchMealBoxNameToCheck;
    }

    // Dashboard :: Order Summary
    @Override
    public List<OrderEntity> retrieveOrdersByOrderDate(Date queryDate) {
        Query query = em.createQuery("SELECT o FROM OrderEntity o WHERE o.orderDate = :inQueryDate");
        query.setParameter("inQueryDate", queryDate);
        return query.getResultList();
    }

    // Note: Revenue calculation inaccurate if need to consider refunds/returns
    @Override
    public BigDecimal calculateCurrentDateRevenue(Date queryDate) {
        List<OrderEntity> currentDateOrders = retrieveOrdersByOrderDate(queryDate);

        if (currentDateOrders.isEmpty()) {
            return BigDecimal.ZERO; // no order today means no revenue today
        }

        BigDecimal revenue = BigDecimal.ZERO;
        for (OrderEntity order : currentDateOrders) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            int i = 0;
            for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                BigDecimal mealBoxPrice = order.getPriceList().get(i);
                Integer quantity = orderLineItem.getValue();
                BigDecimal orderLineItemValue = mealBoxPrice.multiply(BigDecimal.valueOf(quantity));
                revenue.add(orderLineItemValue);
                i++;
            }
        }
        return revenue;
    }

    @Override
    public BigDecimal calculateCurrentDateCost(Date queryDate) {
        List<OrderEntity> currentDateOrders = retrieveOrdersByOrderDate(queryDate);

        if (currentDateOrders.isEmpty()) {
            return BigDecimal.ZERO; // no order today means no cost today
        }

        BigDecimal cost = BigDecimal.ZERO;
        for (OrderEntity order : currentDateOrders) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            int i = 0;
            for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                BigDecimal mealBoxCost = order.getPriceList().get(i);
                Integer quantity = orderLineItem.getValue();
                BigDecimal orderLineItemCost = mealBoxCost.multiply(BigDecimal.valueOf(quantity));
                cost.add(orderLineItemCost);
                i++;
            }
        }
        return cost;
    }

    // Dashboard :: MTD Sales Overview :: OrderEntity
    @Override
    public int getMtdOrderCount(Date queryDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(queryDate);
        cal.add(Calendar.MONTH, -1);
        Date oneMonthBeforeQueryDate = cal.getTime();
        Date referenceDate = oneMonthBeforeQueryDate;

        int mtdNumOfOrders = 0;

        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(queryDate);
        calEnd.add(Calendar.DAY_OF_MONTH, 1);
        Date endDate = calEnd.getTime();

        while (referenceDate.before(endDate)) {
            List<OrderEntity> currentDateOrders = retrieveOrdersByOrderDate(referenceDate);
            int currentDateOrderCount = currentDateOrders.size();
            mtdNumOfOrders += currentDateOrderCount;
            cal.add(Calendar.DAY_OF_MONTH, 1);
            referenceDate = cal.getTime();
        }

        return mtdNumOfOrders;
    }

    // Dashboard :: MTD Sales Overview :: Revenue
    @Override
    public BigDecimal getMtdRevenue(Date queryDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(queryDate);
        cal.add(Calendar.MONTH, -1);
        Date oneMonthBeforeQueryDate = cal.getTime();
        Date referenceDate = oneMonthBeforeQueryDate;

        BigDecimal mtdOrderRevenue = BigDecimal.ZERO;

        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(queryDate);
        calEnd.add(Calendar.DAY_OF_MONTH, 1);
        Date endDate = calEnd.getTime();

        while (referenceDate.before(endDate)) {
            BigDecimal currentDateRevenue = calculateCurrentDateRevenue(referenceDate);
            mtdOrderRevenue.add(currentDateRevenue);
            cal.add(Calendar.DAY_OF_MONTH, 1);
            referenceDate = cal.getTime();
        }

        return mtdOrderRevenue;
    }

    // Dashboard :: MTD Sales Overview :: Cost
    @Override
    public BigDecimal getMtdCost(Date queryDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(queryDate);
        cal.add(Calendar.MONTH, -1);
        Date oneMonthBeforeQueryDate = cal.getTime();
        Date referenceDate = oneMonthBeforeQueryDate;

        BigDecimal mtdOrderCost = BigDecimal.ZERO;

        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(queryDate);
        calEnd.add(Calendar.DAY_OF_MONTH, 1);
        Date endDate = calEnd.getTime();

        while (referenceDate.before(endDate)) {
            BigDecimal currentDateCost = calculateCurrentDateCost(referenceDate);
            mtdOrderCost.add(currentDateCost);
            cal.add(Calendar.DAY_OF_MONTH, 1);
            referenceDate = cal.getTime();
        }

        return mtdOrderCost;
    }

    // Dashboard :: MTD Sales Overview :: Profit
    @Override
    public BigDecimal getMtdProfit(Date queryDate) {
        return getMtdRevenue(queryDate).subtract(getMtdCost(queryDate));
    }

    // Dashboard :: Top Selling Box (from start of MealNUS until queryDate)
    // Arranges all mealboxes from top to worst selling QUANTITIES
    // Returns whole list of entryset, can use getKey() and getValue() methods to display accordingly
    @Override
    public List<Entry<MealBox, Integer>> findTopSellingMealBoxes(Date queryDate) {
        List<OrderEntity> allOrders = retrieveAllOrders();

        Date referenceDate = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(referenceDate);

        // Ensure the start of MealNUS is based on earliest orderDate
        if (!allOrders.isEmpty()) {
            OrderEntity earliestOrder = allOrders.get(0);
            for (OrderEntity order : allOrders) {
                if (order.getOrderDate().compareTo(earliestOrder.getOrderDate()) < 0) {
                    earliestOrder = order;
                    referenceDate = earliestOrder.getOrderDate();
                    cal.setTime(referenceDate);
                }
            }
        }

        // Empty pair cannot be instantiated
        HashMap<MealBox, Integer> mealBoxCounts = new HashMap<>();

        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(queryDate);
        calEnd.add(Calendar.DAY_OF_MONTH, 1);
        Date endDate = calEnd.getTime();

        while (referenceDate.before(endDate)) {
            List<OrderEntity> currentDateOrders = retrieveOrdersByOrderDate(referenceDate);
            for (OrderEntity order : currentDateOrders) {
                for (Pair<MealBox, Integer> orderLineItem : order.getOrderDetails()) {
                    MealBox mealbox = orderLineItem.getKey();
                    int count = orderLineItem.getValue();
                    if (mealBoxCounts.containsKey(mealbox)) {
                        mealBoxCounts.put(mealbox, mealBoxCounts.get(mealbox) + count);
                    } else {
                        mealBoxCounts.put(mealbox, count);
                    }
                }
            }
            cal.add(Calendar.DAY_OF_MONTH, 1);
            referenceDate = cal.getTime();
        }

        List<Entry<MealBox, Integer>> topSellingMealBoxes = new ArrayList<>(mealBoxCounts.entrySet());
        Collections.sort(topSellingMealBoxes, (a, b) -> b.getValue().compareTo(a.getValue()));

        return topSellingMealBoxes;
    }

    // Product Detail :: MTD Turnover
    // Turnover := Revenue
    @Override
    public BigDecimal getMealBoxMtdTurnover(String mealBoxNameToCheck, Date queryDate) {
        BigDecimal mealBoxMtdTurnover = BigDecimal.ZERO;

        Calendar cal = Calendar.getInstance();
        cal.setTime(queryDate);
        cal.add(Calendar.MONTH, -1);
        Date oneMonthBeforeQueryDate = cal.getTime();
        Date referenceDate = oneMonthBeforeQueryDate;

        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(queryDate);
        calEnd.add(Calendar.DAY_OF_MONTH, 1);
        Date endDate = calEnd.getTime();

        while (referenceDate.before(endDate)) {
            List<OrderEntity> mealBoxOrders = retrieveOrdersByMealBoxNameAndDate(mealBoxNameToCheck, referenceDate);
            for (OrderEntity order : mealBoxOrders) {
                List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
                for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                    MealBox mealBox = orderLineItem.getKey();
                    String mealBoxName = mealBox.getItemName();
                    if (mealBoxName.equals(mealBoxNameToCheck)) {
                        BigDecimal mealBoxPrice = order.getPriceList().get(orderDetails.indexOf(orderLineItem));
                        Integer quantity = orderLineItem.getValue();
                        BigDecimal orderLineItemRevenue = mealBoxPrice.multiply(BigDecimal.valueOf(quantity));
                        mealBoxMtdTurnover.add(orderLineItemRevenue);
                        break;
                    }
                }
            }
            cal.add(Calendar.DAY_OF_MONTH, 1);
            referenceDate = cal.getTime();
        }
        return mealBoxMtdTurnover;
    }

    // Product Detail :: Total Turnover
    @Override
    public BigDecimal geMealBoxTotalTurnover(String mealBoxNameToCheck, Date queryDate) {
        BigDecimal mealBoxTurnover = BigDecimal.ZERO;
        List<OrderEntity> mealBoxOrders = retrieveOrdersByMealBoxName(mealBoxNameToCheck);
        for (OrderEntity order : mealBoxOrders) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                MealBox mealBox = orderLineItem.getKey();
                String mealBoxName = mealBox.getItemName();
                if (mealBoxName.equals(mealBoxNameToCheck)) {
                    BigDecimal mealBoxPrice = order.getPriceList().get(orderDetails.indexOf(orderLineItem));
                    Integer quantity = orderLineItem.getValue();
                    BigDecimal orderLineItemValue = mealBoxPrice.multiply(BigDecimal.valueOf(quantity));
                    mealBoxTurnover.add(orderLineItemValue);
                }
            }
        }
        return mealBoxTurnover;
    }

    @Override
    public void updateOrder(OrderEntity orderToUpdate) {
        em.merge(orderToUpdate);
    }

    @Override
    public void deleteOrder(OrderEntity orderToRemove) {
        em.remove(orderToRemove);
    }
}
